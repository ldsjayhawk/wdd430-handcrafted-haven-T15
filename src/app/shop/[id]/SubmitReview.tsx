"use client";

import { useState } from "react";

export default function SubmitReview({ productId }: { productId: number }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        name,
        rating: Number(rating),
        review,
      }),
    });

    if (res.ok) {
      setSuccess(true);
      setName("");
      setRating(5);
      setReview("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {success && <p style={{ color: "green" }}>Review submitted!</p>}

      <input
        type="text"
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select>

      <textarea
        placeholder="Write your review..."
        required
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button type="submit">Submit Review</button>
    </form>
  );
}
