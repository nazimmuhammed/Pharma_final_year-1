import { motion } from "framer-motion";

import {
   MdQrCodeScanner,
   MdCloudUpload,
} from "react-icons/md";

export default function VerifyDrugModal({

   showVerifyModal,

   selectedVerifyDrug,

   setShowVerifyModal,

   scannerOpen,

   setScannerOpen,

   handleQRImageUpload,

   setShowVerificationResult,

}) {

   if(
      !showVerifyModal ||
      !selectedVerifyDrug
   ) return null;

   return (

      <div className="
         fixed inset-0 z-50
         flex items-center justify-center
         bg-black/70 backdrop-blur-sm
         px-4
      ">

         <div className="
            relative
            w-full max-w-lg
            rounded-3xl
            border border-cyan-500/20
            bg-[#07111f]
            p-6
            shadow-[0_0_60px_rgba(0,229,255,0.15)]
         ">

            {/* close */}
            <button

               onClick={() => {

                  setShowVerifyModal(false);

                  setScannerOpen(false);

                  setShowVerificationResult(false);
               }}

               className="
                  absolute top-4 right-4
                  text-gray-400 hover:text-white
                  text-xl
               "
            >
               ✕
            </button>

            {/* title */}
            <h2 className="
               text-2xl font-bold
               text-white text-center mb-2
            ">
               Verify Drug
            </h2>

            <p className="
               text-center text-gray-400
               text-sm mb-8
            ">
               Scan or upload QR code
               to verify blockchain authenticity
            </p>

            {/* options */}
            <div className="
               grid sm:grid-cols-2 gap-5
            ">

               {/* scan */}
               <motion.button

                  onClick={() =>
                     setScannerOpen(true)
                  }

                  whileHover={{
                     scale: 1.03
                  }}

                  whileTap={{
                     scale: 0.97
                  }}

                  className="
                     rounded-2xl
                     border border-cyan-500/20
                     bg-cyan-500/10
                     p-6
                     flex flex-col items-center
                     justify-center gap-3
                     hover:bg-cyan-500/20
                     transition-all
                  "
               >

                  <MdQrCodeScanner
                     size={42}
                     className="text-cyan-400"
                  />

                  <div>

                     <p className="
                        text-white font-semibold
                     ">
                        Scan QR Code
                     </p>

                     <p className="
                        text-xs text-gray-400 mt-1
                     ">
                        Use camera scanner
                     </p>

                  </div>

               </motion.button>

               {/* upload */}
               <motion.label

                  whileHover={{
                     scale: 1.03
                  }}

                  whileTap={{
                     scale: 0.97
                  }}

                  className="
                     cursor-pointer
                     rounded-2xl
                     border border-purple-500/20
                     bg-purple-500/10
                     p-6
                     flex flex-col items-center
                     justify-center gap-3
                     hover:bg-purple-500/20
                     transition-all
                  "
               >

                  <input
                     type="file"
                     accept="image/*"
                     className="hidden"
                     onChange={
                        handleQRImageUpload
                     }
                  />

                  <MdCloudUpload
                     size={42}
                     className="text-purple-400"
                  />

                  <div>

                     <p className="
                        text-white font-semibold
                     ">
                        Upload QR Image
                     </p>

                     <p className="
                        text-xs text-gray-400 mt-1
                     ">
                        JPG, PNG, WEBP
                     </p>

                  </div>

               </motion.label>

            </div>

            {/* scanner */}
            {
            scannerOpen && (

            <div className="
               mt-6
               rounded-2xl
               overflow-hidden
               border border-cyan-500/20
               bg-black
               p-3
            ">

               <div id="reader" />

            </div>

            )
            }

            {/* selected drug */}
            <div className="
               mt-8 rounded-2xl
               border border-white/10
               bg-white/5
               p-4
            ">

               <p className="
                  text-xs text-cyan-400 mb-2
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
                        {selectedVerifyDrug.name}
                     </p>

                     <p className="
                        text-xs text-gray-400 mt-1
                     ">
                        {
                        selectedVerifyDrug.drugId
                        }
                     </p>

                  </div>

                  <div className="
                     px-3 py-1 rounded-full
                     bg-green-500/10
                     border border-green-500/20
                     text-green-400 text-xs
                  ">
                     Blockchain Registered
                  </div>

               </div>

            </div>

         </div>

      </div>
   );
}