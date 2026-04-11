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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
