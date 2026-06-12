"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      register: "Реєстрація",
      email: "Email",
      password: "Пароль",
      createAccount: "Створити акаунт",
      accountCreated: "Акаунт створено",
      registerFailed: "Помилка реєстрації",
    },

    en: {
      register: "Register",
      email: "Email",
      password: "Password",
      createAccount: "Create Account",
      accountCreated: "Account created",
      registerFailed: "Register failed",
    },
  };

  const router = useRouter();

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "${process.env.NEXT_PUBLIC_API_URL}/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        alert(t[language].accountCreated);
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(t[language].registerFailed);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-zinc-800 bg-zinc-950 rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {t[language].register}
        </h1>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder={t[language].email}
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder={t[language].password}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="bg-white text-black rounded-xl py-3 font-semibold hover:opacity-80 transition"
          >
            {t[language].createAccount}
          </button>
        </form>
      </div>
    </main>
  );
}