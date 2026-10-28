import { Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-stadium text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-2xl font-extrabold">Turf</p>
          <p className="mt-3 text-sm leading-6 text-white/70">
            A demo platform for discovering sports grounds in Jaipur and browsing sample gear. Listings and
            bookings are simulated.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lime">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
            <Link to="/turfs">Explore Turfs</Link>
            <Link to="/shop">Sports Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lime">Help</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
        <div className="text-sm text-white/75">
          <p className="text-sm font-semibold uppercase tracking-wider text-lime">Placeholders</p>
          <p className="mt-3 flex items-center gap-2">
            <Mail size={14} /> hello@example.com (placeholder)
          </p>
          <p className="mt-2 flex items-center gap-2">
            <Phone size={14} /> +91 00000 00000 (placeholder)
          </p>
          <p className="mt-2 flex items-start gap-2">
            <MapPin size={14} className="mt-0.5" /> Jaipur, Rajasthan (placeholder address)
          </p>
          <div className="mt-4 flex gap-3">
            <a href="https://instagram.com" className="rounded-full border border-white/20 p-2" aria-label="Instagram">
              <Instagram size={14} />
            </a>
            <a href="https://twitter.com" className="rounded-full border border-white/20 p-2" aria-label="Twitter">
              <Twitter size={14} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Turf demo. No real bookings or payments.
      </div>
    </footer>
  );
}
