"use client";

import { type DriveStep, driver } from "driver.js";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const storageKey = (profileId: string) =>
  `dreli:onboarding:${profileId}:completed`;

function openLinksNavigation() {
  window.dispatchEvent(new Event("dreli:open-links-navigation"));
}

function steps(): DriveStep[] {
  return [
    {
      popover: {
        align: "center",
        description:
          "A Visão geral reúne o que merece sua atenção e mostra como seu ritmo está evoluindo.",
        side: "bottom",
        title: "Este é o seu espaço.",
      },
    },
    {
      element: "[data-tour='summary-cards']",
      popover: {
        description:
          "Inbox, Biblioteca, Favoritos e Ritmo mostram rapidamente o que está acontecendo no seu Dreli.",
        title: "Seu estado em poucos segundos.",
      },
    },
    {
      element: "[data-tour='dashboard-tabs']",
      popover: {
        description:
          "Alterne entre seus links, seu ritmo e o que aconteceu recentemente sem sair desta página.",
        title: "Explore sua Visão geral.",
      },
    },
    {
      element: "[data-tour='link-capture']",
      popover: {
        description:
          "Cole um link e salve. Novos links entram na Inbox para você organizar depois.",
        title: "Jogue aqui primeiro.",
      },
    },
    {
      element: "[data-tour='sidebar-links']",
      onHighlightStarted: openLinksNavigation,
      popover: {
        description:
          "Inbox recebe o que ainda precisa de decisão. Biblioteca mantém referências, Favoritos deixa o importante por perto e Arquivados tira itens da frente sem apagá-los.",
        title: "Organize o que você guarda.",
      },
    },
    {
      element: "[data-tour='sidebar-context']",
      popover: {
        description:
          "Clima e Notícias trazem informações úteis sem transformar o Dreli em um feed infinito.",
        title: "Contexto para o seu dia.",
      },
    },
    {
      element: "[data-tour='sidebar-insights']",
      popover: {
        description:
          "Histórico mostra o que aconteceu, Relatórios resumem períodos e Ritmo ajuda você a perceber sua constância.",
        title: "Enxergue seu ritmo.",
      },
    },
    {
      element: "[data-tour='account']",
      popover: {
        description: "Abra este menu para acessar seu perfil e sair da conta.",
        title: "Sua conta fica aqui.",
      },
    },
  ];
}

export function DreliTour({ profileId }: { profileId: string }) {
  const pathname = usePathname();
  const activeTour = useRef<ReturnType<typeof driver> | null>(null);

  useEffect(() => {
    function start(force = false) {
      const requestedRestart =
        sessionStorage.getItem("dreli:restart-tour") === "true";
      if (requestedRestart) sessionStorage.removeItem("dreli:restart-tour");
      if (
        pathname !== "/dashboard" ||
        (!force &&
          !requestedRestart &&
          localStorage.getItem(storageKey(profileId)))
      )
        return;
      activeTour.current?.destroy();
      const tourSteps = window.matchMedia("(max-width: 760px)").matches
        ? steps().slice(0, 4)
        : steps();
      const tour = driver({
        allowClose: true,
        animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        doneBtnText: "Começar a usar",
        nextBtnText: "Próximo",
        onDestroyed: () => localStorage.setItem(storageKey(profileId), "true"),
        overlayOpacity: 0.58,
        popoverClass: "dreli-tour-popover",
        prevBtnText: "Voltar",
        progressText: "{{current}} de {{total}}",
        showProgress: true,
        skipMissingElement: true,
        smoothScroll: true,
        stagePadding: 8,
        stageRadius: 8,
        steps: tourSteps,
        onPopoverRender: (popover) => {
          popover.closeButton.setAttribute("aria-label", "Pular tutorial");
          const skip = document.createElement("button");
          skip.className = "dreli-tour-skip";
          skip.textContent = "Pular";
          skip.type = "button";
          skip.onclick = () => tour.destroy();
          popover.footer.prepend(skip);
        },
      });
      activeTour.current = tour;
      window.setTimeout(() => tour.drive(), 120);
    }
    const restart = () => start(true);
    window.addEventListener("dreli:restart-tour", restart);
    const timer = window.setTimeout(() => start(), 650);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("dreli:restart-tour", restart);
      activeTour.current?.destroy();
    };
  }, [pathname, profileId]);

  return null;
}
