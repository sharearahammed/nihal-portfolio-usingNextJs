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

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-4">Portfolio</p>
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Featured{" "}
            <span className="text-[#F97316]">Projects</span>
          </h1>
          <p className="text-[#666] text-sm mt-4 max-w-lg">
            A collection of projects I&apos;ve built — from production-level apps to personal experiments.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "Syne, sans-serif",
                background: active === cat ? "#F97316" : "#111",
                color: active === cat ? "#fff" : "#888",
                border: active === cat ? "1px solid #F97316" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/project/${project.id}`}>
                  <div
                    className="group rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                      background: "#111",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transition: "border-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
                    }
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: 260 }}>
                      <Image
                        src={project.img}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}18 0%, transparent 60%)`,
                        }}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(10,10,10,0.4)" }}
                      />
                      {/* Hover button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="btn-brand text-sm py-2.5 px-6">
                          View Details <HiArrowRight />
                        </span>
                      </div>
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="tag">{project.category}</span>
                        {project.featured && (
                          <span
                            className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                            style={{ background: "#F97316", fontFamily: "Syne, sans-serif" }}
                          >
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h2
                          className="text-base font-bold text-white group-hover:text-[#F97316] transition-colors"
                          style={{ fontFamily: "Syne, sans-serif" }}
                        >
                          {project.title}
                        </h2>
                        <HiArrowRight className="text-[#444] group-hover:text-[#F97316] transition-colors mt-0.5" />
                      </div>
                      <p className="text-[#666] text-xs leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="tag">{tech}</span>
                        ))}
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
