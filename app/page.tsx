"use client";

import Link from "next/link";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useLanguage } from "./components/translations";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FolderKanban,
  Layout,
  Lock,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen overflow-hidden bg-[#05060b] text-white">

      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[45%] top-[15%] h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[160px]" />
        <div className="absolute right-[-100px] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[170px]" />
        <div className="absolute left-[10%] top-[40%] h-[300px] w-[300px] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#101225_0%,#05060b_45%,#030407_100%)]" />
      </div>


      {/* ========================================================= */}
      {/* NAVBAR */}
      {/* ========================================================= */}

      <header className="border-b border-white/[0.07]">
        <div className="mx-auto flex h-[72px] max-w-[1380px] items-center justify-between px-6 lg:px-10">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            
            <img
              src="/logo.png"
              alt="Consulting Platform"
              className="h-11 w-11 object-contain"
            />

            <span className="text-lg font-semibold tracking-tight">
              {t("brand")}
            </span>
          </Link>


          {/* NAVIGATION */}

          <nav className="hidden items-center gap-10 md:flex">

            <a
              href="#features"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              {t("features")}
            </a>

            <a
              href="#pricing"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              {t("pricing")}
            </a>

            <a
              href="#contact"
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              {t("contact")}
            </a>

            <LanguageSwitcher />

          </nav>

        </div>
      </header>


      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="mx-auto max-w-[1380px] px-6 pb-16 pt-14 lg:px-10 lg:pt-12">

        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">


          {/* LEFT */}

          <div className="relative z-10">

            {/* BADGE */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/[0.08] px-4 py-2 text-sm text-purple-200">

              <Sparkles
                size={15}
                className="text-purple-400"
              />

              {t("badge")}

            </div>


            {/* TITLE */}

            <h1 className="max-w-[620px] text-5xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[64px]">

              <span className="block text-white">
                {t("heroTitle")}
              </span>

              <span className="block bg-gradient-to-r from-purple-500 via-violet-400 to-blue-500 bg-clip-text text-transparent">
                {t("heroHighlight")}
              </span>

            </h1>


            {/* DESCRIPTION */}

            <p className="mt-7 max-w-[570px] text-lg leading-8 text-zinc-400">
              A modern SaaS platform that helps consultants, agencies
              and experts manage clients, projects, tasks and analytics
              in one secure place.
            </p>


            {/* BUTTONS */}

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/login"
                className="group flex h-14 items-center gap-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-7 font-semibold shadow-[0_10px_40px_rgba(124,58,237,0.25)] transition hover:scale-[1.02] hover:shadow-[0_15px_50px_rgba(124,58,237,0.4)]"
              >
                {t("signIn")}

                <ArrowRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />
              </Link>


              <Link
                href="/register"
                className="flex h-14 items-center rounded-xl border border-white/20 bg-white/[0.02] px-8 font-semibold transition hover:bg-white/[0.07]"
              >
                {t("signUp")}
              </Link>

            </div>


            {/* BENEFITS */}

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">

              <div className="flex items-center gap-2 text-sm text-zinc-400">

                <ShieldCheck
                  size={19}
                  className="text-purple-500"
                />

                {t("secure")}

              </div>


              <div className="flex items-center gap-2 text-sm text-zinc-400">

                <Zap
                  size={19}
                  className="text-purple-500"
                />

                {t("fast")}

              </div>


              <div className="flex items-center gap-2 text-sm text-zinc-400">

                <BarChart3
                  size={19}
                  className="text-purple-500"
                />

                {t("data")}

              </div>

            </div>

          </div>


          {/* ===================================================== */}
          {/* DASHBOARD PREVIEW */}
          {/* ===================================================== */}

          <div className="relative">

            {/* glow */}

            <div className="absolute -inset-10 rounded-[50px] bg-purple-600/10 blur-[70px]" />

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#090b11]/95 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">

              <div className="grid min-h-[450px] grid-cols-[135px_1fr]">


                {/* SIDEBAR */}

                <div className="border-r border-white/[0.08] bg-[#070910] p-3">

                  <div className="mb-7 flex h-8 items-center px-2">

                    <div className="relative h-7 w-7">

                      <div className="absolute left-1 top-1 h-5 w-3 rotate-[25deg] rounded bg-gradient-to-br from-purple-500 to-blue-500" />

                      <div className="absolute left-3 top-0 h-6 w-3 -rotate-[15deg] rounded bg-gradient-to-br from-blue-400 to-purple-600" />

                    </div>

                  </div>


                  <DashboardNav
                    icon={<Layout size={15} />}
                    label={t("dashboard")}
                    active
                  />

                  <DashboardNav
                    icon={<Users size={15} />}
                    label={t("clients")}
                  />

                  <DashboardNav
                    icon={<FolderKanban size={15} />}
                    label={t("projects")}
                  />

                  <DashboardNav
                    icon={<ClipboardList size={15} />}
                    label={t("tasks")}
                  />

                  <DashboardNav
                    icon={<BarChart3 size={15} />}
                    label={t("analytics")}
                  />

                  <DashboardNav
                    icon={<Settings size={15} />}
                    label={t("settings")}
                  />

                </div>


                {/* MAIN */}

                <div className="p-4 sm:p-5">

                  <div className="mb-5 flex items-center justify-between">

                    <h2 className="text-lg font-semibold">
                      {t("dashboard")}
                    </h2>

                    <div className="flex items-center gap-3">

                      <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] text-zinc-300">
                        {t("thisMonth")}
                        <ChevronDown
                          size={11}
                          className="ml-2 inline"
                        />
                      </div>

                      <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 text-xs text-black sm:flex">
                        👤
                      </div>

                    </div>

                  </div>


                  {/* KPI */}

                  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">

                    <Kpi
                      title={`${t("total")} ${t("clients")}`}
                      value="128"
                      growth="+12%"
                    />

                    <Kpi
                      title={`${t("total")} ${t("projects")}`}
                      value="32"
                      growth="+8%"
                    />

                    <Kpi
                      title={t("totalRevenue")}
                      value="$24,560"
                      growth="+18%"
                    />

                    <Kpi
                      title={`${t("tasks")} ${t("completed")}`}
                      value="74%"
                      growth="+5%"
                    />

                  </div>


                  {/* CHARTS */}

                  <div className="mt-4 grid gap-3 xl:grid-cols-[1fr_175px]">


                    {/* REVENUE */}

                    <div className="rounded-xl border border-white/[0.08] bg-[#0c0f17] p-4">

                      <div className="mb-5 flex items-center justify-between">

                        <h3 className="text-sm font-semibold">
                          {t("revenue")}
                        </h3>

                        <span className="rounded-md border border-white/10 px-2 py-1 text-[9px] text-zinc-400">
                          {t("thisMonth")}
                        </span>

                      </div>


                      <div className="relative h-[190px]">

                        {/* grid */}

                        <div className="absolute inset-0 flex flex-col justify-between">

                          {[0, 1, 2, 3, 4].map((item) => (
                            <div
                              key={item}
                              className="border-t border-white/[0.05]"
                            />
                          ))}

                        </div>


                        {/* SVG chart */}

                        <svg
                          viewBox="0 0 500 190"
                          className="absolute inset-0 h-full w-full overflow-visible"
                        >

                          <defs>

                            <linearGradient
                              id="revenueFill"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#8b5cf6"
                                stopOpacity="0.4"
                              />

                              <stop
                                offset="100%"
                                stopColor="#8b5cf6"
                                stopOpacity="0"
                              />
                            </linearGradient>

                          </defs>


                          <path
                            d="M0 150 C40 148 50 130 80 120 C110 110 115 80 145 75 C175 70 180 115 215 105 C250 95 255 70 285 62 C315 55 325 90 350 85 C380 80 390 65 410 45 C435 25 455 30 500 15 L500 190 L0 190 Z"
                            fill="url(#revenueFill)"
                          />


                          <path
                            d="M0 150 C40 148 50 130 80 120 C110 110 115 80 145 75 C175 70 180 115 215 105 C250 95 255 70 285 62 C315 55 325 90 350 85 C380 80 390 65 410 45 C435 25 455 30 500 15"
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="3"
                          />


                          {[0, 80, 145, 215, 285, 350, 410, 500].map(
                            (x, index) => {
                              const y = [
                                150,
                                120,
                                75,
                                105,
                                62,
                                85,
                                45,
                                15,
                              ][index];

                              return (
                                <circle
                                  key={x}
                                  cx={x}
                                  cy={y}
                                  r="4"
                                  fill="#9f67ff"
                                  stroke="#0c0f17"
                                  strokeWidth="2"
                                />
                              );
                            },
                          )}

                        </svg>


                        <div className="absolute bottom-[-4px] left-0 right-0 flex justify-between text-[9px] text-zinc-500">

                          <span>May 1</span>
                          <span>May 7</span>
                          <span>May 14</span>
                          <span>May 21</span>
                          <span>May 28</span>

                        </div>

                      </div>

                    </div>


                    {/* PROJECT STATUS */}

                    <div className="rounded-xl border border-white/[0.08] bg-[#0c0f17] p-4">

                      <h3 className="text-sm font-semibold">
                        {t("projectStatus")}
                      </h3>


                      <div className="mt-5 flex justify-center">

                        <div className="relative h-28 w-28 rounded-full bg-[conic-gradient(#8b5cf6_0_37%,#3b82f6_37%_81%,#f59e0b_81%_100%)] p-3">

                          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#0c0f17]">

                            <span className="text-xl font-bold">
                              32
                            </span>

                            <span className="text-[9px] text-zinc-500">
                              {t("total")}
                            </span>

                          </div>

                        </div>

                      </div>


                      <div className="mt-5 space-y-2 text-[9px]">

                        <Status
                          color="bg-purple-500"
                          label={t("completed")}
                          value="12 (37%)"
                        />

                        <Status
                          color="bg-blue-500"
                          label={t("inProgress")}
                          value="14 (44%)"
                        />

                        <Status
                          color="bg-amber-400"
                          label={t("onHold")}
                          value="6 (19%)"
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ======================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      </section>

      <footer className="border-t border-white/[0.06] py-8">

        <div className="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 md:flex-row lg:px-10">

          <span>
            © 2026 Платформа для сучасного консалтингу
          </span>

          <div className="flex items-center gap-6">
            <span>Secure</span>
            <span>Reliable</span>
            <span>{t("data")}</span>
          </div>

        </div>

      </footer>

    </main>
  );
}


/* ============================================================= */
/* COMPONENTS */
/* ============================================================= */

function DashboardNav({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-2 text-[10px] ${
        active
          ? "bg-purple-600/20 text-white"
          : "text-zinc-400"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}


function Kpi({
  title,
  value,
  growth,
}: {
  title: string;
  value: string;
  growth: string;
}) {
  const { t } = useLanguage();

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0c0f17] p-3">

      <p className="text-[9px] text-zinc-500">
        {title}
      </p>

      <p className="mt-2 text-xl font-semibold">
        {value}
      </p>

      <p className="mt-1 text-[8px] text-green-400">
        {growth}
      </p>

      <p className="text-[8px] text-zinc-600">
        {t("vsLastMonth")}
      </p>

    </div>
  );
}


function Status({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2">

        <span
          className={`h-2 w-2 rounded-full ${color}`}
        />

        <span className="text-zinc-400">
          {label}
        </span>

      </div>

      <span className="text-zinc-300">
        {value}
      </span>

    </div>
  );
}


function FeatureCard({
  icon,
  iconClass,
  title,
  text,
  color,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  text: string;
  color: string;
}) {
  const { t } = useLanguage();

  return (
    <div className="group rounded-2xl border border-white/[0.1] bg-[#090b11]/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-[#0d1018]">

      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 max-w-[330px] text-sm leading-6 text-zinc-400">
        {text}
      </p>

      <div
        className={`mt-5 flex items-center gap-2 text-sm font-medium ${color}`}
      >
        {t("learnMore")}

        <ArrowRight
          size={17}
          className="transition group-hover:translate-x-1"
        />
      </div>

    </div>
  );
}


function Stat({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="border-t border-white/[0.07] p-6 text-center md:border-l md:border-t-0">

      <p className={`text-3xl font-bold ${color}`}>
        {value}
      </p>

      <p className="mt-1 text-sm text-zinc-400">
        {label}
      </p>

    </div>
  );
}
































