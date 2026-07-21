"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { translations } from "@/lib/translations";

export default function AddProjectPage() {
  const router = useRouter();

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = translations[language];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
            budget: Number(budget),
            status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(t.projectCreated);

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(t.failedCreateProject);
    } finally {
      setLoading(false);
    }
  };

  return (
        <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-8">

          <Link
            href="/projects"
            className="px-4 py-2 text-sm rounded-xl border border-zinc-700 hover:bg-zinc-900 transition"
          >
            ← {t.back}
          </Link>

          <LanguageSwitcher />

        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">

          <h1 className="text-3xl font-bold">
            {t.addProjectTitle}
          </h1>

          <p className="text-zinc-400 mt-2 mb-8">
            {t.addProjectSubtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block mb-3 text-zinc-300">
                {t.projectName}
              </label>

              <input
                type="text"
                placeholder={t.projectNamePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-zinc-700 focus:border-white outline-none transition"
                required
              />

            </div>

            <div>

              <label className="block mb-3 text-zinc-300">
                {t.projectDescription}
              </label>

              <textarea
                placeholder={t.projectDescriptionPlaceholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-2xl bg-zinc-900 border border-zinc-700 p-5 focus:border-white outline-none transition resize-none"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block mb-3 text-zinc-300">
                  {t.projectBudget}
                </label>

                <input
                  type="number"
                  placeholder={t.projectBudgetPlaceholder}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-zinc-700 focus:border-white outline-none transition"
                />

              </div>

              <div>

                <label className="block mb-3 text-zinc-300">
                  {t.status}
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-zinc-700 focus:border-white outline-none transition"
                >
                  <option value="ACTIVE">
                    {t.activeStatus}
                  </option>

                  <option value="PAUSED">
                    {t.pausedStatus}
                  </option>

                  <option value="COMPLETED">
                    {t.completedStatus}
                  </option>
                </select>

              </div>

            </div>

            <div className="pt-4 flex justify-center">

              <button
                type="submit"
                disabled={loading}
                className="px-[72px] py-3.5 rounded-xl bg-white text-black font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading
                  ? language === "uk"
                    ? "Створення..."
                    : "Creating..."
                  : t.createProject}
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}