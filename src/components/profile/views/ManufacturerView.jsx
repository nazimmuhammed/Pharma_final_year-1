import { motion } from "framer-motion";

import {
   MdVerifiedUser,
   MdQrCode2,
   MdWarning,
   MdInfo,
   MdBarChart,
   MdCheckCircle,
   


} from "react-icons/md";

import {
   BiTransfer,
   BiNetworkChart,
} from "react-icons/bi";

import { RiMedicineBottleLine }
from "react-icons/ri";

import ActionBtn from
"../ui/ActionBtn";

import TableCard from
"../ui/TableCard";

import QuickCard from
"../ui/QuickCard";

import StatusBadge from
"../ui/StatusBadge";

import BlockchainBadge from
"../ui/BlockchainBadge";

import RiskPill from
"../ui/RiskPill";

import TH from "../ui/TH";
import TR from "../ui/TR";
import TD from "../ui/TD";
import DrugIcon from "../ui/DrugIcon";

const ACTIVITY = [
  { icon:<MdCheckCircle size={15}/>, color:"text-green-400", msg:"Drug registered: Amoxicillin 250mg (BATCH-2026-002)", time:"29 Jun 2026, 03:35 PM" },
  { icon:<BiTransfer size={15}/>, color:"text-cyan-400", msg:"Drug transferred to Distributor - MedDistributors Pvt Ltd", time:"29 Jun 2026, 01:20 PM" },
  { icon:<MdQrCode2 size={15}/>, color:"text-purple-400", msg:"QR Code generated for Paracetamol 500mg (BATCH-2026-001)", time:"29 Jun 2026, 11:05 AM" },
  { icon:<MdWarning size={15}/>, color:"text-amber-400", msg:"Risk analysis completed for Ciprofloxacin 500mg", time:"29 Jun 2026, 10:15 AM" },
];



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
              <StatusBadge label={d.currentStage} />
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

export default ManufacturerView;