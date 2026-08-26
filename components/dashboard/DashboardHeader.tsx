"use client";

import { useEffect, useRef, useState } from "react";
import { translations } from "@/lib/translations";

import {
  ShieldCheck,
  Globe,
  Bell,
  CalendarDays,
  ChevronDown,
  CheckCircle2,
  FolderKanban,
  UserPlus,
} from "lucide-react";

export default function DashboardHeader({
  language,
  setLanguage,
}: {
  language: "uk" | "en";
  setLanguage: (lang: "uk" | "en") => void;
}) {
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSecurity, setOpenSecurity] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const languageRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);

  const t = translations;

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, [setLanguage]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        languageRef.current &&
        !languageRef.current.contains(target)
      ) {
        setOpenLanguage(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setOpenNotifications(false);
      }

      if (
        securityRef.current &&
        !securityRef.current.contains(target)
      ) {
        setOpenSecurity(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const changeLanguage = (lang: "uk" | "en") => {
    localStorage.setItem("language", lang);
    setLanguage(lang);
    setOpenLanguage(false);
    window.location.reload();
  };

  return (
    <header className="flex flex-col gap-3 mb-4 w-full min-w-0 max-w-full overflow-visible sm:gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

      {/* TITLE */}
      <div className="min-w-0">
        <h1 className="text-[clamp(1.35rem,7vw,2.25rem)] font-bold text-white break-words">
          {t[language].headerGreeting}, Сергій! 👋
        </h1>

        <p className="text-zinc-400 mt-1 text-sm sm:text-base">
          {t[language].headerSubtitle}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 gap-2 w-full min-w-0 sm:flex sm:w-auto sm:items-center sm:gap-2">

        {/* SECURITY — FULL WIDTH */}
        <div
          ref={securityRef}
          className="relative col-span-2 sm:col-span-1"
        >
          <button
            onClick={() => setOpenSecurity(!openSecurity)}
            className="
              flex
              w-full
              sm:w-auto
              h-12
              items-center
              justify-center
              gap-2
              px-4
              rounded-xl
              bg-[#07152e]
              border
              border-blue-900
              text-white
              hover:border-blue-500
              hover:bg-[#0b1d3d]
              transition
            "
          >
            <ShieldCheck
              size={20}
              className="text-yellow-400"
            />

            <span className="whitespace-nowrap">
              {t[language].secure}
            </span>

            <span className="w-2 h-2 rounded-full bg-green-500" />
          </button>

          {openSecurity && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-2
                w-80
                rounded-2xl
                bg-[#07152e]
                border
                border-blue-900
                shadow-2xl
                overflow-hidden
                z-50
              "
            >
              <div className="px-5 py-4 border-b border-blue-900">
                <h3 className="font-semibold text-lg">
                  🛡️{" "}
                  {language === "uk"
                    ? "Стан системи"
                    : "System Status"}
                </h3>
              </div>

              <div className="p-5 space-y-4">

                <div className="flex justify-between">
                  <span>API</span>
                  <span className="text-green-400 font-semibold">
                    ● Online
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Database</span>
                  <span className="text-green-400 font-semibold">
                    ● Connected
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>JWT</span>
                  <span className="text-green-400 font-semibold">
                    ● Active
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Version</span>
                  <span className="text-zinc-300">
                    v1.0.0
                  </span>
                </div>

                <div className="pt-4 border-t border-blue-900 text-sm text-zinc-400">
                  {language === "uk"
                    ? "Остання перевірка: щойно"
                    : "Last check: Just now"}
                </div>

              </div>
            </div>
          )}
        </div>

        {/* LANGUAGE */}
        <div
          ref={languageRef}
          className="relative"
        >
          <button
            onClick={() => setOpenLanguage(!openLanguage)}
            className="
              flex
              w-full
              sm:w-auto
              h-12
              items-center
              justify-center
              gap-2
              px-4
              rounded-xl
              bg-[#07152e]
              border
              border-blue-900
              text-white
              hover:border-blue-500
              hover:bg-[#0b1d3d]
              transition
            "
          >
            <Globe size={20} />

            <span>
              {language.toUpperCase()}
            </span>

            <ChevronDown
              size={16}
              className={`transition ${
                openLanguage ? "rotate-180" : ""
              }`}
            />
          </button>

          {openLanguage && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-2
                w-52
                rounded-xl
                bg-[#07152e]
                border
                border-blue-900
                shadow-2xl
                overflow-hidden
                z-50
              "
            >
              <button
                onClick={() => changeLanguage("uk")}
                className="
                  w-full
                  text-left
                  px-4
                  py-3
                  hover:bg-blue-900
                  transition
                "
              >
                🇺🇦 Українська
              </button>

              <button
                onClick={() => changeLanguage("en")}
                className="
                  w-full
                  text-left
                  px-4
                  py-3
                  hover:bg-blue-900
                  transition
                "
              >
                🇬🇧 English
              </button>
            </div>
          )}
        </div>

        {/* NOTIFICATIONS — COMPACT */}
        <div
          ref={notificationsRef}
          className="relative"
        >
          <button
            onClick={() =>
              setOpenNotifications(!openNotifications)
            }
            aria-label="Notifications"
            className={`
              relative
              flex
              items-center
              justify-center
              w-full
              sm:w-14
              h-12
              rounded-xl
              border
              transition
              ${
                openNotifications
                  ? "bg-blue-600 border-blue-500"
                  : "bg-[#07152e] border-blue-900 hover:border-blue-500 hover:bg-[#0b1d3d]"
              }
            `}
          >
            <Bell size={21} />

            {/* BADGE — RIGHT SIDE */}
            <span
              className="
                absolute
                right-1
                top-1
                flex
                items-center
                justify-center
                w-6
                h-6
                rounded-full
                bg-yellow-400
                text-black
                text-xs
                font-bold
              "
            >
              3
            </span>
          </button>

          {openNotifications && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-2
                w-80
                sm:w-96
                rounded-2xl
                bg-[#07152e]
                border
                border-blue-900
                shadow-2xl
                overflow-hidden
                z-50
              "
            >
              <div className="px-5 py-4 border-b border-blue-900">
                <h3 className="font-semibold text-lg">
                  {t[language].notifications}
                </h3>
              </div>

              <div className="divide-y divide-blue-950">

                <div className="flex gap-4 p-5 hover:bg-[#0b1d3d] transition">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <UserPlus
                      size={20}
                      className="text-green-400"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">
                      {t[language].newClientAdded}
                    </p>

                    <p className="text-sm text-zinc-400 mt-1">
                      2 min ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 hover:bg-[#0b1d3d] transition">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <FolderKanban
                      size={20}
                      className="text-yellow-400"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">
                      {t[language].projectUpdated}
                    </p>

                    <p className="text-sm text-zinc-400 mt-1">
                      15 min ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 hover:bg-[#0b1d3d] transition">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <CheckCircle2
                      size={20}
                      className="text-blue-400"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">
                      {t[language].taskCompleted}
                    </p>

                    <p className="text-sm text-zinc-400 mt-1">
                      1 hour ago
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* DATE */}
        <div className="relative col-span-2 sm:col-span-1">
          <div
            className="
              flex
              w-full
              sm:w-auto
              h-12
              items-center
              justify-center
              gap-2
              px-4
              rounded-xl
              bg-[#07152e]
              border
              border-blue-900
              hover:border-blue-500
              transition
            "
          >
            <CalendarDays size={20} />

            <input
              type="date"
              value={selectedDate
                .toISOString()
                .split("T")[0]}
              onChange={(e) =>
                setSelectedDate(
                  new Date(e.target.value)
                )
              }
              className="
                bg-transparent
                text-white
                outline-none
                cursor-pointer
                w-full
                sm:w-auto
              "
            />
          </div>
        </div>

      </div>
    </header>
  );
}
