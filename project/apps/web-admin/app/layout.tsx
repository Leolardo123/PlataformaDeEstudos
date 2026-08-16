import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cl } from "@repo/utils";
import Sidebar from "@/components/sidebar/Sidebar";

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
        <div className="admin-shell" id="top">
          <Sidebar />
          <main className="content-area" aria-label="Conteúdo principal">{children}</main>
        </div>
      </body>
    </html>
  );
}
