"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "../components/LanguageSwitcher";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  useEffect(() => {
    const saved =
      localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`
        );

        const data = await response.json();

        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const t = {
    uk: {
      title: "Завдання",
      back: "Назад до панелі",
      total: "Всього завдань",
      addTask: "Додати завдання",
      loading: "Завантаження...",
      noTasks: "Завдань поки немає",
      noTasksText:
        "Створіть перше завдання для початку роботи.",
      status: "Статус",
      priority: "Пріоритет",
    },
    en: {
      title: "Tasks",
      back: "Back to Dashboard",
      total: "Total Tasks",
      addTask: "Add Task",
      loading: "Loading...",
      noTasks: "No tasks yet",
      noTasksText:
        "Create your first task to get started.",
      status: "Status",
      priority: "Priority",
    },
  };

  const statusLabels =
    language === "uk"
      ? {
          TODO: "📋 До виконання",
          IN_PROGRESS: "⏳ В процесі",
          DONE: "✅ Виконано",
        }
      : {
          TODO: "📋 To Do",
          IN_PROGRESS: "⏳ In Progress",
          DONE: "✅ Done",
        };

  const priorityLabels =
    language === "uk"
      ? {
          LOW: "🟢 Низький",
          MEDIUM: "🟡 Середній",
          HIGH: "🔴 Високий",
        }
      : {
          LOW: "🟢 Low",
          MEDIUM: "🟡 Medium",
          HIGH: "🔴 High",
        };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-6"
        >
          ← {t[language].back}
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">
              {t[language].title}
            </h1>

            <p className="text-zinc-400 mt-1">
              {t[language].total}: {tasks.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Link
              href="/add-task"
              className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:opacity-80 transition"
            >
              + {t[language].addTask}
            </Link>
          </div>
        </div>

        {loading ? (
          <p>{t[language].loading}</p>
        ) : tasks.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">
              {t[language].noTasks}
            </h2>

            <p className="text-zinc-400">
              {t[language].noTasksText}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
              >
                <h3 className="text-xl font-bold">
                  {task.title}
                </h3>

                <p className="text-zinc-400 mt-2">
                  {task.description}
                </p>

                <div className="flex gap-4 mt-3 text-sm flex-wrap">
                  <span>
                    {t[language].status}:{" "}
                    {statusLabels[
                      task.status as keyof typeof statusLabels
                    ]}
                  </span>

                  <span>
                    {t[language].priority}:{" "}
                    {priorityLabels[
                      task.priority as keyof typeof priorityLabels
                    ]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}