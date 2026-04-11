"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { skillSections } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07 },
  }),
};

export default function SkillsPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-20">
          <p className="section-label mb-4">Expertise</p>
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            My{" "}
            <span className="text-[#F97316]">Skills</span>
          </h1>
          <p className="text-[#666] text-sm mt-4 max-w-lg">
            Technologies I&apos;ve been working with and mastering over the years.
          </p>
        </div>

        {/* Skill sections */}
        {skillSections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: si * 0.1 }}
            className="mb-16"
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-8">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: section.color }}
              />
              <h2
                className="text-xl font-bold text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {section.title}
              </h2>
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
              <span className="text-xs text-[#555]">{section.description}</span>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {section.skills.map((skill, i) => (
                <motion.div
                  key={skill.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  className="group relative rounded-xl p-5 text-center cursor-default"
                  style={{
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = section.color + "55")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
                  }
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src={skill.src}
                        alt={skill.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <p
                    className="text-xs font-semibold text-[#bbb] group-hover:text-white transition-colors"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {skill.title}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: section.color }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Always Learning banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl p-10 text-center relative overflow-hidden"
          style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(249,115,22,0.07) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Always Learning &amp; Growing
            </h3>
            <p className="text-[#666] text-sm max-w-xl mx-auto">
              I&apos;m committed to staying updated with the latest web technologies. 
              My skill set continues to evolve with hands-on experience and continuous learning.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
