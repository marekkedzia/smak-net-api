import { WebhookRouter } from '../webhook/webhook.router';
import { WebhookService } from '../webhook/webhook.service';
import { StripeClient } from '../api/stripe/stripe.client';

export const webhookService = new WebhookService(new StripeClient().constructPaymentEvent);

export const webhookRouter = new WebhookRouter(webhookService);