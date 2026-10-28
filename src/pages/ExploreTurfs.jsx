import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { turfs } from "../data/turfs";
import { TurfCard } from "../components/turf/TurfCard";
import { FilterPanel } from "../components/turf/FilterPanel";
import { SearchBar } from "../components/common/SearchBar";
import { EmptyState } from "../components/common/EmptyState";
import { useBooking } from "../context/BookingContext";
import { todayISO } from "../utils/format";

const defaultFilters = {
  sport: "",
  area: "",
  minPrice: "",
  maxPrice: "",
  rating: "",
  setting: "",
};

export function ExploreTurfs() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [filters, setFilters] = useState({
    ...defaultFilters,
    sport: params.get("sport") || "",
    area: params.get("area") || "",
  });
  const [sort, setSort] = useState("popularity");
  const [layout, setLayout] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const { updateDraft } = useBooking();
  const navigate = useNavigate();

  const results = useMemo(() => {
    const query = (params.get("q") || q).toLowerCase();
    return turfs
      .filter((t) => {
        const hay = `${t.name} ${t.area} ${t.sport}`.toLowerCase();
        if (query && !hay.includes(query)) return false;
        if (filters.sport && t.sport !== filters.sport) return false;
        if (filters.area && t.area !== filters.area) return false;
        if (filters.minPrice && t.pricePerHour < Number(filters.minPrice)) return false;
        if (filters.maxPrice && t.pricePerHour > Number(filters.maxPrice)) return false;
        if (filters.rating && t.rating < Number(filters.rating)) return false;
        if (filters.setting && t.setting !== filters.setting) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.pricePerHour - b.pricePerHour;
        if (sort === "price-desc") return b.pricePerHour - a.pricePerHour;
        if (sort === "rating") return b.rating - a.rating;
        return b.popularity - a.popularity;
      });
  }, [filters, params, q, sort]);

  const applyQuery = (value) => {
    const next = new URLSearchParams(params);
    if (value) next.set("q", value);
    else next.delete("q");
    setParams(next);
    setQ(value);
  };

  const quickBook = (turf) => {
    updateDraft({ turfId: turf.id, date: todayISO(), start: "", duration: 1, players: 10, coupon: "" });
    navigate(`/turfs/${turf.id}`);
  };

  return (
    <div className="bg-offwhite pb-16">
      <div className="bg-stadium px-5 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-lime">Jaipur · sample listings</p>
          <h1 className="mt-2 font-heading text-4xl font-extrabold">Find Your Perfect Playing Ground</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            Filter fictional venues by sport, area, price, and indoor or outdoor setting. Nothing here is a live court booking.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-[16px] bg-white p-5 lg:block">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onClear={() => {
              setFilters(defaultFilters);
              setParams({});
              setQ("");
            }}
          />
        </aside>
        <div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBar
              value={q}
              onChange={setQ}
              onSubmit={applyQuery}
              placeholder="Search by turf name or location"
              className="flex-1"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm lg:hidden"
              onClick={() => setShowFilters((v) => !v)}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
          {showFilters ? (
            <div className="mb-4 rounded-[16px] bg-white p-4 lg:hidden">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onClear={() => setFilters(defaultFilters)}
              />
            </div>
          ) : null}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">{results.length} sample grounds</p>
            <div className="flex items-center gap-2">
              <label className="text-sm">
                Sort
                <select
                  className="ml-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </label>
              <button
                type="button"
                aria-label="Grid view"
                className={`rounded-full p-2 ${layout === "grid" ? "bg-forest text-white" : "bg-white"}`}
                onClick={() => setLayout("grid")}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                aria-label="List view"
                className={`rounded-full p-2 ${layout === "list" ? "bg-forest text-white" : "bg-white"}`}
                onClick={() => setLayout("list")}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          {results.length === 0 ? (
            <EmptyState
              title="No matching grounds"
              text="Try clearing filters or searching another Jaipur area."
            />
          ) : (
            <div className={layout === "grid" ? "grid gap-5 md:grid-cols-2" : "grid gap-5"}>
              {results.map((t) => (
                <TurfCard key={t.id} turf={t} layout={layout} onQuickBook={quickBook} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
