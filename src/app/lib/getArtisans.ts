import { sql } from "./db";

export async function getArtisans() {
  const artisans = await sql`
    SELECT *
    FROM users
    ORDER BY name ASC;
  `;

  return artisans;
}

export async function getArtisanById(id: number) {

  if (!Number.isInteger(id)) {
    console.error("ID inválido para buscar artisan:", id);
    return null;
  }

  const result = await sql`
    SELECT *
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `;

  return result[0];
}
