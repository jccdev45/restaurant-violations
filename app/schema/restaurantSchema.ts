// restaurantSchema.ts
import { z } from "zod";

const PARAM_COLS = [
  "score",
  "grade",
  "inspection_date",
  "zipcode",
  "critical_flag",
] as const;
const CRITICAL_FLAG_VALUES = [
  "CRITICAL",
  "NOT CRITICAL",
  "NOT APPLICABLE",
] as const;
const GRADE_VALUES = ["A", "B", "C", "Z", "P"] as const;

const ORDER_COLS = z.enum(PARAM_COLS);
const ORDER_DIRS = z.enum(["ASC", "DESC"]);
const WHERE_OPERATORS = z.enum([
  "<",
  "<=",
  ">",
  ">=",
  "!=",
  "=",
  "IS NULL",
  "IS NOT NULL",
  "+",
  "-",
  "*",
  "/",
  "%",
  "^",
]);

export const restaurantSearchSchema = z
  .object({
    score: z.string().optional(),
    grade: z.enum(GRADE_VALUES).optional(),
    inspection_date: z.date().optional(),
    zipcode: z.string().max(5).optional(),
    critical_flag: z.enum(CRITICAL_FLAG_VALUES).optional(),
    $group: z.string().optional(),
    $limit: z.number().max(10000).catch(2500).optional(),
    $offset: z.number().catch(0).optional(),
    $q: z.string().optional(),
    $order: z.string().catch("inspection_date DESC").optional(),
    $where: z.string().optional(),
  })
  .optional();

export type RestaurantSearchParams = z.infer<typeof restaurantSearchSchema>;
