"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  createdAt?: string;
  client?: {
    id: string;
    name: string;
  };
}

interface TaskCardProps {
  task: Task;
}

const statusLabels: Record<string, string> = {
  TODO: "📋 До виконання",
  IN_PROGRESS: "🟡 В процесі",
  DONE: "✅ Виконано",
};

const priorityLabels: Record<string, string> = {
  LOW: "🟢 Низький",
  MEDIUM: "🟡 Середній",
  HIGH: "🔴 Високий",
};

export default function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit-task?id=${task.id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Видалити це завдання?");

    if (!confirmed) return;

    try {
      const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`,
  {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      toast.success("Завдання видалено");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося видалити завдання");
    }
  };

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(task.id);
      toast.success("ID задачі скопійовано");
    } catch {
      toast.error("Не вдалося скопіювати ID");
    }
  };

  return (
    <div className="border border-zinc-800 rounded-xl bg-zinc-950 p-5">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        {task.status === "DONE"
          ? "✅"
          : task.status === "IN_PROGRESS"
          ? "⏳"
          : "📋"}{" "}
        {task.title}
      </h2>

      <p className="mt-2 text-zinc-400">
        {task.description || "Без опису"}
      </p>

      <div className="mt-4 flex flex-wrap gap-6 text-sm">
        <span>
          <strong>Статус:</strong>{" "}
          <span
            className={
              task.status === "DONE"
                ? "text-green-400"
                : task.status === "IN_PROGRESS"
                ? "text-yellow-400"
                : "text-red-400"
            }
          >
            {statusLabels[task.status] || task.status}
          </span>
        </span>

        <span>
          <strong>Пріоритет:</strong>{" "}
          <span
            className={
              task.priority === "HIGH"
                ? "text-red-500"
                : task.priority === "MEDIUM"
                ? "text-yellow-400"
                : "text-green-400"
            }
          >
            {priorityLabels[task.priority] || task.priority}
          </span>
        </span>
      </div>

      {task.client && (
        <p className="mt-3 text-sm text-zinc-400">
          <strong>Клієнт:</strong> {task.client.name}
        </p>
      )}

      {task.createdAt && (
        <p className="mt-2 text-sm text-zinc-500">
          <strong>Створено:</strong>{" "}
          {new Date(task.createdAt).toLocaleDateString("uk-UA")}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={handleEdit}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:opacity-80 transition"
        >
          ✏️ Редагувати
        </button>

        <button
          onClick={handleCopyId}
          className="rounded-lg bg-zinc-700 px-4 py-2 text-white hover:opacity-80 transition"
        >
          📋 Копіювати ID
        </button>

        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:opacity-80 transition"
        >
          🗑️ Видалити
        </button>
      </div>
    </div>
  );
}