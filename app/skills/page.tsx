"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { skillSections } from "@/lib/data";

export default function SkillsPage() {
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    color: string
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 14;
    const rotX = -((y - cy) / cy) * 14;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.06,1.06,1.06)`;
    card.style.borderColor = color + "88";

    const shine = card.querySelector(".shine") as HTMLElement;
    if (shine) {
      const pctX = Math.round((x / rect.width) * 100);
      const pctY = Math.round((y / rect.height) * 100);
      shine.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.08) 0%, transparent 65%)`;
      shine.style.opacity = "1";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.borderColor = "rgba(255,255,255,0.06)";
    const shine = card.querySelector(".shine") as HTMLElement;
    if (shine) shine.style.opacity = "0";
  };

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
                className="w-3 h-3 rounded-full flex-shrink-0"
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onMouseMove={(e) => handleMouseMove(e, section.color)}
                  onMouseLeave={handleMouseLeave}
                  className="group relative rounded-xl p-5 text-center cursor-default"
                  style={{
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition:
                      "transform 0.12s ease, border-color 0.2s ease",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {/* Shine overlay */}
                  <div
                    className="shine absolute inset-0 rounded-xl pointer-events-none z-0 opacity-0"
                    style={{ transition: "opacity 0.2s" }}
                  />

                  {/* Icon */}
                  <div className="relative z-10 flex justify-center mb-3">
                    <div
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <Image
                        src={skill.src}
                        alt={skill.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <p
                    className="relative z-10 text-xs font-semibold text-[#bbb] group-hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {skill.title}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10"
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