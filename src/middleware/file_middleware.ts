import multer from "@koa/multer";
import { UPLOAD_PATH } from "../config/path";

const uploadAvatar = multer({
  dest:UPLOAD_PATH
});

export const handleAvatar = uploadAvatar.single("avatar");