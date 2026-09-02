'use client';

import { useEffect, useState } from 'react';
import { API_ERROR_EVENT, type ApiErrorEventDetail } from '@/lib/api';

type ModalState = {
  isOpen: boolean;
  detail: ApiErrorEventDetail | null;
};

export default function ApiErrorModal() {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    detail: null,
  });

  useEffect(() => {
    const onApiError = (event: Event) => {
      const customEvent = event as CustomEvent<ApiErrorEventDetail>;
      if (!customEvent.detail) return;

      setState({
        isOpen: true,
        detail: customEvent.detail,
      });
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setState((current) => ({ ...current, isOpen: false }));
      }
    };

    window.addEventListener(API_ERROR_EVENT, onApiError as EventListener);
    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener(API_ERROR_EVENT, onApiError as EventListener);
      window.removeEventListener('keydown', onEscape);
    };
  }, []);

  if (!state.isOpen || !state.detail) return null;

  return (
    <div
      className="fixed inset-0 z-100 grid place-items-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-error-modal-title"
    >
      <section className="w-full max-w-lg rounded-2xl border border-(--sidebar-border) bg-(--color-sidebar) p-6 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
        <h2 id="api-error-modal-title" className="m-0 text-xl font-bold text-foreground">
          Erro {state.detail.status ? `(${state.detail.status})` : ''}
        </h2>
        <p className="mt-2 mb-4 text-sm text-(--font-muted)">
          Nao foi possivel concluir a requisicao. Revise os detalhes abaixo.
        </p>

        <ul className="m-0 mb-5 list-disc space-y-1.5 pl-5 text-sm text-[#f2c6cc]">
          {state.detail.messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>

        <div className="flex justify-end">
          <button
            className="min-h-10 rounded-lg bg-tone-1 px-4 text-sm font-bold text-white hover:bg-[#7e18d4]"
            onClick={() => setState((current) => ({ ...current, isOpen: false }))}
          >
            Fechar
          </button>
        </div>
      </section>
    </div>
  );
}
