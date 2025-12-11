import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  const product_id = Number(form.get("product_id"));
  const rating = Number(form.get("rating"));
  const review = String(form.get("review"));
  const name = String(form.get("name"));

  if (!product_id || isNaN(product_id)) {
    return NextResponse.json({ error: "Invalid product_id" }, { status: 400 });
  }

  await sql`
    INSERT INTO reviews (product_id, rating, review, name, date)
    VALUES (${product_id}, ${rating}, ${review}, ${name}, NOW());
  `;

  const redirectURL = new URL(`/shop/${product_id}`, req.url);

  return NextResponse.redirect(redirectURL, { status: 303 });
}
