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

export default function DashboardHeader() {
  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  const [openLanguage, setOpenLanguage] =
    useState(false);

  const [openNotifications, setOpenNotifications] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const languageRef =
    useRef<HTMLDivElement>(null);

  const notificationsRef =
    useRef<HTMLDivElement>(null);

  const t = translations;

  useEffect(() => {
    const saved =
      localStorage.getItem("language");

    if (
      saved === "uk" ||
      saved === "en"
    ) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const handleClick = (
      event: MouseEvent
    ) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenLanguage(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  const changeLanguage = (
    lang: "uk" | "en"
  ) => {
    localStorage.setItem(
      "language",
      lang
    );

    setLanguage(lang);
    setOpenLanguage(false);

    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between mb-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          {t[language].headerGreeting}, Сергій! 👋
        </h1>

        <p className="text-zinc-400 mt-2">
          {t[language].headerSubtitle}
        </p>

      </div>

      <div className="flex items-center gap-3">
                {/* SECURITY */}

        <button
          className="
            flex
            items-center
            gap-2
            px-4
            py-3
            rounded-xl
            bg-[#07152e]
            border
            border-blue-900
            text-white
            hover:border-blue-500
            transition
          "
        >
          <ShieldCheck
            size={20}
            className="text-yellow-400"
          />

          <span>
            {t[language].secure}
          </span>

          <span className="w-2 h-2 rounded-full bg-green-500" />
        </button>

        {/* LANGUAGE */}

        <div
          ref={languageRef}
          className="relative"
        >
          <button
            onClick={() =>
              setOpenLanguage(!openLanguage)
            }
            className="
              flex
              items-center
              gap-2
              px-4
              py-3
              rounded-xl
              bg-[#07152e]
              border
              border-blue-900
              hover:border-blue-500
              transition
            "
          >
            <Globe size={20} />

            {language.toUpperCase()}

            <ChevronDown
              size={16}
              className={`transition ${
                openLanguage
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {openLanguage && (
            <div
              className="
                absolute
                right-0
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
                onClick={() =>
                  changeLanguage("uk")
                }
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
                onClick={() =>
                  changeLanguage("en")
                }
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
        {/* NOTIFICATIONS */}

        <div
          ref={notificationsRef}
          className="relative"
        >
          <button
            onClick={() =>
              setOpenNotifications(
                !openNotifications
              )
            }
            className={`
              relative
              p-3
              rounded-xl
              border
              transition
              ${
                openNotifications
                  ? "bg-blue-600 border-blue-500"
                  : "bg-[#07152e] border-blue-900 hover:border-blue-500"
              }
            `}
          >
            <Bell size={22} />

            <span
              className="
                absolute
                -top-2
                -right-2
                w-6
                h-6
                rounded-full
                bg-yellow-400
                text-black
                text-xs
                font-bold
                flex
                items-center
                justify-center
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
                mt-2
                w-96
                rounded-2xl
                bg-[#07152e]
                border
                border-blue-900
                shadow-2xl
                overflow-hidden
                z-50
              "
            >
              <div
                className="
                  px-5
                  py-4
                  border-b
                  border-blue-900
                  flex
                  items-center
                  justify-between
                "
              >
                <h3 className="font-semibold text-lg">
                  {t[language].notifications}
                </h3>

                <span
                  className="
                    px-2
                    py-1
                    rounded-full
                    bg-blue-600
                    text-xs
                    font-semibold
                  "
                >
                  3
                </span>
              </div>

              <div className="divide-y divide-blue-950">

                <div className="flex gap-4 p-5 hover:bg-[#0b1d3d] transition">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-green-500/20
                      flex
                      items-center
                      justify-center
                    "
                  >
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

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-yellow-500/20
                      flex
                      items-center
                      justify-center
                    "
                  >
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

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-blue-500/20
                      flex
                      items-center
                      justify-center
                    "
                  >
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

        <div className="relative">
          <div
            className="
              flex
              items-center
              gap-2
              px-4
              py-3
              rounded-xl
              bg-[#07152e]
              border
              border-blue-900
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
              "
            />
          </div>
        </div>

      </div>

    </header>
  );
}