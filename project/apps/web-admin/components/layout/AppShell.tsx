'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar/Sidebar';
import { useAuth } from '@/hooks/useAuth';

export default function AppShell({ children }: { children: ReactNode }) {
  const { isAuthenticated, isReady } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname === '/login';

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated && !isLoginRoute) router.replace('/login');
    if (isAuthenticated && isLoginRoute) router.replace('/dashboard');
  }, [isAuthenticated, isLoginRoute, isReady, router]);

  if (!isReady || (!isAuthenticated && !isLoginRoute) || (isAuthenticated && isLoginRoute)) return null;
  if (isLoginRoute) return <>{children}</>;

  return (
    <div className="flex min-h-dvh bg-(--color-content) max-sm:block" id="top">
      <Sidebar />
      <main className="min-w-0 flex-1 p-11 max-sm:min-h-[20dvh] max-sm:p-5" aria-label="Conteúdo principal">
        {children}
      </main>
    </div>
  );
}
