'use client'

import Sidebar from "@/components/sidebar/Sidebar";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  useTheme('dark');

  return (
    <div>
      <main className="">
        <Sidebar />
      </main>
    </div>
  );
}
