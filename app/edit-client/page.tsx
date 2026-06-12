"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function EditClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchClient = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:4000/clients/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load client");
        }

        const client = await response.json();

        setName(client.name ?? "");
        setService(client.service ?? "");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load client");
      }
    };

    fetchClient();
  }, [id]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!id) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4000/clients/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            service,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update client");
      }

      toast.success("Client updated successfully");
      router.push("/clients");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl border border-zinc-800 bg-zinc-950 rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-2">
          Edit Client
        </h1>

        <p className="text-zinc-400 mb-8">
          Update client information
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder="Client Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
            required
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

export default function EditClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditClientContent />
    </Suspense>
  );
}