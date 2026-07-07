"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default function AddProjectPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

      toast.success("Project created");

      router.push("/projects");
    } catch {
      toast.error("Failed to create project");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-10">

          <Link
            href="/projects"
            className="px-5 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-900 transition"
          >
            ← Back
          </Link>

          <LanguageSwitcher />

        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10">

          <h1 className="text-5xl font-bold">
            Add Project
          </h1>

          <p className="text-zinc-400 mt-3 mb-10">
            Create a new project for your client.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            <div>

              <label className="block mb-3 text-zinc-300">
                Project Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-zinc-700 focus:border-white outline-none transition"
                required
              />

            </div>

            <div>

              <label className="block mb-3 text-zinc-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={6}
                className="w-full rounded-2xl bg-zinc-900 border border-zinc-700 p-5 focus:border-white outline-none transition resize-none"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div>

                <label className="block mb-3 text-zinc-300">
                  Budget
                </label>

                <input
                  type="number"
                  value={budget}
                  onChange={(e) =>
                    setBudget(e.target.value)
                  }
                  className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-zinc-700 focus:border-white outline-none transition"
                />

              </div>

              <div>

                <label className="block mb-3 text-zinc-300">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-zinc-700 focus:border-white outline-none transition"
                >
                  <option value="ACTIVE">
                    ACTIVE
                  </option>

                  <option value="PAUSED">
                    PAUSED
                  </option>

                  <option value="COMPLETED">
                    COMPLETED
                  </option>

                </select>

              </div>

            </div>

            <div className="pt-4">

              <button
                type="submit"
                className="w-full md:w-auto px-10 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition"
              >
                Create Project
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}