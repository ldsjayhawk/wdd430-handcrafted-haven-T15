import { getProductById } from "@/app/lib/getProducts";
import { getArtisanById } from "@/app/lib/getArtisans";
import { getReviewsByProduct } from "@/app/lib/getReviews";
import styles from "../product.module.css";
import Link from "next/link";
import ProductActions from "../ProductActions";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  const product = await getProductById(numericId);
  const reviews = await getReviewsByProduct(numericId);

  if (!product) {
    return (
      <div className={styles.container}>
        <p>Product not found.</p>
        <Link href="/shop">Back to products</Link>
      </div>
    );
  }

  const artisanId = Number(product.user_id);
  const artisan = await getArtisanById(artisanId);

  if (!artisan) {
    return (
      <div className={styles.container}>
        <p>Artisan not found.</p>
        <Link href="/shop">Back to products</Link>
      </div>
    );
  }

  const parsedRatings = reviews
    .map((r) => Number(r.rating))
    .filter((n) => !isNaN(n) && n >= 0 && n <= 5);

  const avgRating =
    parsedRatings.length > 0
      ? parsedRatings.reduce((acc, n) => acc + n, 0) / parsedRatings.length
      : 0;

  const safeRating = Math.min(5, Math.max(0, Math.round(avgRating)));

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
              {"★".repeat(safeRating)}
              {"☆".repeat(5 - safeRating)}
            </div>
            <span className={styles.ratingText}>
              {avgRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>

          <div className={styles.price}>
            ${Number(product.price).toFixed(2)}
          </div>

          <hr />

          <h3>Description</h3>
          <p className={styles.desc}>{product.description}</p>

          <hr />

          <Link key={product.id} href={`/artisans/${artisan.id}`}>
            <div className={styles.artisanCard}>
              <div className={styles.initialsCircle}>{artisan.initials}</div>
              <p>Crafted by</p>
              <h1 className={styles.artisanName}>{artisan.name}</h1>
            </div>
          </Link>

          <div className={styles.actions}>
            <ProductActions product={product} />
          </div>

          <div className={styles.reviewFormSection}>
            <h3>Write a Review</h3>

            <form action="/api/reviews" method="POST" className={styles.reviewForm}>
              <input type="hidden" name="product_id" value={product.id} />

              <label>Your Name</label>
              <input name="name" required maxLength={80} />

              <label>Your Rating</label>
              <select name="rating" required>
                <option value="">Select rating</option>
                <option value="5">★★★★★ (5)</option>
                <option value="4">★★★★☆ (4)</option>
                <option value="3">★★★☆☆ (3)</option>
                <option value="2">★★☆☆☆ (2)</option>
                <option value="1">★☆☆☆☆ (1)</option>
              </select>

              <label>Your Review</label>
              <textarea name="review" rows={4} required />

              <button type="submit" className={styles.submitButton}>
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>

      <section className={styles.reviewsSection}>
        <h2>Customer Reviews</h2>

        {reviews.length === 0 && (
          <p>No reviews yet. Be the first to write one!</p>
        )}

        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <strong>{review.name}</strong>
              <span className={styles.reviewDate}>
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className={styles.stars}>
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            <p>{review.review}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
