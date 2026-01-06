import { commentServices } from "./comment.service";
import { Request, Response } from "express";

const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      console.error("Provide post id");
      throw new Error("Provide post id");
    }

    req.body.authorId = req.user.id;
    req.body.postId = postId;

    const result = await commentServices.createComment(req.body);

    return res.status(201).json({
      success: true,
      message: "commented successfully",
      data: result,
    });
  } catch (error: any) {}
};

export const commentController = {
  createComment,
};
