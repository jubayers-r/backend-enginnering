import asyncHandler from "../../utils/asyncHandler.js";
import { Request, Response } from "express";
import { authServices } from "./auth.service.js";
import { success } from "../../utils/responseUtils.js";

const logIn = asyncHandler(async (req: Request, res: Response) => {
  const result = await authServices.verifyUser(req.body);

  return success(res, result);
});

export const authController = {
  logIn,
};
