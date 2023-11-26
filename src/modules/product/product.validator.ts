import { z as zod } from "zod";
import { variablesConfig } from "../../config/variables.config";
import { CATEGORY } from './product.interfaces';

const categoryValues = Object.values(CATEGORY) as [string, ...string[]];

export const productValidator = zod.object({
    name: zod.string().max(variablesConfig.maxProductNameLength).nonempty(),
    category: zod.enum(categoryValues),
    description: zod.string().max(variablesConfig.maxProductDescriptionLength).nonempty(),
    price: zod.number().positive()
  }
).required();