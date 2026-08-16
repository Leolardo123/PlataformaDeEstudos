"use client";

import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";

const mockTopics = [
  { id: "topico-1", name: "Direitos e garantias fundamentais", detail: "Direito Constitucional", status: "Ativo" },
  { id: "topico-2", name: "Interpretação de textos", detail: "Língua Portuguesa", status: "Rascunho" },
];

export default function TopicosPage() {
  return (
    <ScreenTransition>
      <CatalogTable entityName="Tópico" entityNamePlural="Tópicos" detailLabel="Matéria" rows={mockTopics} />
    </ScreenTransition>
  );
}
