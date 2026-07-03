import { motion } from "framer-motion";

export default function DrugDetailsModal({

   showDetailsModal,

   selectedDrug,

   setShowDetailsModal,

}) {

   if(
      !showDetailsModal ||
      !selectedDrug
   ) return null;

   return (

      <div className="
         fixed inset-0 z-50
         flex items-center justify-center
         bg-black/70 backdrop-blur-sm
         px-4
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
               w-full max-w-3xl
               rounded-3xl
               border border-cyan-500/20
               bg-[#07111f]
               p-6
            "
         >

            {/* close */}
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

            <h2 className="
               text-3xl font-bold
               text-white mb-8
            ">
               Drug Details
            </h2>

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
                  value={
                     selectedDrug.serializedId
                  }
               />

               <InfoCard
                  label="Batch Number"
                  value={
                     selectedDrug.batchNumber
                  }
               />

               <InfoCard
                  label="Quantity"
                  value={
                     `${selectedDrug.quantity} Units`
                  }
               />

               <InfoCard
                  label="Current Stage"
                  value={
                     selectedDrug.currentStage
                  }
               />

               <InfoCard
                  label="Blockchain Status"
                  value={
                     selectedDrug
                     .isBlockchainVerified
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
            <div className="mt-6">

               <p className="
                  text-sm text-cyan-400 mb-2
               ">
                  Description
               </p>

               <div className="
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  p-4 text-gray-300
               ">

                  {selectedDrug.description}

               </div>

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
            text-xs text-cyan-400 mb-2
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



