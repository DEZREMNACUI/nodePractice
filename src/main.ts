import { app } from "./app";
import { SERVER_PORT } from "./config/server";
import "../utils/handle-error"
app.listen(SERVER_PORT, () => {
  console.log("ts服务器启动");
}) 