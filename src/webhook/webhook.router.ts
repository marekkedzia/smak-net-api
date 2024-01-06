import { OperationId, Post, Route } from 'tsoa';
import { InternalRouter } from '../utils/schemas/router';
import { paths, variablesConfig } from '../config/variables.config';
import { ParameterizedContext } from 'koa';
import { HTTP_STATUS } from '../utils/constants/http.statuses';
import { WebhookService } from './webhook.service';
import { WebhookHeaders } from './webhook.interfaces';

@Route("/webhook")
export class WebhookRouter extends InternalRouter {

  constructor(private webhookService: WebhookService){
    super(paths.webhook);

    this.router.post(`${paths.payment}`, (ctx: ParameterizedContext) =>
      this.handleEvent(ctx.headers, ctx.request.rawBody)
        .then(() => {
          ctx.status = HTTP_STATUS.CREATED;
        }));
  }

  /*
    * Handle payment webhook event
   */
  @OperationId("Handle webhook event")
  @Post("/webhook")
  handleEvent(headers: WebhookHeaders, rawBody: string): Promise<void> {
    return this.webhookService.handlePaymentEvent(headers, rawBody);
  }
}