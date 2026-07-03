
import { motion } from "framer-motion";

// ─── Table row ────────────────────────────────────────────
const TR = ({ children }) => (
  <motion.tr
    whileHover={{ backgroundColor: "rgba(0,229,255,0.03)" }}
    className="border-b border-white/4 transition-colors duration-150"
  >
    {children}
  </motion.tr>
);

export default TR;