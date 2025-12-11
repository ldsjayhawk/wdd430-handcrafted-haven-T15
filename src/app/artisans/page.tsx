import styles from "../page.module.css";
import { getArtisans } from "@/app/lib/getArtisans";
import Link from "next/link";

export default async function Page() {
  const artisans = await getArtisans();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.art}>
          <h1>Meet Our Artisans</h1>
          <p>Discover the talented creators behind our handcrafted treasures</p>
        </div>

        <div className={styles.artisansGrid}>
          {artisans.map((artisan: any) => (
            <Link key={artisan.id} href={`/artisans/${artisan.id}`}>
              <div className={styles.card}>
                <div className={styles.initials}>{artisan.initials}</div>

                <h3>{artisan.name}</h3>

                <p>{artisan.bio}</p>

                <div className={styles.footerInfo}>
                  <span>📍 {artisan.city}, {artisan.state}</span>
                  <span>📅 Since {artisan.since}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}