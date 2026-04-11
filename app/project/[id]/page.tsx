"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowLeft, HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/lib/data";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id)) as
    | (typeof projects)[0] & {
        githubServerUrl?: string;
        backendUrl?: string;
      };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center pt-24">
        <div>
          <h1
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Project Not Found
          </h1>
          <Link href="/projects" className="btn-brand">
            <HiArrowLeft /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const others = projects.filter((p) => p.id !== project.id).slice(0, 2);

  const hasFrontendAndBackend =
    project.liveUrl !== "#" && project.backendUrl;

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-white transition-colors mb-10"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          <HiArrowLeft /> Back to Projects
        </Link>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-2xl overflow-hidden mb-12"
          style={{
            height: 480,
            background: "#111",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${project.color}22 0%, transparent 50%)`,
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="tag">{project.category}</span>
                {project.featured && (
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ background: "#F97316" }}
                  >
                    Featured
                  </span>
                )}
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {project.title}
              </h1>

              <p className="text-[#888] text-sm leading-relaxed mb-8">
                {project.longDescription}
              </p>

              {/* Screenshot gallery */}
              {project.images.length > 1 && (
                <div>
                  <h2
                    className="text-lg font-bold text-white mb-4"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    Screenshots
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.images.slice(1).map((img, i) => (
                      <div
                        key={i}
                        className="relative rounded-xl overflow-hidden"
                        style={{
                          height: 200,
                          background: "#111",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${i + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Tech stack */}
            <div
              className="p-6 rounded-xl mb-6"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3
                className="text-sm font-bold text-white mb-4"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div
              className="p-6 rounded-xl mb-6"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3
                className="text-sm font-bold text-white mb-4"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Project Links
              </h3>
              <div className="flex flex-col gap-3">

                {/* Live Links */}
                {hasFrontendAndBackend ? (
                  <>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-brand text-sm py-2.5 justify-center"
                    >
                      <HiExternalLink /> Frontend Live
                    </a>
                    <a
                      href={project.backendUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-brand text-sm py-2.5 justify-center"
                    >
                      <HiExternalLink /> Backend Live
                    </a>
                  </>
                ) : project.liveUrl !== "#" ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brand text-sm py-2.5 justify-center"
                  >
                    <HiExternalLink /> Live Link
                  </a>
                ) : null}

                {/* GitHub Links */}
                {project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm py-2.5 justify-center"
                  >
                    <FaGithub /> Github Client Link
                  </a>
                )}
                {project.githubServerUrl && (
                  <a
                    href={project.githubServerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm py-2.5 justify-center"
                  >
                    <FaGithub /> Github Server Link
                  </a>
                )}

              </div>
            </div>
          </motion.div>
        </div>

        {/* Other Projects */}
        {others.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/[0.05]">
            <h2
              className="text-2xl font-bold text-white mb-8"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Other Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((p) => (
                <Link key={p.id} href={`/project/${p.id}`}>
                  <div
                    className="group rounded-xl overflow-hidden"
                    style={{
                      background: "#111",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{ height: 180 }}
                    >
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className="text-sm font-bold text-white group-hover:text-[#F97316] transition-colors mb-1"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-xs text-[#666] line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
