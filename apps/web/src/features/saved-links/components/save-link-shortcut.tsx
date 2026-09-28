"use client";

import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { LinkCapture } from "./link-capture";

export function SaveLinkShortcut() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  function openCapture() {
    if (pathname === "/dashboard") {
      window.dispatchEvent(new Event("dreli:focus-link-capture"));
      return;
    }
    dialogRef.current?.showModal();
  }

  return (
    <>
      <Button onClick={openCapture} size="sm" type="button">
        <Plus /> Salvar link
      </Button>
      <dialog className="save-link-dialog" ref={dialogRef}>
        <div className="save-link-dialog-content">
          <button
            aria-label="Fechar"
            className="save-link-dialog-close"
            onClick={() => dialogRef.current?.close()}
            type="button"
          >
            ×
          </button>
          <LinkCapture
            inputId="shortcut-link-url"
            onSaved={() => dialogRef.current?.close()}
          />
        </div>
      </dialog>
    </>
  );
}
