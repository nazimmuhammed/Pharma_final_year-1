import { motion } from "framer-motion";
import { MdArrowForward } from "react-icons/md";

// ─── Table wrapper ────────────────────────────────────────
const TableCard = ({ title, action, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="rounded-2xl border border-cyan-500/10 bg-[#060f1e]/90 backdrop-blur-xl overflow-hidden"
    style={{ boxShadow: "0 0 50px rgba(0,229,255,0.04)" }}
  >
    <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/10">
      <h2 className="text-base font-bold text-cyan-400">{title}</h2>
      {action && (
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 14px rgba(0,229,255,0.25)" }}
          className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 border border-cyan-400/25 rounded-xl px-3 py-1.5 hover:bg-cyan-400/8 transition-all"
        >
          {action} <MdArrowForward size={14} />
        </motion.button>
      )}
    </div>
    <div className="overflow-x-auto">{children}</div>
  </motion.div>
);

export default TableCard;