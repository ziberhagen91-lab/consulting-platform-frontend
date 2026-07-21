"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { translations } from "@/lib/translations";

type Client = {
  id: string;
  name: string;
};

export default function AddTaskPage() {
  const router = useRouter();

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  const [loading, setLoading] =
    useState(false);

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

  useEffect(() => {
    const saved =
      localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = translations[language];

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
          t.loadClientsFailed
        );
      }
    };

    loadClients();
  }, [t]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            status,
            priority,
            dueDate: dueDate
              ? new Date(dueDate).toISOString()
              : undefined,
            clientId:
              clientId || undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          await response.text()
        );
      }

      toast.success(
        t.taskCreated
      );

      router.push("/tasks");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        t.createFailed
      );
    } finally {
      setLoading(false);
    }
  };

  return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-xl border border-zinc-800 bg-zinc-950 rounded-2xl p-6 md:p-8">

        <div className="flex items-center justify-between mb-6">
          <Link
            href="/tasks"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
          >
            ← {language === "uk" ? "Назад" : "Back"}
          </Link>

          <LanguageSwitcher />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {t.addTaskTitle}
        </h1>

        <p className="text-zinc-400 mb-8">
          {t.addTaskSubtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder={t.taskTitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
            required
          />

          <textarea
            placeholder={t.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition resize-none"
            rows={4}
          />

          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
          >
            <option value="">
              {t.noClient}
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
            onChange={(e) => setStatus(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
          >
            <option value="TODO">📋 TODO</option>
            <option value="IN_PROGRESS">⏳ IN PROGRESS</option>
            <option value="DONE">✅ DONE</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
          >
            <option value="LOW">🟢 LOW</option>
            <option value="MEDIUM">🟡 MEDIUM</option>
            <option value="HIGH">🔴 HIGH</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black rounded-xl py-3 font-semibold hover:opacity-80 transition disabled:opacity-50"
          >
            {loading
              ? t.creatingTask
              : t.createTask}
          </button>

        </form>

      </div>
    </main>
  );
}