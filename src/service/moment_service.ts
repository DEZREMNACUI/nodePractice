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
JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'createTime',u.create_at,'updateTime',u.update_at) user,
(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
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
JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'createTime',u.create_at,'updateTime',u.update_at) user,
(SELECT (JSON_ARRAYAGG(
    JSON_OBJECT(
        'id',c.id,'comment',c.content,'commentId',c.comment_id,'createTime',c.createAt,
        'user', JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.avatar_url)
    )
)) FROM comment c
LEFT JOIN user cu ON c.user_id = cu.id
WHERE c.moment_id = m.id
) comments,
JSON_ARRAYAGG(JSON_OBJECT(
	'id',l.id,'name', l.name
)) labels
FROM moment m 
LEFT JOIN user u 
ON u.id = m.user_id
LEFT JOIN moment_label ml ON m.id = ml.moment_id
LEFT JOIN label l ON ml.label_id = l.id
WHERE m.id = ?
GROUP BY m.id;
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

  hasLabel = async (momentId: string, labelId: string) => {
    const statement = `
SELECT * FROM moment_label WHERE moment_id=? AND label_id=?;
    `;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return !!(result as Array<any>).length
  }

  addLabel = async (momentId:string,labelId:string)=>{
    const statement = `
INSERT INTO moment_label (moment_id,label_id) values(?,?);
    `;
    const [result] = await connection.execute(statement,[momentId,labelId]);
    return result;
  }
}



export const momentService = new MomentService();