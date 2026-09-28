"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Archive,
  ArchiveX,
  Inbox,
  LayoutDashboard,
  Link2,
  Menu,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const destinations = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Visão geral" },
  { href: "/links", icon: Link2, label: "Links" },
  { href: "/inbox", icon: Inbox, label: "Inbox" },
  { href: "/library", icon: Archive, label: "Biblioteca" },
  { href: "/favorites", icon: Star, label: "Favoritos" },
  { href: "/archived", icon: ArchiveX, label: "Arquivados" },
];

export function QuickMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideInteraction(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideInteraction);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideInteraction);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="quick-menu" ref={menuRef}>
      <Button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Abrir menu rápido"
        onClick={() => setIsOpen((open) => !open)}
        size="icon-sm"
        type="button"
        variant="ghost"
      >
        <Menu />
      </Button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="quick-menu-panel"
            exit={{ opacity: 0, y: -6 }}
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            role="menu"
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>Ir para</p>
            {destinations.map((destination) => {
              const Icon = destination.icon;
              return (
                <Link
                  aria-current={
                    pathname === destination.href ? "page" : undefined
                  }
                  className={
                    pathname === destination.href ? "is-active" : undefined
                  }
                  href={destination.href}
                  key={destination.href}
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  <Icon aria-hidden="true" />
                  {destination.label}
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
