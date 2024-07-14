import { Context, Next } from "koa";
import { labelService } from "../service/label_service";

class LabelController {
  create = async (ctx: Context, next: Next) => {
    const { name } = ctx.request.body as { name: string };
    const result = await labelService.create(name);
    ctx.body = {
      code: 0,
      message: "创建标签成功",
      data: result
    }
  }
}

export const labelController = new LabelController();