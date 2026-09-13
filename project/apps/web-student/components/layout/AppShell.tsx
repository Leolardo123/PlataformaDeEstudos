"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../navbar/Navbar";
import { useAuth } from "@/hooks/useAuth";
import ApiErrorModal from "./ApiErrorModal";

export default function AppShell({ children }: { children: ReactNode }) {
  const { isAuthenticated, isReady } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname === "/login";

  const publicRoutes = ["/login", "/register"];

  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated && !isPublicRoute) router.replace("/login");
    if (isAuthenticated && isLoginRoute) router.replace("/home");
  }, [isAuthenticated, isLoginRoute, isReady, router]);

  if (
    !isReady ||
    (!isAuthenticated && !isPublicRoute) ||
    (isAuthenticated && isLoginRoute)
  )
    return null;
  if (isLoginRoute) {
    return (
      <>
        {children}
        <ApiErrorModal />
      </>
    );
  }
  return (
    <>
      <div
        className="flex min-h-dvh bg-(--color-content) max-sm:block"
        id="top"
      >
        <main
          className="min-w-0 flex-1 p-11 max-sm:min-h-[20dvh] max-sm:p-5"
          aria-label="Conteúdo principal"
        >
          {children}
        </main>
      </div>
    </>
  );
}
