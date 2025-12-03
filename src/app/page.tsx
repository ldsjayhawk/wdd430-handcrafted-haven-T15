import styles from "./page.module.css";
import Link from 'next/link';
import font from 'next/font/google'
import Image from 'next/image'

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
          <div className={styles.buttons}>
            <Link href="/shop" className={styles.primary}>
              Shop Now
            </Link>
            <Link href="/artisans" className={styles.secondary}>
              Meet Our Artisans
            </Link>
          </div>
        </div>

        <div className={styles.featured}>
          <h2>Featured Handcrafted Items</h2>
          <p>Explore our curated selection of exceptional handmade products from talented artisans.</p>
          <div className={styles.buttons}>
            <Link href="/shop" className={styles.products}>
              View All Products
            </Link>
          </div>
        </div>
        <div className={styles.why}> 
        <h2 className={styles.whyHeader}>Why Handcrafted Haven?</h2>

          <div className={styles.creations}> 
            <div className={styles.whyImage}>
              <Image
                  src="/artist-palette.svg"
                  width={50}
                  height={50}
                  alt="artist palette"
                />
            </div>
            <h3>Unique Creations</h3>
            <p>Every item is handcrafted with care, ensuring you receive a truly one-of-a-kind piece.</p>
          </div>

          <div className={styles.artisans}> 
            <div className={styles.whyImage}>
              <Image
                  src="/handshake.svg"
                  width={50}
                  height={50}
                  alt="handshake"
                  />
            </div>
            <h3>Support Artisans</h3>
            <p>Your purchase directly supports independent artists and their craft.</p>
          </div>
          
          <div className={styles.choice}> 
            <div className={styles.whyImage}>
              <Image
                  src="/recycling-symbol.svg"
                  width={50}
                  height={50}
                  alt="recycling"
                />
            </div>
            <h3>Sustainable Choice</h3>
            <p>Choose quality over quantity and promote sustainable consumption.</p>
          </div>
        </div>
      </main>
    </div>
  );
}