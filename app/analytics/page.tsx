"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import LanguageSwitcher from "@/app/components/LanguageSwitcher";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AnalyticsPage() {
  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  const [stats] = useState({
    clients: 124,
    revenue: 12450,
    projects: 18,
    growth: 18.5,
  });

  const revenueData = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 2400 },
    { month: "Apr", revenue: 3200 },
    { month: "May", revenue: 4100 },
    { month: "Jun", revenue: 5200 },
  ];

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

      growth: "Зростання",

      revenueChart:
        "Аналітика доходу",

      monthlyGrowth:
        "Щомісячне зростання доходу",

      live: "Оновлюється",

      activeClients:
        "Активні клієнти",

      monthlyRevenue:
        "Місячний дохід",

      activeProjects:
        "Активні проєкти",

      businessGrowth:
        "Ріст бізнесу",
    },

    en: {
      back: "Back",

      analytics: "Analytics",

      subtitle:
        "Platform statistics and metrics",

      clients: "Clients",

      revenue: "Revenue",

      projects: "Projects",

      growth: "Growth",

      revenueChart:
        "Revenue Analytics",

      monthlyGrowth:
        "Monthly revenue growth",

      live: "Live",

      activeClients:
        "Active Clients",

      monthlyRevenue:
        "Monthly Revenue",

      activeProjects:
        "Active Projects",

      businessGrowth:
        "Business Growth",
    },
  };
    return (
    <main className="min-h-screen bg-black text-white p-4 md:p-10">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">

        <div className="flex items-center gap-4">

          <Link
            href="/dashboard"
            className="px-4 py-2 border border-zinc-700 rounded-xl hover:bg-zinc-900 transition"
          >
            ← {t[language].back}
          </Link>

          <div>

            <h1 className="text-4xl font-bold">
              {t[language].analytics}
            </h1>

            <p className="text-zinc-400 mt-2">
              {t[language].subtitle}
            </p>

          </div>

        </div>

        <LanguageSwitcher />

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-white hover:-translate-y-1 transition-all duration-300">

          <p className="text-zinc-400 text-sm">
            {t[language].clients}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.clients}
          </h2>

          <p className="text-green-400 mt-3">
            +12%
          </p>

          <p className="text-zinc-500 text-sm mt-1">
            {t[language].activeClients}
          </p>

        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-white hover:-translate-y-1 transition-all duration-300">

          <p className="text-zinc-400 text-sm">
            {t[language].revenue}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            ${stats.revenue.toLocaleString()}
          </h2>

          <p className="text-green-400 mt-3">
            +18%
          </p>

          <p className="text-zinc-500 text-sm mt-1">
            {t[language].monthlyRevenue}
          </p>

        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-white hover:-translate-y-1 transition-all duration-300">

          <p className="text-zinc-400 text-sm">
            {t[language].projects}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.projects}
          </h2>

          <p className="text-green-400 mt-3">
            +7%
          </p>

          <p className="text-zinc-500 text-sm mt-1">
            {t[language].activeProjects}
          </p>

        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-white hover:-translate-y-1 transition-all duration-300">

          <p className="text-zinc-400 text-sm">
            {t[language].growth}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.growth}%
          </h2>

          <p className="text-green-400 mt-3">
            {t[language].live}
          </p>

          <p className="text-zinc-500 text-sm mt-1">
            {t[language].businessGrowth}
          </p>

        </div>

      </div>

      <div className="mt-10 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold">
          {t[language].revenueChart}
        </h2>

        <p className="text-zinc-400 mt-2 mb-8">
          {t[language].monthlyGrowth}
        </p>

        <div className="h-[350px]">
                    <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={revenueData}>

              <CartesianGrid
                stroke="#27272a"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                stroke="#71717a"
              />

              <YAxis
                stroke="#71717a"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ffffff"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 7,
                }}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

    </main>
  );
}