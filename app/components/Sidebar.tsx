"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

type SidebarProps = {
  onLogout: () => void;
};

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();

  const [language, setLanguage] = useState<"uk" | "en">("uk");
  const [isOpen, setIsOpen] = useState(false);

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

  const menuItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: t[language].overview,
    },
    {
      href: "/clients",
      icon: Users,
      label: t[language].clients,
    },
    {
      href: "/tasks",
      icon: ClipboardList,
      label: t[language].tasks,
    },
    {
      href: "/analytics",
      icon: BarChart3,
      label: t[language].analytics,
    },
    {
      href: "/settings",
      icon: Settings,
      label: t[language].settings,
    },
  ];

  return (
    <>
      {/* Mobile Header */}

      <div className="md:hidden flex items-center justify-between px-4 py-4 border-b border-zinc-800 bg-zinc-950">
        <h1 className="text-lg font-bold">
          {t[language].platform}
        </h1>

        <button
  onClick={() => setIsOpen(true)}
  className="p-2 rounded-lg hover:bg-zinc-800 transition"
  aria-label="Open menu"
>
  <Menu size={26} />
</button>
      </div>

      {/* Overlay */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed
          md:static
          top-0
          left-0
          h-screen
          w-72
          bg-zinc-950
          border-r
          border-zinc-800
          z-50
          flex
          flex-col
          p-6
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold">
            {t[language].platform}
          </h1>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800 transition"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-white text-black font-semibold shadow-lg"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
                <div className="mt-auto pt-8">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-700 hover:bg-red-600 hover:border-red-600 transition-all duration-200"
          >
            <LogOut size={18} />

            <span>{t[language].logout}</span>
          </button>
        </div>
      </aside>
    </>
  );
}