import { Link } from "react-router-dom";
import { ImageWithFallback } from "../common/ImageWithFallback";

export function SportCategoryCard({ sport }) {
  return (
    <Link
      to={`/turfs?sport=${encodeURIComponent(sport.name)}`}
      className="group relative block overflow-hidden rounded-[16px]"
    >
      <ImageWithFallback
        src={sport.image}
        alt={`${sport.name} category`}
        className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stadium/80 via-stadium/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="font-heading text-lg font-bold">{sport.name}</p>
        <p className="text-xs text-white/75">{sport.blurb}</p>
      </div>
    </Link>
  );
}
