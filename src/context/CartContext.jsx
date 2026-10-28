import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/storage";
import { useUI } from "./UIContext";
import { getProductById } from "../data/products";

const CartContext = createContext(null);
const SHIPPING_THRESHOLD = 1999;
const SHIPPING_FEE = 79;

export function CartProvider({ children }) {
  const { pushToast } = useUI();
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.cart, []);

  const addItem = useCallback(
    (productId, qty = 1) => {
      const product = getProductById(productId);
      if (!product) return;
      setItems((current) => {
        const existing = current.find((i) => i.productId === productId);
        if (existing) {
          return current.map((i) =>
            i.productId === productId ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [...current, { productId, qty }];
      });
      pushToast({ title: "Added to cart", message: product.name });
    },
    [pushToast, setItems]
  );

  const setQty = useCallback(
    (productId, qty) => {
      setItems((current) =>
        current
          .map((i) => (i.productId === productId ? { ...i, qty } : i))
          .filter((i) => i.qty > 0)
      );
    },
    [setItems]
  );

  const removeItem = useCallback(
    (productId) => {
      setItems((current) => current.filter((i) => i.productId !== productId));
      pushToast({ title: "Removed", message: "Item removed from cart.", type: "info" });
    },
    [pushToast, setItems]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const detailed = items
    .map((i) => {
      const product = getProductById(i.productId);
      return product ? { ...i, product } : null;
    })
    .filter(Boolean);

  const subtotal = detailed.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const count = detailed.reduce((sum, i) => sum + i.qty, 0);

  const value = useMemo(
    () => ({
      items: detailed,
      count,
      subtotal,
      shipping,
      total,
      shippingThreshold: SHIPPING_THRESHOLD,
      addItem,
      setQty,
      removeItem,
      clearCart,
    }),
    [detailed, count, subtotal, shipping, total, addItem, setQty, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
