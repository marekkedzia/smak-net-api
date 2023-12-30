import { z as zod } from "zod";

export const createOrderValidator = zod.object({
    note: zod.string().min(0).max(255).optional()
  }
).required();