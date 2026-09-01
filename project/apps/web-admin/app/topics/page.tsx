"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  createTopic,
  deleteTopic,
  listSubjects,
  listTopics,
  statusToLabel,
  updateTopic,
  type SubjectResource,
  type TopicResource,
} from "@/lib/api";

function toRow(topic: TopicResource) {
  return {
    id: topic.id,
    name: topic.name,
    detail: topic.subject?.name ?? "Sem matéria",
    status: statusToLabel(topic.status),
  };
}

export default function TopicosPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<Array<{ id: string; name: string; detail: string; status: string }>>([]);
  const [subjects, setSubjects] = useState<SubjectResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    setIsLoading(true);
    void Promise.all([listTopics(accessToken), listSubjects(accessToken)])
      .then(([topics, subjectsList]) => {
        setRows(topics.map(toRow));
        setSubjects(subjectsList);
      })
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  return (
    <ScreenTransition>
      <CatalogTable
        entityName="Tópico"
        entityNamePlural="Tópicos"
        detailLabel="Matéria"
        rows={rows}
        isLoading={isLoading}
        onCreate={async (name) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const subjectId = subjects[0]?.id;
          if (!subjectId) {
            throw new Error("Cadastre uma matéria antes de criar tópicos.");
          }
          const created = await createTopic(accessToken, { name, subjectId });
          return toRow(created);
        }}
        onUpdate={async (row, name) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const updated = await updateTopic(accessToken, row.id, { name });
          return toRow(updated);
        }}
        onDelete={async (ids) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          await Promise.all(ids.map((id) => deleteTopic(accessToken, id)));
          setRows((current) => current.filter((row) => !ids.includes(row.id)));
        }}
      />
    </ScreenTransition>
  );
}
