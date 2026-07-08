"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage =
      language === "uk" ? "en" : "uk";

    localStorage.setItem(
      "language",
      newLanguage
    );

    setLanguage(newLanguage);

    window.location.reload();
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 font-medium text-white transition-all duration-300 hover:border-white hover:bg-zinc-800"
    >
      {language === "uk"
        ? "🇺🇦 UA"
        : "🇬🇧 EN"}
    </button>
  );
}