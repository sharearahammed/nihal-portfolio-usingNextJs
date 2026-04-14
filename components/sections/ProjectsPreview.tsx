"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { projects } from "@/lib/data";
import { useState } from "react";

export default function ProjectsPreview() {
  const featured = projects.slice(0, 4);
  const [activeId, setActiveId] = useState<number>(featured[0]?.id);

  return (
    <section className="py-28" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-4">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}>
              My Projects<br />
              <span style={{ color: "#F97316" }}>Highlight</span>
            </h2>
          </div>
          <Link href="/projects" className="btn-outline inline-flex items-center gap-2 self-start md:self-auto">
            All Projects <HiArrowRight />
          </Link>
        </div>

        {/* MOBILE: vertical stack */}
        <div className="flex flex-col gap-5 md:hidden">
          {featured.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <Link href={`/project/${project.id}`}>
                <div className="relative overflow-hidden cursor-pointer" style={{ borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  {/* Image */}
                  <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
                    <Image src={project.img} alt={project.title} fill className="object-cover" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}33 0%, transparent 60%)` }} />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(0,0,0,0.6)", color: "#ddd", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "Syne, sans-serif", backdropFilter: "blur(10px)" }}>
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                          style={{ background: project.color, color: "#000", fontFamily: "Syne, sans-serif" }}>Featured</span>
                      )}
                    </div>
                    {/* Number */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-xs font-bold" style={{ fontFamily: "Syne, sans-serif", color: project.color, letterSpacing: "0.15em" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5" style={{ borderTop: `1px solid ${project.color}33`, background: "var(--bg-card)" }}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-bold leading-tight" style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}>{project.title}</h3>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                        style={{ background: project.color + "18", border: `1px solid ${project.color}44` }}>
                        <HiArrowRight style={{ color: project.color, fontSize: "14px" }} />
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2.5 py-1 rounded-full"
                          style={{ background: project.color + "15", color: project.color, border: `1px solid ${project.color}33`, fontFamily: "Syne, sans-serif" }}>
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--glass-bg)", color: "var(--text-muted)", border: "1px solid var(--border-soft)", fontFamily: "Syne, sans-serif" }}>
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP: horizontal expand cards */}
        <motion.div className="hidden md:flex flex-row items-stretch gap-3 w-full" style={{ height: "460px" }}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }} onMouseLeave={() => setActiveId(featured[0]?.id)}>
          {featured.map((project, i) => {
            const isActive = activeId === project.id;
            return (
              <Link key={project.id} href={`/project/${project.id}`}
                style={{ textDecoration: "none", flex: isActive ? "1 1 0%" : "0 0 64px", minWidth: 0, transition: "flex 0.65s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                <div onMouseEnter={() => setActiveId(project.id)}
                  style={{ position: "relative", width: "100%", height: "460px", borderRadius: "28px", overflow: "hidden", cursor: "pointer", background: "var(--bg-card)" }}>
                  <Image src={project.img} alt={project.title} fill
                    style={{ objectFit: "cover", transform: isActive ? "scale(1.04)" : "scale(1.12)", transition: "transform 0.7s ease" }} />
                  <div className="absolute inset-0"
                    style={{ background: isActive ? "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" : "rgba(0,0,0,0.42)", transition: "background 0.5s ease" }} />
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${project.color}22 0%, transparent 55%)`, opacity: isActive ? 1 : 0, transition: "opacity 0.5s ease" }} />

                  {/* Collapsed: vertical title */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ opacity: isActive ? 0 : 1, transition: "opacity 0.25s ease" }}>
                    <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", fontFamily: "Syne, sans-serif", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      {project.title}
                    </span>
                  </div>

                  {/* Expanded: top badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease 0.2s" }}>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(0,0,0,0.6)", color: "#ddd", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "Syne, sans-serif", backdropFilter: "blur(10px)" }}>
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{ background: project.color, color: "#000", fontFamily: "Syne, sans-serif" }}>Featured</span>
                    )}
                  </div>

                  {/* Expanded: index number */}
                  <div className="absolute top-4 right-4 z-10" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease 0.2s" }}>
                    <span className="text-xs font-bold" style={{ fontFamily: "Syne, sans-serif", color: project.color, letterSpacing: "0.15em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Expanded: bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5"
                    style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s", pointerEvents: isActive ? "auto" : "none" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.22)" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M3 20l5.5-9 3.5 5.5 2.5-4 4.5 7.5H3z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                          <circle cx="17" cy="7" r="2" stroke="white" strokeWidth="1.8" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>{project.title}</h3>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{project.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2.5 py-1 rounded-full"
                          style={{ background: project.color + "20", color: project.color, border: `1px solid ${project.color}44`, fontFamily: "Syne, sans-serif", backdropFilter: "blur(6px)", fontWeight: 600 }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
