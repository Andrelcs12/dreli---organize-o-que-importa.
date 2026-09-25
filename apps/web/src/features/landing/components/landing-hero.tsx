import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/common/components/brand-logo";
import { ThemeToggle } from "@/common/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { HeroProductPreview } from "./hero-product-preview";
import { MotionReveal } from "./motion-reveal";

type LandingHeroProps = {
  authenticatedDestination?: "/app" | "/setup";
};

export function LandingHero({ authenticatedDestination }: LandingHeroProps) {
  const primaryHref = authenticatedDestination ?? "/cadastro";
  const primaryLabel = authenticatedDestination ? "Abrir Dreli" : "Começar";
  return (
    <section className="hero">
      <nav className="nav shell" aria-label="Navegação principal">
        <BrandLogo />
        <div className="nav-links">
          <a href="#como-funciona">Como funciona</a>
          <a href="#ritmo">Seu ritmo</a>
          <a href="#assistente">Assistente</a>
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          {!authenticatedDestination ? (
            <Link className="nav-auth-login" href="/login">
              Entrar
            </Link>
          ) : null}
          <Button asChild size="sm">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
        </div>
      </nav>
      <div className="hero-content shell">
        <div className="hero-copy-column">
          <MotionReveal>
            <div className="eyebrow">
              <span /> Um espaço pessoal, do seu jeito
            </div>
          </MotionReveal>
          <MotionReveal delay={0.05}>
            <h1>
              Menos abas abertas.
              <br />
              Mais espaço na cabeça.
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <p className="hero-copy">
              Dreli reúne o que você quer lembrar, o que importa hoje e o ritmo
              que você está construindo — sem transformar sua vida em mais um
              projeto para gerenciar.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.15}>
            <div className="hero-actions">
              <Button asChild className="hero-primary" size="lg">
                <Link href={primaryHref}>
                  {authenticatedDestination
                    ? "Abrir Dreli"
                    : "Começar com o Dreli"}{" "}
                  <ArrowUpRight />
                </Link>
              </Button>
              <Button
                asChild
                className="hero-secondary"
                size="lg"
                variant="outline"
              >
                <a href="#como-funciona">
                  Conhecer por dentro <ArrowDown />
                </a>
              </Button>
            </div>
          </MotionReveal>
        </div>
        <MotionReveal delay={0.2}>
          <HeroProductPreview />
        </MotionReveal>
      </div>
    </section>
  );
}
