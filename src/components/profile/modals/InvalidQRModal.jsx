import { motion } from "framer-motion";

import {
   MdWarning,
} from "react-icons/md";

export default function InvalidQRModal({

   invalidQRMessage,

   setInvalidQRMessage,

}) {

   if(!invalidQRMessage)
      return null;

   return (

      <div className="
         fixed inset-0 z-[85]
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
               border border-red-500/20
               bg-[#07111f]
               p-8
               text-center
            "
         >

            {/* icon */}
            <div className="
               w-24 h-24
               mx-auto
               rounded-full
               bg-red-500/10
               border border-red-500/20
               flex items-center justify-center
               mb-6
            ">

               <MdWarning
                  size={52}
                  className="text-red-400"
               />

            </div>

            {/* title */}
            <h2 className="
               text-3xl font-bold
               text-white
            ">
               Invalid QR Code
            </h2>

            {/* message */}
            <p className="
               mt-4
               text-gray-400
               leading-relaxed
            ">

               {invalidQRMessage}

            </p>

            {/* button */}
            <button

               onClick={() =>
                  setInvalidQRMessage("")
               }

               className="
                  mt-8
                  w-full
                  py-4
                  rounded-2xl
                  bg-red-500/20
                  border border-red-500/20
                  text-red-300
                  font-semibold
                  hover:bg-red-500/30
                  transition-all
               "
            >
               Close
            </button>

         </motion.div>

      </div>
   );
}