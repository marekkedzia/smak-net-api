import { Payment } from "./payment.interfaces";
import { Mongo } from "../../db/mongo";

export class PaymentRepository {
  public static createPayment = async (payment: Payment): Promise<void> => {
    await Mongo.payments().insertOne(payment);
  };
}