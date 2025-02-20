CREATE TYPE standart AS ENUM (
  'Eis',
  'Regenschirm',
  'Infokarte',
  'Burger'
);
 
CREATE TABLE "Gehege" (
  "id" serial PRIMARY KEY,
  "groesse" decimal,
  "instandhaltungskosten" decimal,
  "name" text
);
 
CREATE TABLE "Tier" (
  "id" serial PRIMARY KEY,
  "name" text,
  "gehege_id" integer,
  "tierazt_id" integer
);
 
CREATE TABLE "Zoo" (
  "kontostand" decimal,
  "eintritt" decimal
);
 
CREATE TABLE "Umsatz" (
  "id" serial PRIMARY KEY,
  "tagessumme" decimal,
  "datum" date,
  "stand_id" integer,
  "spende_id" integer,
  "is_eintritt" boolean
);
 
CREATE TABLE "Spende" (
  "id" serial PRIMARY KEY,
  "spender_name" text,
  "datum" date,
  "betrag" decimal,
  "beleg_url" text
);
 
CREATE TABLE "Verkaufsstand" (
  "id" serial PRIMARY KEY,
  "stand_art" standart,
  "verkaeufer_id" integer
);
 
CREATE TABLE "Personal" (
  "id" serial PRIMARY KEY,
  "beruf_id" integer NOT NULL
);
 
CREATE TABLE "Gehege_Personal" (
  "pfleger_id" integer NOT NULL,
  "gehege_id" integer NOT NULL
);
 
CREATE TABLE "Beruf" (
  "id" serial PRIMARY KEY,
  "bezeichnung" text
);
 
ALTER TABLE "Tier" ADD FOREIGN KEY ("gehege_id") REFERENCES "Gehege" ("id");
 
ALTER TABLE "Tier" ADD FOREIGN KEY ("tierazt_id") REFERENCES "Personal" ("id");
 
ALTER TABLE "Umsatz" ADD FOREIGN KEY ("stand_id") REFERENCES "Verkaufsstand" ("id");
 
ALTER TABLE "Umsatz" ADD FOREIGN KEY ("spende_id") REFERENCES "Spende" ("id");
 
ALTER TABLE "Verkaufsstand" ADD FOREIGN KEY ("verkaeufer_id") REFERENCES "Personal" ("id");
 
ALTER TABLE "Personal" ADD FOREIGN KEY ("beruf_id") REFERENCES "Beruf" ("id");
 
ALTER TABLE "Gehege_Personal" ADD FOREIGN KEY ("pfleger_id") REFERENCES "Personal" ("id");
 
ALTER TABLE "Gehege_Personal" ADD FOREIGN KEY ("gehege_id") REFERENCES "Gehege" ("id");