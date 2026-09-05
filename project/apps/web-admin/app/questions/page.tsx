"use client";

import { useEffect, useMemo, useState } from "react";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  apiClient,
  type QuestionResource,
  type RecordStatus,
  statusToLabel,
  type TopicResource,
} from "@/lib/api";

type QuestionRow = {
  alternatives: Array<{
    id?: string;
    text: string;
    order?: number;
    isCorrect?: boolean;
  }>;
  id: string;
  statement: string;
  explanation: string;
  status: RecordStatus;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
};

type FormState = {
  statement: string;
  explanation: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  status: RecordStatus;
  alternatives: Array<{
    id?: string;
    text: string;
    order?: number;
    isCorrect?: boolean;
  }>;
};

const statusOptions: Array<{ value: RecordStatus; label: string }> = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PUBLISHED", label: "Ativo" },
  { value: "ARCHIVED", label: "Arquivado" },
];

function toRow(question: QuestionResource): QuestionRow {
  return {
    id: question.id,
    statement: question.statement,
    explanation: question.explanation ?? "",
    alternatives: question.alternatives ?? [],
    status: question.status,
  };
}

function getStatusClass(status: RecordStatus) {
  return status === "PUBLISHED"
    ? "inline-flex rounded-full bg-[rgba(42,160,103,.13)] px-2 py-1 text-[11px] font-bold text-[#268053]"
    : "inline-flex rounded-full bg-[rgba(193,143,35,.14)] px-2 py-1 text-[11px] font-bold text-[#977123]";
}

export default function QuestoesPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<QuestionRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"list" | "create" | "update">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    statement: "",
    explanation: "",
    alternatives: [],
    difficulty: undefined,
    status: "DRAFT",
  });

  useEffect(() => {
    if (!accessToken) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    void Promise.all([
      apiClient.questions.list(accessToken),
      apiClient.topics.list(accessToken),
    ])
      .then(([questions, topicList]) => {
        setRows(questions.map(toRow));
      })
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  const visibleRows = useMemo(() => {
    const normalized = search.toLocaleLowerCase();
    return rows.filter((row) =>
      `${row.statement} ${row.explanation}`
        .toLocaleLowerCase()
        .includes(normalized),
    );
  }, [rows, search]);

  function openCreate() {
    setError(null);
    setEditingId(null);
    setForm({
      statement: "",
      explanation: "",
      alternatives: [],
      difficulty: undefined,
      status: "DRAFT",
    });
    setMode("create");
  }

  function openUpdate(row: QuestionRow) {
    setError(null);
    setEditingId(row.id);
    setForm({
      statement: row.statement,
      explanation: row.explanation,
      difficulty: row.difficulty,
      alternatives: row.alternatives,
      status: row.status,
    });
    setMode("update");
  }

  function closeForm() {
    if (busy) return;
    setMode("list");
    setEditingId(null);
  }

  const handleQuestionTypeAlternatives = (type: string) => {
    if (type === "MULTIPLE_CHOICE") {
      return (
        <div className="mb-4 grid gap-2.5 rounded-lg border border-(--sidebar-border) bg-(--color-content) p-3.5">
          <button
            onClick={() => {
              setForm((current) => ({
                ...current,
                alternatives: [
                  ...current.alternatives,
                  {
                    text: "",
                    order: current.alternatives.length,
                    isCorrect: false,
                  },
                ],
              }));
            }}
          >
            Adicionar Alternativa
          </button>
          <div className="grid gap-2.5 rounded-lg border border-(--sidebar-border) bg-(--color-content) p-3.5">
            {form?.alternatives?.map((alternative, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <p className="m-0 text-xs font-normal text-(--font-muted)">
                  Alternativa {index + 1}
                </p>
                <input
                  type="text"
                  value={alternative.text}
                  onChange={(e) => {
                    const newAlternatives = [...form.alternatives];
                    newAlternatives[index].text = e.target.value;
                    setForm((current) => ({
                      ...current,
                      alternatives: newAlternatives,
                    }));
                  }}
                  placeholder={`Alternativa ${index + 1}`}
                />
                <input
                  type="checkbox"
                  checked={alternative.isCorrect || false}
                  onChange={(e) => {
                    const newAlternatives = [...form.alternatives];
                    newAlternatives[index].isCorrect = e.target.checked;
                    setForm((current) => ({
                      ...current,
                      alternatives: newAlternatives,
                    }));
                  }}
                />{" "}
                Correta
                <button
                  onClick={() => {
                    setForm((current) => ({
                      ...current,
                      alternatives: current.alternatives.filter(
                        (_, i) => i !== index,
                      ),
                    }));
                  }}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-4 text-sm text-(--font-muted)">
        Tipo de questão não suportado.
      </div>
    );
  };

  async function submitForm() {
    if (!accessToken) {
      setError("Sessão inválida.");
      return;
    }

    setError(null);
    setBusy(true);

    try {
      if (mode === "create") {
        const created = await apiClient.questions.create(accessToken, {
          statement: form.statement.trim(),
          explanation: form.explanation.trim() || undefined,
          status: form.status,
          difficulty: form.difficulty,
          alternatives: form.alternatives.map((alt, index) => ({
            text: alt.text,
            order: alt.order ?? index,
            isCorrect: alt.isCorrect ?? false,
          })),
        });
        setRows((current) => [toRow(created), ...current]);
      } else if (mode === "update" && editingId) {
        const updated = await apiClient.questions.update(
          accessToken,
          editingId,
          {
            statement: form.statement.trim(),
            explanation: form.explanation.trim() || undefined,
            status: form.status,
            difficulty: form.difficulty,
            alternatives: form.alternatives.map((alt, index) => ({
              id: alt.id,
              text: alt.text,
              order: alt.order ?? index,
              isCorrect: alt.isCorrect ?? false,
            })),
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
          : "Erro ao salvar questão.",
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

    if (!window.confirm("Excluir esta questão?")) return;

    setBusy(true);
    setError(null);
    try {
      await apiClient.questions.delete(accessToken, id);
      setRows((current) => current.filter((row) => row.id !== id));
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Erro ao excluir questão.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScreenTransition>
      <section
        className="mx-auto w-full max-w-280"
        aria-label="Cadastro de questões"
      >
        {mode === "list" ? (
          <>
            <div className="mb-8 flex items-start justify-between gap-6 max-sm:mb-6 max-sm:flex-col">
              <div>
                <h1 className="m-0 text-[28px] font-bold tracking-[-.035em] text-foreground">
                  Questões
                </h1>
                <p className="mt-2 mb-0 text-sm text-(--font-muted)">
                  Gerencie os cadastros de questões.
                </p>
              </div>
              <button
                className="min-h-10.5 whitespace-nowrap rounded-lg bg-tone-1 px-4 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(143,33,237,.22)] hover:-translate-y-px hover:bg-[#7e18d4]"
                onClick={openCreate}
                disabled={busy || isLoading}
              >
                + Cadastrar Questão
              </button>
            </div>

            {error && <p className="mb-4 text-sm text-[#d85a6b]">{error}</p>}

            <div className="mb-3.5 grid max-w-90 gap-1.75 rounded-[9px] border border-(--sidebar-border) bg-(--theme-button) p-3.5">
              <label
                className="text-xs font-semibold text-(--font-muted)"
                htmlFor="question-search"
              >
                Buscar
              </label>
              <input
                id="question-search"
                className="min-h-9.25 w-full rounded-md border border-(--sidebar-border) bg-(--color-content) px-2.5 text-[13px] text-foreground outline-none"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar questões"
              />
            </div>

            <div className="overflow-x-auto rounded-[11px] border border-(--sidebar-border) bg-(--color-sidebar)">
              <table className="w-full min-w-170 border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)">
                      Enunciado
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
                        {row.statement}
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
                    ? "Cadastrar Questão"
                    : "Atualizar Questão"}
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
                htmlFor="question-statement"
              >
                Enunciado
                <input
                  id="question-statement"
                  className="min-h-11 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground"
                  value={form.statement}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      statement: event.target.value,
                    }))
                  }
                  required
                  disabled={busy}
                />
              </label>

              <label
                className="grid gap-1.5 text-sm font-semibold text-foreground"
                htmlFor="question-type"
              >
                Tipo de questão
                <select
                  id="question-type"
                  className="min-h-11 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground"
                  value={form.alternatives.length > 0 ? "MULTIPLE_CHOICE" : ""}
                  disabled
                >
                  <option value="MULTIPLE_CHOICE">Alternativas</option>
                </select>
              </label>

              <label
                className="grid gap-1.5 text-sm font-semibold text-foreground"
                htmlFor="question-difficulty"
              >
                Dificuldade
                <p className="m-0 text-xs font-normal text-(--font-muted)">
                  <select
                    id="question-difficulty"
                    className="min-h-11 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground"
                    value={form.difficulty}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        difficulty: event.target.value as any,
                      }))
                    }
                    disabled={busy}
                  >
                    <option value="EASY">Fácil</option>
                    <option value="MEDIUM">Média</option>
                    <option value="HARD">Difícil</option>
                  </select>
                </p>
              </label>

              <label
                className="grid gap-1.5 text-sm font-semibold text-foreground"
                htmlFor="question-alternatives"
              >
                Alternativas
                {handleQuestionTypeAlternatives("MULTIPLE_CHOICE")}
              </label>

              <label
                className="grid gap-1.5 text-sm font-semibold text-foreground"
                htmlFor="question-explanation"
              >
                Explicação
                <textarea
                  id="question-explanation"
                  className="min-h-24 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 py-2 text-sm text-foreground"
                  value={form.explanation}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      explanation: event.target.value,
                    }))
                  }
                  disabled={busy}
                />
              </label>

              <label
                className="grid gap-1.5 text-sm font-semibold text-foreground"
                htmlFor="question-status"
              >
                Status
                <select
                  id="question-status"
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
