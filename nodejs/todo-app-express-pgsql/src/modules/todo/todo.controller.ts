import { pool } from "../../config/db.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { notFound, success } from "../../utils/responseUtils.js";
import { Request, Response } from "express";
import { todoService } from "./todo.service.js";

const findAllByUserId = asyncHandler(async (req: Request, res: Response) => {
  const uid = req.params.user_id;

  const result = await todoService.getTodosByUserId(uid!);

  if (result.rows.length > 0) {
    success(res, result.rows);
  } else {
    notFound(res, "user");
  }
  return result;
});

const createByUserId = asyncHandler(async (req: Request, res: Response) => {
  const uid = req.params.user_id;
  const { title, description, completed, due_date } = req.body;

  const result = await todoService.createTodoByUserId(
    uid!,
    title,
    description,
    completed,
    due_date,
  );
  if (result.rows.length > 0) {
    success(res, result.rows);
  } else {
    notFound(res, "user");
  }

  return result;
});

export const todoController = {
  findAllByUserId,
  createByUserId,
};
