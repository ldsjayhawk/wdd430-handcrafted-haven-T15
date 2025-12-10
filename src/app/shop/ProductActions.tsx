"use client";

import { useEffect, useState } from "react";

export default function ProductActions({ product }: { product: any }) {
    const [added, setAdded] = useState(false);

    useEffect(() => {
        try {
            const cart = JSON.parse(localStorage.getItem("hh_cart") || "[]");
            setAdded(cart.some((i: any) => i.id === product.id));
        } catch (e) {
            setAdded(false);
        }
    }, [product.id]);

    function addToCart() {
        const cart = JSON.parse(localStorage.getItem("hh_cart") || "[]");
        if (!cart.some((i: any) => i.id === product.id)) {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                qty: 1,
            });
            localStorage.setItem("hh_cart", JSON.stringify(cart));
            setAdded(true);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button
                onClick={addToCart}
                disabled={added}
                style={{
                    background: "#174f2d",
                    color: "#fff",
                    border: "none",
                    padding: "0.75rem 1.25rem",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    width: "100%",
                    cursor: added ? "default" : "pointer",
                }}
            >
                🛒 {added ? "Added to Cart" : "Add to Cart"}
            </button>
            <div style={{ display: "flex", gap: "1rem" }}>
                <button
                    style={{
                        flex: 1,
                        background: "transparent",
                        border: "1px solid #d1d5db",
                        padding: "0.75rem 1rem",
                        borderRadius: 8,
                        cursor: "pointer",
                        color: "#374151",
                        fontWeight: 500,
                    }}
                >
                    ♡ Save
                </button>
                <button
                    style={{
                        flex: 1,
                        background: "transparent",
                        border: "1px solid #d1d5db",
                        padding: "0.75rem 1rem",
                        borderRadius: 8,
                        cursor: "pointer",
                        color: "#374151",
                        fontWeight: 500,
                    }}
                >
                    ⤴ Share
                </button>
            </div>
        </div>
    );
}
