import Stripe from 'stripe';
import { appConfig } from '../config/app.config';
import { variablesConfig, webhookEventTypes } from '../config/variables.config';
import { WebhookHeaders } from './webhook.interfaces';
import { MissingStripeSignature, UnhandledStripeEvent } from '../errors/error.module';

export class WebhookService {
  client: Stripe;

  constructor() {
    this.client = new Stripe(appConfig.STRIPE_KEY,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { apiVersion: variablesConfig.stripeApiVersion }
    );
  }

  async handleEvent(headers: WebhookHeaders, rawBody: string): Promise<void> {
    const signature = headers[variablesConfig.stripeSignatureHeader];
    if (!signature) {
      throw new MissingStripeSignature()
    }

    const event = this.client.webhooks.constructEvent(
      rawBody,
      signature,
      appConfig.PAYMENT_WEBHOOK_SECRET
    );

      switch (event.type) {
        case webhookEventTypes.paymentSucceeded:
          console.log(`Payment succesfull. Event: ${event.type}`)
          return;
        case webhookEventTypes.paymentFailed:
          console.log(`Payment failed. Event: ${event.type}`)
          return;
        default:
          throw new UnhandledStripeEvent()
      }
  }
}