import { z as zod } from "zod";
import { variablesConfig } from "../../config/variables.config";


export const productValidator = zod.object({
    name: zod.string().max(variablesConfig.maxProductNameLength).nonempty(),
    description: zod.string().max(variablesConfig.maxProductDescriptionLength).nonempty(),
    price: zod.number().positive()
  }
).required();