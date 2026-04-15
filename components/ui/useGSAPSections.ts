"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPSections() {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".gsap-section");

    sections.forEach((section, i) => {

      // ── 1. Zoom-OUT: current section shrinks as the next one slides over ──
      if (i < sections.length - 1) {
        gsap.to(section, {
          scale: 0.82,
          borderRadius: "20px",
          filter: "brightness(0.5) blur(2px)",
          ease: "none",
          scrollTrigger: {
            trigger: sections[i + 1], // fires when the NEXT section scrolls in
            start: "top bottom",       // next section's top hits viewport bottom
            end: "top top",            // next section fully covers viewport
            scrub: true,
          },
        });
      }

      // ── 2. Zoom-IN: incoming section starts slightly scaled up, lands at 1 ──
      if (i > 0) {
        gsap.fromTo(
          section,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}