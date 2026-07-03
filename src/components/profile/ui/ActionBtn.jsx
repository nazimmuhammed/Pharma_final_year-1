
import { motion } from "framer-motion";



// ─── Action button ────────────────────────────────────────
const ActionBtn = ({ icon: Icon, label, color = "cyan", onClick }) => {
  const colors = {
    cyan:   "border-cyan-500/30 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]",
    purple: "border-purple-500/30 text-purple-400 hover:bg-purple-400/10 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]",
    green:  "border-green-500/30 text-green-400 hover:bg-green-400/10 hover:shadow-[0_0_12px_rgba(74,222,128,0.3)]",
    amber:  "border-amber-500/30 text-amber-400 hover:bg-amber-400/10 hover:shadow-[0_0_12px_rgba(251,191,36,0.3)]",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all duration-200 ${colors[color]}`}
    >
      {Icon && <Icon size={13} />}
      {label}
    </motion.button>
  );
};

export default ActionBtn;