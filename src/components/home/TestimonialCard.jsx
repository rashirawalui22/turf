import { ImageWithFallback } from "../common/ImageWithFallback";

export function TestimonialCard({ item }) {
  return (
    <figure className="rounded-[16px] bg-white p-6 shadow-[0_8px_24px_rgba(16,21,16,0.05)]">
      <div className="flex items-center gap-3">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <figcaption className="font-heading font-bold">{item.name}</figcaption>
          <p className="text-xs text-muted">{item.role}</p>
        </div>
      </div>
      <blockquote className="mt-4 text-sm leading-6 text-ink/80">“{item.quote}”</blockquote>
    </figure>
  );
}
