import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cl } from "@repo/utils";
import Sidebar from "@/components/sidebar/Sidebar";
import { ThemeProvider } from "@/hooks/useTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plataforma do Administrador (PDE)",
  description: "Plataforma do Administrador",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      className={cl(
        `${geistSans.variable} ${geistMono.variable} h-full antialiased`,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <div
            className="flex min-h-dvh bg-(--color-content) max-sm:block"
            id="top"
          >
            <Sidebar />
            <main
              className="min-w-0 flex-1 p-11 max-sm:min-h-[20dvh] max-sm:p-5"
              aria-label="Conteúdo principal"
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
