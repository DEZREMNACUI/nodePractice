import mysql from "mysql2";

const connetionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "my_hub",
  user: "root",
  password: "13550581080",
  connectionLimit: 5
})

connetionPool.getConnection((err, connection) => {
  if (err) {
    console.error("获取链接失败", err);
  }
  connection.connect(err => {
    if (err) {
      console.error("数据库交互失败", err);
    } else {
      console.log("数据库链接成功");
    }
  })
})

export const connection = connetionPool.promise();