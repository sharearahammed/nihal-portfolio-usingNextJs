"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiX, HiMenuAlt3 } from "react-icons/hi";
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiLightningBolt,
  HiMail,
  HiDownload,
} from "react-icons/hi";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import Image from "next/image";
import { Theme, useTheme } from "./ThemeProvider";

const links = [
  { label: "Home",     href: "/",        icon: HiHome },
  { label: "About",    href: "/about",   icon: HiUser },
  { label: "Projects", href: "/projects",icon: HiBriefcase },
  { label: "Skills",   href: "/skills",  icon: HiLightningBolt },
  { label: "Contact",  href: "/contact", icon: HiMail },
];

const themeOptions: { value: Theme; icon: React.ElementType; label: string }[] = [
  { value: "light",  icon: FaSun,     label: "Light" },
  { value: "dark",   icon: FaMoon,    label: "Dark" },
  { value: "system", icon: FaDesktop, label: "Auto" },
];

/* ================= MOBILE SEGMENTED ================= */
function MobileThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [hovered, setHovered] = useState<Theme | null>(null);

  return (
    <div
      className="relative flex items-center p-1 rounded-xl border md:hidden"
      style={{
        background: "var(--glass-bg)",
        borderColor: "var(--border-strong)",
      }}
    >
      {/* Active Indicator */}
      <div
        className="absolute top-1 bottom-1 w-[36px] rounded-lg transition-all duration-300"
        style={{
          background: "rgba(249,115,22,0.15)",
          transform:
            theme === "light"
              ? "translateX(0)"
              : theme === "dark"
              ? "translateX(36px)"
              : "translateX(72px)",
        }}
      />

      {themeOptions.map(({ value, icon: Icon }) => {
        const isActive = theme === value;

        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
            className="relative z-10 w-[36px] h-[30px] flex items-center justify-center rounded-lg"
            style={{
              color: isActive
                ? "#F97316"
                : hovered === value
                ? "var(--text-primary)"
                : "var(--text-secondary)",
            }}
          >
            <Icon className="text-[11px]" />
          </button>
        );
      })}
    </div>
  );
}

/* ================= DESKTOP DROPDOWN ================= */
function DesktopThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const current =
    themeOptions.find((t) => t.value === theme) || themeOptions[1];
  const Icon = current.icon;

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex items-center justify-center rounded-lg border transition-all"
        style={{
          background: "var(--glass-bg)",
          borderColor: "var(--border-strong)",
          color: "var(--text-secondary)",
        }}
      >
        <Icon className="text-[14px]" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div
            className="absolute right-0 top-11 z-50 rounded-xl overflow-hidden"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-mid)",
              minWidth: 140,
            }}
          >
            {themeOptions.map(({ value, icon: OptionIcon, label }) => {
              const active = theme === value;

              return (
                <button
                  key={value}
                  onClick={() => {
                    setTheme(value);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-all"
                  style={{
                    background: active
                      ? "rgba(249,115,22,0.08)"
                      : "transparent",
                    color: active
                      ? "#F97316"
                      : "var(--text-secondary)",
                  }}
                >
                  <OptionIcon className="text-[12px]" />
                  {label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ================= MAIN ================= */
function ThemeToggle() {
  return (
    <>
      <MobileThemeToggle />
      <DesktopThemeToggle />
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        style={{
          background: scrolled ? "var(--navbar-bg-scrolled)" : "var(--bg)",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display tracking-tight">
            <Image
              src="/sa_nihal_logo.svg"
              alt="S.A. Nihal Logo"
              width={100}
              height={90}
              className="w-24 h-auto sm:w-40 md:w-28"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors duration-200`}
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: pathname === l.href ? "#F97316" : "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== l.href)
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  if (pathname !== l.href)
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/Resume of Sharear Ahammed Nihal.pdf"
              download="Resume of Sharear Ahammed Nihal.pdf"
              className="btn-outline text-sm py-2 px-5"
            >
              Download CV
            </a>
            <Link href="/contact" className="btn-brand text-sm py-2 px-5">
              Hire Me
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-2xl z-50"
              style={{ color: "var(--text-primary)" }}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-40 md:hidden flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: "280px",
          background: "var(--drawer-bg)",
          borderLeft: "1px solid var(--border-mid)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Profile card */}
        <div className="p-6 pt-20">
          <div
            className="flex items-center gap-3 p-4 rounded-xl mb-6"
            style={{
              background: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.15)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: "#F97316" }}
            >
              N
            </div>
            <div>
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
              >
                Sharear Ahammed
              </p>
              <p className="text-[#F97316] text-xs">Full Stack Developer</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1">
            {links.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{
                    background: active ? "rgba(249,115,22,0.1)" : "transparent",
                    border: active
                      ? "1px solid rgba(249,115,22,0.2)"
                      : "1px solid transparent",
                  }}
                >
                  <Icon
                    style={{
                      color: active ? "#F97316" : "var(--text-muted)",
                      fontSize: "16px",
                    }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: active ? "#F97316" : "var(--text-secondary)",
                    }}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mt-auto p-6 flex flex-col gap-3">
          <a
            href="/Resume of Sharear Ahammed Nihal.pdf"
            download="Resume of Sharear Ahammed Nihal.pdf"
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors"
            style={{
              fontFamily: "Syne, sans-serif",
              background: "var(--glass-bg)",
              border: "1px solid var(--border-soft)",
              color: "var(--text-secondary)",
            }}
          >
            <HiDownload style={{ fontSize: "16px" }} />
            Download CV
          </a>
          <Link href="/contact" className="btn-brand text-sm py-3 justify-center">
            Hire Me
          </Link>
        </div>
      </div>
    </>
  );
}
