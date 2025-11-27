import styles from "./page.module.css";
import Link from 'next/link';
import font from 'next/font/google'

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Discover Unique
          Handcrafted Treasures</h1>
          <p>
            Support local artisans and bring home one-of-a-kind pieces crafted with passion and skill.
          </p>
            <Link href="/shop" className={styles.primary}>
              Shop Now
            </Link>
            <Link href="/artisans" className={styles.secondary}>
              Meet Our Artisans
            </Link>
        </div>
      </main>
    </div>
  );
}