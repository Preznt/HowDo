import express from "express";
import DB from "../models/index.js";
import { Op } from "sequelize";
import { SYSTEM_RES } from "../config/api_res_code.js";
import { KAKAO_APP_ADMIN_KEY, URL } from "../config/kakao_config.js";
import schedule from "node-schedule";
import moment from "moment";

const SUBSCRIBE = DB.models.subscribe;
const USER = DB.models.user;

const router = express.Router();

// 정기 결제 데이터 인서트
router.post("/sub", async (req, res) => {
  console.log(req.body);
  try {
    await SUBSCRIBE.create(req.body);
  } catch (e) {
    console.log("정기 결제 승인 인서트 오류", e);
  }
});

//  날마다? "0 0 * * *"
// 날마다 만료된 유저 정보 가져오기
const job = schedule.scheduleJob("10 * * * * *", async () => {
  console.log("매 15초마다 실행");
  const MonthLater = moment().subtract(15, "s").format("YYYY-MM-DD");
  console.log(MonthLater);
  let result;
  try {
    result = await SUBSCRIBE.findAll({
      attributes: ["partner_user_id", "partner_order_id", "sid"],
      where: { approved_at: MonthLater },
      include: [{ model: USER, attributes: ["price"] }],
      raw: true,
    });
    console.log(result);
  } catch (e) {
    console.log(`${SYSTEM_RES.SQL_ERROR} \n`, e);
  }

  const subPayBody = {
    cid: "TCSUBSCRIP",
    sid: result[0].sid,
    partner_order_id: result[0].partner_order_id,
    partner_user_id: result[0].partner_user_id,
    item_name: result[0].partner_order_id,
    quantity: 1,
    total_amount: result[0]["user.price"],
    tax_free_amount: 0,
    vat_amount: Math.round((result[0]["user.price"] - 0) / 11),
  };

  console.log(subPayBody);

  const fetchOption = {
    method: "POST",
    body: new URLSearchParams(subPayBody),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(URL.SUBSCRIPTION, fetchOption);
    const result = await res.json();
    console.log(result);
    await SUBSCRIBE.update(
      { approved_at: result.approved_at.substr(0, 10) },
      {
        where: {
          [Op.and]: [
            { partner_user_id: result.partner_user_id },
            { partner_order_id: result.partner_order_id },
          ],
        },
      }
    );
  } catch (e) {
    console.log("정기결제 승인 날짜 수정 실패", e);
  }
});

job.cancel();

router.get("/expire", async (req, res) => {});

export default router;
