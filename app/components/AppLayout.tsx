"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";

type AppLayoutProps = {
  children: ReactNode;
  onLogout: () => void;
};

export default function AppLayout({
  children,
  onLogout,
}: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      <Sidebar
        onLogout={onLogout} mobileMenuOpen={false} setMobileMenuOpen={function (open: boolean): void {
          throw new Error("Function not implemented.");
        } }      />

      <section className="flex-1 min-w-0 p-4 md:p-10">
        {children}
      </section>
    </main>
  );
}