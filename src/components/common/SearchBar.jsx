import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search",
  onSubmit,
  className = "",
}) {
  return (
    <form
      className={`flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
    >
      <Search size={16} className="shrink-0 text-muted" />
      <label className="sr-only" htmlFor="site-search">
        Search
      </label>
      <input
        id="site-search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
      />
    </form>
  );
}
