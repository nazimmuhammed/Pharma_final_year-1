import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { RiShieldCheckFill } from "react-icons/ri";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEthereum,
} from "react-icons/fa";

import {
  SiSolidity,
  SiMongodb,
  SiReact,
  SiPython,
  SiFastapi,
} from "react-icons/si";

import {
  MdEmail,
  MdArrowForward,
} from "react-icons/md";

import { BiNetworkChart } from "react-icons/bi";

// ─────────────────────────────────────────────────────────────
// Fade Animation
// ─────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: (i = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Verify a Drug", href: "#verify" },
  { label: "Contact", href: "#contact" },
];

const ROLE_LINKS = [
  { label: "Manufacturer Portal", href: "#" },
  { label: "Distributor Dashboard", href: "#" },
  { label: "Retailer Access", href: "#" },
  { label: "Inspector Panel", href: "#" },
  { label: "Public Verification", href: "#" },
];

const TECH_STACK = [
  {
    icon: <FaEthereum size={15} />,
    label: "Ethereum",
    color: "#818cf8",
  },

  {
    icon: <SiSolidity size={14} />,
    label: "Solidity",
    color: "#64748b",
  },

  {
    icon: <SiReact size={14} />,
    label: "React + Vite",
    color: "#38bdf8",
  },

  {
    icon: <SiMongodb size={14} />,
    label: "MongoDB",
    color: "#4ade80",
  },

  {
    icon: <SiPython size={14} />,
    label: "Python AI",
    color: "#facc15",
  },

  {
    icon: <SiFastapi size={14} />,
    label: "FastAPI",
    color: "#34d399",
  },
];

const SOCIAL = [
  {
    icon: <FaGithub size={17} />,
    href: "#",
    label: "GitHub",
  },

  {
    icon: <FaLinkedin size={17} />,
    href: "#",
    label: "LinkedIn",
  },

  {
    icon: <FaTwitter size={17} />,
    href: "#",
    label: "Twitter",
  },

  {
    icon: <MdEmail size={18} />,
    href: "mailto:contact@pharmatrack.io",
    label: "Email",
  },
];

// ─────────────────────────────────────────────────────────────
// Logo
// ─────────────────────────────────────────────────────────────

const FooterLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,255,255,0.12), rgba(14,165,233,0.08))",

          border:
            "1.5px solid rgba(0,255,255,0.3)",

          boxShadow:
            "0 0 14px rgba(0,255,255,0.15)",
        }}
      >
        <RiShieldCheckFill
          size={18}
          className="text-cyan-400"
        />
      </div>

      <div>
        <div className="flex items-center gap-1">
          <span className="text-white font-extrabold text-xl">
            Pharma
          </span>

          <span
            className="font-extrabold text-xl"
            style={{
              background:
                "linear-gradient(90deg,#00ffff,#0ea5e9)",

              WebkitBackgroundClip:
                "text",

              WebkitTextFillColor:
                "transparent",
            }}
          >
            Track
          </span>
        </div>

        <p className="text-[10px] tracking-[3px] uppercase text-slate-500">
          AI-Powered Blockchain Supply Chain
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Section Heading
// ─────────────────────────────────────────────────────────────

const SectionHeading = ({
  children,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
        {children}
      </h3>

      <div
        className="h-px w-8 rounded-full"
        style={{
          background:
            "linear-gradient(90deg,#00ffff,transparent)",
        }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Footer Link
// ─────────────────────────────────────────────────────────────

const FooterLink = ({
  label,
  href,
}) => {
  return (
    <a
      href={href}
      className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-400 transition-colors duration-200 group w-fit"
    >
      <MdArrowForward
        size={12}
        className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
      />

      {label}
    </a>
  );
};

// ─────────────────────────────────────────────────────────────
// FOOTER COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Footer() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom,#060f1f,#030810)",

        borderTop:
          "1px solid rgba(0,255,255,0.08)",
      }}
    >
      {/* top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(0,255,255,0.4),rgba(14,165,233,0.4),transparent)",
        }}
      />

      {/* glow blob */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse,rgba(0,255,255,0.04),transparent 70%)",
        }}
      />

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* BRANDING */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={
              inView
                ? "visible"
                : "hidden"
            }
          >
            <FooterLogo />

            <p className="text-slate-500 text-sm leading-relaxed mt-4 mb-5 max-w-xs">
              Securing pharmaceutical supply chains
              with Ethereum blockchain, AI anomaly
              detection, and real-time QR verification.
            </p>

            {/* social */}
            <div className="flex items-center gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-all duration-300"
                  style={{
                    background:
                      "rgba(255,255,255,0.04)",

                    border:
                      "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={
              inView
                ? "visible"
                : "hidden"
            }
          >
            <SectionHeading>
              Quick Links
            </SectionHeading>

            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink
                    label={l.label}
                    href={l.href}
                  />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ROLES */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={
              inView
                ? "visible"
                : "hidden"
            }
          >
            <SectionHeading>
              Role Portals
            </SectionHeading>

            <ul className="flex flex-col gap-2.5">
              {ROLE_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink
                    label={l.label}
                    href={l.href}
                  />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* TECH STACK */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={
              inView
                ? "visible"
                : "hidden"
            }
          >
            <SectionHeading>
              Built With
            </SectionHeading>

            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background:
                      "rgba(255,255,255,0.04)",

                    border: `1px solid ${t.color}22`,

                    color: t.color,
                  }}
                >
                  {t.icon}
                  {t.label}
                </div>
              ))}
            </div>

            {/* contact */}
            <div
              className="mt-6 p-4 rounded-xl"
              style={{
                background:
                  "rgba(0,255,255,0.04)",

                border:
                  "1px solid rgba(0,255,255,0.1)",
              }}
            >
              <div className="text-xs text-slate-400 mb-1 font-medium">
                Get in touch
              </div>

              <a
                href="mailto:contact@pharmatrack.io"
                className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors"
              >
                contact@pharmatrack.io
              </a>

              <div className="text-slate-600 text-xs mt-1">
                Final Year Project · 2026
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderTop:
              "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* left */}
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <BiNetworkChart
              size={14}
              className="text-cyan-400"
            />

            <span>
              © 2026 PharmaTrack. All rights reserved.
            </span>
          </div>

          {/* center */}
          <div className="flex items-center gap-4">
            {[
              "Privacy Policy",
              "Terms of Use",
              "Security",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* right */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background:
                "rgba(52,211,153,0.07)",

              border:
                "1px solid rgba(52,211,153,0.15)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />

              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>

            <span className="text-green-400 text-xs font-medium">
              Chain Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}