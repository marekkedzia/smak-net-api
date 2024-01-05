import { WebhookRouter } from '../webhook/webhook.router';
import { WebhookService } from '../webhook/webhook.service';

export const webhookService = new WebhookService();

export const webhookRouter = new WebhookRouter(webhookService);