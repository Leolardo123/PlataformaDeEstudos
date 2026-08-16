"use client";

import { useTheme } from "@/hooks/useTheme";

const links = [
  {
    label: "Editais",
    link: "#notices",
    icon: "document",
  },
  {
    label: "Matérias",
    link: "#subjects",
    icon: "book",
  },
  {
    label: "Tópicos",
    link: "#topics",
    icon: "layers",
  },
  {
    label: "Questões",
    link: "#questions",
    icon: "check",
  },
  {
    label: "Flashcards",
    link: "#flashcards",
    icon: "cards",
  },
];

function NavigationIcon({ name }: { name: string }) {
  const commonProps = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "book") {
    return <svg {...commonProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></svg>;
  }

  if (name === "layers") {
    return <svg {...commonProps}><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="m4 12 8 4.5 8-4.5" /><path d="m4 16.5 8 4.5 8-4.5" /></svg>;
  }

  if (name === "check") {
    return <svg {...commonProps}><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12 2.3 2.3 4.8-5" /></svg>;
  }

  if (name === "cards") {
    return <svg {...commonProps}><rect x="6" y="4" width="13" height="16" rx="2" /><path d="M5 8H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h11" /><path d="M9 9h7M9 13h5" /></svg>;
  }

  return <svg {...commonProps}><path d="M6 3.5h8l4 4V20.5H6z" /><path d="M14 3.5v4h4M9 12h6M9 16h6" /></svg>;
}

function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const nextThemeLabel = theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <a className="brand" href="#top" aria-label="PDE — início">
        <span className="brand-mark">P</span>
        <span>PDE</span>
      </a>

      <nav className="sidebar-nav">
        <p className="nav-label">Gerenciamento</p>
        <ul>
          {links.map((item) => (
            <li key={item.link}>
              <a className="nav-link" href={item.link}>
                <NavigationIcon name={item.icon} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme} aria-label={nextThemeLabel} title={nextThemeLabel}>
          <span className="theme-icon" aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span>
          <span>{theme === "dark" ? "Tema claro" : "Tema escuro"}</span>
        </button>
        <div className="account">
          <span className="avatar" aria-hidden="true">A</span>
          <span className="account-name">Administrador</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
