import { CatalogTable } from "@/components/catalog/CatalogTable";

export default function QuestoesPage() {
  return <CatalogTable entityName="Questão" entityNamePlural="Questões" detailLabel="Assunto" rows={[
    { id: "questao-1", name: "Questão 001", detail: "Direitos fundamentais", status: "Ativo" },
    { id: "questao-2", name: "Questão 002", detail: "Interpretação de textos", status: "Rascunho" },
  ]} />;
}
