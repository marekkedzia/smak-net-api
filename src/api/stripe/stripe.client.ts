import { PaymentKey } from "../../modules/payment/payment.interfaces";
import Stripe from "stripe";
import { appConfig } from "../../config/app.config";
import { variablesConfig } from "../../config/variables.config";

export class StripeClient {
  client: Stripe;

  constructor() {
    this.client = new Stripe(appConfig.STRIPE_KEY,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { apiVersion: variablesConfig.stripeApiVersion }
    );
  }

  getPaymentIntent = ({ amount }): Promise<PaymentKey> =>
    this.client.paymentIntents.create({
        amount,
        currency: variablesConfig.handledCurrencies.PLN,
        payment_method_types: variablesConfig.allowedPaymentMethods
      }
    ).then((paymentIntent: Stripe.PaymentIntent): PaymentKey => paymentIntent.client_secret as PaymentKey);
}