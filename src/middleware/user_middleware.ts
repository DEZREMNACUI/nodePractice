import { Context, Next } from "koa";
import { user, userService } from "../service/user_service";
import { NAME_OR_PASSWORD_IS_REQUIRED, USER_IS_ALREADY_EXIST } from "../config/error";
import { md5password } from "../../utils/md5-password";

export const verifyUser = async (ctx: Context, next: Next) => {
  const { name, password } = ctx.request.body as user;
  if (name === "" || password === "") {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  const users = await userService.findUserByName(name);
  if ((users as any as number[]).length !== 0) {
    return ctx.app.emit("error", USER_IS_ALREADY_EXIST, ctx);
  }

  await next();
}

export const handlePassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body as user;
  (ctx.request.body as user).password = md5password(password);
  await next();
}