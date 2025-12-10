import productsData from "../../../data/products.json";
import styles from "../product.module.css";
import Link from "next/link";
import ProductActions from "../ProductActions";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const products: any[] = productsData as any[];
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <div className={styles.container}>
                <p>Product not found.</p>
                <Link href="/shop">Back to products</Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.backRow}>
                <Link href="/shop">← Back to Products</Link>
            </div>

            <div className={styles.detailGrid}>
                <div className={styles.preview}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className={styles.previewImage}
                    />
                </div>
                <div className={styles.info}>
                    <span className={styles.category}>{product.category}</span>
                    <h1 className={styles.title}>{product.title}</h1>
                    <div className={styles.ratingRow}>
                        <div className={styles.stars}>
                            {'★'.repeat(Math.floor(product.rating || 5))}
                        </div>
                        <span className={styles.ratingText}>
                            {product.rating} ({product.reviews} reviews)
                        </span>
                    </div>
                    <div className={styles.price}>${product.price.toFixed(2)}</div>
                    <hr />
                    <h3>Description</h3>
                    <p className={styles.desc}>{product.description}</p>

                    {product.artisan && (
                        <div className={styles.artisanSection}>
                            <div className={styles.artisanAvatar}>
                                {product.artisan.charAt(0)}
                            </div>
                            <div>
                                <div className={styles.artisanLabel}>
                                    Crafted by
                                </div>
                                <div className={styles.artisanName}>
                                    {product.artisan}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={styles.actions}>
                        <ProductActions product={product} />
                    </div>
                </div>
            </div>

            <section className={styles.reviewsSection}>
                <h2>Customer Reviews</h2>
                <div className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                        <strong>Lisa R.</strong>
                        <span className={styles.reviewDate}>
                            January 25, 2024
                        </span>
                    </div>
                    <p>
                        Stunning photograph! The framing is professional and the
                        print quality is excellent. James captured an amazing
                        moment.
                    </p>
                </div>
            </section>
        </div>
    );
}
