"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  apiClient,
  statusToLabel,
  type FlashcardResource,
  type TopicResource,
} from "@/lib/api";

function toRow(flashcard: FlashcardResource) {
  return {
    id: flashcard.id,
    name: flashcard.front,
    detail: flashcard.topic?.name ?? "Sem tópico",
    status: statusToLabel(flashcard.status),
  };
}

export default function FlashcardsPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<Array<{ id: string; name: string; detail: string; status: string }>>([]);
  const [topics, setTopics] = useState<TopicResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    setIsLoading(true);
    void Promise.all([apiClient.flashcards.list(accessToken), apiClient.topics.list(accessToken)])
      .then(([flashcards, topicList]) => {
        setRows(flashcards.map(toRow));
        setTopics(topicList);
      })
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  return (
    <ScreenTransition>
      <CatalogTable
        entityName="Flashcard"
        entityNamePlural="Flashcards"
        detailLabel="Tópico"
        rows={rows}
        isLoading={isLoading}
        onCreate={async (name) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const topicId = topics[0]?.id;
          if (!topicId) {
            throw new Error("Cadastre um tópico antes de criar flashcards.");
          }
          const created = await apiClient.flashcards.create(accessToken, { front: name, topicId });
          return toRow(created);
        }}
        onUpdate={async (row, name) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const updated = await apiClient.flashcards.update(accessToken, row.id, { front: name });
          return toRow(updated);
        }}
        onDelete={async (ids) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          await Promise.all(ids.map((id) => apiClient.flashcards.delete(accessToken, id)));
          setRows((current) => current.filter((row) => !ids.includes(row.id)));
        }}
      />
    </ScreenTransition>
  );
}
