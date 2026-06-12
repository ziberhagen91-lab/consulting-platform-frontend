"use client";

import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  client?: {
    id: string;
    name: string;
  };
};

interface TasksListProps {
  tasks: Task[];
}

export default function TasksList({ tasks }: TasksListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("title-asc");

  const filteredTasks = useMemo(() => {
    const result = tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "title-desc":
          return b.title.localeCompare(a.title, "uk");

        case "priority-high":
          return (
            (b.priority === "HIGH" ? 3 : b.priority === "MEDIUM" ? 2 : 1) -
            (a.priority === "HIGH" ? 3 : a.priority === "MEDIUM" ? 2 : 1)
          );

        case "priority-low":
          return (
            (a.priority === "HIGH" ? 3 : a.priority === "MEDIUM" ? 2 : 1) -
            (b.priority === "HIGH" ? 3 : b.priority === "MEDIUM" ? 2 : 1)
          );

        default:
          return a.title.localeCompare(b.title, "uk");
      }
    });

    return result;
  }, [tasks, search, statusFilter, priorityFilter, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setPriorityFilter("ALL");
    setSortBy("title-asc");
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Пошук..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[220px] rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white"
        >
          <option value="ALL">Усі статуси</option>
          <option value="TODO">📋 До виконання</option>
          <option value="IN_PROGRESS">⏳ В процесі</option>
          <option value="DONE">✅ Виконано</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white"
        >
          <option value="ALL">Усі пріоритети</option>
          <option value="LOW">🟢 Низький</option>
          <option value="MEDIUM">🟡 Середній</option>
          <option value="HIGH">🔴 Високий</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white"
        >
          <option value="title-asc">🔤 Назва (А → Я)</option>
          <option value="title-desc">🔤 Назва (Я → А)</option>
          <option value="priority-high">
            🔴 Пріоритет (високий → низький)
          </option>
          <option value="priority-low">
            🟢 Пріоритет (низький → високий)
          </option>
        </select>

        <button
          onClick={resetFilters}
          className="rounded-xl bg-red-600 px-4 py-3 text-white hover:bg-red-700 transition"
        >
          🧹 Очистити
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-zinc-400">Нічого не знайдено.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
}