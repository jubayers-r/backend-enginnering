import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";

const authenticate =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;

      if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const token = header.split(" ")[1];

      const decoded = jwt.verify(
        token!,
        config.jwt_secret as string,
      ) as JwtPayload;

      req.user = decoded;

      if (!roles.includes(req.user!.role)) {
        return res.status(403).json({ message: "forbidden" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };

export default authenticate;
