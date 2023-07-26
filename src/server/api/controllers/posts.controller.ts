import { Prisma, PrismaClient } from "@prisma/client";
import {
  CreatePostInput,
  ParamsInput,
  FilterQueryInput,
  UpdatePostInput,
} from "../models/posts.model";

const prisma = new PrismaClient();

export const createPostController = async ({
  input,
}: {
  input: CreatePostInput;
}) => {
  try {
    // const post = await prisma.post.create({
    //     data: {
    //         title: input.title,
    //         category: input.category,
    //         published: input.published,
    //         slug: input.slug,
    //         body: input.body,
    //         author: input.author,
    //     }
    // })
  } catch (error) {}
};
