import { sql } from "./db";

export async function getUserByEmail(email: string) { 
  const result = await sql`
    SELECT id
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;
  return result[0];
}