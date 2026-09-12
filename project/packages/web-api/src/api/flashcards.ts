import { apiRequest } from './core';
import type { RecordStatus } from './status';

export type FlashcardResource = {
  id: string;
  front: string;
  back: string | null;
  order?: number | null;
  status: RecordStatus;
  topicId: string;
  topic?: { id: string; name: string };
};

export type CreateFlashcardPayload = {
  front: string;
  back?: string;
  order?: number;
  status?: RecordStatus;
  topicId: string;
};

export type UpdateFlashcardPayload = {
  front?: string;
  back?: string;
  order?: number;
  status?: RecordStatus;
  topicId?: string;
};

export const flashcardsApi = {
  list(accessToken: string) {
    return apiRequest<FlashcardResource[]>('/flashcards', undefined, accessToken);
  },
  create(accessToken: string, payload: CreateFlashcardPayload) {
    return apiRequest<FlashcardResource>(
      '/flashcards',
      {
        method: 'POST',
        body: JSON.stringify({ ...payload, status: payload.status ?? 'DRAFT' }),
      },
      accessToken,
    );
  },
  update(accessToken: string, id: string, payload: UpdateFlashcardPayload) {
    return apiRequest<FlashcardResource>(
      `/flashcards/${id}`,
      { method: 'PATCH', body: JSON.stringify(payload) },
      accessToken,
    );
  },
  delete(accessToken: string, id: string) {
    return apiRequest(`/flashcards/${id}`, { method: 'DELETE' }, accessToken);
  },
};
