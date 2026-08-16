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
    <section className="crud-card" aria-label={`Cadastro de ${entityNamePlural.toLocaleLowerCase()}`}>
      <div className="crud-header">
        <div>
          <h1>{entityNamePlural}</h1>
          <p>Gerencie os cadastros de {entityNamePlural.toLocaleLowerCase()}.</p>
        </div>
        <button className="primary-button" onClick={addRecord}>+ Cadastrar {entityName}</button>
      </div>

      <div className="table-toolbar">
        <button className="filter-button" onClick={() => setFilterOpen((current) => !current)} aria-expanded={filterOpen}>⌕ Filtros</button>
        {selectedIds.size > 0 && <button className="bulk-delete" onClick={() => deleteRecords([...selectedIds])}>Excluir selecionados ({selectedIds.size})</button>}
      </div>

      {filterOpen && (
        <div className="filter-panel">
          <label htmlFor="table-search">Buscar</label>
          <input id="table-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Buscar ${entityNamePlural.toLocaleLowerCase()}`} autoFocus />
        </div>
      )}

      <div className="table-wrapper">
        <table className="crud-table">
          <thead>
            <tr>
              <th className="selection-cell"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Selecionar todos os itens visíveis" /></th>
              {columns.map((column) => <th key={column.label}>{column.label}</th>)}
              <th className="actions-cell">Ações</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id}>
                <td className="selection-cell"><input type="checkbox" checked={selectedIds.has(row.id)} onChange={() => toggleRow(row.id)} aria-label={`Selecionar ${getTitle(row)}`} /></td>
                {columns.map((column) => <td key={column.label}>{column.render(row)}</td>)}
                <td className="row-actions">
                  <button className="text-button" onClick={() => editRecord(row)}>Atualizar</button>
                  <button className="text-button danger" onClick={() => deleteRecords([row.id])}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleRows.length === 0 && <p className="empty-table">Nenhum cadastro encontrado.</p>}
      </div>
    </section>
  );
}
