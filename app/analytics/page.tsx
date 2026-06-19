"use client";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-2">
        Аналітика
      </h1>

      <p className="text-zinc-400 mb-10">
        Статистика та показники платформи
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6">
          <h3 className="text-xl font-semibold">
            Клієнти
          </h3>

          <p className="text-4xl font-bold mt-4">
            0
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6">
          <h3 className="text-xl font-semibold">
            Дохід
          </h3>

          <p className="text-4xl font-bold mt-4">
            $0
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6">
          <h3 className="text-xl font-semibold">
            Проєкти
          </h3>

          <p className="text-4xl font-bold mt-4">
            0
          </p>
        </div>
      </div>
    </main>
  );
}