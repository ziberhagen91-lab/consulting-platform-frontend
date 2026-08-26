"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { translations } from "@/lib/translations";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";


type Analytics = {
  totalClients: number;
  activeProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
};



export default function AnalyticsPage() {


  const [language, setLanguage] =
    useState<"uk" | "en">("uk");


  const [stats, setStats] =
    useState<Analytics | null>(null);




  useEffect(() => {

    const saved =
      localStorage.getItem("language");


    if(saved === "uk" || saved === "en") {

      setLanguage(saved);

    }


  }, []);





  useEffect(() => {


    const loadAnalytics = async () => {


      const token =
        localStorage.getItem("token");



      if(!token) return;




      try {


        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/analytics`,
            {
              headers:{
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );



        if(!response.ok){

          throw new Error(
            "Failed to load analytics"
          );

        }



        const data =
          await response.json();



        setStats(data);



      } catch(error){

        console.error(error);

      }


    };



    loadAnalytics();


  }, []);





  const t = translations;




  const completionRate =
    stats?.totalTasks &&
    stats.totalTasks > 0

    ? Math.round(
        (stats.completedTasks /
        stats.totalTasks) * 100
      )

    : 0;





  const taskData = [

    {
      name:t[language].todo,
      value:stats?.todoTasks || 0,
    },


    {
      name:t[language].inProgress,
      value:stats?.inProgressTasks || 0,
    },


    {
      name:t[language].done,
      value:stats?.completedTasks || 0,
    },

  ];



  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-10">


      {/* HEADER */}

      <div className="
        flex
        flex-col
        md:flex-row
        md:justify-between
        md:items-center
        gap-4
        mb-10
      ">


        <div className="flex items-center gap-4">


          <Link
            href="/dashboard"
            className="
              px-4
              py-2
              border
              border-zinc-700
              rounded-xl
              hover:bg-zinc-900
              transition
            "
          >

            ← {t[language].back}

          </Link>




          <div>


            <h1 className="text-4xl font-bold">

              {t[language].analytics}

            </h1>



            <p className="text-zinc-400 mt-2">

              {t[language].subtitle}

            </p>


          </div>


        </div>




        <LanguageSwitcher />


      </div>
            {/* CARDS */}



      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">





        {/* CLIENTS */}


        <div className="
          bg-zinc-950
          border
          border-zinc-800
          rounded-2xl
          p-6
          hover:border-white
          hover:-translate-y-1
          transition
        ">


          <p className="text-zinc-400 text-sm">

            {t[language].clients}

          </p>



          <h2 className="text-4xl font-bold mt-3">

            {stats?.totalClients || 0}

          </h2>



          <p className="text-blue-400 mt-3 font-medium">

            {t[language].active}

          </p>



          <p className="text-zinc-500 text-sm mt-1">

            {t[language].activeClients}

          </p>


        </div>





        {/* PROJECTS */}



        <div className="
          bg-zinc-950
          border
          border-zinc-800
          rounded-2xl
          p-6
          hover:border-white
          hover:-translate-y-1
          transition
        ">


          <p className="text-zinc-400 text-sm">

            {t[language].projects}

          </p>



          <h2 className="text-4xl font-bold mt-3">

            {stats?.activeProjects || 0}

          </h2>



          <p className="text-green-400 mt-3 font-medium">

            {t[language].total}

          </p>



          <p className="text-zinc-500 text-sm mt-1">

            {t[language].activeProjects}

          </p>


        </div>





        {/* TASKS */}



        <div className="
          bg-zinc-950
          border
          border-zinc-800
          rounded-2xl
          p-6
          hover:border-white
          hover:-translate-y-1
          transition
        ">


          <p className="text-zinc-400 text-sm">

            {t[language].tasks}

          </p>



          <h2 className="text-4xl font-bold mt-3">

            {stats?.totalTasks || 0}

          </h2>



          <p className="text-yellow-400 mt-3 font-medium">

            {t[language].total}

          </p>



          <p className="text-zinc-500 text-sm mt-1">

            {t[language].totalTasks}

          </p>


        </div>





        {/* COMPLETED */}



        <div className="
          bg-zinc-950
          border
          border-zinc-800
          rounded-2xl
          p-6
          hover:border-white
          hover:-translate-y-1
          transition
        ">


          <p className="text-zinc-400 text-sm">

            {t[language].completedTasks}

          </p>



          <h2 className="text-4xl font-bold mt-3">

            {stats?.completedTasks || 0}

          </h2>



          <p className="text-green-400 mt-3 font-medium">

            {completionRate}%

          </p>



          <p className="text-zinc-500 text-sm mt-1">

            {t[language].completionRate}

          </p>


        </div>



      </div>
            {/* TASK CHART */}



      <div className="
        mt-10
        bg-zinc-950
        border border-zinc-800
        rounded-2xl
        p-6
      ">



        <h2 className="text-2xl font-bold">

          {t[language].taskAnalytics}

        </h2>



        <p className="text-zinc-400 mt-2 mb-8">

          {t[language].taskOverview}

        </p>





        <div className="h-[420px] w-full overflow-hidden">

  <BarChart
    width={800}
    height={420}
    data={taskData}
    margin={{
      top: 30,
      right: 30,
      left: 10,
      bottom: 20
    }}
  >

    <CartesianGrid
      stroke="#27272a"
      strokeDasharray="3 3"
    />

    <XAxis
      dataKey="name"
      stroke="#71717a"
    />

    <YAxis
      stroke="#71717a"
      allowDecimals={false}
    />

    <Tooltip
      contentStyle={{
        backgroundColor: "#18181b",
        border: "1px solid #3f3f46",
        borderRadius: "12px",
        color: "#fff"
      }}
    />

    <Bar
      dataKey="value"
      name={t[language].totalTasks}
      fill="#3b82f6"
      radius={[10, 10, 0, 0]}
    >
      <LabelList
        dataKey="value"
        position="top"
        fill="#ffffff"
      />
    </Bar>

  </BarChart>

</div>
{/* PLATFORM SUMMARY */}


        <div className="
          mt-10
          border-t
          border-zinc-800
          pt-8
        ">


          <h3 className="text-xl font-bold mb-6">

            {t[language].platformSummary}

          </h3>




          <div className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-6
          ">



            <div>

              <p className="text-zinc-400">

                {t[language].clients}

              </p>



              <p className="text-3xl font-bold mt-2">

                {stats?.totalClients || 0}

              </p>


            </div>





            <div>

              <p className="text-zinc-400">

                {t[language].projects}

              </p>



              <p className="text-3xl font-bold mt-2">

                {stats?.activeProjects || 0}

              </p>


            </div>





            <div>

              <p className="text-zinc-400">

                {t[language].tasks}

              </p>



              <p className="text-3xl font-bold mt-2">

                {stats?.totalTasks || 0}

              </p>


            </div>





            <div>

              <p className="text-zinc-400">

                {t[language].completionRate}

              </p>



              <p className="
                text-3xl
                font-bold
                text-green-400
                mt-2
              ">

                {completionRate}%

              </p>


            </div>



          </div>


        </div>



      </div>



    </main>

  );


}

