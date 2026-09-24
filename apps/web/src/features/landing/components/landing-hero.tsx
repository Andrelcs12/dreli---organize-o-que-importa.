import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/common/components/brand-logo";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="hero">
      <nav className="nav shell" aria-label="Navegação principal">
        <BrandLogo />
        <div className="nav-links">
          <a href="#como-funciona">Como funciona</a>
          <a href="#ritmo">Seu ritmo</a>
          <Link href="/assistente">Assistente</Link>
        </div>
        <Button asChild className="nav-cta" variant="ghost">
          <Link href="/assistente">
            Abrir o Dreli <ArrowUpRight />
          </Link>
        </Button>
      </nav>
      <div className="hero-content shell">
        <div className="eyebrow">
          <span /> Um espaço pessoal, do seu jeito
        </div>
        <h1>
          Menos abas abertas.
          <br />
          Mais espaço na cabeça.
        </h1>
        <p className="hero-copy">
          Dreli reúne o que você quer lembrar, o que importa hoje e o ritmo que
          você está construindo — sem transformar sua vida em mais um projeto
          para gerenciar.
        </p>
        <div className="hero-actions">
          <Button asChild className="hero-primary" size="lg">
            <Link href="/assistente">
              Começar com o Dreli <ArrowUpRight />
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
      </div>
    </section>
  );
}
