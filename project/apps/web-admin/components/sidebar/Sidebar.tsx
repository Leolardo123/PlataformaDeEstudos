"use client";

import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";

const links = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: "home",
  },
  {
    label: "Editais",
    link: "/notices",
    icon: "document",
  },
  {
    label: "Matérias",
    link: "/subjects",
    icon: "book",
  },
  {
    label: "Tópicos",
    link: "/topics",
    icon: "layers",
  },
  {
    label: "Questões",
    link: "/questions",
    icon: "check",
  },
  {
    label: "Flashcards",
    link: "/flashcards",
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

  if (name === "home") {
    return <svg {...commonProps}><path d="M3 9.5 12 3l9 6.5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11Z" /><path d="M9 22V12h6v10" /></svg>;
  }

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
  const { user, logout } = useAuth();
  const nextThemeLabel = theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <aside className="sticky top-0 flex h-dvh w-68 shrink-0 self-start flex-col overflow-y-auto border-r border-(--sidebar-border) bg-(--color-sidebar) px-4 pt-7 pb-4.5 text-(--font-sidebar) max-sm:static max-sm:h-auto max-sm:w-full max-sm:px-3.5 max-sm:py-4.5" aria-label="Navegação principal">
      <a className="flex items-center gap-2.5 px-3 text-xl font-bold tracking-[-.04em]" href="#top" aria-label="PDE — início">
        <span className="grid size-7.75 place-items-center rounded-[9px] bg-tone-1 text-[17px] font-extrabold text-white shadow-[0_7px_16px_rgba(143,33,237,.28)]">P</span>
        <span>PDE</span>
      </a>

      <nav className="mt-13 max-sm:mt-7">
        <p className="mb-2.5 mx-3 text-[10px] font-bold uppercase tracking-[.11em] text-(--font-muted)">Gerenciamento</p>
        <ul className="grid list-none gap-1 p-0 max-sm:grid-cols-2">
          {links.map((item) => (
            <li key={item.link}>
              <Link className="flex min-h-11.25 items-center gap-3.25 rounded-[9px] px-3 text-sm font-medium text-inherit transition-colors duration-200 hover:bg-(--nav-hover) focus-visible:bg-(--nav-hover) focus-visible:outline-none" href={item.link}>
                <NavigationIcon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto grid gap-4.5 max-sm:mt-7">
        <button className="flex min-h-10.75 w-full items-center gap-2.75 rounded-[9px] border border-(--sidebar-border) bg-(--theme-button) px-3 text-[13px] font-semibold hover:-translate-y-px hover:bg-(--nav-hover)" onClick={toggleTheme} aria-label={nextThemeLabel} title={nextThemeLabel}>
          <span className="grid w-4.75 place-items-center text-[17px]" aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span>
          <span>{theme === "dark" ? "Tema claro" : "Tema escuro"}</span>
        </button>
        <div className="flex items-center gap-2.5 px-2 text-[13px] text-(--font-muted)">
          <span className="grid size-7.5 place-items-center rounded-full bg-tone-3 text-xs font-bold text-white" aria-hidden="true">A</span>
          <span className="account-name">{user?.name ?? "Administrador"}</span>
        </div>
        <button className="min-h-9.5 rounded-md border border-(--sidebar-border) bg-(--theme-button) px-3 text-[13px] font-semibold text-foreground hover:bg-(--nav-hover)" onClick={logout}>Sair</button>
      </div>
    </aside>
  );
}

export default Sidebar;
