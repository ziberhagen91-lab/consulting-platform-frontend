"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "../components/LanguageSwitcher";

const toast = {
  success: (message: string) => alert(message),
  error: (message: string) => alert(message),
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"uk" | "en">("uk");

  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const t = {
    uk: {
      welcome: "Ласкаво просимо",
      subtitle: "Увійдіть до Consulting Platform",
      email: "Email",
      password: "Пароль",
      signIn: "Увійти",
      signingIn: "Вхід...",
      loginSuccess: "Вхід успішний",
      loginFailed: "Помилка входу",
      backendError: "Помилка з'єднання з сервером",
      secure: "Захищене підключення",
    },

    en: {
      welcome: "Welcome back",
      subtitle: "Sign in to Consulting Platform",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      signingIn: "Signing In...",
      loginSuccess: "Login successful",
      loginFailed: "Login failed",
      backendError: "Backend connection error",
      secure: "Secure connection",
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
        localStorage.setItem(
          "user",
          JSON.stringify(data.user),
        );

        toast.success(t[language].loginSuccess);
        router.push("/dashboard");
      } else {
        toast.error(
          data.message || t[language].loginFailed,
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(t[language].backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020817] text-white relative overflow-hidden flex items-center justify-center px-4 py-8">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#071a45_0%,#020817_45%,#000_100%)]" />

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px]" />

      {/* Language */}

      <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20">
        <LanguageSwitcher />
      </div>

      {/* Login card */}

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-blue-900 bg-[#030b1c]/95 shadow-[0_0_80px_rgba(37,99,235,0.15)] p-6 sm:p-8">

        {/* Logo */}

        <div className="flex flex-col items-center text-center mb-8">

          <img
            src="/logo.png"
            alt="Consulting Platform Logo"
            className="w-40 sm:w-48 h-auto object-contain mb-6"
          />

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t[language].welcome}
          </h1>

          <p className="text-zinc-400 mt-2 text-sm sm:text-base">
            {t[language].subtitle}
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm font-medium text-zinc-300 mb-2">
              {t[language].email}
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 rounded-xl border border-blue-900 bg-[#06102b] px-4 text-white outline-none placeholder:text-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-zinc-300 mb-2">
              {t[language].password}
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 rounded-xl border border-blue-900 bg-[#06102b] px-4 text-white outline-none placeholder:text-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold transition shadow-lg shadow-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? t[language].signingIn
              : t[language].signIn}
          </button>

        </form>

        {/* Footer */}

        <div className="mt-7 pt-5 border-t border-blue-900/50 text-center">

          <div className="flex items-center justify-center gap-2 text-green-400 text-xs font-medium">

            <span className="w-2 h-2 rounded-full bg-green-400" />

            {t[language].secure}

          </div>

        </div>

      </div>

    </main>
  );
}