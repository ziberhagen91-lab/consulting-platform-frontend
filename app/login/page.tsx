"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"uk" | "en">("en");

  const router = useRouter();

  useEffect(() => {
    const updateLanguage = () => {
      const saved = localStorage.getItem("language");

      if (saved === "uk" || saved === "en") {
        setLanguage(saved);
      }
    };

    updateLanguage();

    window.addEventListener("languagechange", updateLanguage);

    return () => {
      window.removeEventListener("languagechange", updateLanguage);
    };
  }, []);

  const t = {
    uk: {
      back: "Назад",
      welcome: "Ласкаво просимо",
      subtitle: "Увійдіть до Smart Consulting",
      email: "Email",
      password: "Пароль",
      signIn: "Увійти",
      signingIn: "Вхід...",
      loginSuccess: "Вхід успішний",
      loginFailed: "Помилка входу",
      backendError: "Помилка з'єднання з сервером",
      local: "Локальне підключення",
      secure: "Захищене підключення",
      noAccount: "Ще немає акаунта?",
      register: "Зареєструватися",
    },

    en: {
      back: "Back",
      welcome: "Welcome back",
      subtitle: "Sign in to Smart Consulting",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      signingIn: "Signing In...",
      loginSuccess: "Login successful",
      loginFailed: "Login failed",
      backendError: "Backend connection error",
      local: "Local connection",
      secure: "Secure connection",
      noAccount: "Don't have an account?",
      register: "Create account",
    },
  };

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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert(t[language].loginSuccess);

        router.push("/dashboard");
      } else {
        alert(data.message || t[language].loginFailed);
      }
    } catch (error) {
      console.error(error);
      alert(t[language].backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030407] px-4 py-8 text-white">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#101225_0%,#05060b_45%,#030407_100%)]" />

      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

      {/* BACK */}

      <Link
        href="/"
        className="absolute left-4 top-4 z-30 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.08] hover:text-white md:left-6 md:top-6"
      >
        ← {t[language].back}
      </Link>

      {/* LANGUAGE */}

      <div className="absolute right-4 top-4 z-30 md:right-6 md:top-6">
        <LanguageSwitcher />
      </div>

      {/* CARD */}

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#090b11]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-8">

        {/* LOGO */}

        <div className="mb-8 flex flex-col items-center text-center">

          <img
            src="/logo.png"
            alt="Smart Consulting"
            className="mb-5 h-24 w-24 object-contain"
          />

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t[language].welcome}
          </h1>

          <p className="mt-2 text-sm text-zinc-400 sm:text-base">
            {t[language].subtitle}
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              {t[language].email}
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              {t[language].password}
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 font-semibold text-white shadow-[0_10px_35px_rgba(124,58,237,0.25)] transition hover:scale-[1.01] hover:shadow-[0_15px_45px_rgba(124,58,237,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? t[language].signingIn
              : t[language].signIn}
          </button>

        </form>

        {/* REGISTER */}

        <div className="mt-6 text-center text-sm text-zinc-500">

          {t[language].noAccount}{" "}

          <Link
            href="/register"
            className="font-medium text-purple-400 transition hover:text-purple-300"
          >
            {t[language].register}
          </Link>

        </div>

        {/* STATUS */}

        <div className="mt-6 border-t border-white/[0.07] pt-5 text-center">

          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">

            <span className="h-2 w-2 rounded-full bg-green-400" />

            {typeof window !== "undefined" &&
            window.location.protocol === "https:"
              ? t[language].secure
              : t[language].local}

          </div>

        </div>

      </div>

    </main>
  );
}
