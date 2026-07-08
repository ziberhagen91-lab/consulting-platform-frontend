import "./globals.css";

import { Toaster } from "react-hot-toast";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata = {
  title: "Consulting Platform",
  description: "Consulting Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="uk">
      <body className="bg-black text-white">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}