"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  createNotice,
  deleteNotice,
  listNotices,
  statusToLabel,
  updateNotice,
  type NoticeResource,
} from "@/lib/api";

function toRow(notice: NoticeResource) {
  return {
    id: notice.id,
    name: notice.title,
    detail: notice.message,
    status: statusToLabel(notice.status),
  };
}

export default function EditaisPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<Array<{ id: string; name: string; detail: string; status: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    setIsLoading(true);
    void listNotices(accessToken)
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
        onCreate={async (name) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const created = await createNotice(accessToken, { title: name });
          return toRow(created);
        }}
        onUpdate={async (row, name) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const updated = await updateNotice(accessToken, row.id, { title: name });
          return toRow(updated);
        }}
        onDelete={async (ids) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          await Promise.all(ids.map((id) => deleteNotice(accessToken, id)));
          setRows((current) => current.filter((row) => !ids.includes(row.id)));
        }}
      />
    </ScreenTransition>
  );
}
