"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Client = {
  id: string;
  name: string;
};

export default function AddTaskPage() {
  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [status, setStatus] =
    useState("TODO");
  const [priority, setPriority] =
    useState("MEDIUM");
  const [dueDate, setDueDate] =
    useState("");
  const [clientId, setClientId] =
    useState("");

  const [clients, setClients] =
    useState<Client[]>([]);
  const [loading, setLoading] =
    useState(false);

  const router = useRouter();

  useEffect(() => {
    const saved =
      localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = {
    uk: {
      title: "Створити завдання",
      subtitle: "Додайте нове завдання",
      taskTitle: "Назва завдання",
      description: "Опис",
      noClient: "Без клієнта",
      create: "Створити завдання",
      creating: "Створення...",
      taskCreated: "Завдання створено",
      createFailed:
        "Не вдалося створити завдання",
      loadClientsFailed:
        "Не вдалося завантажити клієнтів",
    },
    en: {
      title: "Add Task",
      subtitle: "Create a new task",
      taskTitle: "Task Title",
      description: "Description",
      noClient: "No Client",
      create: "Create Task",
      creating: "Creating...",
      taskCreated: "Task created",
      createFailed:
        "Failed to create task",
      loadClientsFailed:
        "Failed to load clients",
    },
  };

  useEffect(() => {
    const loadClients = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/clients`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error(error);

        toast.error(
          t[language].loadClientsFailed
        );
      }
    };

    loadClients();
  }, [language]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const taskData = {
        title,
        description,
        status,
        priority,
        dueDate: dueDate
          ? new Date(dueDate).toISOString()
          : undefined,
        clientId: clientId || undefined,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );

      if (!response.ok) {
        const errorData =
          await response.text();

        throw new Error(errorData);
      }

      toast.success(
        t[language].taskCreated
      );

      router.push("/tasks");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        t[language].createFailed
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-6">

      <div className="w-full max-w-xl border border-zinc-800 bg-zinc-950 rounded-2xl p-6 md:p-8">

        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-6"
        >
          ← Назад до завдань
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {t[language].title}
        </h1>

        <p className="text-zinc-400 mb-8">
          {t[language].subtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder={t[language].taskTitle}
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
            required
          />

          <textarea
            placeholder={t[language].description}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={clientId}
            onChange={(e) =>
              setClientId(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          >
            <option value="">
              {t[language].noClient}
            </option>

            {clients.map((client) => (
              <option
                key={client.id}
                value={client.id}
              >
                {client.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          >
            <option value="TODO">📋 TODO</option>
            <option value="IN_PROGRESS">⏳ IN PROGRESS</option>
            <option value="DONE">✅ DONE</option>
          </select>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          >
            <option value="LOW">🟢 LOW</option>
            <option value="MEDIUM">🟡 MEDIUM</option>
            <option value="HIGH">🔴 HIGH</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black rounded-xl py-3 font-semibold hover:opacity-80 transition disabled:opacity-50"
          >
            {loading
              ? t[language].creating
              : t[language].create}
          </button>

        </form>

      </div>

    </main>
  );
}