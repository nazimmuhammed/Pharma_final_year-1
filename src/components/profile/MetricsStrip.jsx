import { motion } from "framer-motion";

const cardColors = {

   purple: {
      border: "border-purple-500/20",
      glow: "shadow-[0_0_40px_rgba(168,85,247,0.15)]",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      text: "text-purple-400",
   },

   cyan: {
      border: "border-cyan-500/20",
      glow: "shadow-[0_0_40px_rgba(0,229,255,0.15)]",
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      text: "text-cyan-400",
   },

   green: {
      border: "border-green-500/20",
      glow: "shadow-[0_0_40px_rgba(34,197,94,0.15)]",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
      text: "text-green-400",
   },

   amber: {
      border: "border-amber-500/20",
      glow: "shadow-[0_0_40px_rgba(245,158,11,0.15)]",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
      text: "text-amber-400",
   },

   blue: {
      border: "border-indigo-500/20",
      glow: "shadow-[0_0_40px_rgba(99,102,241,0.15)]",
      iconBg: "bg-indigo-500/10",
      iconColor: "text-indigo-400",
      text: "text-indigo-400",
   },
};

export default function MetricsStrip({
   metrics = [],
}) {

   return (

      <div className="
         grid
         grid-cols-1
         sm:grid-cols-2
         xl:grid-cols-5
         gap-5
      ">

         {
         metrics.map((metric, index) => {

            const colors =
               cardColors[
                  metric.color
               ] || cardColors.cyan;

            const Icon =
               metric.icon;

            return (

               <motion.div

                  key={index}

                  initial={{
                     opacity: 0,
                     y: 20
                  }}

                  animate={{
                     opacity: 1,
                     y: 0
                  }}

                  transition={{
                     delay: index * 0.1
                  }}

                  whileHover={{
                     y: -4,
                     scale: 1.01
                  }}

                  className={`
                     relative overflow-hidden
                     rounded-3xl
                     border
                     ${colors.border}
                     ${colors.glow}
                     bg-[#07111f]
                     p-6
                  `}
               >

                  {/* top glow */}
                  <div className="
                     absolute top-0 right-0
                     w-32 h-32
                     bg-white/5
                     blur-3xl
                     rounded-full
                  " />

                  {/* icon */}
                  <div className={`
                     w-14 h-14
                     rounded-2xl
                     flex items-center justify-center
                     ${colors.iconBg}
                  `}>

                     <Icon
                        size={28}
                        className={
                           colors.iconColor
                        }
                     />

                  </div>

                  {/* title */}
                  <p className={`
                     mt-6 text-sm
                     font-bold tracking-wide
                     ${colors.text}
                  `}>

                     {metric.title}

                  </p>

                  {/* value */}
                  <h2 className="
                     mt-2
                     text-5xl font-black
                     text-white
                  ">

                     {metric.value}

                  </h2>

                  {/* subtitle */}
                  <p className="
                     mt-2 text-sm
                     text-gray-500
                  ">

                     {metric.subtitle}

                  </p>

               </motion.div>
            );
         })
         }

      </div>
   );
}