import { HTTPException } from "hono/http-exception";
import { getPool } from "../db/db.js";

export class CompoundModel {
  static async findById(id: number) {
    const result = await getPool().query("SELECT * FROM gehege WHERE id = $1", [id]);
    if (result.rowCount === 0) throw new HTTPException(404, { message: "no compound found" });
    return result.rows;
  }

  static async findAll() {
    const result = await getPool().query("SELECT * FROM gehege");
    if (result.rowCount === 0) throw new HTTPException(404, { message: "no compunds found" });
    return result.rows;
  }

  static async updateById(id: number, updates: { groesse?: number; instandhaltungskosten?: number; name?: string }) {
    const body = Object.keys(updates)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(", ");
    const values = [id, ...Object.values(updates)];
    const result = await getPool().query(`UPDATE gehege SET ${body} WHERE id = $1 RETURNING *`, values);
    return result.rows[0];
  }

  static async deleteById(id: number) {
    const result = await getPool().query(`DELETE FROM gehege WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
  }

  static async createCompound(data: { groesse: number; instandhaltungskosten: number; name: string }) {
    const { groesse, instandhaltungskosten, name } = data;
    const result = await getPool().query(`INSERT INTO gehege (groesse, instandhaltungskosten, name) VALUES ($1, $2, $3) RETURNING *`, [
      groesse,
      instandhaltungskosten,
      name,
    ]);
    return result.rows[0];
  }
}
