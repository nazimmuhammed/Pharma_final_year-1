import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MetricCard = ({
   title = "AI Risk Score",
   value = 23,
   max = 100,
   status = "Low Risk",
   color = "#22c55e",
}) => {

   const percentage = (value / max) * 100;

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
            items-center
            justify-center
         "

      >

         <h3
            className="
               text-white
               text-lg
               font-semibold
               mb-6
            "
         >
            {title}
         </h3>

         <div className="w-36 h-36">

            <CircularProgressbar

               value={percentage}

               text={`${value}`}

               styles={buildStyles({

                  pathColor: color,

                  textColor: "#ffffff",

                  trailColor: "#1e293b",

                  textSize: "22px",

               })}

            />

         </div>

         <p
            className="
               mt-5
               text-base
               font-semibold
            "
            style={{
               color,
            }}
         >
            {status}
         </p>

      </motion.div>

   );

};

export default MetricCard;