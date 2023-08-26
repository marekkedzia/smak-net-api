import { WeddingName } from "./wedding";
import { ServerDateType } from "../../../services/date.service";

export interface WeddingRequestBody {
  name: WeddingName;
  date: ServerDateType;
}