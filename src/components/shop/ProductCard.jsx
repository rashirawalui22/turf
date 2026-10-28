import { Button } from "../common/Button";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { PriceDisplay } from "../common/PriceDisplay";
import { RatingStars } from "../common/RatingStars";
import { useCart } from "../../context/CartContext";

export function ProductCard({ product, onDetails }) {
  const { addItem } = useCart();
  return (
    <article className="group overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_rgba(16,21,16,0.05)]">
      <button type="button" className="relative block w-full" onClick={() => onDetails(product)}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {product.onSale ? (
          <span className="absolute left-3 top-3 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-stadium">
            Sale
          </span>
        ) : null}
      </button>
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-wide text-muted">{product.category}</p>
        <h3 className="mt-1 font-heading text-base font-bold">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <PriceDisplay amount={product.price} suffix="" />
            {product.compareAt ? (
              <span className="ml-2 text-xs text-muted line-through">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(product.compareAt)}
              </span>
            ) : null}
          </div>
          <RatingStars value={product.rating} count={product.reviews} />
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="flex-1 py-2" onClick={() => onDetails(product)}>
            Details
          </Button>
          <Button className="flex-1 py-2" onClick={() => addItem(product.id)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
