import { z as zod } from "zod";
import { mapValuesToString } from "../../utils/map.to.string";
import { CartState } from "./cart.interfaces";

const cartStateAsStrings = mapValuesToString(CartState);
export const cartStateValidator = zod.object({
    state: zod.string().refine((state) => cartStateAsStrings.includes(state))
  }
).required();

export const cartProductValidator = zod.object({
    count: zod.number().positive().int()
  }
).required();