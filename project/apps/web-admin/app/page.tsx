'use client'

import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="admin-shell" id="top">
      <Sidebar />
      <main className="content-area" aria-label="Conteúdo principal" />
    </div>
  );
}
