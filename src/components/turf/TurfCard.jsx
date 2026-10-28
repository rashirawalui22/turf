import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { PriceDisplay } from "../common/PriceDisplay";
import { RatingStars } from "../common/RatingStars";
import { Button } from "../common/Button";

export function TurfCard({ turf, layout = "grid", onQuickBook }) {
  const compact = layout === "list";
  return (
    <article
      className={`overflow-hidden rounded-[16px] border border-black/5 bg-white shadow-[0_8px_30px_rgba(16,21,16,0.05)] ${compact ? "grid gap-0 sm:grid-cols-[260px_1fr]" : ""}`}
    >
      <Link to={`/turfs/${turf.id}`} className="relative block">
        <ImageWithFallback
          src={turf.image}
          alt={`${turf.name} in ${turf.area}`}
          className={compact ? "h-52 w-full object-cover sm:h-full" : "h-52 w-full object-cover"}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-forest">
          {turf.sport}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-stadium/75 px-2.5 py-1 text-[11px] text-white">
          Sample listing
        </span>
      </Link>
      <div className="flex flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-bold leading-tight">
              <Link to={`/turfs/${turf.id}`} className="hover:text-forest">
                {turf.name}
              </Link>
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted">
              <MapPin size={14} />
              {turf.area}, Jaipur · {turf.distanceKm} km
            </p>
          </div>
          <RatingStars value={turf.rating} count={turf.reviewCount} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {turf.facilities.slice(0, 4).map((f) => (
            <span key={f} className="rounded-full bg-card px-2.5 py-1 text-[11px] text-forest">
              {f}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <PriceDisplay amount={turf.pricePerHour} />
            <p className="text-xs text-muted">{turf.availability}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" to={`/turfs/${turf.id}`} className="px-4 py-2">
              View Details
            </Button>
            <Button
              className="px-4 py-2"
              onClick={() => onQuickBook?.(turf)}
              to={onQuickBook ? undefined : `/turfs/${turf.id}`}
            >
              Quick book
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
