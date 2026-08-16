"use client";

import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";

const questionsMock = [
  { id: "questao-1", name: "Questão 001", detail: "Direitos fundamentais", status: "Ativo" },
  { id: "questao-2", name: "Questão 002", detail: "Interpretação de textos", status: "Rascunho" },
];

export default function QuestoesPage() {
  return (
    <ScreenTransition>
      <CatalogTable entityName="Questão" entityNamePlural="Questões" detailLabel="Assunto" rows={questionsMock} />
    </ScreenTransition>
  );
}
