"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { personalInfo } from "@/lib/data";
import Image from "next/image";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display tracking-tight">
          <Image
            src="/sa_nihal_logo.svg"
            alt="S.A. Nihal Logo"
            width={200}
            height={90}
            className="w-32 h-auto sm:w-40 md:w-48"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-200 hover-underline ${
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

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Resume of Sharear Ahammed Nihal.pdf"
            // href="/CV of Sharear Ahammed Nihal.pdf.pdf"
            download="Resume of Sharear Ahammed Nihal.pdf"
            className="btn-outline text-sm py-2 px-5"
          >
            Download CV
          </a>
          <Link href="/contact" className="btn-brand text-sm py-2 px-5">
            Hire Me
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#111111] border-t border-white/[0.06] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium ${pathname === l.href ? "text-[#F97316]" : "text-[#999]"}`}
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <a
              href="/Resume of Sharear Ahammed Nihal.pdf"
              // href="/CV of Sharear Ahammed Nihal.pdf.pdf"
              download="Resume of Sharear Ahammed Nihal.pdf"
              className="btn-outline text-sm py-2 px-4 flex-1 justify-center"
            >
              CV
            </a>
            <Link
              href="/contact"
              className="btn-brand text-sm py-2 px-4 flex-1 justify-center"
            >
              Hire Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
