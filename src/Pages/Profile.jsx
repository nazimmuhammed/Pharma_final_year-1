import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdVerifiedUser, MdShield, MdOutlineInventory2, MdLocationOn,
  MdQrCode2, MdTransferWithinAStation, MdWarning, MdCheckCircle,
  MdDescription, MdBarChart, MdLocalShipping, MdArrowForward,
  MdPerson, MdBusiness, MdCalendarToday, MdAccountBalanceWallet,
  MdNumbers, MdRefresh, MdVisibility, MdSearch, MdFilterList,
  MdTrendingUp, MdTrendingDown, MdLock, MdInfo,MdQrCodeScanner,
  MdCloudUpload,MdDangerous
} from "react-icons/md";
import {
  RiShieldCheckFill, RiMedicineBottleLine, RiFileWarningLine,
} from "react-icons/ri";
import { BiNetworkChart, BiPackage, BiTransfer } from "react-icons/bi";
import { FaCube, FaQrcode, FaIndustry } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineChip } from "react-icons/hi";
import { BsBoxSeam, BsTruck, BsShieldCheck } from "react-icons/bs";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useDispatch }
from "react-redux";

import { getProfile } from "../Redux/Slices/AuthSlice";
import { getMyDrugs } from "../Redux/Slices/DrugSlice";
import { Html5QrcodeScanner,Html5Qrcode } from "html5-qrcode";
import { verifyDrug } from "../Redux/Slices/DrugSlice";
import {
   transferDrugOwnership
}
from "../Redux/Slices/DrugSlice";




// ─── Mock data ────────────────────────────────────────────
const DRUGS_MFG = [
  { id:1, name:"Amoxicillin 250mg", type:"Antibiotic", batch:"BATCH-2026-002", expiry:"27 Jun 2028", qty:"67 Units", stage:"Manufactured", blockchain:"Verified", risk:0, riskLabel:"Low" },
  { id:2, name:"Paracetamol 500mg", type:"Pain Reliever", batch:"BATCH-2026-001", expiry:"15 May 2027", qty:"120 Units", stage:"Transferred", blockchain:"Verified", risk:0, riskLabel:"Low" },
  { id:3, name:"Ciprofloxacin 500mg",type:"Antibiotic", batch:"BATCH-2026-003", expiry:"10 Aug 2028", qty:"45 Units", stage:"In Transit", blockchain:"Verified", risk:15, riskLabel:"Low" },
  { id:4, name:"Azithromycin 250mg", type:"Antibiotic", batch:"BATCH-2026-004", expiry:"20 Dec 2027", qty:"80 Units", stage:"Manufactured", blockchain:"Pending", risk:25, riskLabel:"Medium" },
];

const ACTIVITY = [
  { icon:<MdCheckCircle size={15}/>, color:"text-green-400", msg:"Drug registered: Amoxicillin 250mg (BATCH-2026-002)", time:"29 Jun 2026, 03:35 PM" },
  { icon:<BiTransfer size={15}/>, color:"text-cyan-400", msg:"Drug transferred to Distributor - MedDistributors Pvt Ltd", time:"29 Jun 2026, 01:20 PM" },
  { icon:<MdQrCode2 size={15}/>, color:"text-purple-400", msg:"QR Code generated for Paracetamol 500mg (BATCH-2026-001)", time:"29 Jun 2026, 11:05 AM" },
  { icon:<MdWarning size={15}/>, color:"text-amber-400", msg:"Risk analysis completed for Ciprofloxacin 500mg", time:"29 Jun 2026, 10:15 AM" },
];

const INSPECTOR_DRUGS = [
  { id:1, name:"Amoxicillin 250mg", mfg:"Gagan Pharma",  risk:0,  riskLabel:"Low",    anomaly:"Normal",    verified:true },
  { id:2, name:"Metformin 500mg",   mfg:"MedCorp Ltd",   risk:72, riskLabel:"High",   anomaly:"Anomaly",   verified:false },
  { id:3, name:"Atorvastatin 10mg", mfg:"HealthPlus",    risk:28, riskLabel:"Medium", anomaly:"Suspicious",verified:true },
  { id:4, name:"Pantoprazole 40mg", mfg:"Gagan Pharma",  risk:5,  riskLabel:"Low",    anomaly:"Normal",    verified:true },
];

const SHIPMENTS = [
  { id:"SHP-001", drug:"Amoxicillin 250mg", from:"Gagan Pharma", qty:"200 Units", status:"In Transit", eta:"30 Jun 2026" },
  { id:"SHP-002", drug:"Paracetamol 500mg", from:"MedCorp",       qty:"500 Units", status:"Pending",    eta:"01 Jul 2026" },
  { id:"SHP-003", drug:"Ibuprofen 400mg",   from:"HealthPlus",    qty:"150 Units", status:"Delivered",  eta:"28 Jun 2026" },
];

const RETAIL_STOCK = [
  { id:1, name:"Amoxicillin 250mg", batch:"BATCH-2026-002", stock:"67 Units", verified:true,  scan:"Authentic" },
  { id:2, name:"Paracetamol 500mg", batch:"BATCH-2026-001", stock:"120 Units", verified:true, scan:"Authentic" },
  { id:3, name:"Ibuprofen 400mg",   batch:"BATCH-2026-005", stock:"30 Units",  verified:false, scan:"Unverified" },
];

// ─── Tiny sparkline ───────────────────────────────────────
const Sparkline = ({ color, values }) => {
  const h = 32, w = 80;
  const max = Math.max(...values), min = Math.min(...values);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-70">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ─── Animated counter ─────────────────────────────────────
const Counter = ({ value }) => (
  <motion.span
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {value}
  </motion.span>
);

// ─── Role badge ───────────────────────────────────────────
const RoleBadge = ({ role }) => {
  const map = {
    manufacturer: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    distributor:  "bg-blue-500/20 text-blue-300 border-blue-500/30",
    retailer:     "bg-green-500/20 text-green-300 border-green-500/30",
    inspector:    "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${map[role] ?? "bg-gray-500/20 text-gray-300 border-gray-500/30"}`}>
      {role}
    </span>
  );
};

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

// ─── Blockchain status badge ───────────────────────────────
const BlockchainBadge = ({ status }) =>
  status === "Verified" ? (
    <span className="flex items-center gap-1 text-green-400 text-xs font-semibold">
      <MdCheckCircle size={13} /> Verified
    </span>
  ) : (
    <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
      <MdWarning size={13} /> Pending
    </span>
  );

// ─── Risk score pill ──────────────────────────────────────
const RiskPill = ({ score, label }) => {
  const color = label === "Low" ? "text-green-400" : label === "Medium" ? "text-amber-400" : "text-red-400";
  return <span className={`text-xs font-bold ${color}`}>{score} ({label})</span>;
};

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

// ─── Metric card ──────────────────────────────────────────
const MetricCard = ({ icon: Icon, label, value, sub, color, sparkColor, sparkData, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#060f1e]/90 backdrop-blur-xl p-5 flex flex-col gap-3"
    style={{ boxShadow: `0 0 30px ${color}18` }}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--glow),transparent_60%)]"
      style={{ "--glow": `${color}0a` }} />
    <div className="flex items-start justify-between relative z-10">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center`}
        style={{ background: `${color}18`, color }}>
        <Icon size={20} />
      </div>
      <Sparkline color={sparkColor} values={sparkData} />
    </div>
    <div className="relative z-10">
      <p className="text-[11px] text-gray-500 font-medium tracking-wide uppercase" style={{ color }}>{label}</p>
      <p className="text-3xl font-extrabold text-white mt-0.5"><Counter value={value} /></p>
      <p className="text-[11px] text-gray-600 mt-0.5">{sub}</p>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-[2px]"
      style={{ background: `linear-gradient(to right, transparent, ${color}60, transparent)` }} />
  </motion.div>
);

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

// ─── Table head ───────────────────────────────────────────
const TH = ({ children }) => (
  <th className="px-4 py-3 text-left text-[11px] font-semibold tracking-widest text-gray-500 uppercase whitespace-nowrap">
    {children}
  </th>
);

// ─── Table row ────────────────────────────────────────────
const TR = ({ children }) => (
  <motion.tr
    whileHover={{ backgroundColor: "rgba(0,229,255,0.03)" }}
    className="border-b border-white/4 transition-colors duration-150"
  >
    {children}
  </motion.tr>
);
const TD = ({ children }) => (
  <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">{children}</td>
);

// ─── Drug icon pill ───────────────────────────────────────
const DrugIcon = () => (
  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
    <RiMedicineBottleLine size={15} />
  </div>
);

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

// ─── Profile + Blockchain header ─────────────────────────
const ProfileHeader = ({ role, data }) => (
  <div className="grid md:grid-cols-2 gap-5">
    {/* profile card */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-purple-500/15 bg-[#060f1e]/90 backdrop-blur-xl p-6 flex gap-5"
      style={{ boxShadow: "0 0 40px rgba(139,92,246,0.07)" }}
    >
      {/* avatar */}
      <div className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/40 to-blue-600/30 border border-purple-500/30 flex items-center justify-center">
        <FaIndustry size={32} className="text-purple-300" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-purple-400 font-semibold uppercase tracking-widest mb-1 capitalize">
          {role} Profile
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xl font-extrabold text-white truncate">{data.name}</h2>
          <RoleBadge role={role} />
        </div>
        <div className="mt-3 space-y-1.5">
          {[
            { icon: MdShield, label: "License Number", val: data.licenseNumber },
            { icon: MdLocationOn, label: "Location", val: data.location },
            { icon: MdAccountBalanceWallet, label: "Wallet Address", val: data.walletAddress },
            { icon: MdCalendarToday, label: "Member Since", val: data.joinedDate },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-gray-400">
              <Icon size={13} className="text-purple-400/60 shrink-0" />
              <span className="text-gray-600">{label}</span>
              <span className="text-gray-300 font-medium">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>

    {/* blockchain card */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-cyan-500/15 bg-[#060f1e]/90 backdrop-blur-xl p-6 flex gap-5"
      style={{ boxShadow: "0 0 40px rgba(0,229,255,0.06)" }}
    >
      {/* animated shield */}
      <div className="shrink-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 rounded-full border-2 border-cyan-400/40 bg-cyan-400/8 flex items-center justify-center"
          style={{ boxShadow: "0 0 30px rgba(0,229,255,0.25)" }}
        >
          <RiShieldCheckFill size={36} className="text-cyan-400" />
        </motion.div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold text-cyan-400 mb-3">Blockchain Status</p>
        <div className="space-y-2.5">
          {[
            { label: "Connected to Blockchain", sub: "Ethereum (Ganache)", ok: true },
            { label: "Smart Contract", sub: "Deployed & Verified", ok: true },
            { label: "Last Sync", sub: "29 June 2026, 03:35 PM", ok: true },
            { label: "Network Status", sub: null, badge: "Healthy", ok: true },
          ].map(({ label, sub, badge, ok }) => (
            <div key={label} className="flex items-start gap-2">
              <MdCheckCircle size={15} className={ok ? "text-green-400 mt-0.5 shrink-0" : "text-gray-600 mt-0.5 shrink-0"} />
              <div className="flex-1">
                <span className="text-xs text-white font-medium">{label}</span>
                {sub && <span className="text-[11px] text-gray-500 ml-2">{sub}</span>}
                {badge && (
                  <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/25">
                    {badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── Metrics strip ────────────────────────────────────────
const MetricsStrip = ({ role }) => {
  const cards = {
    manufacturer: [
      { icon: RiMedicineBottleLine, label:"Total Drugs Registered", value:24, sub:"All time",          color:"#a855f7", sparkColor:"#a855f7", sparkData:[10,14,12,18,15,20,24] },
      { icon: MdVerifiedUser,       label:"Blockchain Verified",   value:22, sub:"91.67%",             color:"#00e5ff", sparkColor:"#00e5ff", sparkData:[8,12,14,17,18,21,22] },
      { icon: BiTransfer,           label:"Transferred",           value:15, sub:"62.50%",             color:"#22c55e", sparkColor:"#22c55e", sparkData:[4,6,8,9,11,13,15] },
      { icon: MdWarning,            label:"Risk Alerts",           value:2,  sub:"Requires attention", color:"#f59e0b", sparkColor:"#f59e0b", sparkData:[1,0,1,2,1,3,2] },
      { icon: BsBoxSeam,            label:"Active Shipments",      value:5,  sub:"In transit",         color:"#818cf8", sparkColor:"#818cf8", sparkData:[2,3,4,3,5,4,5] },
    ],
    distributor: [
      { icon: BsTruck,          label:"Incoming Shipments", value:8,  sub:"Pending receipt",    color:"#00e5ff", sparkColor:"#00e5ff", sparkData:[3,5,6,7,8,8,8] },
      { icon: BsBoxSeam,        label:"Current Inventory",  value:312,sub:"Units in stock",     color:"#22c55e", sparkColor:"#22c55e", sparkData:[200,250,280,300,310,312,312] },
      { icon: BiTransfer,       label:"Transfers Done",     value:29, sub:"This month",         color:"#a855f7", sparkColor:"#a855f7", sparkData:[10,14,18,22,25,27,29] },
      { icon: MdWarning,        label:"Risk Alerts",        value:1,  sub:"Needs review",       color:"#f59e0b", sparkColor:"#f59e0b", sparkData:[0,1,0,1,1,1,1] },
    ],
    retailer: [
      { icon: BsBoxSeam,        label:"Available Stock",    value:217,sub:"Units total",        color:"#22c55e", sparkColor:"#22c55e", sparkData:[180,190,200,205,210,215,217] },
      { icon: MdVerifiedUser,   label:"Verified Medicines", value:14, sub:"Of 15 products",     color:"#00e5ff", sparkColor:"#00e5ff", sparkData:[8,9,10,11,12,13,14] },
      { icon: MdQrCode2,        label:"QR Scans Today",     value:38, sub:"Authenticity checks",color:"#a855f7", sparkColor:"#a855f7", sparkData:[5,8,12,18,24,32,38] },
      { icon: MdWarning,        label:"Suspicious Items",   value:1,  sub:"Flagged for review", color:"#f59e0b", sparkColor:"#f59e0b", sparkData:[0,0,1,1,1,1,1] },
    ],
    inspector: [
      { icon: RiMedicineBottleLine,label:"Total Drugs",      value:186,sub:"In system",          color:"#00e5ff", sparkColor:"#00e5ff", sparkData:[140,150,162,170,178,182,186] },
      { icon: MdWarning,           label:"Risk Alerts",      value:7,  sub:"High priority",      color:"#f59e0b", sparkColor:"#f59e0b", sparkData:[2,3,4,5,6,7,7] },
      { icon: RiFileWarningLine,   label:"Anomalies Found",  value:4,  sub:"Needs inspection",   color:"#ef4444", sparkColor:"#ef4444", sparkData:[1,1,2,3,3,4,4] },
      { icon: MdVerifiedUser,      label:"Verified Today",   value:12, sub:"Inspections done",   color:"#22c55e", sparkColor:"#22c55e", sparkData:[3,5,7,8,9,11,12] },
    ],
  };
  const list = cards[role] ?? cards.manufacturer;
  return (
    <div className={`grid gap-4 ${list.length === 5 ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-5" : "grid-cols-2 sm:grid-cols-2 xl:grid-cols-4"}`}>
      {list.map((m, i) => <MetricCard key={m.label} {...m} delay={i * 0.07} />)}
    </div>
  );
};

// ════════════════════════════════════════════════════════
// ROLE VIEWS
// ════════════════════════════════════════════════════════

// ─── Manufacturer ─────────────────────────────────────────
const ManufacturerView = ({drugs,handleViewDetails,handleShowQR,handleVerifyDrug,handleTransferDrug}) => (
  <div className="flex flex-col gap-6">
    {/* Registered Drugs table */}
    <TableCard title="Registered Drugs" action="View All">
      {/* desktop table */}
      <table className="w-full hidden md:table">
        <thead>
          <tr className="border-b border-white/6">
            <TH>Drug Name</TH><TH>Batch Number</TH><TH>Expiry Date</TH>
            <TH>Quantity</TH><TH>Status</TH><TH>Blockchain</TH>
            <TH>Risk Score</TH><TH>Actions</TH>
          </tr>
        </thead>
        <tbody>
          {drugs.map((d) => (
            <TR key={d._id}>
              <TD>
                <div className="flex items-center gap-2.5">
                  <DrugIcon />
                  <div>
                    <p className="text-sm font-semibold text-white">{d.name}</p>
                    <p className="text-[11px] text-gray-600">{d.type}</p>
                  </div>
                </div>
              </TD>
              <TD><span className="font-mono text-xs text-gray-400">{d.batchNumber}</span></TD>
              <TD><span className="text-xs">{new Date(d.expiryDate).toLocaleDateString()}</span></TD>
              <TD><span className="text-xs">{`${d.quantity} Units`}</span></TD>
              <TD><StatusBadge label={d.currentStage} /></TD>
              <TD><BlockchainBadge status={d.isBlockchainVerified?"Verified":"Pending"} /></TD>
              <TD><RiskPill  score={0} label="Low"/></TD>
   
              <TD>
                <div className="flex gap-1.5 flex-wrap">
                  <ActionBtn icon={MdVerifiedUser} label="Verify" color="cyan" onClick={()=>handleVerifyDrug(d)} />
                  <ActionBtn icon={BiTransfer} label="Transfer" color="purple" onClick={()=>handleTransferDrug(d)} />
                  <ActionBtn icon={MdQrCode2} label="QR Code" color="green" onClick={()=>handleShowQR(d)} />
                  <ActionBtn icon={MdInfo} label="Details" color="amber" onClick={()=>handleViewDetails(d)}/>
                </div>
              </TD>
            </TR>
          ))}
        </tbody>
      </table>
      {/* mobile cards */}
      <div className="md:hidden divide-y divide-white/5">
        {drugs.map((d) => (
          <div key={d._id} className="p-4 space-y-2">
            <div className="flex items-center gap-2.5">
              <DrugIcon />
              <div>
                <p className="text-sm font-semibold text-white">{d.name}</p>
                <p className="text-[11px] text-gray-600">{d.type} · {d.batchNumber}</p>
              </div>
              <StatusBadge label={d.stage} />
            </div>
            <div className="flex gap-1 flex-wrap">
              <ActionBtn icon={MdVerifiedUser} label="Verify" color="cyan" onClick={()=>handleVerifyDrug(d)} />
              <ActionBtn icon={BiTransfer} label="Transfer" color="purple" onClick={()=>handleTransferDrug(d)} />
              <ActionBtn icon={MdQrCode2} label="QR Code" color="green" onClick={()=>handleShowQR(d)} />
              <ActionBtn icon={MdInfo} label="Details" color="amber" onClick={()=>handleViewDetails(d)}/>
            </div>
          </div>
        ))}
      </div>
    </TableCard>

    {/* Recent Activity + Quick Actions */}
    <div className="grid lg:grid-cols-2 gap-5">
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-cyan-500/10 bg-[#060f1e]/90 backdrop-blur-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/10">
          <h2 className="text-base font-bold text-cyan-400">Recent Activity</h2>
          <button className="text-xs text-cyan-300 border border-cyan-400/20 rounded-lg px-2.5 py-1 hover:bg-cyan-400/8 transition-all">
            View All
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {ACTIVITY.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/2 transition-colors"
            >
              <span className={`mt-0.5 shrink-0 ${a.color}`}>{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-300 leading-relaxed">{a.msg}</p>
                <p className="text-[10px] text-gray-600 mt-0.5">{a.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-bold text-cyan-400 mb-4 px-1">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <QuickCard icon={MdVerifiedUser}  label="Drug Verification"  sub="Verify drug authenticity"   color="cyan"   delay={0.1} />
          <QuickCard icon={BiTransfer}      label="Transfer Ownership" sub="Transfer to next entity"     color="amber"  delay={0.15} />
          <QuickCard icon={MdQrCode2}       label="Generate QR Code"   sub="Generate drug QR"            color="purple" delay={0.2} />
          <QuickCard icon={BiNetworkChart}  label="AI Risk Analysis"   sub="Analyze drug risk"           color="green"  delay={0.25} />
          <QuickCard icon={MdBarChart}      label="View Reports"       sub="View analytics & reports"    color="blue"   delay={0.3} />
        </div>
      </div>
    </div>
  </div>
);

// ─── Inspector ────────────────────────────────────────────
const InspectorView = () => (
  <div className="flex flex-col gap-6">
    <TableCard title="Drug Verification Queue" action="View All">
      <table className="w-full hidden md:table">
        <thead>
          <tr className="border-b border-white/6">
            <TH>Drug</TH><TH>Manufacturer</TH><TH>Risk Score</TH>
            <TH>Anomaly Status</TH><TH>Blockchain Verified</TH><TH>Action</TH>
          </tr>
        </thead>
        <tbody>
          {INSPECTOR_DRUGS.map((d) => (
            <TR key={d.id}>
              <TD>
                <div className="flex items-center gap-2.5">
                  <DrugIcon />
                  <p className="text-sm font-semibold text-white">{d.name}</p>
                </div>
              </TD>
              <TD><span className="text-xs text-gray-400">{d.mfg}</span></TD>
              <TD><RiskPill score={d.risk} label={d.riskLabel} /></TD>
              <TD><StatusBadge label={d.anomaly} /></TD>
              <TD><BlockchainBadge status={d.verified ? "Verified" : "Pending"} /></TD>
              <TD>
                <div className="flex gap-1.5">
                  <ActionBtn icon={MdVerifiedUser} label="Verify" color="cyan" />
                  <ActionBtn icon={BiNetworkChart} label="Analyze" color="amber" />
                </div>
              </TD>
            </TR>
          ))}
        </tbody>
      </table>
      <div className="md:hidden divide-y divide-white/5">
        {INSPECTOR_DRUGS.map((d) => (
          <div key={d.id} className="p-4 space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <DrugIcon />
              <p className="text-sm font-semibold text-white">{d.name}</p>
              <StatusBadge label={d.anomaly} />
              <RiskPill score={d.risk} label={d.riskLabel} />
            </div>
            <div className="flex gap-1.5">
              <ActionBtn icon={MdVerifiedUser} label="Verify" color="cyan" />
              <ActionBtn icon={BiNetworkChart} label="Analyze" color="amber" />
            </div>
          </div>
        ))}
      </div>
    </TableCard>

    {/* Quick Actions */}
    <div>
      <h2 className="text-base font-bold text-cyan-400 mb-4 px-1">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickCard icon={MdVerifiedUser}   label="Verify Drug"           sub="Run on-chain check"       color="cyan"   delay={0.1} />
        <QuickCard icon={BiNetworkChart}   label="Analyze Risk"          sub="AI anomaly detection"     color="amber"  delay={0.15} />
        <QuickCard icon={MdDescription}    label="Inspection Report"     sub="Generate PDF report"      color="purple" delay={0.2} />
        <QuickCard icon={FaCube}           label="Blockchain Audit"      sub="Full chain audit trail"   color="green"  delay={0.25} />
      </div>
    </div>
  </div>
);

// ─── Distributor ──────────────────────────────────────────
const DistributorView = () => (
  <div className="flex flex-col gap-6">
    <TableCard title="Shipment Tracking" action="View All">
      <table className="w-full hidden md:table">
        <thead>
          <tr className="border-b border-white/6">
            <TH>Shipment ID</TH><TH>Drug</TH><TH>From</TH>
            <TH>Quantity</TH><TH>Status</TH><TH>ETA</TH><TH>Actions</TH>
          </tr>
        </thead>
        <tbody>
          {SHIPMENTS.map((s) => (
            <TR key={s.id}>
              <TD><span className="font-mono text-xs text-cyan-400">{s.id}</span></TD>
              <TD>
                <div className="flex items-center gap-2.5">
                  <DrugIcon /><p className="text-sm font-semibold text-white">{s.drug}</p>
                </div>
              </TD>
              <TD><span className="text-xs text-gray-400">{s.from}</span></TD>
              <TD><span className="text-xs">{s.qty}</span></TD>
              <TD><StatusBadge label={s.status} /></TD>
              <TD><span className="text-xs text-gray-400">{s.eta}</span></TD>
              <TD>
                <div className="flex gap-1.5">
                  <ActionBtn icon={MdCheckCircle}    label="Accept" color="green" />
                  <ActionBtn icon={MdLocalShipping}  label="Update" color="cyan" />
                  <ActionBtn icon={BiTransfer}       label="Transfer" color="purple" />
                </div>
              </TD>
            </TR>
          ))}
        </tbody>
      </table>
      <div className="md:hidden divide-y divide-white/5">
        {SHIPMENTS.map((s) => (
          <div key={s.id} className="p-4 space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <DrugIcon />
              <div>
                <p className="text-sm font-semibold text-white">{s.drug}</p>
                <p className="text-[11px] text-gray-600">{s.id} · From {s.from}</p>
              </div>
              <StatusBadge label={s.status} />
            </div>
            <div className="flex gap-1.5">
              <ActionBtn icon={MdCheckCircle}   label="Accept" color="green" />
              <ActionBtn icon={BiTransfer}      label="Transfer" color="purple" />
            </div>
          </div>
        ))}
      </div>
    </TableCard>

    <div>
      <h2 className="text-base font-bold text-cyan-400 mb-4 px-1">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickCard icon={MdCheckCircle}   label="Accept Transfer"        sub="Receive drug shipment"    color="green"  delay={0.1} />
        <QuickCard icon={MdLocalShipping} label="Update Shipment"        sub="Track delivery status"    color="cyan"   delay={0.15} />
        <QuickCard icon={BiTransfer}      label="Transfer Next"          sub="Forward to retailer"      color="purple" delay={0.2} />
        <QuickCard icon={FaCube}          label="Blockchain History"     sub="View on-chain records"    color="blue"   delay={0.25} />
      </div>
    </div>
  </div>
);

// ─── Retailer ─────────────────────────────────────────────
const RetailerView = () => (
  <div className="flex flex-col gap-6">
    <TableCard title="Available Stock" action="View All">
      <table className="w-full hidden md:table">
        <thead>
          <tr className="border-b border-white/6">
            <TH>Medicine</TH><TH>Batch</TH><TH>Stock</TH>
            <TH>Verified</TH><TH>QR Scan Result</TH><TH>Actions</TH>
          </tr>
        </thead>
        <tbody>
          {RETAIL_STOCK.map((r) => (
            <TR key={r.id}>
              <TD>
                <div className="flex items-center gap-2.5">
                  <DrugIcon /><p className="text-sm font-semibold text-white">{r.name}</p>
                </div>
              </TD>
              <TD><span className="font-mono text-xs text-gray-400">{r.batch}</span></TD>
              <TD><span className="text-xs">{r.stock}</span></TD>
              <TD><BlockchainBadge status={r.verified ? "Verified" : "Pending"} /></TD>
              <TD><StatusBadge label={r.scan} /></TD>
              <TD>
                <div className="flex gap-1.5">
                  <ActionBtn icon={MdVerifiedUser} label="Verify" color="cyan" />
                  <ActionBtn icon={MdQrCode2}      label="Scan QR" color="purple" />
                  <ActionBtn icon={FaCube}         label="Supply Chain" color="green" />
                </div>
              </TD>
            </TR>
          ))}
        </tbody>
      </table>
      <div className="md:hidden divide-y divide-white/5">
        {RETAIL_STOCK.map((r) => (
          <div key={r.id} className="p-4 space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <DrugIcon />
              <div>
                <p className="text-sm font-semibold text-white">{r.name}</p>
                <p className="text-[11px] text-gray-600">{r.batch}</p>
              </div>
              <StatusBadge label={r.scan} />
            </div>
            <div className="flex gap-1.5">
              <ActionBtn icon={MdVerifiedUser} label="Verify" color="cyan" />
              <ActionBtn icon={MdQrCode2}      label="Scan QR" color="purple" />
            </div>
          </div>
        ))}
      </div>
    </TableCard>

    <div>
      <h2 className="text-base font-bold text-cyan-400 mb-4 px-1">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickCard icon={MdVerifiedUser} label="Verify Drug"         sub="Authenticate medicine"     color="cyan"   delay={0.1} />
        <QuickCard icon={MdQrCode2}      label="Scan QR"             sub="Camera QR scan"            color="purple" delay={0.15} />
        <QuickCard icon={FaCube}         label="Supply Chain"        sub="View full journey"         color="green"  delay={0.2} />
        <QuickCard icon={MdWarning}      label="Report Suspicious"   sub="Flag counterfeit product"  color="amber"  delay={0.25} />
      </div>
    </div>
  </div>
);
const InfoCard = ({
   label,
   value
}) => (

<div className="
   rounded-2xl
   border border-white/10
   bg-white/5
   p-4
">

   <p className="
      text-xs text-cyan-400 mb-1
   ">
      {label}
   </p>

   <p className="
      text-sm text-white
      break-all
   ">
      {value}
   </p>

</div>
);

// ════════════════════════════════════════════════════════
// ROOT COMPONENT
// ════════════════════════════════════════════════════════
export default function Profile() {

  const [selectedDrug, setSelectedDrug] =useState(null);
  const [showDetailsModal, setShowDetailsModal] =useState(false);
  const [showQRModal, setShowQRModal] =useState(false);
  const [selectedQRDrug, setSelectedQRDrug] =useState(null);
  const [showVerifyModal, setShowVerifyModal] =
   useState(false);

  const [selectedVerifyDrug, setSelectedVerifyDrug] =
   useState(null);

  const [scannerOpen, setScannerOpen] =
   useState(false);

  const [showVerificationResult,
    setShowVerificationResult] =
    useState(false);

  const [invalidQRMessage,
    setInvalidQRMessage] =
    useState("");

  const [showTransferModal,
  setShowTransferModal] =
    useState(false);

  const [selectedTransferDrug,
  setSelectedTransferDrug] =
    useState(null);

  const [transferForm,
  setTransferForm] =
    useState({

        toUserEmail: "",

        location: {
          latitude: "",
          longitude: "",
        }
    });
   
   

  const dispatch = useDispatch();

  const handleViewDetails = (drug) => {

   setSelectedDrug(drug);

   setShowDetailsModal(true);
  };

  const handleShowQR = (drug) => {

   setSelectedQRDrug(drug);

   setShowQRModal(true);
  };

  const handleVerifyDrug = (drug) => {

   setSelectedVerifyDrug(drug);

   setShowVerifyModal(true);
  };

  const handleTransferDrug = (drug) => {
 

   setSelectedTransferDrug(drug);

   setShowTransferModal(true);
};

  const handleTransferInput =
  (e) => {

   const {
      name,
      value
   } = e.target;

   setTransferForm((prev) => ({

      ...prev,

      [name]: value
   }));
};
const handleConfirmTransfer =
async () => {

   if(
      !transferForm.toUserEmail
   ){
      return;
   }

   try {

      const payload = {

         drugId:
            selectedTransferDrug.drugId,

         toUserEmail:
            transferForm.toUserEmail,

         location: {
            latitude: 12.9716,
            longitude: 77.5946,
         }
      };

      const result =
         await dispatch(

            transferDrugOwnership(payload)

         ).unwrap();

      console.log(
         "Transfer success:",
         result
      );

      // close modal
      setShowTransferModal(false);

      // reset form
      setTransferForm({

         toUserEmail: "",

         location: {
            latitude: "",
            longitude: "",
         }
      });

      // refresh drugs
      dispatch(getMyDrugs());

   }

   catch(error){

      console.error(error);
   }
};

  const {

   drugs,

   loading

  } = useSelector(
    (state) => state.drug
  );
   const { data, role } = useSelector(
  (state) => state.auth
  );

  const {

   verificationResult,

   verificationLoading

} = useSelector(
   (state) => state.drug
);

const handleQRImageUpload =
async (e) => {

   try {

      const file =
         e.target.files[0];

      if(!file) return;

      const html5QrCode =
         new Html5Qrcode("image-reader");

      // scan uploaded image
      const decodedText =
         await html5QrCode.scanFile(
            file,
            true
         );

      console.log(
         "Decoded QR:",
         decodedText
      );

      // parse QR JSON
      const parsedData =
         JSON.parse(decodedText);

      const drugId =
         parsedData.drugId;

      if(!drugId){

        setInvalidQRMessage(
          "Unable to verify uploaded QR image."
        );
         return;
      }

      // call backend verify
      dispatch(
         verifyDrug(drugId)
      );

   }

   catch(error){

      console.error(error);

      alert(
         "Failed to scan QR image"
      );
   }
};

const isDrugExpired = (date) => {

   return new Date(date) < new Date();
};


  useEffect(() => {

   dispatch(getProfile());

   if(role === "manufacturer"){

      dispatch(getMyDrugs());
   }

}, [dispatch, role]);

  useEffect(() => {

   if(!scannerOpen) return;

   const scanner =
      new Html5QrcodeScanner(

         "reader",

         {
            fps: 10,
            qrbox: 250,
         },

         false
      );

   scanner.render(

      async (decodedText) => {

        try {

            console.log(
              "QR DATA:",
              decodedText
            );

            // parse QR JSON
            const parsedData =
              JSON.parse(decodedText);

            console.log(
              "Parsed QR:",
              parsedData
            );

            // extract drugId
            const drugId =
              parsedData.drugId;

            if(!drugId){

              setInvalidQRMessage(
                "Invalid pharmaceutical QR code detected."
              );

              return;
            }

            // stop scanner
            await scanner.clear();

            setScannerOpen(false);

            // call backend verification
            dispatch(
              verifyDrug(drugId)
            );

        }

        catch(error){

            console.error(error);

            setInvalidQRMessage(
            "Corrupted or unsupported QR format."
          );
        }
      },

      (error) => {

         // ignore scan errors
      }
   );

   return () => {

      scanner.clear().catch(() => {});
   };

}, [scannerOpen]);

  useEffect(() => {

   if(verificationResult){

      setShowVerificationResult(true);
   }

}, [verificationResult]);

  const roleViews = {
    manufacturer: <ManufacturerView drugs={drugs} handleViewDetails={handleViewDetails} handleShowQR={handleShowQR} handleVerifyDrug={handleVerifyDrug} handleTransferDrug={handleTransferDrug} />,
    distributor:  <DistributorView />,
    retailer:     <RetailerView />,
    inspector:    <InspectorView />,
  };

  return (
   <Layout>
     <div className="min-h-screen bg-[#020817] text-white relative overflow-x-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/4 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 blur-[150px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-blue-600/4 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-8 flex flex-col gap-6">

        {/* page title row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Welcome back, <span className="text-cyan-400 font-semibold">{
                              data?.organizationName ||
                              data?.name
                          }</span>
            </p>
          </div>
         
        </motion.div>

        {/* Profile + Blockchain header */}
        <ProfileHeader
          role={role}
          data={{
              name:
                data?.organizationName ||
                data?.name,

              licenseNumber:
                data?.licenseNumber,

              location:
                data?.location,

              walletAddress:
                data?.walletAddress,

              joinedDate:
                data?.createdAt
          }}
        />

        {/* Metrics */}
        <MetricsStrip role={role} />

        {/* Role-specific content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {roleViews[role]}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
    {
    showDetailsModal && selectedDrug && (

    <div className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/70 backdrop-blur-sm
    px-4
    ">

      <div className="
          relative
          w-full max-w-3xl
          rounded-3xl
          border border-cyan-500/20
          bg-[#07111f]
          p-6
          shadow-[0_0_60px_rgba(0,229,255,0.15)]
      ">

          {/* close button */}
          <button
            onClick={() =>
                setShowDetailsModal(false)
            }
            className="
                absolute top-4 right-4
                text-gray-400 hover:text-white
                text-xl
            "
          >
            ✕
          </button>

          {/* heading */}
          <h2 className="
            text-2xl font-bold
            text-white mb-6
          ">
            Drug Details
          </h2>

          {/* grid */}
          <div className="
            grid md:grid-cols-2 gap-5
          ">

            <InfoCard
                label="Drug Name"
                value={selectedDrug.name}
            />

            <InfoCard
                label="Drug ID"
                value={selectedDrug.drugId}
            />

            <InfoCard
                label="Serialized ID"
                value={selectedDrug.serializedId}
            />

            <InfoCard
                label="Batch Number"
                value={selectedDrug.batchNumber}
            />

            <InfoCard
                label="Quantity"
                value={`${selectedDrug.quantity} Units`}
            />

            <InfoCard
                label="Current Stage"
                value={selectedDrug.currentStage}
            />

            <InfoCard
                label="Blockchain Status"
                value={
                  selectedDrug.isBlockchainVerified
                      ? "Verified"
                      : "Pending"
                }
            />

            <InfoCard
                label="Expiry Date"
                value={
                  new Date(
                      selectedDrug.expiryDate
                  ).toLocaleDateString()
                }
            />

          </div>

          {/* description */}
          <div className="mt-5">

            <p className="
                text-sm text-cyan-400 mb-2
            ">
                Description
            </p>

            <div className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-4 text-gray-300
            ">
                {selectedDrug.description}
            </div>

          </div>

          {/* blockchain hash */}
          <div className="mt-5">

            <p className="
                text-sm text-cyan-400 mb-2
            ">
                Blockchain Transaction Hash
            </p>

            <div className="
                rounded-2xl
                border border-cyan-500/10
                bg-black/40
                p-4
                text-xs text-cyan-300
                break-all
            ">
                {selectedDrug.blockchainTxHash}
            </div>

          </div>

      </div>

    </div>

    )
    }
    {
    showQRModal && selectedQRDrug && (

    <div className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/70 backdrop-blur-sm
    px-4
    ">

      <div className="
          relative
          w-full max-w-md
          rounded-3xl
          border border-cyan-500/20
          bg-[#07111f]
          p-6
          shadow-[0_0_60px_rgba(0,229,255,0.15)]
      ">

          {/* close */}
          <button
            onClick={() =>
                setShowQRModal(false)
            }
            className="
                absolute top-4 right-4
                text-gray-400 hover:text-white
                text-xl
            "
          >
            ✕
          </button>

          {/* title */}
          <h2 className="
            text-2xl font-bold
            text-center text-white mb-6
          ">
            Blockchain QR Code
          </h2>

          {/* qr image */}
          <div className="
            flex justify-center mb-6
          ">

            <div className="
                bg-white
                p-4 rounded-2xl
            ">

                <img
                  src={
                      selectedQRDrug.qrCodeImage
                  }
                  alt="QR"
                  className="
                      w-56 h-56
                      object-contain
                  "
                />

            </div>

          </div>

          {/* info */}
          <div className="
            space-y-4
          ">

            <InfoCard
                label="Drug Name"
                value={selectedQRDrug.name}
            />

            <InfoCard
                label="Drug ID"
                value={selectedQRDrug.drugId}
            />

            <InfoCard
                label="Serialized ID"
                value={selectedQRDrug.serializedId}
            />

          </div>

          {/* blockchain verified */}
          <div className="
            mt-5
            rounded-2xl
            border border-green-500/20
            bg-green-500/10
            p-4 text-center
          ">

            <p className="
                text-green-400
                font-semibold
            ">
                Blockchain Verified
            </p>

          </div>

          {/* download button */}
          <a
            href={
                selectedQRDrug.qrCodeImage
            }
            download={`${selectedQRDrug.drugId}.png`}
            className="
                mt-5 flex items-center
                justify-center
                rounded-xl
                border border-cyan-500/20
                bg-cyan-500/10
                py-3 text-cyan-300
                font-semibold
                hover:bg-cyan-500/20
                transition-all
            "
          >
            Download QR Code
          </a>

      </div>

    </div>

    )
    }

    {
    showVerifyModal && selectedVerifyDrug && (

    <div className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/70 backdrop-blur-sm
    px-4
    ">

      <div className="
          relative
          w-full max-w-lg
          rounded-3xl
          border border-cyan-500/20
          bg-[#07111f]
          p-6
          shadow-[0_0_60px_rgba(0,229,255,0.15)]
      ">

          {/* close */}
          <button
            onClick={() => {

                setShowVerifyModal(false);

                setScannerOpen(false);
            }}

            className="
                absolute top-4 right-4
                text-gray-400 hover:text-white
                text-xl
            "
          >
            ✕
          </button>

          {/* title */}
          <h2 className="
            text-2xl font-bold
            text-white text-center mb-2
          ">
            Verify Drug
          </h2>

          <p className="
            text-center text-gray-400
            text-sm mb-8
          ">
            Scan or upload QR code
            to verify blockchain authenticity
          </p>

          {/* options */}
          <div className="
            grid sm:grid-cols-2 gap-5
          ">

            {/* scan */}
            <motion.button

              onClick={() =>
                  setScannerOpen(true)
              }

              whileHover={{ scale: 1.03 }}

              whileTap={{ scale: 0.97 }}

              className="
                  rounded-2xl
                  border border-cyan-500/20
                  bg-cyan-500/10
                  p-6
                  flex flex-col items-center
                  justify-center gap-3
                  hover:bg-cyan-500/20
                  transition-all
              "
            >

                <MdQrCodeScanner
                  size={42}
                  className="text-cyan-400"
                />

                <div>

                  <p className="
                      text-white font-semibold
                  ">
                      Scan QR Code
                  </p>

                  <p className="
                      text-xs text-gray-400 mt-1
                  ">
                      Use camera scanner
                  </p>

                </div>

            </motion.button>

            {/* upload */}
            <motion.label
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  cursor-pointer
                  rounded-2xl
                  border border-purple-500/20
                  bg-purple-500/10
                  p-6
                  flex flex-col items-center
                  justify-center gap-3
                  hover:bg-purple-500/20
                  transition-all
                "
            >

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleQRImageUpload}
                />

                <MdCloudUpload
                  size={42}
                  className="text-purple-400"
                />

                <div>

                  <p className="
                      text-white font-semibold
                  ">
                      Upload QR Image
                  </p>

                  <p className="
                      text-xs text-gray-400 mt-1
                  ">
                      JPG, PNG, WEBP
                  </p>

                </div>

            </motion.label>

          </div>



          {/* scanner container */}
          {
          scannerOpen && (

          <div className="
            mt-6
            rounded-2xl
            overflow-hidden
            border border-cyan-500/20
            bg-black
            p-3
          ">

            <div id="reader" />

          </div>

          )
          }



          {/* hidden image reader */}
          <div
            id="image-reader"
            className="hidden"
          />



          {/* drug info */}
          <div className="
            mt-8 rounded-2xl
            border border-white/10
            bg-white/5
            p-4
          ">

            <p className="
                text-xs text-cyan-400 mb-2
            ">
                Selected Drug
            </p>

            <div className="
                flex items-center justify-between
            ">

                <div>

                  <p className="
                      text-white font-semibold
                  ">
                      {selectedVerifyDrug.name}
                  </p>

                  <p className="
                      text-xs text-gray-400 mt-1
                  ">
                      {selectedVerifyDrug.drugId}
                  </p>

                </div>

                <div className="
                  px-3 py-1 rounded-full
                  bg-green-500/10
                  border border-green-500/20
                  text-green-400 text-xs
                ">
                  Blockchain Registered
                </div>

            </div>

          </div>

      </div>

    </div>

    )
    }

    {
    verificationLoading && (

    <div className="
    fixed inset-0 z-[70]
    flex items-center justify-center
    bg-black/80 backdrop-blur-sm
    ">

      <div className="
          relative
          w-full max-w-md
          rounded-3xl
          border border-cyan-500/20
          bg-[#07111f]
          p-8
          shadow-[0_0_70px_rgba(0,229,255,0.18)]
          overflow-hidden
      ">

          {/* animated glow */}
          <div className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.15),transparent_45%)]
            animate-pulse
          " />

          <div className="
            relative z-10
            flex flex-col items-center
          ">

            {/* rotating rings */}
            <div className="
                relative
                w-28 h-28
                flex items-center justify-center
            ">

                {/* outer ring */}
                <motion.div
                  animate={{
                      rotate: 360
                  }}

                  transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear"
                  }}

                  className="
                      absolute
                      inset-0
                      rounded-full
                      border-2 border-cyan-400/20
                      border-t-cyan-400
                  "
                />

                {/* middle ring */}
                <motion.div
                  animate={{
                      rotate: -360
                  }}

                  transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                  }}

                  className="
                      absolute
                      inset-3
                      rounded-full
                      border-2 border-purple-400/20
                      border-t-purple-400
                  "
                />

                {/* inner pulse */}
                <motion.div

                  animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.7, 1, 0.7]
                  }}

                  transition={{
                      duration: 2,
                      repeat: Infinity
                  }}

                  className="
                      w-12 h-12
                      rounded-full
                      bg-cyan-400/20
                      flex items-center justify-center
                  "
                >

                  <MdVerifiedUser
                      size={28}
                      className="text-cyan-400"
                  />

                </motion.div>

            </div>

            {/* title */}
            <h2 className="
                mt-8
                text-2xl font-bold
                text-white
            ">
                Verifying Drug
            </h2>

            {/* subtitle */}
            <p className="
                mt-3
                text-center
                text-gray-400
                leading-relaxed
            ">
                Validating blockchain authenticity
                and analyzing pharmaceutical records...
            </p>

            {/* blockchain steps */}
            <div className="
                mt-8
                w-full
                space-y-4
            ">

                {
                [
                  "Scanning QR signature",
                  "Connecting to blockchain",
                  "Verifying smart contract",
                  "Analyzing drug integrity"
                ].map((step, index) => (

                  <motion.div

                      key={index}

                      initial={{
                        opacity: 0.3
                      }}

                      animate={{
                        opacity: [0.3, 1, 0.3]
                      }}

                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.4
                      }}

                      className="
                        flex items-center gap-3
                        rounded-xl
                        border border-cyan-500/10
                        bg-cyan-500/5
                        px-4 py-3
                      "
                  >

                      <div className="
                        w-2 h-2 rounded-full
                        bg-cyan-400
                      " />

                      <span className="
                        text-sm text-cyan-100
                      ">
                        {step}
                      </span>

                  </motion.div>

                ))
                }

            </div>

          </div>

      </div>

    </div>

    )
    }

    {
    invalidQRMessage && (

    <div className="
    fixed inset-0 z-[80]
    flex items-center justify-center
    bg-black/80 backdrop-blur-sm
    px-4
    ">

      <div className="
          relative
          w-full max-w-md
          rounded-3xl
          border border-red-500/20
          bg-[#120b0b]
          p-7
          shadow-[0_0_70px_rgba(239,68,68,0.18)]
          overflow-hidden
      ">

          {/* glow */}
          <div className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.15),transparent_45%)]
          " />

          {/* close */}
          <button
            onClick={() =>
                setInvalidQRMessage("")
            }
            className="
                absolute top-4 right-4
                text-gray-400 hover:text-white
                text-xl z-10
            "
          >
            ✕
          </button>

          <div className="
            relative z-10
            flex flex-col items-center
            text-center
          ">

            {/* icon */}
            <div className="
                w-24 h-24
                rounded-full
                bg-red-500/10
                border border-red-500/20
                flex items-center justify-center
                mb-6
            ">

                <MdDangerous
                  size={50}
                  className="text-red-400"
                />

            </div>

            {/* title */}
            <h2 className="
                text-3xl font-bold
                text-red-400
            ">
                Verification Failed
            </h2>

            {/* message */}
            <p className="
                mt-4
                text-gray-300
                leading-relaxed
            ">
                {invalidQRMessage}
            </p>

            {/* warning box */}
            <div className="
                mt-6
                rounded-2xl
                border border-red-500/20
                bg-red-500/5
                p-4
                text-sm text-red-200
            ">

                This QR code may be invalid,
                tampered with, or not registered
                in the pharmaceutical blockchain
                verification system.

            </div>

            {/* button */}
            <button
                onClick={() =>
                  setInvalidQRMessage("")
                }
                className="
                  mt-7
                  rounded-xl
                  bg-red-500/20
                  border border-red-500/20
                  px-6 py-3
                  text-red-300
                  font-semibold
                  hover:bg-red-500/30
                  transition-all
                "
            >
                Close Warning
            </button>

          </div>

      </div>

    </div>

    )
    }

    {
    showVerificationResult &&
    verificationResult && (

    <div className="
    fixed inset-0 z-[60]
    flex items-center justify-center
    bg-black/80 backdrop-blur-sm
    px-4
    ">

      <div className="
          relative
          w-full max-w-3xl
          rounded-3xl
          border border-cyan-500/20
          bg-[#07111f]
          p-6
          shadow-[0_0_70px_rgba(0,229,255,0.18)]
          overflow-hidden
      ">

          {/* glow */}
          <div className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.12),transparent_40%)]
            pointer-events-none
          " />

          {/* close */}
          <button
            onClick={() =>
                setShowVerificationResult(false)
            }
            className="
                absolute top-4 right-4
                text-gray-400 hover:text-white
                text-xl z-10
            "
          >
            ✕
          </button>

          {/* status */}
          <div className="
            flex flex-col items-center
            text-center
            mb-8
          ">

            {
            verificationResult.isAuthentic ? (

            <>

                <div className="
                  w-24 h-24 rounded-full
                  flex items-center justify-center
                  bg-green-500/10
                  border border-green-500/20
                  mb-4
                ">

                  <MdVerifiedUser
                      size={50}
                      className="text-green-400"
                  />

                </div>

                <h2 className="
                  text-3xl font-bold
                  text-green-400
                ">
                  Authentic Drug
                </h2>

                <p className="
                  text-gray-400 mt-2
                ">
                  Blockchain verification successful
                </p>

            </>

            ) : (

            <>

                <div className="
                  w-24 h-24 rounded-full
                  flex items-center justify-center
                  bg-red-500/10
                  border border-red-500/20
                  mb-4
                ">

                  <MdDangerous
                      size={50}
                      className="text-red-400"
                  />

                </div>

                <h2 className="
                  text-3xl font-bold
                  text-red-400
                ">
                  Fake / Invalid Drug
                </h2>

                <p className="
                  text-gray-400 mt-2
                ">
                  Drug not found in blockchain
                </p>

            </>

            )
            }

          </div>

          {/* details */}
          {
          verificationResult.drug && (

          <>
          {
            isDrugExpired(
              verificationResult.drug.expiryDate
            ) && (

          <div className="
            md:col-span-2
            rounded-2xl
            border border-red-500/20
            bg-red-500/10
            p-5
            flex items-center gap-4
          ">

            <div className="
                w-14 h-14
                rounded-full
                bg-red-500/10
                flex items-center justify-center
                shrink-0
            ">

                <MdDangerous
                  size={32}
                  className="text-red-400"
                />

            </div>

            <div>

                <h3 className="
                  text-red-400
                  text-lg font-bold
                ">
                  Expired Drug Warning
                </h3>

                <p className="
                  text-gray-300 mt-1
                ">
                  This pharmaceutical product
                  has expired and should not
                  be consumed or distributed.
                </p>

            </div>

          </div>

          )
          }
          <div className="
            grid md:grid-cols-2 gap-5
          ">

            <InfoCard
                label="Drug Name"
                value={
                  verificationResult.drug.name
                }
            />

            <InfoCard
                label="Drug ID"
                value={
                  verificationResult.drug.drugId
                }
            />

            <InfoCard
                label="Batch Number"
                value={
                  verificationResult.drug.batchNumber
                }
            />

            <InfoCard
                label="Current Stage"
                value={
                  verificationResult.drug.currentStage
                }
            />

            <InfoCard
                label="Current Owner"
                value={
                  verificationResult.drug.currentOwner?.organizationName ||

                  verificationResult.drug.currentOwner?.name
                }
            />

            <InfoCard
                label="Expiry Date"
                value={
                  new Date(
                      verificationResult.drug.expiryDate
                  ).toLocaleDateString()
                }
            />

          </div>
          </>

          )
          }

          {/* blockchain */}
          <div className="
            mt-6 rounded-2xl
            border border-cyan-500/20
            bg-cyan-500/5
            p-5
          ">

            <div className="
                flex items-center justify-between
            ">

                <div>

                  <p className="
                      text-sm text-cyan-400
                  ">
                      Blockchain Status
                  </p>

                  <p className="
                      text-white font-semibold mt-1
                  ">
                      {
                      verificationResult.isBlockchainVerified

                        ? "Verified On Blockchain"

                        : "Not Verified"
                      }
                  </p>

                </div>

                <div className="
                  px-4 py-2 rounded-full
                  bg-green-500/10
                  border border-green-500/20
                  text-green-400 text-sm
                ">
                  Secure
                </div>

            </div>

          </div>

          {/* risk */}
          <div className="
            mt-5 grid md:grid-cols-2 gap-5
          ">

            <div className="
                rounded-2xl
                border border-purple-500/20
                bg-purple-500/5
                p-5
            ">

                <p className="
                  text-sm text-purple-400
                ">
                  AI Risk Score
                </p>

                <h3 className="
                  text-4xl font-bold
                  text-white mt-2
                ">
                  {
                  verificationResult.drug?.latestRiskScore || 0
                  }%
                </h3>

            </div>

            <div className="
                rounded-2xl
                border border-amber-500/20
                bg-amber-500/5
                p-5
            ">

                <p className="
                  text-sm text-amber-400
                ">
                  Anomaly Detection
                </p>

                <h3 className="
                  text-xl font-bold
                  mt-3
                  text-white
                ">
                  {
                  verificationResult.drug?.hasAnomaly

                  ? "Suspicious Activity"

                  : "No Anomalies"
                  }
                </h3>

            </div>

          </div>

      </div>

    </div>

    )
    }

    {
   showTransferModal &&
   selectedTransferDrug && (

    <div className="
    fixed inset-0 z-[70]
    flex items-center justify-center
    bg-black/80 backdrop-blur-sm
    px-4
    ">

      <div className="
          relative
          w-full max-w-2xl
          rounded-3xl
          border border-purple-500/20
          bg-[#07111f]
          p-6
          shadow-[0_0_70px_rgba(168,85,247,0.18)]
          overflow-hidden
      ">

          {/* glow */}
          <div className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_45%)]
          " />

          {/* close */}
          <button
            onClick={() =>
                setShowTransferModal(false)
            }

            className="
                absolute top-4 right-4
                text-gray-400 hover:text-white
                text-xl z-10
            "
          >
            ✕
          </button>

          <div className="
            relative z-10
          ">

            {/* title */}
            <div className="
                flex items-center gap-3 mb-8
            ">

                <div className="
                  w-14 h-14 rounded-2xl
                  bg-purple-500/10
                  border border-purple-500/20
                  flex items-center justify-center
                ">

                  <BiTransfer
                      size={30}
                      className="text-purple-400"
                  />

                </div>

                <div>

                  <h2 className="
                      text-3xl font-bold
                      text-white
                  ">
                      Transfer Ownership
                  </h2>

                  <p className="
                      text-gray-400 mt-1
                  ">
                      Blockchain-secured drug transfer
                  </p>

                </div>

            </div>

            {/* drug info */}
            <div className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-5
                mb-6
            ">

                <div className="
                  flex items-center justify-between
                ">

                  <div>

                      <p className="
                        text-sm text-purple-400
                      ">
                        Selected Drug
                      </p>

                      <h3 className="
                        text-xl font-bold
                        text-white mt-2
                      ">
                        {selectedTransferDrug.name}
                      </h3>

                      <p className="
                        text-gray-400 mt-1
                      ">
                        {
                        selectedTransferDrug.drugId
                        }
                      </p>

                  </div>

                  <div className="
                      px-4 py-2 rounded-full
                      bg-green-500/10
                      border border-green-500/20
                      text-green-400 text-sm
                  ">
                      Blockchain Active
                  </div>

                </div>

            </div>

            {/* form */}
            <div className="
                space-y-5
            ">

                {/* recipient */}
                <div>

                  <label className="
                      block text-sm text-gray-300 mb-2
                  ">
                      Recipient Email
                  </label>

                  <input
                      type="email"

                      name="toUserEmail"

                      value={
                        transferForm.toUserEmail
                      }

                      onChange={
                        handleTransferInput
                      }

                      placeholder="
                      Enter recipient email
                      "

                      className="
                        w-full
                        rounded-2xl
                        border border-purple-500/20
                        bg-[#0b1628]
                        px-5 py-4
                        text-white
                        outline-none
                        focus:border-purple-400
                        transition-all
                      "
                  />

                </div>

                {/* blockchain animation */}
                <div className="
                  rounded-2xl
                  border border-purple-500/20
                  bg-purple-500/5
                  p-5
                ">

                  <div className="
                      flex items-center justify-between
                  ">

                      <div className="
                        flex items-center gap-4
                      ">

                        <div className="
                            w-12 h-12 rounded-full
                            bg-cyan-500/10
                            flex items-center justify-center
                        ">

                            <MdVerifiedUser
                              size={24}
                              className="text-cyan-400"
                            />

                        </div>

                        <motion.div

                            animate={{
                              x: [0, 10, 0]
                            }}

                            transition={{
                              duration: 1.5,
                              repeat: Infinity
                            }}

                        >

                            <BiTransfer
                              size={28}
                              className="text-purple-400"
                            />

                        </motion.div>

                        <div className="
                            w-12 h-12 rounded-full
                            bg-green-500/10
                            flex items-center justify-center
                        ">

                            <MdOutlineInventory2
                              size={24}
                              className="text-green-400"
                            />

                        </div>

                      </div>

                      <div className="
                        text-right
                      ">

                        <p className="
                            text-sm text-purple-300
                        ">
                            Smart Contract
                        </p>

                        <p className="
                            text-xs text-gray-400 mt-1
                        ">
                            Ownership transfer
                            will be recorded
                            on blockchain
                        </p>

                      </div>

                  </div>

                </div>

                {/* buttons */}
                <div className="
                  flex justify-end gap-4 pt-4
                ">

                  <button

                      onClick={() =>
                        setShowTransferModal(false)
                      }

                      className="
                        px-6 py-3 rounded-xl
                        border border-white/10
                        text-gray-300
                        hover:bg-white/5
                        transition-all
                      "
                  >
                      Cancel
                  </button>

                  <button

                      onClick={handleConfirmTransfer}
                      className="
                        px-6 py-3 rounded-xl
                        bg-purple-500/20
                        border border-purple-500/20
                        text-purple-300
                        font-semibold
                        hover:bg-purple-500/30
                        transition-all
                      "
                  >
                      Confirm Transfer
                  </button>

                </div>

            </div>

          </div>

      </div>

    </div>

    )
    }
   </Layout>
  );
}