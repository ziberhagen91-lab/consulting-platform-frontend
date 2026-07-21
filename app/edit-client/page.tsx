"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { translations } from "@/lib/translations";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

function EditClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"uk" | "en">("uk");

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = translations[language];

  useEffect(() => {
    if (!id) return;

    const fetchClient = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error();
        }

        const client = await response.json();

        setName(client.name || "");
        setService(client.service || "");
      } catch (error) {
        console.error(error);
        toast.error(
          language === "uk"
            ? "Не вдалося завантажити клієнта"
            : "Failed to load client"
        );
      }
    };

    fetchClient();
  }, [id, language]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!id) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          service,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success(
        language === "uk"
          ? "Клієнта оновлено"
          : "Client updated successfully"
      );

      router.push("/clients");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        language === "uk"
          ? "Не вдалося оновити клієнта"
          : "Failed to update client"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
      
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-xl border border-zinc-800 bg-zinc-950 rounded-2xl p-6 md:p-8">

        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            <span>{language === "uk" ? "Назад" : "Back"}</span>
          </button>

          <LanguageSwitcher />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {language === "uk" ? "Редагувати клієнта" : "Edit Client"}
        </h1>

        <p className="text-zinc-400 mb-8">
          {language === "uk"
            ? "Оновіть інформацію про клієнта"
            : "Update client information"}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder={language === "uk" ? "Ім'я клієнта" : "Client Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
            required
          />

          <input
            type="text"
            placeholder={language === "uk" ? "Тип послуги" : "Service Type"}
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black rounded-xl py-3 font-semibold hover:opacity-80 transition disabled:opacity-50"
          >
            {loading
              ? language === "uk"
                ? "Збереження..."
                : "Saving..."
              : language === "uk"
                ? "Зберегти зміни"
                : "Save Changes"}
          </button>
        </form>

      </div>
    </main>
  );
}

export default function EditClientPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <p>Loading...</p>
        </main>
      }
    >
      <EditClientContent />
    </Suspense>
  );
}