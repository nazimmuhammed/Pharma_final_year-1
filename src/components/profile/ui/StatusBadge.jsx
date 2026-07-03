


// ─── Status badge ─────────────────────────────────────────
const StatusBadge = ({ label }) => {
  const map = {
    "Manufactured": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Transferred":  "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "In Transit":   "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "Delivered":    "bg-green-500/20 text-green-300 border-green-500/30",
    "Pending":      "bg-gray-500/20 text-gray-400 border-gray-500/30",
    "Authentic":    "bg-green-500/20 text-green-300 border-green-500/30",
    "Unverified":   "bg-red-500/20 text-red-300 border-red-500/30",
    "Normal":       "bg-green-500/20 text-green-300 border-green-500/30",
    "Anomaly":      "bg-red-500/20 text-red-300 border-red-500/30",
    "Suspicious":   "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${map[label] ?? "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
      {label}
    </span>
  );
};

export default StatusBadge;