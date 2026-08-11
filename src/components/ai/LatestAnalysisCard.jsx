import { motion } from "framer-motion";

import {
   MdCalendarToday,
   MdAccessTime,
   MdBolt,
   MdArrowForward,
   MdMemory,
} from "react-icons/md";

const LatestAnalysisCard = ({

   analyzedAt = new Date(),

   processingTime = 182,

   modelVersion = "1.0.0",

}) => {

   const date =
      new Date(analyzedAt);

   return (

      <motion.div

         whileHover={{ scale: 1.02 }}

         className="
            bg-[#0B1220]
            border border-cyan-500/20
            rounded-2xl
            p-6
            shadow-lg
            flex
            flex-col
            justify-between
         "

      >

         {/* Heading */}

         <div>

            <h3
               className="
                  text-lg
                  font-semibold
                  text-white
               "
            >
               Latest Analysis
            </h3>

            <p
               className="
                  text-gray-400
                  text-sm
                  mt-1
               "
            >
               Latest AI execution details
            </p>

         </div>

         {/* Information */}

         <div className="space-y-4 mt-6">

            <div className="flex items-center justify-between">

               <div className="flex items-center gap-2">

                  <MdCalendarToday
                     className="text-cyan-400"
                  />

                  <span className="text-gray-400 text-sm">
                     Date
                  </span>

               </div>

               <span className="text-white text-sm">

                  {date.toLocaleDateString()}

               </span>

            </div>

            <div className="flex items-center justify-between">

               <div className="flex items-center gap-2">

                  <MdAccessTime
                     className="text-cyan-400"
                  />

                  <span className="text-gray-400 text-sm">
                     Time
                  </span>

               </div>

               <span className="text-white text-sm">

                  {date.toLocaleTimeString()}

               </span>

            </div>

            <div className="flex items-center justify-between">

               <div className="flex items-center gap-2">

                  <MdBolt
                     className="text-yellow-400"
                  />

                  <span className="text-gray-400 text-sm">
                     Processing
                  </span>

               </div>

               <span className="text-white text-sm">

                  {processingTime} ms

               </span>

            </div>

            <div className="flex items-center justify-between">

               <div className="flex items-center gap-2">

                  <MdMemory
                     className="text-purple-400"
                  />

                  <span className="text-gray-400 text-sm">
                     Model
                  </span>

               </div>

               <span className="text-white text-sm">

                  v{modelVersion}

               </span>

            </div>

         </div>

         {/* Button */}

         <button

            className="
               mt-8
               w-full
               h-11

               rounded-xl

               bg-cyan-500/10

               border border-cyan-500/20

               text-cyan-400

               flex

               items-center

               justify-center

               gap-2

               hover:bg-cyan-500/20

               transition-all
            "

         >

            View Full Report

            <MdArrowForward />

         </button>

      </motion.div>

   );

};

export default LatestAnalysisCard;