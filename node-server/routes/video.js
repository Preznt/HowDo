import express from "express";
import DB from "../models/index.js";
import fileUp from "../modules/file_upload.js";
import { v4 } from "uuid";
import { Op } from "sequelize";

const router = express.Router();

const Video = DB.models.video;
const SHORTS = DB.models.shorts;

router.get("/", async (req, res) => {
  const result = await SHORTS.findAll({
    attributes: ["sh_src"],
  });
  res.json(result);
});

router.get("/main", async (req, res) => {
  const result = await Video.findAll({
    attributes: ["v_code", "v_src", "v_category", "username", "v_title"],
  });
  res.json(result);
});

router.post("/upload", fileUp.single("upload"), async (req, res, next) => {
  const { v_title, v_detail, v_price, v_category, v_save_file } = JSON.parse(
    req.body.detail
  );
  const { shorts } = JSON.parse(req.body.shorts);
  const user = req.session?.user;
  const v_code = v4();
  if (shorts) {
    const uploadFileInfo = {
      v_code,
      username: user.username,
      v_src: `http://localhost:3000/public/uploads/${req.file?.filename}`,
      v_title,
      v_detail,
      v_price: 0,
      v_category,
      v_series: "?",
      v_save_file,
    };
    const shortsUploadFileInfo = {
      sh_code: v4(),
      v_code,
      sh_src: `http://localhost:3000/public/uploads/${req.file?.filename}`,
      sh_category: v_category,
      sh_title: v_title,
    };
    await Video.create(uploadFileInfo);
    return await SHORTS.create(shortsUploadFileInfo);
  } else {
    const uploadFileInfo = {
      v_code,
      username: user.username,
      v_src: `http://localhost:3000/public/uploads/${req.file?.filename}`,
      v_title,
      v_detail,
      v_price: v_price || 0,
      v_category,
      v_series: "?",
      v_save_file,
    };
    return await Video.create(uploadFileInfo);
  }
});

router.get("/detail/:src", async (req, res) => {
  const v_code = req.params.src;
  console.log(v_code);
  const result = await Video.findOne({ where: { v_code: v_code } });
  const { v_category } = result;
  const category = await Video.findAll({ where: { v_category: v_category } });
  res.json({ video: result, category });
});

export default router;
