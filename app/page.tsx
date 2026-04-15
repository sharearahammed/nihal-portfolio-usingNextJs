"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import SkillsMarquee from "@/components/sections/SkillsMarquee";
import CTASection from "@/components/sections/CTASection";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "hero",     Component: HeroSection },
  { id: "about",    Component: AboutPreview },
  { id: "projects", Component: ProjectsPreview },
  { id: "skills",   Component: SkillsMarquee },
  { id: "contact",  Component: CTASection },
];

const ZOOM_OUT_SCALE   = 0.85;
const ZOOM_OUT_OPACITY = 0;
const LARGE_BREAKPOINT = 1024; // এর নিচে effect বন্ধ

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isLarge = () => window.innerWidth >= LARGE_BREAKPOINT;

    const initDesktopEffect = () => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");
      const total  = panels.length;

      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight * total}px`;
      }

      gsap.set(panels, {
        position: "fixed",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
      });

      gsap.set(panels[0], { scale: 1, opacity: 1, yPercent: 0 });
      gsap.set(panels.slice(1), { yPercent: 100, scale: 1, opacity: 1 });
      panels.slice(1).forEach((p) => (p.style.visibility = "hidden"));

      panels.forEach((panel, i) => {
        if (i === total - 1) return;

        const nextPanel = panels[i + 1];
        const prevPanel = panels[i];

        ScrollTrigger.create({
          trigger: document.body,
          start: () => `${window.innerHeight * i} top`,
          end:   () => `${window.innerHeight * (i + 1)} top`,
          scrub: 1.5,
          onUpdate(self) {
            const p = self.progress;

            const yPct = gsap.utils.interpolate(100, 0, p);
            gsap.set(nextPanel, { yPercent: yPct });
            nextPanel.style.visibility = "visible";

            const scale   = gsap.utils.interpolate(1, ZOOM_OUT_SCALE, p);
            const opacity = gsap.utils.interpolate(1, ZOOM_OUT_OPACITY, p);
            gsap.set(prevPanel, { scale, opacity });

            prevPanel.style.visibility = p >= 0.99 ? "hidden" : "visible";
          },
          onLeave() {
            gsap.set(nextPanel, { yPercent: 0, scale: 1, opacity: 1 });
            nextPanel.style.visibility = "visible";
            gsap.set(prevPanel, { scale: ZOOM_OUT_SCALE, opacity: ZOOM_OUT_OPACITY });
            prevPanel.style.visibility = "hidden";
          },
          onEnterBack() {
            gsap.set(nextPanel, { yPercent: 100, scale: 1, opacity: 1 });
            nextPanel.style.visibility = "hidden";
            gsap.set(prevPanel, { scale: 1, opacity: 1 });
            prevPanel.style.visibility = "visible";
          },
        });
      });
    };

    const resetToMobile = () => {
      // সব GSAP effect মুছে, panel স্বাভাবিক flow-এ ফেরাও
      ScrollTrigger.getAll().forEach((t) => t.kill());

      const panels = gsap.utils.toArray<HTMLElement>(".panel");
      gsap.set(panels, { clearProps: "all" });
      panels.forEach((p) => (p.style.visibility = "visible"));

      if (containerRef.current) {
        containerRef.current.style.height = "auto";
      }
    };

    // প্রথমবার load-এ check করো
    if (isLarge()) {
      initDesktopEffect();
    }

    // resize-এ screen size বদলালে switch করো
    let prevLarge = isLarge();
    const onResize = () => {
      const nowLarge = isLarge();

      if (nowLarge && !prevLarge) {
        // Mobile → Desktop: effect চালু করো
        initDesktopEffect();
      } else if (!nowLarge && prevLarge) {
        // Desktop → Mobile: effect বন্ধ করো
        resetToMobile();
      } else if (nowLarge) {
        // Desktop-এই resize: height আর ScrollTrigger refresh করো
        const panels = gsap.utils.toArray<HTMLElement>(".panel");
        if (containerRef.current) {
          containerRef.current.style.height = `${window.innerHeight * panels.length}px`;
        }
        ScrollTrigger.refresh();
      }

      prevLarge = nowLarge;
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ position: "relative" }}>
        {SECTIONS.map(({ id, Component }, i) => (
          <div
            key={id}
            id={id}
            className="panel"
            style={{
              width: "100%",
              height: "100svh",
              overflow: "hidden",
              willChange: "transform, opacity",
              zIndex: i + 1,
              transformOrigin: "center center",
            }}
          >
            <Component />
          </div>
        ))}
      </div>

      <style>{`
  html, body {
    margin: 0;
    overflow-x: hidden;
    background: var(--bg);
    transition: background 0.3s ease;
  }

  @media (max-width: 1023px) {
    .panel {
      position: relative !important;
      transform: none !important;
      opacity: 1 !important;
      visibility: visible !important;
      height: auto !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .panel {
      position: relative !important;
      transform: none !important;
      opacity: 1 !important;
      visibility: visible !important;
    }
  }
`}</style>
    </>
  );
}