import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Toaster } from "react-hot-toast";
import PageLoader from "@/components/sections/PageLoader";
import { ThemeProvider } from "@/components/sections/ThemeProvider";

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
    "PERN Stack Developer",
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
    { media: "(prefers-color-scheme: light)", color: "#F8F5F2" },
  ],
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
         <meta name="theme-color" content="#0A0A0A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* Anti-flicker: apply theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('portfolio_theme') || 'dark';
                  var resolved;
                  if (stored === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  } else {
                    resolved = stored;
                  }
                  document.documentElement.setAttribute('data-theme', resolved);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <PageLoader />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-soft)",
                borderRadius: "8px",
                fontFamily: "Inter, sans-serif",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
