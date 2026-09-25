import {
  BookOpenText,
  CalendarDays,
  Lightbulb,
  Link2,
  Repeat2,
} from "lucide-react";

export const priorities = [
  {
    id: "day",
    title: "Meu dia",
    description: "Ver o que merece atenção hoje.",
    icon: CalendarDays,
  },
  {
    id: "references",
    title: "Links e referências",
    description: "Guardar o que você não quer perder.",
    icon: Link2,
  },
  {
    id: "projects",
    title: "Estudos e projetos",
    description: "Manter o que está construindo em movimento.",
    icon: BookOpenText,
  },
  {
    id: "rhythm",
    title: "Rotina e consistência",
    description: "Enxergar seu ritmo ao longo do tempo.",
    icon: Repeat2,
  },
  {
    id: "ideas",
    title: "Ideias e anotações",
    description: "Capturar antes que desapareça.",
    icon: Lightbulb,
  },
] as const;

export type PriorityId = (typeof priorities)[number]["id"];
