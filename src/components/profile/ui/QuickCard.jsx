
import { motion } from "framer-motion";
// ─── Quick action card ────────────────────────────────────
const QuickCard = ({ icon: Icon, label, sub, color, delay = 0 }) => {
  const colors = {
    cyan:   { bg: "from-cyan-500/10 to-cyan-500/5",   border: "border-cyan-500/20",   text: "text-cyan-400",   glow: "rgba(0,229,255,0.15)" },
    purple: { bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/20", text: "text-purple-400", glow: "rgba(139,92,246,0.15)" },
    green:  { bg: "from-green-500/10 to-green-500/5",  border: "border-green-500/20",  text: "text-green-400",  glow: "rgba(74,222,128,0.15)" },
    amber:  { bg: "from-amber-500/10 to-amber-500/5",  border: "border-amber-500/20",  text: "text-amber-400",  glow: "rgba(251,191,36,0.15)" },
    blue:   { bg: "from-blue-500/10 to-blue-500/5",    border: "border-blue-500/20",   text: "text-blue-400",   glow: "rgba(59,130,246,0.15)" },
  };
  const c = colors[color] ?? colors.cyan;
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      whileHover={{ y: -4, boxShadow: `0 0 24px ${c.glow}` }}
      className={`relative overflow-hidden rounded-2xl border ${c.border} bg-gradient-to-br ${c.bg} p-5 flex flex-col items-center gap-3 text-center transition-all duration-200 cursor-pointer w-full`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.text}`}
        style={{ background: `${c.glow}` }}>
        <Icon size={24} />
      </div>
      <div>
        <p className={`text-sm font-bold ${c.text}`}>{label}</p>
        {sub && <p className="text-[11px] text-gray-600 mt-0.5">{sub}</p>}
      </div>
    </motion.button>
  );
};

export default QuickCard;