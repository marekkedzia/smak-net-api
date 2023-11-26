import { z as zod } from "zod";
import { CATEGORY, variablesConfig } from '../../config/variables.config';

export const productValidator = zod.object({
    name: zod.string().max(variablesConfig.maxProductNameLength).nonempty(),
    category: zod.nativeEnum(CATEGORY),
    description: zod.string().max(variablesConfig.maxProductDescriptionLength).nonempty(),
    price: zod.number().positive()
  }
).required();