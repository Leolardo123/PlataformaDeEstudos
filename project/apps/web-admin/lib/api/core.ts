export type ApiErrorEventDetail = {
  status: number;
  message: string;
  messages: string[];
};

export const API_ERROR_EVENT = 'pde:api-error';

const extractErrorMessages = (payload: unknown): string[] => {
  if (!payload || typeof payload !== 'object') return [];

  const data = payload as {
    message?: string | string[];
    error?: string;
    errors?: string[];
  };

  if (Array.isArray(data.message)) {
    return data.message.filter((item): item is string => typeof item === 'string');
  }

  if (typeof data.message === 'string' && data.message.trim()) {
    return [data.message];
  }

  if (Array.isArray(data.errors)) {
    return data.errors.filter((item): item is string => typeof item === 'string');
  }

  if (typeof data.error === 'string' && data.error.trim()) {
    return [data.error];
  }

  return [];
};

const emitApiError = (detail: ApiErrorEventDetail) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<ApiErrorEventDetail>(API_ERROR_EVENT, { detail }));
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002/api';

export async function apiRequest<T>(path: string, options?: RequestInit, accessToken?: string) {
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
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      payload = undefined;
    }

    const messages = extractErrorMessages(payload);
    const fallbackMessage = response.statusText || 'Falha na requisicao.';
    const normalizedMessages = messages.length > 0 ? messages : [fallbackMessage];
    const message = normalizedMessages.join(', ');

    emitApiError({
      status: response.status,
      message,
      messages: normalizedMessages,
    });

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
