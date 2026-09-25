import {
  Check,
  CloudSun,
  Home,
  Inbox,
  Library,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { BrandLogo } from "@/common/components/brand-logo";
import { MotionReveal } from "./motion-reveal";

const navigation = [
  { icon: Home, label: "Hoje", active: true },
  { icon: Inbox, label: "Inbox", count: 3 },
  { icon: Library, label: "Biblioteca" },
  { icon: TrendingUp, label: "Progresso" },
];

export function ProductPreview() {
  return (
    <MotionReveal delay={0.2}>
      <div className="product-frame shell">
        <div className="app-window">
          <aside className="sidebar">
            <BrandLogo />
            <div className="sidebar-section">VISÃO GERAL</div>
            {navigation.map(({ active, count, icon: Icon, label }) => (
              <div
                className={`side-item${active ? " active" : ""}`}
                key={label}
              >
                <Icon />
                <span>{label}</span>
                {count && <b>{count}</b>}
              </div>
            ))}
            <div className="sidebar-bottom">
              <span className="avatar">A</span>
              <div>
                <strong>André</strong>
                <small>Configurações</small>
              </div>
            </div>
          </aside>
          <div className="dashboard">
            <header className="dashboard-header">
              <div>
                <p>Quinta-feira, 24 de setembro</p>
                <h2>Bom dia, André.</h2>
              </div>
              <div className="weather">
                <CloudSun />
                <span>26°</span>
                <small>Aracaju</small>
              </div>
            </header>
            <div className="day-grid">
              <section className="day-card focus-card">
                <p className="card-label">SEU DIA</p>
                <div className="progress-line">
                  <span />
                </div>
                <div className="progress-copy">
                  <strong>68%</strong>
                  <span>no seu ritmo hoje</span>
                </div>
                <div className="mini-stats">
                  <span>
                    <b>2</b> tarefas
                  </span>
                  <span>
                    <b>3</b> hábitos
                  </span>
                </div>
              </section>
              <section className="day-card brief-card">
                <p className="card-label">MORNING BRIEF</p>
                <p>
                  Dia leve, mas com chuva no fim da tarde. Reserve um tempo para
                  finalizar a autenticação.
                </p>
                <span className="preview-inline-action">
                  Ler em 1 min <Sparkles />
                </span>
              </section>
            </div>
            <div className="content-grid">
              <section className="list-card">
                <div className="section-heading">
                  <h3>Para hoje</h3>
                  <span className="preview-inline-action">
                    <Plus /> Adicionar
                  </span>
                </div>
                <div className="task done">
                  <i>
                    <Check />
                  </i>
                  <span>Organizar o fluxo de login</span>
                </div>
                <div className="task">
                  <i />
                  <span>Ler 50 páginas</span>
                  <em>Leitura</em>
                </div>
                <div className="task">
                  <i />
                  <span>Revisar a semana</span>
                  <em>15 min</em>
                </div>
              </section>
              <section className="list-card habits">
                <div className="section-heading">
                  <h3>Ritual</h3>
                  <a href="#ritmo">Ver progresso</a>
                </div>
                <Habit name="Leitura" completed={4} />
                <Habit name="Movimento" completed={3} />
              </section>
            </div>
            <section className="saved-card">
              <div>
                <p className="card-label">SALVOS RECENTEMENTE</p>
                <h3>Coisas que valem voltar</h3>
              </div>
              <div className="saved-items">
                <span>
                  <i>AI</i> Building AI agents
                </span>
                <span>
                  <i>↗</i> A arte de não fazer tudo
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MotionReveal>
  );
}

function Habit({ completed, name }: { completed: number; name: string }) {
  return (
    <div className="habit">
      <span>{name}</span>
      <div className="habit-days">
        {["seg", "ter", "qua", "qui", "sex", "sab", "dom"].map((day, index) => (
          <i
            className={index < completed ? "complete" : ""}
            key={`${name}-${day}`}
          />
        ))}
      </div>
      <strong>{completed} dias</strong>
    </div>
  );
}
