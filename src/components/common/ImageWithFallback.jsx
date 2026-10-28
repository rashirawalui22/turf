import { useState } from "react";
import { IMAGES } from "../../data/images";

export function ImageWithFallback({ src, alt, className = "", ...props }) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (current !== IMAGES.fallback) setCurrent(IMAGES.fallback);
      }}
      {...props}
    />
  );
}
