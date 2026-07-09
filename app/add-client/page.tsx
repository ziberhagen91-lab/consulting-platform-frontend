"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { translations } from "@/lib/translations";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function AddClientPage() {
  const [clientName, setClientName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"uk" | "en">("uk");

  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = translations[language];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/clients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: clientName,
            service: serviceType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast.success(t.clientCreated);
      router.push("/clients");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(t.failedCreateClient);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-xl border border-zinc-800 bg-zinc-950 rounded-2xl p-6 md:p-8">

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {t.addClientTitle}
        </h1>

        <p className="text-zinc-400 mb-8">
          {t.addClientSubtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder={t.clientName}
            value={clientName}
            onChange={(e) =>
              setClientName(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
            required
          />

          <input
            type="text"
            placeholder={t.serviceType}
            value={serviceType}
            onChange={(e) =>
              setServiceType(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black rounded-xl py-3 font-semibold hover:opacity-80 transition disabled:opacity-50"
          >
            {loading ? t.creatingClient : t.createClient}
          </button>
        </form>

      </div>
    </main>
  );
}