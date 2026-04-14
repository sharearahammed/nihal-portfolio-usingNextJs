"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { projects } from "@/lib/data";

const categories = ["All", "Professional", "Full Stack", "Frontend"];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, color: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 10;
    const rotX = -((y - cy) / cy) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
    card.style.borderColor = color + "55";
    const shine = card.querySelector(".shine") as HTMLElement;
    if (shine) {
      const pctX = Math.round((x / rect.width) * 100);
      const pctY = Math.round((y / rect.height) * 100);
      shine.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
      shine.style.opacity = "1";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    card.style.borderColor = "var(--border)";
    const shine = card.querySelector(".shine") as HTMLElement;
    if (shine) shine.style.opacity = "0";
  };

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-4">Portfolio</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight" style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}>
            Featured <span style={{ color: "#F97316" }}>Projects</span>
          </h1>
          <p className="text-sm mt-4 max-w-lg" style={{ color: "var(--text-muted)" }}>
            A collection of projects I&apos;ve built — from production-level apps to personal experiments.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "Syne, sans-serif",
                background: active === cat ? "#F97316" : "var(--bg-card)",
                color: active === cat ? "#fff" : "var(--text-secondary)",
                border: active === cat ? "1px solid #F97316" : "1px solid var(--border)",
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Link href={`/project/${project.id}`}>
                  <div onMouseMove={(e) => handleMouseMove(e, project.color)} onMouseLeave={handleMouseLeave}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)", transition: "transform 0.15s ease, border-color 0.2s ease", transformStyle: "preserve-3d", willChange: "transform" }}>
                    
                    {/* Shine Overlay */}
                    <div className="shine absolute inset-0 pointer-events-none z-10 opacity-0" style={{ transition: "opacity 0.2s" }} />

                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: 260 }}>
                      <Image src={project.img} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}18 0%, transparent 60%)` }} />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(0,0,0,0.35)" }} />

                      {/* Hover Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        <span className="btn-brand text-sm py-2.5 px-6">View Details <HiArrowRight /></span>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2 z-20">
                        <span className="tag">{project.category}</span>
                        {project.featured && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: "#F97316", fontFamily: "Syne, sans-serif" }}>Featured</span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative z-20">
                      <div className="flex items-start justify-between mb-2">
                        <h2 className="text-base font-bold transition-colors" style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#F97316")}
                          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-primary)")}>
                          {project.title}
                        </h2>
                        <HiArrowRight className="mt-0.5 transition-colors" style={{ color: "var(--text-faint)" }} />
                      </div>
                      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => <span key={tech} className="tag">{tech}</span>)}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
