import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  href?: string;
  tone?: "auto" | "light" | "dark";
};

export function BrandLogo({
  className,
  href = "/",
  tone = "auto",
}: BrandLogoProps) {
  const mark = (
    <span
      className={`brand-logo brand-logo-${tone}${className ? ` ${className}` : ""}`}
    >
      <Image
        alt="Dreli"
        className="brand-logo-image brand-logo-dark-image"
        height={724}
        src="/logo-black.png"
        width={2172}
      />
      <Image
        alt=""
        aria-hidden
        className="brand-logo-image brand-logo-light-image"
        height={1254}
        src="/logo-white.png"
        width={1254}
      />
    </span>
  );

  return href ? (
    <Link aria-label="Dreli, início" href={href}>
      {mark}
    </Link>
  ) : (
    mark
  );
}
