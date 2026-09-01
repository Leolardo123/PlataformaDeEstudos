"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  createQuestion,
  deleteQuestion,
  listQuestions,
  statusToLabel,
  updateQuestion,
  type QuestionResource,
} from "@/lib/api";

function toRow(question: QuestionResource) {
  return {
    id: question.id,
    name: question.statement,
    detail: question.topics[0]?.topic.name ?? "Sem tópico",
    status: statusToLabel(question.status),
  };
}

export default function QuestoesPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<Array<{ id: string; name: string; detail: string; status: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    setIsLoading(true);
    void listQuestions(accessToken)
      .then((questions) => setRows(questions.map(toRow)))
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
        onCreate={async (name) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const created = await createQuestion(accessToken, { statement: name });
          return toRow(created);
        }}
        onUpdate={async (row, name) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const updated = await updateQuestion(accessToken, row.id, { statement: name });
          return toRow(updated);
        }}
        onDelete={async (ids) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          await Promise.all(ids.map((id) => deleteQuestion(accessToken, id)));
          setRows((current) => current.filter((row) => !ids.includes(row.id)));
        }}
      />
    </ScreenTransition>
  );
}
