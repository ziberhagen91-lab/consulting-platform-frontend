"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import LanguageSwitcher from "@/app/components/LanguageSwitcher";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type Client = {
  id: string;
  name: string;
  service: string;
};

type User = {
  name: string;
  role: string;
};

export default function ClientsPage() {
  const router = useRouter();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = {
    uk: {
      back: "Назад",
      clients: "Клієнти",
      manageClients: "Керуйте своїми клієнтами",

      addClient: "Додати клієнта",

      searchClients: "Пошук клієнтів...",

      noClients: "Клієнтів не знайдено",

      createFirst:
        "Створіть свого першого клієнта",

      addFirst:
        "Додати першого клієнта",

      active: "Активний",

      edit: "Редагувати",

      delete: "Видалити",

      confirmDelete:
        "Видалити цього клієнта?",

      clientDeleted:
        "Клієнта успішно видалено",

      failedDelete:
        "Не вдалося видалити клієнта",

      failedLoad:
        "Не вдалося завантажити клієнтів",

      invalidResponse:
        "Некоректна відповідь сервера",
    },

    en: {
      back: "Back",
      clients: "Clients",
      manageClients:
        "Manage your consulting clients",

      addClient: "Add Client",

      searchClients:
        "Search clients...",

      noClients:
        "No clients found",

      createFirst:
        "Create your first consulting client",

      addFirst:
        "Add First Client",

      active: "Active",

      edit: "Edit",

      delete: "Delete",

      confirmDelete:
        "Delete this client?",

      clientDeleted:
        "Client deleted successfully",

      failedDelete:
        "Failed to delete client",

      failedLoad:
        "Failed to load clients",

      invalidResponse:
        "Invalid response from backend",
    },
  };

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchClients = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/clients`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setClients(data);
        } else {
          toast.error(
            t[language].invalidResponse
          );
        }
      } catch (error) {
        console.log(error);

        toast.error(
          t[language].failedLoad
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);
    const handleDelete = async (id: string) => {
    if (!window.confirm(t[language].confirmDelete)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/clients/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setClients((prev) =>
        prev.filter((client) => client.id !== id)
      );

      toast.success(t[language].clientDeleted);
    } catch (error) {
      console.error(error);

      toast.error(t[language].failedDelete);
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      client.service
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h2 className="text-2xl animate-pulse">
          Loading...
        </h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-10">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-zinc-700 rounded-xl hover:bg-zinc-900 transition"
        >
          ← {t[language].back}
        </button>

        <div className="flex items-center gap-3">

          {user?.role === "admin" && (
            <Link
              href="/add-client"
              className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:opacity-80 transition"
            >
              {t[language].addClient}
            </Link>
          )}

          <LanguageSwitcher />

        </div>

      </div>

      <h1 className="text-4xl font-bold">
        {t[language].clients}
      </h1>

      <p className="text-zinc-400 mt-2 mb-8">
        {t[language].manageClients}
      </p>

      <input
        type="text"
        placeholder={t[language].searchClients}
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 mb-10 outline-none"
      />

      {filteredClients.length === 0 ? (

        <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center bg-zinc-950">

          <h2 className="text-3xl font-bold mb-4">
            {t[language].noClients}
          </h2>

          <p className="text-zinc-400 mb-8">
            {t[language].createFirst}
          </p>

          {user?.role === "admin" && (

            <Link
              href="/add-client"
              className="inline-block bg-white text-black px-4 py-3 rounded-xl hover:opacity-80 transition"
            >
              {t[language].addFirst}
            </Link>

          )}

        </div>

      ) : (

        <div className="grid gap-6">

          {filteredClients.map((client) => (

            <div
              key={client.id}
              className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6 hover:border-white transition-all duration-300"
            >

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

                <div>

                  <h2 className="text-2xl font-bold">
                    {client.name}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {client.service}
                  </p>

                </div>

                <div className="flex items-center gap-4 flex-wrap">

                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                    {t[language].active}
                  </span>

                  {user?.role === "admin" && (
                    <>
                      <Link
                        href={`/edit-client?id=${client.id}`}
                        className="text-blue-400 hover:text-blue-300 transition"
                      >
                        {t[language].edit}
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(client.id)
                        }
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        {t[language].delete}
                      </button>
                    </>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}