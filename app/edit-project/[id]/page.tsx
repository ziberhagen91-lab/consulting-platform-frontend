"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Sidebar from "@/app/components/Sidebar";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { translations } from "@/lib/translations";

type Project = {
  id: string;
  name: string;
  description?: string;
  budget: number;
  status: string;
};

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();

  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = translations[language];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [status, setStatus] = useState("ACTIVE");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data: Project = await response.json();

        setName(data.name);
        setDescription(data.description || "");
        setBudget(data.budget);
        setStatus(data.status);
      } catch (error) {
        console.error(error);
        toast.error(t.failedLoadProject);
      } finally {
        setPageLoading(false);
      }
    };

    loadProject();
  }, [params.id, t.failedLoadProject]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
            budget,
            status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(t.projectUpdated);

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(t.failedUpdateProject);
    } finally {
      setSaving(false);
    }
  };

  return (
        <main className="min-h-screen bg-black text-white flex">
      <Sidebar
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
        }}
      />

      <section className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">

          <div className="flex justify-between items-center mb-10">

            <div>
              <h1 className="text-3xl font-bold">
                {t.editProjectTitle}
              </h1>

              <p className="text-zinc-400 mt-2">
                {t.editProjectSubtitle}
              </p>
            </div>

            <LanguageSwitcher />

          </div>

          {pageLoading ? (
            <p className="text-zinc-400">
              {language === "uk" ? "Завантаження..." : "Loading..."}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block mb-2 font-semibold">
                  {t.projectName}
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-4 outline-none focus:border-white transition"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  {t.projectDescription}
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-4 outline-none focus:border-white transition resize-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  {t.projectBudget}
                </label>

                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-4 outline-none focus:border-white transition"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  {t.status}
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-4 outline-none focus:border-white transition"
                >
                  <option value="ACTIVE">
                    {t.activeStatus}
                  </option>

                  <option value="COMPLETED">
                    {t.completedStatus}
                  </option>

                  <option value="PAUSED">
                    {t.pausedStatus}
                  </option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-white text-black py-4 font-bold hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
                >
                  {saving
                    ? language === "uk"
                      ? "Збереження..."
                      : "Saving..."
                    : t.saveChanges}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/projects")}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-zinc-700 py-4 hover:border-white transition disabled:opacity-50"
                >
                  {t.cancel}
                </button>

              </div>

            </form>
          )}

        </div>
      </section>
    </main>
  );
}