"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

console.log("PARAMS:", params);
console.log("ID:", params.id);

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [status, setStatus] =
    useState("TODO");
  const [priority, setPriority] =
    useState("MEDIUM");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${params.id}`
        );

        const task = await response.json();

        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [params.id]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
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

      router.push("/tasks");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl border border-zinc-800 bg-zinc-950 rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-6">
          Edit Task
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3"
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

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3"
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

          <button
            type="submit"
            className="bg-white text-black rounded-xl py-3 font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}