"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ClipboardList,
  BarChart3,
  CalendarDays,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";

import { translations } from "@/lib/translations";


type SidebarProps = {
  onLogout: () => void;
};


export default function Sidebar({
  onLogout,
}: SidebarProps) {


  const pathname = usePathname();


  const [language,setLanguage] =
    useState<"uk"|"en">("uk");


  useEffect(()=>{

    const saved =
      localStorage.getItem("language");


    if(saved==="uk" || saved==="en"){
      setLanguage(saved);
    }

  },[]);



  const t = translations;



  const menuItems = [

    {
      href:"/dashboard",
      icon:LayoutDashboard,
      label:t[language].overview,
    },


    {
      href:"/clients",
      icon:Users,
      label:t[language].clients,
    },


    {
      href:"/projects",
      icon:FolderKanban,
      label:t[language].projects,
    },


    {
      href:"/tasks",
      icon:ClipboardList,
      label:t[language].tasks,
    },


    {
      href:"/analytics",
      icon:BarChart3,
      label:t[language].analytics,
    },


    {
      href:"#",
      icon:CalendarDays,
      label:"Календар",
    },


    {
      href:"#",
      icon:MessageCircle,
      label:"Повідомлення",
    },


    {
      href:"/settings",
      icon:Settings,
      label:t[language].settings,
    },

  ];



return (

<aside

className="
w-64
min-h-screen
bg-[#020817]
border-r
border-blue-950
px-5
py-6
flex
flex-col
text-white
"

>


<Image
  src="/logo.png?v=2"
  alt="Consulting Platform"
  width={200}
  height={200}
  priority
  unoptimized
  className="w-44 h-auto mb-2"
/>





{/* MENU */}

<nav className="
flex
flex-col
gap-2
">


{
menuItems.map((item)=>{


const Icon=item.icon;


const active =
pathname===item.href;



return (

<Link

key={item.label}

href={item.href}

className={`
flex
items-center
gap-4
px-4
py-3
rounded-xl
transition

${
active
?
"bg-blue-600 text-white shadow-lg shadow-blue-900"
:
"text-zinc-300 hover:bg-blue-950 hover:text-white"
}

`}

>


<Icon size={21}/>


<span>

{item.label}

</span>


</Link>

)


})

}


</nav>





{/* USER */}

<div className="
mt-auto
">


<div className="
mb-4
p-4
rounded-xl
bg-[#07152e]
border
border-blue-900
">


<div className="
flex
items-center
gap-3
">


<div className="
w-10
h-10
rounded-full
bg-yellow-400
text-black
flex
items-center
justify-center
font-bold
">

S

</div>


<div>

<p className="
font-semibold
">

Sergey

</p>


<p className="
text-xs
text-blue-400
">

Administrator

</p>


</div>


</div>


</div>





<button

onClick={onLogout}

className="
w-full
flex
items-center
justify-center
gap-2
py-3
rounded-xl
border
border-red-600
text-red-500
hover:bg-red-600
hover:text-white
transition
"

>

<LogOut size={18}/>

Вийти

</button>



</div>



</aside>


);

}