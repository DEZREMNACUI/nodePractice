import { Context, Next } from "koa";
import { fileService } from "../service/file_service";
import { userService } from "../service/user_service";
import { SERVER_HOST, SERVER_PORT } from "../config/server";

class FileController {
  create = async (ctx: Context, next: Next) => {
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user as { id: string };

    const result = await fileService.create(filename, mimetype, "" + size, id);

    const avatarUrl = `http://${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`;
    const result1 = await userService.updateUserAvatar(avatarUrl, id);
    ctx.body = {
      code: 0,
      message: "头像上传成功",
      data: avatarUrl
    }
  }
}

export const fileController = new FileController();