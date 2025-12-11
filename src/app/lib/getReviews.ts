import { sql } from "./db";

export async function getReviewsByProduct(id: number) {
  const result = await sql`
    SELECT 
      id, 
      product_id, 
      rating, 
      review, 
      name, 
      date
    FROM reviews
    WHERE product_id = ${id};
  `;
  return result;
}