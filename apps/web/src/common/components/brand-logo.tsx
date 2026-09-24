import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  tone?: "auto" | "light" | "dark";
};

export function BrandLogo({ href = "/", tone = "auto" }: BrandLogoProps) {
  const mark = (
    <span className={`brand-logo brand-logo-${tone}`}>
      <Image
        alt="Dreli"
        className="brand-logo-image brand-logo-dark-image"
        height={1200}
        priority
        src="/logo-black.png"
        width={1200}
      />
      <Image
        alt=""
        aria-hidden
        className="brand-logo-image brand-logo-light-image"
        height={1200}
        priority
        src="/logo-white.png"
        width={1200}
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
