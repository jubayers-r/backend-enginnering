import { pool } from "../../config/db.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { badRequest, notFound, success } from "../../utils/responseUtils.js";
import { Request, Response } from "express";
import { todoService } from "./todo.service.js";

const findAll = asyncHandler(async (req: Request, res: Response) => {
  const uid = req.params.user_id;

  const result = await todoService.getTodos(uid!);
  if (!result.rows.length) {
    notFound(res, "user");
  }

  return success(res, result.rows);
});

const create = asyncHandler(async (req: Request, res: Response) => {
  const uid = req.params.user_id;
  const { title, description, completed, due_date } = req.body;

  const result = await todoService.createTodo(
    uid!,
    title,
    description,
    completed,
    due_date,
  );

  if (!result.rows.length) {
    badRequest(res);
  }

  return success(res, result.rows);
});

export const todoController = {
  findAll,
  create,
};
