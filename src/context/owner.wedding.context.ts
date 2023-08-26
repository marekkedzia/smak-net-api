import { OwnerWeddingRouter } from "../modules/wedding/owner.wedding/owner.wedding.router";
import { WeddingRepository } from "../modules/wedding/wedding.repository";
import { OwnerWeddingService } from "../modules/wedding/owner.wedding/owner.wedding.service";

export const weddingRouter = new OwnerWeddingRouter(new OwnerWeddingService(new WeddingRepository()));