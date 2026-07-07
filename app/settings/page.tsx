"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import toast from "react-hot-toast";

type User = {
  name: string;
  email: string;
  role: string;
};

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);

      setUser(parsed);
      setName(parsed.name || "");
      setEmail(parsed.email || "");
    }
  }, []);

  const t = {
    uk: {
      back: "Назад",
      settings: "Налаштування",
      manage: "Керуйте своїм акаунтом",

      profile: "Профіль користувача",

      name: "Ім'я",
      email: "Електронна пошта",
      role: "Роль",

      save: "Зберегти зміни",

      password: "Зміна пароля",

      currentPassword: "Поточний пароль",
      newPassword: "Новий пароль",
      confirmPassword: "Підтвердіть пароль",

      updatePassword: "Оновити пароль",
    },

    en: {
      back: "Back",
      settings: "Settings",
      manage: "Manage your account",

      profile: "User Profile",

      name: "Name",
      email: "Email",
      role: "Role",

      save: "Save Changes",

      password: "Change Password",

      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",

      updatePassword: "Update Password",
    },
  };

  const saveProfile = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      name,
      email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    toast.success("Profile updated");
  };

  const updatePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Password updated");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-10">

      <div className="flex justify-between items-center mb-8">

        <Link
          href="/dashboard"
          className="px-4 py-2 border border-zinc-700 rounded-xl hover:bg-zinc-900 transition"
        >
          ← {t[language].back}
        </Link>

        <LanguageSwitcher />

      </div>

      <h1 className="text-4xl font-bold mb-2">
        {t[language].settings}
      </h1>

      <p className="text-zinc-400 mb-10">
        {t[language].manage}
      </p>

      <div className="max-w-3xl mx-auto border border-zinc-800 bg-zinc-950 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {t[language].profile}
        </h2>

        <div className="space-y-4">

          <div>

            <label className="block text-zinc-400 mb-2">
              {t[language].name}
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block text-zinc-400 mb-2">
              {t[language].email}
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block text-zinc-400 mb-2">
              {t[language].role}
            </label>

            <input
              type="text"
              value={user?.role || ""}
              readOnly
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-500"
            />

          </div>
                    <button
            onClick={saveProfile}
            className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:scale-105 hover:opacity-90 transition-all duration-300"
          >
            {t[language].save}
          </button>

        </div>

      </div>

      <div className="max-w-3xl mx-auto border border-zinc-800 bg-zinc-950 rounded-2xl p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          {t[language].password}
        </h2>

        <div className="space-y-4">

          <div>

            <label className="block text-zinc-400 mb-2">
              {t[language].currentPassword}
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block text-zinc-400 mb-2">
              {t[language].newPassword}
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block text-zinc-400 mb-2">
              {t[language].confirmPassword}
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
            />

          </div>

          <button
            onClick={updatePassword}
            className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:scale-105 hover:opacity-90 transition-all duration-300"
          >
            {t[language].updatePassword}
          </button>

        </div>

      </div>

    </main>
  );
}