"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  apiClient,
  type RecordStatus,
  statusToLabel,
  type FlashcardResource,
  type TopicResource,
} from "@/lib/api";

type FlashcardRow = {
  id: string;
  name: string;
  detail: string;
  status: string;
  front: string;
  back: string;
  order: string;
  topicId: string;
  recordStatus: RecordStatus;
};

const statusOptions = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PUBLISHED", label: "Ativo" },
  { value: "ARCHIVED", label: "Arquivado" },
];

function toRow(flashcard: FlashcardResource): FlashcardRow {
  return {
    id: flashcard.id,
    name: flashcard.front,
    detail: flashcard.topic?.name ?? "Sem tópico",
    status: statusToLabel(flashcard.status),
    front: flashcard.front,
    back: flashcard.back ?? "",
    order: flashcard.order != null ? String(flashcard.order) : "",
    topicId: flashcard.topicId,
    recordStatus: flashcard.status,
  };
}

export default function FlashcardsPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<FlashcardRow[]>([]);
  const [topics, setTopics] = useState<TopicResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const topicOptions = topics.map((topic) => ({
    value: topic.id,
    label: topic.name,
  }));

  useEffect(() => {
    if (!accessToken) return;

    (async () => {
      setIsLoading(true);
      try {
        const [flashcards, topicList] = await Promise.all([
          apiClient.flashcards.list(accessToken),
          apiClient.topics.list(accessToken),
        ]);
        setRows(flashcards.map(toRow));
        setTopics(topicList);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [accessToken]);

  return (
    <ScreenTransition>
      <CatalogTable
        entityName="Flashcard"
        entityNamePlural="Flashcards"
        detailLabel="Tópico"
        rows={rows}
        isLoading={isLoading}
        formFields={[
          {
            name: "front",
            label: "Frente",
            required: true,
            placeholder: "Pergunta ou conceito",
          },
          {
            name: "back",
            label: "Verso",
            type: "textarea",
            placeholder: "Resposta",
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            required: true,
            options: statusOptions,
          },
          {
            name: "topicId",
            label: "Tópico",
            type: "select",
            required: true,
            options: topicOptions,
          },
        ]}
        getCreateInitialValues={() => ({
          front: "",
          back: "",
          order: "",
          status: "DRAFT",
          topicId: topics[0]?.id ?? "",
        })}
        getUpdateInitialValues={(row) => ({
          front: row.front,
          back: row.back,
          order: row.order,
          status: row.recordStatus,
          topicId: row.topicId,
        })}
        onCreate={async (values) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const topicId = values.topicId;
          if (!topicId) {
            throw new Error("Cadastre um tópico antes de criar flashcards.");
          }
          const created = await apiClient.flashcards.create(accessToken, {
            front: values.front.trim(),
            back: values.back.trim() || undefined,
            order: values.order.trim() ? Number(values.order) : undefined,
            status: values.status as RecordStatus,
            topicId,
          });
          return toRow(created);
        }}
        onUpdate={async (row, values) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const updated = await apiClient.flashcards.update(
            accessToken,
            row.id,
            {
              front: values.front.trim(),
              back: values.back.trim() || undefined,
              order: values.order.trim() ? Number(values.order) : undefined,
              status: values.status as RecordStatus,
              topicId: values.topicId,
            },
          );
          return toRow(updated);
        }}
        onDelete={async (ids) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          await Promise.all(
            ids.map((id) => apiClient.flashcards.delete(accessToken, id)),
          );
          setRows((current) => current.filter((row) => !ids.includes(row.id)));
        }}
      />
    </ScreenTransition>
  );
}
