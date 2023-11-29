import * as zod from "zod";
import { CATEGORY, variablesConfig } from '../../config/variables.config';
import { mapValuesToString } from '../../utils/map.to.string';

const categoriesAsStrings = mapValuesToString(CATEGORY);

export const productValidator = zod.object({
    name: zod.string().max(variablesConfig.maxProductNameLength).nonempty(),
    category: zod.string().refine((category) => categoriesAsStrings.includes(category)),
    description: zod.string().max(variablesConfig.maxProductDescriptionLength).nonempty(),
    price: zod.number().positive()
  }
).required();