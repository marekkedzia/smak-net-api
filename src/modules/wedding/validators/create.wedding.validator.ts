import { z as zod } from "zod";
import { DateService } from "../../../services/date.service";

const MAX_NAME_LENGTH = 255;

export const createWeddingValidator = zod.object({
  name: zod.string().max(MAX_NAME_LENGTH).nonempty(),
  date: zod.number().int().min(DateService.getDateNow())
}).required();