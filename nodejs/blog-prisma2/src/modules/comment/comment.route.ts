import { Router } from "express";
import { commentController } from "./comment.controller";
import authorization, { UserRole } from "../../middlewares/authorization";

const router = Router();

router.post(
  "/",
  authorization(UserRole.ADMIN, UserRole.USER),
  commentController.createComment
);

router.get("/:commentId", commentController.getCommentById);

router.get("/author/:authorId", commentController.getCommentByAuthorId);

router.delete(
  "/:commentId",
  authorization(UserRole.USER, UserRole.ADMIN),
  commentController.deleteComment
);
router.patch(
  "/:commentId",
  authorization(UserRole.USER, UserRole.ADMIN),
  commentController.updateComment
);
router.patch(
  "/:commentId/moderate",
  authorization(UserRole.ADMIN),
  commentController.moderateComment
);

export const commentRoutes: Router = router;
