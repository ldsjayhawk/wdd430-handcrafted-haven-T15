import { sql } from "./db";

export async function getArtisans() {
  const artisans = await sql`
    SELECT *
    FROM artisans
    ORDER BY name ASC;
  `;

  return artisans;
}
