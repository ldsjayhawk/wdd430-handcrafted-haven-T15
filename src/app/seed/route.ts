// src/app/seed/route.ts
import postgres from 'postgres';
import { artisans } from '../lib/artisans-data';
import products from '../../data/products.json';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedArtisans() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS artisans (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      initials VARCHAR(5) NOT NULL,
      name VARCHAR(255) NOT NULL,
      bio TEXT NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      since INT NOT NULL
    );
  `;

  await Promise.all(
    artisans.map(a => sql`
      INSERT INTO artisans (id, initials, name, bio, city, state, since)
      VALUES (${a.id}, ${a.initials}, ${a.name}, ${a.bio}, ${a.city}, ${a.state}, ${a.since})
      ON CONFLICT (id) DO NOTHING;
    `)
  );
}

async function seedProducts() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      price NUMERIC NOT NULL,
      image VARCHAR(500),
      rating NUMERIC,
      reviews INT,
      description TEXT,
      artisan VARCHAR(255)
    );
  `;

  await Promise.all(
    products.map((p: any) => sql`
      INSERT INTO products (id, title, category, price, image, rating, reviews, description, artisan)
      VALUES (
        ${p.id},
        ${p.title},
        ${p.category},
        ${p.price},
        ${p.image},
        ${p.rating ?? null},
        ${p.reviews ?? null},
        ${p.description ?? null},
        ${p.artisan ?? null}
      )
      ON CONFLICT (id) DO NOTHING;
    `)
  );
}

export async function GET() {
  try {
    await sql.begin(async () => {
      await seedArtisans();
      await seedProducts();
    });

    return Response.json({ message: 'Seed completed successfully!' });
  } catch (error) {
    console.error('Seed error', error);
    return Response.json({ error: (error as any).message }, { status: 500 });
  }
}
