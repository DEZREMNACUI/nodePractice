import { connection } from "../app/database";

class LabelService {
  create = async (name: string) => {
    const statement = `
INSERT INTO label (name) VALUES (?);
    `;
    const [result] = await connection.execute(statement, [name])
    return result
  }

  queryLabelByName = async (name: string) => {
    const statement = `
SELECT * FROM label WHERE name = ?;
    `;
    const [result] = await connection.execute(statement, [name]);
    return (result as Array<any>)[0];
  }
}

export const labelService = new LabelService();