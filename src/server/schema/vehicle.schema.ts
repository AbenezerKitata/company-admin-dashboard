import { z } from "zod";
export const listAllVehiclesInput = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(),
});
export type ListAllVehiclesInput = z.infer<typeof listAllVehiclesInput>;

export const vehicleByIdInput = z.object({
  id: z.string(),
});
export type VehicleByIdInput = z.infer<typeof vehicleByIdInput>;
