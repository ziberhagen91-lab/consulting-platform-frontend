"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`
        );

        const data = await response.json();

        console.log("TASKS:", data);

        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-6"
        >
          ← Назад до панелі
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">
              Завдання
            </h1>

            <p className="text-zinc-400 mt-1">
              Всього завдань: {tasks.length}
            </p>
          </div>

          <Link
            href="/add-task"
            className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:opacity-80 transition"
          >
            + Додати завдання
          </Link>
        </div>

        {loading ? (
          <p>Завантаження...</p>
        ) : tasks.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Завдань поки немає
            </h2>

            <p className="text-zinc-400">
              Створіть перше завдання для початку роботи.
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

                <div className="flex gap-4 mt-3 text-sm">
                  <span>Статус: {task.status}</span>
                  <span>Пріоритет: {task.priority}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}