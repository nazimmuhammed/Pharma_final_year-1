const BlockchainBadge = ({
   status
}) => {

   const verified =
      status === "Verified";

   return (

      <div className={`
         inline-flex items-center gap-1.5
         rounded-full
         px-2.5 py-1
         border text-[11px]
         font-semibold

         ${
            verified

            ? "bg-green-500/10 text-green-400 border-green-500/20"

            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
         }
      `}>

         <span className={`
            w-2 h-2 rounded-full

            ${
               verified
               ? "bg-green-400"
               : "bg-amber-400"
            }
         `} />

         {status}

      </div>
   );
};

export default BlockchainBadge;