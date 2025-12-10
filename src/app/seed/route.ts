import postgres from 'postgres';
import { artisans } from '../lib/artisans-data';

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

  const insertedArtisans = await Promise.all(
    artisans.map(
      (a) => sql`
        INSERT INTO artisans (id, initials, name, bio, city, state, since)
        VALUES (${a.id}, ${a.initials}, ${a.name}, ${a.bio}, ${a.city}, ${a.state}, ${a.since})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedArtisans;
}

export async function GET() {
  try {
    await sql.begin(() => [
      seedArtisans(),
    ]);

    return Response.json({ message: 'Artisans seeded successfully!' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
