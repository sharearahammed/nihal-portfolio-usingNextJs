"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaGithub, FaLinkedin, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { personalInfo } from "@/lib/data";

const contactDetails = [
  { icon: FaMapMarkerAlt, label: "Location", value: personalInfo.location, href: undefined, color: "#F97316" },
  { icon: FaPhone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: "#22C55E" },
  { icon: FaEnvelope, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: "#3B82F6" },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://sharear-portfolio.vercel.app/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to send. Please email directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-mid)",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-20">
          <p className="section-label mb-4">Contact</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight" style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}>
            Let&apos;s <span style={{ color: "#F97316" }}>Work Together</span>
          </h1>
          <p className="text-sm mt-4 max-w-lg" style={{ color: "var(--text-muted)" }}>
            Have a project in mind or want to hire me? Drop a message and I&apos;ll get back to you ASAP.
          </p>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {contactDetails.map(({ icon: Icon, label, value, href, color }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="p-6 rounded-xl text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: color + "18", border: `1px solid ${color}30` }}>
                <Icon style={{ color, fontSize: 18 }} />
              </div>
              <p className="text-xs mb-1" style={{ fontFamily: "Syne, sans-serif", color: "var(--text-faint)" }}>{label}</p>
              {href ? (
                <a href={href} className="text-sm font-medium transition-colors" style={{ color: "var(--text-primary)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F97316")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-primary)")}>
                  {value}
                </a>
              ) : (
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Form + Social grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 p-8 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}>Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--text-muted)" }}>Your Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--text-muted)" }}>Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required style={inputStyle} />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: "var(--text-muted)" }}>Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Project Inquiry" required style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: "var(--text-muted)" }}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={6}
                  placeholder="Tell me about your project..." required style={{ ...inputStyle, resize: "none" }} />
              </div>
              <button type="submit" disabled={loading} className="btn-brand w-full justify-center py-3">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col gap-5">
            {/* CTA card */}
            <div className="p-6 rounded-2xl relative overflow-hidden" style={{ background: "#F97316" }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>Open to Opportunities</h3>
                <p className="text-orange-100 text-xs leading-relaxed mb-4">Currently available for freelance projects and full-time roles.</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-orange-100">Available Now</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h3 className="text-sm font-bold mb-5" style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}>Connect With Me</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: FaGithub, label: "GitHub", href: personalInfo.github, color: "var(--text-primary)" },
                  { icon: FaLinkedin, label: "LinkedIn", href: personalInfo.linkedin, color: "#0077B5" },
                  { icon: FaFacebook, label: "Facebook", href: personalInfo.facebook, color: "#1877F2" },
                ].map(({ icon: Icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                    <Icon style={{ color, fontSize: 16 }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
