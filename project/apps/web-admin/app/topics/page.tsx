import { CatalogTable } from "@/components/catalog/CatalogTable";

export default function TopicosPage() {
  return <CatalogTable entityName="Tópico" entityNamePlural="Tópicos" detailLabel="Matéria" rows={[
    { id: "topico-1", name: "Direitos e garantias fundamentais", detail: "Direito Constitucional", status: "Ativo" },
    { id: "topico-2", name: "Interpretação de textos", detail: "Língua Portuguesa", status: "Rascunho" },
  ]} />;
}
