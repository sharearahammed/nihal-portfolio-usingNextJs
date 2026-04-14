"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { personalInfo, stats, skillSections } from "@/lib/data";

const highlights = [
  {
    icon: "💡",
    title: "Problem Solver",
    desc: "Creative solutions to complex challenges",
  },
  {
    icon: "🤝",
    title: "Team Player",
    desc: "Collaborate effectively with developers",
  },
  {
    icon: "🎨",
    title: "UI Enthusiast",
    desc: "Crafting beautiful, clean interfaces",
  },
  {
    icon: "🔐",
    title: "Security Focused",
    desc: "Building secure and reliable APIs",
  },
  {
    icon: "📚",
    title: "Continuous Learner",
    desc: "Always exploring new technologies",
  },
  {
    icon: "⚡",
    title: "Performance Driven",
    desc: "Optimizing apps for speed & UX",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Page Header */}
        <div className="mb-20">
          <p className="section-label mb-4">About Me</p>
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "var(--text-primary)",
            }}
          >
            Get to know me
            <br />
            <span style={{ color: "#F97316" }}>a little closer</span>
          </h1>
        </div>

        {/* Main intro grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="relative gradient-border overflow-hidden"
              style={{
                borderRadius: "16px",
                height: 500,
                background: "var(--bg-card)",
              }}
            >
              <Image
                src="/nihal.jpg"
                alt={personalInfo.name}
                fill
                className="object-cover object-top"
                priority
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5">
                <div
                  className="glass-card rounded-xl px-4 py-3"
                  style={{
                    backdropFilter: "blur(16px)",
                    background: "var(--bg-card)",
                  }}
                >
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Front-End Developer at
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    Fly Far International
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{
                fontFamily: "Syne, sans-serif",
                color: "var(--text-primary)",
              }}
            >
              Hello! I&apos;m{" "}
              <span style={{ color: "#F97316" }}>Sharear Ahammed</span>
            </h2>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              {personalInfo.bio}
            </p>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              I bring a deep focus on performance, accessibility, and clean
              code. Whether it&apos;s building complex flight booking systems or
              crafting elegant landing pages, I approach every project with the
              same level of dedication and attention to detail.
            </p>

            {/* Info rows */}
            <div className="space-y-3 mb-8">
              {[
                { label: "Name", value: personalInfo.name },
                { label: "Email", value: personalInfo.email },
                { label: "Phone", value: personalInfo.phone },
                { label: "Location", value: personalInfo.location },
                { label: "Education", value: personalInfo.education },
                { label: "Experience", value: personalInfo.experience },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex gap-4 text-sm py-2 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span
                    className="w-24 flex-shrink-0"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      color: "#F97316",
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ color: "var(--text-secondary)" }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="/Resume of Sharear Ahammed Nihal.pdf"
                download="Resume of Sharear Ahammed Nihal.pdf"
                className="btn-brand"
              >
                <HiDownload /> Download CV
              </a>
              <Link href="/contact" className="btn-outline">
                Hire Me
              </Link>
            </div>

            {/* Social */}
            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: personalInfo.github },
                { icon: FaLinkedin, href: personalInfo.linkedin },
                { icon: FaFacebook, href: personalInfo.facebook },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative overflow-hidden rounded-3xl p-[1px]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(249,115,22,0.5), var(--border))",
              }}
            >
              <div
                className="rounded-3xl p-8 text-center"
                style={{
                  background: "var(--bg-card)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="text-5xl mb-3">{s.icon}</div>
                <h3
                  className="text-4xl font-bold"
                  style={{ fontFamily: "Syne, sans-serif", color: "#F97316" }}
                >
                  {s.value}
                </h3>
                <p
                  className="text-sm mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What Drives Me */}
        <div className="mb-24">
          <p className="section-label mb-4">Values</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "var(--text-primary)",
            }}
          >
            What Drives Me
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.04, rotateX: 4, rotateY: 4 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl p-[1px]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(249,115,22,0.4), var(--border), rgba(249,115,22,0.15))",
                }}
              >
                <div
                  className="relative h-full rounded-3xl p-7 overflow-hidden"
                  style={{
                    background: "var(--bg-card)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F97316]/10 blur-3xl rounded-full group-hover:bg-[#F97316]/20 transition-all duration-500" />
                  <div className="mb-5 text-5xl relative z-10">{h.icon}</div>
                  <h3
                    className="text-lg font-bold mb-2 relative z-10"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    {h.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed relative z-10"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {h.desc}
                  </p>
                  <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-[#F97316] transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack preview */}
        <div>
          <p className="section-label mb-4">Skills</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "var(--text-primary)",
            }}
          >
            My Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillSections.map((section, si) => (
              <motion.div
                key={section.title}
                custom={si}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden p-6 rounded-2xl"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className="absolute top-0 left-0 h-1 w-full"
                  style={{ background: section.color }}
                />
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: section.color }}
                  />
                  <h3
                    className="text-sm font-bold"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    {section.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.skills.map((skill) => (
                    <span key={skill.title} className="tag">
                      {skill.title}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/skills"
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-2xl relative overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-strong)",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                color: "var(--text-primary)",
                boxShadow: "0 10px 25px rgba(249,115,22,0.15)",
              }}
            >
              <span className="relative z-10">View Full Skills Page</span>
              <span className="relative z-10 text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 20%, rgba(249,115,22,0.1), transparent 80%)",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
