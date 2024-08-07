import { Context, DefaultContext, DefaultState, Next, ParameterizedContext } from "koa";
import { momentService } from "../service/moment_service";
import KoaRouter from "@koa/router";

class MomentController {
  create = async (ctx: Context, next: Next) => {
    const { content } = ctx.request.body as { content: string };

    const { id } = ctx.user as { id: number };

    const result = await momentService.create(content, id);

    ctx.body = {
      code: 0,
      message: "发表动态成功",
      data: result
    };
  }

  list = async (ctx: Context, next: Next) => {
    const { offset, size } = ctx.query as { offset: string, size: string };
    const result = await momentService.queryList(offset, size);
    ctx.body = {
      code: 0,
      data: result
    }
  }

  detail = async (ctx: ParameterizedContext<DefaultState, DefaultContext & Context & KoaRouter.RouterParamContext<DefaultState, DefaultContext & Context>, unknown>, next: Next) => {
    const { momentId } = ctx.params as { momentId: string };
    const result = await momentService.queryById(momentId);
    ctx.body = {
      code: 0,
      data: result
    }
  }

  update = async (ctx: Context, next: Next) => {
    const { content } = ctx.request.body as { content: string };
    const { momentId } = ctx.params as { momentId: string };
    const result = await momentService.update(momentId, content);
    ctx.body = {
      code: 0,
      message: "修改动态成功",
      data: result
    }
  }

  remove = async (ctx: Context) => {
    const { momentId } = ctx.params as { momentId: string };
    const result = await momentService.remove(momentId);
    ctx.body = {
      code: 0,
      message: "删除动态成功",
      data: result
    }
  }

  addLabels = async (ctx: Context, next: Next) => {
    const { labels } = ctx as any as { labels: Array<{ name: string, id: string }> };
    const { momentId } = ctx.params as { momentId: string };
    try {
      for (const label of labels) {
        const isExists = await momentService.hasLabel(momentId, label.id);
        if (!isExists) {
          const result = await momentService.addLabel(momentId, label.id);
          ctx.body = {
            code: 0,
            message: "为动态添加标签成功",
            data: result
          }
        }
      }
    } catch (error) {
      ctx.body = {
        code: -3001,
        message: "为动态添加标签失败"
      }
    }
  }
}

export const momentController = new MomentController();