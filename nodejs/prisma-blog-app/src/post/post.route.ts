import { Router, Request, Response } from "express";
import { postController } from "./post.controller";
import authorization, { UserRole } from "../middleware/authorization";

const router: Router = Router();

router.post(
  "/",
  authorization(UserRole.USER, UserRole.ADMIN),
  postController.createPost
);

router.get("/", postController.getAllPost);

export const postRouter = router;
