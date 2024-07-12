import Koa from "koa";
import { useRouter } from "../router/user_router";
import bodyParser from "koa-bodyparser"
import { loginRouter } from "../router/login_router";

export const app = new Koa();
app.use(bodyParser());

app.use(useRouter.routes());
app.use(useRouter.allowedMethods());

app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());