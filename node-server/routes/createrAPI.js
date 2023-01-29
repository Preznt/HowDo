import express from "express";
import DB from "../models/index.js";

const router = express.Router();
const V_CONTENT = DB.models.video;

router.get("/:username", async (req, res, next) => {
  const username = req.params.username;
  console.log(username);
  try {
    const result = await V_CONTENT.findAll({ where: { username: username } });
    console.log(result);
    return res.json(result);
  } catch (error) {}
});

export default router;
