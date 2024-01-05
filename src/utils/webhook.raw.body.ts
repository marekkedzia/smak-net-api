import { ParameterizedContext, Next } from 'koa';
import getRawBody from 'raw-body';

export const addRawBody = async (ctx: ParameterizedContext, next: Next) => {
    ctx.request.rawBody = await getRawBody(ctx.req, {
        encoding: 'utf8'
    });
    await next();
}