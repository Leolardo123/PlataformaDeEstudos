"use client";

import { CrudTable, type TableColumn } from "@/components/table/CrudTable";

type CatalogRow = {
  id: string;
  name: string;
  detail: string;
  status: "Ativo" | "Rascunho";
};

type CatalogTableProps = {
  entityName: string;
  entityNamePlural: string;
  detailLabel: string;
  rows: CatalogRow[];
};

export function CatalogTable({ entityName, entityNamePlural, detailLabel, rows }: CatalogTableProps) {
  const columns: TableColumn<CatalogRow>[] = [
    { label: "Nome", render: (row) => <strong>{row.name}</strong> },
    { label: detailLabel, render: (row) => row.detail },
    { label: "Status", render: (row) => <span className={`status-badge ${row.status === "Ativo" ? "active" : "draft"}`}>{row.status}</span> },
  ];

  return (
    <CrudTable
      entityName={entityName}
      entityNamePlural={entityNamePlural}
      columns={columns}
      data={rows}
      getSearchText={(row) => `${row.name} ${row.detail} ${row.status}`}
      getTitle={(row) => row.name}
      createRecord={(name) => ({ id: crypto.randomUUID(), name, detail: "Não informado", status: "Rascunho" as const })}
      updateRecord={(row, name) => ({ ...row, name })}
    />
  );
}
