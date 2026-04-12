"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function CTASection() {
  return (
    <section className="py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl text-center py-20 px-8"
          style={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* BG glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <p className="section-label mb-5">Get In Touch</p>
            <h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {personalInfo.email}
            </h2>
            <p className="text-[#666] text-sm mb-10 max-w-md mx-auto">
              Have a project in mind? Let&apos;s collaborate and build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-brand">
                Start a Project
              </Link>
              <a href={`mailto:${personalInfo.email}`} className="btn-outline">
                Send Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
