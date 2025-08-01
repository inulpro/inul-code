import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";

import { auth } from "@/auth";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InulCode",
  description:
    "InulCode Editor is a fullstack, web-based IDE built with Next.js",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
