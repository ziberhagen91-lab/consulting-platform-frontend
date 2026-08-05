"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import Card from "@/app/components/Card";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import { translations } from "@/lib/translations";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function DashboardPage() {

  const router = useRouter();

  const [analytics, setAnalytics] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");


  useEffect(() => {

    const saved =
      localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }

  }, []);


  const t = translations;


  const revenueData = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 2100 },
    { month: "Mar", revenue: 1800 },
    { month: "Apr", revenue: 2800 },
    { month: "May", revenue: 3900 },
    { month: "Jun", revenue: 4250 },
  ];


  useEffect(() => {

    const loadAnalytics = async () => {

      const token = localStorage.getItem("token");


      if (!token) {
        router.push("/login");
        return;
      }


      try {

        const [
          analyticsResponse,
          statsResponse
        ] = await Promise.all([

          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/analytics`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          ),


          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          ),

        ]);


        if (
          !analyticsResponse.ok ||
          !statsResponse.ok
        ) {
          throw new Error(
            "Failed to load dashboard"
          );
        }


        const analyticsData =
          await analyticsResponse.json();


        const statsData =
          await statsResponse.json();


        setAnalytics(analyticsData);
        setStats(statsData);


      } catch(error) {

        console.error(error);

        toast.error(
          "Failed to load analytics"
        );


      } finally {

        setLoading(false);

      }

    };


    loadAnalytics();


  }, [router]);
    if (loading) {

    return (
      <main className="
        min-h-screen
        bg-[#020817]
        text-white
        p-10
      ">

        <div className="animate-pulse">

          <div className="
            h-12
            w-72
            bg-blue-950
            rounded-2xl
            mb-10
          " />


          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
          ">

            {[1,2,3,4].map((item)=>(
              <Card key={item}>

                <div className="
                  h-6
                  w-32
                  bg-blue-950
                  rounded-xl
                  mb-4
                " />


                <div className="
                  h-10
                  w-40
                  bg-blue-950
                  rounded-xl
                " />

              </Card>
            ))}

          </div>

        </div>

      </main>
    );

  }



  return (

    <main className="
      min-h-screen
      bg-[#020817]
      text-white
      flex
      flex-col
      md:flex-row
    ">


      <Sidebar

        onLogout={() => {

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          toast.success("Logged out");

          router.push("/login");

        }}

      />



      <section className="
        flex-1
        p-4
        md:p-10
      ">


        <DashboardHeader />


        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
        ">


          <Card className="
            hover:border-blue-500
            hover:-translate-y-1
            transition
          ">

            <h3 className="
              text-xl
              font-semibold
              mb-2
            ">

              {t[language].clients}

            </h3>


            <p className="
              text-4xl
              font-bold
            ">

              {stats?.clients || 0}

            </p>


            <p className="
              text-zinc-400
              mt-2
            ">

              {t[language].activeClients}

            </p>

          </Card>




          <Card className="
            hover:border-blue-500
            hover:-translate-y-1
            transition
          ">

            <h3 className="
              text-xl
              font-semibold
              mb-2
            ">

              {t[language].tasks}

            </h3>


            <p className="
              text-4xl
              font-bold
            ">

              {stats?.tasks || 0}

            </p>


            <p className="
              text-zinc-400
              mt-2
            ">

              {t[language].totalTasks}

            </p>

          </Card>
                    <Card className="
            hover:border-blue-500
            hover:-translate-y-1
            transition
          ">

            <h3 className="
              text-xl
              font-semibold
              mb-2
            ">

              {t[language].projects}

            </h3>


            <p className="
              text-4xl
              font-bold
            ">

              {stats?.projects || 0}

            </p>


            <p className="
              text-zinc-400
              mt-2
            ">

              {t[language].activeProjects}

            </p>

          </Card>




          <Card className="
            hover:border-blue-500
            hover:-translate-y-1
            transition
          ">

            <h3 className="
              text-xl
              font-semibold
              mb-2
            ">

              {t[language].completedTasks}

            </h3>


            <p className="
              text-4xl
              font-bold
            ">

              {stats?.completedTasks || 0}

            </p>


            <p className="
              text-zinc-400
              mt-2
            ">

              {t[language].completedTasksDesc}

            </p>

          </Card>


        </div>




        <Card className="mt-10">

          <h3 className="
            text-2xl
            font-semibold
            mb-6
          ">

            {t[language].recentActivity}

          </h3>



          <div className="
            flex
            flex-col
            gap-4
          ">


            {stats?.recentActivity?.length ? (

              stats.recentActivity.map(
                (activity:any,index:number)=>(

                  <div
                    key={index}
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:justify-between
                      gap-2
                      border-b
                      border-blue-950
                      pb-4
                    "
                  >

                    <p>

                      {activity.type === "client" &&
                        `${t[language].newClient} "${activity.name}"`
                      }


                      {activity.type === "project" &&
                        `${t[language].newProject} "${activity.name}"`
                      }


                      {activity.type === "task" &&
                        `${t[language].newTask} "${activity.name}"`
                      }

                    </p>


                    <span className="
                      text-zinc-500
                    ">

                      {
                        new Date(
                          activity.createdAt
                        ).toLocaleDateString()
                      }

                    </span>


                  </div>

                )

              )

            ) : (

              <p className="text-zinc-500">

                {t[language].noRecentActivity}

              </p>

            )}


          </div>

        </Card>





        <Card className="mt-10">


          <h3 className="
            text-2xl
            font-semibold
            mb-2
          ">

            {t[language].revenueAnalytics}

          </h3>


          <p className="
            text-zinc-400
            mb-8
          ">

            {t[language].monthlyGrowth}

          </p>



          <div className="
            h-[300px]
          ">


            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={revenueData}>


                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                />


                <YAxis
                  stroke="#64748b"
                />


                <Tooltip />


                <Line

                  type="monotone"

                  dataKey="revenue"

                  stroke="#facc15"

                  strokeWidth={3}

                />


              </LineChart>


            </ResponsiveContainer>


          </div>


        </Card>



      </section>


    </main>

  );

}