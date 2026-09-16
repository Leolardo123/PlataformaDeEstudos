"use client";

import { apiClient } from "@repo/web-api";
import { useState } from "react";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Handle form submission logic here

    const result = await apiClient.user.register({
      name: username,
      email,
      password,
    });
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
              className="mt-1 block w-full rounded-md border border-(--sidebar-border) bg-(--color-sidebar) p-2 text-(--color-text) shadow-sm focus:border-(--color-primary) focus:ring focus:ring-(--color-primary)/50 sm:text-sm"
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
              className="mt-1 block w-full rounded-md border border-(--sidebar-border) bg-(--color-sidebar) p-2 text-(--color-text) shadow-sm focus:border-(--color-primary) focus:ring focus:ring-(--color-primary)/50 sm:text-sm"
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
              className="mt-1 block w-full rounded-md border border-(--sidebar-border) bg-(--color-sidebar) p-2 text-(--color-text) shadow-sm focus:border-(--color-primary) focus:ring focus:ring-(--color-primary)/50 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-(--color-primary) py-2 px-4 text-(--color-text) shadow-sm hover:bg-(--color-primary-hover) focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </section>
    </div>
  );
}
