import { motion } from "framer-motion";

import {
   MdEmail,
   MdLocationOn,
} from "react-icons/md";

import { BiTransfer } from "react-icons/bi";

export default function TransferModal({

   showTransferModal,

   setShowTransferModal,

   selectedTransferDrug,

   transferForm,

   handleTransferInput,

   setShowTransferConfirm,

}) {

   if(
      !showTransferModal ||
      !selectedTransferDrug
   ) return null;

   return (

      <div className="
         fixed inset-0 z-[70]
         flex items-center justify-center
         bg-black/80 backdrop-blur-md
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
               w-full max-w-xl
               rounded-3xl
               border border-purple-500/20
               bg-[#07111f]
               p-8
            "
         >

            {/* close */}
            <button

               onClick={() =>
                  setShowTransferModal(false)
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
                  w-16 h-16
                  rounded-2xl
                  bg-purple-500/10
                  border border-purple-500/20
                  flex items-center justify-center
               ">

                  <BiTransfer
                     size={34}
                     className="text-purple-400"
                  />

               </div>

               <div>

                  <h2 className="
                     text-3xl font-black
                     text-white
                  ">
                     Transfer Ownership
                  </h2>

                  <p className="
                     text-gray-400 mt-1
                  ">
                     Secure blockchain ownership transfer
                  </p>

               </div>

            </div>

            {/* selected drug */}
            <div className="
               rounded-2xl
               border border-white/10
               bg-white/5
               p-5
               mb-6
            ">

               <p className="
                  text-xs text-purple-400 mb-2
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
                        {selectedTransferDrug.name}
                     </p>

                     <p className="
                        text-xs text-gray-400 mt-1
                     ">
                        {
                        selectedTransferDrug.drugId
                        }
                     </p>

                  </div>

                  <div className="
                     px-3 py-1 rounded-full
                     bg-green-500/10
                     border border-green-500/20
                     text-green-400 text-xs
                  ">
                     Blockchain Verified
                  </div>

               </div>

            </div>

            {/* recipient */}
            <div className="space-y-5">

               {/* email */}
               <div>

                  <label className="
                     text-sm text-purple-300
                     mb-2 block
                  ">
                     Recipient Email
                  </label>

                  <div className="
                     flex items-center gap-3
                     rounded-2xl
                     border border-white/10
                     bg-white/5
                     px-4 py-4
                  ">

                     <MdEmail
                        size={22}
                        className="text-purple-400"
                     />

                     <input
                        type="email"
                        name="toUserEmail"
                        value={
                           transferForm.toUserEmail
                        }
                        onChange={
                           handleTransferInput
                        }
                        placeholder="Enter recipient email"
                        className="
                           bg-transparent
                           outline-none
                           text-white
                           w-full
                        "
                     />

                  </div>

               </div>

               {/* location */}
               <div>

                  <label className="
                     text-sm text-purple-300
                     mb-2 block
                  ">
                     Transfer Location
                  </label>

                  <div className="
                     flex items-center gap-3
                     rounded-2xl
                     border border-white/10
                     bg-white/5
                     px-4 py-4
                  ">

                     <MdLocationOn
                        size={22}
                        className="text-purple-400"
                     />

                     <p className="
                        text-gray-300 text-sm
                     ">
                        Blockchain geo-location tracking enabled
                     </p>

                  </div>

               </div>

            </div>

            {/* buttons */}
            <div className="
               flex gap-4 mt-8
            ">

               <button

                  onClick={() =>
                     setShowTransferModal(false)
                  }

                  className="
                     flex-1
                     py-4 rounded-2xl
                     border border-white/10
                     text-gray-300
                     hover:bg-white/5
                     transition-all
                  "
               >
                  Cancel
               </button>

               <button

                  onClick={() =>
                     setShowTransferConfirm(true)
                  }

                  className="
                     flex-1
                     py-4 rounded-2xl
                     bg-purple-500/20
                     border border-purple-500/20
                     text-purple-300
                     font-semibold
                     hover:bg-purple-500/30
                     transition-all
                  "
               >
                  Continue Transfer
               </button>

            </div>

         </motion.div>

      </div>
   );
}