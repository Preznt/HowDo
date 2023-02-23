import { Op } from "sequelize";
import DB from "../models/index.js";
import moment from "moment";
import fs from "fs";
import path from "path";

const POST = DB.models.post;
const ATTACH = DB.models.attach;
const REPLY = DB.models.reply;

export const removePost = async () => {
  const endDate = moment().subtract(7, "days").format("YYYY-MM-DD");
  const uploadDir = path.join("react-client/public/uploads");

  const posts = await POST.findAll({
    raw: true,
    attributes: ["p_code"],
    where: { p_deleted: { [Op.gt]: `${endDate} 00:00:00` } },
  });
  console.log(posts);

  await posts?.map(async (item) => {
    const attachs = await ATTACH.findAll({
      raw: true,
      where: { p_code: item.p_code },
    });

    await attachs.map((item) => {
      try {
        const delFile = path.join(uploadDir, item.a_save_name);
        fs.statSync(delFile);
        fs.unlinkSync(delFile);
      } catch (err) {
        console.error;
        console.log(item.a_save_name, "uploads 에서 파일을 찾을 수 없음");
      }
    });
    await POST.destroy({ where: { p_code: item.p_code } });
    await ATTACH.destroy({ where: { p_code: item.p_code } });
    await REPLY.destroy({ where: { p_code: item.p_code } });
  });
};
