export type RecordStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export function statusToLabel(status: RecordStatus) {
  if (status === 'PUBLISHED') return 'Ativo';
  if (status === 'ARCHIVED') return 'Arquivado';
  return 'Rascunho';
}
