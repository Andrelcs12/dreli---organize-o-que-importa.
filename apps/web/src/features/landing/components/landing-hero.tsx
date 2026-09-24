import { ArrowDown, ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/common/components/brand-logo";
import { ThemeToggle } from "@/common/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { HeroProductPreview } from "./hero-product-preview";
import { MotionReveal } from "./motion-reveal";

export function LandingHero() {
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
          <Button asChild className="nav-cta" variant="ghost">
            <a href="#assistente">
              Conhecer <ArrowUpRight />
            </a>
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
                <a href="#assistente">
                  Começar com o Dreli <ArrowUpRight />
                </a>
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
