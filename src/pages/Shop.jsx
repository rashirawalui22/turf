import { useMemo, useState } from "react";
import { products, productCategories } from "../data/products";
import { ProductCard } from "../components/shop/ProductCard";
import { SearchBar } from "../components/common/SearchBar";
import { EmptyState } from "../components/common/EmptyState";
import { Modal } from "../components/common/Modal";
import { Button } from "../components/common/Button";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { PriceDisplay } from "../components/common/PriceDisplay";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export function Shop() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("featured");
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const list = useMemo(() => {
    return products
      .filter((p) => {
        if (category && p.category !== category) return false;
        if (q && !`${p.name} ${p.category}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [category, q, sort]);

  return (
    <div className="bg-offwhite pb-16">
      <div className="bg-stadium px-5 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-lime">Sports shop</p>
          <h1 className="mt-2 font-heading text-4xl font-extrabold">Gear for the next session</h1>
          <p className="mt-3 max-w-xl text-white/75">Sample merchandise with INR pricing. Cart items stay in this browser only.</p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchBar value={q} onChange={setQ} placeholder="Search products" className="flex-1" />
          <select
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="rating">Rating</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setCategory("")}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${!category ? "bg-forest text-white" : "bg-white"}`}
          >
            All
          </button>
          {productCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${category === c ? "bg-forest text-white" : "bg-white"}`}
            >
              {c}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <div className="mt-8">
            <EmptyState title="No products" text="Try another category or search term." />
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} onDetails={setProduct} />
            ))}
          </div>
        )}
      </div>
      <Modal open={Boolean(product)} onClose={() => setProduct(null)} title={product?.name} wide>
        {product ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <ImageWithFallback src={product.image} alt={product.name} className="h-72 w-full rounded-2xl object-cover" />
            <div>
              <p className="text-sm text-muted">{product.category} · sample product</p>
              <p className="mt-3 text-sm leading-6">{product.description}</p>
              <div className="mt-4">
                <PriceDisplay amount={product.price} suffix="" size="lg" />
              </div>
              <div className="mt-6 flex gap-2">
                <Button
                  onClick={() => {
                    addItem(product.id);
                    setProduct(null);
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setProduct(null);
                    navigate(`/shop/${product.id}`);
                  }}
                >
                  Full page
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
