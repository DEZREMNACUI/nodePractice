import { connection } from "../app/database";

class CommentService {
  create = async (userId: string, content: string, momentId: string) => {
    const statement = `
INSERT INTO comment (user_id,moment_id,content) VALUES (?,?,?);
    `;
    try {
      const [result] = await connection.execute(statement, [userId, momentId, content]);
      return result
    } catch (error) {
      console.error(error);
    }
  }
}

export const commentService = new CommentService();