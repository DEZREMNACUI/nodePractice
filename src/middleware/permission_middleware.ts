import { Context, Next } from "koa";
import { permissionService } from "../service/permission_service";
import { PERMISSION_IS_NOT_ALLOWED } from "../config/error";

export const verifyPermisson = (resourceName: string) => async (ctx: Context, next: Next) => {
  const keys = Object.keys(ctx.params);
  const resourceId = ctx.params[keys[0]];
  const {id} = ctx.user as {id:string};
  const isPermission = await permissionService.checkResource(resourceName, resourceId, id);
  if (!isPermission) {
    ctx.app.emit("error", PERMISSION_IS_NOT_ALLOWED, ctx);
    return;
  }

  await next();
}