"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type AppLayoutProps = {
  children: ReactNode;
  onLogout: () => void;
};

export default function AppLayout({
  children,
  onLogout,
}: AppLayoutProps) {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      <Sidebar onLogout={onLogout} />

      <section className="flex-1 p-4 md:p-10">
        {children}
      </section>
    </main>
  );
}