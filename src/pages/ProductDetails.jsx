import { useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { PriceDisplay } from "../components/common/PriceDisplay";
import { RatingStars } from "../components/common/RatingStars";
import { useCart } from "../context/CartContext";

export function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState title="Product not found" text="That item is not in the sample shop." action={<Button to="/shop">Back to shop</Button>} />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-2">
      <ImageWithFallback src={product.image} alt={product.name} className="h-[420px] w-full rounded-[18px] object-cover" />
      <div>
        <p className="text-xs uppercase tracking-wider text-muted">{product.category} · sample</p>
        <h1 className="mt-2 font-heading text-4xl font-extrabold">{product.name}</h1>
        <div className="mt-3">
          <RatingStars value={product.rating} count={product.reviews} />
        </div>
        <div className="mt-5">
          <PriceDisplay amount={product.price} suffix="" size="lg" />
        </div>
        <p className="mt-5 leading-7 text-ink/80">{product.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => addItem(product.id)}>Add to Cart</Button>
          <Button variant="outline" to="/cart">
            Go to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
