"use client";

import { useEffect, useState } from "react";

const translations = {
  en: {
    features: "Features",
    pricing: "Pricing",
    contact: "Contact",

    badge: "Modern Solution for Modern Consultants",
    brand: "Smart Consulting",
    heroTitle: "Platform for",
    heroHighlight: "modern consulting",
    brand: "Smart Consulting",
    consulting: "Consulting",
    platform: "Platform",

    description:
      "A modern SaaS platform that helps consultants, agencies and experts manage clients, projects, tasks and analytics in one secure place.",

    signIn: "Sign In",
    signUp: "Sign Up",

    secure: "Secure & Reliable",
    fast: "Fast & Efficient",
    data: "Data-Driven",

    dashboard: "Dashboard",
    clients: "Clients",
    projects: "Projects",
    tasks: "Tasks",
    analytics: "Analytics",
    settings: "Settings",

    thisMonth: "This Month",

    totalClients: "Total Clients",
    totalProjects: "Total Projects",
    totalRevenue: "Total Revenue",
    tasksCompleted: "Tasks Completed",
    vsLastMonth: "vs last month",

    revenue: "Revenue Overview",
    projectStatus: "Project Status",

    total: "Total",
    completed: "Completed",
    inProgress: "In Progress",
    onHold: "On Hold",

    learnMore: "Learn more",
  },

  uk: {
    features: "Можливості",
    pricing: "Ціни",
    contact: "Контакти",

    badge: "Сучасне рішення для сучасних консультантів",
    brand: "Smart Consulting",
    heroTitle: "Платформа для",
    heroHighlight: "сучасного консалтингу",
    brand: "Розумний консалтинг",
    consulting: "Консалтингова",
    platform: "Платформа",

    description:
      "Сучасна SaaS-платформа, яка допомагає консультантам, агенціям та експертам керувати клієнтами, проєктами, завданнями й аналітикою в одному захищеному місці.",

    signIn: "Увійти",
    signUp: "Зареєструватися",

    secure: "Безпечно та надійно",
    fast: "Швидко та ефективно",
    data: "На основі даних",

    dashboard: "Панель керування",
    clients: "Клієнти",
    projects: "Проєкти",
    tasks: "Завдання",
    analytics: "Аналітика",
    settings: "Налаштування",

    thisMonth: "Цього місяця",

    totalClients: "Всього клієнтів",
    totalProjects: "Всього проєктів",
    totalRevenue: "Загальний дохід",
    tasksCompleted: "Виконано завдань",
    vsLastMonth: "порівняно з минулим місяцем",

    revenue: "Огляд доходів",
    projectStatus: "Статус проєктів",

    total: "Всього",
    completed: "Завершено",
    inProgress: "У процесі",
    onHold: "Призупинено",

    learnMore: "Дізнатися більше",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }

    const handleLanguageChange = () => {
      const current = localStorage.getItem("language");

      if (current === "uk" || current === "en") {
        setLanguage(current);
      }
    };

    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  const t = (key: TranslationKey) => translations[language][key];

  return {
    language,
    t,
  };
}



