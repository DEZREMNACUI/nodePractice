import { Context, Next } from "koa";
import { user, userService } from "../service/user_service";
import { fileService } from "../service/file_service";
import fs from "fs";
import { UPLOAD_PATH } from "../config/path";

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

  showAvatarImage = async (ctx: Context, next: Next) => {
    const { userId } = ctx.params as { userId: string };
    const avatarInfo = await fileService.queryAvatarWithUserId(userId);
    const { filename, mimetype } = avatarInfo as { filename: string, mimetype: string };
    ctx.type = mimetype;
    
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}

export const userController = new UserController();