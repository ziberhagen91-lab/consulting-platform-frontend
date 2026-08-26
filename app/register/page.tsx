"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

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
      back: "На головну",
      register: "Створіть акаунт",
      subtitle:
        "Почніть працювати з Consulting Platform",
      email: "Email",
      password: "Пароль",
      createAccount: "Створити акаунт",
      accountCreated: "Акаунт створено",
      registerFailed: "Помилка реєстрації",
      haveAccount: "Вже маєте акаунт?",
      signIn: "Увійти",
      secure: "Безпечно та надійно",
    },

    en: {
      back: "Back to home",
      register: "Create your account",
      subtitle:
        "Start working with Consulting Platform",
      email: "Email",
      password: "Password",
      createAccount: "Create Account",
      accountCreated: "Account created",
      registerFailed: "Register failed",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      secure: "Secure & Reliable",
    },
  };

  const router = useRouter();

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
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
    <main className="relative min-h-screen overflow-hidden bg-[#030407] text-white">

      {/* BACKGROUND */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#101225_0%,#05060b_45%,#030407_100%)]" />

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/[0.05] blur-[120px]" />

        <div className="absolute left-1/4 top-1/3 h-[250px] w-[250px] rounded-full bg-blue-600/[0.04] blur-[100px]" />
      </div>


      {/* TOP BAR */}

      <header className="relative z-20 flex items-center justify-between px-5 py-5 md:px-8 md:py-6">

        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="Consulting Platform"
            className="h-11 w-11 object-contain"
          />

          <span className="hidden text-lg font-semibold tracking-tight sm:block">
            Smart Consulting
          </span>
        </Link>

        <LanguageSwitcher />

      </header>


      {/* REGISTER */}

      <div className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-5 py-10">

        <div className="w-full max-w-[440px]">

          {/* CARD */}

          <div className="rounded-3xl border border-white/[0.09] bg-[#080a11]/90 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-9">

            {/* LOGO */}

            <div className="mb-7 flex justify-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/[0.06]">

                <img
                  src="/logo.png"
                  alt="Consulting Platform"
                  className="h-16 w-16 object-contain"
                />

              </div>

            </div>


            {/* TITLE */}

            <div className="text-center">

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t[language].register}
              </h1>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {t[language].subtitle}
              </p>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleRegister}
              className="mt-8 flex flex-col gap-5"
            >

              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  {t[language].email}
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="h-13 w-full rounded-xl border border-white/[0.1] bg-[#0c0f17] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"
                />

              </div>


              {/* PASSWORD */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  {t[language].password}
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="h-13 w-full rounded-xl border border-white/[0.1] bg-[#0c0f17] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"
                />

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="group mt-1 flex h-13 w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 font-semibold shadow-[0_10px_40px_rgba(124,58,237,0.22)] transition hover:scale-[1.01] hover:shadow-[0_15px_50px_rgba(124,58,237,0.35)]"
              >
                {t[language].createAccount}

                <span className="ml-3 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>

            </form>


            {/* FOOTER */}

            <div className="mt-7 border-t border-white/[0.07] pt-6 text-center">

              <p className="text-sm text-zinc-500">
                {t[language].haveAccount}{" "}

                <Link
                  href="/login"
                  className="font-medium text-purple-400 transition hover:text-purple-300"
                >
                  {t[language].signIn}
                </Link>
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-600">

                <span className="h-1.5 w-1.5 rounded-full bg-green-500/70" />

                {t[language].secure}

              </div>

            </div>

          </div>


          {/* BACK */}

          <div className="mt-6 text-center">

            <Link
              href="/"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              ← {t[language].back}
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}
