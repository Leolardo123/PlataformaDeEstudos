import { apiRequest } from './core';
import type { RecordStatus } from './status';

export type SubjectResource = {
  id: string;
  name: string;
  description: string | null;
  status: RecordStatus;
};

export type CreateSubjectPayload = {
  name: string;
  description?: string;
  status?: RecordStatus;
};

export type UpdateSubjectPayload = {
  name?: string;
  description?: string;
  status?: RecordStatus;
};

export const subjectsApi = {
  list(accessToken: string) {
    return apiRequest<SubjectResource[]>('/subjects', undefined, accessToken);
  },
  create(accessToken: string, payload: CreateSubjectPayload) {
    return apiRequest<SubjectResource>(
      '/subjects',
      {
        method: 'POST',
        body: JSON.stringify({
          name: payload.name,
          description: payload.description,
          status: payload.status ?? 'DRAFT',
        }),
      },
      accessToken,
    );
  },
  update(accessToken: string, id: string, payload: UpdateSubjectPayload) {
    return apiRequest<SubjectResource>(
      `/subjects/${id}`,
      { method: 'PATCH', body: JSON.stringify(payload) },
      accessToken,
    );
  },
  delete(accessToken: string, id: string) {
    return apiRequest(`/subjects/${id}`, { method: 'DELETE' }, accessToken);
  },
};
