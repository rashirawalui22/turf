import { useState } from "react";
import { useCart } from "../context/CartContext";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";
import { formatINR } from "../utils/format";
import { isEmail, required } from "../utils/validation";
import { useUI } from "../context/UIContext";

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const { pushToast } = useUI();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-5 py-16 text-center">
        <h1 className="font-heading text-3xl font-extrabold">Order recorded locally</h1>
        <p className="mt-3 text-sm text-muted">
          This was a merchandise demo checkout. No payment was taken and nothing will be shipped.
        </p>
        <Button to="/shop" className="mt-6">
          Back to shop
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState title="Cart is empty" action={<Button to="/shop">Continue Shopping</Button>} />
      </div>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!required(form.name)) next.name = "Enter a name.";
    if (!isEmail(form.email)) next.email = "Enter a valid email.";
    if (!required(form.address)) next.address = "Enter a placeholder address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    clearCart();
    pushToast({ title: "Demo order saved", message: "Cart cleared. No payment processed." });
    setDone(true);
  };

  return (
    <div className="mx-auto max-w-xl px-5 py-12">
      <h1 className="font-heading text-3xl font-extrabold">Demo checkout</h1>
      <p className="mt-2 text-sm text-muted">Total {formatINR(total)}. No real payment.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-sm">
          Name
          <input
            className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name ? <span className="text-xs text-red-700">{errors.name}</span> : null}
        </label>
        <label className="block text-sm">
          Email
          <input
            className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email ? <span className="text-xs text-red-700">{errors.email}</span> : null}
        </label>
        <label className="block text-sm">
          Address (placeholder)
          <textarea
            className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          {errors.address ? <span className="text-xs text-red-700">{errors.address}</span> : null}
        </label>
        <Button type="submit" className="w-full">
          Place demo order
        </Button>
      </form>
    </div>
  );
}
