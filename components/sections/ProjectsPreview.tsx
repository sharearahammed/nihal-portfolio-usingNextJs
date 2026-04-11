"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowRight, HiExternalLink } from "react-icons/hi";
import { projects } from "@/lib/data";

export default function ProjectsPreview() {
  const featured = projects.slice(0, 4);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/project/${project.id}`}>
                <div
                  className="group relative gradient-border overflow-hidden cursor-pointer"
                  style={{
                    borderRadius: "16px",
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: 240 }}>
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}22 0%, transparent 60%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "rgba(10,10,10,0.5)",
                      }}
                    />

                    {/* Hover overlay icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: "#F97316" }}
                      >
                        <HiExternalLink className="text-white text-lg" />
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="tag">{project.category}</span>
                    </div>

                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                          style={{ background: "#F97316", fontFamily: "Syne, sans-serif" }}
                        >
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="text-base font-bold text-white group-hover:text-[#F97316] transition-colors duration-200"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        {project.title}
                      </h3>
                      <HiArrowRight
                        className="text-[#444] group-hover:text-[#F97316] transition-colors duration-200 mt-0.5 flex-shrink-0"
                      />
                    </div>
                    <p className="text-[#666] text-xs leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="tag">+{project.stack.length - 3}</span>
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
