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






const logout = ()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


toast.success(

"Logged out"

);


router.push("/login");


};






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

/>





<main

className="
flex-1
ml-[240px]
p-6
overflow-hidden
"

>





<DashboardHeader
  language={language}
  setLanguage={setLanguage}
/>




<section

className="
w-full
max-w-[1400px]
mx-auto
mt-8
"

>

{/* HERO */}


<div

className="
relative
overflow-hidden
rounded-3xl
border
border-blue-900
bg-[#06163b]
h-[310px]
mb-8
"

>



<Image

src="/images/hero-map.png"

alt="world"

fill

className="
object-cover
opacity-40
"

/>





<div

className="
absolute
inset-0
bg-gradient-to-r
from-[#020817]
via-[#020817]/70
to-transparent
"

/>





<div

className="
relative
z-10
p-10
"

>



<h1

className="
text-5xl
font-bold
leading-tight
"

>


{language === "uk"
? "Ваш бізнес"
: "Your business"
}


<br/>


<span
className="
text-yellow-400
"
>

{
language === "uk"
? "без обмежень"
: "without limits"
}

</span>


</h1>





<p

className="
mt-6
text-lg
text-zinc-300
max-w-xl
"

>


{
language === "uk"
? "Ми з'єднуємо Україну та США для вашого глобального розвитку."
: "We connect Ukraine and the USA for your global growth."
}


</p>





<div

className="
flex
items-center
gap-6
mt-10
font-semibold
"

>


<div>
🇺🇦 {language === "uk" ? "Україна" : "Ukraine"}
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
🇺🇸 {language === "uk" ? "США" : "USA"}
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
🌎 {language === "uk" ? "Світ" : "World"}
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
mb-10
"

>



<Card>


<div

className="
flex
items-center
gap-4
"

>


<Users

size={32}

className="text-blue-500"

/>



<div>


<h3

className="
text-xl
font-semibold
"

>

{t[language].clients}

</h3>


<p

className="
text-4xl
font-bold
mt-2
"

>

{stats?.clients || 0}

</p>


</div>


</div>


</Card>







<Card>


<div

className="
flex
items-center
gap-4
"

>


<Folder

size={32}

className="text-yellow-400"

/>



<div>


<h3

className="
text-xl
font-semibold
"

>

{t[language].projects}

</h3>


<p

className="
text-4xl
font-bold
mt-2
"

>

{stats?.projects || 0}

</p>


</div>


</div>


</Card>







<Card>


<div

className="
flex
items-center
gap-4
"

>


<ClipboardList

size={32}

className="text-blue-400"

/>



<div>


<h3

className="
text-xl
font-semibold
"

>

{t[language].tasks}

</h3>


<p

className="
text-4xl
font-bold
mt-2
"

>

{stats?.tasks || 0}

</p>


</div>


</div>


</Card>







<Card>


<div

className="
flex
items-center
gap-4
"

>


<CheckCircle2

size={32}

className="text-green-400"

/>



<div>


<h3

className="
text-xl
font-semibold
"

>

{t[language].completedTasks}

</h3>


<p

className="
text-4xl
font-bold
mt-2
"

>

{stats?.completedTasks || 0}

</p>


</div>


</div>


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

{
language === "uk"
? "Розподіл завдань"
: "Task Distribution"
}

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

<p className="text-blue-500 font-semibold">

🔵 {
language === "uk"
? "До виконання"
: "To Do"
}

</p>

<p className="text-zinc-400">

32 (50%)

</p>

</div>





<div>

<p className="text-yellow-400 font-semibold">

🟡 {
language === "uk"
? "В процесі"
: "In Progress"
}

</p>

<p className="text-zinc-400">

16 (25%)

</p>

</div>





<div>

<p className="text-slate-400 font-semibold">

⚫ {
language === "uk"
? "Виконано"
: "Done"
}

</p>

<p className="text-zinc-400">

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

`👤 ${
language === "uk"
? "Новий клієнт"
: "New client"
} "${activity.name}"`

}


{

activity.type==="project" &&

`📁 ${
language === "uk"
? "Новий проєкт"
: "New project"
} "${activity.name}"`

}


{

activity.type==="task" &&

`📋 ${
language === "uk"
? "Нове завдання"
: "New task"
} "${activity.name}"`

}


</p>




<span

className="
text-zinc-500
"

>


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


</section>


</main>


</div>


);


}