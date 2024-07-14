import KoaRouter from "@koa/router";
import { verifyAuth } from "../middleware/login_middleware";
import { momentController } from "../controller/moment_controller";
import { verifyPermisson } from "../middleware/permission_middleware";
import { verifyLabelExists } from "../middleware/label_middleware";

export const momentRouter = new KoaRouter({ prefix: "/moment" });
export default momentRouter;

momentRouter.post("/", verifyAuth, momentController.create);
momentRouter.get("/", momentController.list);
momentRouter.get("/:momentId", momentController.detail);
momentRouter.patch("/:momentId", verifyAuth, verifyPermisson("moment"), momentController.update);
momentRouter.delete("/:momentId", verifyAuth, verifyPermisson("moment"), momentController.remove);

momentRouter.post("/:momentId/labels", verifyAuth, verifyPermisson("moment"), verifyLabelExists, momentController.addLabels);