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
import { FaSun, FaMoon } from "react-icons/fa";
import { personalInfo } from "@/lib/data";
import Image from "next/image";

const links = [
  { label: "Home", href: "/", icon: HiHome },
  { label: "About", href: "/about", icon: HiUser },
  { label: "Projects", href: "/projects", icon: HiBriefcase },
  { label: "Skills", href: "/skills", icon: HiLightningBolt },
  { label: "Contact", href: "/contact", icon: HiMail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-[#0A0A0A]"
        }`}
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
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === l.href
                    ? "text-[#F97316]"
                    : "text-[#999] hover:text-white"
                }`}
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white text-2xl z-50"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
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

      {/* Drawer — right side */}
      <div
        className="fixed top-0 right-0 h-full z-40 md:hidden flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: "280px",
          background: "#111",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
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
                className="text-white text-sm font-semibold"
                style={{ fontFamily: "Syne, sans-serif" }}
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
                      color: active ? "#F97316" : "#666",
                      fontSize: "16px",
                    }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: active ? "#F97316" : "#888",
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
          {/* CV Download */}
          <a
            href="/Resume of Sharear Ahammed Nihal.pdf"
            download="Resume of Sharear Ahammed Nihal.pdf"
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-[#888] hover:text-white transition-colors"
            style={{
              fontFamily: "Syne, sans-serif",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <HiDownload style={{ fontSize: "16px" }} />
            Download CV
          </a>

          {/* Hire Me */}
          <Link
            href="/contact"
            className="btn-brand text-sm py-3 justify-center"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </>
  );
}
