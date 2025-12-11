import styles from "../../page.module.css";
import { getArtisanById } from "@/app/lib/getArtisans";
import { getProductByArtisan } from "@/app/lib/getProducts";
import Link from "next/link";
import Image from 'next/image'

export default async function ArtisanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artisan = await getArtisanById(Number(id));
  const featured = await getProductByArtisan(Number(id));

  if (!artisan) {
    return (
      <div className={styles.container}>
        <p>Artisan not found.</p>
        <Link href="/artisans">Back to Artisans</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
        <div className={styles.backRow}>
            <Link href="/artisans" className={styles.backlink}>← Back to Artisans</Link>
        </div>
        <div className={styles.artisanpage}>
        
          <div className={styles.initialsCircle}>
            {artisan.initials}
          </div>

          <h1 className={styles.artisanName}>{artisan.name}</h1>

          <div className={styles.footerInfo2}>
            <span>📍 {artisan.city}, {artisan.state}</span>
            <span>📅 Member since {artisan.since}</span>
          </div>

          <hr className={styles.divider} />

          <h2 className={styles.sectionTitle}>About the Artist</h2>
          <p className={styles.bioText}>
            {artisan.bio}
          </p>

          <h2 className={styles.sectionTitle2}>
            Products by {artisan.name}
          </h2>

          <div className={styles.featureGrid}>
            {featured.map(product => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className={styles.featureCard}
              >
                <div className={styles.featureImageWrap}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className={styles.featureImage}
                  />
                </div>

                <div className={styles.featureBody}>
                  <span className={styles.featureCategory}>{product.category}</span>
                  <h3 className={styles.featureTitle}>{product.title}</h3>
                  <p className={styles.featurePrice}>${product.price}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
    </div>
  );
}
