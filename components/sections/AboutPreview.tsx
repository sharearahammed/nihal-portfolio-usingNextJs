"use client";

import Link from "next/link";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import { personalInfo, stats } from "@/lib/data";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: "💻", title: "Full-Stack Capable", desc: "React, Node, MongoDB" },
  { icon: "🎓", title: "CSE from AIUB", desc: "Strong foundations" },
  { icon: "🏢", title: "Fly Far International", desc: "1+ yr Professional" },
  { icon: "📍", title: "Dhaka, Bangladesh", desc: "Open to remote" },
];

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Image mask reveal (slide from right)
      const imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: imageWrapRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      imgTl
        .fromTo(
          maskRef.current,
          { scaleX: 1, transformOrigin: "right center" },
          { scaleX: 0, duration: 1.1, ease: "expo.inOut" },
        )
        .fromTo(
          imageInnerRef.current,
          { scale: 1.15 },
          { scale: 1, duration: 1.3, ease: "power2.out" },
          "<",
        )
        .fromTo(
          statsRef.current?.children ?? [],
          { y: 30, opacity: 0, scale: 0.88 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.15,
            ease: "back.out(1.6)",
          },
          "-=0.4",
        );

      // ── Text side: stagger reveal
      gsap.fromTo(
        textRef.current?.querySelectorAll(".about-item") ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
          },
        },
      );

      // ── Highlight cards: zoom in stagger
      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        },
      );

      // ── Parallax on image (slower than scroll)
      gsap.to(imageWrapRef.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <div ref={imageWrapRef} className="relative">
            <div
              className="relative gradient-border overflow-hidden"
              style={{ borderRadius: "16px", background: "var(--bg-card)" }}
            >
              <div
                ref={imageInnerRef}
               className="relative w-full h-[280px] sm:h-[400px] md:h-[480px]"
              >
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

              {/* Mask overlay */}
              <div
                ref={maskRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "var(--bg)",
                  transformOrigin: "right center",
                  zIndex: 10,
                }}
              />
            </div>

            {/* Floating stat cards */}
            <div
              ref={statsRef}
              className="absolute -right-6 top-[-35px] grid grid-cols-1 gap-3"
            >
              {stats.slice(0, 2).map((s) => (
                <div
                  key={s.label}
                  className="glass-card rounded-xl px-5 py-3 text-center"
                  style={{
                    background: "var(--bg-card)",
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
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom badge */}
            <div
              className="absolute bottom-5 left-5 glass-card rounded-xl px-4 py-3"
              style={{
                backdropFilter: "blur(16px)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-mid)",
                zIndex: 11,
              }}
            >
              <p
                className="text-xs mb-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                Education
              </p>
              <p
                className="text-sm font-semibold"
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                {personalInfo.education}
              </p>
            </div>
          </div>

          {/* Text side */}
          <div ref={textRef}>
            <p className="about-item section-label mb-4">About Me</p>

            <h2
              className="about-item text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "Syne, sans-serif",
                color: "var(--text-primary)",
              }}
            >
              Let&apos;s get to know
              <br />
              <span className="text-[#F97316]">each other</span> closer
            </h2>

            <p
              className="about-item text-sm leading-relaxed mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              {personalInfo.bio}
            </p>
            <p
              className="about-item text-sm leading-relaxed mb-10"
              style={{ color: "var(--text-secondary)" }}
            >
              Passionate about turning complex problems into elegant,
              user-friendly web solutions. I thrive in collaborative
              environments and am always eager to learn cutting-edge
              technologies.
            </p>

            {/* Cards */}
            <div ref={cardsRef} className="grid grid-cols-2 gap-4 mb-10">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="glass-card rounded-xl p-4"
                  style={{ border: "1px solid var(--border-soft)" }}
                >
                  <span className="text-xl mb-2 block">{item.icon}</span>
                  <p
                    className="text-xs font-semibold mb-0.5"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="about-item">
              <Link
                href="/about"
                className="btn-brand inline-flex items-center gap-2"
              >
                Know More About Me
                <HiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
