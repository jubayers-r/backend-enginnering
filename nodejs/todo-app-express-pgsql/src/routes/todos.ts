import express, { Request, Response } from "express";
import { pool } from "../db.js";
import { notFound, success } from "../utils/responseUtils.js";
import asyncHandler from "../utils/asyncHandler.js";
const router = express.Router();

router.get(
  "/:user_id",
  asyncHandler(async (req: Request, res: Response) => {
    const uid = req.params.user_id;

    const result = await pool.query(
      `
    SELECT * FROM todos WHERE user_id = $1
    `,
      [uid],
    );
    if (result.rows.length > 0) {
      success(res, result.rows);
    } else {
      notFound(res, "user");
    }
  }),
);

router.post(
  "/:user_id",
  asyncHandler(async (req: Request, res: Response) => {
    const uid = req.params.user_id;
    const { title, description, completed, due_date } = req.body;

    const result = await pool.query(
      `
    INSERT INTO todos(user_id, title, description, completed, due_date) VALUES($1, $2, $3, $4, $5) RETURNING *
    `,
      [uid, title, description, completed, due_date],
    );
    if (result.rows.length > 0) {
      success(res, result.rows);
    } else {
      notFound(res, "user");
    }
  }),
);

export default router;
