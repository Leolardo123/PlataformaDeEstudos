import { apiRequest } from './core';
import type { RecordStatus } from './status';

export type NoticeResource = {
  id: string;
  title: string;
  message: string;
  status: RecordStatus;
  subjects?: Array<{ subject: { id: string; name: string } }>;
};

export type CreateNoticePayload = {
  title: string;
  message?: string;
  status?: RecordStatus;
};

export type UpdateNoticePayload = {
  title?: string;
  message?: string;
  status?: RecordStatus;
};

export const noticesApi = {
  list(accessToken: string) {
    return apiRequest<NoticeResource[]>('/notices', undefined, accessToken);
  },
  create(accessToken: string, payload: CreateNoticePayload) {
    return apiRequest<NoticeResource>(
      '/notices',
      {
        method: 'POST',
        body: JSON.stringify({
          title: payload.title,
          message: payload.message,
          status: payload.status ?? 'DRAFT',
        }),
      },
      accessToken,
    );
  },
  update(accessToken: string, id: string, payload: UpdateNoticePayload) {
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
