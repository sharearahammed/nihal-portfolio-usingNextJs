"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import { personalInfo } from "@/lib/data";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "PERN Stack Developer",
  "MERN Stack Developer",
  "Backend Developer",
  "Front-End Developer",
  "React Specialist",
  "Next.js Developer",
  "UI Craftsman",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          80,
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  // Cursor follow
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden dots-bg">
      {/* Cursor glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-0"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.2s ease, top 0.2s ease",
        }}
      />

      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(circle, #F97316 0%, transparent 70%)",
            top: "-10%",
            right: "-10%",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-10"
          style={{
            width: 400,
            height: 400,
            background: "radial-gradient(circle, #F97316 0%, transparent 70%)",
            bottom: "10%",
            left: "5%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span
                className="text-xs text-[#888]"
                style={{
                  fontFamily: "Syne, sans-serif",
                  letterSpacing: "0.1em",
                }}
              >
                Available for work
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#888] text-base mb-3"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Hi, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-4 tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Sharear
              <br />
              <span className="text-[#F97316]">Ahammed</span>
              <br />
              Nihal
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mb-6 h-8"
            >
              <span
                className="text-lg md:text-xl text-[#bbb]"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 500 }}
              >
                {displayed}
              </span>
              <span
                className="inline-block w-0.5 h-6 bg-[#F97316] animate-pulse"
                style={{ animationDuration: "0.8s" }}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#666] text-sm leading-relaxed max-w-md mb-10"
            >
              Crafting beautiful, responsive web experiences with React &
              Next.js. 1+ year of professional experience at Fly Far Tech. CSE
              grad from AIUB.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Link href="/projects" className="btn-brand">
                View My Work
                <HiArrowDown className="rotate-[-90deg]" />
              </Link>
              <Link href="/contact" className="btn-outline">
                Let&apos;s Talk
              </Link>
              <a
                href="/Resume of Sharear Ahammed Nihal.pdf"
                // href="/CV of Sharear Ahammed Nihal.pdf.pdf"
                download="Resume of Sharear Ahammed Nihal.pdf"
                className="btn-outline"
              >
                Download CV
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6"
            >
              <span
                className="text-xs text-[#444]"
                style={{
                  fontFamily: "Syne, sans-serif",
                  letterSpacing: "0.15em",
                }}
              >
                FOLLOW
              </span>
              <div className="h-px w-8 bg-white/10" />
              {[
                { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
                {
                  icon: FaLinkedin,
                  href: personalInfo.linkedin,
                  label: "LinkedIn",
                },
                {
                  icon: FaFacebook,
                  href: personalInfo.facebook,
                  label: "Facebook",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555] hover:text-white transition-colors duration-200 text-lg"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Spinning ring */}
              <div
                className="absolute inset-0 rounded-2xl animate-spin-slow opacity-30 pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, #F97316, transparent, #F97316, transparent)",
                  borderRadius: "24px",
                  padding: "2px",
                  margin: "-8px",
                }}
              />

              {/* Photo card */}
              <div
                className="relative gradient-border overflow-hidden"
                style={{
                  width: 320,
                  height: 400,
                  borderRadius: "20px",
                  background: "#111",
                }}
              >
                <Image
                  src="/nihal.jpg"
                  alt="Sharear Ahammed Nihal"
                  fill
                  className="object-cover object-top"
                  priority
                />

                {/* Overlay gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)",
                  }}
                />

                {/* Info card at bottom */}
                <div className="absolute bottom-5 left-4 right-4">
                  <div
                    className="glass-card rounded-xl px-4 py-3"
                    style={{ backdropFilter: "blur(16px)" }}
                  >
                    <p className="text-xs text-[#888] mb-0.5">Currently at</p>
                    <p
                      className="text-white text-sm font-semibold"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      Fly Far International
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating badge — experience */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-5 glass-card rounded-xl px-4 py-3 text-center"
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(249,115,22,0.3)",
                }}
              >
                <p
                  className="text-2xl font-bold text-[#F97316]"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  1+
                </p>
                <p className="text-xs text-[#888]">Years Exp.</p>
              </motion.div>

              {/* Floating badge — stack */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-10 -left-6 glass-card rounded-xl px-4 py-3 text-center"
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  10+
                </p>
                <p className="text-xs text-[#888]">Technologies</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-[10px] text-[#444]"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "0.2em" }}
          >
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-[#F97316] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
