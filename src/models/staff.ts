import { HTTPException } from "hono/http-exception";
import { getPool } from "../db/db.js";

export class StaffModel {
  static async findAll() {
    const result = await getPool().query("SELECT p.id, b.bezeichnung* FROM personal p JOIN beruf b ON package.beruf_id = bigint.id");
    if (result.rowCount === 0) throw new HTTPException(404, { message: "no staff found" });
    return result.rows;
  }

  static async getFreeVets() {
    const freeVets = await getPool().query(`
            SELECT p.id, COUNT(*) FROM personal p 
            JOIN beruf b ON p.beruf_id = b.id 
            JOIN tier t ON t.tierarzt_id = p.id
            WHERE b.bezeichnung = 'Tierarzt'
            GROUP BY p.id;
            `);

    if (freeVets.rowCount === 0) throw new HTTPException(404, { message: "no staff found" });
    return freeVets.rows;
  }
  static async findVetById(id: number) {
    const isVet = await getPool().query(`Select * FROM personal  Where id = ${id} and beruf_id = 2`);
    if (isVet.rowCount === 0) return false;
    return true;
  }
}
