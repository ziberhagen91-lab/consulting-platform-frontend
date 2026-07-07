"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import LanguageSwitcher from "../components/LanguageSwitcher";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type Task = {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
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

      edit: "Редагувати",

      delete: "Видалити",

      failedLoad:
        "Не вдалося завантажити завдання",

      failedDelete:
        "Не вдалося видалити завдання",

      taskDeleted:
        "Завдання успішно видалено",

      invalidResponse:
        "Некоректна відповідь сервера",
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

      edit: "Edit",

      delete: "Delete",

      failedLoad:
        "Failed to load tasks",

      failedDelete:
        "Failed to delete task",

      taskDeleted:
        "Task deleted successfully",

      invalidResponse:
        "Invalid response from backend",
    },
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        const data =
          await response.json();

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
          toast.error(
            t[language].invalidResponse
          );
        }
      } catch (error) {
        console.error(error);

        toast.error(
          t[language].failedLoad
        );
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);
    const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      language === "uk"
        ? "Видалити це завдання?"
        : "Delete this task?"
    );

    if (!confirmed) return;

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      setTasks((prev) =>
        prev.filter(
          (task) => task.id !== id
        )
      );

      toast.success(
        t[language].taskDeleted
      );
    } catch (error) {
      console.error(error);

      toast.error(
        t[language].failedDelete
      );
    }
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
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-6"
        >
          ← {t[language].back}
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {t[language].title}
            </h1>

            <p className="text-zinc-400 mt-1">
              {t[language].total}: {tasks.length}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

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
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-white hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-bold">
                {task.title}
              </h3>

              <p className="text-zinc-400 mt-2">
                {task.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">

                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                  {t[language].status}:{" "}
                  {
                    statusLabels[
                      task.status as keyof typeof statusLabels
                    ]
                  }
                </span>

                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
                  {t[language].priority}:{" "}
                  {
                    priorityLabels[
                      task.priority as keyof typeof priorityLabels
                    ]
                  }
                </span>

              </div>

              <div className="flex flex-wrap gap-3 mt-6">

                <Link
                  href={`/edit-task/${task.id}`}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                >
                  ✏️ {t[language].edit}
                </Link>

                <button
                  onClick={() =>
                    handleDelete(task.id)
                  }
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  🗑 {t[language].delete}
                </button>

              </div>

            </div>
          ))}

          </div>
        )}

      </div>
    </main>
  );
}