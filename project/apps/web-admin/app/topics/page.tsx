"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/catalog/CatalogTable";
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
  detail: string;
  status: string;
  description: string;
  order: string;
  subjectId: string;
  recordStatus: RecordStatus;
};

const statusOptions = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PUBLISHED", label: "Ativo" },
  { value: "ARCHIVED", label: "Arquivado" },
];

function toRow(topic: TopicResource): TopicRow {
  return {
    id: topic.id,
    name: topic.name,
    detail: topic.subject?.name ?? "Sem matéria",
    status: statusToLabel(topic.status),
    description: topic.description ?? "",
    order: topic.order != null ? String(topic.order) : "",
    subjectId: topic.subjectId,
    recordStatus: topic.status,
  };
}

export default function TopicosPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<TopicRow[]>([]);
  const [subjects, setSubjects] = useState<SubjectResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const subjectOptions = subjects.map((subject) => ({
    value: subject.id,
    label: subject.name,
  }));

  useEffect(() => {
    if (!accessToken) return;

    setIsLoading(true);
    void Promise.all([apiClient.topics.list(accessToken), apiClient.subjects.list(accessToken)])
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
        formFields={[
          { name: "name", label: "Nome", required: true, placeholder: "Ex.: Funções" },
          { name: "description", label: "Descrição", type: "textarea", placeholder: "Detalhes do tópico" },
          { name: "order", label: "Ordem", type: "number", placeholder: "0" },
          { name: "status", label: "Status", type: "select", required: true, options: statusOptions },
          { name: "subjectId", label: "Matéria", type: "select", required: true, options: subjectOptions },
        ]}
        getCreateInitialValues={() => ({
          name: "",
          description: "",
          order: "",
          status: "DRAFT",
          subjectId: subjects[0]?.id ?? "",
        })}
        getUpdateInitialValues={(row) => ({
          name: row.name,
          description: row.description,
          order: row.order,
          status: row.recordStatus,
          subjectId: row.subjectId,
        })}
        onCreate={async (values) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const subjectId = values.subjectId;
          if (!subjectId) {
            throw new Error("Cadastre uma matéria antes de criar tópicos.");
          }
          const created = await apiClient.topics.create(accessToken, {
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            order: values.order.trim() ? Number(values.order) : undefined,
            status: values.status as RecordStatus,
            subjectId,
          });
          return toRow(created);
        }}
        onUpdate={async (row, values) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const updated = await apiClient.topics.update(accessToken, row.id, {
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            order: values.order.trim() ? Number(values.order) : undefined,
            status: values.status as RecordStatus,
            subjectId: values.subjectId,
          });
          return toRow(updated);
        }}
        onDelete={async (ids) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          await Promise.all(ids.map((id) => apiClient.topics.delete(accessToken, id)));
          setRows((current) => current.filter((row) => !ids.includes(row.id)));
        }}
      />
    </ScreenTransition>
  );
}
