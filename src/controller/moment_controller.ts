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
}

export const momentController = new MomentController();