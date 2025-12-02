import asyncHandler from "../../utils/asyncHandler.js";
import { Request, Response } from "express";
import { notFound, success } from "../../utils/responseUtils.js";
import { userService } from "./user.service.js";

const findAll = asyncHandler(async (_req: Request, res: Response) => {
  const result = await userService.getAllUsers();

  if (result.rows.length > 0) {
    success(res, result.rows);
  } else {
    notFound(res, "users table");
  }
  return result;
});

const findOne = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const result = await userService.getUserById(userId!);
  if (result.rows.length > 0) {
    success(res, result.rows[0]);
  } else {
    notFound(res, "user on this id");
  }
  return result;
});

const create = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, age, phone, address } = req.body;
  const result = await userService.createUser(name, email, age, phone, address);
  success(res, result.rows);
  return result;
});

export const userController = {
  findAll,
  findOne,
  create,
};
