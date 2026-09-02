"use client";

import { useEffect, useMemo, useState } from "react";

export type TableColumn<T> = {
  label: string;
  render: (row: T) => React.ReactNode;
};

export type CrudFormField = {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'number';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
};

export type CrudFormValues = Record<string, string>;

type CrudTableProps<T extends { id: string }> = {
  entityName: string;
  entityNamePlural: string;
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  getSearchText: (row: T) => string;
  getTitle: (row: T) => string;
  createRecord: (values: CrudFormValues) => Promise<T>;
  updateRecord: (row: T, values: CrudFormValues) => Promise<T>;
  formFields: CrudFormField[];
  getCreateInitialValues: () => CrudFormValues;
  getUpdateInitialValues: (row: T) => CrudFormValues;
  deleteRecordsApi: (ids: string[]) => Promise<void>;
};

export function CrudTable<T extends { id: string }>({
  entityName,
  entityNamePlural,
  columns,
  data,
  isLoading,
  getSearchText,
  getTitle,
  createRecord,
  updateRecord,
  formFields,
  getCreateInitialValues,
  getUpdateInitialValues,
  deleteRecordsApi,
}: CrudTableProps<T>) {
  const [rows, setRows] = useState(data);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'create' | 'update' | null>(null);
  const [editingRow, setEditingRow] = useState<T | null>(null);
  const [formValues, setFormValues] = useState<CrudFormValues>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRows(data);
  }, [data]);

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

  function openCreateForm() {
    setError(null);
    setEditingRow(null);
    setFormValues(getCreateInitialValues());
    setMode('create');
  }

  function openUpdateForm(row: T) {
    setError(null);
    setEditingRow(row);
    setFormValues(getUpdateInitialValues(row));
    setMode('update');
  }

  function closeForm() {
    if (busy) return;
    setMode(null);
    setEditingRow(null);
    setFormValues({});
  }

  function updateFormValue(field: string, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
  }

  async function submitForm() {
    if (!mode) return;

    setError(null);
    setBusy(true);

    try {
      if (mode === 'create') {
        const created = await createRecord(formValues);
        setRows((current) => [created, ...current]);
      } else if (editingRow) {
        const updated = await updateRecord(editingRow, formValues);
        setRows((current) =>
          current.map((item) => (item.id === editingRow.id ? updated : item)),
        );
      }

      setMode(null);
      setEditingRow(null);
      setFormValues({});
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : mode === 'create'
            ? 'Erro ao cadastrar item.'
            : 'Erro ao atualizar item.',
      );
    } finally {
      setBusy(false);
    }
  }

  async function deleteRecords(ids: string[]) {
    if (!ids.length || !window.confirm(`Excluir ${ids.length} ${ids.length === 1 ? entityName.toLocaleLowerCase() : entityNamePlural.toLocaleLowerCase()}?`)) return;

    setError(null);
    setBusy(true);
    try {
      await deleteRecordsApi(ids);
      setRows((current) => current.filter((row) => !ids.includes(row.id)));
      setSelectedIds((current) => new Set([...current].filter((id) => !ids.includes(id))));
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Erro ao excluir item.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      className="mx-auto w-full max-w-280"
      aria-label={`Cadastro de ${entityNamePlural.toLocaleLowerCase()}`}
    >
      <div className="mb-8 flex items-start justify-between gap-6 max-sm:mb-6 max-sm:flex-col">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-.035em] text-foreground">
            {entityNamePlural}
          </h1>
          <p className="mt-2 mb-0 text-sm text-(--font-muted)">
            Gerencie os cadastros de {entityNamePlural.toLocaleLowerCase()}.
          </p>
        </div>
        <button
          className="min-h-10.5 whitespace-nowrap rounded-lg bg-tone-1 px-4 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(143,33,237,.22)] hover:-translate-y-px hover:bg-[#7e18d4]"
          onClick={openCreateForm}
          disabled={busy || isLoading}
        >
          + Cadastrar {entityName}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-[#d85a6b]">{error}</p>}

      <div className="mb-3.5 flex min-h-10.5 gap-2.5">
        <button
          className="min-h-9.5 rounded-md border border-(--sidebar-border) bg-(--theme-button) px-3.25 text-[13px] font-semibold text-foreground"
          onClick={() => setFilterOpen((current) => !current)}
          aria-expanded={filterOpen}
        >
          ⌕ Filtros
        </button>
        {selectedIds.size > 0 && (
          <button
            className="min-h-9.5 rounded-md border border-[color-mix(in_srgb,#d85a6b_27%,transparent)] bg-[color-mix(in_srgb,#d85a6b_10%,transparent)] px-3.25 text-[13px] font-semibold text-[#d85a6b]"
            onClick={() => deleteRecords([...selectedIds])}
            disabled={busy}
          >
            Excluir selecionados ({selectedIds.size})
          </button>
        )}
      </div>

      {filterOpen && (
        <div className="mb-3.5 grid max-w-90 gap-1.75 rounded-[9px] border border-(--sidebar-border) bg-(--theme-button) p-3.5">
          <label
            className="text-xs font-semibold text-(--font-muted)"
            htmlFor="table-search"
          >
            Buscar
          </label>
          <input
            className="min-h-9.25 w-full rounded-md border border-(--sidebar-border) bg-(--color-content) px-2.5 text-[13px] text-foreground outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]"
            id="table-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Buscar ${entityNamePlural.toLocaleLowerCase()}`}
            autoFocus
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-[11px] border border-(--sidebar-border) bg-(--color-sidebar)">
        <table className="w-full min-w-170 border-collapse text-left">
          <thead>
            <tr>
              <th className="w-11 border-b border-(--sidebar-border) bg-(--theme-button) py-3.25 pr-0 pl-4 text-center text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)">
                <input
                  className="size-3.75 cursor-pointer accent-tone-1"
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleAll}
                  aria-label="Selecionar todos os itens visíveis"
                />
              </th>
              {columns.map((column) => (
                <th
                  className="border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3.25 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)"
                  key={column.label}
                >
                  {column.label}
                </th>
              ))}
              <th className="w-44 border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3.25 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr className="hover:bg-(--nav-hover)" key={row.id}>
                <td className="w-11 border-b border-(--sidebar-border) py-4 pr-0 pl-4 text-center last:border-0">
                  <input
                    className="size-3.75 cursor-pointer accent-tone-1"
                    type="checkbox"
                    checked={selectedIds.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    aria-label={`Selecionar ${getTitle(row)}`}
                  />
                </td>
                {columns.map((column) => (
                  <td
                    className="border-b border-(--sidebar-border) px-4 py-4 text-[13px] text-foreground last:border-0"
                    key={column.label}
                  >
                    {column.render(row)}
                  </td>
                ))}
                <td className="flex gap-4 whitespace-nowrap border-b border-(--sidebar-border) px-4 py-4 last:border-0">
                  <button
                    className="p-0 text-[13px] font-semibold text-[#a955ed] hover:underline"
                    onClick={() => openUpdateForm(row)}
                    disabled={busy}
                  >
                    Atualizar
                  </button>
                  <button
                    className="p-0 text-[13px] font-semibold text-[#d85a6b] hover:underline"
                    onClick={() => deleteRecords([row.id])}
                    disabled={busy}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading ? (
          <p className="m-0 p-7 text-center text-sm text-(--font-muted)">Carregando...</p>
        ) : visibleRows.length === 0 && (
          <p className="m-0 p-7 text-center text-sm text-(--font-muted)">
            Nenhum cadastro encontrado.
          </p>
        )}
      </div>

      {mode && (
        <div className="fixed inset-0 z-100 grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <section className="w-full max-w-xl rounded-2xl border border-(--sidebar-border) bg-(--color-sidebar) p-6 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
            <h2 className="m-0 text-xl font-bold text-foreground">
              {mode === 'create' ? `Cadastrar ${entityName}` : `Atualizar ${getTitle(editingRow as T)}`}
            </h2>
            <p className="mt-2 mb-5 text-sm text-(--font-muted)">
              {mode === 'create'
                ? `Preencha os dados para cadastrar ${entityName.toLocaleLowerCase()}.`
                : `Edite os dados de ${entityName.toLocaleLowerCase()}.`}
            </p>

            <div className="grid gap-4">
              {formFields.map((field) => {
                const value = formValues[field.name] ?? '';
                const id = `crud-form-${field.name}`;

                if (field.type === 'textarea') {
                  return (
                    <label className="grid gap-1.5 text-sm font-semibold text-foreground" key={field.name} htmlFor={id}>
                      {field.label}
                      <textarea
                        id={id}
                        className="min-h-24 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 py-2 text-sm text-foreground outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]"
                        value={value}
                        onChange={(event) => updateFormValue(field.name, event.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={busy}
                      />
                    </label>
                  );
                }

                if (field.type === 'select') {
                  return (
                    <label className="grid gap-1.5 text-sm font-semibold text-foreground" key={field.name} htmlFor={id}>
                      {field.label}
                      <select
                        id={id}
                        className="min-h-11 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]"
                        value={value}
                        onChange={(event) => updateFormValue(field.name, event.target.value)}
                        required={field.required}
                        disabled={busy}
                      >
                        {!field.required && <option value="">Selecione...</option>}
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }

                return (
                  <label className="grid gap-1.5 text-sm font-semibold text-foreground" key={field.name} htmlFor={id}>
                    {field.label}
                    <input
                      id={id}
                      className="min-h-11 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]"
                      type={field.type === 'number' ? 'number' : 'text'}
                      value={value}
                      onChange={(event) => updateFormValue(field.name, event.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      disabled={busy}
                    />
                  </label>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                className="min-h-10 rounded-lg border border-(--sidebar-border) bg-(--theme-button) px-4 text-sm font-semibold text-foreground"
                onClick={closeForm}
                disabled={busy}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="min-h-10 rounded-lg bg-tone-1 px-4 text-sm font-bold text-white hover:bg-[#7e18d4]"
                onClick={() => void submitForm()}
                disabled={busy}
              >
                {busy ? 'Salvando...' : mode === 'create' ? 'Cadastrar' : 'Salvar alterações'}
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
