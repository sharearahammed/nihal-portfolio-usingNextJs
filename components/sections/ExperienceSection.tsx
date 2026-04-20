"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "2025 — Present",
    role: "Software Engineer",
    company: "Fly Far International",
    type: "Full-Time",
    description:
      "Building and maintaining full-stack web applications for travel and ticketing platforms. Developed responsive UIs with React & Next.js, integrated REST APIs for flight and hotel booking systems, and improved overall platform performance.",
    stack: ["React.js", "Next.js", "TypeScript", "Node.js", "REST API", "Tailwind CSS"],
    side: "left",
  },
  {
    period: "2024",
    role: "Frontend Developer",
    company: "Fly Far Tech",
    type: "Full-Time",
    description:
      "Worked closely with the design and backend teams to craft pixel-perfect, responsive interfaces. Implemented Redux for state management across large-scale booking dashboards and improved code quality with TypeScript.",
    stack: ["React.js", "Redux", "TypeScript", "Material UI", "JWT", "Git"],
    side: "right",
  },
  {
    period: "2022 — 2023",
    role: "MERN Stack Learner & Builder",
    company: "Self Projects · AIUB",
    type: "Academic",
    description:
      "Sharpened full-stack skills through personal projects during CSE studies at AIUB. Built a complete PERN-stack app with PostgreSQL, a real-time chat app with Firebase, and REST APIs secured with JWT authentication.",
    stack: ["PostgreSQL", "MongoDB", "Express.js", "Firebase", "JWT", "Git"],
    side: "left",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panelEl = sectionRef.current?.closest<HTMLElement>(".panel");
    const root = panelEl ?? null; // null = viewport

    const observers: IntersectionObserver[] = [];

    const observe = (
      el: Element | null,
      onVisible: () => void,
      threshold = 0.15
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

    const headerItems = headerRef.current?.querySelectorAll(".exp-header-item") ?? [];
    if (headerRef.current) {
      headerItems.forEach((el) => {
        gsap.set(el, { y: 40, opacity: 0 });
      });
      observe(headerRef.current, () => {
        gsap.to(headerItems, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
        });
      }, 0.1);
    }

    // Timeline line
    if (lineRef.current && timelineRef.current) {
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
      observe(timelineRef.current, () => {
        gsap.to(lineRef.current, {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
        });
      }, 0.05);
    }

    // Cards
    const cards = timelineRef.current?.querySelectorAll(".exp-card") ?? [];
    cards.forEach((card) => {
      const isLeft = card.classList.contains("exp-card-left");
      gsap.set(card, { x: isLeft ? -60 : 60, opacity: 0 });
      observe(card, () => {
        gsap.to(card, {
          x: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
        });
      }, 0.1);
    });

    // Dots
    const dots = timelineRef.current?.querySelectorAll(".timeline-dot") ?? [];
    dots.forEach((dot, i) => {
      gsap.set(dot, { scale: 0, opacity: 0 });
      observe(dot, () => {
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          delay: i * 0.1,
          ease: "back.out(2.2)",
        });
      }, 0.5);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <p className="exp-header-item section-label mb-4">Career Journey</p>
          <h2
            className="exp-header-item text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
          >
            Experience that{" "}
            <em style={{ color: "var(--text-primary)", fontStyle: "italic", fontWeight: 700 }}>
              speaks volumes.
            </em>
          </h2>
          <p
            className="exp-header-item text-sm leading-relaxed max-w-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            A timeline of my professional growth, from curious beginner to a
            full-stack engineer building real-world products at Fly Far
            International.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* Desktop center line */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: "var(--border-mid)" }}
          >
            <div
              ref={lineRef}
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, var(--brand), var(--brand) 20%, rgba(45,212,191,0.15) 80%   )",
              }}
            />
          </div>

          {/* Mobile left line */}
          <div
            className="block lg:hidden absolute left-5 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, var(--brand), var(--brand) 20%, var(--text-faint) 80%)",
            }}
          />

          <div className="flex flex-col gap-16">
            {experiences.map((exp, i) => {
              const isLeft = exp.side === "left";

              const CardContent = () => (
                <>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <p
                      className="text-xs font-semibold"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        color: "var(--brand)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {exp.period}
                    </p>
                    <span
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        color: "var(--brand)",
                        border: "1px solid var(--brand)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold mb-0.5"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                    {exp.company}
                  </p>
                  <p
                    className="text-xs leading-relaxed mb-5"
                    style={{ color: "var(--text-secondary)", lineHeight: "1.75" }}
                  >
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="tag"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              );

              return (
                <div key={i} className="relative flex items-center">

                  {/* ── DESKTOP layout ── */}
                  <div className="hidden lg:grid w-full grid-cols-2 gap-12 items-center">
                    <div className={isLeft ? "flex justify-end" : ""}>
                      {isLeft && (
                        <div
                          className="exp-card exp-card-left rounded-2xl p-6 w-full max-w-md"
                          style={{ background: "var(--bg-card)", border: "1px solid var(--border-mid)" }}
                        >
                          <CardContent />
                        </div>
                      )}
                    </div>
                    <div className={!isLeft ? "flex justify-start" : ""}>
                      {!isLeft && (
                        <div
                          className="exp-card exp-card-right rounded-2xl p-6 w-full max-w-md"
                          style={{ background: "var(--bg-card)", border: "1px solid var(--border-mid)" }}
                        >
                          <CardContent />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline dot — desktop */}
                  <div
                    className="timeline-dot hidden lg:block absolute left-1/2 -translate-x-1/2 z-10"
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "var(--brand)",
                      boxShadow: "0 0 0 4px var(--brand), 0 0 18px var(--brand)",
                    }}
                  />

                  {/* ── MOBILE layout ── */}
                  <div className="flex lg:hidden items-start gap-6 w-full pl-12">
                    <div
                      className="timeline-dot absolute left-[14px] top-2 z-10"
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "var(--brand)",
                        boxShadow: "0 0 0 3px var(--brand), 0 0 12px var(--brand)",
                      }}
                    />
                    <div
                      className="exp-card exp-card-left rounded-2xl p-5 w-full"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border-mid)" }}
                    >
                      <CardContent />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}