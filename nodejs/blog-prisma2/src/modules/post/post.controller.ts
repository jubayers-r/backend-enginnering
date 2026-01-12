import { Request, Response } from "express";
import { postService } from "./post.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

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

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query
    );

    const result = await postService.getPost({
      search,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    return res.status(200).json({
      success: true,
      data: result.data,
      paginaton: result.pagination,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      throw new Error("Post Id required");
    }

    const result = await postService.getPostById(postId);

    if (result === null) {
      return res.status(404).json({
        success: false,
        message: "Post Id not found",
      });
    }

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

const getMyPosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const result = await postService.getMyPosts(id);

    return res.json({
      data: result
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Post getting failed";
    res.status(400).json({
      error: errorMessage,
      details: error,
    });
  }
};

export const postController = {
  createPost,
  getPost,
  getPostById,
  getMyPosts,
};
