import express from "express";
import { chkJoin } from "../modules/user_module.js";
const router = express.Router();

/* GET users listing. */
router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    await chkJoin(req.body);
    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
    const e = JSON.parse(error?.message);
    return res.json(e);
  }
});

export default router;
