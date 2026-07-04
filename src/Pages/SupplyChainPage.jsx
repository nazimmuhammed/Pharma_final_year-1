import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  MdSearch,
  MdQrCode2,
  MdVerified,
  MdCheckCircle,
  MdOutlineInventory2,
  MdVisibility,
  MdDownload,
  MdBusiness,
  MdFlag,
  MdOpenInNew,
  MdNotifications,
  MdCalendarToday,
  MdPerson,
  MdShield,
  MdClose,
} from "react-icons/md";

import {
  RiShieldCheckFill,
  RiMedicineBottleLine,
} from "react-icons/ri";

import { BiNetworkChart } from "react-icons/bi";

import { BsHexagon } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchSupplyChain,
  clearSupplyChain,
} from "../Redux/Slices/SupplyChainSlice";

/* ─────────────────────────────────────────────
   Risk Chart
───────────────────────────────────────────── */
const RiskChart = ({ score = 0 }) => {
  const points = [
    { d: "Mon", v: score + 20 },
    { d: "Tue", v: score + 15 },
    { d: "Wed", v: score + 10 },
    { d: "Thu", v: score + 8 },
    { d: "Fri", v: score + 5 },
    { d: "Sat", v: score + 3 },
    { d: "Sun", v: score },
  ];

  const W = 340;
  const H = 130;
  const pad = 28;

  const xs = points.map(
    (_, i) =>
      pad +
      (i / (points.length - 1)) *
        (W - pad * 2)
  );

  const max = 100;

  const y = (v) =>
    pad +
    ((max - v) / max) *
      (H - pad * 2);

  const linePath = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"}${
          xs[i]
        },${y(p.v)}`
    )
    .join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      <path
        d={linePath}
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
      />

      {points.map((p, i) => (
        <circle
          key={i}
          cx={xs[i]}
          cy={y(p.v)}
          r="4"
          fill="#10b981"
        />
      ))}
    </svg>
  );
};

/* ─────────────────────────────────────────────
   Gauge
───────────────────────────────────────────── */
const Gauge = ({ value = 0 }) => {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="
        w-36 h-36 rounded-full
        border-[10px]
        border-green-500/20
        flex items-center justify-center
      "
      >
        <div className="text-center">
          <p className="text-4xl font-bold text-white">
            {value}
          </p>

          <p className="text-sm text-green-400">
            Risk Score
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Fake QR
───────────────────────────────────────────── */
const FakeQR = () => (
  <div
    className="
    w-28 h-28 rounded-xl
    bg-white
    flex items-center justify-center
  "
  >
    <MdQrCode2
      size={65}
      className="text-black"
    />
  </div>
);

/* ─────────────────────────────────────────────
   Glass Card
───────────────────────────────────────────── */
const GlassCard = ({
  children,
  className = "",
}) => (
  <div
    className={`
      rounded-3xl
      border border-white/10
      bg-[#06101f]/95
      backdrop-blur-xl
      shadow-[0_0_40px_rgba(0,0,0,0.35)]
      overflow-hidden
      ${className}
    `}
  >
    {children}
  </div>
);

/* ─────────────────────────────────────────────
   Info Row
───────────────────────────────────────────── */
const InfoRow = ({
  icon: Icon,
  label,
  value,
  valueClass = "text-white",
}) => (
  <div
    className="
    flex items-center justify-between
    gap-3 py-3
    border-b border-white/5
  "
  >
    <div className="flex items-center gap-2">
      <Icon
        size={14}
        className="text-gray-500"
      />

      <span className="text-xs text-gray-500">
        {label}
      </span>
    </div>

    <span
      className={`text-xs font-semibold ${valueClass}`}
    >
      {value}
    </span>
  </div>
);

/* ─────────────────────────────────────────────
   Action Button
───────────────────────────────────────────── */
const ActionBtn = ({
  icon: Icon,
  label,
  color = "cyan",
  onClick,
}) => {
  const colors = {
    cyan: `
      text-cyan-400
      border-cyan-500/20
      bg-cyan-500/5
    `,
    purple: `
      text-purple-400
      border-purple-500/20
      bg-purple-500/5
    `,
    green: `
      text-green-400
      border-green-500/20
      bg-green-500/5
    `,
    amber: `
      text-amber-400
      border-amber-500/20
      bg-amber-500/5
    `,
    red: `
      text-red-400
      border-red-500/20
      bg-red-500/5
    `,
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.96,
      }}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center
        gap-2
        rounded-2xl
        border
        p-4
        transition-all
        ${colors[color]}
      `}
    >
      <Icon size={18} />

      <span className="text-[10px] font-semibold">
        {label}
      </span>
    </motion.button>
  );
};

/* ─────────────────────────────────────────────
   TX Badge
───────────────────────────────────────────── */
const TxBadge = ({ label }) => (
  <span
    className="
    px-3 py-1 rounded-full
    bg-cyan-500/10
    border border-cyan-500/20
    text-cyan-400
    text-[10px]
    font-bold capitalize
  "
  >
    {label}
  </span>
);

/* ════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════ */
export default function SupplyChainPage() {
  const [searchDrugId, setSearchDrugId] =
    useState("");

  const dispatch = useDispatch();

  const {
    loading,
    error,
    supplyChainData,
  } = useSelector(
    (state) => state.supplychain
  );

  /* CLEAR OLD DATA WHEN PAGE LOADS */
  useEffect(() => {
    dispatch(clearSupplyChain());
  }, [dispatch]);

  const drug =
    supplyChainData?.drug;

  const journey =
    supplyChainData?.journey || [];

  const transactions =
    supplyChainData?.transactions || [];

  const analytics =
    supplyChainData?.analytics;

  const verification =
    supplyChainData?.verification;

  return (
    <div
      className="
      min-h-screen
      bg-[#020817]
      text-white
      overflow-x-hidden
    "
    >
      <div
        className="
        w-full
        max-w-[1700px]
        mx-auto
        px-4
        lg:px-6
        py-6
        flex flex-col gap-6
      "
      >

        {/* SEARCH */}
        <GlassCard className="p-6">
          <div className="mb-5">
            <h1 className="text-4xl font-bold">
              Search Supply Chain
            </h1>

            <p className="text-gray-500 mt-2">
              Search drug using Drug ID
            </p>
          </div>

          <div
            className="
            flex flex-col xl:flex-row
            gap-4
          "
          >

            {/* INPUT */}
            <div className="relative flex-1">
              <MdOutlineInventory2
                size={20}
                className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-cyan-400
              "
              />

              <input
                type="text"
                value={searchDrugId}
                onChange={(e) =>
                  setSearchDrugId(
                    e.target.value
                  )
                }
                placeholder="Enter Drug ID"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border border-cyan-500/20
                  bg-[#0b1628]
                  pl-12 pr-4
                  text-white
                  outline-none
                  focus:border-cyan-400/50
                "
              />
            </div>

            {/* SEARCH BTN */}
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => {
                if (!searchDrugId) return;

                dispatch(
                  fetchSupplyChain(
                    searchDrugId
                  )
                );
              }}
              className="
                h-14
                px-8
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
                font-bold
                flex items-center justify-center
                gap-2
                whitespace-nowrap
              "
            >
              <MdSearch size={18} />
              Search
            </motion.button>

            {/* QR BTN */}
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                h-14
                px-8
                rounded-2xl
                border border-purple-500/20
                bg-purple-500/10
                text-purple-400
                font-bold
                flex items-center justify-center
                gap-2
                whitespace-nowrap
              "
            >
              <MdQrCode2 size={18} />
              Scan QR
            </motion.button>

            {/* CLEAR BTN */}
            {supplyChainData && (
              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => {
                  dispatch(
                    clearSupplyChain()
                  );

                  setSearchDrugId("");
                }}
                className="
                  h-14
                  px-6
                  rounded-2xl
                  border border-red-500/20
                  bg-red-500/10
                  text-red-400
                  font-bold
                  flex items-center justify-center
                  gap-2
                "
              >
                <MdClose size={18} />
                Clear
              </motion.button>
            )}
          </div>
        </GlassCard>

        {/* LOADING */}
        {loading && (
          <GlassCard className="p-8 text-center">
            <p className="text-cyan-400 text-lg">
              Fetching blockchain
              supply chain...
            </p>
          </GlassCard>
        )}

        {/* ERROR */}
        {error && (
          <GlassCard className="p-8 text-center border border-red-500/20">
            <p className="text-red-400 text-lg">
              {error}
            </p>
          </GlassCard>
        )}

        {/* MAIN CONTENT */}
        <AnimatePresence>
          {supplyChainData && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="
                grid
                grid-cols-1
                2xl:grid-cols-[320px_1fr_320px]
                xl:grid-cols-[280px_1fr]
                gap-6
              "
            >

              {/* LEFT */}
              <div className="flex flex-col gap-6">

                {/* DRUG INFO */}
                <GlassCard>
                  <div
                    className="
                    p-5
                    flex items-center gap-4
                    border-b border-white/10
                  "
                  >
                    <div
                      className="
                      w-16 h-16 rounded-2xl
                      bg-cyan-500/10
                      flex items-center justify-center
                    "
                    >
                      <RiMedicineBottleLine
                        size={30}
                        className="text-cyan-400"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">
                        {drug?.name ||
                          "N/A"}
                      </h2>

                      <span
                        className="
                        mt-2 inline-flex
                        px-3 py-1
                        rounded-full
                        bg-green-500/10
                        border border-green-500/20
                        text-green-400
                        text-xs font-bold
                      "
                      >
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="px-5 py-2">

                    <InfoRow
                      icon={MdShield}
                      label="Drug ID"
                      value={
                        drug?.drugId ||
                        "N/A"
                      }
                    />

                    <InfoRow
                      icon={BsHexagon}
                      label="Batch"
                      value={
                        drug?.batchNumber ||
                        "N/A"
                      }
                    />

                    <InfoRow
                      icon={
                        MdCalendarToday
                      }
                      label="Created"
                      value={
                        drug?.createdAt
                          ? new Date(
                              drug.createdAt
                            ).toLocaleDateString()
                          : "N/A"
                      }
                    />

                    <InfoRow
                      icon={
                        MdCalendarToday
                      }
                      label="Expiry"
                      value={
                        drug?.expiryDate
                          ? new Date(
                              drug.expiryDate
                            ).toLocaleDateString()
                          : "N/A"
                      }
                    />

                    <InfoRow
                      icon={MdBusiness}
                      label="Manufacturer"
                      value={
                        drug
                          ?.manufacturer
                          ?.name ||
                        "N/A"
                      }
                    />

                    <InfoRow
                      icon={MdPerson}
                      label="Current Holder"
                      value={
                        drug
                          ?.currentOwner
                          ?.name ||
                        "N/A"
                      }
                      valueClass="
                        text-green-400
                      "
                    />

                    <InfoRow
                      icon={MdShield}
                      label="Current Stage"
                      value={
                        drug
                          ?.currentStage ||
                        "N/A"
                      }
                      valueClass="
                        text-cyan-400
                      "
                    />
                  </div>
                </GlassCard>

                {/* VERIFIED */}
                <GlassCard className="p-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="
                      w-12 h-12 rounded-2xl
                      bg-green-500/10
                      flex items-center justify-center
                    "
                    >
                      <RiShieldCheckFill
                        size={24}
                        className="text-green-400"
                      />
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Verification
                      </p>

                      <h3 className="text-green-400 text-xl font-bold">
                        {verification?.blockchainVerified
                          ? "Verified & Authentic"
                          : "Pending Verification"}
                      </h3>
                    </div>
                  </div>
                </GlassCard>

                {/* RISK */}
                <GlassCard className="p-5">
                  <h2 className="text-2xl font-bold mb-6">
                    AI Risk Assessment
                  </h2>

                  <Gauge
                    value={
                      analytics?.latestRiskScore ||
                      0
                    }
                  />

                  <div className="mt-6 flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">
                        Risk Level
                      </p>

                      <p className="text-green-400 font-bold text-lg">
                        {analytics?.latestRiskScore >
                        70
                          ? "High"
                          : analytics?.latestRiskScore >
                            30
                          ? "Medium"
                          : "Low"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-500 text-sm">
                        Total Scans
                      </p>

                      <p className="text-cyan-400 font-bold text-lg">
                        {analytics?.totalScans ||
                          0}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* CENTER */}
              <div className="flex flex-col gap-6 min-w-0">

                {/* JOURNEY */}
                <GlassCard>

                  <div
                    className="
                    px-6 py-5
                    border-b border-white/10
                  "
                  >
                    <h2 className="text-3xl font-bold">
                      Supply Chain Journey
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <div
                      className="
                      min-w-[900px]
                      px-6 py-10
                      flex items-start
                    "
                    >

                      {journey.map((stage, i) => {

                        const isLastStage =
                            i === journey.length - 1;

                        return (

                            <div
                                key={i}
                                className="
                                flex items-start flex-1
                            "
                            >

                                <div
                                    className="
                                    flex flex-col
                                    items-center
                                    flex-1
                                "
                                >

                                    {/* ICON */}
                                    <div
                                    className={`
                                        w-16 h-16 rounded-full
                                        border-2
                                        flex items-center justify-center

                                        ${
                                            isLastStage
                                            ? `
                                                border-green-400
                                                bg-green-400/10
                                            `
                                            : `
                                                border-cyan-400
                                                bg-cyan-400/10
                                            `
                                        }
                                    `}
                                    >

                                    <MdCheckCircle
                                        size={26}
                                        className={`
                                            ${
                                                isLastStage
                                                ? "text-green-400"
                                                : "text-cyan-400"
                                            }
                                        `}
                                    />

                                    </div>

                                    {/* TITLE */}
                                    <h3
                                    className={`
                                        mt-4
                                        text-lg font-bold

                                        ${
                                            isLastStage
                                            ? "text-green-400"
                                            : "text-white"
                                        }
                                    `}
                                    >
                                    {stage.stage}
                                    </h3>

                                    {/* COMPANY */}
                                    <p className="
                                    text-gray-400
                                    text-sm
                                    text-center
                                    mt-1
                                    ">
                                    {stage.organization || "Unknown"}
                                    </p>

                                    {/* LOCATION */}
                                    <p className="
                                    text-gray-600
                                    text-xs
                                    mt-1
                                    ">
                                    {
                                        stage?.location?.city
                                        || "Unknown"
                                    }
                                    </p>

                                    {/* DATE */}
                                    <div
                                    className={`
                                        mt-3
                                        px-3 py-1
                                        rounded-full
                                        border
                                        text-xs

                                        ${
                                            isLastStage
                                            ? `
                                                bg-green-500/10
                                                border-green-500/20
                                                text-green-400
                                            `
                                            : `
                                                bg-cyan-500/10
                                                border-cyan-500/20
                                                text-cyan-400
                                            `
                                        }
                                    `}
                                    >
                                    {new Date(
                                        stage.timestamp
                                    ).toLocaleDateString()}
                                    </div>

                                </div>

                                {/* LINE */}
                                {i < journey.length - 1 && (

                                    <div
                                    className="
                                    flex-1 h-[2px]
                                    bg-cyan-500/30
                                    mt-8
                                    "
                                    />

                                )}

                            </div>
                        );
                        })}
                    </div>
                  </div>

                  <div
                    className="
                    px-6 py-5
                    border-t border-white/10
                    flex flex-wrap gap-8
                    items-center
                  "
                  >
                    <div>
                      <p className="text-gray-600 text-xs">
                        Blockchain
                      </p>

                      <p className="font-bold">
                        Ethereum
                        (Ganache)
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-xs">
                        Total Transfers
                      </p>

                      <p className="font-bold">
                        {
                          analytics?.totalTransfers
                        }
                      </p>
                    </div>

                    <motion.button
                      whileHover={{
                        scale: 1.03,
                      }}
                      onClick={() => {
                        if (
                          drug?.blockchainTxHash
                        ) {
                          window.open(
                            `https://etherscan.io/tx/${drug.blockchainTxHash}`,
                            "_blank"
                          );
                        }
                      }}
                      className="
                        ml-auto
                        flex items-center gap-2
                        text-cyan-400
                        font-bold
                      "
                    >
                      View on Explorer
                      <MdOpenInNew
                        size={18}
                      />
                    </motion.button>
                  </div>
                </GlassCard>

                {/* TRANSACTIONS */}
                <GlassCard>

                  <div
                    className="
                    px-6 py-5
                    border-b border-white/10
                  "
                  >
                    <h2 className="text-3xl font-bold">
                      Transaction History
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">

                      <thead>
                        <tr className="border-b border-white/10">

                          {[
                            "#",
                            "Action",
                            "Performed By",
                            "Location",
                            "Date",
                            "Tx Hash",
                          ].map((h) => (
                            <th
                              key={h}
                              className="
                              px-5 py-4
                              text-left
                              text-xs
                              uppercase
                              tracking-widest
                              text-gray-600
                            "
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {transactions.map(
                          (
                            tx,
                            index
                          ) => (
                            <tr
                              key={index}
                              className="
                              border-b border-white/5
                            "
                            >
                              <td className="px-5 py-5 text-sm text-gray-500">
                                {index + 1}
                              </td>

                              <td className="px-5 py-5">
                                <TxBadge
                                  label={
                                    tx.action
                                  }
                                />
                              </td>

                              <td className="px-5 py-5">
                                <p className="font-semibold">
                                  {
                                    tx.performedBy
                                  }
                                </p>

                                <p className="text-xs text-gray-600">
                                  {tx.role}
                                </p>
                              </td>

                              <td className="px-5 py-5 text-sm text-gray-400">
                                {tx
                                  ?.location
                                  ?.city ||
                                  "Unknown"}
                              </td>

                              <td className="px-5 py-5 text-sm text-gray-400">
                                {new Date(
                                  tx.timestamp
                                ).toLocaleString()}
                              </td>

                              <td className="px-5 py-5">
                                <span
                                  className="
                                  font-mono
                                  text-cyan-400
                                  text-xs
                                "
                                >
                                  {tx.txHash ||
                                    "Pending"}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-6">

                {/* VERIFY */}
                <GlassCard className="p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    Verify Product
                  </h2>

                  <div className="flex flex-col items-center gap-5">
                    <FakeQR />

                    <div
                      className="
                      px-5 py-2 rounded-full
                      bg-green-500/10
                      border border-green-500/20
                      text-green-400
                      font-bold
                      flex items-center gap-2
                    "
                    >
                      <MdCheckCircle
                        size={16}
                      />
                      Verified
                    </div>
                  </div>
                </GlassCard>

                {/* ACTIONS */}
                <GlassCard className="p-5">
                  <h2 className="text-2xl font-bold mb-5">
                    Quick Actions
                  </h2>

                  <div className="grid grid-cols-3 gap-3">

                    <ActionBtn
                      icon={MdVisibility}
                      label="View"
                      color="cyan"
                    />

                    <ActionBtn
                      icon={MdVerified}
                      label="Verify"
                      color="green"
                    />

                    <ActionBtn
                      icon={MdDownload}
                      label="Download"
                      color="purple"
                      onClick={() => {
                        alert(
                          "PDF Download Feature Coming Soon"
                        );
                      }}
                    />

                    <ActionBtn
                      icon={MdQrCode2}
                      label="QR"
                      color="cyan"
                    />

                    <ActionBtn
                      icon={
                        BiNetworkChart
                      }
                      label="Risk"
                      color="amber"
                    />

                    <ActionBtn
                      icon={MdFlag}
                      label="Report"
                      color="red"
                    />
                  </div>
                </GlassCard>

                {/* RISK TREND */}
                <GlassCard className="p-5">
                  <h2 className="text-2xl font-bold mb-5">
                    Risk Trend
                  </h2>

                  <RiskChart
                    score={
                      analytics?.latestRiskScore ||
                      0
                    }
                  />
                </GlassCard>

                {/* ALERTS */}
                <GlassCard className="p-5">
                  <h2 className="text-2xl font-bold mb-5">
                    Alerts &
                    Notifications
                  </h2>

                  <div className="space-y-4">

                    <div
                      className="
                      p-4 rounded-2xl
                      bg-green-500/5
                      border border-green-500/15
                    "
                    >
                      <div className="flex gap-3">
                        <MdCheckCircle
                          size={18}
                          className="
                          text-green-400 mt-1
                        "
                        />

                        <div>
                          <p className="font-bold text-green-400">
                            No issues
                            detected
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            Product is
                            authentic and
                            safe
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="
                      p-4 rounded-2xl
                      bg-cyan-500/5
                      border border-cyan-500/15
                    "
                    >
                      <div className="flex gap-3">
                        <MdNotifications
                          size={18}
                          className="
                          text-cyan-400 mt-1
                        "
                        />

                        <div>
                          <p className="font-bold text-cyan-400">
                            Blockchain
                            Synced
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            All
                            transactions
                            verified
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </GlassCard>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}