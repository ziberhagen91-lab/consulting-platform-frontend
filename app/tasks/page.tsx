import Link from "next/link";

export default function TasksPage() {
  const tasks: any[] = [];

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">
              Завдання
            </h1>

            <p className="text-zinc-400 mt-1">
              Всього завдань: 0
            </p>
          </div>

          <Link
            href="/add-task"
            className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:opacity-80 transition"
          >
            + Додати завдання
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl">📋</p>
            <p className="text-sm text-zinc-400">
              До виконання
            </p>
            <p className="text-xl font-bold">0</p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl">⏳</p>
            <p className="text-sm text-zinc-400">
              В процесі
            </p>
            <p className="text-xl font-bold">0</p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl">✅</p>
            <p className="text-sm text-zinc-400">
              Виконано
            </p>
            <p className="text-xl font-bold">0</p>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Завдань поки немає
          </h2>

          <p className="text-zinc-400">
            Створіть перше завдання для початку роботи.
          </p>
        </div>
      </div>
    </main>
  );
}