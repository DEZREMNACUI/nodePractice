import Koa from "koa";
import bodyParser from "koa-bodyparser"
import { registerRoutes } from "../router";

export const app = new Koa();
app.use(bodyParser());

registerRoutes(app);