import { Router } from "express";
import { postController } from "./post.controller";
import authorization, { UserRole } from "../../middlewares/authorization";

const router = Router();

router.post("/", authorization(UserRole.USER), postController.createPost);

router.get("/", postController.getPost);

router.get(
  "/my-posts",
  authorization(UserRole.USER, UserRole.ADMIN),
  postController.getMyPosts
);

router.get("/:postId", postController.getPostById);

router.patch(
  "/:postId",
  authorization(UserRole.ADMIN, UserRole.USER),
  postController.updatePost
);



export const postRouter: Router = router;
