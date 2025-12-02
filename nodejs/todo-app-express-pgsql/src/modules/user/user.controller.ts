import asyncHandler from "../../utils/asyncHandler.js";
import { Request, Response } from "express";
import { badRequest, notFound, success } from "../../utils/responseUtils.js";
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

  if (!result.rows.length) {
    notFound(res, "user on this id");
  }

  return success(res, result.rows[0]);
});

const create = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  if (!result.rows.length) {
    badRequest(res);
  }
  return success(res, result.rows);
});

export const userController = {
  findAll,
  findOne,
  create,
};
