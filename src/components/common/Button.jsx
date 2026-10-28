import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-lime text-stadium hover:bg-[#c8ff4a] shadow-[0_8px_24px_rgba(184,245,42,0.22)]",
  secondary:
    "bg-white/10 text-white border border-white/25 hover:bg-white/20 backdrop-blur-sm",
  outline:
    "bg-white text-ink border border-black/10 hover:border-forest/30 hover:bg-offwhite",
  dark: "bg-forest text-white hover:bg-forest-dark",
  ghost: "bg-transparent text-ink hover:bg-card",
};

export function Button({
  children,
  variant = "primary",
  to,
  className = "",
  type = "button",
  ...props
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>
  );
}
