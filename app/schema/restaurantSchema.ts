import { z } from "zod";

const PARAM_COLS = {
  score: "score",
  grade: "grade",
  inspection_date: "inspection_date",
  zipcode: "zipcode",
  critical_flag: "critical_flag",
} as const;

const CRITICAL_FLAG_VALUES = {
  CRITICAL: "CRITICAL",
  "NOT CRITICAL": "NOT CRITICAL",
  "NOT APPLICABLE": "NOT APPLICABLE",
};

const GRADE_VALUES = {
  A: "A",
  B: "B",
  C: "C",
  Z: "Z",
  P: "P",
};

const ORDER_VALUES = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

const WHERE_OPERATORS = {
  "<": "<",
  "<=": "<=",
  ">": ">",
  ">=": ">=",
  "!=": "!=",
  "=": "=",
  "IS NULL": "IS NULL",
  "IS NOT NULL": "IS NOT NULL",
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  "%": "%",
  "^": "^",
} as const;

export const restaurantSearchSchema = z
  .object({
    score: z.string().optional(),
    grade: z
      .enum(Object.values(GRADE_VALUES) as [string, ...string[]])
      .optional(),
    inspection_date: z.date().optional(),
    zipcode: z.string().max(5).optional(),
    critical_flag: z
      .enum(Object.values(CRITICAL_FLAG_VALUES) as [string, ...string[]])
      .optional(),
    $group: z.string().optional(),
    $having: z.string().optional(),
    $limit: z.number().max(10000).catch(2500).optional(),
    $offset: z.number().catch(0).optional(),
    $order: z
      .object({
        column: z
          .enum([
            PARAM_COLS.zipcode,
            PARAM_COLS.inspection_date,
            PARAM_COLS.grade,
            PARAM_COLS.score,
            PARAM_COLS.critical_flag,
          ])
          .catch(PARAM_COLS.inspection_date),
        direction: z
          .enum([ORDER_VALUES.ASC, ORDER_VALUES.DESC])
          .catch(ORDER_VALUES.DESC),
      })
      .transform((value) => `${value.column} ${value.direction}`)
      .optional(),
    $q: z.string().optional(),
    $where: z
      .object({
        column: z
          .enum([
            PARAM_COLS.score,
            PARAM_COLS.grade,
            PARAM_COLS.inspection_date,
          ])
          .catch(PARAM_COLS.score),
        operators: z
          .enum(Object.values(WHERE_OPERATORS) as [string, ...string[]])
          .catch(WHERE_OPERATORS["="]),
        value: z.number().catch(0),
      })
      .transform((value) => `${value.column} ${value.operators} ${value.value}`)
      .optional(),
  })
  .optional();

export type RestaurantSearchParams = z.infer<typeof restaurantSearchSchema>;
