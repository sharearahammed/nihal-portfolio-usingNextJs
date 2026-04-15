"use client";

import Link from "next/link";
import { personalInfo } from "@/lib/data";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Card entrance: scale up from below with blur
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, scale: 0.93, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 82%",
          },
        },
      );

      // ── Content items stagger in
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".cta-item") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%",
          },
        },
      );

      // ── Glow pulsing parallax as you scroll through
      gsap.to(glowRef.current, {
        scale: 1.6,
        opacity: 0.18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl text-center py-14 px-8"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* ── Grid background lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(249,115,22,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 72%)",
            }}
          />

          {/* ── Parallax glow blob */}
          <div
            ref={glowRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(249,115,22,0.13) 0%, transparent 65%)",
              transformOrigin: "center center",
            }}
          />

          {/* ── Decorative corner lines — all four corners */}
          {(["tl", "tr", "bl", "br"] as const).map((pos) => (
            <div
              key={pos}
              className="absolute pointer-events-none"
              style={{
                width: 28,
                height: 28,
                top: pos.startsWith("t") ? 20 : undefined,
                bottom: pos.startsWith("b") ? 20 : undefined,
                left: pos.endsWith("l") ? 20 : undefined,
                right: pos.endsWith("r") ? 20 : undefined,
                borderTop: pos.startsWith("t")
                  ? "1.5px solid rgba(249,115,22,0.45)"
                  : undefined,
                borderBottom: pos.startsWith("b")
                  ? "1.5px solid rgba(249,115,22,0.45)"
                  : undefined,
                borderLeft: pos.endsWith("l")
                  ? "1.5px solid rgba(249,115,22,0.45)"
                  : undefined,
                borderRight: pos.endsWith("r")
                  ? "1.5px solid rgba(249,115,22,0.45)"
                  : undefined,
                borderRadius:
                  pos === "tl"
                    ? "4px 0 0 0"
                    : pos === "tr"
                      ? "0 4px 0 0"
                      : pos === "bl"
                        ? "0 0 0 4px"
                        : "0 0 4px 0",
              }}
            />
          ))}

          {/* ── Main content */}
          <div ref={contentRef} className="relative z-10">
            {/* Available badge */}
            <div className="cta-item flex justify-center mb-5">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(249,115,22,0.1)",
                  border: "0.5px solid rgba(249,115,22,0.3)",
                  borderRadius: 999,
                  padding: "4px 14px",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgb(249,115,22)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "rgb(249,115,22)",
                    animation: "ctaDot 1.8s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                Available for work
              </span>
            </div>

            {/* Heading */}
            <h2
              className="cta-item text-3xl md:text-2xl lg:text-3xl font-bold mb-3"
              style={{
                fontFamily: "Syne, sans-serif",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Have a project in mind?
            </h2>

            {/* Email — gradient text */}
            <span
              className="cta-item block mb-4 text-md md:text-md lg:text-xl"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                color: "var(--brand)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {personalInfo.email}
            </span>

            {/* Sub-copy */}
            <p
              className="cta-item text-sm sm:text-md mb-7 max-w-md mx-auto"
              style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}
            >
              Let&apos;s collaborate and build something amazing together.
              I&apos;m currently open to freelance &amp; full-time
              opportunities.
            </p>

            {/* CTA buttons */}
            <div className="cta-item flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link href="/contact" className="btn-brand">
                Start a Project
              </Link>
              <a href={`mailto:${personalInfo.email}`} className="btn-outline">
                Send Email
              </a>
            </div>

            {/* Divider */}
            <div
              className="cta-item"
              style={{
                height: "0.5px",
                background:
                  "linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)",
                marginBottom: "1.5rem",
              }}
            />

            {/* Social links */}
            <div className="cta-item flex gap-6 justify-center flex-wrap">
              {[
                {
                  label: "GitHub",
                  href:
                    personalInfo.github ?? "https://github.com/sharearahammed",
                },
                {
                  label: "LinkedIn",
                  href:
                    personalInfo.linkedin ??
                    "https://www.linkedin.com/in/sharear-ahammed-nihal",
                },
                {
                  label: "Facebook",
                  href:
                    personalInfo.facebook ??
                    "https://www.facebook.com/Sharear.Ahammed.10",
                },
              ].map(({ label, href }: { label: string; href: string }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    transition: "color 0.18s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "rgb(249,115,22)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--text-secondary)")
                  }
                >
                  {label}
                  <span style={{ fontSize: 10, opacity: 0.6 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dot blink keyframe */}
      <style>{`
        @keyframes ctaDot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
