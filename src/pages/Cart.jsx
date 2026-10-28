import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { formatINR } from "../utils/format";

export function Cart() {
  const { items, setQty, removeItem, subtotal, shipping, total, shippingThreshold } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          text="Add sample gear from the sports shop. Nothing here is a real store."
          action={<Button to="/shop">Continue Shopping</Button>}
        />
      </div>
    );
  }

  return (
    <div className="bg-offwhite py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <h1 className="font-heading text-3xl font-extrabold">Cart</h1>
          {items.map((item) => (
            <article key={item.productId} className="flex gap-4 rounded-[16px] bg-white p-4">
              <ImageWithFallback src={item.product.image} alt="" className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading font-bold">{item.product.name}</h2>
                  <p className="text-sm text-muted">{formatINR(item.product.price)}</p>
                </div>
                <div className="mt-3 flex items-center gap-3 sm:mt-0">
                  <label className="text-sm">
                    Qty
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="ml-2 w-16 rounded-lg border border-black/10 px-2 py-1"
                      value={item.qty}
                      onChange={(e) => setQty(item.productId, Number(e.target.value))}
                    />
                  </label>
                  <button type="button" className="text-sm font-semibold text-forest" onClick={() => removeItem(item.productId)}>
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="h-fit rounded-[16px] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping ? formatINR(shipping) : "Free"}</span>
            </div>
            {shipping > 0 ? (
              <p className="text-xs text-muted">Free shipping over {formatINR(shippingThreshold)} (demo rule).</p>
            ) : null}
            <div className="flex justify-between border-t border-black/10 pt-3 font-semibold">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
          <Button to="/checkout" className="mt-5 w-full">
            Checkout
          </Button>
          <Button variant="outline" to="/shop" className="mt-3 w-full">
            Continue Shopping
          </Button>
        </aside>
      </div>
    </div>
  );
}
