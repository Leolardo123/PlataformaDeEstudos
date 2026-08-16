"use client";

import { useMemo, useState } from "react";

export type TableColumn<T> = {
  label: string;
  render: (row: T) => React.ReactNode;
};

type CrudTableProps<T extends { id: string }> = {
  entityName: string;
  entityNamePlural: string;
  columns: TableColumn<T>[];
  data: T[];
  getSearchText: (row: T) => string;
  getTitle: (row: T) => string;
  createRecord: (title: string) => T;
  updateRecord: (row: T, title: string) => T;
};

export function CrudTable<T extends { id: string }>({
  entityName,
  entityNamePlural,
  columns,
  data,
  getSearchText,
  getTitle,
  createRecord,
  updateRecord,
}: CrudTableProps<T>) {
  const [rows, setRows] = useState(data);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");

  const visibleRows = useMemo(
    () => rows.filter((row) => getSearchText(row).toLocaleLowerCase().includes(search.toLocaleLowerCase())),
    [getSearchText, rows, search],
  );
  const allVisibleSelected = visibleRows.length > 0 && visibleRows.every((row) => selectedIds.has(row.id));

  function toggleRow(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (allVisibleSelected) visibleRows.forEach((row) => next.delete(row.id));
      else visibleRows.forEach((row) => next.add(row.id));
      return next;
    });
  }

  function addRecord() {
    const title = window.prompt(`Nome do novo ${entityName.toLocaleLowerCase()}:`);
    if (title?.trim()) setRows((current) => [createRecord(title.trim()), ...current]);
  }

  function editRecord(row: T) {
    const title = window.prompt(`Atualizar ${entityName.toLocaleLowerCase()}:`, getTitle(row));
    if (title?.trim()) setRows((current) => current.map((item) => item.id === row.id ? updateRecord(item, title.trim()) : item));
  }

  function deleteRecords(ids: string[]) {
    if (!ids.length || !window.confirm(`Excluir ${ids.length} ${ids.length === 1 ? entityName.toLocaleLowerCase() : entityNamePlural.toLocaleLowerCase()}?`)) return;
    setRows((current) => current.filter((row) => !ids.includes(row.id)));
    setSelectedIds((current) => new Set([...current].filter((id) => !ids.includes(id))));
  }

  return (
    <section className="mx-auto w-full max-w-280" aria-label={`Cadastro de ${entityNamePlural.toLocaleLowerCase()}`}>
      <div className="mb-8 flex items-start justify-between gap-6 max-sm:mb-6 max-sm:flex-col">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-.035em] text-foreground">{entityNamePlural}</h1>
          <p className="mt-2 mb-0 text-sm text-(--font-muted)">Gerencie os cadastros de {entityNamePlural.toLocaleLowerCase()}.</p>
        </div>
        <button className="min-h-10.5 whitespace-nowrap rounded-lg bg-tone-1 px-4 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(143,33,237,.22)] hover:-translate-y-px hover:bg-[#7e18d4]" onClick={addRecord}>+ Cadastrar {entityName}</button>
      </div>

      <div className="mb-3.5 flex min-h-10.5 gap-2.5">
        <button className="min-h-9.5 rounded-md border border-(--sidebar-border) bg-(--theme-button) px-3.25 text-[13px] font-semibold text-foreground" onClick={() => setFilterOpen((current) => !current)} aria-expanded={filterOpen}>⌕ Filtros</button>
        {selectedIds.size > 0 && <button className="min-h-9.5 rounded-md border border-[color-mix(in_srgb,#d85a6b_27%,transparent)] bg-[color-mix(in_srgb,#d85a6b_10%,transparent)] px-3.25 text-[13px] font-semibold text-[#d85a6b]" onClick={() => deleteRecords([...selectedIds])}>Excluir selecionados ({selectedIds.size})</button>}
      </div>

      {filterOpen && (
        <div className="mb-3.5 grid max-w-90 gap-1.75 rounded-[9px] border border-(--sidebar-border) bg-(--theme-button) p-3.5">
          <label className="text-xs font-semibold text-(--font-muted)" htmlFor="table-search">Buscar</label>
          <input className="min-h-9.25 w-full rounded-md border border-(--sidebar-border) bg-(--color-content) px-2.5 text-[13px] text-foreground outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]" id="table-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Buscar ${entityNamePlural.toLocaleLowerCase()}`} autoFocus />
        </div>
      )}

      <div className="overflow-x-auto rounded-[11px] border border-(--sidebar-border) bg-(--color-sidebar)">
        <table className="w-full min-w-170 border-collapse text-left">
          <thead>
            <tr>
              <th className="w-11 border-b border-(--sidebar-border) bg-(--theme-button) py-3.25 pr-0 pl-4 text-center text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)"><input className="size-3.75 cursor-pointer accent-tone-1" type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Selecionar todos os itens visíveis" /></th>
              {columns.map((column) => <th className="border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3.25 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)" key={column.label}>{column.label}</th>)}
              <th className="w-44 border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3.25 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)">Ações</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr className="hover:bg-(--nav-hover)" key={row.id}>
                <td className="w-11 border-b border-(--sidebar-border) py-4 pr-0 pl-4 text-center last:border-0"><input className="size-3.75 cursor-pointer accent-tone-1" type="checkbox" checked={selectedIds.has(row.id)} onChange={() => toggleRow(row.id)} aria-label={`Selecionar ${getTitle(row)}`} /></td>
                {columns.map((column) => <td className="border-b border-(--sidebar-border) px-4 py-4 text-[13px] text-foreground last:border-0" key={column.label}>{column.render(row)}</td>)}
                <td className="flex gap-4 whitespace-nowrap border-b border-(--sidebar-border) px-4 py-4 last:border-0">
                  <button className="p-0 text-[13px] font-semibold text-[#a955ed] hover:underline" onClick={() => editRecord(row)}>Atualizar</button>
                  <button className="p-0 text-[13px] font-semibold text-[#d85a6b] hover:underline" onClick={() => deleteRecords([row.id])}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleRows.length === 0 && <p className="m-0 p-7 text-center text-sm text-[var(--font-muted)]">Nenhum cadastro encontrado.</p>}
      </div>
    </section>
  );
}
