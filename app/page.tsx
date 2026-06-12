"use client";

import { useEffect, useState } from "react";
import LanguageSwitcher from "./components/LanguageSwitcher";

export default function Home() {
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
      features: "Можливості",
      pricing: "Ціни",
      contact: "Контакти",

      subtitle:
        "Сучасна SaaS-платформа для консультантів, агентств та експертів.",

      getStarted: "Розпочати",
      learnMore: "Дізнатися більше",

      clientManagement: "Управління клієнтами",
      clientManagementDesc:
        "Організовуйте клієнтів, зустрічі та робочі процеси в одному місці.",

      analytics: "Аналітика",
      analyticsDesc:
        "Відстежуйте продуктивність і розвиток бізнесу в режимі реального часу.",

      securePlatform: "Безпечна платформа",
      securePlatformDesc:
        "Захищена автентифікація та безпечне керування даними клієнтів.",
    },

    en: {
      features: "Features",
      pricing: "Pricing",
      contact: "Contact",

      subtitle:
        "Modern SaaS platform for consultants, agencies and experts.",

      getStarted: "Get Started",
      learnMore: "Learn More",

      clientManagement: "Client Management",
      clientManagementDesc:
        "Organize clients, meetings and workflows in one place.",

      analytics: "Analytics",
      analyticsDesc:
        "Track performance and business growth with real-time analytics.",

      securePlatform: "Secure Platform",
      securePlatformDesc:
        "Protected authentication and secure client data management.",
    },
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-zinc-900">
        <h2 className="text-xl font-bold">
          Consulting Platform
        </h2>

        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-zinc-400">
            <a
              href="#"
              className="hover:text-white transition"
            >
              {t[language].features}
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              {t[language].pricing}
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              {t[language].contact}
            </a>
          </nav>

          <LanguageSwitcher />
        </div>
      </header>

      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-6xl font-bold mb-6">
          Consulting Platform
        </h1>

        <p className="text-zinc-400 text-xl max-w-2xl mb-8">
          {t[language].subtitle}
        </p>

        <div className="flex gap-4">
          <a
          
    href="/login"
    className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80 transition"
  >
    {language === "uk" ? "Увійти" : "Sign In"}
  </a>

  <a
    href="/register"
    className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold hover:bg-zinc-900 transition"
  >
    {language === "uk" ? "Зареєструватися" : "Sign Up"}
  </a>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl">
          <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
            <h3 className="text-2xl font-semibold mb-3">
              {t[language].clientManagement}
            </h3>

            <p className="text-zinc-400">
              {t[language].clientManagementDesc}
            </p>
          </div>

          <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
            <h3 className="text-2xl font-semibold mb-3">
              {t[language].analytics}
            </h3>

            <p className="text-zinc-400">
              {t[language].analyticsDesc}
            </p>
          </div>

          <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
            <h3 className="text-2xl font-semibold mb-3">
              {t[language].securePlatform}
            </h3>

            <p className="text-zinc-400">
              {t[language].securePlatformDesc}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}