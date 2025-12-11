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
    SELECT id, title, category, price, image, description, user_id
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

export async function getProductByArtisan(id: number) {
  const result = await sql`
    SELECT id, title, category, price, image, description, user_id
    FROM products
    WHERE user_id = ${id};
  `;
  return result;
}