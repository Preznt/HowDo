import express from "express";
import { KAKAO_APP_ADMIN_KEY, APPROVE_URL } from "../config/kakao_config.js";

const router = express.Router();

router.get("/approval/:tid", async (req, res) => {
  const tid = req.params?.tid;
  const pg_token = req.query?.pg_token;

  const reqBody = {
    cid: "TC0ONETIME",
    tid: tid,
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    pg_token: pg_token,
  };

  console.log(reqBody);

  const approveFetchOption = {
    method: "POST",
    body: new URLSearchParams(reqBody),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(APPROVE_URL, approveFetchOption);
    const result = await res.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
});

export default router;
