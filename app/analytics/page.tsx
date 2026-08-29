"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  CircleDashed,
  FolderKanban,
  ListTodo,
  Users,
  TrendingUp,
} from "lucide-react";

import LanguageSwitcher from "../components/LanguageSwitcher";
import { translations } from "@/lib/translations";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type Analytics = {
  totalClients: number;
  activeProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"uk" | "en">("uk");

  const t = translations;

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/analytics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Analytics loading error:", error);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const totalTasks = stats?.totalTasks ?? 0;
  const completedTasks = stats?.completedTasks ?? 0;
  const inProgressTasks = stats?.inProgressTasks ?? 0;
  const todoTasks = stats?.todoTasks ?? 0;

  const completionRate = useMemo(() => {
    if (!totalTasks) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  }, [completedTasks, totalTasks]);

  const todoPercent = totalTasks
    ? Math.round((todoTasks / totalTasks) * 100)
    : 0;

  const progressPercent = totalTasks
    ? Math.round((inProgressTasks / totalTasks) * 100)
    : 0;

  const donePercent = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const statusData = [
    {
      label:
        language === "uk" ? "До виконання" : "To Do",
      value: todoTasks,
      percent: todoPercent,
      icon: CircleDashed,
      className: "text-yellow-400",
      barClass: "bg-yellow-400",
      bgClass: "bg-yellow-400/10",
    },
    {
      label:
        language === "uk" ? "В процесі" : "In Progress",
      value: inProgressTasks,
      percent: progressPercent,
      icon: TrendingUp,
      className: "text-blue-400",
      barClass: "bg-blue-500",
      bgClass: "bg-blue-500/10",
    },
    {
      label:
        language === "uk" ? "Виконано" : "Done",
      value: completedTasks,
      percent: donePercent,
      icon: CheckCircle2,
      className: "text-emerald-400",
      barClass: "bg-emerald-400",
      bgClass: "bg-emerald-400/10",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-6 md:px-8 md:py-8 lg:px-10">

        {/* HEADER */}
        <header className="mb-8">
          <div className="flex items-center justify-between gap-4">

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-900 hover:text-white"
            >
              <ArrowLeft size={16} />
              {t[language].back}
            </Link>

            <LanguageSwitcher />

          </div>

          <div className="mt-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10">
                <BarChart3
                  size={22}
                  className="text-blue-400"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {t[language].analytics}
                </h1>

                <p className="mt-1 text-sm text-zinc-400 md:text-base">
                  {t[language].subtitle}
                </p>
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[170px] animate-pulse rounded-2xl border border-zinc-800 bg-zinc-950"
              />
            ))}
          </div>
        ) : (
          <>
            {/* KPI CARDS */}
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

              <div className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">
                      {t[language].clients}
                    </p>

                    <p className="mt-3 text-4xl font-bold tracking-tight">
                      {stats?.totalClients ?? 0}
                    </p>

                    <p className="mt-2 text-sm text-blue-400">
                      {t[language].activeClients}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                    <Users size={21} className="text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">
                      {t[language].projects}
                    </p>

                    <p className="mt-3 text-4xl font-bold tracking-tight">
                      {stats?.activeProjects ?? 0}
                    </p>

                    <p className="mt-2 text-sm text-emerald-400">
                      {t[language].activeProjects}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                    <FolderKanban
                      size={21}
                      className="text-emerald-400"
                    />
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">
                      {t[language].tasks}
                    </p>

                    <p className="mt-3 text-4xl font-bold tracking-tight">
                      {totalTasks}
                    </p>

                    <p className="mt-2 text-sm text-yellow-400">
                      {t[language].totalTasks}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/10">
                    <ListTodo
                      size={21}
                      className="text-yellow-400"
                    />
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">
                      {t[language].completedTasks}
                    </p>

                    <p className="mt-3 text-4xl font-bold tracking-tight">
                      {completionRate}%
                    </p>

                    <p className="mt-2 text-sm text-purple-400">
                      {completedTasks}{" "}
                      {language === "uk"
                        ? "завершено"
                        : "completed"}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
                    <CheckCircle2
                      size={21}
                      className="text-purple-400"
                    />
                  </div>
                </div>
              </div>

            </section>

            {/* TASK ANALYTICS */}
            <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">

              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                      <BarChart3
                        size={20}
                        className="text-blue-400"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">
                        {t[language].taskAnalytics}
                      </h2>

                      <p className="mt-1 text-sm text-zinc-500">
                        {language === "uk"
                          ? "Поточний розподіл задач за статусом"
                          : "Current task distribution by status"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-black px-4 py-3">
                  <p className="text-xs text-zinc-500">
                    {language === "uk"
                      ? "Completion rate"
                      : "Completion rate"}
                  </p>

                  <p className="mt-1 text-xl font-bold text-emerald-400">
                    {completionRate}%
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">

                {/* BARS */}
                <div className="space-y-7">
                  {statusData.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label}>
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.bgClass}`}
                            >
                              <Icon
                                size={17}
                                className={item.className}
                              />
                            </div>

                            <span className="text-sm font-medium text-zinc-300">
                              {item.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-white">
                              {item.value}
                            </span>

                            <span className="w-10 text-right text-xs text-zinc-500">
                              {item.percent}%
                            </span>
                          </div>
                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-zinc-900">
                          <div
                            className={`h-full rounded-full ${item.barClass} transition-all duration-700`}
                            style={{
                              width: `${item.percent}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* SUMMARY */}
                <div className="rounded-2xl border border-zinc-800 bg-black p-5">
                  <p className="text-sm font-semibold text-zinc-300">
                    {language === "uk"
                      ? "Task summary"
                      : "Task summary"}
                  </p>

                  <div className="mt-5 space-y-4">

                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <span className="text-sm text-zinc-500">
                        {language === "uk"
                          ? "Всього задач"
                          : "Total tasks"}
                      </span>

                      <span className="font-semibold">
                        {totalTasks}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <span className="text-sm text-zinc-500">
                        {language === "uk"
                          ? "В процесі"
                          : "In progress"}
                      </span>

                      <span className="font-semibold text-blue-400">
                        {inProgressTasks}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <span className="text-sm text-zinc-500">
                        {language === "uk"
                          ? "До виконання"
                          : "To do"}
                      </span>

                      <span className="font-semibold text-yellow-400">
                        {todoTasks}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">
                        {language === "uk"
                          ? "Виконано"
                          : "Completed"}
                      </span>

                      <span className="font-semibold text-emerald-400">
                        {completedTasks}
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* QUICK OVERVIEW */}
            <section className="mt-6 grid gap-5 md:grid-cols-3">

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                    <CircleDashed
                      size={19}
                      className="text-yellow-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-zinc-500">
                      {language === "uk"
                        ? "Незавершені"
                        : "Open tasks"}
                    </p>

                    <p className="text-xl font-bold">
                      {todoTasks + inProgressTasks}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <TrendingUp
                      size={19}
                      className="text-blue-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-zinc-500">
                      {language === "uk"
                        ? "В роботі"
                        : "In progress"}
                    </p>

                    <p className="text-xl font-bold">
                      {inProgressTasks}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <CheckCircle2
                      size={19}
                      className="text-emerald-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-zinc-500">
                      {language === "uk"
                        ? "Ефективність"
                        : "Efficiency"}
                    </p>

                    <p className="text-xl font-bold text-emerald-400">
                      {completionRate}%
                    </p>
                  </div>
                </div>
              </div>

            </section>
          </>
        )}
      </div>
    </main>
  );
}
