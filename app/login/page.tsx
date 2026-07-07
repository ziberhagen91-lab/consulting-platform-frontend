"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      login: "Вхід",
      email: "Email",
      password: "Пароль",
      signIn: "Увійти",
      signingIn: "Вхід...",
      loginSuccess: "Вхід успішний",
      loginFailed: "Помилка входу",
      backendError: "Помилка з'єднання з сервером",
    },

    en: {
      login: "Login",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      signingIn: "Signing In...",
      loginSuccess: "Login successful",
      loginFailed: "Login failed",
      backendError: "Backend connection error",
    },
  };

  const router = useRouter();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(
          "token",
          data.token,
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user),
        );

        toast.success(
          t[language].loginSuccess,
        );

        router.push("/dashboard");
      } else {
        toast.error(
          data.message ||
            t[language].loginFailed,
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        t[language].backendError,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative flex items-center justify-center px-4 md:px-6">

      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md border border-zinc-800 bg-zinc-950 rounded-2xl p-6 md:p-8">

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          {t[language].login}
        </h1>

        <form
          onSubmit={handleLogin}
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
            disabled={loading}
            className="bg-white text-black rounded-xl py-3 font-semibold hover:opacity-80 transition disabled:opacity-50"
          >
            {loading
              ? t[language].signingIn
              : t[language].signIn}
          </button>

        </form>

      </div>

    </main>
  );
}