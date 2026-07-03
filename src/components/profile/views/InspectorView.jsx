import {
   MdVerifiedUser,
   MdDescription,
} from "react-icons/md";

import {
   BiNetworkChart,
} from "react-icons/bi";

import {
   FaCube,
} from "react-icons/fa";

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

import DrugIcon from
"../ui/DrugIcon";

// ─── Inspector ────────────────────────────────────────────
// ─── Inspector ────────────────────────────────────────────
const InspectorView = ({
   drugs,
   handleVerifyDrug,
   handleViewDetails
}) => (

<div className="flex flex-col gap-6">

   <TableCard
      title="Drug Verification Queue"
      action="View All"
   >

      <table className="w-full hidden md:table">

         <thead>

            <tr className="border-b border-white/6">

               <TH>Drug</TH>

               <TH>Manufacturer</TH>

               <TH>Risk Score</TH>

               <TH>Anomaly Status</TH>

               <TH>Blockchain Verified</TH>

               <TH>Action</TH>

            </tr>

         </thead>

         <tbody>

            {drugs.map((d) => (

               <TR key={d._id}>

                  <TD>

                     <div className="
                        flex items-center gap-2.5
                     ">

                        <DrugIcon />

                        <p className="
                           text-sm font-semibold text-white
                        ">
                           {d.name}
                        </p>

                     </div>

                  </TD>

                  <TD>

                     <span className="
                        text-xs text-gray-400
                     ">

                        {
                        d.manufacturer?.name ||
                        "Unknown"
                        }

                     </span>

                  </TD>

                  <TD>

                     <RiskPill
                        score={
                           d.latestRiskScore || 0
                        }
                        label={
                           d.latestRiskScore > 70
                           ? "High"
                           : d.latestRiskScore > 30
                           ? "Medium"
                           : "Low"
                        }
                     />

                  </TD>

                  <TD>

                     <StatusBadge
                        label={
                           d.hasAnomaly
                           ? "Anomaly"
                           : "Normal"
                        }
                     />

                  </TD>

                  <TD>

                     <BlockchainBadge
                        status={
                           d.isBlockchainVerified
                           ? "Verified"
                           : "Pending"
                        }
                     />

                  </TD>

                  <TD>

                     <div className="
                        flex gap-1.5 flex-wrap
                     ">

                        <ActionBtn
                           icon={MdVerifiedUser}
                           label="Verify"
                           color="cyan"
                           onClick={() =>
                              handleVerifyDrug(d)
                           }
                        />

                        <ActionBtn
                           icon={MdInfo}
                           label="Details"
                           color="amber"
                           onClick={() =>
                              handleViewDetails(d)
                           }
                        />

                     </div>

                  </TD>

               </TR>

            ))}

         </tbody>

      </table>

      {/* mobile */}
      <div className="
         md:hidden divide-y divide-white/5
      ">

         {drugs.map((d) => (

            <div
               key={d._id}
               className="p-4 space-y-2"
            >

               <div className="
                  flex items-center gap-2.5 flex-wrap
               ">

                  <DrugIcon />

                  <p className="
                     text-sm font-semibold text-white
                  ">
                     {d.name}
                  </p>

                  <StatusBadge
                     label={
                        d.hasAnomaly
                        ? "Anomaly"
                        : "Normal"
                     }
                  />

                  <RiskPill
                     score={
                        d.latestRiskScore || 0
                     }
                     label={
                        d.latestRiskScore > 70
                        ? "High"
                        : d.latestRiskScore > 30
                        ? "Medium"
                        : "Low"
                     }
                  />

               </div>

               <div className="
                  flex gap-1.5
               ">

                  <ActionBtn
                     icon={MdVerifiedUser}
                     label="Verify"
                     color="cyan"
                     onClick={() =>
                        handleVerifyDrug(d)
                     }
                  />

                  <ActionBtn
                     icon={MdInfo}
                     label="Details"
                     color="amber"
                     onClick={() =>
                        handleViewDetails(d)
                     }
                  />

               </div>

            </div>

         ))}

      </div>

   </TableCard>

   {/* Quick Actions */}
   <div>

      <h2 className="
         text-base font-bold
         text-cyan-400 mb-4 px-1
      ">
         Quick Actions
      </h2>

      <div className="
         grid grid-cols-2 sm:grid-cols-4 gap-3
      ">

         <QuickCard
            icon={MdVerifiedUser}
            label="Verify Drug"
            sub="Run on-chain check"
            color="cyan"
            delay={0.1}
         />

         <QuickCard
            icon={BiNetworkChart}
            label="Analyze Risk"
            sub="AI anomaly detection"
            color="amber"
            delay={0.15}
         />

         <QuickCard
            icon={MdDescription}
            label="Inspection Report"
            sub="Generate PDF report"
            color="purple"
            delay={0.2}
         />

         <QuickCard
            icon={FaCube}
            label="Blockchain Audit"
            sub="Full chain audit trail"
            color="green"
            delay={0.25}
         />

      </div>

   </div>

</div>
);

export default InspectorView;