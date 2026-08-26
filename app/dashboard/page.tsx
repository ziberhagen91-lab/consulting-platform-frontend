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
  Cell,
  CartesianGrid
} from "recharts";


import {
  Users,
  Folder,
  ClipboardList,
  CheckCircle2
} from "lucide-react";





export default function DashboardPage(){


const router = useRouter();

const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const [analytics,setAnalytics] =
useState<any>(null);


const [stats,setStats] =
useState<any>(null);


const [loading,setLoading] =
useState(true);


const [language,setLanguage] =
useState<"uk"|"en">("uk");


const t: any = translations;



const revenueData = [
{
month:"Jan",
revenue:20000
},
{
month:"Feb",
revenue:35000
},
{
month:"Mar",
revenue:28000
},
{
month:"Apr",
revenue:60000
},
{
month:"May",
revenue:90000
},
{
month:"Jun",
revenue:124500
}
];



const taskData = [

{
name:
language==="uk"
?
"До виконання"
:
"To Do",

value:
stats?.todoTasks ?? 0
},


{
name:
language==="uk"
?
"В процесі"
:
"In Progress",

value:
stats?.inProgressTasks ?? 0
},


{
name:
language==="uk"
?
"Виконано"
:
"Done",

value:
stats?.completedTasks ?? 0
}

];



const totalTaskCount =
taskData.reduce(
(sum,item)=>sum + item.value,
0
);



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

]= await Promise.all([


fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/analytics`,
  {
    cache: "no-store",
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
),

fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`,
  {
    cache: "no-store",
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
)


]);



if (
  !analyticsResponse.ok ||
  !statsResponse.ok
) {
  console.log("DASHBOARD API DEBUG", {
    analyticsStatus: analyticsResponse.status,
    analyticsUrl: analyticsResponse.url,
    statsStatus: statsResponse.status,
    statsUrl: statsResponse.url,
  });

  throw new Error(
    `Dashboard loading error: analytics=${analyticsResponse.status}, stats=${statsResponse.status}`
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


return(

<div

className="
min-h-screen
bg-[#020817]
flex
items-center
justify-center
text-white
"

>

Loading...

</div>

);


}





    <Sidebar
      onLogout={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success(t.logout);

        router.push("/login");
      }}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />





  function logout(): void {
    throw new Error("Function not implemented.");
  }

return (

<div

className="
min-h-screen
bg-[#020817]
text-white
flex
"

>


<Sidebar
  onLogout={logout}
  mobileMenuOpen={mobileMenuOpen}
  setMobileMenuOpen={setMobileMenuOpen}
/>




<main
  className="
    flex-1 min-w-0 w-0 max-w-full ml-0 p-2 pt-14 sm:p-5 sm:pt-5
    min-h-screen
    overflow-x-hidden
    overflow-y-auto
  "
>



<DashboardHeader

language={language}

setLanguage={setLanguage}

/>





<section
  className="
    w-full
    max-w-none
    mx-0
    mt-4
  "
>


<div
  className="
    grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-5 w-full min-w-0 max-w-full
  "
>


{/* LEFT COLUMN */}


<div

className="
col-span-1 xl:col-span-9 space-y-6 min-w-0 w-full max-w-full
"

>

{/* STAT CARDS */}



<div

className="
grid
grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5
"

>



<Card>


<div className="flex justify-between items-start">


<div>


<div className="flex items-center gap-3">


<Users

size={34}

className="text-blue-500"

/>



<h3 className="text-xl font-semibold">

{t[language].clients}

</h3>


</div>



<p className="text-5xl font-bold mt-4">

{stats?.clients || 0}

</p>


<p className="text-green-400 text-sm mt-2">

↑ 12% за місяць

</p>


</div>



<div className="text-blue-400 text-3xl">

↗

</div>



</div>


</Card>





<Card>


<div className="flex justify-between items-start">


<div>


<div className="flex items-center gap-3">


<Folder

size={34}

className="text-yellow-400"

/>



<h3 className="text-xl font-semibold">

{t[language].projects}

</h3>


</div>



<p className="text-5xl font-bold mt-4">

{stats?.projects || 0}

</p>


<p className="text-green-400 text-sm mt-2">

↑ 8% this month

</p>


</div>



<div className="text-yellow-400 text-3xl">

↗

</div>



</div>


</Card>





<Card>


<div className="flex justify-between items-start">


<div>


<div className="flex items-center gap-3">


<ClipboardList

size={34}

className="text-blue-400"

/>



<h3 className="text-xl font-semibold">

{t[language].tasks}

</h3>


</div>



<p className="text-5xl font-bold mt-4">

{stats?.tasks || 0}

</p>


<p className="text-green-400 text-sm mt-2">

↑ 19% this month

</p>


</div>



<div className="text-blue-400 text-3xl">

↗

</div>



</div>


</Card>





<Card>


<div className="flex justify-between items-start">


<div>


<div className="flex items-center gap-3">


<CheckCircle2

size={34}

className="text-green-400"

/>



<h3 className="text-xl font-semibold">

{t[language].completedTasks}

</h3>


</div>



<p className="text-5xl font-bold mt-4">

{stats?.completedTasks || 0}

</p>


<p className="text-green-400 text-sm mt-2">

↑ 15% this month

</p>


</div>



<div className="text-green-400 text-3xl">

↗

</div>



</div>


</Card>


</div>
{/* ANALYTICS */}


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
min-h-[420px]
"

>


<h3

className="
text-2xl
font-semibold
mb-6
"

>

{t[language].revenueAnalytics}

</h3>



<p className="text-zinc-400 mb-6">

{
language==="uk"
?
"Дохід за місяцями"
:
"Monthly revenue growth"
}

</p>



<p className="text-4xl font-bold mb-6">

₴
{
stats?.revenue
?
stats.revenue.toLocaleString("uk-UA")
:
0
}

</p>




<div className="h-[300px]">


<ResponsiveContainer

width="100%"

height="100%"

>


<LineChart

data={revenueData}

>


<CartesianGrid

strokeDasharray="3 3"

/>


<XAxis

dataKey="month"

/>


<YAxis />


<Tooltip />


<Line

type="monotone"

dataKey="revenue"

stroke="#2563eb"

strokeWidth={4}

/>


</LineChart>


</ResponsiveContainer>


</div>


</Card>





{/* TASK DISTRIBUTION */}


<Card

className="
xl:col-span-4
min-h-[420px]
"

>


<h3

className="
text-2xl
font-semibold
mb-6
"

>


{t[language].taskAnalytics}


</h3>




<div

className="
flex
items-center
justify-center
"

>


<div

className="
relative
w-[220px]
h-[220px]
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

innerRadius={60}

outerRadius={90}

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


</PieChart>


</ResponsiveContainer>




<div

className="
absolute
inset-0
flex
flex-col
items-center
justify-center
"

>


<p className="text-4xl font-bold">

{totalTaskCount}

</p>


<p className="text-zinc-400">

tasks

</p>


</div>


</div>


</div>


</Card>





{/* RECENT ACTIVITY */}


<Card

className="
xl:col-span-4
min-h-[420px]
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




<div className="space-y-4">


{

stats?.recentActivity?.slice(0,4).map(

(activity:any,index:number)=>(


<div

key={index}

className="
flex
justify-between
items-center
p-4
rounded-xl
bg-[#071126]
border
border-blue-900/40
"

>


<div>


<p className="font-semibold">

{activity.type === "client"
  ? t[language].newClient
  : activity.type === "project"
  ? t[language].newProject
  : t[language].newTask}

</p>



<p className="text-zinc-400">

{activity.name}

</p>



</div>




<span className="text-zinc-500 text-sm">

{
new Date(
activity.createdAt
)
.toLocaleDateString()
}

</span>



</div>


)

)

}



</div>


</Card>


</div>


</div>


{/* RIGHT SIDEBAR */}
<div
  className="
    col-span-1
    xl:col-span-3
    space-y-6
    min-w-0
    w-full
  "
>


{/* DEADLINES */}


<Card>


<h3

className="
text-2xl
font-semibold
mb-6
"

>

{t[language].upcomingDeadlines}

</h3>



<div className="space-y-4">


<div

className="
border-b
border-blue-900/40
pb-4
"

>


<p className="text-yellow-400">
  🟡 {t[language].businessConsulting}
</p>


<p className="text-sm text-zinc-400">

{language === "uk" ? 'ТОВ "Tech Solutions"' : 'Tech Solutions LLC'}

</p>



<div className="flex justify-between mt-2">


<span className="text-sm">

30.06.2025

</span>



<span

className="
text-xs
bg-yellow-400/20
text-yellow-400
px-3
py-1
rounded-full
"

>

{t[language].high}

</span>


</div>


</div>





<div

className="
border-b
border-blue-900/40
pb-4
"

>


<p className="text-blue-400">
  🔵 {t[language].newWebsite}
</p>


<p className="text-sm text-zinc-400">
  {language === "uk" ? "Digital Agency" : "Digital Agency"}
</p>



<div className="flex justify-between mt-2">


<span className="text-sm">

15.07.2025

</span>



<span

className="
text-xs
bg-blue-400/20
text-blue-400
px-3
py-1
rounded-full
"

>

Середній

</span>


</div>


</div>


</div>


</Card>





{/* SYSTEM STATUS */}


<Card>


<h3

className="
text-2xl
font-semibold
mb-6
"

>

{t[language].systemStatus}

</h3>



<div className="space-y-4">


<div className="flex justify-between">

<span>

{t[language].api}

</span>


<span className="text-green-400">

{t[language].online}

</span>


</div>




<div className="flex justify-between">

<span>

{t[language].database}

</span>


<span className="text-green-400">

{t[language].connected}

</span>


</div>




<div className="flex justify-between">

<span>

{t[language].jwt}

</span>


<span className="text-green-400">

{t[language].active}

</span>


</div>


</div>


</Card>





{/* PROJECT PROGRESS */}


<Card>


<h3

className="
text-2xl
font-semibold
mb-6
"

>

{t[language].projectProgress}

</h3>




<div

className="
flex
items-center
justify-center
gap-4
"

>


<div

className="
relative
w-[130px]
h-[130px]
"

>


<ResponsiveContainer

width="100%"

height="100%"

>


<PieChart>


<Pie

data={[
{
name:"Done",
value:72
},
{
name:"Left",
value:28
}
]}

dataKey="value"

innerRadius={45}

outerRadius={60}

startAngle={90}

endAngle={-270}

>


<Cell fill="#2563eb"/>

<Cell fill="#facc15"/>


</Pie>


</PieChart>


</ResponsiveContainer>




<div

className="
absolute
inset-0
flex
items-center
justify-center
"

>


<span className="text-3xl font-bold">

72%

</span>


</div>


</div>




<div>


<p className="text-lg font-semibold">

{t[language].averageProgress}

</p>


<p className="text-zinc-400">

{t[language].allProjects}

</p>


</div>



</div>


</Card>


</div>
</div>


</section>


</main>


</div>


);

}
















