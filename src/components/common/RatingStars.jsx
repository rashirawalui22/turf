import { Star } from "lucide-react";

export function RatingStars({ value = 0, count, size = 14 }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <Star size={size} className="fill-[#E8B923] text-[#E8B923]" />
      <span className="font-semibold text-ink">{Number(value).toFixed(1)}</span>
      {typeof count === "number" ? (
        <span className="text-muted">({count})</span>
      ) : null}
    </span>
  );
}
