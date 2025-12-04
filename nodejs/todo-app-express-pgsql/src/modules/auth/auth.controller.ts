import asyncHandler from "../../utils/asyncHandler.js";
import { Request, Response } from "express";
import { authServices } from "./auth.service.js";
import { notFound, success } from "../../utils/responseUtils.js";

const logIn = asyncHandler(async (req: Request, res: Response) => {
  const result = await authServices.verifyUser(req.body);
  if (result === null) return notFound(res, "User");

  if (result === false)
    return res.status(400).json({ message: "Invalid credentials" });

  return success(res, result);
});

export const authController = {
  logIn,
};
