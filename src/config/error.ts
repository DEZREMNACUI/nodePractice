import dotenv from "dotenv";

dotenv.config()

export const { USER_IS_ALREADY_EXIST, NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWORD_IS_NOT_CORRENT, UNAUTHORIZATION } = process.env;