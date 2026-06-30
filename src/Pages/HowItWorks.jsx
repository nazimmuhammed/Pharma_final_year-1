import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiUserCheck, FiPlusSquare, FiLayers, FiTruck, 
  FiShield, FiCpu, FiTrendingUp, FiCheckCircle 
} from 'react-icons/fi';
import Layout from '../components/layout/Layout';

// ============================================================================
// DATA CONFIGURATION
// ============================================================================
const steps = [
  {
    id: "01",
    title: "User Login",
    icon: FiUserCheck,
    color: "from-blue-500 to-cyan-400",
    glow: "rgba(6, 182, 212, 0.15)",
    points: ["Secure authentication", "Role-based access", "JWT validation"]
  },
  {
    id: "02",
    title: "Drug Registration",
    icon: FiPlusSquare,
    color: "from-purple-500 to-pink-500",
    glow: "rgba(236, 72, 153, 0.15)",
    points: ["Manufacturer registry", "Batch details added", "QR code generated"]
  },
  {
    id: "03",
    title: "Blockchain Record",
    icon: FiLayers,
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(59, 130, 246, 0.15)",
    points: ["Smart contract call", "Immutable storage", "Hash code secured"]
  },
  {
    id: "04",
    title: "Ownership Transfer",
    icon: FiTruck,
    color: "from-emerald-500 to-teal-400",
    glow: "rgba(16, 185, 129, 0.15)",
    points: ["Entity handshakes", "Ledger updated", "Digital verification"]
  },
  {
    id: "05",
    title: "Drug Verification",
    icon: FiShield,
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.15)",
    points: ["Instant QR scans", "Verify authenticity", "Chain-of-custody check"]
  },
  {
    id: "06",
    title: "AI Analysis",
    icon: FiCpu,
    color: "from-fuchsia-500 to-magenta-500",
    glow: "rgba(217, 70, 239, 0.15)",
    points: ["Predictive risk scoring", "Counterfeit detection", "Anomaly mitigation"]
  },
  {
    id: "07",
    title: "Dashboard & Reports",
    icon: FiTrendingUp,
    color: "from-blue-400 to-indigo-600",
    glow: "rgba(99, 102, 241, 0.15)",
    points: ["Executive analytics", "System wide alerts", "Real-time monitoring"]
  }
];

const badges = [
  { label: "Trust Built-in", color: "text-emerald-400" },
  { label: "Transparency At Every Step", color: "text-cyan-400" },
  { label: "Security By Blockchain", color: "text-blue-400" },
  { label: "AI-Powered Intelligence", color: "text-purple-400" },
  { label: "Healthcare Outcomes", color: "text-pink-400" }
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 70, damping: 15 } 
  }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
const FlowingArrow = ({ direction = "horizontal" }) => {
  if (direction === "vertical") {
    return (
      <div className="flex flex-col items-center justify-center my-2 h-12 lg:hidden">
        <div className="w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-purple-500/50 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-cyan-400"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center justify-center flex-1 min-w-[30px] max-w-[60px]">
      <div className="w-full h-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 relative overflow-hidden">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent to-cyan-400"
        />
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function HowItWorks() {
  return (
    <Layout>
        <section className="w-full bg-[#020817] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500 selection:text-black font-sans relative overflow-hidden">
      
      {/* Background Cyber Glow Fields */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. TITLE COMPONENT HEADER */}
      <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Workflow Architecture
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase"
        >
          AI-Driven Blockchain-Based <br/>
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Pharmaceutical Supply Chain
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-sm text-slate-400 font-medium tracking-wide flex items-center justify-center gap-3"
        >
          <span>Secure.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <span>Transparent.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <span>Intelligent.</span>
        </motion.p>

        {/* Futuristic Glowing Divider */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <div className="h-[1px] w-32 bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>
      </div>

      {/* 2. CORE SYSTEM INTERACTIVE WORKFLOW DIAGRAM */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1400px] mx-auto z-10 relative"
      >
        {/* Row 1: Steps 1 to 4 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 xl:gap-4 mb-0 lg:mb-8">
          {steps.slice(0, 4).map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.id}>
                <motion.div 
                  variants={cardVariants}
                  whileHover={{ y: -5, boxShadow: `0 10px 30px -10px ${step.glow}`, border: '1px solid rgba(255,255,255,0.15)' }}
                  className="w-full lg:w-[23%] bg-[#080e22]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden transition-all group cursor-pointer"
                >
                  <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${step.color}`} />
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono font-bold text-slate-500 tracking-wider">PHASE {step.id}</span>
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${step.color} bg-opacity-10 text-white text-lg shadow-inner group-hover:scale-110 transition-transform`}>
                      <Icon />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors tracking-wide">{step.title}</h3>
                  <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
                    {step.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-600 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                {idx < 3 && <FlowingArrow direction="horizontal" />}
                {idx < 3 && <FlowingArrow direction="vertical" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Dynamic Connected Intermediate Grid Drop Line Indicator (Desktop Only) */}
        <div className="hidden lg:flex justify-end pr-24 my-4 h-12">
          <div className="w-[2px] h-full bg-gradient-to-b from-emerald-500/40 to-amber-500/40 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="absolute w-full h-1/2 bg-gradient-to-b from-transparent to-amber-400"
            />
          </div>
        </div>
        <div className="lg:hidden"><FlowingArrow direction="vertical" /></div>

        {/* Row 2: Steps 5 to 7 rendered in Reverse Logic Sequence */}
        <div className="flex flex-col lg:flex-row-reverse lg:items-center justify-start gap-2 xl:gap-4">
          {/* Empty spacer module placeholder block to keep desktop right alignment perfect */}
          <div className="hidden lg:block w-full lg:w-[23%]" />
          
          {steps.slice(4, 7).reverse().map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.id}>
                <motion.div 
                  variants={cardVariants}
                  whileHover={{ y: -5, boxShadow: `0 10px 30px -10px ${step.glow}`, border: '1px solid rgba(255,255,255,0.15)' }}
                  className="w-full lg:w-[23%] bg-[#080e22]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden transition-all group cursor-pointer"
                >
                  <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${step.color}`} />
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono font-bold text-slate-500 tracking-wider">PHASE {step.id}</span>
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${step.color} bg-opacity-10 text-white text-lg shadow-inner group-hover:scale-110 transition-transform`}>
                      <Icon />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors tracking-wide">{step.title}</h3>
                  <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
                    {step.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-600 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                {idx < 2 && (
                  <div className="hidden lg:flex items-center justify-center flex-1 min-w-[30px] max-w-[60px]">
                    <div className="w-full h-0.5 bg-gradient-to-l from-cyan-500/30 to-purple-500/30 relative overflow-hidden">
                      <motion.div 
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                        className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-l from-transparent to-cyan-400"
                      />
                    </div>
                  </div>
                )}
                {idx < 2 && <FlowingArrow direction="vertical" />}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>

      {/* 3. GLOWING SUMMARY FOOTER FRAME CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 max-w-5xl mx-auto rounded-2xl p-6 relative bg-gradient-to-r from-cyan-950/20 via-slate-900/60 to-purple-950/20 border border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)] overflow-hidden"
      >
        <div className="absolute -right-20 -bottom-20 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 -top-20 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="flex flex-col items-center text-center relative z-10">
          <h4 className="text-base sm:text-lg font-bold tracking-wide text-white uppercase flex items-center gap-2">
            <FiCheckCircle className="text-cyan-400 animate-pulse" />
            End-to-End Transparent &amp; Secure Pharmaceutical Supply Chain
          </h4>
          
          <div className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
            {badges.map((badge, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800 text-xs font-semibold tracking-wide transition-all hover:border-slate-700 cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-400" />
                <span className={badge.color}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
    </Layout>
  );
}