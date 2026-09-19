"use client";

import { apiClient } from "@repo/web-api";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/button/Button";
import Input from "@/components/input/Input";

export default function ConfirmEmailScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmToken, setConfirmToken] = useState("");

  async function redirectToHome() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.href = "/";
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    try {
      const result = await apiClient.user.validateEmail({
        token: confirmToken,
      });

      setError("");
      setLoading(false);

      alert("Email confirmado com sucesso!");
      await redirectToHome();
    } catch (error) {
      setError(error?.message ?? "Ocorreu um erro ao registrar o usuário.");
      setLoading(false);
      return;
    }
  }
  async function resendHandler() {
    setLoading(true);
    const email = prompt("Por favor, insira seu email:");
    try {
      const result = await apiClient.user.resendValidateEmail({
        email: email ?? "",
        role: "student",
      });
      setError("");
    } catch (error) {
      setError(
        error?.message ?? "Ocorreu um erro ao reenviar o email de confirmação.",
      );
    } finally {
      setLoading(false);
    }
  }

  const searchParams = useSearchParams();
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token") ?? "";
    setConfirmToken(tokenFromUrl);
  }, [searchParams]);
  return (
    <div className="grid min-h-dvh place-items-center bg-(--color-content) p-5">
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Token de confirmação"
          value={confirmToken}
          onChange={(e) => setConfirmToken(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" isLoading={loading} className="w-full">
          Confirmar Email
        </Button>
        <Button
          type="button"
          onClick={resendHandler}
          isLoading={loading}
          className="w-full"
        >
          Reenviar Email de Confirmação
        </Button>
      </form>
    </div>
  );
}
