import { connection } from "../app/database";

export interface user {
  password: string,
  name: string
}
class UserService {
  async create(user: user) {
    const { password, name } = user;
    const statement = "INSERT INTO user (name,password) VALUES (?,?);"
    const [result] = await connection.execute(statement, [name, password]);
    return result
  }

  async findUserByName(name: string) {
    const statement = "SELECT * FROM user WHERE name = ?";
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async updateUserAvatar(avatarUrl:string,userId:string) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement,[avatarUrl,userId]);
    return result; 
  }
}

export const userService = new UserService();