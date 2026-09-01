"use client";

import { useEffect, useState } from "react";
import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";
import { useAuth } from "@/hooks/useAuth";
import {
  createSubject,
  deleteSubject,
  listSubjects,
  statusToLabel,
  updateSubject,
  type SubjectResource,
} from "@/lib/api";

function toRow(subject: SubjectResource) {
  return {
    id: subject.id,
    name: subject.name,
    detail: subject.description ?? "Sem descrição",
    status: statusToLabel(subject.status),
  };
}

export default function MateriasPage() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<Array<{ id: string; name: string; detail: string; status: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    setIsLoading(true);
    void listSubjects(accessToken)
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
        onCreate={async (name) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const created = await createSubject(accessToken, { name });
          return toRow(created);
        }}
        onUpdate={async (row, name) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          const updated = await updateSubject(accessToken, row.id, { name });
          return toRow(updated);
        }}
        onDelete={async (ids) => {
          if (!accessToken) throw new Error("Sessão inválida.");
          await Promise.all(ids.map((id) => deleteSubject(accessToken, id)));
          setRows((current) => current.filter((row) => !ids.includes(row.id)));
        }}
      />
    </ScreenTransition>
  );
}
