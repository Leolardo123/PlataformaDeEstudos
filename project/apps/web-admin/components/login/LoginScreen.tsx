"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../button/Button";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    router.replace("/dashboard");
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-(--color-content) p-5">
      <section className="w-full max-w-[420px] rounded-2xl border border-(--sidebar-border) bg-(--color-sidebar) p-7 shadow-[0_22px_60px_rgba(20,12,28,.14)] sm:p-9">
        <div className="mb-8">
          <div className="mb-6 grid size-10 place-items-center rounded-xl bg-tone-1 text-xl font-extrabold text-white shadow-[0_8px_20px_rgba(143,33,237,.28)]">
            P
          </div>
          <p className="mb-2 text-sm font-semibold text-[#a955ed]">
            Painel administrativo
          </p>
          <h1 className="m-0 text-[28px] font-bold tracking-[-.035em] text-(--foreground)">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 mb-0 text-sm text-(--font-muted)">
            Entre para gerenciar os conteúdos da plataforma.
          </p>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-[13px] font-semibold text-(--foreground)">
            E-mail
            <Input
              className="min-h-11 rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-(--foreground) outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </label>
          <label className="grid gap-2 text-[13px] font-semibold text-(--foreground)">
            Senha
            <Input
              className="min-h-11 rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-(--foreground) outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error && (
            <p
              className="m-0 text-[13px] font-medium text-[#d85a6b]"
              role="alert"
            >
              {error}
            </p>
          )}
          <Button className="min-h-11 " type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="mt-6 mb-0 text-center text-xs text-(--font-muted)">
          Use as credenciais de admin configuradas na API.
        </p>
      </section>
    </div>
  );
}
