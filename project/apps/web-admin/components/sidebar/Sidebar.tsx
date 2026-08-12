import React from "react";
import { cl } from "@repo/utils";
import { useTheme } from "@/hooks/useTheme";

const links = [
  {
    label: "Editais",
    link: "#notices",
  },
  {
    label: "Matérias",
    link: "#subjects",
  },
  {
    label: "Tópicos",
    link: "#topics",
  },
  {
    label: "Questões",
    link: "#questions",
  },
  {
    label: "Flashcards",
    link: "#flashcards",
  },
];

interface SidebarProps {
  className?: string;
}

function Sidebar(props: SidebarProps) {
  const { toggleTheme } = useTheme();
  return (
    <div className={cl("flex flex-col", "bg-(--color-sidebar)")}>
      <button onClick={toggleTheme}>TEMA</button>
      {links.map((l, k) => (
        <div key={k}>
          <a href={l.link}>{l.label}</a>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
