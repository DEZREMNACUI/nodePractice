import { connection } from "../app/database";

class FileService {
  create = async (filename: string, mimetype: string, size: string, userId: string) => {
    const statement = `
INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);
    `;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
    return result;
  }

  queryAvatarWithUserId = async (userId: string) => {
    const statement = `
  SELECT * FROM avatar WHERE user_id = ?
    `;
    const [result] = await connection.execute(statement, [userId]);
    return (result as Array<any>).pop();
  }
}

export const fileService = new FileService();