import { z } from "zod";
/*
Look at this link 

https://github.com/wpcodevo/nextjs-trpc-crud-app/blob/main


*/
// CreatePost schema
export const createPostSchema = z.object({
  title: z.string({ required_error: "title is required" }),
  body: z.string({ required_error: "body is required" }),
  published: z.boolean().optional(),
  category: z.string().optional(),
  slug: z.string().optional(),
});

export const params = z.object({
  postId: z.string(),
});

// UpdatePost schema
export const updatePostSchema = z.object({
  params,
  body: z
    .object({
      title: z.string(),
      body: z.string(),
      published: z.boolean(),
      category: z.string(),
      slug: z.string(),
    })
    .partial(),
});
export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreatePostInput = z.TypeOf<typeof createPostSchema>;
export type UpdatePostInput = z.TypeOf<typeof updatePostSchema>;
