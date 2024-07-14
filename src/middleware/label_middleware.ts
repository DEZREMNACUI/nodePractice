import { Context, Next } from "koa";
import { labelService } from "../service/label_service";

export const verifyLabelExists = async (ctx: Context, next: Next) => {
  const { labels } = ctx.request.body as { labels: Array<string> };
  const newLabels: Array<object> = [];
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name);
    if (result) {
      newLabels.push({ id: result.id, name: result.name });
    } else {
      const result = await labelService.create(name);
      newLabels.push({ id: (result as any).insertId, name });
    }
  }
  ctx.labels = newLabels;
  await next();
}