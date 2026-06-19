"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-2">
        Налаштування
      </h1>

      <p className="text-zinc-400 mb-10">
        Керуйте своїм акаунтом
      </p>

      <div className="max-w-3xl border border-zinc-800 bg-zinc-950 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Профіль користувача
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-zinc-400 mb-2">
              Ім'я
            </label>

            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-2">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-2">
              Роль
            </label>

            <input
              type="text"
              value={user?.role || ""}
              readOnly
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-500"
            />
          </div>

          <button className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:opacity-80 transition">
            Зберегти зміни
          </button>
        </div>
      </div>
    </main>
  );
}