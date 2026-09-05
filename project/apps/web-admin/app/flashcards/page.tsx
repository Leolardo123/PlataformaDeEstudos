"use client";

import { useEffect, useMemo, useState } from "react";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  apiClient,
  type FlashcardResource,
  type RecordStatus,
  statusToLabel,
  type TopicResource,
} from "@/lib/api";

type FlashcardRow = {
  id: string;
  front: string;
  back: string;
  topicId: string;
  topicLabel: string;
  status: RecordStatus;
};

type FormState = {
  front: string;
  back: string;
  topicId: string;
  status: RecordStatus;
};

const statusOptions: Array<{ value: RecordStatus; label: string }> = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PUBLISHED", label: "Ativo" },
  { value: "ARCHIVED", label: "Arquivado" },
];

function toRow(flashcard: FlashcardResource): FlashcardRow {
  return {
    id: flashcard.id,
    front: flashcard.front,
    back: flashcard.back ?? "",
    topicId: flashcard.topicId,
    topicLabel: flashcard.topic?.name ?? "Sem tópico",
    status: flashcard.status,
  };
}

function getStatusClass(status: RecordStatus) {
  return status === "PUBLISHED"
    ? "inline-flex rounded-full bg-[rgba(42,160,103,.13)] px-2 py-1 text-[11px] font-bold text-[#268053]"
    : "inline-flex rounded-full bg-[rgba(193,143,35,.14)] px-2 py-1 text-[11px] font-bold text-[#977123]";
}

export default function FlashcardsPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<FlashcardRow[]>([]);
  const [topics, setTopics] = useState<TopicResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"list" | "create" | "update">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    front: "",
    back: "",
    topicId: "",
    status: "DRAFT",
  });

  useEffect(() => {
    if (!accessToken) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    void Promise.all([
      apiClient.flashcards.list(accessToken),
      apiClient.topics.list(accessToken),
    ])
      .then(([flashcards, topicList]) => {
        setRows(flashcards.map(toRow));
        setTopics(topicList);
      })
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  const visibleRows = useMemo(() => {
    const normalized = search.toLocaleLowerCase();
    return rows.filter((row) =>
      `${row.front} ${row.back} ${row.topicLabel}`
        .toLocaleLowerCase()
        .includes(normalized),
    );
  }, [rows, search]);

  function openCreate() {
    setError(null);
    setEditingId(null);
    setForm({
      front: "",
      back: "",
      topicId: topics[0]?.id ?? "",
      status: "DRAFT",
    });
    setMode("create");
  }

  function openUpdate(row: FlashcardRow) {
    setError(null);
    setEditingId(row.id);
    setForm({
      front: row.front,
      back: row.back,
      topicId: row.topicId,
      status: row.status,
    });
    setMode("update");
  }

  function closeForm() {
    if (busy) return;
    setMode("list");
    setEditingId(null);
  }

  async function submitForm() {
    if (!accessToken) {
      setError("Sessão inválida.");
      return;
    }

    setError(null);
    setBusy(true);

    try {
      if (mode === "create") {
        if (!form.topicId) {
          throw new Error("Cadastre um tópico antes de criar flashcards.");
        }

        const created = await apiClient.flashcards.create(accessToken, {
          front: form.front.trim(),
          back: form.back.trim() || undefined,
          status: form.status,
          topicId: form.topicId,
        });
        setRows((current) => [toRow(created), ...current]);
      } else if (mode === "update" && editingId) {
        const updated = await apiClient.flashcards.update(
          accessToken,
          editingId,
          {
            front: form.front.trim(),
            back: form.back.trim() || undefined,
            status: form.status,
            topicId: form.topicId,
          },
        );
        const next = toRow(updated);
        setRows((current) =>
          current.map((item) => (item.id === editingId ? next : item)),
        );
      }

      setMode("list");
      setEditingId(null);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Erro ao salvar flashcard.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function removeRow(id: string) {
    if (!accessToken) {
      setError("Sessão inválida.");
      return;
    }

    if (!window.confirm("Excluir este flashcard?")) return;

    setBusy(true);
    setError(null);
    try {
      await apiClient.flashcards.delete(accessToken, id);
      setRows((current) => current.filter((row) => row.id !== id));
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Erro ao excluir flashcard.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScreenTransition>
      <section
        className="mx-auto w-full max-w-280"
        aria-label="Cadastro de flashcards"
      >
        {mode === "list" ? (
          <>
            <div className="mb-8 flex items-start justify-between gap-6 max-sm:mb-6 max-sm:flex-col">
              <div>
                <h1 className="m-0 text-[28px] font-bold tracking-[-.035em] text-foreground">
                  Flashcards
                </h1>
                <p className="mt-2 mb-0 text-sm text-(--font-muted)">
                  Gerencie os cadastros de flashcards.
                </p>
              </div>
              <button
                className="min-h-10.5 whitespace-nowrap rounded-lg bg-tone-1 px-4 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(143,33,237,.22)] hover:-translate-y-px hover:bg-[#7e18d4]"
                onClick={openCreate}
                disabled={busy || isLoading}
              >
                + Cadastrar Flashcard
              </button>
            </div>

            {error && <p className="mb-4 text-sm text-[#d85a6b]">{error}</p>}

            <div className="mb-3.5 grid max-w-90 gap-1.75 rounded-[9px] border border-(--sidebar-border) bg-(--theme-button) p-3.5">
              <label
                className="text-xs font-semibold text-(--font-muted)"
                htmlFor="flashcard-search"
              >
                Buscar
              </label>
              <input
                id="flashcard-search"
                className="min-h-9.25 w-full rounded-md border border-(--sidebar-border) bg-(--color-content) px-2.5 text-[13px] text-foreground outline-none"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar flashcards"
              />
            </div>

            <div className="overflow-x-auto rounded-[11px] border border-(--sidebar-border) bg-(--color-sidebar)">
              <table className="w-full min-w-170 border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)">
                      Frente
                    </th>
                    <th className="border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)">
                      Tópico
                    </th>
                    <th className="border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)">
                      Status
                    </th>
                    <th className="w-44 border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row) => (
                    <tr className="hover:bg-(--nav-hover)" key={row.id}>
                      <td className="border-b border-(--sidebar-border) px-4 py-4 text-[13px] text-foreground">
                        {row.front}
                      </td>
                      <td className="border-b border-(--sidebar-border) px-4 py-4 text-[13px] text-foreground">
                        {row.topicLabel}
                      </td>
                      <td className="border-b border-(--sidebar-border) px-4 py-4 text-[13px] text-foreground">
                        <span className={getStatusClass(row.status)}>
                          {statusToLabel(row.status)}
                        </span>
                      </td>
                      <td className="flex gap-4 whitespace-nowrap border-b border-(--sidebar-border) px-4 py-4">
                        <button
                          className="p-0 text-[13px] font-semibold text-[#a955ed] hover:underline"
                          onClick={() => openUpdate(row)}
                          disabled={busy}
                        >
                          Atualizar
                        </button>
                        <button
                          className="p-0 text-[13px] font-semibold text-[#d85a6b] hover:underline"
                          onClick={() => void removeRow(row.id)}
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
                <p className="m-0 p-7 text-center text-sm text-(--font-muted)">
                  Carregando...
                </p>
              ) : (
                visibleRows.length === 0 && (
                  <p className="m-0 p-7 text-center text-sm text-(--font-muted)">
                    Nenhum cadastro encontrado.
                  </p>
                )
              )}
            </div>
          </>
        ) : (
          <section className="rounded-2xl border border-(--sidebar-border) bg-(--color-sidebar) p-6">
            <div className="mb-6 flex items-start justify-between gap-4 max-sm:flex-col">
              <div>
                <h2 className="m-0 text-2xl font-bold tracking-[-.03em] text-foreground">
                  {mode === "create"
                    ? "Cadastrar Flashcard"
                    : "Atualizar Flashcard"}
                </h2>
                <p className="mt-2 mb-0 text-sm text-(--font-muted)">
                  Preencha os dados e salve para continuar.
                </p>
              </div>
              <button
                type="button"
                className="min-h-10 rounded-lg border border-(--sidebar-border) bg-(--theme-button) px-4 text-sm font-semibold text-foreground"
                onClick={closeForm}
                disabled={busy}
              >
                Voltar para listagem
              </button>
            </div>

            {error && <p className="mb-4 text-sm text-[#d85a6b]">{error}</p>}

            <div className="grid gap-4">
              <label
                className="grid gap-1.5 text-sm font-semibold text-foreground"
                htmlFor="flashcard-front"
              >
                Frente
                <input
                  id="flashcard-front"
                  className="min-h-11 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground"
                  value={form.front}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      front: event.target.value,
                    }))
                  }
                  required
                  disabled={busy}
                />
              </label>

              <label
                className="grid gap-1.5 text-sm font-semibold text-foreground"
                htmlFor="flashcard-back"
              >
                Verso
                <textarea
                  id="flashcard-back"
                  className="min-h-24 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 py-2 text-sm text-foreground"
                  value={form.back}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      back: event.target.value,
                    }))
                  }
                  disabled={busy}
                />
              </label>

              <label
                className="grid gap-1.5 text-sm font-semibold text-foreground"
                htmlFor="flashcard-topic"
              >
                Tópico
                <select
                  id="flashcard-topic"
                  className="min-h-11 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground"
                  value={form.topicId}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      topicId: event.target.value,
                    }))
                  }
                  disabled={busy}
                >
                  <option value="">Selecione...</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </label>

              <label
                className="grid gap-1.5 text-sm font-semibold text-foreground"
                htmlFor="flashcard-status"
              >
                Status
                <select
                  id="flashcard-status"
                  className="min-h-11 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground"
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value as RecordStatus,
                    }))
                  }
                  disabled={busy}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
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
                {busy
                  ? "Salvando..."
                  : mode === "create"
                    ? "Cadastrar"
                    : "Salvar alterações"}
              </button>
            </div>
          </section>
        )}
      </section>
    </ScreenTransition>
  );
}
