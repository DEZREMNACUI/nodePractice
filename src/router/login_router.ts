import KoaRouter from "@koa/router";
import { Context, Next } from "koa";
import { verifyAuth, verifyLogin } from "../middleware/login_middleware";
import { loginController } from "../controller/login_controller";

export const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", verifyLogin, loginController.sign);

loginRouter.get("/test", verifyAuth,loginController.test);

