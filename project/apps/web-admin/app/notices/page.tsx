"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  apiClient,
  type RecordStatus,
  statusToLabel,
  type NoticeResource,
} from "@/lib/api";

type NoticeRow = {
  id: string;
  name: string;
  detail: string;
  status: string;
  title: string;
  message: string;
  recordStatus: RecordStatus;
};

const statusOptions = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PUBLISHED", label: "Ativo" },
  { value: "ARCHIVED", label: "Arquivado" },
];

function toRow(notice: NoticeResource): NoticeRow {
  return {
    id: notice.id,
    name: notice.title,
    detail: notice.message,
    status: statusToLabel(notice.status),
    title: notice.title,
    message: notice.message,
    recordStatus: notice.status,
  };
}

export default function EditaisPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<NoticeRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    void apiClient.notices.list(accessToken)
      .then((notices) => setRows(notices.map(toRow)))
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  return (
    <ScreenTransition>
      <CatalogTable
        entityName="Edital"
        entityNamePlural="Editais"
        detailLabel="Mensagem"
        rows={rows}
        isLoading={isLoading}
        formFields={[
          { name: "title", label: "Título", required: true, placeholder: "Ex.: Edital ENEM 2026" },
          { name: "message", label: "Mensagem", type: "textarea", placeholder: "Conteúdo do edital" },
          { name: "status", label: "Status", type: "select", required: true, options: statusOptions },
        ]}
        getCreateInitialValues={() => ({ title: "", message: "", status: "DRAFT" })}
        getUpdateInitialValues={(row) => ({
          title: row.title,
          message: row.message,
          status: row.recordStatus,
        })}
        onCreate={async (values) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const created = await apiClient.notices.create(accessToken, {
            title: values.title.trim(),
            message: values.message.trim() || undefined,
            status: values.status as RecordStatus,
          });
          return toRow(created);
        }}
        onUpdate={async (row, values) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const updated = await apiClient.notices.update(accessToken, row.id, {
            title: values.title.trim(),
            message: values.message.trim() || undefined,
            status: values.status as RecordStatus,
          });
          return toRow(updated);
        }}
        onDelete={async (ids) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          await Promise.all(ids.map((id) => apiClient.notices.delete(accessToken, id)));
          setRows((current) => current.filter((row) => !ids.includes(row.id)));
        }}
      />
    </ScreenTransition>
  );
}
