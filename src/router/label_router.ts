import KoaRouter from "@koa/router";
import { verifyAuth } from "../middleware/login_middleware";
import { labelController } from "../controller/label_controller";

export const labelRouter = new KoaRouter({ prefix: "/label" });
export default labelRouter;
labelRouter.post("/", verifyAuth, labelController.create);