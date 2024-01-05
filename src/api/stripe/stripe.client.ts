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

  createPaymentSession = ({ amount }): Promise<PaymentSessionId> =>
    this.client.checkout.sessions.create({
      // @ts-ignore
        payment_method_types: variablesConfig.allowedPaymentMethods,
        line_items: [{
          price_data: {
            currency: variablesConfig.handledCurrencies.PLN,
            product_data: {
              name: variablesConfig.paymentProductName,
            },
            unit_amount: amount,
          },
          quantity: variablesConfig.paymentProductsQuantity,
        }],
      mode: variablesConfig.paymentMode,
      success_url: appConfig.PAYMENT_SUCCESS_URL,
      cancel_url: appConfig.PAYMENT_CANCEL_URL
      }
    ).then((session: Stripe.Checkout.Session): PaymentSessionId => session.id as PaymentSessionId);

}