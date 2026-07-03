import { motion } from "framer-motion";

import {
   MdCheckCircle,
} from "react-icons/md";

export default function TransferSuccessModal({

   transferSuccessData,

   setTransferSuccessData,

   downloadTransferReceipt,

}) {

   if(!transferSuccessData)
      return null;

   return (

      <div className="
         fixed inset-0 z-[95]
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
               w-full max-w-lg
               rounded-3xl
               border border-green-500/20
               bg-[#07111f]
               p-8
               shadow-[0_0_70px_rgba(34,197,94,0.18)]
            "
         >

            <div className="
               flex flex-col items-center
               text-center
            ">

               {/* icon */}
               <div className="
                  w-28 h-28
                  rounded-full
                  bg-green-500/10
                  border border-green-500/20
                  flex items-center justify-center
                  mb-6
               ">

                  <MdCheckCircle
                     size={60}
                     className="text-green-400"
                  />

               </div>

               {/* title */}
               <h2 className="
                  text-3xl font-bold
                  text-white
               ">
                  Transfer Successful
               </h2>

               <p className="
                  mt-4 text-gray-400
                  leading-relaxed
               ">
                  Drug ownership has been
                  securely transferred and
                  recorded on blockchain.
               </p>

               {/* tx hash */}
               <div className="
                  mt-6
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  p-4 text-left
               ">

                  <p className="
                     text-sm text-green-300
                  ">
                     Blockchain Transaction
                  </p>

                  <p className="
                     mt-2
                     text-xs text-gray-300
                     break-all
                     font-mono
                  ">

                     {
                     transferSuccessData
                     ?.data
                     ?.drug
                     ?.blockchainTxHash ||
                     "N/A"
                     }

                  </p>

               </div>

               {/* buttons */}
               <div className="
                  flex gap-4 mt-8 w-full
               ">

                  <button

                     onClick={() =>
                        setTransferSuccessData(null)
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
                     Close
                  </button>

                  <button

                     onClick={
                        downloadTransferReceipt
                     }

                     className="
                        flex-1
                        py-3 rounded-xl
                        bg-green-500/20
                        border border-green-500/20
                        text-green-300
                        font-semibold
                        hover:bg-green-500/30
                        transition-all
                     "
                  >
                     Download Receipt
                  </button>

               </div>

            </div>

         </motion.div>

      </div>
   );
}