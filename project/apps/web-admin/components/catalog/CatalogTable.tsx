"use client";

import {
  CrudTable,
  type CrudFormField,
  type CrudFormValues,
  type TableColumn,
} from "@/components/table/CrudTable";

type CatalogRow = {
  id: string;
  name: string;
  detail: string;
  status: string;
};

type CatalogTableProps<T extends CatalogRow> = {
  entityName: string;
  entityNamePlural: string;
  detailLabel: string;
  rows: T[];
  isLoading?: boolean;
  formFields: CrudFormField[];
  getCreateInitialValues: () => CrudFormValues;
  getUpdateInitialValues: (row: T) => CrudFormValues;
  onCreate: (values: CrudFormValues) => Promise<T>;
  onUpdate: (row: T, values: CrudFormValues) => Promise<T>;
  onDelete: (ids: string[]) => Promise<void>;
};

export function CatalogTable<T extends CatalogRow>({
  entityName,
  entityNamePlural,
  detailLabel,
  rows,
  isLoading,
  formFields,
  getCreateInitialValues,
  getUpdateInitialValues,
  onCreate,
  onUpdate,
  onDelete,
}: CatalogTableProps<T>) {
  const columns: TableColumn<T>[] = [
    {
      label: "Nome",
      render: (row) => <strong className="font-semibold">{row.name}</strong>,
    },
    { label: detailLabel, render: (row) => row.detail },
    {
      label: "Status",
      render: (row) => (
        <span
          className={
            row.status === "Ativo"
              ? "inline-flex rounded-full bg-[rgba(42,160,103,.13)] px-2 py-1 text-[11px] font-bold text-[#268053]"
              : "inline-flex rounded-full bg-[rgba(193,143,35,.14)] px-2 py-1 text-[11px] font-bold text-[#977123]"
          }
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <CrudTable
      entityName={entityName}
      entityNamePlural={entityNamePlural}
      columns={columns}
      data={rows}
      isLoading={isLoading}
      getSearchText={(row) => `${row.name} ${row.detail} ${row.status}`}
      getTitle={(row) => row.name}
      createRecord={onCreate}
      updateRecord={onUpdate}
      formFields={formFields}
      getCreateInitialValues={getCreateInitialValues}
      getUpdateInitialValues={getUpdateInitialValues}
      deleteRecordsApi={onDelete}
    />
  );
}
