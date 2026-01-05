import { Router } from "express";
import { postController } from "./post.controller";
import authorization, { UserRole } from "../../middleware/authorization";

const router = Router();

router.post("/", authorization(UserRole.USER), postController.createPost);

export const postRouter: Router = router;
