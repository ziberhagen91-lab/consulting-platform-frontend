"use client";

import { Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

type MobileHeaderProps = {
  onMenuClick: () => void;
};

export default function MobileHeader({
  onMenuClick,
}: MobileHeaderProps) {
  return (
    <header className="md:hidden flex items-center justify-between border-b border-zinc-900 bg-black px-4 py-4">

      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-zinc-900 transition"
      >
        <Menu size={24} />
      </button>

      <h1 className="font-bold text-lg">
        Consulting Platform
      </h1>

      <LanguageSwitcher />

    </header>
  );
}