import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(403).json({
      error: "Unauthorized",
    });
  }

  const result = await postService.createPost(req.body, user.id);
  return res.status(201).json({
    success: true,
    data: result,
  });
};

export const postController = {
  createPost,
};
