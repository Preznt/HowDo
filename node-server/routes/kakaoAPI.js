import express from "express";
import DB from "../models/index.js";

const SUBSCRIBE = DB.models.subscribe;

const router = express.Router();

router.post("/sub", async (req, res) => {
  console.log(req.body);
  try {
    await SUBSCRIBE.create(req.body);
  } catch (e) {
    console.log("정기 결제 승인 인서트 오류", e);
  }
});

router.get("/expire", async (req, res) => {
  try {
    await SUBSCRIBE.findAll({ where: {} });
  } catch (e) {}
});

export default router;
