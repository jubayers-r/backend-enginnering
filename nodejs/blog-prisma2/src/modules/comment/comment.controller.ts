import { commentServices } from "./comment.service";
import { Request, Response } from "express";

const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;
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

const getCommentById = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await commentServices.getCommentById(commentId as string);

  return res.status(200).json({
    data: result,
  });
};

const getCommentByAuthorId = async (req: Request, res: Response) => {
  const { authorId } = req.params;

  const result = await commentServices.getCommentByAuthorId(authorId as string);

  return res.status(200).json({
    data: result,
  });
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { id } = req.user;

    const result = await commentServices.deleteComment(commentId as string, id);

    if (!id) {
      throw new Error("id not found");
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error: any) {
    return res.json({
      error: "comment delete failed",
      details: error.message,
    });
  }
};
const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { id } = req.user;

    const { content, status } = req.body;

    const result = await commentServices.updateComment(
      commentId as string,
      { content, status },
      id
    );

    if (!id) {
      throw new Error("id not found");
    }
    return res.status(200).json({
      data: result,
    });
  } catch (error: any) {
    return res.json({
      error: "comment updation failed",
      details: error.message,
    });
  }
};

const moderateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    const { status } = req.body;

    const result = await commentServices.moderateComment(
      commentId as string,
      status,
    );

    return res.json({
      data: result
    });
  } catch (error: any) {
    return res.json({
      error: error.message
    })
  }
};

export const commentController = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  deleteComment,
  updateComment,
  moderateComment,
};
