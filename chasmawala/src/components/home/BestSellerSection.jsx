"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";

/* ─── Rank medal colors ─────────────────────────── */
const RANKS = {
  1: { color: "#c9a84c", label: "Gold",   symbol: "I"   },
  2: { color: "#9ba8b5", label: "Silver", symbol: "II"  },
  3: { color: "#b07a5f", label: "Bronze", symbol: "III" },
};

/* ─── Star rating ────────────────────────────────── */
function Stars({ rating = 4.7 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="9" height="9" viewBox="0 0 12 12">
          <path
            d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L.5 4h4z"
            fill={s <= Math.round(rating) ? "#c9a84c" : "#d8d0c4"}
          />
        </svg>
      ))}
      <span style={{ fontSize: "0.6rem", color: "#9a9087", marginLeft: 4 }}>{rating}</span>
    </div>
  );
}

/* ─── Hero Card (rank #1, large) ────────────────── */
function HeroCard({ product, rank }) {
  const [hovered, setHovered] = useState(false);
  const medal = RANKS[rank] || RANKS[1];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        gridRow: "span 2",
        cursor: "pointer",
        borderRadius: 3,
        overflow: "hidden",
        background: "#1a1713",
      }}
    >
      {/* Image */}
      <div style={{ height: "100%", minHeight: 520, overflow: "hidden", position: "relative" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
          }}
        />
        {/* Dark gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,9,8,0.92) 0%, rgba(10,9,8,0.3) 45%, transparent 100%)",
        }} />

        {/* Rank badge top-left */}
        <div style={{
          position: "absolute", top: "1.25rem", left: "1.25rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: medal.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.7rem", color: "#0a0908", fontWeight: 700,
            letterSpacing: "0.05em",
            boxShadow: `0 4px 20px ${medal.color}60`,
          }}>{medal.symbol}</div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "0.6rem", fontWeight: 600,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: medal.color,
          }}>Best Seller</span>
        </div>

        {/* Info overlay bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.75rem 1.5rem" }}>
          <Stars rating={product.rating} />
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.65rem", fontWeight: 600,
            color: "#f5f0e8", margin: "0.4rem 0 0.5rem",
            lineHeight: 1.15, letterSpacing: "0.01em",
          }}>{product.name}</h3>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.75rem" }}>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "baseline" }}>
              <span style={{ color: "#f5f0e8", fontSize: "1.2rem", fontFamily: "'Syne', sans-serif", fontWeight: 500 }}>
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span style={{ color: "#6a6057", fontSize: "0.8rem", textDecoration: "line-through" }}>
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ fontSize: "0.6rem", color: "#8a8077", letterSpacing: "0.08em" }}>
                {product.reviews?.toLocaleString()} reviews
              </span>
            </div>
          </div>

          {/* CTA */}
          <button style={{
            marginTop: "1rem",
            width: "100%",
            padding: "0.7rem",
            background: hovered ? "#f5f0e8" : "transparent",
            border: "1px solid #f5f0e822",
            color: hovered ? "#0a0908" : "#f5f0e8",
            fontFamily: "'Syne', sans-serif",
            fontSize: "0.65rem", fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            cursor: "pointer", borderRadius: 2,
            transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
          }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Small Card ─────────────────────────────────── */
function SmallCard({ product, rank }) {
  const [hovered, setHovered] = useState(false);
  const medal = RANKS[rank];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", gap: "1rem", alignItems: "center",
        padding: "1rem",
        background: hovered ? "#f0ece4" : "#f7f3ec",
        border: "1px solid",
        borderColor: hovered ? "#ddd5c8" : "#eae4da",
        borderRadius: 3,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
      }}
    >
      {/* Thumbnail */}
      <div style={{ width: 80, height: 90, borderRadius: 2, overflow: "hidden", flexShrink: 0, position: "relative" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Rank */}
        {medal && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              background: medal.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.45rem", color: "#0a0908", fontWeight: 700,
              fontFamily: "'Cormorant Garamond', serif",
            }}>{medal.symbol}</div>
            <span style={{
              fontSize: "0.55rem", fontWeight: 600,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: medal.color, fontFamily: "'Syne', sans-serif",
            }}>{medal.label}</span>
          </div>
        )}

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1rem", fontWeight: 600,
          color: "#1a1713", margin: "0 0 0.3rem",
          lineHeight: 1.2,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{product.name}</p>

        <Stars rating={product.rating} />

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline", marginTop: "0.35rem" }}>
          <span style={{ color: "#1a1713", fontFamily: "'Syne', sans-serif", fontSize: "0.9rem", fontWeight: 500 }}>
            ${product.price}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span style={{ color: "#b0a898", fontSize: "0.72rem", textDecoration: "line-through" }}>
                ${product.originalPrice}
              </span>
              <span style={{ color: "#c9a84c", fontSize: "0.58rem", fontWeight: 700 }}>
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Arrow */}
      <span style={{
        color: hovered ? "#1a1713" : "#c8c0b5",
        fontSize: "1rem",
        transition: "all 0.25s",
        transform: hovered ? "translateX(3px)" : "translateX(0)",
        flexShrink: 0,
      }}>→</span>
    </div>
  );
}

/* ─── Ranked Row (rank 4+) ───────────────────────── */
function RankedRow({ product, rank }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "1rem",
        padding: "0.85rem 0.5rem",
        borderBottom: "1px solid #e8e2d8",
        cursor: "pointer",
        transition: "padding-left 0.25s",
        paddingLeft: hovered ? "0.85rem" : "0.5rem",
      }}
    >
      {/* Rank number */}
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.6rem", fontWeight: 700, lineHeight: 1,
        color: hovered ? "#c9a84c" : "#d8d0c4",
        minWidth: "2rem", textAlign: "center",
        transition: "color 0.25s",
      }}>{rank}</span>

      {/* Small image */}
      <div style={{ width: 52, height: 58, borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
        <img src={product.image} alt={product.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.4s",
          }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.95rem", fontWeight: 600, color: "#1a1713",
          margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{product.name}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: 3 }}>
          <Stars rating={product.rating} />
          <span style={{ color: "#b0a898", fontSize: "0.58rem" }}>·</span>
          <span style={{ color: "#b0a898", fontSize: "0.6rem" }}>{product.reviews?.toLocaleString()} reviews</span>
        </div>
      </div>

      {/* Price */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "0.9rem", color: "#1a1713", fontWeight: 500, margin: 0 }}>
          {product.price}
        </p>
        {product.originalPrice > product.price && (
          <p style={{ fontSize: "0.7rem", color: "#b0a898", textDecoration: "line-through", margin: 0 }}>
            {product.originalPrice}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────── */
export default function BestSellerSection({ products = [] }) {
  if (!products?.length) return null;

  const hero     = products[0];
  const podium   = products.slice(1, 3);   // rank 2 & 3
  const rest     = products.slice(3);      // rank 4+

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Syne:wght@400;500;600&display=swap');
      `}</style>

      <section style={{
        background: "#f7f3ec",
        padding: "5.5rem 0",
        fontFamily: "'Syne', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Ghost watermark */}
        <div style={{
          position: "absolute", bottom: "-3rem", right: "-2rem",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "22rem", lineHeight: 1,
          color: "rgba(0,0,0,0.028)",
          pointerEvents: "none", userSelect: "none",
          letterSpacing: "-0.04em",
        }}>№1</div>

        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 2.5rem" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
                <div style={{ width: 32, height: 1, background: "#c9a84c" }} />
                <span style={{
                  fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "#c9a84c", fontWeight: 600,
                }}>Curated picks</span>
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem, 5vw, 5rem)",
                lineHeight: 0.9, color: "#1a1713",
                fontWeight: 700, letterSpacing: "0.01em",
                margin: 0,
              }}>
                Best<br />
                <span style={{ WebkitTextStroke: "1.5px #1a1713", color: "transparent" }}>Sellers</span>
              </h2>
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "0.65rem", color: "#9a9087", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                Based on {products.reduce((s, p) => s + (p.reviews || 0), 0).toLocaleString()}+ reviews
              </p>
              <a href="/bestseller" style={{
                color: "#1a1713", textDecoration: "none",
                fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
                fontWeight: 600, paddingBottom: 3,
                borderBottom: "1px solid #1a1713",
              }}>Shop All →</a>
            </div>
          </div>

          {/* Grid layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: "1.25rem",
          }}>

            {/* Hero (left, spans 2 rows) */}
            {hero && (
              <div style={{ gridColumn: 1, gridRow: "1 / 3" }}>
                <HeroCard product={hero} rank={1} />
              </div>
            )}

            {/* Podium #2 & #3 */}
            {podium.map((p, i) => (
              <SmallCard key={p._id} product={p} rank={i + 2} />
            ))}

            {/* Ranked list #4+ in last column */}
            {rest.length > 0 && (
              <div style={{ gridColumn: "2 / 4", borderTop: "1px solid #e8e2d8" }}>
                {rest.map((p, i) => (
                  <RankedRow key={p._id} product={p} rank={i + 4} />
                ))}
              </div>
            )}
          </div>

          {/* Footer rule */}
          <div style={{
            display: "flex", alignItems: "center", gap: "1rem",
            marginTop: "3rem",
            color: "#c8c0b5", fontSize: "0.6rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            <div style={{ flex: 1, height: 1, background: "#e8e2d8" }} />
            <span>{products.length} bestselling products</span>
            <div style={{ flex: 1, height: 1, background: "#e8e2d8" }} />
          </div>
        </div>
      </section>
    </>
  );
}