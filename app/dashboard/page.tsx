"use client"

import {
  useEffect,
  useState,
} from "react"

import { useRouter } from "next/navigation"

import toast from "react-hot-toast"

import Card from "@/app/components/Card"
import Sidebar from "@/app/components/Sidebar"
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function DashboardPage() {

  const router = useRouter()

  const [analytics, setAnalytics] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)
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
    dashboard: "Панель керування",
    welcome: "З поверненням",

    clients: "Клієнти",
    activeClients: "Активні клієнти",

    revenue: "Дохід",
    monthlyRevenue: "Місячний дохід",

    projects: "Проєкти",
    activeProjects: "Активні проєкти",

    recentActivity: "Остання активність",

    newClientAdded: "Додано нового клієнта",
    analyticsUpdated: "Аналітику оновлено",
    jwtActive: "JWT-автентифікація активна",

    justNow: "Щойно",
    live: "Наживо",
    secure: "Захищено",

    revenueAnalytics: "Аналітика доходу",
    monthlyGrowth: "Щомісячне зростання доходу",
  },

  en: {
    dashboard: "Dashboard",
    welcome: "Welcome back",

    clients: "Clients",
    activeClients: "Active clients",

    revenue: "Revenue",
    monthlyRevenue: "Monthly revenue",

    projects: "Projects",
    activeProjects: "Active projects",

    recentActivity: "Recent Activity",

    newClientAdded: "New client added",
    analyticsUpdated: "Dashboard analytics updated",
    jwtActive: "JWT authentication active",

    justNow: "Just now",
    live: "Live",
    secure: "Secure",

    revenueAnalytics: "Revenue Analytics",
    monthlyGrowth: "Monthly revenue growth",
  },
};
  const revenueData = [
    {
      month: "Jan",
      revenue: 1200,
    },
    {
      month: "Feb",
      revenue: 2100,
    },
    {
      month: "Mar",
      revenue: 1800,
    },
    {
      month: "Apr",
      revenue: 2800,
    },
    {
      month: "May",
      revenue: 3900,
    },
    {
      month: "Jun",
      revenue: 4250,
    },
  ]

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  setAnalytics({
    totalClients: 0,
    monthlyRevenue: 0,
    activeProjects: 0,
  });

  setLoading(false);
}, [router]);

  if (loading) {
    return (

      <main className="min-h-screen bg-black text-white p-10">

        <div className="animate-pulse">

          <div className="h-12 w-72 bg-zinc-900 rounded-2xl mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[1, 2, 3].map((item) => (

              <Card key={item}>

                <div className="h-6 w-32 bg-zinc-900 rounded-xl mb-4" />

                <div className="h-10 w-40 bg-zinc-900 rounded-xl" />

              </Card>

            ))}

          </div>

        </div>

      </main>

    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex">

      <Sidebar
        onLogout={() => {

          localStorage.removeItem(
            "token",
          )

          localStorage.removeItem(
            "user",
          )

          toast.success(
            "Logged out",
          )

          router.push("/login")

        }}
      />

      <section className="flex-1 p-10">

        <header className="flex justify-between items-center mb-10">
  <div>
    
    <h2 className="text-4xl font-bold">
      {t[language].dashboard}
    </h2>

    <p className="text-zinc-400 mt-2">
      {t[language].welcome}, Sergey 👋
    </p>
  </div>

<LanguageSwitcher />
</header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card className="hover:border-white hover:-translate-y-1 transition duration-300">

            <h3 className="text-xl font-semibold mb-2">
              {t[language].clients}
            </h3>

            <p className="text-4xl font-bold">
              {analytics?.totalClients || 0}
            </p>

            <p className="text-zinc-400 mt-2">
            
  {t[language].activeClients}

            </p>

          </Card>

          <Card className="hover:border-white hover:-translate-y-1 transition duration-300">

            <h3 className="text-xl font-semibold mb-2">
              
  {t[language].revenue}

            </h3>

            <p className="text-4xl font-bold">
              $
              {analytics?.monthlyRevenue || 0}
            </p>

            <p className="text-zinc-400 mt-2">
              {t[language].monthlyRevenue}
            </p>

          </Card>

          <Card className="hover:border-white hover:-translate-y-1 transition duration-300">

            <h3 className="text-xl font-semibold mb-2">
              {t[language].projects}
            </h3>

            <p className="text-4xl font-bold">
              {analytics?.activeProjects || 0}
            </p>

            <p className="text-zinc-400 mt-2">
              
  {t[language].activeProjects}
</p>

          </Card>

        </div>

        <Card className="mt-10">

          <h3 className="text-2xl font-semibold mb-6">
            {t[language].recentActivity}
          </h3>

          <div className="flex flex-col gap-4">

            <div className="flex justify-between border-b border-zinc-900 pb-4">

              <p>
                {t[language].newClientAdded}
              </p>

              <span className="text-zinc-500">
                {t[language].justNow}
              </span>

            </div>

            <div className="flex justify-between border-b border-zinc-900 pb-4">

              <p>
                {t[language].analyticsUpdated}
              </p>

              <span className="text-zinc-500">
                
  {t[language].live}
</span>

            </div>

            <div className="flex justify-between">

              <p>
                {t[language].jwtActive}
              </p>

              <span className="text-zinc-500">
               {t[language].secure}
              </span>

            </div>

          </div>

        </Card>

        <Card className="mt-10">

          <div className="flex justify-between items-center mb-8">

            <div>

<h3 className="text-2xl font-semibold">
  {t[language].revenueAnalytics}
</h3>

<p className="text-zinc-400 mt-2">
  {t[language].monthlyGrowth}
</p>
              

            </div>

          </div>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={revenueData}>

                <XAxis
                  dataKey="month"
                  stroke="#71717a"
                />

                <YAxis
                  stroke="#71717a"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ffffff"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </section>

    </main>
  )
}