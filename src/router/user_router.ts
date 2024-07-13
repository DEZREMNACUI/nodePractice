import KoaRouter from "@koa/router";
import { userController } from "../controller/user_controller";
import { handlePassword, verifyUser } from "../middleware/user_middleware";
export const useRouter = new KoaRouter({ prefix: "/users" });

//用户注册接口
useRouter.post("/", verifyUser, handlePassword, userController.create);

useRouter.get("/list", (ctx, next) => {
  ctx.body = "user list";
});

export default useRouter;