import express, { Request, Response } from "express";
import { pool } from "../db.js";
import { notFound, success } from "../utils/responseUtils.js";
import asyncHanlder from "../utils/asyncHandler.js";
const router = express.Router();

router.get(
  "/",
  asyncHanlder(async (_req: Request, res: Response) => {
    const result = await pool.query(
      `
    SELECT * FROM users
    `,
    );

    if (result.rows.length > 0) {
      success(res, result.rows);
    } else {
      notFound(res, "users table");
    }
  }),
);

router.get(
  "/:id",
  asyncHanlder(async (req: Request, res: Response) => {
    const userId = req.params.id;

    const result = await pool.query(
      `
    SELECT * FROM users WHERE id = $1
    `,
      [userId],
    );
    if (result.rows.length > 0) {
      success(res, result.rows[0]);
    } else {
      notFound(res, "user on this id");
    }
  }),
);

router.post(
  "/",
  asyncHanlder(async (req: Request, res: Response) => {
    const { name, email, age, phone, address } = req.body;
    const result = await pool.query(
      `
          INSERT INTO users(name, email, age, phone, address)VALUES($1, $2, $3, $4, $5 ) RETURNING *
          `,
      [name, email, age, phone, address],
    );
    success(res, result.rows);
  }),
);

export default router;
