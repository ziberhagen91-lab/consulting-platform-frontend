"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default function AnalyticsPage() {
  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  useEffect(() => {
    const saved =
      localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = {
    uk: {
      back: "Назад",
      analytics: "Аналітика",
      subtitle:
        "Статистика та показники платформи",
      clients: "Клієнти",
      revenue: "Дохід",
      projects: "Проєкти",
    },

    en: {
      back: "Back",
      analytics: "Analytics",
      subtitle:
        "Platform statistics and metrics",
      clients: "Clients",
      revenue: "Revenue",
      projects: "Projects",
    },
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-8">
        <Link
          href="/dashboard"
          className="px-4 py-2 border border-zinc-700 rounded-xl hover:bg-zinc-900 transition"
        >
          ← {t[language].back}
        </Link>

        <LanguageSwitcher />
      </div>

      <h1 className="text-4xl font-bold mb-2">
        {t[language].analytics}
      </h1>

      <p className="text-zinc-400 mb-10">
        {t[language].subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6">
          <h3 className="text-xl font-semibold">
            {t[language].clients}
          </h3>

          <p className="text-4xl font-bold mt-4">
            0
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6">
          <h3 className="text-xl font-semibold">
            {t[language].revenue}
          </h3>

          <p className="text-4xl font-bold mt-4">
            $0
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6">
          <h3 className="text-xl font-semibold">
            {t[language].projects}
          </h3>

          <p className="text-4xl font-bold mt-4">
            0
          </p>
        </div>

      </div>
    </main>
  );
}