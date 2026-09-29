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
          "A Visão geral reúne o que pede atenção e acompanha seu ritmo, sem transformar seu dia em um painel.",
        nextBtnText: "Ver os atalhos",
        side: "bottom",
        title: "Seu espaço, do seu jeito.",
      },
    },
    {
      element: "[data-tour='summary-cards']",
      popover: {
        description:
          "Em um olhar: o que organizar, guardar, revisitar e o ritmo que você está criando.",
        nextBtnText: "Ver as abas",
        title: "Seu estado, sem ruído.",
      },
    },
    {
      element: "[data-tour='dashboard-tabs']",
      popover: {
        description:
          "Aqui você muda de perspectiva. A sidebar leva a áreas; estas abas aprofundam a Visão geral.",
        nextBtnText: "Ver onde salvar",
        title: "Uma visão, vários recortes.",
      },
    },
    {
      element: "[data-tour='link-capture']",
      popover: {
        description:
          "Cole um link e siga. Ele entra na Inbox até você decidir onde deve ficar.",
        nextBtnText: "Ver organização",
        title: "Guarde antes de esquecer.",
      },
    },
    {
      element: "[data-tour='sidebar-links']",
      onHighlightStarted: openLinksNavigation,
      popover: {
        description:
          "Inbox é a entrada. Biblioteca guarda referências, Favoritos aproxima o importante e Arquivados limpa sem apagar.",
        nextBtnText: "Ver contexto",
        title: "Tudo tem um lugar.",
      },
    },
    {
      element: "[data-tour='sidebar-context']",
      popover: {
        description:
          "Clima e Notícias trazem contexto. Histórico, Relatórios e Ritmo mostram o que mudou com o tempo.",
        nextBtnText: "Ver minha conta",
        title: "Contexto, não distração.",
      },
    },
    {
      element: "[data-tour='account']",
      popover: {
        description: "Abra este menu para acessar seu perfil e sair da conta.",
        title: "Você decide o próximo passo.",
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
        onPopoverRender: (popover, options) => {
          popover.closeButton.setAttribute("aria-label", "Pular tutorial");
          popover.previousButton.setAttribute("aria-label", "Voltar uma etapa");
          popover.nextButton.setAttribute("aria-label", "Avançar no tutorial");
          popover.wrapper.dataset.step = String((options.index ?? 0) + 1);
          const label = document.createElement("p");
          label.className = "dreli-tour-kicker";
          label.textContent = "Dreli · guia rápido";
          popover.title.before(label);
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
