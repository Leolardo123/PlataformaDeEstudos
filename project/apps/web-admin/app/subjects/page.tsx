"use client";

import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";

const subjectsMock = [
  { id: "materia-1", name: "Direito Constitucional", detail: "Direito", status: "Ativo" },
  { id: "materia-2", name: "Língua Portuguesa", detail: "Conhecimentos básicos", status: "Ativo" },
];

export default function MateriasPage() {
  return (
    <ScreenTransition>
      <CatalogTable entityName="Matéria" entityNamePlural="Matérias" detailLabel="Área" rows={subjectsMock} />
    </ScreenTransition>
  );
}
