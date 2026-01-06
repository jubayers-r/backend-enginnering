import { Router } from "express";
import { commentController } from "./comment.controller";
import authorization, { UserRole } from "../../middlewares/authorization";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authorization(UserRole.ADMIN, UserRole.USER),
  commentController.createComment
);

export const commentRoutes: Router = router;
