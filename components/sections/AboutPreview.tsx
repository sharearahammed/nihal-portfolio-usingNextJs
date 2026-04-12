"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { personalInfo, stats } from "@/lib/data";

export default function AboutPreview() {
  return (
    <section className="py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main image */}
            <div
              className="relative gradient-border overflow-hidden"
              style={{ borderRadius: "16px", background: "#111" }}
            >
              <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px]">
                <Image
                  src="/aboutMe.png"
                  alt="About Nihal"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.8) 100%)",
                  }}
                />
              </div>
            </div>

            {/* Stats floating cards */}
            <div className="absolute -right-6 top-[-35px] grid grid-cols-1 gap-3">
              {stats.slice(0, 2).map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.04 }}
                  className="glass-card rounded-xl px-5 py-3 text-center"
                  style={{
                    background: "#1A1A1A",
                    border: "1px solid rgba(249,115,22,0.2)",
                    minWidth: 100,
                  }}
                >
                  <p
                    className="text-2xl font-bold text-[#F97316]"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[10px] text-[#888] mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Bottom badge */}
            <div
              className="absolute bottom-5 left-5 glass-card rounded-xl px-4 py-3"
              style={{
                backdropFilter: "blur(16px)",
                background: "rgba(26,26,26,0.9)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-xs text-[#666] mb-0.5">Education</p>
              <p
                className="text-sm text-white font-semibold"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {personalInfo.education}
              </p>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-4">About Me</p>

            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Let&apos;s get to know
              <br />
              <span className="text-[#F97316]">each other</span> closer
            </h2>

            <p className="text-[#888] text-sm leading-relaxed mb-4">
              {personalInfo.bio}
            </p>
            <p className="text-[#666] text-sm leading-relaxed mb-10">
              Passionate about turning complex problems into elegant,
              user-friendly web solutions. I thrive in collaborative
              environments and am always eager to learn cutting-edge
              technologies.
            </p>

            {/* Key highlights */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                {
                  icon: "💻",
                  title: "Full-Stack Capable",
                  desc: "React, Node, MongoDB",
                },
                {
                  icon: "🎓",
                  title: "CSE from AIUB",
                  desc: "Strong foundations",
                },
                {
                  icon: "🏢",
                  title: "Fly Far International",
                  desc: "1+ yr Professional",
                },
                {
                  icon: "📍",
                  title: "Dhaka, Bangladesh",
                  desc: "Open to remote",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass-card rounded-xl p-4"
                  style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="text-xl mb-2 block">{item.icon}</span>
                  <p
                    className="text-xs font-semibold text-white mb-0.5"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-[10px] text-[#666]">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="btn-brand inline-flex items-center gap-2"
            >
              Know More About Me
              <HiArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
