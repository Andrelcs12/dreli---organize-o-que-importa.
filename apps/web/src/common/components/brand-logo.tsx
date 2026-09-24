import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  tone?: "dark" | "light";
};

export function BrandLogo({ href = "/", tone = "dark" }: BrandLogoProps) {
  const image = (
    <span className={`brand-logo brand-logo-${tone}`}>
      <Image
        alt="Dreli"
        className="brand-logo-image"
        height={1200}
        priority
        src={tone === "light" ? "/logo-white.png" : "/logo-black.png"}
        width={1200}
      />
    </span>
  );

  return href ? (
    <Link aria-label="Dreli, início" href={href}>
      {image}
    </Link>
  ) : (
    image
  );
}
