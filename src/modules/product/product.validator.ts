import * as zod from "zod";
import { variablesConfig } from "../../config/variables.config";

const categoriesAsStrings = Object.values(variablesConfig.categories);

export const productValidator = zod.object({
    name: zod.string().max(variablesConfig.maxProductNameLength).nonempty(),
    category: zod.string().refine((category) => categoriesAsStrings.includes(category)),
    description: zod.string().max(variablesConfig.maxProductDescriptionLength).nonempty(),
    price: zod.number().positive()
  }
).required();