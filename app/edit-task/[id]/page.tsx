"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import LanguageSwitcher from "../../components/LanguageSwitcher";
import { translations } from "@/lib/translations";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState("TODO");

  const [priority, setPriority] =
    useState("MEDIUM");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = translations[language];

  useEffect(() => {
    const loadTask = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${String(params.id)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error();
        }

        const task =
          await response.json();

        setTitle(task.title ?? "");
        setDescription(
          task.description ?? ""
        );
        setStatus(task.status ?? "TODO");
        setPriority(
          task.priority ?? "MEDIUM"
        );
      } catch {
        toast.error(
          t.failedLoadTasks
        );
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [params.id, t.failedLoadTasks]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSaving(true);

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${String(params.id)}`,
        {
          method: "PATCH",
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
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(
        t.taskUpdated
      );

      router.push("/tasks");
      router.refresh();
    } catch {
      toast.error(
        t.failedUpdateTask
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400 text-lg">
          {t.loading}
        </p>
      </main>
    );
  }

  return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8">

        <div className="flex items-center justify-between mb-8">
          <Link
            href="/tasks"
            className="text-zinc-400 hover:text-white transition"
          >
            ← {t.back}
          </Link>

          <LanguageSwitcher />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">
          {t.editTaskTitle}
        </h1>

        <p className="text-zinc-400 mt-2 mb-8">
          {t.editTaskSubtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              {t.taskTitle}
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder={t.taskTitle}
              required
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              {t.description}
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder={t.description}
              rows={4}
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-white transition"
            />
          </div>
                    <div>
            <label className="block text-sm text-zinc-400 mb-2">
              {t.status}
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition"
            >
              <option value="TODO">
                TODO
              </option>

              <option value="IN_PROGRESS">
                IN PROGRESS
              </option>

              <option value="DONE">
                DONE
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              {t.priority}
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition"
            >
              <option value="LOW">
                LOW
              </option>

              <option value="MEDIUM">
                MEDIUM
              </option>

              <option value="HIGH">
                HIGH
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-white text-black rounded-xl py-3 font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving
              ? t.saving
              : t.saveChanges}
          </button>
        </form>
      </div>
    </main>
  );
}