"use client";

import { Button } from "@/components/button/Button";
import { apiClient } from "@repo/web-api";
import { useState } from "react";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    try {
      const result = await apiClient.user.register({
        name: username,
        email,
        password,
      });

      setError("");
      setLoading(false);
    } catch (error) {
      setError(error?.message ?? "Ocorreu um erro ao registrar o usuário.");
      setLoading(false);
      return;
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-(--color-content) p-5">
      <section className="w-full max-w-[420px] rounded-2xl border border-(--sidebar-border) bg-(--color-sidebar) p-7 shadow-[0_22px_60px_rgba(20,12,28,.14)] sm:p-9">
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-(--color-text)"
            >
              Nome de Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-lg p-2 border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-(--foreground) outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-(--color-text)"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-lg p-2 border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-(--foreground) outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-(--color-text)"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-lg p-2 border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-(--foreground) outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={loading}>
              Register
            </Button>
            <Button onClick={() => window.history.back()} variant="secondary">
              Voltar
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
