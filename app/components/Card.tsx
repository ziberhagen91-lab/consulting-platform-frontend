import React from "react";


type CardProps = {
  children: React.ReactNode;
  className?: string;
};


export default function Card({
  children,
  className = "",
}: CardProps) {


  return (

    <div

      className={`
        relative
        overflow-hidden
        border
        border-blue-900/40
        rounded-2xl
        bg-[#050b1c]
        p-5
        transition-all
        duration-300
        hover:border-blue-500/60
        hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]
        ${className}
      `}

    >

      {children}

    </div>

  );

}