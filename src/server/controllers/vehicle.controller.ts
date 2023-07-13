import { Prisma } from "@prisma/client";
import { type Context } from "~/pages/api/trpc/[trpc]";
import {
  VehicleByIdInput,
  type ListAllVehiclesInput,
} from "../schema/vehicle.schema";
import { TRPCError } from "@trpc/server";

const publicVehicleSelect = Prisma.validator<Prisma.VehicleSelect>()({
  id: true,
  name: true,
  description: true,
  image: true,
});
const privateVehicleSelect = Prisma.validator<Prisma.VehicleSelect>()({
  id: true,
  name: true,
  description: true,
  image: true,
});

export const listAllHandler = async ({
  input,
  ctx,
}: {
  input: ListAllVehiclesInput;
  ctx: Context;
}) => {
  /**
   * For pagination docs you can have a look here
   * @see https://trpc.io/docs/useInfiniteQuery
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
   */

  const limit = input.limit ?? 50;
  const { cursor } = input;
  const items = ctx.prisma.vehicle.findMany({
    select: publicVehicleSelect,
    take: limit + 1,
    where: {},
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });
  let nextCursor: typeof cursor | undefined = undefined;
  if ((await items).length > limit) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const nextItem = (await items).pop()!;
    nextCursor = nextItem.id;
  }
  return {
    items: (await items).reverse(),
    nextCursor,
  };
};

export const getOneHandler = async ({
  input,
  ctx,
}: {
  input: VehicleByIdInput;
  ctx: Context;
}) => {
  const { id } = input;
  const vehicle = await ctx.prisma.vehicle.findUnique({
    where: { id },
    select: publicVehicleSelect,
  });
  if (!vehicle) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `No Vehicle with id ${id}`,
    });
  }
  return vehicle;
};
