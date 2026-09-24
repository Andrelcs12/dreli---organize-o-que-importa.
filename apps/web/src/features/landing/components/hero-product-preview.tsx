import {
  Check,
  Circle,
  Ellipsis,
  Inbox,
  LibraryBig,
  ListTodo,
} from "lucide-react";

const tasks = [
  { label: "Ler 30 páginas", complete: false },
  { label: "Organizar referências", complete: true },
  { label: "Revisar projeto", complete: false },
];

export function HeroProductPreview() {
  return (
    <section
      aria-label="Prévia do produto Dreli"
      className="hero-product-preview"
    >
      <div className="hero-preview-header">
        <div>
          <span>Hoje</span>
          <p>quarta, 24 de setembro</p>
        </div>
        <Ellipsis aria-hidden="true" />
      </div>

      <div className="hero-rhythm-summary">
        <div>
          <span>Seu ritmo</span>
          <strong>68%</strong>
        </div>
        <div className="hero-rhythm-ring" aria-hidden="true">
          <span>bom</span>
        </div>
      </div>

      <div className="hero-preview-section">
        <div className="hero-preview-section-heading">
          <span>Para hoje</span>
          <ListTodo aria-hidden="true" />
        </div>
        <ul className="hero-task-list">
          {tasks.map((task) => (
            <li key={task.label}>
              {task.complete ? (
                <Check aria-hidden="true" className="hero-task-check" />
              ) : (
                <Circle aria-hidden="true" />
              )}
              <span className={task.complete ? "is-complete" : undefined}>
                {task.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-preview-footer">
        <div>
          <Inbox aria-hidden="true" />
          <span>Inbox</span>
          <strong>3 itens</strong>
        </div>
        <div>
          <LibraryBig aria-hidden="true" />
          <span>Biblioteca</span>
          <strong>12 salvos</strong>
        </div>
      </div>

      <div className="hero-ritual">
        <span>Ritual</span>
        <div aria-label="Ritual de quatro dias concluídos" role="img">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <strong>4 dias</strong>
      </div>
    </section>
  );
}
