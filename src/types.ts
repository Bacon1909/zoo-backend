import z from "zod";
import { StaffModel } from "./models/staff.js";

export const GehegeSchema = z.object({
  id: z.number().optional(),
  groesse: z.number(),
  instandhaltungskosten: z.number(),
  name: z.string(),
});

export type Gehege = z.infer<typeof GehegeSchema>;

export const AnimalSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  gehege_id: z.number(),
  tierarzt_id: z.number().refine(async (VetId) => await StaffModel.findVetById(VetId), {
    message: "No Vet found",
  }),
});

export type Animal = z.infer<typeof AnimalSchema>;

// export type Gehege = {
//   id?: number;
//   groesse: number;
//   instandhaltungskosten: number;
//   name: string;
// };

// export type Animal = {
//   id?: number;
//   name: string;
//   gehege_id: number;
//   tierazt_id: number;
// };
