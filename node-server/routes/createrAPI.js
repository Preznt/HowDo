import express from "express";
import DB from "../models/index.js";

const router = express.Router();
const V_CONTENT = DB.models.video;
const USER = DB.models.user;
router.get("/:username", async (req, res, next) => {
  const username = req.params.username;
  console.log(username);
  try {
    const result = await V_CONTENT.findAll({ where: { username: username } });
    console.log(result);
    return res.json(result);
  } catch (error) {}
});

router.get("/search", async (req, res, next) => {
  try {
    const v_result = await V_CONTENT.findAll();
    // const u_result = await USER.findAll();
    console.log(v_result);
    // return res.json(v_result);
  } catch (error) {
    return res.json(error);
  }
});

export default router;
