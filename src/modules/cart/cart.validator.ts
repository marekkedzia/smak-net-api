import { z as zod } from "zod";
import { Cart, CartState } from "./cart.interfaces";
import { Next, ParameterizedContext } from "koa";
import { CartRepository } from "./cart.repository";
import { InvalidCartStateTransition } from "../../errors/error.module";

const cartStateAsStrings: string[] = [CartState.ACTIVE, CartState.INACTIVE, CartState.AWAITING_PAYMENT];
export const cartStateValidator = zod.object({
    state: zod.string().refine((state) => cartStateAsStrings.includes(state))
  }
).required();

export const cartProductValidator = zod.object({
    count: zod.number().positive().int()
  }
).required();

export const validateStateTransition = async (ctx: ParameterizedContext, next: Next) => {
  const { state } = ctx.request.body;
  const cartId = ctx.params.cartId;
  const cartCurrentState: CartState | undefined = await CartRepository.findOneById(cartId).then((cart: Cart | null) => cart?.state);

  if (state === CartState.ACTIVE && cartCurrentState !== CartState.INACTIVE)
    throw new InvalidCartStateTransition();

  if (cartCurrentState === CartState.AWAITING_PAYMENT)
    throw new InvalidCartStateTransition();

  await next();
};