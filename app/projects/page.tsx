"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function ProjectsPage() {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = translations[language];

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setProjects(data);
    } catch {
      toast.error(t.failedLoadProject);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    const confirmed = window.confirm(
      t.confirmDeleteProject
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(t.projectDeleted);

      await loadProjects();
    } catch {
      toast.error(t.failedDeleteProject);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        project.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    }
  );

  const activeProjects =
    filteredProjects.filter(
      (project) =>
        project.status === "ACTIVE"
    ).length;

  const completedProjects =
    filteredProjects.filter(
      (project) =>
        project.status === "COMPLETED"
    ).length;
    return (
  <main className="min-h-screen bg-black text-white flex">
    <Sidebar
      onLogout={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success(t.logout);

        router.push("/login");
      }}
    />

    <section className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>

        <div className="flex flex-col gap-6 mb-12">

          <div>
            <h1 className="text-5xl font-black">
              {t.projects}
            </h1>

            <p className="text-zinc-400 mt-3 text-lg">
              {t.manageProjects}
            </p>
          </div>

          <div>
            <Link
              href="/add-project"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-zinc-200 transition"
            >
              ➕ {t.addProject}
            </Link>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 hover:border-white hover:-translate-y-1 transition-all duration-300">
            <p className="text-zinc-400">
              {t.totalProjects}
            </p>

            <h2 className="text-5xl font-black mt-4">
              {filteredProjects.length}
            </h2>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 hover:border-white hover:-translate-y-1 transition-all duration-300">
            <p className="text-zinc-400">
              {t.activeStatus}
            </p>

            <h2 className="text-5xl font-black text-green-400 mt-4">
              {activeProjects}
            </h2>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 hover:border-white hover:-translate-y-1 transition-all duration-300">
            <p className="text-zinc-400">
              {t.completedStatus}
            </p>

            <h2 className="text-5xl font-black text-blue-400 mt-4">
              {completedProjects}
            </h2>
          </div>

        </div>

        <div className="space-y-6 mb-10">

          <input
            type="text"
            placeholder={`🔍 ${t.searchProjects}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl bg-zinc-950 border border-zinc-800 px-6 py-4 text-lg outline-none focus:border-white transition"
          />

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-5 py-2 rounded-xl font-semibold transition ${
                statusFilter === "ALL"
                  ? "bg-white text-black"
                  : "bg-zinc-900 border border-zinc-700 hover:border-white"
              }`}
            >
              {t.all}
            </button>

            <button
              onClick={() => setStatusFilter("ACTIVE")}
              className={`px-5 py-2 rounded-xl font-semibold transition ${
                statusFilter === "ACTIVE"
                  ? "bg-green-500 text-white"
                  : "bg-zinc-900 border border-zinc-700 hover:border-green-500"
              }`}
            >
              {t.activeStatus}
            </button>

            <button
              onClick={() => setStatusFilter("COMPLETED")}
              className={`px-5 py-2 rounded-xl font-semibold transition ${
                statusFilter === "COMPLETED"
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-900 border border-zinc-700 hover:border-blue-500"
              }`}
            >
              {t.completedStatus}
            </button>

          </div>

        </div>

        {loading ? (

          <div className="text-center py-20 text-zinc-400">
            {t.loading}
          </div>

        ) : filteredProjects.length === 0 ? (

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-16 text-center">

            <h2 className="text-3xl font-bold">
              {t.noProjects}
            </h2>

            <p className="text-zinc-400 mt-4">
              {t.noProjectsText}
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredProjects.map((project) => (

              <div
                key={project.id}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 hover:border-white hover:-translate-y-2 transition-all duration-300 shadow-lg"
              >

                <div className="flex justify-between items-start">

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold">
                      {project.name}
                    </h2>

                    <p className="text-zinc-400 mt-3 min-h-[70px]">
                      {project.description || t.noDescription}
                    </p>

                  </div>

                  <span
                    className={`ml-4 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      project.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-400"
                        : project.status === "COMPLETED"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status === "ACTIVE"
                      ? t.activeStatus
                      : project.status === "COMPLETED"
                      ? t.completedStatus
                      : t.pausedStatus}
                  </span>

                </div>

                <div className="border-t border-zinc-800 my-6" />

                <div>

                  <p className="text-zinc-500 text-sm">
                    {t.projectBudget}
                  </p>

                  <p className="text-3xl font-black mt-2">
                    ${new Intl.NumberFormat("en-US").format(project.budget)}
                  </p>

                </div>

                <div className="flex gap-3 mt-8">

                  <Link
                    href={`/edit-project/${project.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 font-semibold hover:border-white hover:bg-zinc-900 transition-all duration-300"
                  >
                    ✏️ {t.edit}
                  </Link>

                  <button
                    onClick={() => deleteProject(project.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-500 transition-all duration-300"
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

