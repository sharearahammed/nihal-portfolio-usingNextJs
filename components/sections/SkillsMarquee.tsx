const techList = [
  "React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux",
  "Node.js", "MongoDB", "Express.js", "Firebase", "Material UI",
  "PostgreSQL", "JWT", "REST API", "Git", "Vercel", "Netlify",
];

export default function SkillsMarquee() {
  const doubled = [...techList, ...techList];

  return (
    <section className="py-16 overflow-hidden" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
        <p className="section-label text-center">Tech Stack</p>
      </div>

      {/* Marquee row 1 - left to right */}
      <div className="relative overflow-hidden mb-4">
        <div className="flex gap-6 marquee-track" style={{ width: "max-content" }}>
          {doubled.map((tech, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-full flex-shrink-0"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F97316" }} />
              <span className="text-sm whitespace-nowrap" style={{ fontFamily: "Syne, sans-serif", fontWeight: 500, color: "var(--text-secondary)" }}>
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 - right to left */}
      <div className="relative overflow-hidden">
        <div className="flex gap-6 flex-shrink-0"
          style={{ width: "max-content", animation: "marquee 40s linear infinite reverse" }}>
          {[...doubled].reverse().map((tech, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-full flex-shrink-0"
              style={{ background: "var(--bg-card)", border: "1px solid rgba(249,115,22,0.18)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(249,115,22,0.5)" }} />
              <span className="text-sm whitespace-nowrap" style={{ fontFamily: "Syne, sans-serif", fontWeight: 500, color: "var(--text-muted)" }}>
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
