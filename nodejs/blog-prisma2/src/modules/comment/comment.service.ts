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

export const commentServices = {
  createComment,
};
