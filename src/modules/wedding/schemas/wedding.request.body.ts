import { WeddingName } from "./wedding";
import { ServerDateType } from "../../../utils/date.utils";

export interface WeddingRequestBody {
  name: WeddingName;
  date: ServerDateType;
}