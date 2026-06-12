import Link from "next/link";
import TasksList from "../components/TasksList";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  clientId?: string;
  client?: {
    id: string;
    name: string;
  };
};

async function getTasks(): Promise<Task[]> {
  const res = await fetch("http://localhost:4000/tasks", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Не вдалося завантажити завдання");
  }

  return res.json();
}

export default async function TasksPage() {
  const tasks = await getTasks();

  const todoCount = tasks.filter(
    (task) => task.status === "TODO"
  ).length;

  const inProgressCount = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const doneCount = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
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

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl">📋</p>
            <p className="text-sm text-zinc-400">
              До виконання
            </p>
            <p className="text-xl font-bold">
              {todoCount}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl">⏳</p>
            <p className="text-sm text-zinc-400">
              В процесі
            </p>
            <p className="text-xl font-bold">
              {inProgressCount}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl">✅</p>
            <p className="text-sm text-zinc-400">
              Виконано
            </p>
            <p className="text-xl font-bold">
              {doneCount}
            </p>
          </div>
        </div>

        <TasksList tasks={tasks} />
      </div>
    </main>
  );
}