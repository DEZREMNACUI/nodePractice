import { connection } from "../app/database"

class PermissionService {
  checkResource = async (resourceName: string, resourceId: string, userId: string) => {
    const statement = `
SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;
    `;
    try {
      const [result] = await connection.execute(statement, [resourceId, userId]);
      return !!(result as Array<any>).length;
    } catch (error) {
      console.log(error);
    }
  }
}

export const permissionService = new PermissionService();