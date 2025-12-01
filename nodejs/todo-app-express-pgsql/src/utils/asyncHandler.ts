import { NextFunction, Request, RequestHandler, Response } from "express";
import { err } from "./responseUtils.js";

const asyncHandler =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next?: NextFunction) => {
    try {
      await fn(req, res, next!);
    } catch (error) {
      err(res, error);
    }
  };

export default asyncHandler;
