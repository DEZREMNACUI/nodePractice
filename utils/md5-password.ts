import crypto from "crypto"
export const md5password = (password: string) => {
  const md5 = crypto.createHash("md5");
  const md5Password = md5.update(password).digest("hex");
  return md5Password;
}