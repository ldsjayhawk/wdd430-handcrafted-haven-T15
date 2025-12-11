"use server";

import { sql } from "./db";

export async function getAllProducts() {
  const allProducts = await sql`
    SELECT id, title, category, price, image, description
    FROM products
    ORDER BY id ASC
  `;

  return allProducts;
}

export async function getProductById(id: number) {
  const result = await sql`
    SELECT id, title, category, price, image, description
    FROM products
    WHERE id = ${id}
    LIMIT 1
  `;
  return result[0];
}

export async function getRandomProducts() {
  const result = await sql`
    SELECT id, title, price, image, category
    FROM products
    ORDER BY RANDOM()
    LIMIT 3
  `;
  return result;
}
