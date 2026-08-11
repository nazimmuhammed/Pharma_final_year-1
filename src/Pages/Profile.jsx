import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdVerifiedUser, MdShield, MdOutlineInventory2, MdLocationOn,
  MdQrCode2, MdTransferWithinAStation, MdWarning, MdCheckCircle,
  MdDescription, MdBarChart, MdLocalShipping, MdArrowForward,
  MdPerson, MdBusiness, MdCalendarToday, MdAccountBalanceWallet,
  MdNumbers, MdRefresh, MdVisibility, MdSearch, MdFilterList,
  MdTrendingUp, MdTrendingDown, MdLock, MdInfo,MdQrCodeScanner,
  MdCloudUpload,MdDangerous,MdMedication,MdInventory,MdFactCheck,


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
import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import MetricsStrip from "../components/profile/MetricsStrip";
import DrugDetailsModal from "../components/profile/modals/DrugDetailsModal";
import QRCodeModal from
"../components/profile/modals/QRCodeModal";

import VerifyDrugModal from
"../components/profile/modals/VerifyDrugModal";

import VerificationResultModal from
"../components/profile/modals/VerificationResultModal";

import TransferModal from
"../components/profile/modals/TransferModal";

import TransferSuccessModal from
"../components/profile/modals/TransferSuccessModal";

import InvalidQRModal from
"../components/profile/modals/InvalidQRModal";
import TransferConfirmModal from
"../components/profile/modals/TransferConfirmModal";

import BlockchainProcessingModal from
"../components/profile/modals/BlockchainProcessingModal";

import ActionBtn from
"../components/profile/ui/ActionBtn";

import StatusBadge from
"../components/profile/ui/StatusBadge";
import BlockchainBadge from
"../components/profile/ui/BlockchainBadge";

import RiskPill from
"../components/profile/ui/RiskPill";
import TableCard from
"../components/profile/ui/TableCard";
import QuickCard from
"../components/profile/ui/QuickCard";
import ManufacturerView from
"../components/profile/views/ManufacturerView";
import DistributorView from
"../components/profile/views/DistributorView";
import RetailerView from
"../components/profile/views/RetailerView";
import InspectorView from
"../components/profile/views/InspectorView";
import { getCurrentLocation } from "../Helpers/locationHelper";


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

  const [showTransferConfirm,
  setShowTransferConfirm] =
    useState(false);

  const [transferSuccessData,
  setTransferSuccessData] =
    useState(null);

  const [transferForm,
  setTransferForm] =
    useState({

        toUserEmail: "",

    });
  const [blockchainProcessing,
  setBlockchainProcessing] =
    useState(false);

   
   

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

   setShowTransferConfirm(false);
   

   if(
      !transferForm.toUserEmail
   ){
      return;
   }

   try {
      setBlockchainProcessing(true);
      

      const location = await getCurrentLocation();

      const payload = {

         drugId:
            selectedTransferDrug.drugId,

         toUserEmail:
            transferForm.toUserEmail,

         location,
      };

      const result =
         await dispatch(

            transferDrugOwnership(payload)

         ).unwrap();
      

      setTransferSuccessData({

        ...result,

        recipientEmail:
            transferForm.toUserEmail
      });
      setBlockchainProcessing(false);

      console.log(
         "Transfer success:",
         result
      );

      // close modal
      setShowTransferModal(false);

      // reset form
      setTransferForm({

         toUserEmail: "",
      });

      // refresh drugs
      dispatch(getMyDrugs());

   }

   catch(error){

      console.error(error);
      setBlockchainProcessing(false);
   }
};

const downloadTransferReceipt =
() => {

   if(!transferSuccessData) return;

   const doc =
      new jsPDF();

   const drug =
      transferSuccessData.data.drug;

   const scan =
      transferSuccessData.data.scan;

   /* title */
   doc.setFontSize(22);

   doc.setTextColor(0, 180, 255);

   doc.text(
      "Pharmaceutical Transfer Certificate",
      20,
      25
   );

   /* subtitle */
   doc.setFontSize(11);

   doc.setTextColor(120);

   doc.text(
      "Blockchain-secured drug ownership transfer receipt",
      20,
      35
   );

   /* line */
   doc.setDrawColor(0, 180, 255);

   doc.line(20, 42, 190, 42);

   /* transfer status */
   doc.setFontSize(14);

   doc.setTextColor(0, 150, 0);

   doc.text(
      "Transfer Successfully Completed",
      20,
      55
   );

   /* table */
   autoTable(doc, {

      startY: 65,

      head: [[
         "Field",
         "Details"
      ]],

      body: [

         [
            "Drug Name",
            drug.name
         ],

         [
            "Drug ID",
            drug.drugId
         ],

         [
            "Batch Number",
            drug.batchNumber
         ],

         [
            "Current Stage",
            drug.currentStage
         ],

         [
            "Blockchain Tx Hash",
            drug.blockchainTxHash || "N/A"
         ],

         [
            "Transferred By",
            data?.name || "Unknown"
         ],

         [
            "Recipient Email",
            transferSuccessData.recipientEmail
         ],

         [
            "Transfer Action",
            scan.action
         ],

         [
            "Verification",
            "Blockchain Verified"
         ],

         [
            "Generated On",
            new Date()
            .toLocaleString()
         ],
      ],
   });

   /* footer */
   doc.setFontSize(10);

   doc.setTextColor(130);

   doc.text(
      "AI-Driven Blockchain Pharmaceutical Supply Chain System",
      20,
      280
   );

   /* save */
   doc.save(

      `${drug.drugId}-transfer-receipt.pdf`
   );
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




  useEffect(() => {

   dispatch(getProfile());

   if(
      role === "manufacturer" ||
      role === "distributor" ||
      role === "retailer" ||
      role === "inspector"
   ){

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

   if(
      verificationResult &&
      showVerifyModal
   ){

      setShowVerificationResult(true);
   }

}, [verificationResult, showVerifyModal]);

const roleMetrics = {

   manufacturer: [

      {
         title: "TOTAL DRUGS REGISTERED",
         value: drugs.length,
         subtitle: "All time",
         icon: MdMedication,
         color: "purple",
      },

      {
         title: "BLOCKCHAIN VERIFIED",
         value: drugs.filter(
            d => d.isBlockchainVerified
         ).length,
         subtitle: "Verified",
         icon: MdVerifiedUser,
         color: "cyan",
      },

      {
         title: "TRANSFERRED",
         value: drugs.filter(
            d => d.currentStage !== "manufactured"
         ).length,
         subtitle: "Supply chain moved",
         icon: BiTransfer,
         color: "green",
      },

      {
         title: "RISK ALERTS",
         value: drugs.filter(
            d => d.hasAnomaly
         ).length,
         subtitle: "Requires attention",
         icon: MdWarning,
         color: "amber",
      },

      {
         title: "ACTIVE SHIPMENTS",
         value: drugs.filter(
            d => d.currentStage === "in_transit"
         ).length,
         subtitle: "In transit",
         icon: FaCube,
         color: "blue",
      },
   ],

   distributor: [

      {
         title: "SHIPMENTS",
         value: drugs.length,
         subtitle: "Managed shipments",
         icon: MdLocalShipping,
         color: "cyan",
      },

      {
         title: "TRANSFERRED",
         value: drugs.filter(
            d => d.currentStage === "at_retailer"
         ).length,
         subtitle: "Delivered",
         icon: BiTransfer,
         color: "green",
      },

      {
         title: "BLOCKCHAIN VERIFIED",
         value: drugs.filter(
            d => d.isBlockchainVerified
         ).length,
         subtitle: "Verified",
         icon: MdVerifiedUser,
         color: "purple",
      },

      {
         title: "RISK ALERTS",
         value: drugs.filter(
            d => d.hasAnomaly
         ).length,
         subtitle: "Flagged",
         icon: MdWarning,
         color: "amber",
      },
   ],

   retailer: [

      {
         title: "AVAILABLE STOCK",
         value: drugs.length,
         subtitle: "Inventory",
         icon: MdInventory,
         color: "green",
      },

      {
         title: "VERIFIED",
         value: drugs.filter(
            d => d.isBlockchainVerified
         ).length,
         subtitle: "Authentic",
         icon: MdVerifiedUser,
         color: "cyan",
      },

      {
         title: "QR VERIFIED",
         value: drugs.filter(
            d => d.qrCodeData
         ).length,
         subtitle: "QR secured",
         icon: MdQrCode2,
         color: "purple",
      },

      {
         title: "SUSPICIOUS",
         value: drugs.filter(
            d => d.hasAnomaly
         ).length,
         subtitle: "Flagged",
         icon: MdWarning,
         color: "amber",
      },
   ],

   inspector: [

      {
         title: "INSPECTED DRUGS",
         value: drugs.length,
         subtitle: "Audit queue",
         icon: MdFactCheck,
         color: "cyan",
      },

      {
         title: "HIGH RISK",
         value: drugs.filter(
            d => d.latestRiskScore > 70
         ).length,
         subtitle: "AI flagged",
         icon: MdWarning,
         color: "amber",
      },

      {
         title: "BLOCKCHAIN VERIFIED",
         value: drugs.filter(
            d => d.isBlockchainVerified
         ).length,
         subtitle: "Validated",
         icon: MdVerifiedUser,
         color: "green",
      },

      {
         title: "ANOMALIES",
         value: drugs.filter(
            d => d.hasAnomaly
         ).length,
         subtitle: "Requires investigation",
         icon: BiNetworkChart,
         color: "purple",
      },
   ],
};

  const roleViews = {
    manufacturer: <ManufacturerView drugs={drugs} handleViewDetails={handleViewDetails} handleShowQR={handleShowQR} handleVerifyDrug={handleVerifyDrug} handleTransferDrug={handleTransferDrug} />,
    distributor:  <DistributorView drugs={drugs} handleViewDetails={handleViewDetails}  handleVerifyDrug={handleVerifyDrug} handleTransferDrug={handleTransferDrug} />,
    retailer:     <RetailerView  drugs={drugs} handleViewDetails={handleViewDetails} handleVerifyDrug={handleVerifyDrug}/>,
    inspector:    <InspectorView  drugs={drugs} handleVerifyDrug={handleVerifyDrug} handleViewDetails={handleViewDetails}/>,
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
      <MetricsStrip
        metrics={
            roleMetrics[role] || []
        }
      />
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

    <DrugDetailsModal

    showDetailsModal={
        showDetailsModal
    }

    selectedDrug={
        selectedDrug
    }

    setShowDetailsModal={
        setShowDetailsModal
    }

    />
    
    <QRCodeModal

      showQRModal={
          showQRModal
      }

      selectedQRDrug={
          selectedQRDrug
      }

      setShowQRModal={
          setShowQRModal
      }

    />

    <VerifyDrugModal

      showVerifyModal={
          showVerifyModal
      }

      selectedVerifyDrug={
          selectedVerifyDrug
      }

      setShowVerifyModal={
          setShowVerifyModal
      }

      scannerOpen={
          scannerOpen
      }

      setScannerOpen={
          setScannerOpen
      }

      handleQRImageUpload={
          handleQRImageUpload
      }

      setShowVerificationResult={
          setShowVerificationResult
      }

    />

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

    <InvalidQRModal

      invalidQRMessage={
          invalidQRMessage
      }

      setInvalidQRMessage={
          setInvalidQRMessage
      }

    />

    <VerificationResultModal

      showVerificationResult={
          showVerificationResult
      }

      setShowVerificationResult={
          setShowVerificationResult
      }

      verificationResult={
          verificationResult
      }

    />

    <TransferModal

      showTransferModal={
          showTransferModal
      }

      setShowTransferModal={
          setShowTransferModal
      }

      selectedTransferDrug={
          selectedTransferDrug
      }

      transferForm={
          transferForm
      }

      handleTransferInput={
          handleTransferInput
      }

      setShowTransferConfirm={
          setShowTransferConfirm
      }

    />

   <TransferConfirmModal

      showTransferConfirm={
         showTransferConfirm
      }

      setShowTransferConfirm={
         setShowTransferConfirm
      }

      selectedTransferDrug={
         selectedTransferDrug
      }

      handleConfirmTransfer={
         handleConfirmTransfer
      }

   />

    <BlockchainProcessingModal

         blockchainProcessing={
            blockchainProcessing
         }

      />

    <TransferSuccessModal

      transferSuccessData={
          transferSuccessData
      }

      setTransferSuccessData={
          setTransferSuccessData
      }

      downloadTransferReceipt={
          downloadTransferReceipt
      }

    />
   </Layout>
  );
}