import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ToastViewport } from "../common/Toast";
import { useUI } from "../../context/UIContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  const { setMobileNavOpen, setSearchOpen } = useUI();
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileNavOpen(false);
    setSearchOpen(false);
  }, [pathname, setMobileNavOpen, setSearchOpen]);
  return null;
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastViewport />
    </div>
  );
}
