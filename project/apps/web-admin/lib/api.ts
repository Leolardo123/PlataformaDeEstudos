export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STUDENT';
};

export type RecordStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type SubjectResource = {
  id: string;
  name: string;
  description: string | null;
  status: RecordStatus;
};

export type TopicResource = {
  id: string;
  name: string;
  description: string | null;
  status: RecordStatus;
  subjectId: string;
  subject?: { id: string; name: string };
};

export type NoticeResource = {
  id: string;
  title: string;
  message: string;
  status: RecordStatus;
};

export type QuestionResource = {
  id: string;
  statement: string;
  status: RecordStatus;
  topics: Array<{ topic: { id: string; name: string } }>;
};

export type FlashcardResource = {
  id: string;
  front: string;
  back: string;
  status: RecordStatus;
  topicId: string;
  topic?: { id: string; name: string };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002/api';

async function apiRequest<T>(path: string, options?: RequestInit, accessToken?: string) {
  const headers = new Headers(options?.headers);
  headers.set('Content-Type', 'application/json');

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = 'Request failed.';
    try {
      const payload = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(payload.message)) {
        message = payload.message.join(', ');
      } else if (payload.message) {
        message = payload.message;
      }
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function statusToLabel(status: RecordStatus) {
  if (status === 'PUBLISHED') return 'Ativo';
  if (status === 'ARCHIVED') return 'Arquivado';
  return 'Rascunho';
}

export async function authLogin(email: string, password: string) {
  return apiRequest<{ accessToken: string; user: AuthUser }>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
  );
}

export async function authMe(accessToken: string) {
  return apiRequest<AuthUser>('/auth/me', { method: 'GET' }, accessToken);
}

export async function listSubjects(accessToken: string) {
  return apiRequest<SubjectResource[]>('/subjects', undefined, accessToken);
}

export async function createSubject(accessToken: string, payload: { name: string }) {
  return apiRequest<SubjectResource>(
    '/subjects',
    { method: 'POST', body: JSON.stringify({ name: payload.name, status: 'DRAFT' }) },
    accessToken,
  );
}

export async function updateSubject(accessToken: string, id: string, payload: { name: string }) {
  return apiRequest<SubjectResource>(
    `/subjects/${id}`,
    { method: 'PATCH', body: JSON.stringify(payload) },
    accessToken,
  );
}

export async function deleteSubject(accessToken: string, id: string) {
  return apiRequest(`/subjects/${id}`, { method: 'DELETE' }, accessToken);
}

export async function listTopics(accessToken: string) {
  return apiRequest<TopicResource[]>('/topics', undefined, accessToken);
}

export async function createTopic(accessToken: string, payload: { name: string; subjectId: string }) {
  return apiRequest<TopicResource>(
    '/topics',
    { method: 'POST', body: JSON.stringify({ ...payload, status: 'DRAFT' }) },
    accessToken,
  );
}

export async function updateTopic(accessToken: string, id: string, payload: { name: string }) {
  return apiRequest<TopicResource>(`/topics/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }, accessToken);
}

export async function deleteTopic(accessToken: string, id: string) {
  return apiRequest(`/topics/${id}`, { method: 'DELETE' }, accessToken);
}

export async function listNotices(accessToken: string) {
  return apiRequest<NoticeResource[]>('/notices', undefined, accessToken);
}

export async function createNotice(accessToken: string, payload: { title: string }) {
  return apiRequest<NoticeResource>(
    '/notices',
    { method: 'POST', body: JSON.stringify({ title: payload.title, status: 'DRAFT' }) },
    accessToken,
  );
}

export async function updateNotice(accessToken: string, id: string, payload: { title: string }) {
  return apiRequest<NoticeResource>(
    `/notices/${id}`,
    { method: 'PATCH', body: JSON.stringify(payload) },
    accessToken,
  );
}

export async function deleteNotice(accessToken: string, id: string) {
  return apiRequest(`/notices/${id}`, { method: 'DELETE' }, accessToken);
}

export async function listQuestions(accessToken: string) {
  return apiRequest<QuestionResource[]>('/questions', undefined, accessToken);
}

export async function createQuestion(accessToken: string, payload: { statement: string }) {
  return apiRequest<QuestionResource>(
    '/questions',
    { method: 'POST', body: JSON.stringify({ statement: payload.statement, status: 'DRAFT' }) },
    accessToken,
  );
}

export async function updateQuestion(accessToken: string, id: string, payload: { statement: string }) {
  return apiRequest<QuestionResource>(
    `/questions/${id}`,
    { method: 'PATCH', body: JSON.stringify(payload) },
    accessToken,
  );
}

export async function deleteQuestion(accessToken: string, id: string) {
  return apiRequest(`/questions/${id}`, { method: 'DELETE' }, accessToken);
}

export async function listFlashcards(accessToken: string) {
  return apiRequest<FlashcardResource[]>('/flashcards', undefined, accessToken);
}

export async function createFlashcard(accessToken: string, payload: { front: string; topicId: string }) {
  return apiRequest<FlashcardResource>(
    '/flashcards',
    { method: 'POST', body: JSON.stringify({ ...payload, status: 'DRAFT' }) },
    accessToken,
  );
}

export async function updateFlashcard(accessToken: string, id: string, payload: { front: string }) {
  return apiRequest<FlashcardResource>(
    `/flashcards/${id}`,
    { method: 'PATCH', body: JSON.stringify(payload) },
    accessToken,
  );
}

export async function deleteFlashcard(accessToken: string, id: string) {
  return apiRequest(`/flashcards/${id}`, { method: 'DELETE' }, accessToken);
}
