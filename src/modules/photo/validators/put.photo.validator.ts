import { z as zod } from "zod";

const MAX_AUTHOR_LENGTH = 255;
const MAX_DESCRIPTION_LENGTH = 2048;
export const putPhotoValidator = zod.object({
  author: zod.string().max(MAX_AUTHOR_LENGTH).nonempty(),
  description: zod.string().max(MAX_DESCRIPTION_LENGTH).nonempty()
}).required();