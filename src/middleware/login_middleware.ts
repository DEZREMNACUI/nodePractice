import { Context, Next } from "koa";
import { user, userService } from "../service/user_service";
import { NAME_IS_NOT_EXISTS, NAME_OR_PASSWORD_IS_REQUIRED, PASSWORD_IS_NOT_CORRENT, UNAUTHORIZATION } from "../config/error";
import { md5password } from "../../utils/md5-password";
import { PUBLIC_KEY } from "../config/secret";
import jwt from "jsonwebtoken";

export const verifyLogin = async (ctx: Context, next: Next) => {
  const { name, password } = ctx.request.body as user;

  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  const users = await userService.findUserByName(name);

  if (!(users as any as Array<any>).length) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }

  const user = (users as any as Array<any>)[0];
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_NOT_CORRENT, ctx);
  }

  ctx.user = user as { name: string, id: number };

  next()
}

export const verifyAuth = async (ctx: Context, next: Next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
  const token = authorization?.replace("Bearer ", "");
  try {
    const result = jwt.verify(token as string, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result;

    await next()
  } catch (error) {
    ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
}
