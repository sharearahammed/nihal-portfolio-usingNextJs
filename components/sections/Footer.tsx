import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-display text-xl font-bold mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
              <span className="text-white">S.A.</span>
              <span className="text-[#F97316]">NIHAL</span>
            </div>
            <p className="text-[#666] text-sm leading-relaxed max-w-xs">
              Front-End Web Developer crafting beautiful, performant digital experiences.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="section-label mb-4">Navigation</p>
            <div className="flex flex-col gap-2">
              {["/", "/about", "/projects", "/skills", "/contact"].map((href, i) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-[#666] hover:text-white transition-colors"
                >
                  {["Home", "About", "Projects", "Skills", "Contact"][i]}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label mb-4">Get In Touch</p>
            <p className="text-[#F97316] text-sm font-medium mb-2">{personalInfo.email}</p>
            <p className="text-[#666] text-sm mb-4">{personalInfo.phone}</p>
            <div className="flex gap-4">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="text-[#666] hover:text-white transition-colors text-lg">
                <FaGithub />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-[#666] hover:text-[#0077B5] transition-colors text-lg">
                <FaLinkedin />
              </a>
              <a href={personalInfo.facebook} target="_blank" rel="noopener noreferrer"
                className="text-[#666] hover:text-[#1877F2] transition-colors text-lg">
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#444] text-xs">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-[#444] text-xs">
            Built with <span className="text-[#F97316]">Next.js</span> & <span className="text-[#F97316]">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
