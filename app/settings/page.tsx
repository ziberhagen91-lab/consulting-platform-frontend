"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import toast from "react-hot-toast";

type UserData = {
  name: string;
  email: string;
  role: string;
};

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [language, setLanguage] =
    useState<"uk" | "en">("uk");

  const [savingProfile, setSavingProfile] =
    useState(false);

  const [updatingPassword, setUpdatingPassword] =
    useState(false);

  const t = {
    uk: {
      back: "Назад",
      settings: "Налаштування",
      manage: "Керуйте своїм акаунтом",
      account: "Обліковий запис",

      profile: "Профіль користувача",
      profileDescription:
        "Оновіть персональні дані свого акаунта.",

      name: "Ім'я",
      email: "Електронна пошта",
      role: "Роль",

      save: "Зберегти зміни",
      saving: "Збереження...",

      password: "Зміна пароля",
      passwordDescription:
        "Оновіть пароль для захисту свого акаунта.",

      currentPassword: "Поточний пароль",
      newPassword: "Новий пароль",
      confirmPassword: "Підтвердіть пароль",

      updatePassword: "Оновити пароль",
      updating: "Оновлення...",

      accountInfo: "Інформація про акаунт",
      accountInfoDescription:
        "Основні дані вашого профілю",

      administrator: "Адміністратор",
      activeAccount: "Активний акаунт",

      security: "Безпека",
      securityDescription:
        "Рекомендовано регулярно оновлювати пароль.",

      passwordStrength: "Надійність пароля",
      weak: "Слабкий",
      medium: "Середній",
      strong: "Надійний",

      passwordsMismatch:
        "Паролі не збігаються",

      passwordTooShort:
        "Новий пароль має містити щонайменше 6 символів",

      profileUpdated:
        "Профіль успішно оновлено",

      passwordUpdated:
        "Пароль успішно оновлено",

      emptyPassword:
        "Заповніть усі поля пароля",
    },

    en: {
      back: "Back",
      settings: "Settings",
      manage: "Manage your account",
      account: "Account",

      profile: "User Profile",
      profileDescription:
        "Update your personal account information.",

      name: "Name",
      email: "Email",
      role: "Role",

      save: "Save Changes",
      saving: "Saving...",

      password: "Change Password",
      passwordDescription:
        "Update your password to keep your account secure.",

      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",

      updatePassword: "Update Password",
      updating: "Updating...",

      accountInfo: "Account Information",
      accountInfoDescription:
        "Your main profile information",

      administrator: "Administrator",
      activeAccount: "Active account",

      security: "Security",
      securityDescription:
        "Regularly updating your password is recommended.",

      passwordStrength: "Password strength",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",

      passwordsMismatch:
        "Passwords do not match",

      passwordTooShort:
        "New password must contain at least 6 characters",

      profileUpdated:
        "Profile updated successfully",

      passwordUpdated:
        "Password updated successfully",

      emptyPassword:
        "Please fill in all password fields",
    },
  };

  useEffect(() => {
    const saved = localStorage.getItem("language");

    if (saved === "uk" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    try {
      const parsed = JSON.parse(storedUser);

      setUser(parsed);
      setName(parsed.name || "");
      setEmail(parsed.email || "");
    } catch (error) {
      console.error("Failed to parse user:", error);
    }
  }, []);

  const passwordStrength = useMemo(() => {
    if (!newPassword) {
      return {
        level: 0,
        label: "",
      };
    }

    let score = 0;

    if (newPassword.length >= 6) score++;
    if (newPassword.length >= 10) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    if (score <= 1) {
      return {
        level: 1,
        label: t[language].weak,
      };
    }

    if (score <= 3) {
      return {
        level: 2,
        label: t[language].medium,
      };
    }

    return {
      level: 3,
      label: t[language].strong,
    };
  }, [newPassword, language]);

  const saveProfile = async () => {
    if (!user) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) {
      toast.error(
        language === "uk"
          ? "Заповніть усі поля профілю"
          : "Please fill in all profile fields"
      );
      return;
    }

    setSavingProfile(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error(
          language === "uk"
            ? "Сесія завершена. Увійдіть знову."
            : "Session expired. Please log in again."
        );
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            (language === "uk"
              ? "Не вдалося оновити профіль"
              : "Failed to update profile")
        );
      }

      const updatedUser = data?.user || {
        ...user,
        name: trimmedName,
        email: trimmedEmail,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);
      setName(updatedUser.name || "");
      setEmail(updatedUser.email || "");

      toast.success(t[language].profileUpdated);
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : language === "uk"
            ? "Не вдалося оновити профіль"
            : "Failed to update profile"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const updatePassword = async () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      toast.error(t[language].emptyPassword);
      return;
    }

    if (newPassword.length < 6) {
      toast.error(t[language].passwordTooShort);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t[language].passwordsMismatch);
      return;
    }

    setUpdatingPassword(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error(
          language === "uk"
            ? "Сесія завершена. Увійдіть знову."
            : "Session expired. Please log in again."
        );
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            (language === "uk"
              ? "Не вдалося оновити пароль"
              : "Failed to update password")
        );
      }

      toast.success(t[language].passwordUpdated);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password update error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : language === "uk"
            ? "Не вдалося оновити пароль"
            : "Failed to update password"
      );
    } finally {
      setUpdatingPassword(false);
    }
  };

  const roleLabel =
    user?.role?.toLowerCase() === "admin"
      ? t[language].administrator
      : user?.role || "—";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-6 md:px-8 md:py-8 lg:px-10">

        {/* HEADER */}
        <header className="mb-8">
          <div className="flex items-center justify-between gap-4">

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-900 hover:text-white"
            >
              <ArrowLeft size={16} />
              {t[language].back}
            </Link>

            <LanguageSwitcher />

          </div>

          <div className="mt-7 flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10">
              <User
                size={23}
                className="text-blue-400"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t[language].settings}
              </h1>

              <p className="mt-1 text-sm text-zinc-400 md:text-base">
                {t[language].manage}
              </p>
            </div>

          </div>
        </header>

        {/* ACCOUNT OVERVIEW */}
        <section className="mb-6 grid gap-5 md:grid-cols-3">

          <div className="group rounded-2xl border border-blue-500/30 bg-zinc-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50">
            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                <User
                  size={20}
                  className="text-blue-400"
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  {t[language].account}
                </p>

                <p className="mt-1 font-semibold text-white">
                  {name || "—"}
                </p>
              </div>

            </div>
          </div>

          <div className="group rounded-2xl border border-emerald-500/30 bg-zinc-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50">
            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                <ShieldCheck
                  size={20}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  {t[language].role}
                </p>

                <p className="mt-1 font-semibold text-emerald-400">
                  {roleLabel}
                </p>
              </div>

            </div>
          </div>

          <div className="group rounded-2xl border border-purple-500/30 bg-zinc-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50">
            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
                <CheckCircle2
                  size={20}
                  className="text-purple-400"
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  {t[language].account}
                </p>

                <p className="mt-1 font-semibold text-purple-400">
                  {t[language].activeAccount}
                </p>
              </div>

            </div>
          </div>

        </section>

        {/* MAIN GRID */}
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">

          {/* PROFILE */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">

            <div className="mb-7 flex items-start justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                  <User
                    size={21}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {t[language].profile}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    {t[language].profileDescription}
                  </p>
                </div>

              </div>

            </div>

            <div className="space-y-5">

              {/* NAME */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">
                  <User size={15} />
                  {t[language].name}
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder={
                    language === "uk"
                      ? "Введіть ваше ім'я"
                      : "Enter your name"
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-700 hover:border-zinc-700 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">
                  <Mail size={15} />
                  {t[language].email}
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="email@example.com"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-700 hover:border-zinc-700 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              {/* ROLE */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">
                  <ShieldCheck size={15} />
                  {t[language].role}
                </label>

                <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5">

                  <span className="text-zinc-400">
                    {roleLabel}
                  </span>

                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    {t[language].activeAccount}
                  </span>

                </div>
              </div>

              {/* SAVE */}
              <div className="flex justify-end border-t border-zinc-800 pt-6">

                <button
                  onClick={saveProfile}
                  disabled={savingProfile}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={17} />

                  {savingProfile
                    ? t[language].saving
                    : t[language].save}
                </button>

              </div>

            </div>
          </section>

          {/* SECURITY */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">

            <div className="mb-7 flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                <LockKeyhole
                  size={21}
                  className="text-purple-400"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  {t[language].password}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {t[language].passwordDescription}
                </p>
              </div>

            </div>

            <div className="space-y-5">

              {/* CURRENT PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  {t[language].currentPassword}
                </label>

                <div className="relative">

                  <input
                    type={
                      showCurrentPassword
                        ? "text"
                        : "password"
                    }
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3.5 pr-12 text-white outline-none transition hover:border-zinc-700 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(
                        !showCurrentPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  {t[language].newPassword}
                </label>

                <div className="relative">

                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3.5 pr-12 text-white outline-none transition hover:border-zinc-700 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        !showNewPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
                  >
                    {showNewPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                {newPassword && (
                  <div className="mt-3">

                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-zinc-500">
                        {t[language].passwordStrength}
                      </span>

                      <span
                        className={`text-xs font-medium ${
                          passwordStrength.level === 1
                            ? "text-red-400"
                            : passwordStrength.level === 2
                            ? "text-yellow-400"
                            : "text-emerald-400"
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>

                    <div className="flex gap-1.5">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all ${
                            level <=
                            passwordStrength.level
                              ? passwordStrength.level === 1
                                ? "bg-red-500"
                                : passwordStrength.level === 2
                                ? "bg-yellow-400"
                                : "bg-emerald-400"
                              : "bg-zinc-800"
                          }`}
                        />
                      ))}
                    </div>

                  </div>
                )}
              </div>

              {/* CONFIRM */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  {t[language].confirmPassword}
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3.5 pr-12 text-white outline-none transition hover:border-zinc-700 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* SECURITY INFO */}
              <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">

                <div className="flex gap-3">

                  <KeyRound
                    size={18}
                    className="mt-0.5 shrink-0 text-purple-400"
                  />

                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {t[language].security}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      {t[language].securityDescription}
                    </p>
                  </div>

                </div>

              </div>

              {/* UPDATE */}
              <button
                onClick={updatePassword}
                disabled={updatingPassword}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LockKeyhole size={17} />

                {updatingPassword
                  ? t[language].updating
                  : t[language].updatePassword}
              </button>

            </div>
          </section>

        </div>

      </div>
    </main>
  );
}

