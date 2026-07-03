import { motion } from "framer-motion";

import {
   MdVerifiedUser,
   MdOutlineInventory2,
} from "react-icons/md";

import { BiTransfer } from "react-icons/bi";

export default function BlockchainProcessingModal({

   blockchainProcessing,

}) {

   if(!blockchainProcessing)
      return null;

   return (

      <div className="
         fixed inset-0 z-[100]
         flex items-center justify-center
         bg-[#020817]/95
         backdrop-blur-md
         overflow-hidden
      ">

         {/* background glow */}
         <div className="
            absolute inset-0
            bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_45%)]
         " />

         {/* animated glow */}
         <motion.div

            animate={{
               scale: [1, 1.3, 1],
               opacity: [0.3, 0.6, 0.3]
            }}

            transition={{
               duration: 3,
               repeat: Infinity
            }}

            className="
               absolute
               w-[500px] h-[500px]
               rounded-full
               bg-purple-500/10
               blur-3xl
            "
         />

         <div className="
            relative z-10
            flex flex-col items-center
            text-center
            px-6
         ">

            {/* blockchain nodes */}
            <div className="
               relative
               flex items-center justify-center
               mb-10
            ">

               {/* source */}
               <motion.div

                  animate={{
                     y: [0, -12, 0]
                  }}

                  transition={{
                     duration: 2,
                     repeat: Infinity
                  }}

                  className="
                     w-24 h-24
                     rounded-3xl
                     border border-cyan-500/30
                     bg-cyan-500/10
                     flex items-center justify-center
                     shadow-[0_0_30px_rgba(0,229,255,0.3)]
                  "
               >

                  <MdVerifiedUser
                     size={44}
                     className="text-cyan-400"
                  />

               </motion.div>

               {/* transfer */}
               <motion.div

                  animate={{
                     x: [0, 25, 0]
                  }}

                  transition={{
                     duration: 1.5,
                     repeat: Infinity
                  }}

                  className="mx-8"
               >

                  <BiTransfer
                     size={42}
                     className="text-purple-400"
                  />

               </motion.div>

               {/* destination */}
               <motion.div

                  animate={{
                     y: [0, 12, 0]
                  }}

                  transition={{
                     duration: 2,
                     repeat: Infinity
                  }}

                  className="
                     w-24 h-24
                     rounded-3xl
                     border border-green-500/30
                     bg-green-500/10
                     flex items-center justify-center
                     shadow-[0_0_30px_rgba(34,197,94,0.3)]
                  "
               >

                  <MdOutlineInventory2
                     size={44}
                     className="text-green-400"
                  />

               </motion.div>

            </div>

            {/* title */}
            <h2 className="
               text-4xl font-black
               text-white
            ">
               Blockchain Processing
            </h2>

            <p className="
               mt-4
               text-lg text-gray-400
               max-w-xl
               leading-relaxed
            ">
               Smart contract ownership transfer
               is being securely processed
               on the blockchain network.
            </p>

            {/* stages */}
            <div className="
               mt-12
               grid gap-5
               w-full max-w-lg
            ">

               {
               [
                  "Validating ownership",
                  "Executing smart contract",
                  "Mining blockchain transaction",
                  "Updating pharmaceutical ledger",
                  "Generating immutable audit log"
               ].map((step, index) => (

                  <motion.div

                     key={index}

                     initial={{
                        opacity: 0,
                        x: -20
                     }}

                     animate={{
                        opacity: 1,
                        x: 0
                     }}

                     transition={{
                        delay: index * 0.4
                     }}

                     className="
                        flex items-center gap-4
                        rounded-2xl
                        border border-white/10
                        bg-white/5
                        px-5 py-4
                     "
                  >

                     <motion.div

                        animate={{
                           scale: [1, 1.3, 1]
                        }}

                        transition={{
                           duration: 1.5,
                           repeat: Infinity
                        }}

                        className="
                           w-3 h-3
                           rounded-full
                           bg-purple-400
                        "
                     />

                     <p className="
                        text-gray-200
                     ">
                        {step}
                     </p>

                  </motion.div>

               ))
               }

            </div>

            {/* rotating loader */}
            <motion.div

               animate={{
                  rotate: 360
               }}

               transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
               }}

               className="
                  mt-10
                  w-16 h-16
                  rounded-full
                  border-4
                  border-purple-500/20
                  border-t-purple-400
               "
            />

            {/* footer */}
            <p className="
               mt-8
               text-sm text-gray-500
            ">
               Secured by AI + Blockchain Infrastructure
            </p>

         </div>

      </div>
   );
}