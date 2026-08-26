"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [language, setLanguage] =
    useState<"uk" | "en">("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLanguage =
      language === "en" ? "uk" : "en";

    localStorage.setItem("language", nextLanguage);

    setLanguage(nextLanguage);

    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="relative z-50 inline-flex shrink-0 cursor-pointer pointer-events-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.07]"
    >
      {language === "en" ? "🇬🇧 EN" : "🇺🇦 UA"}
    </button>
  );
}
