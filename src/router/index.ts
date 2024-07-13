import KoaRouter from "@koa/router"
import Koa, { DefaultContext, DefaultState } from "koa";
import fs from "fs";
export const registerRoutes = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  const files = fs.readdirSync(__dirname);

  files.forEach(file => {
    if (!file.endsWith("_router.ts")) { return }
    import(`./${file}`).then(({ default: router }: { default: KoaRouter<DefaultState, DefaultContext> }) => {
      app.use(router.routes());
      app.use(router.allowedMethods());
    });
  });
}
