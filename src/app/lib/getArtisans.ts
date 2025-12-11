import { sql } from "./db";

export async function getArtisans() {
  const artisans = await sql`
    SELECT *
    FROM users
    ORDER BY name ASC;
  `;

  return artisans;
}
