"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  apiClient,
  type RecordStatus,
  statusToLabel,
  type QuestionResource,
  type TopicResource,
} from "@/lib/api";

type QuestionRow = {
  id: string;
  name: string;
  detail: string;
  status: string;
  statement: string;
  explanation: string;
  topicId: string;
  recordStatus: RecordStatus;
};

const statusOptions = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PUBLISHED", label: "Ativo" },
  { value: "ARCHIVED", label: "Arquivado" },
];

function toRow(question: QuestionResource): QuestionRow {
  const firstTopic = question.topics[0]?.topic;

  return {
    id: question.id,
    name: question.statement,
    detail: firstTopic?.name ?? "Sem tópico",
    status: statusToLabel(question.status),
    statement: question.statement,
    explanation: question.explanation ?? "",
    topicId: firstTopic?.id ?? "",
    recordStatus: question.status,
  };
}

export default function QuestoesPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<QuestionRow[]>([]);
  const [topics, setTopics] = useState<TopicResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const topicOptions = topics.map((topic) => ({
    value: topic.id,
    label: topic.name,
  }));

  useEffect(() => {
    if (!accessToken) return;

    setIsLoading(true);
    void Promise.all([apiClient.questions.list(accessToken), apiClient.topics.list(accessToken)])
      .then(([questions, topicList]) => {
        setRows(questions.map(toRow));
        setTopics(topicList);
      })
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  return (
    <ScreenTransition>
      <CatalogTable
        entityName="Questão"
        entityNamePlural="Questões"
        detailLabel="Tópico"
        rows={rows}
        isLoading={isLoading}
        formFields={[
          { name: "statement", label: "Enunciado", required: true, placeholder: "Ex.: Qual é o resultado de..." },
          { name: "explanation", label: "Explicação", type: "textarea", placeholder: "Comentário da questão" },
          { name: "status", label: "Status", type: "select", required: true, options: statusOptions },
          { name: "topicId", label: "Tópico", type: "select", options: topicOptions },
        ]}
        getCreateInitialValues={() => ({
          statement: "",
          explanation: "",
          status: "DRAFT",
          topicId: topics[0]?.id ?? "",
        })}
        getUpdateInitialValues={(row) => ({
          statement: row.statement,
          explanation: row.explanation,
          status: row.recordStatus,
          topicId: row.topicId,
        })}
        onCreate={async (values) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const created = await apiClient.questions.create(accessToken, {
            statement: values.statement.trim(),
            explanation: values.explanation.trim() || undefined,
            status: values.status as RecordStatus,
            topicIds: values.topicId ? [values.topicId] : undefined,
          });
          return toRow(created);
        }}
        onUpdate={async (row, values) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const updated = await apiClient.questions.update(accessToken, row.id, {
            statement: values.statement.trim(),
            explanation: values.explanation.trim() || undefined,
            status: values.status as RecordStatus,
            topicIds: values.topicId ? [values.topicId] : undefined,
          });
          return toRow(updated);
        }}
        onDelete={async (ids) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          await Promise.all(ids.map((id) => apiClient.questions.delete(accessToken, id)));
          setRows((current) => current.filter((row) => !ids.includes(row.id)));
        }}
      />
    </ScreenTransition>
  );
}
