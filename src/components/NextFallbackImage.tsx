import { useState } from "react";

export type NextFallbackImageProps =
  React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    fallback?: string;
  };

export default function NextFallbackImage({
  src,
  alt,
  fallback = "/vite.svg",
  ...props
}: NextFallbackImageProps) {
  const [source, setSource] = useState(src);

  return (
    <img
      src={source}
      alt={alt}
      onError={() => {
        if (source !== fallback) setSource(fallback);
      }}
      {...props}
    />
  );
}
