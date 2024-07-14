import { Context, Next } from "koa";
import { commentService } from "../service/comment_service";

class CommentController {
  create = async (ctx: Context, next: Next) => {
    const { content, momentId } = ctx.request.body as { content: string, momentId: string };
    const { id } = ctx.user as { id: string };
    const result = await commentService.create(id, content, momentId);
    ctx.body = {
      code: 0,
      message: "评论发表成功",
      data: result
    }
  }
}

export const commentController = new CommentController();