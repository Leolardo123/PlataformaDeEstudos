"use client";

import { useEffect, useMemo, useState } from "react";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  apiClient,
  type RecordStatus,
  statusToLabel,
  type SubjectResource,
  type TopicResource,
} from "@/lib/api";

type TopicRow = {
  id: string;
  name: string;
  description: string;
  detail: string;
  contentRichText: string;
  contentAssets: string;
  subjectId: string;
  status: RecordStatus;
};

type FormState = {
  name: string;
  description: string;
  contentRichText: string;
  contentAssets: string;
  subjectId: string;
  status: RecordStatus;
};

const statusOptions: Array<{ value: RecordStatus; label: string }> = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PUBLISHED", label: "Ativo" },
  { value: "ARCHIVED", label: "Arquivado" },
];

function toRow(topic: TopicResource): TopicRow {
  const notices = topic.subject?.notices ?? [];
  const noticeTitles = notices.map((entry) => entry.notice.title).join(", ");

  return {
    id: topic.id,
    name: topic.name,
    description: topic.description ?? "",
    detail: [topic.subject?.name ?? "Sem matéria", noticeTitles]
      .filter(Boolean)
      .join(" • "),
    contentRichText: topic.contentRichText ?? "",
    contentAssets: [
      ...(topic.contentPdfUrls ?? []).map((url) => `PDF|${url}`),
      ...(topic.contentVideoUrls ?? []).map((url) => `VIDEO|${url}`),
      ...(topic.contentLinkUrls ?? []).map((url) => `LINK|${url}`),
    ].join("\n"),
    subjectId: topic.subjectId,
    status: topic.status,
  };
}

function parseContentAssets(rawValue: string) {
  const emptyResult = {
    pdfUrls: [] as string[],
    videoUrls: [] as string[],
    linkUrls: [] as string[],
  };

  return rawValue
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce((acc, entry) => {
      const [possibleType, ...urlParts] = entry.split("|");
      const type = (possibleType || "LINK").trim().toUpperCase();
      const url = urlParts.length > 0 ? urlParts.join("|").trim() : "";

      if (!url) {
        return acc;
      }

      if (type === "PDF") {
        acc.pdfUrls.push(url);
        return acc;
      }

      if (type === "VIDEO") {
        acc.videoUrls.push(url);
        return acc;
      }

      acc.linkUrls.push(url);
      return acc;
    }, emptyResult);
}

function parseTypedUrlList(rawValue: string, defaultType: string) {
  return rawValue.split("\n").map((entry) => {
    const [possibleType, ...urlParts] = entry.split("|");
    if (urlParts.length === 0) {
      return { type: defaultType, url: possibleType ?? "" };
    }

    return {
      type: (possibleType || defaultType).trim() || defaultType,
      url: urlParts.join("|"),
    };
  });
}

function serializeTypedUrlList(
  values: Array<{ type: string; url: string }>,
  defaultType: string,
) {
  return values
    .map(({ type, url }) => `${type || defaultType}|${url}`)
    .join("\n");
}

function getYoutubeEmbedUrl(url: string) {
  const standardMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{6,})/,
  );

  if (!standardMatch?.[1]) {
    return null;
  }

  return `https://www.youtube.com/embed/${standardMatch[1]}`;
}

function isPdfUrl(url: string) {
  return /\.pdf($|\?)/i.test(url);
}

function isImageUrl(url: string) {
  return /\.(png|jpe?g|gif|webp|svg)($|\?)/i.test(url);
}

function getStatusClass(status: RecordStatus) {
  return status === "PUBLISHED"
    ? "inline-flex rounded-full bg-[rgba(42,160,103,.13)] px-2 py-1 text-[11px] font-bold text-[#268053]"
    : "inline-flex rounded-full bg-[rgba(193,143,35,.14)] px-2 py-1 text-[11px] font-bold text-[#977123]";
}

export default function TopicosPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<TopicRow[]>([]);
  const [subjects, setSubjects] = useState<SubjectResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"list" | "create" | "update">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Dados Gerais" | "Conteúdo">(
    "Dados Gerais",
  );
  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    contentRichText: "",
    contentAssets: "",
    subjectId: "",
    status: "DRAFT",
  });

  useEffect(() => {
    if (!accessToken) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    void Promise.all([
      apiClient.topics.list(accessToken),
      apiClient.subjects.list(accessToken),
    ])
      .then(([topics, subjectsList]) => {
        setRows(topics.map(toRow));
        setSubjects(subjectsList);
      })
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  const visibleRows = useMemo(() => {
    const normalized = search.toLocaleLowerCase();
    return rows.filter((row) =>
      `${row.name} ${row.description} ${row.detail}`
        .toLocaleLowerCase()
        .includes(normalized),
    );
  }, [rows, search]);

  const typeOptions = [
    { value: "PDF", label: "PDF" },
    { value: "VIDEO", label: "Vídeo" },
    { value: "LINK", label: "Link" },
  ];
  const defaultType = typeOptions[0].value;
  const typedUrls = parseTypedUrlList(form.contentAssets, defaultType);
  const visibleTypedUrls = typedUrls.length
    ? typedUrls
    : [{ type: defaultType, url: "" }];

  function openCreate() {
    setError(null);
    setEditingId(null);
    setActiveTab("Dados Gerais");
    setForm({
      name: "",
      description: "",
      contentRichText: "",
      contentAssets: "",
      subjectId: subjects[0]?.id ?? "",
      status: "DRAFT",
    });
    setMode("create");
  }

  function openUpdate(row: TopicRow) {
    setError(null);
    setEditingId(row.id);
    setActiveTab("Dados Gerais");
    setForm({
      name: row.name,
      description: row.description,
      contentRichText: row.contentRichText,
      contentAssets: row.contentAssets,
      subjectId: row.subjectId,
      status: row.status,
    });
    setMode("update");
  }

  function closeForm() {
    if (busy) return;
    setMode("list");
    setEditingId(null);
  }

  function updateTypedUrlList(values: Array<{ type: string; url: string }>) {
    setForm((current) => ({
      ...current,
      contentAssets: serializeTypedUrlList(values, defaultType),
    }));
  }

  function updateTypedUrlType(index: number, value: string) {
    const nextValues = [...visibleTypedUrls];
    nextValues[index] = { ...nextValues[index], type: value };
    updateTypedUrlList(nextValues);
  }

  function updateTypedUrlValue(index: number, value: string) {
    const nextValues = [...visibleTypedUrls];
    nextValues[index] = { ...nextValues[index], url: value };
    updateTypedUrlList(nextValues);
  }

  function addTypedUrlItem() {
    updateTypedUrlList([...visibleTypedUrls, { type: defaultType, url: "" }]);
  }

  function removeTypedUrlItem(index: number) {
    const nextValues = [...visibleTypedUrls];
    nextValues.splice(index, 1);
    updateTypedUrlList(nextValues);
  }

  async function submitForm() {
    if (!accessToken) {
      setError("Sessão inválida.");
      return;
    }

    setError(null);
    setBusy(true);

    try {
      const assets = parseContentAssets(form.contentAssets);

      if (mode === "create") {
        if (!form.subjectId) {
          throw new Error("Cadastre uma matéria antes de criar tópicos.");
        }

        const created = await apiClient.topics.create(accessToken, {
          name: form.name.trim(),
          description: form.description.trim() || undefined,
          contentRichText: form.contentRichText.trim() || undefined,
          contentPdfUrls: assets.pdfUrls,
          contentVideoUrls: assets.videoUrls,
          contentLinkUrls: assets.linkUrls,
          status: form.status,
          subjectId: form.subjectId,
        });
        setRows((current) => [toRow(created), ...current]);
      } else if (mode === "update" && editingId) {
        const updated = await apiClient.topics.update(accessToken, editingId, {
          name: form.name.trim(),
          description: form.description.trim() || undefined,
          contentRichText: form.contentRichText.trim() || undefined,
          contentPdfUrls: assets.pdfUrls,
          contentVideoUrls: assets.videoUrls,
          contentLinkUrls: assets.linkUrls,
          status: form.status,
          subjectId: form.subjectId,
        });
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
          : "Erro ao salvar tópico.",
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

    if (!window.confirm("Excluir este tópico?")) return;

    setBusy(true);
    setError(null);
    try {
      await apiClient.topics.delete(accessToken, id);
      setRows((current) => current.filter((row) => row.id !== id));
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Erro ao excluir tópico.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScreenTransition>
      <section
        className="mx-auto w-full max-w-280"
        aria-label="Cadastro de tópicos"
      >
        {mode === "list" ? (
          <>
            <div className="mb-8 flex items-start justify-between gap-6 max-sm:mb-6 max-sm:flex-col">
              <div>
                <h1 className="m-0 text-[28px] font-bold tracking-[-.035em] text-foreground">
                  Tópicos
                </h1>
                <p className="mt-2 mb-0 text-sm text-(--font-muted)">
                  Gerencie os cadastros de tópicos.
                </p>
              </div>
              <button
                className="min-h-10.5 whitespace-nowrap rounded-lg bg-tone-1 px-4 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(143,33,237,.22)] hover:-translate-y-px hover:bg-[#7e18d4]"
                onClick={openCreate}
                disabled={busy || isLoading}
              >
                + Cadastrar Tópico
              </button>
            </div>

            {error && <p className="mb-4 text-sm text-[#d85a6b]">{error}</p>}

            <div className="mb-3.5 grid max-w-90 gap-1.75 rounded-[9px] border border-(--sidebar-border) bg-(--theme-button) p-3.5">
              <label
                className="text-xs font-semibold text-(--font-muted)"
                htmlFor="topic-search"
              >
                Buscar
              </label>
              <input
                id="topic-search"
                className="min-h-9.25 w-full rounded-md border border-(--sidebar-border) bg-(--color-content) px-2.5 text-[13px] text-foreground outline-none"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar tópicos"
              />
            </div>

            <div className="overflow-x-auto rounded-[11px] border border-(--sidebar-border) bg-(--color-sidebar)">
              <table className="w-full min-w-170 border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)">
                      Nome
                    </th>
                    <th className="border-b border-(--sidebar-border) bg-(--theme-button) px-4 py-3 text-[11px] font-bold uppercase tracking-[.06em] text-(--font-muted)">
                      Matéria / Editais
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
                        {row.name}
                      </td>
                      <td className="border-b border-(--sidebar-border) px-4 py-4 text-[13px] text-foreground">
                        {row.detail}
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
                  {mode === "create" ? "Cadastrar Tópico" : "Atualizar Tópico"}
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

            <div className="mb-5 flex flex-wrap gap-2">
              <button
                type="button"
                className={`min-h-9 rounded-lg border px-3 text-sm font-semibold ${activeTab === "Dados Gerais" ? "border-tone-1 bg-tone-1 text-white" : "border-(--sidebar-border) bg-(--theme-button) text-foreground"}`}
                onClick={() => setActiveTab("Dados Gerais")}
                disabled={busy}
              >
                Dados Gerais
              </button>
              <button
                type="button"
                className={`min-h-9 rounded-lg border px-3 text-sm font-semibold ${activeTab === "Conteúdo" ? "border-tone-1 bg-tone-1 text-white" : "border-(--sidebar-border) bg-(--theme-button) text-foreground"}`}
                onClick={() => setActiveTab("Conteúdo")}
                disabled={busy}
              >
                Conteúdo
              </button>
            </div>

            {activeTab === "Dados Gerais" ? (
              <div className="grid gap-4">
                <label
                  className="grid gap-1.5 text-sm font-semibold text-foreground"
                  htmlFor="topic-name"
                >
                  Nome
                  <input
                    id="topic-name"
                    className="min-h-11 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    required
                    disabled={busy}
                  />
                </label>

                <label
                  className="grid gap-1.5 text-sm font-semibold text-foreground"
                  htmlFor="topic-description"
                >
                  Descrição
                  <textarea
                    id="topic-description"
                    className="min-h-24 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 py-2 text-sm text-foreground"
                    value={form.description}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    disabled={busy}
                  />
                </label>

                <label
                  className="grid gap-1.5 text-sm font-semibold text-foreground"
                  htmlFor="topic-subject"
                >
                  Matéria
                  <select
                    id="topic-subject"
                    className="min-h-11 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground"
                    value={form.subjectId}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        subjectId: event.target.value,
                      }))
                    }
                    disabled={busy}
                  >
                    <option value="">Selecione...</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label
                  className="grid gap-1.5 text-sm font-semibold text-foreground"
                  htmlFor="topic-status"
                >
                  Status
                  <select
                    id="topic-status"
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
            ) : (
              <div className="grid gap-4">
                <label
                  className="grid gap-1.5 text-sm font-semibold text-foreground"
                  htmlFor="topic-richtext"
                >
                  Conteúdo Rich-Text
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "B", command: "bold" },
                      { label: "I", command: "italic" },
                      { label: "S", command: "underline" },
                      { label: "• Lista", command: "insertUnorderedList" },
                      { label: "1. Lista", command: "insertOrderedList" },
                    ].map((action) => (
                      <button
                        key={action.command}
                        type="button"
                        className="min-h-8 rounded-md border border-(--sidebar-border) bg-(--theme-button) px-2.5 text-xs font-semibold text-foreground"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          document.execCommand(action.command);
                        }}
                        disabled={busy}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                  <div
                    id="topic-richtext"
                    className="min-h-48 w-full overflow-auto rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 py-2 text-sm text-foreground outline-none"
                    contentEditable={!busy}
                    suppressContentEditableWarning
                    onInput={(event) =>
                      setForm((current) => ({
                        ...current,
                        contentRichText: event.currentTarget.innerHTML,
                      }))
                    }
                    dangerouslySetInnerHTML={{ __html: form.contentRichText }}
                  />
                </label>

                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Anexos e Links
                  </label>
                  <div className="grid gap-2">
                    {visibleTypedUrls.map((item, index) => {
                      const trimmedUrl = item.url.trim();
                      const youtubeEmbed =
                        item.type === "VIDEO" && trimmedUrl
                          ? getYoutubeEmbedUrl(trimmedUrl)
                          : null;

                      return (
                        <div
                          className="grid gap-2 rounded-lg border border-(--sidebar-border) bg-(--theme-button) p-2.5"
                          key={`content-item-${index}`}
                        >
                          <div className="flex gap-2 max-sm:flex-col">
                            <select
                              className="min-h-10 min-w-34 rounded-lg border border-(--sidebar-border) bg-(--color-content) px-2.5 text-sm text-foreground"
                              value={item.type}
                              onChange={(event) =>
                                updateTypedUrlType(index, event.target.value)
                              }
                              disabled={busy}
                            >
                              {typeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <input
                              className="min-h-10 w-full rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-foreground"
                              type="url"
                              value={item.url}
                              onChange={(event) =>
                                updateTypedUrlValue(index, event.target.value)
                              }
                              placeholder="https://..."
                              disabled={busy}
                            />
                            <button
                              type="button"
                              className="min-h-10 rounded-lg border border-[color-mix(in_srgb,#d85a6b_27%,transparent)] bg-[color-mix(in_srgb,#d85a6b_10%,transparent)] px-2.5 text-xs font-semibold text-[#d85a6b]"
                              onClick={() => removeTypedUrlItem(index)}
                              disabled={busy || visibleTypedUrls.length <= 1}
                            >
                              Remover
                            </button>
                          </div>

                          {trimmedUrl && (
                            <div className="grid gap-2 rounded-md border border-(--sidebar-border) bg-(--color-content) p-2.5">
                              <a
                                className="truncate text-sm font-semibold text-[#a955ed] hover:underline"
                                href={trimmedUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {trimmedUrl}
                              </a>
                              {item.type === "VIDEO" && youtubeEmbed ? (
                                <iframe
                                  className="aspect-video w-full rounded-md"
                                  src={youtubeEmbed}
                                  title={`Prévia de vídeo ${index + 1}`}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                />
                              ) : item.type === "PDF" ||
                                isPdfUrl(trimmedUrl) ? (
                                <iframe
                                  className="h-52 w-full rounded-md"
                                  src={trimmedUrl}
                                  title={`Prévia de PDF ${index + 1}`}
                                />
                              ) : isImageUrl(trimmedUrl) ? (
                                <iframe
                                  className="h-52 w-full rounded-md"
                                  src={trimmedUrl}
                                  title={`Prévia de imagem ${index + 1}`}
                                />
                              ) : (
                                <p className="m-0 text-xs text-(--font-muted)">
                                  Sem preview incorporado para este formato. O
                                  link segue clicável.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className="justify-self-start rounded-md border border-(--sidebar-border) bg-(--theme-button) px-3 py-2 text-xs font-semibold text-foreground"
                    onClick={addTypedUrlItem}
                    disabled={busy}
                  >
                    + Adicionar item
                  </button>
                </div>
              </div>
            )}

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
