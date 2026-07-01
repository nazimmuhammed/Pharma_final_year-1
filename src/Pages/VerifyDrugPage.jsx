
import React, {
   useEffect,
   useState
} from "react";

import { motion } from "framer-motion";

import {
   MdCloudUpload,
   MdQrCodeScanner,
   MdVerifiedUser,
   MdDangerous
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
   Html5Qrcode,
   Html5QrcodeScanner
}
from "html5-qrcode";
import { verifyDrug } from "../Redux/Slices/DrugSlice";



const InfoCard = ({
   label,
   value
}) => (

<div className="
   rounded-2xl
   border border-white/10
   bg-white/5
   p-4
">

   <p className="
      text-xs text-cyan-400 mb-1
   ">
      {label}
   </p>

   <p className="
      text-sm text-white
      break-all
   ">
      {value}
   </p>

</div>
);

export default function VerifyDrugPage(){
    const [showVerifyModal, setShowVerifyModal] =
    useState(true);

    const [scannerOpen, setScannerOpen] =
    useState(false);

    const [showVerificationResult,
    setShowVerificationResult] =
    useState(false);

    const [invalidQRMessage,
    setInvalidQRMessage] =
    useState("");

   

    const dispatch = useDispatch();

    const {

   verificationResult,

   verificationLoading

    } = useSelector(
    (state) => state.drug
    );

    const handleQRImageUpload =
    async (e) => {
    
       try {
    
          const file =
             e.target.files[0];
    
          if(!file) return;
    
          const html5QrCode =
             new Html5Qrcode("image-reader");
    
          // scan uploaded image
          const decodedText =
             await html5QrCode.scanFile(
                file,
                true
             );
    
          console.log(
             "Decoded QR:",
             decodedText
          );
    
          // parse QR JSON
          const parsedData =
             JSON.parse(decodedText);
    
          const drugId =
             parsedData.drugId;
    
          if(!drugId){
    
            setInvalidQRMessage(
              "Unable to verify uploaded QR image."
            );
             return;
          }
    
          // call backend verify
          dispatch(
             verifyDrug(drugId)
          );
    
       }
    
       catch(error){
    
          console.error(error);
    
          alert(
             "Failed to scan QR image"
          );
       }
    };

    const isDrugExpired = (date) => {

    return new Date(date) < new Date();
    };
    

    useEffect(() => {

    if(verificationResult){

        setShowVerificationResult(true);
    }

    }, [verificationResult]);

      useEffect(() => {
    
       if(!scannerOpen) return;
    
       const scanner =
          new Html5QrcodeScanner(
    
             "reader",
    
             {
                fps: 10,
                qrbox: 250,
             },
    
             false
          );
    
       scanner.render(
    
          async (decodedText) => {
    
            try {
    
                console.log(
                  "QR DATA:",
                  decodedText
                );
    
                // parse QR JSON
                const parsedData =
                  JSON.parse(decodedText);
    
                console.log(
                  "Parsed QR:",
                  parsedData
                );
    
                // extract drugId
                const drugId =
                  parsedData.drugId;
    
                if(!drugId){
    
                  setInvalidQRMessage(
                    "Invalid pharmaceutical QR code detected."
                  );
    
                  return;
                }
    
                // stop scanner
                await scanner.clear();
    
                setScannerOpen(false);
    
                // call backend verification
                dispatch(
                  verifyDrug(drugId)
                );
    
            }
    
            catch(error){
    
                console.error(error);
    
                setInvalidQRMessage(
                "Corrupted or unsupported QR format."
              );
            }
          },
    
          (error) => {
    
             // ignore scan errors
          }
       );
    
       return () => {
    
          scanner.clear().catch(() => {});
       };
    
    }, [scannerOpen]);
    



    return(

        <>
          {
            showVerifyModal && (

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

                    whileHover={{ scale: 1.03 }}

                    whileTap={{ scale: 0.97 }}

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
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
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
                        onChange={handleQRImageUpload}
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



                {/* scanner container */}
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



                {/* hidden image reader */}
                <div
                    id="image-reader"
                    className="hidden"
                />



               

            </div>

            </div>

            )
            }

           {
            verificationLoading && (

            <div className="
            fixed inset-0 z-[70]
            flex items-center justify-center
            bg-black/80 backdrop-blur-sm
            ">

            <div className="
                relative
                w-full max-w-md
                rounded-3xl
                border border-cyan-500/20
                bg-[#07111f]
                p-8
                shadow-[0_0_70px_rgba(0,229,255,0.18)]
                overflow-hidden
            ">

                {/* animated glow */}
                <div className="
                    absolute inset-0
                    bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.15),transparent_45%)]
                    animate-pulse
                " />

                <div className="
                    relative z-10
                    flex flex-col items-center
                ">

                    {/* rotating rings */}
                    <div className="
                        relative
                        w-28 h-28
                        flex items-center justify-center
                    ">

                        {/* outer ring */}
                        <motion.div
                        animate={{
                            rotate: 360
                        }}

                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "linear"
                        }}

                        className="
                            absolute
                            inset-0
                            rounded-full
                            border-2 border-cyan-400/20
                            border-t-cyan-400
                        "
                        />

                        {/* middle ring */}
                        <motion.div
                        animate={{
                            rotate: -360
                        }}

                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}

                        className="
                            absolute
                            inset-3
                            rounded-full
                            border-2 border-purple-400/20
                            border-t-purple-400
                        "
                        />

                        {/* inner pulse */}
                        <motion.div

                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.7, 1, 0.7]
                        }}

                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}

                        className="
                            w-12 h-12
                            rounded-full
                            bg-cyan-400/20
                            flex items-center justify-center
                        "
                        >

                        <MdVerifiedUser
                            size={28}
                            className="text-cyan-400"
                        />

                        </motion.div>

                    </div>

                    {/* title */}
                    <h2 className="
                        mt-8
                        text-2xl font-bold
                        text-white
                    ">
                        Verifying Drug
                    </h2>

                    {/* subtitle */}
                    <p className="
                        mt-3
                        text-center
                        text-gray-400
                        leading-relaxed
                    ">
                        Validating blockchain authenticity
                        and analyzing pharmaceutical records...
                    </p>

                    {/* blockchain steps */}
                    <div className="
                        mt-8
                        w-full
                        space-y-4
                    ">

                        {
                        [
                        "Scanning QR signature",
                        "Connecting to blockchain",
                        "Verifying smart contract",
                        "Analyzing drug integrity"
                        ].map((step, index) => (

                        <motion.div

                            key={index}

                            initial={{
                                opacity: 0.3
                            }}

                            animate={{
                                opacity: [0.3, 1, 0.3]
                            }}

                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: index * 0.4
                            }}

                            className="
                                flex items-center gap-3
                                rounded-xl
                                border border-cyan-500/10
                                bg-cyan-500/5
                                px-4 py-3
                            "
                        >

                            <div className="
                                w-2 h-2 rounded-full
                                bg-cyan-400
                            " />

                            <span className="
                                text-sm text-cyan-100
                            ">
                                {step}
                            </span>

                        </motion.div>

                        ))
                        }

                    </div>

                </div>

            </div>

            </div>

            )
            }

          
          {
              invalidQRMessage && (
          
              <div className="
              fixed inset-0 z-[80]
              flex items-center justify-center
              bg-black/80 backdrop-blur-sm
              px-4
              ">
          
                <div className="
                    relative
                    w-full max-w-md
                    rounded-3xl
                    border border-red-500/20
                    bg-[#120b0b]
                    p-7
                    shadow-[0_0_70px_rgba(239,68,68,0.18)]
                    overflow-hidden
                ">
          
                    {/* glow */}
                    <div className="
                      absolute inset-0
                      bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.15),transparent_45%)]
                    " />
          
                    {/* close */}
                    <button
                      onClick={() =>
                          setInvalidQRMessage("")
                      }
                      className="
                          absolute top-4 right-4
                          text-gray-400 hover:text-white
                          text-xl z-10
                      "
                    >
                      ✕
                    </button>
          
                    <div className="
                      relative z-10
                      flex flex-col items-center
                      text-center
                    ">
          
                      {/* icon */}
                      <div className="
                          w-24 h-24
                          rounded-full
                          bg-red-500/10
                          border border-red-500/20
                          flex items-center justify-center
                          mb-6
                      ">
          
                          <MdDangerous
                            size={50}
                            className="text-red-400"
                          />
          
                      </div>
          
                      {/* title */}
                      <h2 className="
                          text-3xl font-bold
                          text-red-400
                      ">
                          Verification Failed
                      </h2>
          
                      {/* message */}
                      <p className="
                          mt-4
                          text-gray-300
                          leading-relaxed
                      ">
                          {invalidQRMessage}
                      </p>
          
                      {/* warning box */}
                      <div className="
                          mt-6
                          rounded-2xl
                          border border-red-500/20
                          bg-red-500/5
                          p-4
                          text-sm text-red-200
                      ">
          
                          This QR code may be invalid,
                          tampered with, or not registered
                          in the pharmaceutical blockchain
                          verification system.
          
                      </div>
          
                      {/* button */}
                      <button
                          onClick={() =>
                            setInvalidQRMessage("")
                          }
                          className="
                            mt-7
                            rounded-xl
                            bg-red-500/20
                            border border-red-500/20
                            px-6 py-3
                            text-red-300
                            font-semibold
                            hover:bg-red-500/30
                            transition-all
                          "
                      >
                          Close Warning
                      </button>
          
                    </div>
          
                </div>
          
              </div>
          
              )
              }
          
              {
              showVerificationResult &&
              verificationResult && (
          
              <div className="
              fixed inset-0 z-[60]
              flex items-center justify-center
              bg-black/80 backdrop-blur-sm
              px-4
              ">
          
                <div className="
                    relative
                    w-full max-w-3xl
                    rounded-3xl
                    border border-cyan-500/20
                    bg-[#07111f]
                    p-6
                    shadow-[0_0_70px_rgba(0,229,255,0.18)]
                    overflow-hidden
                ">
          
                    {/* glow */}
                    <div className="
                      absolute inset-0
                      bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.12),transparent_40%)]
                      pointer-events-none
                    " />
          
                    {/* close */}
                    <button
                      onClick={() =>
                          setShowVerificationResult(false)
                      }
                      className="
                          absolute top-4 right-4
                          text-gray-400 hover:text-white
                          text-xl z-10
                      "
                    >
                      ✕
                    </button>
          
                    {/* status */}
                    <div className="
                      flex flex-col items-center
                      text-center
                      mb-8
                    ">
          
                      {
                      verificationResult.isAuthentic ? (
          
                      <>
          
                          <div className="
                            w-24 h-24 rounded-full
                            flex items-center justify-center
                            bg-green-500/10
                            border border-green-500/20
                            mb-4
                          ">
          
                            <MdVerifiedUser
                                size={50}
                                className="text-green-400"
                            />
          
                          </div>
          
                          <h2 className="
                            text-3xl font-bold
                            text-green-400
                          ">
                            Authentic Drug
                          </h2>
          
                          <p className="
                            text-gray-400 mt-2
                          ">
                            Blockchain verification successful
                          </p>
          
                      </>
          
                      ) : (
          
                      <>
          
                          <div className="
                            w-24 h-24 rounded-full
                            flex items-center justify-center
                            bg-red-500/10
                            border border-red-500/20
                            mb-4
                          ">
          
                            <MdDangerous
                                size={50}
                                className="text-red-400"
                            />
          
                          </div>
          
                          <h2 className="
                            text-3xl font-bold
                            text-red-400
                          ">
                            Fake / Invalid Drug
                          </h2>
          
                          <p className="
                            text-gray-400 mt-2
                          ">
                            Drug not found in blockchain
                          </p>
          
                      </>
          
                      )
                      }
          
                    </div>
          
                    {/* details */}
                    {
                    verificationResult.drug && (
          
                    <>
                    {
                      isDrugExpired(
                        verificationResult.drug.expiryDate
                      ) && (
          
                    <div className="
                      md:col-span-2
                      rounded-2xl
                      border border-red-500/20
                      bg-red-500/10
                      p-5
                      flex items-center gap-4
                    ">
          
                      <div className="
                          w-14 h-14
                          rounded-full
                          bg-red-500/10
                          flex items-center justify-center
                          shrink-0
                      ">
          
                          <MdDangerous
                            size={32}
                            className="text-red-400"
                          />
          
                      </div>
          
                      <div>
          
                          <h3 className="
                            text-red-400
                            text-lg font-bold
                          ">
                            Expired Drug Warning
                          </h3>
          
                          <p className="
                            text-gray-300 mt-1
                          ">
                            This pharmaceutical product
                            has expired and should not
                            be consumed or distributed.
                          </p>
          
                      </div>
          
                    </div>
          
                    )
                    }
                    <div className="
                      grid md:grid-cols-2 gap-5
                    ">
          
                      <InfoCard
                          label="Drug Name"
                          value={
                            verificationResult.drug.name
                          }
                      />
          
                      <InfoCard
                          label="Drug ID"
                          value={
                            verificationResult.drug.drugId
                          }
                      />
          
                      <InfoCard
                          label="Batch Number"
                          value={
                            verificationResult.drug.batchNumber
                          }
                      />
          
                      <InfoCard
                          label="Current Stage"
                          value={
                            verificationResult.drug.currentStage
                          }
                      />
          
                      <InfoCard
                          label="Current Owner"
                          value={
                            verificationResult.drug.currentOwner?.organizationName ||
          
                            verificationResult.drug.currentOwner?.name
                          }
                      />
          
                      <InfoCard
                          label="Expiry Date"
                          value={
                            new Date(
                                verificationResult.drug.expiryDate
                            ).toLocaleDateString()
                          }
                      />
          
                    </div>
                    </>
          
                    )
                    }
          
                    {/* blockchain */}
                    <div className="
                      mt-6 rounded-2xl
                      border border-cyan-500/20
                      bg-cyan-500/5
                      p-5
                    ">
          
                      <div className="
                          flex items-center justify-between
                      ">
          
                          <div>
          
                            <p className="
                                text-sm text-cyan-400
                            ">
                                Blockchain Status
                            </p>
          
                            <p className="
                                text-white font-semibold mt-1
                            ">
                                {
                                verificationResult.isBlockchainVerified
          
                                  ? "Verified On Blockchain"
          
                                  : "Not Verified"
                                }
                            </p>
          
                          </div>
          
                          <div className="
                            px-4 py-2 rounded-full
                            bg-green-500/10
                            border border-green-500/20
                            text-green-400 text-sm
                          ">
                            Secure
                          </div>
          
                      </div>
          
                    </div>
          
                    {/* risk */}
                    <div className="
                      mt-5 grid md:grid-cols-2 gap-5
                    ">
          
                      <div className="
                          rounded-2xl
                          border border-purple-500/20
                          bg-purple-500/5
                          p-5
                      ">
          
                          <p className="
                            text-sm text-purple-400
                          ">
                            AI Risk Score
                          </p>
          
                          <h3 className="
                            text-4xl font-bold
                            text-white mt-2
                          ">
                            {
                            verificationResult.drug?.latestRiskScore || 0
                            }%
                          </h3>
          
                      </div>
          
                      <div className="
                          rounded-2xl
                          border border-amber-500/20
                          bg-amber-500/5
                          p-5
                      ">
          
                          <p className="
                            text-sm text-amber-400
                          ">
                            Anomaly Detection
                          </p>
          
                          <h3 className="
                            text-xl font-bold
                            mt-3
                            text-white
                          ">
                            {
                            verificationResult.drug?.hasAnomaly
          
                            ? "Suspicious Activity"
          
                            : "No Anomalies"
                            }
                          </h3>
          
                      </div>
          
                    </div>
          
                </div>
          
              </div>
          
              )
              }

        </>

    )
}