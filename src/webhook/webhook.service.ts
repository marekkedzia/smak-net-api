import Stripe from 'stripe';
import { variablesConfig, webhookEventTypes } from '../config/variables.config';
import { WebhookHeaders } from './webhook.interfaces';
import { logger } from '../utils/logger';

export class WebhookService {

  constructor(private constructPaymentEvent: (rawBody: string, signature: string) => Stripe.Event) {
  }

  async handlePaymentEvent(headers: WebhookHeaders, rawBody: string): Promise<void> {
    const signature = headers[variablesConfig.stripeSignatureHeader];
    if (!signature || Array.isArray(signature)) {
      logger.info(`Incorrect or missing verification data for webhook event`)
      return;
    }

    const event: Stripe.Event = this.constructPaymentEvent(
      rawBody,
      signature
    );

    const handler = this.findEventHandler[event.type] || this.defaultHandler;
    handler(event)
  }

  findEventHandler = {
    [webhookEventTypes.PAYMENT_SUCCEEDED]: (event: Stripe.Event) => {
      this.handleSuccessfulPaymentEvent(event);
    },
    [webhookEventTypes.PAYMENT_FAILED]: (event: Stripe.Event) => {
      this.handleFailedPaymentEvent(event);
    }
  };

  handleSuccessfulPaymentEvent(event: Stripe.Event): void {
    console.log(`Payment succesfull. Event: ${event.type}`)
  }

  handleFailedPaymentEvent(event: Stripe.Event): void {
    console.log(`Payment failed. Event: ${event.type}`)
  }

  defaultHandler = (event: Stripe.Event) => {
    logger.info(`Unhandled event: ${event.type}`);
  };
}