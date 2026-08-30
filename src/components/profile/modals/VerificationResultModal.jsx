import { motion } from "framer-motion";

import {
   MdVerifiedUser,
   MdDangerous,
   MdWarning,
   MdCheckCircle,
} from "react-icons/md";

import isDrugExpired from
"../../../utils/isDrugExpired";

export default function VerificationResultModal({

   showVerificationResult,

   setShowVerificationResult,

   verificationResult,

}) {

   if(
      !showVerificationResult ||
      !verificationResult
   ) return null;

   const drug =
      verificationResult.drug;

   return (

      <div className="
         fixed inset-0 z-[80]
         flex items-center justify-center
         bg-black/80 backdrop-blur-md
         px-4 py-6 overflow-y-auto
      ">

         <motion.div

            initial={{
               opacity: 0,
               scale: 0.9
            }}

            animate={{
               opacity: 1,
               scale: 1
            }}

            className="
               relative
               w-full max-w-5xl
               rounded-3xl
               border border-green-500/20
               bg-[#07111f]
               p-6 md:p-8
            "
         >

            {/* close */}
            <button

               onClick={() =>
                  setShowVerificationResult(false)
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
            <div className="
               flex items-center gap-4 mb-8
            ">

               <div className="
                  w-16 h-16 rounded-2xl
                  bg-green-500/10
                  border border-green-500/20
                  flex items-center justify-center
               ">

                  <MdVerifiedUser
                     size={36}
                     className="text-green-400"
                  />

               </div>

               <div>

                  <h2 className="
                     text-3xl font-black
                     text-white
                  ">
                     Drug Verified
                  </h2>

                  <p className="
                     text-gray-400 mt-1
                  ">
                     Blockchain authenticity validated
                  </p>

               </div>

            </div>

            {/* expired warning */}
            {
            isDrugExpired(
               drug.expiryDate
            ) && (

            <div className="
               mb-6
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
                     This pharmaceutical
                     product has expired.
                  </p>

               </div>

            </div>

            )
            }

            {/* grid */}
            <div className="
               grid md:grid-cols-2 gap-5
            ">

               <InfoCard
                  label="Drug Name"
                  value={drug.name}
               />

               <InfoCard
                  label="Drug ID"
                  value={drug.drugId}
               />

               <InfoCard
                  label="Batch Number"
                  value={drug.batchNumber}
               />

               <InfoCard
                  label="Current Stage"
                  value={drug.currentStage}
               />

               <InfoCard
                  label="Manufacturer"
                  value={
                     drug.manufacturer?.name
                  }
               />

               <InfoCard
                  label="Expiry Date"
                  value={
                     new Date(
                        drug.expiryDate
                     ).toLocaleDateString()
                  }
               />

               <InfoCard
                  label="Blockchain Status"
                  value={
                     verificationResult
                     .isBlockchainVerified
                     ? "Verified"
                     : "Pending"
                  }
               />

               <InfoCard
                  label="Risk Score"
                  value={
                     drug.latestRiskScore
                  }
               />

            </div>

            {/* anomaly */}
            {
            drug.hasAnomaly && (

            <div className="
               mt-6
               rounded-2xl
               border border-amber-500/20
               bg-amber-500/10
               p-5
               flex items-center gap-4
            ">

               <MdWarning
                  size={36}
                  className="text-amber-400"
               />

               <div>

                  <h3 className="
                     text-amber-300
                     text-lg font-bold
                  ">
                     AI Risk Alert
                  </h3>

                  <p className="
                     text-gray-300 mt-1
                  ">
                     AI system detected
                     suspicious activity
                     for this drug.
                  </p>

               </div>

            </div>

            )
            }

            {/* footer */}
            <div className="
               mt-8 flex justify-end
            ">

               <button

                  onClick={() =>
                     setShowVerificationResult(false)
                  }

                  className="
                     px-6 py-3
                     rounded-xl
                     bg-green-500/20
                     border border-green-500/20
                     text-green-300
                     hover:bg-green-500/30
                     transition-all
                  "
               >
                  Close
               </button>

            </div>

         </motion.div>

      </div>
   );
}

function InfoCard({
   label,
   value
}) {

   return (

      <div className="
         rounded-2xl
         border border-white/10
         bg-white/5
         p-4
      ">

         <p className="
            text-xs text-green-400 mb-2
         ">
            {label}
         </p>

         <p className="
            text-white break-all
         ">
            {value}
         </p>

      </div>
   );
}