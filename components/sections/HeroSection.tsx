"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import { personalInfo } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  // Refs for GSAP
  const sectionRef = useRef<HTMLElement>(null);
  const bgBlobTopRef = useRef<HTMLDivElement>(null);
  const bgBlobBotRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const nameLine1Ref = useRef<HTMLSpanElement>(null);
  const nameLine2Ref = useRef<HTMLSpanElement>(null);
  const nameLine3Ref = useRef<HTMLSpanElement>(null);

  // Typewriter
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
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

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 1. Cinematic entrance: name lines clip from bottom up
      const tl = gsap.timeline({ delay: 1 });

      tl.fromTo(
        [nameLine1Ref.current, nameLine2Ref.current, nameLine3Ref.current],
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
        }
      )
        .fromTo(
          textColRef.current?.querySelectorAll(".hero-fade-in") ?? [],
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1 },
          "-=0.6"
        )
        // Image mask reveal — wipes from left to right
        .fromTo(
          imageMaskRef.current,
          { scaleX: 1, transformOrigin: "left center" },
          { scaleX: 0, duration: 1.2, ease: "expo.inOut" },
          "-=0.8"
        )
        .fromTo(
          imageInnerRef.current,
          { scale: 1.18 },
          { scale: 1, duration: 1.4, ease: "power2.out" },
          "<"
        )
        .fromTo(
          [badge1Ref.current, badge2Ref.current],
          { y: 30, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.8)", stagger: 0.15 },
          "-=0.5"
        )
        .fromTo(
          scrollHintRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );

      // ── 2. Scroll parallax on background blobs
      if (bgBlobTopRef.current) {
        gsap.to(bgBlobTopRef.current, {
          y: -180,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
      if (bgBlobBotRef.current) {
        gsap.to(bgBlobBotRef.current, {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      // ── 3. Hero image parallax (slower than scroll = depth)
      if (imageWrapRef.current) {
        gsap.to(imageWrapRef.current, {
          y: 90,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.8,
          },
        });
      }

      // ── 4. Text column slightly faster than scroll (counter-parallax)
      if (textColRef.current) {
        gsap.to(textColRef.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // ── 5. Hero section fade + scale out as you scroll away
      gsap.fromTo(
        sectionRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "60% top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden dots-bg"
    >
      {/* Cursor glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-0"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.15s ease, top 0.15s ease",
        }}
      />

      {/* Background blobs — parallax targets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={bgBlobTopRef}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: 700,
            height: 700,
            background: "radial-gradient(circle, #F97316 0%, transparent 70%)",
            top: "-15%",
            right: "-10%",
          }}
        />
        <div
          ref={bgBlobBotRef}
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

          {/* Left — text column */}
          <div ref={textColRef}>
            {/* Status badge */}
            <div className="hero-fade-in inline-flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span
                className="text-xs"
                style={{ fontFamily: "Syne, sans-serif", letterSpacing: "0.1em", color: "var(--text-secondary)" }}
              >
                Available for work
              </span>
            </div>

            {/* Name — each line clips in from below */}
            <div className="mb-4">
              <div style={{ overflow: "hidden" }}>
                <span
                  ref={nameLine1Ref}
                  className="block text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight"
                  style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
                >
                  Sharear
                </span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <span
                  ref={nameLine2Ref}
                  className="block text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight text-[#F97316]"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Ahammed
                </span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <span
                  ref={nameLine3Ref}
                  className="block text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight"
                  style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
                >
                  Nihal
                </span>
              </div>
            </div>

            {/* Typewriter */}
            <div className="hero-fade-in flex items-center gap-2 mb-6 h-8">
              <span
                className="text-lg md:text-xl"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 500, color: "var(--text-secondary)" }}
              >
                {displayed}
              </span>
              <span
                className="inline-block w-0.5 h-6 bg-[#F97316] animate-pulse"
                style={{ animationDuration: "0.8s" }}
              />
            </div>

            {/* Bio */}
            <p
              className="hero-fade-in text-sm leading-relaxed max-w-md mb-10"
              style={{ color: "var(--text-secondary)" }}
            >
              Crafting beautiful, responsive web experiences with React &amp; Next.js.
              1+ year of professional experience at Fly Far Tech. CSE grad from AIUB.
            </p>

            {/* CTA */}
            <div className="hero-fade-in flex flex-wrap items-center gap-4 mb-12">
              <Link href="/projects" className="btn-brand">
                View My Work
                <HiArrowDown className="rotate-[-90deg]" />
              </Link>
              <Link href="/contact" className="btn-outline">Let&apos;s Talk</Link>
              <a
                href="/Resume of Sharear Ahammed Nihal.pdf"
                download="Resume of Sharear Ahammed Nihal.pdf"
                className="btn-outline"
              >
                Download CV
              </a>
            </div>

            {/* Social */}
            <div className="hero-fade-in flex items-center gap-6">
              <span
                className="text-xs"
                style={{ fontFamily: "Syne, sans-serif", letterSpacing: "0.15em", color: "var(--text-faint)" }}
              >
                FOLLOW
              </span>
              <div className="h-px w-8" style={{ background: "var(--border-strong)" }} />
              {[
                { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
                { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                { icon: FaFacebook, href: personalInfo.facebook, label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 text-lg"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Right — image with parallax + mask reveal */}
          <div className="flex justify-center lg:justify-end">
            <div ref={imageWrapRef} className="relative">

              {/* Spinning ring */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, #F97316, transparent, #F97316, transparent)",
                  borderRadius: "24px",
                  padding: "2px",
                  margin: "-8px",
                  opacity: 0.3,
                  animation: "spin 8s linear infinite",
                }}
              />

              {/* Photo card — mask reveal container */}
              <div
                className="relative gradient-border overflow-hidden"
                style={{ width: 320, height: 400, borderRadius: "20px", background: "#111" }}
              >
                {/* Actual image */}
                <div ref={imageInnerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
                  <Image
                    src="/nihal.jpg"
                    alt="Sharear Ahammed Nihal"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Overlay gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)" }}
                />

                {/* Mask overlay — slides away on reveal */}
                <div
                  ref={imageMaskRef}
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "var(--bg)", transformOrigin: "left center", zIndex: 10 }}
                />

                {/* Info card */}
                <div className="absolute bottom-5 left-4 right-4" style={{ zIndex: 11 }}>
                  <div className="glass-card rounded-xl px-4 py-3" style={{ backdropFilter: "blur(16px)" }}>
                    <p className="text-xs mb-0.5" style={{ color: "var(--text-secondary)" }}>Currently at</p>
                    <p className="text-white text-sm font-semibold" style={{ fontFamily: "Syne, sans-serif",color:"var(--text-primary)" }}>
                      Fly Far International
                    </p>
                  </div>
                </div>
              </div>

              {/* Badge 1 — experience */}
              <div
                ref={badge1Ref}
                className="absolute -top-8 -right-5 glass-card rounded-xl px-4 py-3 text-center"
                style={{ background: "var(--bg-card)", border: "1px solid rgba(249,115,22,0.3)" }}
              >
                <p className="text-2xl font-bold text-[#F97316]" style={{ fontFamily: "Syne, sans-serif" }}>1+</p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Years Exp.</p>
              </div>

              {/* Badge 2 — stack */}
              <div
                ref={badge2Ref}
                className="absolute -bottom-10 -left-6 glass-card rounded-xl px-4 py-3 text-center"
                style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-2xl font-bold" style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}>10+</p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Technologies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-[10px]"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "0.2em", color: "var(--text-faint)" }}
          >
            SCROLL
          </span>
          <div
            className="w-px h-10 bg-gradient-to-b from-[#F97316] to-transparent"
            style={{ animation: "scrollPulse 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.4; transform: scaleY(0.7); }
        }
      `}</style>
    </section>
  );
}
