import { apiRequest } from './core';
import type { RecordStatus } from './status';

export type FlashcardResource = {
  id: string;
  front: string;
  back: string;
  status: RecordStatus;
  topicId: string;
  topic?: { id: string; name: string };
};

export const flashcardsApi = {
  list(accessToken: string) {
    return apiRequest<FlashcardResource[]>('/flashcards', undefined, accessToken);
  },
  create(accessToken: string, payload: { front: string; topicId: string }) {
    return apiRequest<FlashcardResource>(
      '/flashcards',
      { method: 'POST', body: JSON.stringify({ ...payload, status: 'DRAFT' }) },
      accessToken,
    );
  },
  update(accessToken: string, id: string, payload: { front: string }) {
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
