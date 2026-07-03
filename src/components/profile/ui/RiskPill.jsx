const RiskPill = ({
   score,
   label
}) => {

   const color =
      score > 70

      ? "bg-red-500/10 text-red-400 border-red-500/20"

      : score > 30

      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"

      : "bg-green-500/10 text-green-400 border-green-500/20";

   return (

      <div className={`
         inline-flex items-center gap-2
         rounded-full
         border px-2.5 py-1
         text-[11px]
         font-semibold
         ${color}
      `}>

         <span>

            {label}

         </span>

         <span className="
            opacity-70
         ">
            {score}
         </span>

      </div>
   );
};

export default RiskPill;