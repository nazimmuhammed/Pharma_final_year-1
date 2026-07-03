import { motion } from "framer-motion";

import { BiTransfer } from "react-icons/bi";

export default function TransferConfirmModal({

   showTransferConfirm,

   setShowTransferConfirm,

   selectedTransferDrug,

   handleConfirmTransfer,

}) {

   if(
      !showTransferConfirm ||
      !selectedTransferDrug
   ) return null;

   return (

      <div className="
         fixed inset-0 z-[90]
         flex items-center justify-center
         bg-black/80 backdrop-blur-sm
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
               w-full max-w-md
               rounded-3xl
               border border-purple-500/20
               bg-[#07111f]
               p-7
               shadow-[0_0_60px_rgba(168,85,247,0.2)]
            "
         >

            <div className="
               flex flex-col items-center
               text-center
            ">

               {/* icon */}
               <div className="
                  w-24 h-24
                  rounded-full
                  bg-purple-500/10
                  border border-purple-500/20
                  flex items-center justify-center
                  mb-6
               ">

                  <BiTransfer
                     size={48}
                     className="text-purple-400"
                  />

               </div>

               {/* title */}
               <h2 className="
                  text-3xl font-bold
                  text-white
               ">
                  Confirm Transfer
               </h2>

               <p className="
                  text-gray-400 mt-4
                  leading-relaxed
               ">
                  You are about to transfer
                  ownership of this drug
                  on the blockchain network.
               </p>

               {/* selected drug */}
               <div className="
                  mt-6
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  p-4
                  w-full text-left
               ">

                  <p className="
                     text-sm text-purple-300
                  ">
                     Drug
                  </p>

                  <p className="
                     text-white font-semibold mt-1
                  ">
                     {selectedTransferDrug.name}
                  </p>

                  <p className="
                     text-gray-400 text-sm mt-1
                  ">
                     {
                     selectedTransferDrug.drugId
                     }
                  </p>

               </div>

               {/* buttons */}
               <div className="
                  flex gap-4 mt-8 w-full
               ">

                  <button

                     onClick={() =>
                        setShowTransferConfirm(false)
                     }

                     className="
                        flex-1
                        py-3 rounded-xl
                        border border-white/10
                        text-gray-300
                        hover:bg-white/5
                        transition-all
                     "
                  >
                     Cancel
                  </button>

                  <button

                     onClick={
                        handleConfirmTransfer
                     }

                     className="
                        flex-1
                        py-3 rounded-xl
                        bg-purple-500/20
                        border border-purple-500/20
                        text-purple-300
                        font-semibold
                        hover:bg-purple-500/30
                        transition-all
                     "
                  >
                     Yes, Transfer
                  </button>

               </div>

            </div>

         </motion.div>

      </div>
   );
}