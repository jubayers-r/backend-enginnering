import { Router } from "express";
import { postController } from "./post.controller";
import authorization, { UserRole } from "../../middlewares/authorization";

const router = Router();

router.post("/", authorization(UserRole.USER), postController.createPost);

router.get("/", postController.getPost);

router.get("/:postId", postController.getPostById);
export const postRouter: Router = router;
