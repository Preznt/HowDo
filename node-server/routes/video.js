import express from "express";
import DB from "../models/index.js";
import fileUp from "../modules/file_upload.js";
import { v4 } from "uuid";

const router = express.Router();

const Video = DB.models.video;

router.get("/", async (req, res) => {
  const result = await Video.findAll({
    attributes: ["v_src"],
  });
  res.json(result);
});
router.post("/upload", fileUp.single("upload"), async (req, res, next) => {
  const { v_title, v_detail, v_price, v_category, v_save_file } = JSON.parse(
    req.body.detail
  );
  const { shorts } = JSON.parse(req.body.shorts);
  console.log(shorts);
  const uploadFileInfo = {
    v_code: v4(),
    username: "han",
    v_src: `http://localhost:5000/uploads/${req.file?.filename}`,
    v_title,
    v_detail,
    v_price: v_price || 0,
    v_category,
    v_series: "?",
    v_save_file,
  };
  console.log(uploadFileInfo);
  // console.log(v_detail);
  if (req.file) {
    // await Video.create(uploadFileInfo);
  }
});

export default router;
