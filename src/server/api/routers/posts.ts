import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  createPostController,
  deletePostController,
  findAllPostsController,
  findPostController,
  updatePostController
} from '../controllers/posts'
import { updatePostSchema, createPostSchema, filterQuery, params } from '../models/posts'

export const postRouter = createTRPCRouter({
  getGreeting: publicProcedure.query((req) => { return { message: "welcome and Greetings!!" } }),
  createPost: protectedProcedure.input(createPostSchema).mutation(({ input, ctx }) => createPostController({ input, session: ctx.session })),
  updatePost: protectedProcedure.input(updatePostSchema).mutation(({ input, ctx }) => updatePostController({ paramsInput: input.params, input: input.body, session: ctx.session })),
  deletePost: protectedProcedure.input(params).mutation(({ input,ctx }) => deletePostController({ paramsInput: input, session: ctx.session })),
  getPost: publicProcedure.input(params).query(({ input }) => findPostController({ paramsInput: input })),
  getAllPosts: publicProcedure.input(filterQuery).query(({input})=>findAllPostsController({filterQuery: input, }))
})
export type PostRouter = typeof postRouter;
