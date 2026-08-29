"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Sidebar from "@/app/components/Sidebar";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { translations } from "@/lib/translations";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type Task = {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
};

export default function TasksPage() {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = translations[language];

  const loadTasks = async () => {
    try {
      setLoading(true);

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
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]);
        toast.error(t.invalidResponse);
      }
    } catch (error) {
      console.error(error);
      toast.error(t.failedLoadTasks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      t.confirmDeleteTask
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

      toast.success(t.taskDeleted);

      await loadTasks();
    } catch (error) {
      console.error(error);

      toast.error(
        t.failedDeleteTask
      );
    }
  };

  const filteredTasks = tasks.filter(
    (task) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(searchValue) ||
        task.description
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" ||
        task.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  const activeTasks =
    filteredTasks.filter(
      (task) =>
        task.status === "TODO" ||
        task.status === "IN_PROGRESS"
    ).length;

  const completedTasks =
    filteredTasks.filter(
      (task) =>
        task.status === "DONE"
    ).length;

  const statusLabels =
    language === "uk"
      ? {
          TODO: "До виконання",
          IN_PROGRESS: "В процесі",
          DONE: "Виконано",
        }
      : {
          TODO: "To Do",
          IN_PROGRESS: "In Progress",
          DONE: "Done",
        };

  const priorityLabels =
    language === "uk"
      ? {
          LOW: "Низький",
          MEDIUM: "Середній",
          HIGH: "Високий",
        }
      : {
          LOW: "Low",
          MEDIUM: "Medium",
          HIGH: "High",
        };

  return (
    <main className="min-h-screen bg-black text-white flex">

      <Sidebar
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.success(t.logout);
          router.push("/login");
        }}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <section className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">

          {/* LANGUAGE */}
          <div className="flex justify-end mb-8">
            <LanguageSwitcher />
          </div>

          {/* HEADER */}
          <div className="flex flex-col gap-6 mb-12">

            <div>
              <h1 className="text-5xl font-black">
                {t.tasksTitle}
              </h1>

              <p className="text-zinc-400 mt-3 text-lg">
                {language === "uk"
                  ? "Керуйте своїми завданнями"
                  : "Manage your consulting tasks"}
              </p>
            </div>

            <div>
              <Link
                href="/add-task"
                className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-zinc-200 transition"
              >
                ➕ {t.addTask}
              </Link>
            </div>

          </div>

          {/* STATISTICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            {/* TOTAL */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 hover:border-white hover:-translate-y-1 transition-all duration-300">
              <p className="text-zinc-400">
                {language === "uk"
                  ? "Всього завдань"
                  : "Total Tasks"}
              </p>

              <h2 className="text-5xl font-black mt-4">
                {filteredTasks.length}
              </h2>
            </div>

            {/* ACTIVE */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 hover:border-white hover:-translate-y-1 transition-all duration-300">
              <p className="text-zinc-400">
                {language === "uk"
                  ? "Активні"
                  : "Active"}
              </p>

              <h2 className="text-5xl font-black text-green-400 mt-4">
                {activeTasks}
              </h2>
            </div>

            {/* COMPLETED */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 hover:border-white hover:-translate-y-1 transition-all duration-300">
              <p className="text-zinc-400">
                {language === "uk"
                  ? "Виконані"
                  : "Completed"}
              </p>

              <h2 className="text-5xl font-black text-blue-400 mt-4">
                {completedTasks}
              </h2>
            </div>

          </div>

          {/* SEARCH + FILTER */}
          <div className="space-y-6 mb-10">

            <input
              type="text"
              placeholder={
                language === "uk"
                  ? "🔍 Пошук завдань..."
                  : "🔍 Search tasks..."
              }
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-2xl bg-zinc-950 border border-zinc-800 px-6 py-4 text-lg outline-none focus:border-white transition"
            />

            <div className="flex flex-wrap gap-3">

              {/* ALL */}
              <button
                onClick={() =>
                  setStatusFilter("ALL")
                }
                className={`px-5 py-2 rounded-xl font-semibold transition ${
                  statusFilter === "ALL"
                    ? "bg-white text-black"
                    : "bg-zinc-900 border border-zinc-700 hover:border-white"
                }`}
              >
                {language === "uk"
                  ? "Всі"
                  : "All"}
              </button>

              {/* TODO */}
              <button
                onClick={() =>
                  setStatusFilter("TODO")
                }
                className={`px-5 py-2 rounded-xl font-semibold transition ${
                  statusFilter === "TODO"
                    ? "bg-yellow-500 text-black"
                    : "bg-zinc-900 border border-zinc-700 hover:border-yellow-500"
                }`}
              >
                {language === "uk"
                  ? "До виконання"
                  : "To Do"}
              </button>

              {/* IN PROGRESS */}
              <button
                onClick={() =>
                  setStatusFilter("IN_PROGRESS")
                }
                className={`px-5 py-2 rounded-xl font-semibold transition ${
                  statusFilter === "IN_PROGRESS"
                    ? "bg-purple-500 text-white"
                    : "bg-zinc-900 border border-zinc-700 hover:border-purple-500"
                }`}
              >
                {language === "uk"
                  ? "В процесі"
                  : "In Progress"}
              </button>

              {/* DONE */}
              <button
                onClick={() =>
                  setStatusFilter("DONE")
                }
                className={`px-5 py-2 rounded-xl font-semibold transition ${
                  statusFilter === "DONE"
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-900 border border-zinc-700 hover:border-blue-500"
                }`}
              >
                {language === "uk"
                  ? "Виконані"
                  : "Completed"}
              </button>

            </div>

          </div>

          {/* CONTENT */}
          {loading ? (

            <div className="text-center py-20 text-zinc-400">
              {t.loading}
            </div>

          ) : filteredTasks.length === 0 ? (

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-16 text-center">

              <h2 className="text-3xl font-bold">
                {language === "uk"
                  ? "Завдань не знайдено"
                  : "No tasks found"}
              </h2>

              <p className="text-zinc-400 mt-4">
                {language === "uk"
                  ? "Створіть нове завдання або змініть параметри пошуку."
                  : "Create a new task or change your search filters."}
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredTasks.map((task) => (

                <div
                  key={task.id}
                  className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 hover:border-white hover:-translate-y-2 transition-all duration-300 shadow-lg"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-start gap-4">

                    <div className="flex-1 min-w-0">

                      <h2 className="text-2xl font-bold break-words">
                        {task.title}
                      </h2>

                      <p className="text-zinc-400 mt-3 min-h-[70px] break-words">
                        {task.description ||
                          (language === "uk"
                            ? "Без опису"
                            : "No description")}
                      </p>

                    </div>

                  </div>

                  {/* STATUS / PRIORITY */}
                  <div className="flex flex-wrap gap-2 mt-5">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        task.status === "DONE"
                          ? "bg-blue-500/20 text-blue-400"
                          : task.status === "IN_PROGRESS"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {statusLabels[task.status]}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        task.priority === "HIGH"
                          ? "bg-red-500/20 text-red-400"
                          : task.priority === "MEDIUM"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {priorityLabels[task.priority]}
                    </span>

                  </div>

                  <div className="border-t border-zinc-800 my-6" />

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-6">

                    <Link
                      href={`/edit-task/${task.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 font-semibold hover:border-white hover:bg-zinc-900 transition-all duration-300"
                    >
                      ✏️ {t.edit}
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(task.id)
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-500 transition-all duration-300"
                    >
                      🗑 {t.delete}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </section>

    </main>
  );
}
