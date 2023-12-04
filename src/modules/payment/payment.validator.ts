import { z as zod } from "zod";

export const paymentRequestValidator = zod.object({
    resourceId: zod.string().nonempty()
  }
).required();