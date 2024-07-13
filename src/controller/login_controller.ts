import { Next } from "koa";
import { Context } from "koa";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY, PUBLIC_KEY } from "../config/secret";
import { UNAUTHORIZATION } from "../config/error";

class LoginController {
  sign = (ctx: Context, next: Next) => {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: "1d",
      algorithm: "RS256"
    });

    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        token
      }
    }
  }

  test = (ctx: Context, next: Next) => {
    ctx.body = "授权通过";
  }
}

export const loginController = new LoginController();