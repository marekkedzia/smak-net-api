import Stripe from "stripe";
import { appConfig } from "../../config/app.config";
import { variablesConfig } from "../../config/variables.config";
import { PaymentSessionId } from '../../modules/payment/payment.interfaces';

export class StripeClient {
  client: Stripe;

  constructor() {
    this.client = new Stripe(appConfig.STRIPE_KEY,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { apiVersion: variablesConfig.stripeApiVersion }
    );
  }

  createPaymentSession = ({ lineItems, successUrl, cancelUrl }): Promise<PaymentSessionId> =>
    this.client.checkout.sessions.create({
      // @ts-ignore
        payment_method_types: variablesConfig.allowedPaymentMethods,
        line_items: lineItems,
      mode: variablesConfig.paymentMode,
      success_url: successUrl,
      cancel_url: cancelUrl
      }
    ).then((session: Stripe.Checkout.Session): PaymentSessionId => session.id as PaymentSessionId);

  constructPaymentEvent = (rawBody: string, signature: string): Stripe.Event => this.client.webhooks.constructEvent(
    rawBody,
    signature,
    appConfig.PAYMENT_WEBHOOK_SECRET
  )

}