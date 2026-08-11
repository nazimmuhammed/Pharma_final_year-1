import { motion } from "framer-motion";
import { RiShieldCheckFill } from "react-icons/ri";
import { MdOutlineVerified } from "react-icons/md";

const PredictionCard = ({
   prediction = "SAFE",
   description = "No suspicious activity detected.",
   confidence = 97,
}) => {

   const getColor = () => {

      switch (prediction.toLowerCase()) {

         case "safe":
            return {
               bg: "bg-green-500/10",
               border: "border-green-500/20",
               text: "text-green-400",
               glow: "shadow-green-500/20",
            };

         case "suspicious":
            return {
               bg: "bg-amber-500/10",
               border: "border-amber-500/20",
               text: "text-amber-400",
               glow: "shadow-amber-500/20",
            };

         case "counterfeit":
            return {
               bg: "bg-red-500/10",
               border: "border-red-500/20",
               text: "text-red-400",
               glow: "shadow-red-500/20",
            };

         default:
            return {
               bg: "bg-cyan-500/10",
               border: "border-cyan-500/20",
               text: "text-cyan-400",
               glow: "shadow-cyan-500/20",
            };
      }

   };

   const colors = getColor();

   return (

      <motion.div

         whileHover={{ scale: 1.02 }}

         className={`
            rounded-2xl
            border
            ${colors.border}
            ${colors.bg}
            p-6
            shadow-xl
            ${colors.glow}
            flex
            flex-col
            items-center
            justify-center
         `}
      >

         <h3
            className="
               text-lg
               font-semibold
               text-white
               mb-5
            "
         >
            AI Prediction
         </h3>

         <motion.div

            animate={{
               scale: [1, 1.08, 1],
            }}

            transition={{
               repeat: Infinity,
               duration: 2,
            }}

            className={`
               w-20
               h-20
               rounded-full

               ${colors.bg}

               flex
               items-center
               justify-center
               mb-5
            `}
         >

            <RiShieldCheckFill

               size={50}

               className={colors.text}

            />

         </motion.div>

         <div
            className={`
               px-5
               py-2
               rounded-full

               ${colors.bg}

               ${colors.text}

               font-bold
               tracking-wide
               text-sm
            `}
         >

            {prediction}

         </div>

         <p
            className="
               text-gray-400
               text-sm
               text-center
               mt-4
            "
         >
            {description}
         </p>

         <div
            className="
               mt-5
               flex
               items-center
               gap-2
               text-xs
               text-gray-400
            "
         >

            <MdOutlineVerified
               className={colors.text}
               size={18}
            />

            AI Confidence

            <span
               className={`
                  font-semibold
                  ${colors.text}
               `}
            >
               {confidence}%
            </span>

         </div>

      </motion.div>

   );

};

export default PredictionCard;