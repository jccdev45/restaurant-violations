import { z } from "zod";

export const restaurantSearchSchema = z.object({
  $group: z.string().optional(),
  $having: z.string().optional(),
  $limit: z.number().catch(500).optional(),
  $offset: z.number().catch(0).optional(),
  $order: z.string().catch("inspection_date DESC").optional(),
  $q: z.string().optional(),
  $select: z.string().optional(),
  $where: z.string().optional(),
});
