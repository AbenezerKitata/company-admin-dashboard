import { Prisma, PrismaClient } from "@prisma/client";
import {
  CreatePostInput,
  ParamsInput,
  FilterQueryInput,
  UpdatePostInput,
} from "../models/posts";
import { TRPCError } from "@trpc/server";
import {Session} from 'next-auth'
const prisma = new PrismaClient();

export const createPostController = async ({
  input, session
}: {
    input: CreatePostInput;
    session: Session | null;
}) => {
  try {
    if (!session || !session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be logged in to create a post." });
    }
    const post = await prisma.post.create({
        data: {
            title: input.title,
            category: input.category,
            published: input.published,
            slug: input.slug,
            body: input.body,
            author: {connect: {id: session.user?.id}}
        }
    })
    return {
      status: "success",
      data: {
        post,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Post with that title already exists",
        });
      }
    }
    throw error;
  
  }
};
export const updatePostController = async ({ paramsInput, input, session }: {
  paramsInput: ParamsInput;
  input: UpdatePostInput['body'];
  session: Session | null; // Add session as an argument
}) => {
  try {
    if (!session || !session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be logged in to update a post." });
    }

    // Find the post and include the author's id in the query
    const post = await prisma.post.findUnique({
      where: { id: paramsInput.postId },
      include: { author: true },
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post with that id not found!!",
      });
    }

    // Check if the user's role is 900 or higher to allow the update
    if (session.user.role < 900 || post.author.id !== session.user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not authorized to update this post." });
    }

    const updatedPost = await prisma.post.update({
      where: { id: paramsInput.postId },
      data: {
        ...input,
        updatedById: session.user.id, // Record the user who performed the update
      },
    });

    return {
      status: "success",
      data: {
        post: updatedPost,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Post with that title already exists",
        });
      }
    }
    throw error;
  }
};


export const findPostController = async ({ paramsInput }: { paramsInput: ParamsInput }) => {
  try {
    const post = await prisma.post.findFirst({
      where: { id: paramsInput.postId },
    });
    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post with that id not found!!",
      });
    }
    return {
      status: "success",
      data: {
        post,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const findAllPostsController = async ({ filterQuery,  }: { filterQuery: FilterQueryInput; }) => {
  try {
    const page = filterQuery.page || 1;
    const limit = filterQuery.limit || 11;
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({ skip, take: limit });

    return {
      status: "success",
      data: {
        results: posts.length,
        posts,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const deletePostController = async ({ paramsInput, session }: { paramsInput: ParamsInput; session: Session | null; }) => {
  try {
    if (!session || !session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be logged in to delete a post." });
    }

    // Find the post and include the author's id in the query
    const post = await prisma.post.findUnique({
      where: { id: paramsInput.postId },
      include: { author: true },
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post with that id not found!!",
      });
    }

    // Check if the user's role is 900 or higher to allow the delete
    if (session.user.role < 900 || post.author.id !== session.user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not authorized to delete this post." });
    }

    await prisma.post.update({
      where: { id: paramsInput.postId },
      data: {
        deletedById: session.user.id, // Record the user who performed the delete
      },
    });

    await prisma.post.delete({ where: { id: paramsInput.postId } });

    return {
      status: "success",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note with that ID not found",
        });
      }
    }
    throw error;
  }
};