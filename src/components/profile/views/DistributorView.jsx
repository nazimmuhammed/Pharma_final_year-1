import {
   MdCheckCircle,
   MdLocalShipping,
   MdVerifiedUser,
   MdInfo,
} from "react-icons/md";

import {
   BiTransfer,
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

import TH from "../ui/TH";

import TR from "../ui/TR";

import TD from "../ui/TD";

import DrugIcon from
"../ui/DrugIcon";


// ─── Distributor ──────────────────────────────────────────
const DistributorView = ({
   drugs,
   handleViewDetails,
   handleVerifyDrug,
   handleTransferDrug
}) => (

<div className="flex flex-col gap-6">

   <TableCard
      title="Shipment Tracking"
      action="View All"
   >

      <table className="w-full hidden md:table">

         <thead>

            <tr className="border-b border-white/6">

               <TH>Shipment ID</TH>

               <TH>Drug</TH>

               <TH>Manufacturer</TH>

               <TH>Quantity</TH>

               <TH>Status</TH>

               <TH>Expiry</TH>

               <TH>Actions</TH>

            </tr>

         </thead>

         <tbody>

            {drugs.map((d) => (

               <TR key={d._id}>

                  <TD>

                     <span className="
                        font-mono text-xs text-cyan-400
                     ">
                        {d.drugId}
                     </span>

                  </TD>

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

                     <span className="text-xs">

                        {`${d.quantity} Units`}

                     </span>

                  </TD>

                  <TD>

                     <StatusBadge
                        label={d.currentStage}
                     />

                  </TD>

                  <TD>

                     <span className="
                        text-xs text-gray-400
                     ">

                        {
                        new Date(
                           d.expiryDate
                        ).toLocaleDateString()
                        }

                     </span>

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
                           icon={BiTransfer}
                           label="Transfer"
                           color="purple"
                           onClick={() =>
                              handleTransferDrug(d)
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
                        {d.drugId}
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
                     icon={BiTransfer}
                     label="Transfer"
                     color="purple"
                     onClick={() =>
                        handleTransferDrug(d)
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
            icon={MdCheckCircle}
            label="Accept Transfer"
            sub="Receive drug shipment"
            color="green"
            delay={0.1}
         />

         <QuickCard
            icon={MdLocalShipping}
            label="Update Shipment"
            sub="Track delivery status"
            color="cyan"
            delay={0.15}
         />

         <QuickCard
            icon={BiTransfer}
            label="Transfer Next"
            sub="Forward to retailer"
            color="purple"
            delay={0.2}
         />

         <QuickCard
            icon={FaCube}
            label="Blockchain History"
            sub="View on-chain records"
            color="blue"
            delay={0.25}
         />

      </div>

   </div>

</div>
);

export default DistributorView;