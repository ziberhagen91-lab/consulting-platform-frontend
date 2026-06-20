"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function EditTaskContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`
);

        if (!response.ok) {
          throw new Error("Failed to load task");
        }

        const task = await response.json();

        setTitle(task.title ?? "");
        setDescription(task.description ?? "");
        setStatus(task.status ?? "");
        setPriority(task.priority ?? "");
        setDueDate(
          task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : ""
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to load task");
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!id) return;

    setLoading(true);

    try {
      const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
  {
    method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            status,
            priority,
            dueDate: dueDate || undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      toast.success("Task updated");
      router.push("/tasks");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl border border-zinc-800 bg-zinc-950 rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-2">
          Edit Task
        </h1>

        <p className="text-zinc-400 mb-8">
          Update task information
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black rounded-xl py-3 font-semibold hover:opacity-80 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function EditTaskPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditTaskContent />
    </Suspense>
  );
}