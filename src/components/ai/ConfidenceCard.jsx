import { motion } from "framer-motion";
import { MdPsychology } from "react-icons/md";

const ConfidenceCard = ({
   confidence = 97,
   model = "Rule-Based AI",
}) => {

   const getColor = () => {

      if (confidence >= 90)
         return "from-green-500 to-emerald-400";

      if (confidence >= 70)
         return "from-yellow-500 to-orange-400";

      return "from-red-500 to-red-400";
   };

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

         <div className="flex items-center justify-between">

            <h3
               className="
                  text-lg
                  font-semibold
                  text-white
               "
            >
               AI Confidence
            </h3>

            <div
               className="
                  w-11
                  h-11
                  rounded-xl
                  bg-cyan-500/10
                  flex
                  items-center
                  justify-center
               "
            >
               <MdPsychology
                  size={24}
                  className="text-cyan-400"
               />
            </div>

         </div>

         {/* Percentage */}

         <div className="mt-8">

            <div className="flex justify-between mb-2">

               <span className="text-gray-400">
                  Confidence
               </span>

               <span
                  className="
                     text-white
                     font-bold
                     text-lg
                  "
               >
                  {confidence}%
               </span>

            </div>

            {/* Progress */}

            <div
               className="
                  w-full
                  h-3
                  rounded-full
                  bg-slate-700
                  overflow-hidden
               "
            >

               <motion.div

                  initial={{
                     width: 0,
                  }}

                  animate={{
                     width: `${confidence}%`,
                  }}

                  transition={{
                     duration: 1,
                  }}

                  className={`
                     h-full
                     rounded-full
                     bg-gradient-to-r
                     ${getColor()}
                  `}

               />

            </div>

         </div>

         {/* Footer */}

         <div className="mt-8">

            <p
               className="
                  text-sm
                  text-gray-400
               "
            >
               AI Engine
            </p>

            <p
               className="
                  text-white
                  font-semibold
               "
            >
               {model}
            </p>

         </div>

      </motion.div>

   );

};

export default ConfidenceCard;