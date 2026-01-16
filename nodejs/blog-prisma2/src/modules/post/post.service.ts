import {
  CommentStatus,
  Post,
  PostStatus,
} from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import prisma from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  return result;
};

const getPost = async ({
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
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const andConditions: PostWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          content: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search as string,
          },
        },
      ],
    });
  }

  if (tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }

  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeature: isFeatured,
    });
  }

  if (status) {
    andConditions.push({
      status: status,
    });
  }

  if (authorId) {
    andConditions.push({
      authorId: authorId,
    });
  }

  const allPosts = await prisma.post.findMany({
    skip,
    take: limit,
    where: {
      AND: andConditions,
    },
    orderBy: { [sortBy]: sortOrder },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const totalData = await prisma.post.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: allPosts,
    pagination: {
      totalData,
      page,
      limit,
      totalPages: Math.ceil(totalData / limit),
    },
  };
};

const getPostById = async (postId: string) => {
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id: postId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return await tx.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        comments: {
          where: {
            parentId: null,
            status: CommentStatus.APPROVED,
          },
          orderBy: { createdAt: "desc" },
          include: {
            replies: {
              where: {
                status: CommentStatus.APPROVED,
              },
              include: {
                replies: {
                  where: {
                    status: CommentStatus.APPROVED,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  });
};

const getMyPosts = async (authorId: string) => {
  const authorData = await prisma.post.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  if (!authorData.length) {
    throw new Error("You has no posts");
  }

  const total = await prisma.post.aggregate({
    _count: true,
    where: {
      authorId,
    },
  });

  return { authorData, total };
};

const updatePost = async (
  postId: string,
  data: Partial<Post>,
  isAdmin: boolean
) => {
  const postData = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!postData) {
    throw new Error("post data not found");
  }

  if (!isAdmin) {
    delete data.isFeature;
  }

  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data,
  });

  return result;
};

export const postService = {
  createPost,
  getPost,
  getPostById,
  getMyPosts,
  updatePost,
};
