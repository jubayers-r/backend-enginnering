import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const isFeatured =
      req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined;

    const status =
      req.query.status === "DRAFT"
        ? "DRAFT"
        : req.query.status === "PUBLISHED"
        ? "PUBLISHED"
        : req.query.status === "ARCHIVED"
        ? "ARCHIVED"
        : undefined;


    const authorId = req.query.authorId as string;

    const result = await postService.getPost({
      search,
      tags,
      isFeatured,
      status,
      authorId
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const postController = {
  createPost,
  getPost,
};
