import { apiRequest } from './core';
import type { RecordStatus } from './status';

export type NoticeResource = {
  id: string;
  title: string;
  message: string;
  status: RecordStatus;
};

export const noticesApi = {
  list(accessToken: string) {
    return apiRequest<NoticeResource[]>('/notices', undefined, accessToken);
  },
  create(accessToken: string, payload: { title: string }) {
    return apiRequest<NoticeResource>(
      '/notices',
      { method: 'POST', body: JSON.stringify({ title: payload.title, status: 'DRAFT' }) },
      accessToken,
    );
  },
  update(accessToken: string, id: string, payload: { title: string }) {
    return apiRequest<NoticeResource>(
      `/notices/${id}`,
      { method: 'PATCH', body: JSON.stringify(payload) },
      accessToken,
    );
  },
  delete(accessToken: string, id: string) {
    return apiRequest(`/notices/${id}`, { method: 'DELETE' }, accessToken);
  },
};
