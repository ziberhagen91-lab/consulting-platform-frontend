"use client";

import {
  useEffect,
  useState
} from "react";


import Image from "next/image";


import {
  useRouter
} from "next/navigation";


import toast from "react-hot-toast";


import Card from "@/app/components/Card";

import Sidebar from "@/app/components/Sidebar";

import DashboardHeader from "@/components/dashboard/DashboardHeader";


import {
  translations
} from "@/lib/translations";



import {

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  PieChart,

  Pie,

  Cell

} from "recharts";



import {

  Users,

  Folder,

  ClipboardList,

  CheckCircle2

} from "lucide-react";





export default function DashboardPage(){



const router = useRouter();



const [analytics,setAnalytics] =
useState<any>(null);



const [stats,setStats] =
useState<any>(null);



const [loading,setLoading] =
useState(true);



const [language,setLanguage] =
useState<"uk"|"en">("uk");



const t = translations;




const revenueData = [

  {
    month:"Jan",
    revenue:1200
  },

  {
    month:"Feb",
    revenue:2100
  },

  {
    month:"Mar",
    revenue:1800
  },

  {
    month:"Apr",
    revenue:2800
  },

  {
    month:"May",
    revenue:3900
  },

  {
    month:"Jun",
    revenue:4250
  }

];




const taskData = [

  {
    name:"To Do",
    value:32
  },

  {
    name:"In Progress",
    value:16
  },

  {
    name:"Done",
    value:16
  }

];



const taskColors = [

  "#2563eb",

  "#facc15",

  "#64748b"

];




useEffect(()=>{


const saved =
localStorage.getItem("language");


if(
saved==="uk" ||
saved==="en"
){

setLanguage(saved);

}


},[]);
useEffect(()=>{


const loadDashboard = async()=>{


const token =
localStorage.getItem("token");



if(!token){

router.push("/login");

return;

}



try{


const [

analyticsResponse,

statsResponse

] = await Promise.all([



fetch(

`${process.env.NEXT_PUBLIC_API_URL}/analytics`,

{

headers:{

Authorization:

`Bearer ${token}`

}

}

),



fetch(

`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`,

{

headers:{

Authorization:

`Bearer ${token}`

}

}

)



]);





if(
!analyticsResponse.ok ||
!statsResponse.ok
){

throw new Error(
"Dashboard loading error"
);

}





const analyticsData =
await analyticsResponse.json();



const statsData =
await statsResponse.json();





setAnalytics(
analyticsData
);



setStats(
statsData
);





}

catch(error){


console.error(error);


toast.error(
"Failed to load dashboard"
);



}

finally{


setLoading(false);


}



};



loadDashboard();



},[router]);






if(loading){


return (

<main

className="

min-h-screen

bg-[#020817]

text-white

p-10

"

>


<div

className="

animate-pulse

"

>


<div

className="

h-12

w-72

bg-blue-950

rounded-2xl

mb-10

"

/>




<div

className="

grid

grid-cols-1

sm:grid-cols-2

xl:grid-cols-4

gap-6

"

>


{

[1,2,3,4].map(

(item)=>(


<Card

key={item}

>


<div

className="

h-6

w-32

bg-blue-950

rounded-xl

mb-4

"

/>



<div

className="

h-10

w-40

bg-blue-950

rounded-xl

"

/>


</Card>


)

)


}



</div>



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

flex

flex-col

md:flex-row

"

>



<Sidebar

onLogout={()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


toast.success(
"Logged out"
);


router.push("/login");


}}

/>





className="

flex-1

p-4

md:p-10

"





<DashboardHeader />






{/* HERO */}



<div

className="

relative

h-[340px]

mb-8

rounded-3xl

overflow-hidden

border

border-blue-900/60

shadow-2xl

"

>



<Image

src="/images/hero-map.png"

alt="World map"

fill

priority

className="

object-cover

scale-110

opacity-90

"

/>





<div

className="

absolute

inset-0

bg-gradient-to-r

from-[#020817]

via-[#020817]/75

to-transparent

"

/>





<div

className="

absolute

inset-0

bg-blue-900/10

"

/>





<div

className="

absolute

inset-0

bg-[radial-gradient(circle_at_70%_40%,rgba(37,99,235,0.35),transparent_45%)]

"

/>





<div

className="

absolute

top-[42%]

right-[32%]

h-4

w-4

rounded-full

bg-blue-400

shadow-[0_0_30px_10px_rgba(59,130,246,0.8)]

animate-pulse

"

/>





<div

className="

absolute

top-[38%]

right-[34%]

h-[2px]

w-40

bg-gradient-to-r

from-blue-400

to-transparent

rotate-[-15deg]

"

/>





<div

className="

absolute

top-[32%]

right-[15%]

h-4

w-4

rounded-full

bg-yellow-400

shadow-[0_0_30px_10px_rgba(250,204,21,0.7)]

animate-pulse

"

/>





<div

className="

relative

z-10

p-10

max-w-xl

"

>


<h2

className="

text-5xl

font-bold

text-white

leading-tight

"

>


{language==="uk"

?

"Ваш бізнес"

:

"Your business"

}




<span

className="

text-yellow-400

block

"

>


{language==="uk"

?

"без меж"

:

"without limits"

}



</span>


</h2>





<p

className="

mt-5

text-lg

text-zinc-300

max-w-md

"

>


{language==="uk"

?

"Ми поєднуємо Україну та США для вашого зростання у світі."

:

"We connect Ukraine and the USA for your global growth."

}


</p>



<div

className="

flex

items-center

gap-6

mt-8

text-white

font-semibold

"

>


<div>

🇺🇦

{t[language].heroUkraine}

</div>


<div

className="

text-blue-400

text-3xl

"

>
→
</div>


<div>

🇺🇸

{t[language].heroUSA}

</div>


<div

className="

text-blue-400

text-3xl

"

>
→
</div>


<div>

🌍

{t[language].heroWorld}

</div>


</div>



</div>



</div>
{/* STAT CARDS */}


<div

className="

grid

grid-cols-1

sm:grid-cols-2

xl:grid-cols-4

gap-6

mb-8

"

>



<Card

className="

relative

h-[150px]

overflow-hidden

hover:border-blue-500

transition

"

>


<div

className="

flex

justify-between

items-start

"

>


<div>


<div

className="

flex

items-center

gap-3

mb-4

"

>


<Users

size={30}

className="text-blue-500"

/>


<h3

className="

text-xl

font-semibold

"

>

{t[language].clients}

</h3>


</div>



<p

className="

text-4xl

font-bold

"

>

{stats?.clients || 0}

</p>



<p

className="

text-green-400

mt-3

"

>

↑ 12% за місяць

</p>


</div>




<div

className="

flex

items-end

gap-1

h-12

"

>

<div className="w-1 h-3 bg-blue-500 rounded"/>

<div className="w-1 h-6 bg-blue-500 rounded"/>

<div className="w-1 h-8 bg-blue-500 rounded"/>

<div className="w-1 h-10 bg-blue-500 rounded"/>

</div>



</div>


</Card>






<Card

className="

relative

h-[150px]

overflow-hidden

hover:border-yellow-500

transition

"

>


<div

className="

flex

justify-between

items-start

"

>


<div>


<div

className="

flex

items-center

gap-3

mb-4

"

>


<Folder

size={30}

className="text-yellow-400"

/>


<h3

className="

text-xl

font-semibold

"

>

{t[language].projects}

</h3>


</div>




<p

className="

text-4xl

font-bold

"

>

{stats?.projects || 0}

</p>




<p

className="

text-green-400

mt-3

"

>

↑ 8% за місяць

</p>


</div>



<div

className="

flex

items-end

gap-1

h-12

"

>


<div className="w-1 h-3 bg-yellow-400 rounded"/>

<div className="w-1 h-6 bg-yellow-400 rounded"/>

<div className="w-1 h-8 bg-yellow-400 rounded"/>

<div className="w-1 h-10 bg-yellow-400 rounded"/>


</div>


</div>


</Card>







<Card

className="

relative

h-[150px]

overflow-hidden

hover:border-blue-500

transition

"

>


<div

className="

flex

items-center

gap-3

mb-4

"

>


<ClipboardList

size={30}

className="text-blue-500"

/>



<h3

className="

text-xl

font-semibold

"

>

{t[language].tasks}

</h3>


</div>



<p

className="

text-4xl

font-bold

"

>

{stats?.tasks || 0}

</p>



<p

className="

text-zinc-400

mt-3

"

>

{t[language].totalTasks}

</p>



</Card>







<Card

className="

relative

h-[150px]

overflow-hidden

hover:border-green-500

transition

"

>


<div

className="

flex

items-center

gap-3

mb-4

"

>


<CheckCircle2

size={30}

className="text-green-400"

/>



<h3

className="

text-xl

font-semibold

"

>

{t[language].completedTasks}

</h3>


</div>



<p

className="

text-4xl

font-bold

"

>

{stats?.completedTasks || 0}

</p>



<p

className="

text-zinc-400

mt-3

"

>

{t[language].completedTasksDesc}

</p>



</Card>




</div>
{/* DASHBOARD ANALYTICS */}


<div

className="

grid

grid-cols-1

xl:grid-cols-12

gap-6

mt-10

"

>




{/* REVENUE */}


<Card

className="

xl:col-span-4

"

>


<h3

className="

text-2xl

font-semibold

mb-2

"

>

{t[language].revenueAnalytics}

</h3>



<p

className="

text-zinc-400

mb-6

"

>

{t[language].monthlyGrowth}

</p>




<div

className="

h-[280px]

"

>


<ResponsiveContainer

width="100%"

height="100%"

>


<LineChart

data={revenueData}

>


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

stroke="#2563eb"

strokeWidth={3}

/>



</LineChart>


</ResponsiveContainer>


</div>


</Card>








{/* TASK DISTRIBUTION */}



<Card

className="

xl:col-span-4

"

>



<h3

className="

text-2xl

font-semibold

mb-6

"

>

Розподіл завдань

</h3>




<div

className="

flex

items-center

justify-between

"

>


<div

className="

h-[220px]

w-[220px]

"

>


<ResponsiveContainer

width="100%"

height="100%"

>


<PieChart>


<Pie

data={taskData}

dataKey="value"

innerRadius={55}

outerRadius={85}

>


{

taskData.map(

(item,index)=>(


<Cell

key={index}

fill={taskColors[index]}

/>


)

)

}


</Pie>



<Tooltip />


</PieChart>



</ResponsiveContainer>


</div>





<div

className="

space-y-5

"

>


<div>

<p

className="

text-blue-500

font-semibold

"

>

🔵 To Do

</p>

<p

className="

text-zinc-400

"

>

32 (50%)

</p>

</div>





<div>

<p

className="

text-yellow-400

font-semibold

"

>

🟡 In Progress

</p>

<p

className="

text-zinc-400

"

>

16 (25%)

</p>

</div>






<div>

<p

className="

text-slate-400

font-semibold

"

>

⚫ Done

</p>

<p

className="

text-zinc-400

"

>

16 (25%)

</p>

</div>




</div>


</div>


</Card>







{/* RECENT ACTIVITY */}



<Card

className="

xl:col-span-4

"

>



<h3

className="

text-2xl

font-semibold

mb-6

"

>

{t[language].recentActivity}

</h3>




<div

className="

space-y-5

"

>



        {
          stats?.recentActivity?.slice(0,4).map(
            (activity:any,index:number)=>(
              
              <div
                key={index}
                className="
                  flex
                  justify-between
                  border-b
                  border-blue-950
                  pb-4
                "
              >

                <p>
                  {
                    activity.type==="client" &&
                    `👤 Новий клієнт "${activity.name}"`
                  }

                  {
                    activity.type==="project" &&
                    `📁 Новий проєкт "${activity.name}"`
                  }

                  {
                    activity.type==="task" &&
                    `📋 Нове завдання "${activity.name}"`
                  }
                </p>


                <span className="text-zinc-500">

                  {
                    new Date(
                      activity.createdAt
                    ).toLocaleDateString()
                  }

                </span>


              </div>

            )
          )
        }


      </div>


    </Card>


  </div>


</main>


);


}