import { CatalogTable } from "@/components/catalog/CatalogTable";

export default function MateriasPage() {
  return <CatalogTable entityName="Matéria" entityNamePlural="Matérias" detailLabel="Área" rows={[
    { id: "materia-1", name: "Direito Constitucional", detail: "Direito", status: "Ativo" },
    { id: "materia-2", name: "Língua Portuguesa", detail: "Conhecimentos básicos", status: "Ativo" },
  ]} />;
}
