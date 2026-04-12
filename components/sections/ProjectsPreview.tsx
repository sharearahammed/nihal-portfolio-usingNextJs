"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowRight, HiExternalLink } from "react-icons/hi";
import { projects } from "@/lib/data";
import { useState } from "react";

export default function ProjectsPreview() {
  const featured = projects.slice(0, 4);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-4">Portfolio</p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              My Projects
              <br />
              <span className="text-[#F97316]">Highlight</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="btn-outline inline-flex items-center gap-2 self-start md:self-auto"
          >
            All Projects <HiArrowRight />
          </Link>
        </div>

        {/* Projects Grid — matches figma 2x2 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/project/${project.id}`}>
                <div
                  className="relative overflow-hidden cursor-pointer"
                  style={{
                    borderRadius: "24px",
                    background: "#111",
                  }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: "300px", }}
                  >
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      // className="object-cover"
                      style={{
                        transform:
                          hoveredId === project.id ? "scale(1.08)" : "scale(1)",
                        transition: "transform 0.7s ease",
                      }}
                    />

                    {/* Color tint */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}33 0%, transparent 60%)`,
                      }}
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      <span
                        className="text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{
                          background: "rgba(0,0,0,0.6)",
                          color: "#ddd",
                          border: "1px solid rgba(255,255,255,0.12)",
                          fontFamily: "Syne, sans-serif",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        {project.category}
                      </span>
                      {project.featured && (
                        <span
                          className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                          style={{
                            background: project.color,
                            fontFamily: "Syne, sans-serif",
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Number */}
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className="text-xs font-bold"
                        style={{
                          fontFamily: "Syne, sans-serif",
                          color: project.color,
                          letterSpacing: "0.15em",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* + icon — desktop only, hides on hover */}
                    <div
                      className="absolute bottom-4 right-4 z-20 w-9 h-9 rounded-full items-center justify-center hidden md:flex"
                      style={{
                        background: "rgba(0,0,0,0.65)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        opacity: hoveredId === project.id ? 0 : 1,
                        transform:
                          hoveredId === project.id ? "scale(0.7)" : "scale(1)",
                        transition: "opacity 0.3s, transform 0.3s",
                      }}
                    >
                      <span className="text-white text-lg font-light">+</span>
                    </div>

                    {/* Desktop slide-up drawer — hover only */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-10 p-5 hidden md:block"
                      style={{
                        background: "rgba(8,8,8,0.93)",
                        backdropFilter: "blur(20px)",
                        borderTop: `1px solid ${project.color}44`,
                        transform:
                          hoveredId === project.id
                            ? "translateY(0)"
                            : "translateY(100%)",
                        transition:
                          "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <h3
                        className="text-base font-bold text-white mb-1.5 leading-tight"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-[#777] text-xs leading-relaxed mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              background: project.color + "18",
                              color: project.color,
                              border: `1px solid ${project.color}33`,
                              fontFamily: "Syne, sans-serif",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile content — always visible below image */}
                  <div
                    className="block md:hidden p-5"
                    style={{
                      borderTop: `1px solid ${project.color}33`,
                      background: "#0f0f0f",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="text-base font-bold text-white leading-tight"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        {project.title}
                      </h3>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                        style={{
                          background: project.color + "18",
                          border: `1px solid ${project.color}44`,
                        }}
                      >
                        <HiArrowRight
                          style={{ color: project.color, fontSize: "14px" }}
                        />
                      </div>
                    </div>
                    <p className="text-[#666] text-xs leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: project.color + "15",
                            color: project.color,
                            border: `1px solid ${project.color}33`,
                            fontFamily: "Syne, sans-serif",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            color: "#666",
                            border: "1px solid rgba(255,255,255,0.08)",
                            fontFamily: "Syne, sans-serif",
                          }}
                        >
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
      </div>
    </section>
  );
}
