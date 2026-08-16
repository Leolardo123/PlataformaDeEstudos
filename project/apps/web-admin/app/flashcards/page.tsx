"use client";

import { CatalogTable } from "@/components/catalog/CatalogTable";
import ScreenTransition from "@/components/themeTransition/ScreenTransition";

const flashcardsMock = [
  { id: "flashcard-1", name: "Controle de constitucionalidade", detail: "Direitos e garantias fundamentais", status: "Ativo" },
  { id: "flashcard-2", name: "Ideia principal", detail: "Interpretação de textos", status: "Rascunho" },
];

export default function FlashcardsPage() {
  return (
    <ScreenTransition>
      <CatalogTable entityName="Flashcard" entityNamePlural="Flashcards" detailLabel="Tópico" rows={flashcardsMock} />
    </ScreenTransition>
  );
}
