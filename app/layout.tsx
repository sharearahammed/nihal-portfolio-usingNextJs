import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Sharear Ahammed Nihal | Full Stack Developer",
  description:
    "Portfolio of Sharear Ahammed Nihal – Full Stack Developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "React",
    "Next.js",
    "TypeScript",
    "Backend Developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Front-End Developer",
    "Portfolio",
  ],
  authors: [{ name: "Sharear Ahammed Nihal" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#0A0A0A" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
