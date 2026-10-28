import { createContext, useCallback, useContext, useMemo, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const pushToast = useCallback((toast) => {
    const id = crypto.randomUUID?.() || String(Date.now() + Math.random());
    const item = { id, type: "success", timeout: 3200, ...toast };
    setToasts((list) => [...list, item]);
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id));
    }, item.timeout);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      pushToast,
      dismissToast,
      searchOpen,
      setSearchOpen,
      mobileNavOpen,
      setMobileNavOpen,
    }),
    [toasts, pushToast, dismissToast, searchOpen, mobileNavOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
