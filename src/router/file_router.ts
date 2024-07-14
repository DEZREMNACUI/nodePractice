import KoaRouter from "@koa/router";
import { verifyAuth } from "../middleware/login_middleware";
import { handleAvatar } from "../middleware/file_middleware";
import { fileController } from "../controller/file_controller";



export const fileRouter = new KoaRouter({ prefix: "/file" });
export default fileRouter;

fileRouter.post("/avatar", verifyAuth, handleAvatar, fileController.create);