"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  BriefcaseBusiness,
  ChevronDown,
  MoreVertical,
  Pencil,
  Search,
  Trash2,
  UserCheck,
  UserRound,
  UserX,
} from "lucide-react";

import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { translations } from "@/lib/translations";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type Client = {
  id: string;
  name: string;
  service: string;
};

type User = {
  name: string;
  role: string;
};

type SortOption = "name" | "service";

export default function ClientsPage() {
  const router = useRouter();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  const [sortBy, setSortBy] =
    useState<SortOption>("name");

  const [sortOpen, setSortOpen] =
    useState(false);

  const t = translations;

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    const fetchClients = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/clients`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setClients(data);
        } else {
          toast.error(
            t[language].invalidResponse
          );
        }
      } catch (error) {
        console.error(error);

        toast.error(
          t[language].failedLoad
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        t[language].confirmDelete
      )
    ) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/clients/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      setClients((prev) =>
        prev.filter(
          (client) => client.id !== id
        )
      );

      setOpenMenu(null);

      toast.success(
        t[language].clientDeleted
      );
    } catch (error) {
      console.error(error);

      toast.error(
        t[language].failedDelete
      );
    }
  };

  const filteredClients = useMemo(() => {
    const query =
      search.toLowerCase().trim();

    const result = clients.filter(
      (client) => {
        if (!query) {
          return true;
        }

        return (
          client.name
            .toLowerCase()
            .includes(query) ||
          client.service
            .toLowerCase()
            .includes(query)
        );
      }
    );

    return [...result].sort((a, b) => {
      if (sortBy === "service") {
        return a.service.localeCompare(
          b.service
        );
      }

      return a.name.localeCompare(
        b.name
      );
    });
  }, [clients, search, sortBy]);

  const activeCount = clients.length;
  const inactiveCount = 0;

  const sortLabel =
    sortBy === "name"
      ? language === "uk"
        ? "За ім'ям"
        : "By name"
      : language === "uk"
        ? "За послугою"
        : "By service";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020817] text-white flex items-center justify-center">
        <div className="text-center">
          <div
            className="
              w-10
              h-10
              border-4
              border-blue-500/20
              border-t-blue-500
              rounded-full
              animate-spin
              mx-auto
              mb-4
            "
          />

          <p className="text-zinc-500">
            {language === "uk"
              ? "Завантаження..."
              : "Loading..."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#020817]
        text-white
      "
      onClick={() => setOpenMenu(null)}
    >
      <div
        className="
          w-full
          max-w-[1600px]
          mx-auto
          px-5
          py-7
          md:px-8
          lg:px-10
          xl:px-12
        "
      >

        {/* TOP BAR */}
        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
            mb-10
          "
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.back();
            }}
            className="
              w-fit
              inline-flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              border
              border-blue-900/60
              bg-[#050b18]
              text-sm
              text-zinc-200
              hover:bg-blue-950/40
              hover:border-blue-600/60
              transition-all
            "
          >
            <ArrowLeft size={17} />
            {t[language].back}
          </button>

          <div className="flex items-center gap-3">
            {user?.role === "admin" && (
              <Link
                href="/add-client"
                onClick={(e) =>
                  e.stopPropagation()
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-xl
                  bg-blue-600
                  text-white
                  text-sm
                  font-semibold
                  shadow-lg
                  shadow-blue-600/20
                  hover:bg-blue-500
                  hover:-translate-y-0.5
                  transition-all
                "
              >
                <span className="text-lg leading-none">
                  +
                </span>

                {t[language].addClient}
              </Link>
            )}

            <LanguageSwitcher />
          </div>
        </div>

        {/* HEADER */}
        <section className="mb-9">
          <div className="flex items-start gap-4">
            <div
              className="
                hidden
                sm:flex
                w-12
                h-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-blue-500/20
                bg-blue-500/10
                text-blue-400
              "
            >
              <UserRound size={24} />
            </div>

            <div>
              <h1
                className="
                  text-4xl
                  md:text-5xl
                  font-bold
                  tracking-tight
                  leading-none
                "
              >
                {t[language].clients}
              </h1>

              <p
                className="
                  mt-3
                  text-base
                  md:text-lg
                  text-zinc-400
                "
              >
                {t[language].manageClients}
              </p>
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            mb-7
          "
        >

          {/* TOTAL */}
          <div
            className="
              group
              rounded-2xl
              border
              border-blue-900/50
              bg-[#05070d]
              p-5
              hover:border-blue-600/60
              hover:bg-[#071126]
              transition-all
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p className="text-sm text-zinc-500">
                  {language === "uk"
                    ? "Всього клієнтів"
                    : "Total clients"}
                </p>

                <p
                  className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    mt-2
                  "
                >
                  {clients.length}
                </p>
              </div>

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-blue-500/10
                  border
                  border-blue-500/20
                  text-blue-400
                  group-hover:bg-blue-500/15
                  transition
                "
              >
                <UserRound size={21} />
              </div>
            </div>
          </div>

          {/* ACTIVE */}
          <div
            className="
              group
              rounded-2xl
              border
              border-emerald-900/40
              bg-[#05070d]
              p-5
              hover:border-emerald-700/50
              hover:bg-[#07120f]
              transition-all
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p className="text-sm text-zinc-500">
                  {language === "uk"
                    ? "Активні"
                    : "Active"}
                </p>

                <p
                  className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    mt-2
                    text-emerald-400
                  "
                >
                  {activeCount}
                </p>
              </div>

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-emerald-500/10
                  border
                  border-emerald-500/20
                  text-emerald-400
                "
              >
                <UserCheck size={21} />
              </div>
            </div>
          </div>

          {/* INACTIVE */}
          <div
            className="
              group
              rounded-2xl
              border
              border-zinc-800
              bg-[#05070d]
              p-5
              hover:border-zinc-700
              hover:bg-[#090b10]
              transition-all
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p className="text-sm text-zinc-500">
                  {language === "uk"
                    ? "Неактивні"
                    : "Inactive"}
                </p>

                <p
                  className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    mt-2
                    text-zinc-200
                  "
                >
                  {inactiveCount}
                </p>
              </div>

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-zinc-500/10
                  border
                  border-zinc-700/40
                  text-zinc-400
                "
              >
                <UserX size={21} />
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH + SORT */}
        <section
          className="
            flex
            flex-col
            lg:flex-row
            gap-3
            mb-7
          "
        >
          <div className="relative flex-1">
            <Search
              size={19}
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
            />

            <input
              type="text"
              placeholder={
                t[language].searchClients
              }
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                w-full
                h-14
                pl-14
                pr-5
                rounded-2xl
                bg-[#05070d]
                border
                border-blue-900/50
                text-white
                placeholder:text-zinc-600
                outline-none
                focus:border-blue-500/70
                focus:ring-2
                focus:ring-blue-500/10
                transition-all
              "
            />
          </div>

          {/* SORT */}
          <div
            className="
              relative
              w-full
              lg:w-52
            "
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSortOpen(
                  (prev) => !prev
                );
              }}
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                bg-[#05070d]
                border
                border-blue-900/50
                flex
                items-center
                justify-between
                gap-3
                text-sm
                text-zinc-300
                hover:border-blue-600/60
                transition-all
              "
            >
              <span>
                {sortLabel}
              </span>

              <ChevronDown
                size={17}
                className={`
                  text-zinc-500
                  transition-transform
                  ${
                    sortOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {sortOpen && (
              <div
                onClick={(e) =>
                  e.stopPropagation()
                }
                className="
                  absolute
                  top-[calc(100%+8px)]
                  left-0
                  right-0
                  z-40
                  rounded-xl
                  border
                  border-blue-900/60
                  bg-[#071126]
                  p-1.5
                  shadow-2xl
                  shadow-black/50
                "
              >
                <button
                  onClick={() => {
                    setSortBy("name");
                    setSortOpen(false);
                  }}
                  className="
                    w-full
                    text-left
                    px-3
                    py-2.5
                    rounded-lg
                    text-sm
                    hover:bg-blue-500/10
                    hover:text-blue-400
                    transition
                  "
                >
                  {language === "uk"
                    ? "За ім'ям"
                    : "By name"}
                </button>

                <button
                  onClick={() => {
                    setSortBy("service");
                    setSortOpen(false);
                  }}
                  className="
                    w-full
                    text-left
                    px-3
                    py-2.5
                    rounded-lg
                    text-sm
                    hover:bg-blue-500/10
                    hover:text-blue-400
                    transition
                  "
                >
                  {language === "uk"
                    ? "За послугою"
                    : "By service"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* RESULT COUNT */}
        <div
          className="
            flex
            items-center
            justify-between
            mb-5
          "
        >
          <p className="text-sm text-zinc-500">
            {filteredClients.length}{" "}
            {language === "uk"
              ? "клієнтів"
              : "clients"}
          </p>

          {search && (
            <button
              onClick={() =>
                setSearch("")
              }
              className="
                text-sm
                text-blue-400
                hover:text-blue-300
                transition
              "
            >
              {language === "uk"
                ? "Очистити пошук"
                : "Clear search"}
            </button>
          )}
        </div>

        {/* EMPTY */}
        {filteredClients.length === 0 ? (
          <div
            className="
              min-h-[330px]
              flex
              flex-col
              items-center
              justify-center
              text-center
              rounded-2xl
              border
              border-dashed
              border-blue-900/60
              bg-[#05070d]
              px-6
            "
          >
            <div
              className="
                w-14
                h-14
                rounded-2xl
                flex
                items-center
                justify-center
                bg-blue-500/10
                border
                border-blue-500/20
                text-blue-400
                mb-5
              "
            >
              <UserRound size={26} />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              {t[language].noClients}
            </h2>

            <p className="text-zinc-500 mb-7">
              {t[language].createFirst}
            </p>

            {user?.role === "admin" && (
              <Link
                href="/add-client"
                className="
                  px-5
                  py-3
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-500
                  font-semibold
                  transition
                "
              >
                {t[language].addFirst}
              </Link>
            )}
          </div>
        ) : (

          /* CLIENT GRID */
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-5
            "
          >
            {filteredClients.map(
              (client) => (
                <div
                  key={client.id}
                  className="
                    group
                    relative
                    min-h-[220px]
                    rounded-2xl
                    border
                    border-blue-900/50
                    bg-[#05070d]
                    p-6
                    overflow-visible
                    hover:border-blue-600/60
                    hover:bg-[#071126]
                    hover:-translate-y-1
                    hover:shadow-xl
                    hover:shadow-blue-950/20
                    transition-all
                    duration-300
                  "
                >

                  {/* CARD HEADER */}
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div
                      className="
                        w-14
                        h-14
                        shrink-0
                        rounded-2xl
                        bg-blue-500/10
                        border
                        border-blue-500/20
                        flex
                        items-center
                        justify-center
                        text-xl
                        font-bold
                        text-blue-400
                        group-hover:bg-blue-500/15
                        group-hover:border-blue-500/30
                        transition
                      "
                    >
                      {client.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    {user?.role ===
                      "admin" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          setOpenMenu(
                            openMenu ===
                              client.id
                              ? null
                              : client.id
                          );
                        }}
                        className="
                          w-9
                          h-9
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          text-zinc-500
                          hover:text-white
                          hover:bg-white/5
                          transition
                        "
                        aria-label="Client actions"
                      >
                        <MoreVertical
                          size={20}
                        />
                      </button>
                    )}
                  </div>

                  {/* CLIENT INFO */}
                  <div className="mt-6">
                    <h2
                      className="
                        text-xl
                        font-bold
                        tracking-tight
                        truncate
                      "
                    >
                      {client.name}
                    </h2>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mt-2
                        text-zinc-500
                      "
                    >
                      <BriefcaseBusiness
                        size={15}
                      />

                      <p
                        className="
                          text-sm
                          truncate
                        "
                      >
                        {client.service}
                      </p>
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div
                    className="
                      absolute
                      left-6
                      right-6
                      bottom-5
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-1.5
                        rounded-full
                        bg-emerald-500/10
                        border
                        border-emerald-500/20
                        text-emerald-400
                        text-xs
                        font-medium
                      "
                    >
                      <span
                        className="
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-emerald-400
                          shadow-sm
                          shadow-emerald-400/50
                        "
                      />

                      {t[language].active}
                    </span>

                    <span
                      className="
                        text-xs
                        text-zinc-600
                        group-hover:text-zinc-400
                        transition
                      "
                    >
                      {language === "uk"
                        ? "Клієнт"
                        : "Client"}
                    </span>
                  </div>

                  {/* ACTION MENU */}
                  {openMenu ===
                    client.id && (
                    <div
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                      className="
                        absolute
                        right-5
                        top-16
                        z-50
                        w-44
                        rounded-xl
                        border
                        border-blue-900/60
                        bg-[#071126]
                        p-1.5
                        shadow-2xl
                        shadow-black/50
                      "
                    >
                      <Link
                        href={`/edit-client?id=${client.id}`}
                        onClick={() =>
                          setOpenMenu(null)
                        }
                        className="
                          flex
                          items-center
                          gap-3
                          px-3
                          py-2.5
                          rounded-lg
                          text-sm
                          text-zinc-300
                          hover:bg-blue-500/10
                          hover:text-blue-400
                          transition
                        "
                      >
                        <Pencil size={15} />
                        {t[language].edit}
                      </Link>

                      <div className="h-px bg-white/5 my-1" />

                      <button
                        onClick={() =>
                          handleDelete(
                            client.id
                          )
                        }
                        className="
                          w-full
                          flex
                          items-center
                          gap-3
                          px-3
                          py-2.5
                          rounded-lg
                          text-sm
                          text-red-400
                          hover:bg-red-500/10
                          transition
                        "
                      >
                        <Trash2 size={15} />
                        {t[language].delete}
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}
