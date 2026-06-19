"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

import { useEffect, useState } from "react"

import toast from "react-hot-toast"

export default function ClientsPage() {
  const router = useRouter();

  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [user, setUser] = useState<any>(null)
const [language, setLanguage] =
  useState<"uk" | "en">("uk")

useEffect(() => {
  const saved = localStorage.getItem("language")

  if (saved === "uk" || saved === "en") {
    setLanguage(saved)
  }
}, [])

const t = {
  uk: {
    clients: "Клієнти",
    manageClients: "Керуйте своїми клієнтами",
    addClient: "Додати клієнта",
    searchClients: "Пошук клієнтів...",
    noClients: "Клієнтів не знайдено",
    createFirst: "Створіть свого першого клієнта",
    addFirst: "Додати першого клієнта",
    active: "Активний",
    edit: "Редагувати",
    delete: "Видалити",
  },

  en: {
    clients: "Clients",
    manageClients: "Manage your consulting clients",
    addClient: "Add Client",
    searchClients: "Search clients...",
    noClients: "No clients found",
    createFirst: "Create your first consulting client",
    addFirst: "Add First Client",
    active: "Active",
    edit: "Edit",
    delete: "Delete",
  },
}
  useEffect(() => {

    const storedUser =
      localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const fetchClients = async () => {

      try {

        const token =
          localStorage.getItem("token")

        const response = await fetch(
          "http://localhost:4000/clients",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

const data =
  await response.json()

console.log("CLIENTS API:", data)

if (Array.isArray(data)) {
  setClients(data)
} else {
  console.error("Unexpected response:", data)
  toast.error("Invalid response from backend")
  setClients([])
}

      } catch (error) {

        console.log(error)

        toast.error(
          "Failed to load clients",
        )

      } finally {

        setLoading(false)

      }
    }

    fetchClients()

  }, [])

  const handleDelete = async (
    id: string,
  ) => {

    try {

      const token =
        localStorage.getItem("token")

      await fetch(
        `http://localhost:4000/clients/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

      const updatedClients =
        clients.filter(
          (client) =>
            client.id !== id,
        )

      setClients(updatedClients)

      toast.success(
        "Client deleted",
      )

    } catch (error) {

      console.log(error)

      toast.error(
        "Failed to delete client",
      )

    }
  }

  const filteredClients =
    clients.filter(
      (client) =>
        client.name
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||

        client.service
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ),
    )

  if (loading) {
    return (

      <main className="min-h-screen bg-black text-white p-10">

        <div className="animate-pulse">

          <div className="flex justify-between items-center mb-10">

            <div>

              <div className="h-10 w-52 bg-zinc-900 rounded-xl mb-4" />

              <div className="h-5 w-72 bg-zinc-900 rounded-xl" />

            </div>

            <div className="h-12 w-36 bg-zinc-900 rounded-xl" />

          </div>

          <div className="h-14 w-full bg-zinc-900 rounded-2xl mb-8" />

          <div className="grid gap-6">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6"
              >

                <div className="h-8 w-52 bg-zinc-900 rounded-xl mb-4" />

                <div className="h-5 w-40 bg-zinc-900 rounded-xl" />

              </div>

            ))}

          </div>

        </div>

      </main>

    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <div className="w-full">

  <div className="flex justify-between items-center mb-4">

  <button
    onClick={() => router.back()}
    className="px-4 py-2 border border-zinc-700 rounded-xl hover:bg-zinc-900 transition"
  >
    ← Назад
  </button>

  <div className="flex items-center gap-3">

    {user?.role === "admin" && (
      <a
        href="/add-client"
        className="px-4 py-2 bg-white text-black rounded-xl font-medium hover:opacity-80 transition"
      >
        {t[language].addClient}
      </a>
    )}

    <LanguageSwitcher />

  </div>

</div>


      </div>

      <input
        type="text"
        placeholder={t[language].searchClients}
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full mb-8 bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
      />

      {filteredClients.length === 0 ? (

        <div className="border border-dashed border-zinc-800 rounded-2xl p-14 text-center bg-zinc-950">

          <h2 className="text-3xl font-bold mb-4">
            {t[language].noClients}
          </h2>

          <p className="text-zinc-400 mb-8">
            {t[language].createFirst}
          </p>

          {user?.role === "admin" && (

            <a
  href="/add-client"
  className="inline-block bg-white text-black px-3 py-2 rounded-xl hover:opacity-80 transition"
>
  {t[language].addFirst}
</a>

          )}

        </div>

      ) : (

        <div className="grid gap-6">

          {filteredClients.map((client) => (

            <div
              key={client.id}
              className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6 flex justify-between items-center"
            >

              <div>

                <h2 className="text-2xl font-semibold">
                  {client.name}
                </h2>

                <p className="text-zinc-400 mt-2">
                  {client.service}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <span className="text-green-400">
                 
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

          ))}

        </div>

      )}

    </main>
  )
}