import { GuestWeddingService } from "../modules/wedding/guest.wedding/guest.wedding.service";
import { GuestWeddingRouter } from "../modules/wedding/guest.wedding/guest.wedding.router";
import { WeddingRepository } from "../modules/wedding/wedding.repository";

export const guestWeddingRouter = new GuestWeddingRouter(new GuestWeddingService(new WeddingRepository()));