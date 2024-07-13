import { Context, Next } from "koa";
import { connection } from "../app/database";

class MomentService {
  create = async (content: string, userId: number) => {
    const statement = "INSERT INTO moment (content,user_id) VALUES (?,?);";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  queryList = async (offset: string = "0", size: string = "10") => {
    const statement = `
SELECT m.id AS id, 
m.content content,
m.createAt createTime,
m.updateAt updateTime, 
JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.create_at,'updateTime',u.update_at) user
FROM moment m 
LEFT JOIN user u 
ON u.id = m.user_id 
LIMIT ? OFFSET ?;
    `;
    const [result] = await connection.execute(statement, [size, offset]);
    return result;
  }

  queryById = async (id: string) => {
    const statement = `
SELECT m.id AS id, 
m.content content,
m.createAt createTime,
m.updateAt updateTime, 
JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.create_at,'updateTime',u.update_at) user
FROM moment m 
LEFT JOIN user u 
ON u.id = m.user_id 
WHERE m.id = ?;
    `;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  update = async (momentId: string, content: string) => {
    const statement = `
UPDATE moment SET content = ? WHERE id = ?;
    `
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  remove = async (momentId: string) => {
    const statement = `
DELETE FROM moment WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}



export const momentService = new MomentService();