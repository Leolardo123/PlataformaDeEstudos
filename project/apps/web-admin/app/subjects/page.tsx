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
} from "@/lib/api";

type SubjectRow = {
  id: string;
  name: string;
  detail: string;
  status: string;
  description: string;
  recordStatus: RecordStatus;
};

const statusOptions = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PUBLISHED", label: "Ativo" },
  { value: "ARCHIVED", label: "Arquivado" },
];

function toRow(subject: SubjectResource): SubjectRow {
  return {
    id: subject.id,
    name: subject.name,
    detail: subject.description ?? "Sem descrição",
    status: statusToLabel(subject.status),
    description: subject.description ?? "",
    recordStatus: subject.status,
  };
}

export default function MateriasPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<SubjectRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    setIsLoading(true);
    void apiClient.subjects.list(accessToken)
      .then((subjects) => setRows(subjects.map(toRow)))
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  return (
    <ScreenTransition>
      <CatalogTable
        entityName="Matéria"
        entityNamePlural="Matérias"
        detailLabel="Descrição"
        rows={rows}
        isLoading={isLoading}
        formFields={[
          { name: "name", label: "Nome", required: true, placeholder: "Ex.: Matemática" },
          { name: "description", label: "Descrição", type: "textarea", placeholder: "Detalhes da matéria" },
          { name: "status", label: "Status", type: "select", required: true, options: statusOptions },
        ]}
        getCreateInitialValues={() => ({ name: "", description: "", status: "DRAFT" })}
        getUpdateInitialValues={(row) => ({
          name: row.name,
          description: row.description,
          status: row.recordStatus,
        })}
        onCreate={async (values) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const created = await apiClient.subjects.create(accessToken, {
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            status: values.status as RecordStatus,
          });
          return toRow(created);
        }}
        onUpdate={async (row, values) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const updated = await apiClient.subjects.update(accessToken, row.id, {
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            status: values.status as RecordStatus,
          });
          return toRow(updated);
        }}
        onDelete={async (ids) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          await Promise.all(ids.map((id) => apiClient.subjects.delete(accessToken, id)));
          setRows((current) => current.filter((row) => !ids.includes(row.id)));
        }}
      />
    </ScreenTransition>
  );
}
