import { CatalogTable } from "@/components/catalog/CatalogTable";

export default function FlashcardsPage() {
  return <CatalogTable entityName="Flashcard" entityNamePlural="Flashcards" detailLabel="Tópico" rows={[
    { id: "flashcard-1", name: "Controle de constitucionalidade", detail: "Direitos e garantias fundamentais", status: "Ativo" },
    { id: "flashcard-2", name: "Ideia principal", detail: "Interpretação de textos", status: "Rascunho" },
  ]} />;
}
