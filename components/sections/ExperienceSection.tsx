"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const experiences = [
  {
    period: "2025 — Present",
    role: "Software Engineer",
    company: "Fly Far International",
    type: "Full-Time",
    description:
      "Building full-stack web apps for travel & ticketing platforms. Responsive UIs with React & Next.js, REST API integration for flights and hotels, and platform performance improvements.",
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "REST API",
      "Tailwind CSS",
    ],
    side: "left",
  },
  {
    period: "2024",
    role: "Frontend Developer",
    company: "Fly Far Tech",
    type: "Full-Time",
    description:
      "Crafted pixel-perfect interfaces alongside the design team. Redux state management across large-scale booking dashboards and improved code quality with TypeScript.",
    stack: ["React.js", "Redux", "TypeScript", "Material UI", "JWT", "Git"],
    side: "right",
  },
  {
    period: "2022 — 2023",
    role: "MERN Stack Builder",
    company: "Self Projects · AIUB",
    type: "Academic",
    description:
      "Sharpened full-stack skills through personal projects — a PERN-stack app with PostgreSQL, real-time Firebase chat, and JWT-secured REST APIs.",
    stack: ["PostgreSQL", "MongoDB", "Express.js", "Firebase", "JWT", "Git"],
    side: "left",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panelEl = sectionRef.current?.closest<HTMLElement>(".panel");
    const root = panelEl ?? null;

    const observers: IntersectionObserver[] = [];

    const observe = (
      el: Element | null,
      onVisible: () => void,
      threshold = 0.1,
    ) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onVisible();
              obs.unobserve(el);
            }
          });
        },
        { root, threshold },
      );
      obs.observe(el);
      observers.push(obs);
    };

    // Spine draw animation
    if (spineRef.current) {
      gsap.set(spineRef.current, { scaleY: 0, transformOrigin: "top center" });
      observe(
        spineRef.current,
        () => {
          gsap.to(spineRef.current, {
            scaleY: 1,
            duration: 2,
            ease: "power2.out",
          });
        },
        0.05,
      );
    }

    // Header items
    const headerItems =
      sectionRef.current?.querySelectorAll(".exp-header-item") ?? [];
    headerItems.forEach((el) => gsap.set(el, { y: 32, opacity: 0 }));
    if (headerItems.length > 0) {
      observe(
        headerItems[0],
        () => {
          gsap.to(headerItems, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          });
        },
        0.1,
      );
    }

    // Cards
    const cards = sectionRef.current?.querySelectorAll(".exp-card") ?? [];
    cards.forEach((card) => {
      const isLeft = card.classList.contains("exp-card-left");
      gsap.set(card, { x: isLeft ? -50 : 50, opacity: 0 });
      observe(
        card,
        () => {
          gsap.to(card, {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
          });
        },
        0.1,
      );
    });

    // Dots
    const dots = sectionRef.current?.querySelectorAll(".tl-dot") ?? [];
    dots.forEach((dot, i) => {
      gsap.set(dot, { scale: 0, opacity: 0 });
      observe(
        dot,
        () => {
          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            delay: i * 0.08,
            ease: "back.out(2)",
          });
        },
        0.5,
      );
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section
      className="max-w-7xl mx-auto px-6 lg:px-10"
      ref={sectionRef}
      style={{
        padding: "80px 48px 100px",
        borderTop: "1px solid var(--border)",
        position: "relative",
        fontFamily: "var(--font-body, DM Sans, sans-serif)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <span
          className="exp-header-item"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-body, DM Sans, sans-serif)",
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--brand)",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              display: "block",
              width: 20,
              height: 1,
              background: "var(--brand)",
            }}
          />
          Career Journey
        </span>

        <h2
          className="exp-header-item"
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.05,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
          }}
        >
          Experience that{" "}
          <em style={{ fontStyle: "italic", fontWeight: 600, opacity: 0.4 }}>
            speaks volumes.
          </em>
        </h2>

        <p
          className="exp-header-item"
          style={{
            fontFamily: "var(--font-body, DM Sans, sans-serif)",
            fontSize: 14,
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--text-muted)",
            maxWidth: 420,
            margin: 0,
          }}
        >
          A timeline of professional growth — from curious builder to full-stack
          engineer shipping real products.
        </p>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "relative",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        {/* Spine */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 1,
            transform: "translateX(-50%)",
            background: "var(--border-mid)",
          }}
        >
          <div
            ref={spineRef}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, var(--brand) 0%, var(--brand-glow) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
          {experiences.map((exp, i) => {
            const isLeft = exp.side === "left";

            const CardContent = () => (
              <div
                className={`exp-card ${isLeft ? "exp-card-left" : "exp-card-right"}`}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 20,
                  padding: "26px 28px",
                  width: "100%",
                  maxWidth: 380,
                  position: "relative",
                  transition: "all 0.35s ease",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-6px) scale(1.02)";
                  el.style.borderColor = "var(--brand)";
                  el.style.boxShadow = "0 20px 50px rgba(249,115,22,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
                }}
              >
                {/* Glow effect */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    background:
                      "radial-gradient(circle at top left, rgba(249,115,22,0.15), transparent 60%)",
                    opacity: 0,
                    transition: "0.4s",
                    pointerEvents: "none",
                  }}
                  className="card-glow"
                />

                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      color: "var(--brand)",
                      margin: 0,
                    }}
                  >
                    {exp.period}
                  </p>

                  <span
                    style={{
                      fontSize: 9,
                      textTransform: "uppercase",
                      border: "1px solid rgba(249,115,22,0.4)",
                      padding: "4px 12px",
                      borderRadius: 999,
                      color: "var(--brand)",
                      background: "rgba(249,115,22,0.08)",
                    }}
                  >
                    {exp.type}
                  </span>
                </div>

                {/* Role */}
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    marginBottom: 4,
                    color: "#fff",
                  }}
                >
                  {exp.role}
                </h3>

                {/* Company */}
                <p
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    opacity: 0.7,
                    marginBottom: 16,
                  }}
                >
                  {exp.company}
                </p>

                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(to right, transparent, var(--border), transparent)",
                    marginBottom: 16,
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.9,
                    opacity: 0.85,
                    marginBottom: 18,
                  }}
                >
                  {exp.description}
                </p>

                {/* Tech stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: 10,
                        padding: "6px 12px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "rgba(249,115,22,0.15)";
                        el.style.borderColor = "var(--brand)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "rgba(255,255,255,0.05)";
                        el.style.borderColor = "rgba(255,255,255,0.1)";
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );

            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 40px 1fr",
                  alignItems: "center",
                }}
              >
                {/* Left column */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: 28,
                  }}
                >
                  {isLeft ? (
                    <CardContent />
                  ) : (
                    <span
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontSize: 11,
                        letterSpacing: "0.12em",
                        color: "var(--border-mid)",
                        textAlign: "center",
                      }}
                    >
                      {exp.period.split("—")[0].trim()}
                    </span>
                  )}
                </div>

                {/* Center dot */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <div
                    className="tl-dot"
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "var(--brand)",
                      boxShadow:
                        "0 0 0 3px var(--brand-glow), 0 0 16px rgba(249,115,22,0.5)",
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Right column */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: 28,
                  }}
                >
                  {!isLeft ? (
                    <CardContent />
                  ) : (
                    <span
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontSize: 11,
                        letterSpacing: "0.12em",
                        color: "var(--border-mid)",
                        textAlign: "center",
                      }}
                    >
                      {exp.period.split("—")[0].trim()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
