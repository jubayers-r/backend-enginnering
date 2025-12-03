import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import { authServices } from "../modules/auth/auth.service.js";
import { success } from "../utils/responseUtils.js";

const auth = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const token = req.headers.authorization;
    const secret = config.jwt_secret;

    // console.log({ authToken:  });

    if (!token) {
      return res.status(401).json({
        message: "you are not allowed to login",
      });
    }

    const decoded = jwt.verify(token, secret as string) as JwtPayload;

    req.user = decoded;

    // console.log(role);
    success(res, decoded);

    next();
  },
);

export default auth;
