"use client";

import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

type SidebarProps = {
  onLogout: () => void;
};

export default function Sidebar({
  onLogout,
}: SidebarProps) {
  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = {
    uk: {
      platform: "Консалтингова платформа",
      overview: "Огляд",
      clients: "Клієнти",
      tasks: "Завдання",
      analytics: "Аналітика",
      settings: "Налаштування",
      logout: "Вийти",
    },
    en: {
      platform: "Consulting Platform",
      overview: "Overview",
      clients: "Clients",
      tasks: "Tasks",
      analytics: "Analytics",
      settings: "Settings",
      logout: "Logout",
    },
  };

  return (
    <aside className="w-64 border-r border-zinc-900 p-6">
      <h1 className="text-2xl font-bold mb-10">
        {t[language].platform}
      </h1>

      <nav className="flex flex-col gap-2">
        <a
          href="/dashboard"
          className="flex items-center gap-3 bg-white text-black px-4 py-3 rounded-xl font-semibold"
        >
          <LayoutDashboard size={20} />
          {t[language].overview}
        </a>

        <a
          href="/clients"
          className="flex items-center gap-3 hover:bg-zinc-900 px-4 py-3 rounded-xl transition"
        >
          <Users size={20} />
          {t[language].clients}
        </a>

        <a
          href="/tasks"
          className="flex items-center gap-3 hover:bg-zinc-900 px-4 py-3 rounded-xl transition"
        >
          <ClipboardList size={20} />
          {t[language].tasks}
        </a>

        <a
          href="#"
          className="flex items-center gap-3 hover:bg-zinc-900 px-4 py-3 rounded-xl transition"
        >
          <BarChart3 size={20} />
          {t[language].analytics}
        </a>

        <a
          href="/settings"
          className="flex items-center gap-3 hover:bg-zinc-900 px-4 py-3 rounded-xl transition"
        >
          <Settings size={20} />
          {t[language].settings}
        </a>
      </nav>

      <button
        onClick={onLogout}
        className="mt-10 w-full flex items-center justify-center gap-2 border border-zinc-700 px-4 py-3 rounded-xl hover:bg-zinc-900 transition"
      >
        <LogOut size={18} />
        {t[language].logout}
      </button>
    </aside>
  );
}