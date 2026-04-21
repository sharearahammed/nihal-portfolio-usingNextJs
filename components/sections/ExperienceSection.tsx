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
      threshold = 0.1
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
        { root, threshold }
      );
      obs.observe(el);
      observers.push(obs);
    };

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
        0.05
      );
    }

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
        0.1
      );
    }

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
        0.1
      );
    });

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
        0.5
      );
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      <style>{`
        /* ── Spine ── */
        .tl-spine-bg {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.2);
        }

        /* ── Desktop row grid ── */
        .tl-row {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          align-items: center;
        }
        .tl-col-left {
          display: flex;
          justify-content: flex-end;
          padding-right: 28px;
        }
        .tl-col-right {
          display: flex;
          justify-content: flex-start;
          padding-left: 28px;
        }
        .tl-col-center {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        /* ── Card base ── */
        .exp-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 26px 28px;
          width: 100%;
          max-width: 380px;
          position: relative;
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          box-sizing: border-box;
        }
        .exp-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: var(--brand);
          box-shadow: 0 20px 50px rgba(249,115,22,0.25);
        }

        /* ── Tablet + Mobile: single column ── */
        @media (max-width: 860px) {
          .exp-section {
            padding: 64px 24px 80px !important;
          }
          .tl-spine-bg {
            left: 16px;
            transform: none;
          }
          .tl-rows {
            padding-left: 44px;
          }
          .tl-row {
            display: block;
            position: relative;
          }
          .tl-col-left,
          .tl-col-right {
            display: block;
            padding: 0;
          }
          .tl-col-center {
            position: absolute;
            left: -32.5px;
            top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tl-date-label-only {
            display: none !important;
          }
          .exp-card {
            max-width: 100% !important;
          }
        }

        /* ── Mobile only ── */
        @media (max-width: 640px) {
          .exp-section {
            padding: 48px 16px 72px !important;
          }
          .tl-spine-bg {
            left: 16px;
          }
          .tl-rows {
            padding-left: 44px;
            gap: 32px !important;
          }
          .tl-col-center {
            left: -32.52px;
            top: 20px;
          }
          .exp-card {
            padding: 20px 18px !important;
            border-radius: 14px !important;
          }
          .exp-card-role {
            font-size: 16px !important;
          }
          .exp-header-h2 {
            font-size: clamp(28px, 8vw, 40px) !important;
          }
        }
      `}</style>

      <section
        className="exp-section"
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
            className="exp-header-item exp-header-h2"
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
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.8,
              color: "var(--text-muted)",
              maxWidth: 420,
              margin: 0,
            }}
          >
            A timeline of professional growth — from curious builder to
            full-stack engineer shipping real products.
          </p>
        </div>

        {/* Timeline */}
        <div className="tl-wrap" style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
          {/* Spine */}
          <div className="tl-spine-bg">
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
          <div
            className="tl-rows"
            style={{ display: "flex", flexDirection: "column", gap: 52 }}
          >
            {experiences.map((exp, i) => {
              const isLeft = exp.side === "left";

              const CardContent = () => (
                <div
                  className={`exp-card ${isLeft ? "exp-card-left" : "exp-card-right"}`}
                >
                  {/* Top row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 14,
                      flexWrap: "wrap",
                      gap: 8,
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
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Role */}
                  <h3
                    className="exp-card-role"
                    style={{
                      fontSize: 19,
                      fontWeight: 700,
                      marginBottom: 4,
                      color: "#fff",
                      fontFamily: "Syne, sans-serif",
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
                      margin: "0 0 16px",
                    }}
                  >
                    {exp.company}
                  </p>

                  <div
                    style={{
                      height: 1,
                      background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
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
                      margin: "0 0 18px",
                    }}
                  >
                    {exp.description}
                  </p>

                  {/* Stack */}
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
                          transition: "background 0.3s, border-color 0.3s",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(249,115,22,0.15)";
                          e.currentTarget.style.borderColor = "var(--brand)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );

              return (
                <div key={i} className="tl-row">
                  {/* Left column */}
                  <div className="tl-col-left">
                    {isLeft ? (
                      <CardContent />
                    ) : (
                      <span
                        className="tl-date-label-only"
                        style={{
                          fontFamily: "Syne, sans-serif",
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          color: "rgba(255,255,255,0.2)",
                        }}
                      >
                        {exp.period.split("—")[0].trim()}
                      </span>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="tl-col-center">
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
                  <div className="tl-col-right">
                    {!isLeft ? (
                      <CardContent />
                    ) : (
                      <span
                        className="tl-date-label-only"
                        style={{
                          fontFamily: "Syne, sans-serif",
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          color: "rgba(255,255,255,0.2)",
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
    </>
  );
}