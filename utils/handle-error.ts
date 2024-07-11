import { Context } from "koa";
import { app } from "../src/app";
import { NAME_OR_PASSWORD_IS_REQUIRED, USER_IS_ALREADY_EXIST } from "../src/config/error";

app.on("error", (error: string, ctx: Context) => {
  let code = 0;
  let message = "";

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "用户名或密码不能为空";
      break;
    case USER_IS_ALREADY_EXIST:
      code = -1002;
      message = "用户早已存在";
      break;
  }

  ctx.body = {
    code,
    message
  }
});