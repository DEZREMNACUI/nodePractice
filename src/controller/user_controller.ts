import { Context, Next } from "koa";
import { user, userService } from "../service/user_service";

class UserController {
  async create(ctx: Context, next: Next) {
    const user = ctx.request.body as user;
    console.log(user);

    const result = await userService.create(user);
    ctx.body = {
      data: result,
      message: "用户创建成功~"
    };
    await next();
  }
}

export const userController = new UserController();