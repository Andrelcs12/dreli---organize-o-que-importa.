"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PasswordInputProps = {
  autoComplete: string;
  id: string;
  name: string;
  placeholder?: string;
};

export function PasswordInput({
  autoComplete,
  id,
  name,
  placeholder,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="auth-password">
      <Input
        autoComplete={autoComplete}
        id={id}
        name={name}
        placeholder={placeholder}
        required
        type={visible ? "text" : "password"}
      />
      <Button
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        className="auth-password-toggle"
        onClick={() => setVisible((current) => !current)}
        size="icon-xs"
        type="button"
        variant="ghost"
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
}
