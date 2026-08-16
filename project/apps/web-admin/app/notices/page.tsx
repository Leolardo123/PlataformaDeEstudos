import { CatalogTable } from "@/components/catalog/CatalogTable";

export default function EditaisPage() {
  return <CatalogTable entityName="Edital" entityNamePlural="Editais" detailLabel="Instituição" rows={[
    { id: "edital-1", name: "TJ-SP 2026", detail: "Tribunal de Justiça de São Paulo", status: "Ativo" },
    { id: "edital-2", name: "TRF-3 Analista", detail: "Tribunal Regional Federal da 3ª Região", status: "Rascunho" },
  ]} />;
}
