import { NextFunction, Request, RequestHandler, Response } from "express";
import { err } from "./responseUtils.js";

const asyncHandler =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next?: NextFunction) => {
    try {
      await fn(req, res, next!);
    } catch (error) {
      if (!res.headersSent) {
        return err(res, error);
      }
      // If headers are already sent → delegate to Express
      // next!(error);
    }
  };

export default asyncHandler;
