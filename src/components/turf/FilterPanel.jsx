import { cities, sportNames } from "../../data/sports";

export function FilterPanel({ filters, onChange, onClear }) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Sport</p>
        <div className="flex flex-wrap gap-2">
          {["All", ...sportNames].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set("sport", s === "All" ? "" : s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                (filters.sport || "") === (s === "All" ? "" : s)
                  ? "bg-forest text-white"
                  : "bg-card text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">Area</span>
        <select
          value={filters.area}
          onChange={(e) => set("area", e.target.value)}
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
        >
          <option value="">All Jaipur areas</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">Min ₹</span>
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => set("minPrice", e.target.value)}
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
            placeholder="700"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">Max ₹</span>
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => set("maxPrice", e.target.value)}
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
            placeholder="1500"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
          Minimum rating
        </span>
        <select
          value={filters.rating}
          onChange={(e) => set("rating", e.target.value)}
          className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="4">4.0+</option>
          <option value="4.5">4.5+</option>
          <option value="4.8">4.8+</option>
        </select>
      </label>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Setting</p>
        <div className="flex gap-2">
          {["", "Indoor", "Outdoor"].map((s) => (
            <button
              key={s || "all"}
              type="button"
              onClick={() => set("setting", s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                filters.setting === s ? "bg-forest text-white" : "bg-card"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>
      </div>
      <button type="button" onClick={onClear} className="text-sm font-semibold text-forest underline">
        Clear filters
      </button>
    </div>
  );
}
