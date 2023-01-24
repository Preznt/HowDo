import express from "express";
const router = express.Router();

/* GET users listing. */
router.post("/join", async (req, res, next) => {
  console.log(req.body);
});

export default router;
