import { formatINR } from "../../utils/format";

export function PriceDisplay({ amount, suffix = "/hr", className = "", size = "md" }) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };
  return (
    <span className={`font-heading font-bold text-forest ${sizes[size]} ${className}`}>
      {formatINR(amount)}
      {suffix ? <span className="ml-0.5 text-xs font-medium text-muted">{suffix}</span> : null}
    </span>
  );
}
