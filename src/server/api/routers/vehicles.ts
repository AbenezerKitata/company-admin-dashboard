import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  listAllVehiclesInput,
  vehicleByIdInput,
} from "~/server/schema/vehicle.schema";
import {
  getOneHandler,
  listAllHandler,
} from "~/server/controllers/vehicle.controller";

const privateVehicleSelect = Prisma.validator<Prisma.VehicleSelect>()({
  id: true,
  name: true,
  description: true,
  image: true,
});

export const vehicleRouter = createTRPCRouter({
  listAllVehicles: publicProcedure
    .input(listAllVehiclesInput)
    .query(listAllHandler),
  getVehicleById: publicProcedure.input(vehicleByIdInput).query(getOneHandler),
  addVehicle: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(3).max(32),
        description: z.string().min(5),
        image: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: `You are not authorized to make a vehicle!!`,
        });
      }
      const vehicle = await ctx.prisma.vehicle.create({
        data: { ...input, userId },
        select: privateVehicleSelect,
      });
      return vehicle;
    }),
  // updateVehicle: protectedProcedure.input()
});
