import { Mail, User } from "lucide-react";
import { ThemeToggle } from "@/common/components/theme-toggle";
import { RestartTourButton } from "@/features/onboarding/components/restart-tour-button";
export function ProfilePage({
  avatarUrl,
  email,
  name,
}: {
  avatarUrl: string | null;
  email: string | null;
  name: string | null;
}) {
  return (
    <section className="context-page">
      <p className="context-eyebrow">Perfil</p>
      <h2>Conta</h2>
      <div className="profile-identity">
        {avatarUrl ? (
          // biome-ignore lint/performance/noImgElement: avatar pode vir de host externo do Supabase/OAuth.
          <img alt="" src={avatarUrl} />
        ) : (
          <User aria-hidden="true" />
        )}
        <div>
          <strong>{name ?? "Seu espaço"}</strong>
          <span>
            <Mail aria-hidden="true" />
            {email ?? "Email não disponível"}
          </span>
        </div>
      </div>
      <div className="profile-preference">
        <div>
          <h3>Aparência</h3>
          <p>Escolha o tema que fica mais confortável para você.</p>
        </div>
        <ThemeToggle />
      </div>
      <div className="profile-preference">
        <div>
          <h3>Primeiros passos</h3>
          <p>Revise como o Dreli organiza seu espaço.</p>
        </div>
        <RestartTourButton />
      </div>
    </section>
  );
}
