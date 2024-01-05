import { OperationId, Post, Route } from 'tsoa';
import { InternalRouter } from '../utils/schemas/router';
import { paths, variablesConfig } from '../config/variables.config';
import { ParameterizedContext } from 'koa';
import { HTTP_STATUS } from '../utils/constants/http.statuses';
import { WebhookService } from './webhook.service';
import { addRawBody } from '../utils/webhook.raw.body';
import { WebhookHeaders } from './webhook.interfaces';

@Route("/webhook")
export class WebhookRouter extends InternalRouter {

  constructor(private webhookService: WebhookService){
    super(paths.webhook);

    this.router.post("/", addRawBody, (ctx: ParameterizedContext) =>
      this.handleEvent(ctx.headers, ctx.request.rawBody)
        .then(() => {
          ctx.status = HTTP_STATUS.OK;
        }));
  }

  /*
    * Handle webhook event
   */
  @OperationId("Handle webhook event")
  @Post("/webhook")
  handleEvent(headers: WebhookHeaders, rawBody: string): Promise<void> {
    return this.webhookService.handleEvent(headers, rawBody);
  }
}