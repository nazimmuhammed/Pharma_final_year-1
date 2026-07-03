
import {
   MdVerifiedUser,
   MdQrCode2,
   MdWarning,
   MdInfo,
} from "react-icons/md";

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

import TH from "../ui/TH";

import TR from "../ui/TR";

import TD from "../ui/TD";

import DrugIcon from
"../ui/DrugIcon";


// ─── Retailer ─────────────────────────────────────────────
const RetailerView = ({
   drugs,
   handleVerifyDrug,
   handleViewDetails
}) => (

<div className="flex flex-col gap-6">

   <TableCard
      title="Available Stock"
      action="View All"
   >

      <table className="w-full hidden md:table">

         <thead>

            <tr className="border-b border-white/6">

               <TH>Medicine</TH>

               <TH>Batch</TH>

               <TH>Stock</TH>

               <TH>Verified</TH>

               <TH>Status</TH>

               <TH>Actions</TH>

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
                        font-mono text-xs text-gray-400
                     ">
                        {d.batchNumber}
                     </span>

                  </TD>

                  <TD>

                     <span className="text-xs">

                        {`${d.quantity} Units`}

                     </span>

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

                     <StatusBadge
                        label={d.currentStage}
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

                  <div>

                     <p className="
                        text-sm font-semibold text-white
                     ">
                        {d.name}
                     </p>

                     <p className="
                        text-[11px] text-gray-600
                     ">
                        {d.batchNumber}
                     </p>

                  </div>

                  <StatusBadge
                     label={d.currentStage}
                  />

               </div>

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
            sub="Authenticate medicine"
            color="cyan"
            delay={0.1}
         />

         <QuickCard
            icon={MdQrCode2}
            label="Scan QR"
            sub="Camera QR scan"
            color="purple"
            delay={0.15}
         />

         <QuickCard
            icon={FaCube}
            label="Supply Chain"
            sub="View full journey"
            color="green"
            delay={0.2}
         />

         <QuickCard
            icon={MdWarning}
            label="Report Suspicious"
            sub="Flag counterfeit product"
            color="amber"
            delay={0.25}
         />

      </div>

   </div>

</div>
);

export default RetailerView;