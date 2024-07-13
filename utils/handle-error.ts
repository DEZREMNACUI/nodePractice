import { Context } from "koa";
import { app } from "../src/app";
import { NAME_IS_NOT_EXISTS, NAME_OR_PASSWORD_IS_REQUIRED, PASSWORD_IS_NOT_CORRENT, PERMISSION_IS_NOT_ALLOWED, UNAUTHORIZATION, USER_IS_ALREADY_EXIST } from "../src/config/error";

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
    case NAME_IS_NOT_EXISTS:
      code = -1003;
      message = "用户名不存在";
      break;
    case PASSWORD_IS_NOT_CORRENT:
      code = -1004;
      message = "密码不正确";
      break;
    case UNAUTHORIZATION:
      code = -1005;
      message = "没有授权(token不正确)";
      break;
    case PERMISSION_IS_NOT_ALLOWED:
      code = -2001;
      message = "没有操作该资源的权限";
      break;
  }

  ctx.body = {
    code,
    message
  }
});