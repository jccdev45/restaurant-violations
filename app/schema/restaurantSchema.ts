import { z } from "zod";

export const restaurantSearchSchema = z.object({
  restaurantsView: z
    .object({
      // camis: z.string().optional(),
      $group: z.string().optional(),
      $having: z.string().optional(),
      $limit: z.number().catch(500).optional(),
      $offset: z.number().catch(0).optional(),
      $order: z.string().catch("inspection_date DESC").optional(), // $order is now a string in the schema
      $q: z.string().optional(),
      $select: z.string().optional(),
      $where: z.string().optional(),
    })
    .optional(),
});
