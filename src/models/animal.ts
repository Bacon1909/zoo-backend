import { HTTPException } from "hono/http-exception";
import { getPool } from "../db/db.js";

export class AnimalModel {
  static async findById(id: number) {
    const result = await getPool().query("SELECT * FROM tier WHERE id = $1", [id]);
    if (result.rowCount === 0) throw new HTTPException(404, { message: "no animal found" });
    return result.rows;
  }

  static async findAll() {
    const result = await getPool().query("SELECT * FROM tier");
    if (result.rowCount === 0) throw new HTTPException(404, { message: "no animals found" });
    return result.rows;
  }

  static async updateById(id: number, updates: { name?: string; gehege_id?: number; tierazt_id?: number }) {
    const body = Object.keys(updates)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(", ");
    const values = [id, ...Object.values(updates)];
    const result = await getPool().query(`UPDATE tier SET ${body} WHERE id = $1 RETURNING *`, values);
    return result.rows[0];
  }

  static async deleteById(id: number) {
    const result = await getPool().query(`DELETE FROM tier WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
  }

  static async createAnimal(data: { name: string; gehege_id: number; tierazt_id: number }) {
    //Constraints
    //1. Tier darf  niemals ohne Tierarzt
    //2.Tierarzt max 25 tiere
    //3. tier muss in gehege passen (kapazität)

    const { name, gehege_id, tierazt_id } = data;
    const result = await getPool().query(`INSERT INTO tier (name, gehege_id, tierazt_id) VALUES ($1, $2, $3) RETURNING *`, [
      name,
      gehege_id,
      tierazt_id,
    ]);
    return result.rows[0];
  }
}
