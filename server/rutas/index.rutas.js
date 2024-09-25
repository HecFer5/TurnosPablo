import { Router } from "express";
import { pool } from "../db.js";

const router = Router()

router.get("/ping", async (req, res) => {
  const [rows] = await pool.query("SELECT  (15 + 1) * 3  as RESULT");
  res.json(rows[0]);
});

export default router;
