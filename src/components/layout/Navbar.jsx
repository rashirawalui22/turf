import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import { SearchBar } from "../common/SearchBar";

const links = [
  { to: "/", label: "Home" },
  { to: "/turfs", label: "Explore Turfs" },
  { to: "/shop", label: "Sports Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { count } = useCart();
  const { user } = useAuth();
  const { searchOpen, setSearchOpen, mobileNavOpen, setMobileNavOpen } = useUI();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const runSearch = (value) => {
    setSearchOpen(false);
    setMobileNavOpen(false);
    navigate(`/turfs?q=${encodeURIComponent(value || query)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-stadium/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-lime/70 text-[11px] text-lime">
            TF
          </span>
          Turf
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                isActive ? "text-lime" : "text-white/80 hover:text-white"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Search turfs"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={18} />
          </button>
          <Link
            to={user ? "/profile" : "/login"}
            className="rounded-full p-2 hover:bg-white/10"
            aria-label={user ? "Profile" : "Login"}
          >
            <UserRound size={18} />
          </Link>
          <Link to="/cart" className="relative rounded-full p-2 hover:bg-white/10" aria-label="Cart">
            <ShoppingBag size={18} />
            {count > 0 ? (
              <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-lime px-1 text-[10px] font-bold text-stadium">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="rounded-full p-2 hover:bg-white/10 lg:hidden"
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {mobileNavOpen ? (
        <nav className="border-t border-white/10 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) => (isActive ? "text-lime" : "text-white/85")}
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/my-bookings" onClick={() => setMobileNavOpen(false)}>
              My Bookings
            </NavLink>
          </div>
        </nav>
      ) : null}
      {searchOpen ? (
        <div className="absolute inset-x-0 top-full bg-white p-4 text-ink shadow-lg">
          <div className="mx-auto max-w-3xl">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search turf name or area"
              onSubmit={runSearch}
            />
            <button
              type="button"
              className="mt-2 text-xs text-muted"
              onClick={() => setSearchOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
