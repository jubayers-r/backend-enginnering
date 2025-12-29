import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

const authorization = (...allowedRoles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers,
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "you are not authorized",
        });
      }

      if (!session?.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required. Please verify your email",
        });
      }

      req.user = {
        id: session?.user.id!,
        email: session?.user.email!,
        name: session?.user.name!,
        role: session?.user.role!,
        emailVerified: session?.user.emailVerified!,
      };

      if (
        allowedRoles.length &&
        !allowedRoles.includes(req.user.role as UserRole)
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden request",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorization;
