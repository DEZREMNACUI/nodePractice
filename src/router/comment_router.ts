import KoaRouter from "@koa/router";
import { verifyAuth } from "../middleware/login_middleware";
import { commentController } from "../controller/comment_controller";

export const commentRouter = new KoaRouter({ prefix: "/comment" });
export default commentRouter;

commentRouter.post("/", verifyAuth, commentController.create);