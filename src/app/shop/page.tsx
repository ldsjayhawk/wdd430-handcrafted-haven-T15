"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { getAllProducts } from "../lib/getProducts";

type Product = {
  id: string;
  name: string;
  title?: string;
  category: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  description?: string;
  artisan?: string;
};

const PRODUCTS_PER_PAGE = 6;

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [page, setPage] = useState(1);

useEffect(() => {
  async function load() {
    const data = await getAllProducts();

    const mapped = data.map((row: any) => ({
      id: row.id,
      name: row.name,
      title: row.title ?? row.name,
      category: row.category,
      price: Number(row.price),
      image: row.image,
      rating: row.rating ?? 0,
      reviews: row.reviews ?? 0,
      description: row.description ?? "",
      artisan: row.artisan ?? "",
    }));

    setProducts(mapped);
  }

  load();
}, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const priceBounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  useEffect(() => {
    setMinPrice(priceBounds.min);
    setMaxPrice(priceBounds.max);
  }, [priceBounds]);

  const filtered = useMemo(() => {
    let out = products.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((p) =>
        (p.title || p.name).toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      out = out.filter((p) => selectedCategories.includes(p.category));
    }

    if (minPrice !== null)
      out = out.filter((p) => p.price >= minPrice);
    if (maxPrice !== null)
      out = out.filter((p) => p.price <= maxPrice);

    if (sortBy === "price-asc") out.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") out.sort((a, b) => b.price - a.price);
    if (sortBy === "rating")
      out.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return out;
  }, [products, query, selectedCategories, minPrice, maxPrice, sortBy]);

  const pageCount = Math.max(
    1,
    Math.ceil(filtered.length / PRODUCTS_PER_PAGE)
  );

  const paged = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    return filtered.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filtered, page]);

  function toggleCategory(cat: string) {
    setPage(1);
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  }

  function clearFilters() {
    setQuery("");
    setSelectedCategories([]);
    setMinPrice(priceBounds.min);
    setMaxPrice(priceBounds.max);
    setSortBy("featured");
    setPage(1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Shop Handcrafted Items</h1>
        <p className={styles.sub}>
          Showing {filtered.length} products
        </p>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.sidebar}>

          <div className={styles.filterBox}>
            <h4>Categories</h4>
            {categories.map((c) => (
              <label key={c} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(c)}
                  onChange={() => toggleCategory(c)}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>

          <div className={styles.filterBox}>
            <h4>Price Range</h4>
            <div className={styles.priceRangeRow}>
              <div className={styles.rangeWrap}>
                <input
                  type="range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  value={minPrice ?? priceBounds.min}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setMinPrice(Math.min(v, maxPrice ?? priceBounds.max));
                    setPage(1);
                  }}
                />
                <input
                  type="range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  value={maxPrice ?? priceBounds.max}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setMaxPrice(Math.max(v, minPrice ?? priceBounds.min));
                    setPage(1);
                  }}
                />
              </div>

              <div className={styles.rangeValues}>
                <span>${(minPrice ?? priceBounds.min).toFixed(0)}</span>
                <span>${(maxPrice ?? priceBounds.max).toFixed(0)}</span>
              </div>
            </div>
          </div>

          <button className={styles.clearBtn} onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <div className={styles.mainCol}>
          <div className={styles.toolbar}>
            <input
              className={styles.search}
              placeholder="Search products..."
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
            />

            <select
              className={styles.sort}
              value={sortBy}
              onChange={(e) => {
                setPage(1);
                setSortBy(e.target.value);
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className={styles.grid}>
            {paged.map((p) => (
              <article key={p.id} className={styles.card}>
                <Link href={`/shop/${p.id}`} className={styles.cardLink}>
                  <div className={styles.imageWrap}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className={styles.cardImage}
                    />
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>
                      {p.title || p.name}
                    </h3>

                    <div className={styles.metaRow}>
                      <span className={styles.category}>{p.category}</span>
                      <span className={styles.price}>${p.price.toFixed(2)}</span>
                    </div>

                    {p.description && (
                      <p className={styles.desc}>{p.description}</p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.paginationRow}>
            <button
              onClick={() => setPage((s) => Math.max(1, s - 1))}
              disabled={page === 1}
              className={styles.pageBtn}
            >
              Previous
            </button>

            <div className={styles.pageNumbers}>
              Page {page} of {pageCount}
            </div>

            <button
              onClick={() => setPage((s) => Math.min(pageCount, s + 1))}
              disabled={page === pageCount}
              className={styles.pageBtn}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
