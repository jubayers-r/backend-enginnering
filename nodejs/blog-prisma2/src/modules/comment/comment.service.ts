import { CommentStatus } from "../../../generated/prisma/enums";
import prisma from "../../lib/prisma";

const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  id: string;
  parentId?: string;
}) => {
  const postExists = await prisma.post.findUnique({
    where: {
      id: payload.postId,
    },
  });
  if (!postExists) {
    console.log("Post doesnt exist");
    throw new Error("Post doesnt exist");
  }

  if (payload.parentId) {
    const parentExist = await prisma.comment.findUnique({
      where: {
        id: payload.parentId,
      },
    });
    if (!parentExist) {
      console.log("parent Comment doesnt exist");
      throw new Error("parent Comment doesnt exist");
    }
  }

  return await prisma.comment.create({
    data: payload,
  });
};

const getCommentById = async (commentId: string) => {
  const result = await prisma.comment.findMany({
    where: {
      id: commentId,
    },
    include: {
      parent: {
        select: {
          id: true,
          content: true,
        },
      },
      post: {
        select: {
          id: true,
          content: true,
          views: true,
        },
      },
    },
  });
  return result;
};

const getCommentByAuthorId = async (authorId: string) => {
  return await prisma.comment.findMany({
    where: {
      authorId: authorId,
    },
  });
};

const deleteComment = async (commentId: string, authorId: string) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  if (!commentData) {
    throw new Error("Your provided value is invalid");
  }

  const result = await prisma.comment.delete({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  return result;
};

const updateComment = async (
  commentId: string,
  data: { content: string; status?: CommentStatus },
  authorId: string
) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
  });

  if (!commentData) {
    throw new Error("Invalid comment id");
  }

  return await prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data,
  });
};

const moderateComment = async (
  commentId: string,
  status: CommentStatus,
) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,

    },
    select: {
      id: true,
      status: true,
    },
  });

  if(!commentData){
    throw new Error("invalid commentid")
  }

  if (commentData.status === status) {
    throw new Error(`comment status (${status}) is already up to dated`);
  }

  return prisma.comment.update({
    where: { id: commentId },
    data: { status },
  });
};

export const commentServices = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  deleteComment,
  updateComment,
  moderateComment,
};
