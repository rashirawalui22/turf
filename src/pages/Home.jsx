import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroSection } from "../components/turf/HeroSection";
import { SportCategoryCard } from "../components/turf/SportCategoryCard";
import { TurfCard } from "../components/turf/TurfCard";
import { ProductCard } from "../components/shop/ProductCard";
import { TestimonialCard } from "../components/home/TestimonialCard";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { Button } from "../components/common/Button";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { sports } from "../data/sports";
import { turfs } from "../data/turfs";
import { products } from "../data/products";
import { testimonials } from "../data/testimonials";
import { IMAGES } from "../data/images";
import { Modal } from "../components/common/Modal";
import { useCart } from "../context/CartContext";
import { PriceDisplay } from "../components/common/PriceDisplay";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { todayISO } from "../utils/format";

export function Home() {
  const featured = turfs.slice(0, 3);
  const collection = products.slice(0, 4);
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();
  const { updateDraft } = useBooking();
  const navigate = useNavigate();

  const quickBook = (turf) => {
    updateDraft({ turfId: turf.id, date: todayISO(), start: "", duration: 1, players: 10, coupon: "" });
    navigate(`/turfs/${turf.id}`);
  };

  return (
    <>
      <HeroSection />
      <section className="bg-offwhite py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:grid-cols-3">
          {[
            { n: "9+", l: "Sample venues in Jaipur" },
            { n: "5", l: "Sports supported in this demo" },
            { n: "1,200+", l: "Illustrative bookings completed" },
          ].map((s) => (
            <div key={s.l} className="rounded-[16px] bg-white p-6 text-center shadow-sm">
              <p className="font-heading text-3xl font-extrabold text-forest">{s.n}</p>
              <p className="mt-1 text-sm text-muted">{s.l}</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-muted">Sample data</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Sports</p>
              <h2 className="font-heading text-3xl font-extrabold">Pick a game</h2>
            </div>
            <Link to="/turfs" className="hidden items-center gap-1 text-sm font-semibold text-forest sm:flex">
              All grounds <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {sports.map((s) => (
              <SportCategoryCard key={s.id} sport={s} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-offwhite py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Featured</p>
              <h2 className="font-heading text-3xl font-extrabold">Grounds worth a look</h2>
            </div>
            <Button variant="dark" to="/turfs">
              View all
            </Button>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featured.map((t) => (
              <TurfCard key={t.id} turf={t} onQuickBook={quickBook} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Shop</p>
            <h2 className="font-heading text-3xl font-extrabold">Explore Our Sports Collection</h2>
            <p className="mt-2 text-sm text-muted">Sample shoes, balls, jerseys, and accessories priced in INR.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {collection.map((p) => (
              <ProductCard key={p.id} product={p} onDetails={setProduct} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" to="/shop">
              Browse the shop
            </Button>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden">
        <ImageWithFallback
          src={IMAGES.promoNearby}
          alt="Footballers training on a green pitch"
          className="h-[360px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-stadium/70" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col items-start justify-center px-5 text-white">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">Discover nearby turfs</h2>
          <p className="mt-2 max-w-lg text-white/80">
            Sample grounds across Vaishali Nagar, Mansarovar, Malviya Nagar, Jagatpura, and Tonk Road.
          </p>
          <Button to="/turfs" className="mt-6">
            Explore Turfs
          </Button>
        </div>
      </section>
      <section className="bg-offwhite py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-8 font-heading text-3xl font-extrabold">What players say</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} item={t} />
            ))}
          </div>
        </div>
      </section>
      <NewsletterSection />
      <Modal open={Boolean(product)} onClose={() => setProduct(null)} title={product?.name} wide>
        {product ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageWithFallback src={product.image} alt={product.name} className="h-64 w-full rounded-2xl object-cover" />
            <div>
              <p className="text-sm text-muted">{product.category} · sample product</p>
              <p className="mt-3 text-sm leading-6">{product.description}</p>
              <div className="mt-4">
                <PriceDisplay amount={product.price} suffix="" size="lg" />
              </div>
              <Button
                className="mt-5"
                onClick={() => {
                  addItem(product.id);
                  setProduct(null);
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
