"use client";

import { useMemo, useState } from "react";

type Period = "Dia" | "Semana" | "Mês";

const chartData: Record<
  Period,
  { labels: string[]; values: number[]; total: string; comparison: string }
> = {
  Dia: {
    labels: ["08h", "10h", "12h", "14h", "16h", "18h", "20h"],
    values: [4, 7, 5, 12, 18, 16, 22],
    total: "46",
    comparison: "+12,2% em relação a ontem",
  },
  Semana: {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    values: [32, 48, 41, 58, 73, 29, 33],
    total: "314",
    comparison: "+8,4% em relação à semana anterior",
  },
  Mês: {
    labels: ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"],
    values: [256, 309, 287, 394],
    total: "1.246",
    comparison: "+18,6% em relação ao mês anterior",
  },
};

const metrics = [
  { label: "Usuários cadastrados", value: "12.480", description: "+8,4% no período", icon: "users" },
  { label: "Acessos à plataforma", value: "28.736", description: "+14,8% no período", icon: "access" },
  { label: "Usuários ativos", value: "2.987", description: "23,9% da base", icon: "active" },
  { label: "Questões cadastradas", value: "8.642", description: "Total disponível", icon: "question" },
  { label: "Conteúdos cadastrados", value: "1.328", description: "Total disponível", icon: "content" },
  { label: "Flashcards cadastrados", value: "5.418", description: "Total disponível", icon: "cards" },
];

function MetricIcon({ name }: { name: string }) {
  const props = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "users") return <svg {...props}><path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" /><circle cx="9" cy="7" r="4" /><path d="M22 20v-1.5a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  if (name === "access") return <svg {...props}><path d="M4 19V9M10 19V5M16 19v-8M22 19v-4" /></svg>;
  if (name === "active") return <svg {...props}><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12 2.3 2.3 4.8-5" /></svg>;
  if (name === "question") return <svg {...props}><circle cx="12" cy="12" r="8.5" /><path d="M9.7 9a2.4 2.4 0 1 1 3.9 1.9c-.9.7-1.6 1.2-1.6 2.6" /><path d="M12 17h.01" /></svg>;
  if (name === "content") return <svg {...props}><path d="M6 3.5h8l4 4V20.5H6z" /><path d="M14 3.5v4h4M9 12h6M9 16h6" /></svg>;
  return <svg {...props}><rect x="6" y="4" width="13" height="16" rx="2" /><path d="M5 8H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h11" /><path d="M9 9h7M9 13h5" /></svg>;
}

export function AdminDashboard() {
  const [period, setPeriod] = useState<Period>("Semana");
  const currentData = chartData[period];
  const points = useMemo(() => {
    const max = Math.max(...currentData.values);
    const width = 640;
    const height = 220;
    const padding = 18;
    return currentData.values.map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / Math.max(currentData.values.length - 1, 1);
      const y = height - padding - (value / max) * (height - padding * 2);
      return `${x},${y}`;
    });
  }, [currentData]);

  return (
    <section className="mx-auto w-full max-w-[1180px]">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold text-[#a955ed]">Visão geral</p>
        <h1 className="m-0 text-[28px] font-bold tracking-[-.035em] text-[var(--foreground)]">Dashboard</h1>
        <p className="mt-2 mb-0 text-sm text-[var(--font-muted)]">Acompanhe a atividade e o conteúdo da plataforma.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <article className="rounded-xl border border-[var(--sidebar-border)] bg-[var(--color-sidebar)] p-5" key={metric.label}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <p className="m-0 text-[13px] font-medium text-[var(--font-muted)]">{metric.label}</p>
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[rgba(143,33,237,.13)] text-[#a955ed]"><MetricIcon name={metric.icon} /></span>
            </div>
            <strong className="block text-[26px] font-bold tracking-[-.03em] text-[var(--foreground)]">{metric.value}</strong>
            <p className="mt-2 mb-0 text-xs font-medium text-[#268053]">{metric.description}</p>
          </article>
        ))}
      </div>

      <section className="mt-6 rounded-xl border border-[var(--sidebar-border)] bg-[var(--color-sidebar)] p-5 sm:p-6" aria-label="Novos usuários por período">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="m-0 text-base font-bold text-[var(--foreground)]">Novos usuários</h2>
            <p className="mt-1 mb-0 text-[13px] text-[var(--font-muted)]">Cadastros concluídos na plataforma</p>
          </div>
          <div className="flex w-fit rounded-lg bg-[var(--theme-button)] p-1" role="group" aria-label="Período de novos usuários">
            {(Object.keys(chartData) as Period[]).map((option) => (
              <button className={period === option ? "rounded-md bg-[var(--color-sidebar)] px-3 py-1.5 text-xs font-bold text-[var(--foreground)] shadow-sm" : "rounded-md px-3 py-1.5 text-xs font-semibold text-[var(--font-muted)]"} key={option} onClick={() => setPeriod(option)}>{option}</button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-end gap-3">
          <strong className="text-[30px] font-bold tracking-[-.035em] text-[var(--foreground)]">{currentData.total}</strong>
          <span className="mb-1 text-xs font-medium text-[#268053]">{currentData.comparison}</span>
        </div>

        <div className="mt-5 overflow-x-auto">
          <div className="min-w-[520px]">
            <svg className="h-[230px] w-full" viewBox="0 0 640 220" role="img" aria-label={`Gráfico de ${currentData.total} novos usuários por ${period.toLocaleLowerCase()}`}>
              {[50, 100, 150, 200].map((y) => <line key={y} x1="18" x2="622" y1={y} y2={y} stroke="var(--sidebar-border)" strokeWidth="1" />)}
              <polyline fill="none" points={points.join(" ")} stroke="#a955ed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {points.map((point) => { const [cx, cy] = point.split(","); return <circle key={point} cx={cx} cy={cy} r="4" fill="var(--color-sidebar)" stroke="#a955ed" strokeWidth="2.5" />; })}
            </svg>
            <div className="grid" style={{ gridTemplateColumns: `repeat(${currentData.labels.length}, minmax(0, 1fr))` }}>
              {currentData.labels.map((label) => <span className="text-center text-[11px] text-[var(--font-muted)]" key={label}>{label}</span>)}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
