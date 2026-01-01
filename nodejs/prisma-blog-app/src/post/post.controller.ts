import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Post creation failed",
      details: error,
    });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchType = typeof search === "string" ? search : undefined;
    const result = await postService.getAllPost({ search: searchType });
    return res.status(200).json({
      success: true,
      message: "",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Post query failed",
      details: error,
    });
  }
};

export const postController = {
  createPost,
  getAllPost,
};
