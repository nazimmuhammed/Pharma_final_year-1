import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  MdCloudUpload,
  MdQrCodeScanner,
  MdVerifiedUser,
  MdDangerous,
} from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";

import {
  Html5Qrcode,
  Html5QrcodeScanner,
} from "html5-qrcode";

import { verifyDrug } from "../Redux/Slices/DrugSlice";


/* =========================================================
   INFO CARD
========================================================= */

const InfoCard = ({
  label,
  value,
}) => (
  <div
    className="
      rounded-2xl
      border border-white/10
      bg-white/5
      p-4
    "
  >
    <p
      className="
        text-xs
        text-cyan-400
        mb-1
      "
    >
      {label}
    </p>

    <p
      className="
        text-sm
        text-white
        break-all
      "
    >
      {value || "N/A"}
    </p>
  </div>
);


/* =========================================================
   VERIFY DRUG PAGE
========================================================= */

export default function VerifyDrugPage() {

  const [showVerifyModal, setShowVerifyModal] =
    useState(true);

  const [scannerOpen, setScannerOpen] =
    useState(false);

  const [showVerificationResult, setShowVerificationResult] =
    useState(false);

  const [invalidQRMessage, setInvalidQRMessage] =
    useState("");

  const [uploadingQR, setUploadingQR] =
    useState(false);

  const scannerRef = useRef(null);

  const dispatch = useDispatch();


  /* =========================================================
     REDUX
  ========================================================= */

  const {
    verificationResult,
    verificationLoading,
  } = useSelector(
    (state) => state.drug
  );


  /* =========================================================
     EXTRACT DRUG ID FROM QR DATA
  ========================================================= */

  const extractDrugId = (decodedText) => {

    if (!decodedText) {
      return "";
    }

    const text = decodedText.trim();

    console.log(
      "QR decoded text:",
      text
    );


    /* -----------------------------------------
       CASE 1: JSON QR
    ----------------------------------------- */

    try {

      const parsedData =
        JSON.parse(text);

      console.log(
        "Parsed QR JSON:",
        parsedData
      );

      if (parsedData?.drugId) {

        return String(
          parsedData.drugId
        ).trim();

      }

    } catch (error) {

      console.log(
        "QR is not JSON."
      );

    }


    /* -----------------------------------------
       CASE 2: Direct Drug ID
    ----------------------------------------- */

    if (
      text &&
      !text.startsWith("http://") &&
      !text.startsWith("https://")
    ) {

      return text;

    }


    /* -----------------------------------------
       CASE 3: Verification URL
    ----------------------------------------- */

    try {

      const url =
        new URL(text);

      const parts =
        url.pathname
          .split("/")
          .filter(Boolean);

      const verifyIndex =
        parts.indexOf("verify");

      if (
        verifyIndex !== -1 &&
        parts[verifyIndex + 1]
      ) {

        return parts[
          verifyIndex + 1
        ];

      }

    } catch (error) {

      console.log(
        "Not a valid URL."
      );

    }

    return "";
  };


  /* =========================================================
     CREATE IMAGE VARIANTS
     
     This helps html5-qrcode decode difficult QR images.
  ========================================================= */

  const createImageVariants = async (file) => {

    return new Promise((resolve, reject) => {

      const reader =
        new FileReader();

      reader.onload = () => {

        const image =
          new Image();

        image.onload = () => {

          const variants = [];

          /* -----------------------------------------
             Original image
          ----------------------------------------- */

          variants.push(file);


          /* -----------------------------------------
             Canvas resize
          ----------------------------------------- */

          const originalWidth =
            image.naturalWidth;

          const originalHeight =
            image.naturalHeight;


          /*
             Keep aspect ratio.
             Resize smaller images to a larger size
             so QR modules become easier to detect.
          */

          const targetSize =
            Math.max(
              1200,
              originalWidth,
              originalHeight
            );


          const scale =
            targetSize /
            Math.max(
              originalWidth,
              originalHeight
            );


          const width =
            Math.round(
              originalWidth * scale
            );

          const height =
            Math.round(
              originalHeight * scale
            );


          const canvas =
            document.createElement("canvas");

          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext("2d");

          ctx.imageSmoothingEnabled =
            false;

          ctx.drawImage(
            image,
            0,
            0,
            width,
            height
          );


          canvas.toBlob(
            (blob) => {

              if (blob) {

                variants.push(
                  new File(
                    [blob],
                    "qr-upscaled.png",
                    {
                      type: "image/png",
                    }
                  )
                );

              }

              resolve(variants);

            },
            "image/png"
          );

        };


        image.onerror = () => {

          reject(
            new Error(
              "Unable to load QR image."
            )
          );

        };


        image.src =
          reader.result;

      };


      reader.onerror = () => {

        reject(
          new Error(
            "Unable to read QR image."
          )
        );

      };


      reader.readAsDataURL(file);

    });
  };


  /* =========================================================
     DECODE QR IMAGE
  ========================================================= */

  const decodeQRImage = async (file) => {

    let html5QrCode = null;

    try {

      console.log(
        "Starting QR image decoding..."
      );

      console.log(
        "File:",
        file.name
      );

      console.log(
        "File type:",
        file.type
      );

      console.log(
        "File size:",
        file.size
      );


      /*
         Make sure the scanner container exists.
      */

      const container =
        document.getElementById(
          "image-reader"
        );

      if (!container) {

        throw new Error(
          "QR image reader container not found."
        );

      }


      html5QrCode =
        new Html5Qrcode(
          "image-reader"
        );


      /*
         Create multiple image versions.
      */

      const imageVariants =
        await createImageVariants(
          file
        );


      console.log(
        "QR decoding attempts:",
        imageVariants.length
      );


      let decodedText = null;


      /* =====================================================
         TRY EACH IMAGE VERSION
      ===================================================== */

      for (
        let i = 0;
        i < imageVariants.length;
        i++
      ) {

        try {

          console.log(
            `Trying QR image ${i + 1}...`
          );


          decodedText =
            await html5QrCode.scanFile(
              imageVariants[i],
              false
            );


          if (
            decodedText &&
            decodedText.trim()
          ) {

            console.log(
              "QR successfully decoded."
            );

            break;

          }

        } catch (error) {

          console.warn(
            `QR attempt ${i + 1} failed:`,
            error
          );

        }

      }


      if (
        !decodedText ||
        !decodedText.trim()
      ) {

        throw new Error(
          "No readable QR code was detected."
        );

      }


      return decodedText;

    } finally {

      /*
         Always clean scanner.
      */

      if (html5QrCode) {

        try {

          await html5QrCode.clear();

        } catch (error) {

          console.log(
            "QR scanner cleanup:",
            error
          );

        }

      }

    }

  };


  /* =========================================================
     HANDLE QR IMAGE UPLOAD
  ========================================================= */

  const handleQRImageUpload =
    async (e) => {

      const file =
        e.target.files?.[0];


      /*
         Allow selecting same image again.
      */

      e.target.value = "";


      if (!file) {
        return;
      }


      setInvalidQRMessage("");

      setUploadingQR(true);


      try {

        /* -----------------------------------------
           Validate image
        ----------------------------------------- */

        if (
          !file.type.startsWith(
            "image/"
          )
        ) {

          throw new Error(
            "Please upload a valid QR code image."
          );

        }


        console.log(
          "Uploaded QR:",
          file.name
        );


        /* -----------------------------------------
           Decode
        ----------------------------------------- */

        const decodedText =
          await decodeQRImage(
            file
          );


        console.log(
          "Decoded QR data:",
          decodedText
        );


        /* -----------------------------------------
           Extract Drug ID
        ----------------------------------------- */

        const drugId =
          extractDrugId(
            decodedText
          );


        console.log(
          "Extracted Drug ID:",
          drugId
        );


        if (!drugId) {

          throw new Error(
            "Invalid pharmaceutical QR code. Drug ID was not found."
          );

        }


        /* -----------------------------------------
           Close verify modal
        ----------------------------------------- */

        setShowVerifyModal(
          false
        );


        /* -----------------------------------------
           Verify using backend
        ----------------------------------------- */

        dispatch(
          verifyDrug(drugId)
        );

      } catch (error) {

        console.error(
          "QR image scan failed:",
          error
        );


        setInvalidQRMessage(
          error?.message ||
          "Unable to scan the uploaded QR image. Please upload a clear QR code."
        );

      } finally {

        setUploadingQR(false);

      }

    };


  /* =========================================================
     CHECK EXPIRY
  ========================================================= */

  const isDrugExpired = (date) => {

    if (!date) {
      return false;
    }

    return (
      new Date(date) <
      new Date()
    );

  };


  /* =========================================================
     SHOW VERIFICATION RESULT
  ========================================================= */

  useEffect(() => {

    if (verificationResult) {

      setShowVerifyModal(false);

      setScannerOpen(false);

      setShowVerificationResult(
        true
      );

    }

  }, [verificationResult]);


  /* =========================================================
     CAMERA QR SCANNER
  ========================================================= */

  useEffect(() => {

    if (!scannerOpen) {
      return;
    }


    const scanner =
      new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,

          rememberLastUsedCamera: true,

          supportedScanTypes: [
            0,
          ],
        },
        false
      );


    scannerRef.current =
      scanner;


    scanner.render(

      async (decodedText) => {

        try {

          console.log(
            "Camera QR DATA:",
            decodedText
          );


          const drugId =
            extractDrugId(
              decodedText
            );


          if (!drugId) {

            setInvalidQRMessage(
              "Invalid pharmaceutical QR code. Drug ID was not found."
            );

            return;

          }


          /*
             Stop scanner before
             sending verification request.
          */

          await scanner.clear();

          scannerRef.current =
            null;

          setScannerOpen(false);

          setShowVerifyModal(false);


          /*
             Verify drug
          */

          dispatch(
            verifyDrug(drugId)
          );

        } catch (error) {

          console.error(
            "Camera QR processing error:",
            error
          );

          setInvalidQRMessage(
            "Corrupted or unsupported QR format."
          );

        }

      },

      (errorMessage) => {

        /*
           html5-qrcode continuously sends
           scan failure messages while searching.

           We intentionally ignore them.
        */

      }

    );


    return () => {

      scanner
        .clear()
        .catch(() => {});

      scannerRef.current =
        null;

    };

  }, [scannerOpen]);


  /* =========================================================
     CLOSE CAMERA
  ========================================================= */

  const closeScanner = async () => {

    try {

      if (scannerRef.current) {

        await scannerRef.current.clear();

        scannerRef.current =
          null;

      }

    } catch (error) {

      console.log(
        "Scanner close error:",
        error
      );

    }

    setScannerOpen(false);

  };


  /* =========================================================
     CLOSE VERIFY MODAL
  ========================================================= */

  const closeVerifyModal = async () => {

    await closeScanner();

    setShowVerifyModal(false);

  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          VERIFY MODAL
      ===================================================== */}

      {showVerifyModal && (

        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70
            backdrop-blur-sm
            px-4
          "
        >

          <div
            className="
              relative
              w-full max-w-lg
              max-h-[90vh]
              overflow-y-auto
              rounded-3xl
              border border-cyan-500/20
              bg-[#07111f]
              p-6
              shadow-[0_0_60px_rgba(0,229,255,0.15)]
            "
          >

            {/* CLOSE */}

            <button
              onClick={
                closeVerifyModal
              }
              className="
                absolute top-4 right-4
                text-gray-400
                hover:text-white
                text-xl
                z-20
              "
            >
              ✕
            </button>


            {/* TITLE */}

            <h2
              className="
                text-2xl
                font-bold
                text-white
                text-center
                mb-2
              "
            >
              Verify Drug
            </h2>


            <p
              className="
                text-center
                text-gray-400
                text-sm
                mb-8
              "
            >
              Scan or upload QR code
              to verify blockchain authenticity
            </p>


            {/* OPTIONS */}

            <div
              className="
                grid
                sm:grid-cols-2
                gap-5
              "
            >

              {/* CAMERA */}

              <motion.button
                onClick={() =>
                  setScannerOpen(true)
                }

                whileHover={{
                  scale: 1.03,
                }}

                whileTap={{
                  scale: 0.97,
                }}

                className="
                  rounded-2xl
                  border border-cyan-500/20
                  bg-cyan-500/10
                  p-6
                  flex flex-col
                  items-center
                  justify-center
                  gap-3
                  hover:bg-cyan-500/20
                  transition-all
                "
              >

                <MdQrCodeScanner
                  size={42}
                  className="
                    text-cyan-400
                  "
                />

                <div>

                  <p
                    className="
                      text-white
                      font-semibold
                    "
                  >
                    Scan QR Code
                  </p>

                  <p
                    className="
                      text-xs
                      text-gray-400
                      mt-1
                    "
                  >
                    Use camera scanner
                  </p>

                </div>

              </motion.button>


              {/* UPLOAD */}

              <motion.label
                whileHover={{
                  scale: 1.03,
                }}

                whileTap={{
                  scale: 0.97,
                }}

                className="
                  cursor-pointer
                  rounded-2xl
                  border border-purple-500/20
                  bg-purple-500/10
                  p-6
                  flex flex-col
                  items-center
                  justify-center
                  gap-3
                  hover:bg-purple-500/20
                  transition-all
                "
              >

                <input
                  type="file"
                  accept="
                    image/png,
                    image/jpeg,
                    image/jpg,
                    image/webp
                  "
                  className="hidden"
                  disabled={uploadingQR}
                  onChange={
                    handleQRImageUpload
                  }
                />


                <MdCloudUpload
                  size={42}
                  className="
                    text-purple-400
                  "
                />


                <div>

                  <p
                    className="
                      text-white
                      font-semibold
                    "
                  >
                    {uploadingQR
                      ? "Reading QR..."
                      : "Upload QR Image"}
                  </p>


                  <p
                    className="
                      text-xs
                      text-gray-400
                      mt-1
                    "
                  >
                    PNG, JPG, WEBP
                  </p>

                </div>

              </motion.label>

            </div>


            {/* UPLOAD STATUS */}

            {uploadingQR && (

              <div
                className="
                  mt-6
                  rounded-2xl
                  border border-purple-500/20
                  bg-purple-500/5
                  p-4
                  text-center
                "
              >

                <div
                  className="
                    w-8 h-8
                    mx-auto
                    rounded-full
                    border-2
                    border-purple-400/30
                    border-t-purple-400
                    animate-spin
                  "
                />

                <p
                  className="
                    mt-3
                    text-sm
                    text-purple-200
                  "
                >
                  Reading QR code...
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                  "
                >
                  Please wait
                </p>

              </div>

            )}


            {/* CAMERA SCANNER */}

            {scannerOpen && (

              <div
                className="
                  mt-6
                  rounded-2xl
                  overflow-hidden
                  border border-cyan-500/20
                  bg-black
                  p-3
                "
              >

                <div id="reader" />

                <button
                  onClick={
                    closeScanner
                  }
                  className="
                    mt-3
                    w-full
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    py-3
                    text-gray-300
                    hover:bg-white/10
                  "
                >
                  Stop Camera
                </button>

              </div>

            )}


            {/* IMAGE READER
                NOTE: html5-qrcode's scanFile() internally draws the
                uploaded image onto a canvas sized relative to THIS
                container's clientWidth/clientHeight. If the container
                is 0x0 (as it was with w-0 h-0), that internal canvas
                also collapses to 0x0 and every scan silently fails —
                regardless of image quality. Keeping real pixel
                dimensions (via inline style, pushed off-screen) fixes
                decoding while keeping the element fully invisible and
                out of the layout, so the UI is unaffected. */}

            <div
              id="image-reader"
              style={{
                position: "fixed",
                top: "-9999px",
                left: "-9999px",
                width: "300px",
                height: "300px",
                overflow: "hidden",
                pointerEvents: "none",
              }}
            />

          </div>

        </div>

      )}


      {/* =====================================================
          VERIFICATION LOADING
      ===================================================== */}

      {verificationLoading && (

        <div
          className="
            fixed inset-0 z-[70]
            flex items-center justify-center
            bg-black/80
            backdrop-blur-sm
          "
        >

          <div
            className="
              relative
              w-full max-w-md
              rounded-3xl
              border border-cyan-500/20
              bg-[#07111f]
              p-8
              shadow-[0_0_70px_rgba(0,229,255,0.18)]
              overflow-hidden
            "
          >

            <div
              className="
                absolute inset-0
                bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.15),transparent_45%)]
                animate-pulse
              "
            />


            <div
              className="
                relative z-10
                flex flex-col
                items-center
              "
            >

              <div
                className="
                  relative
                  w-28 h-28
                  flex items-center
                  justify-center
                "
              >

                <motion.div
                  animate={{
                    rotate: 360,
                  }}

                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}

                  className="
                    absolute
                    inset-0
                    rounded-full
                    border-2
                    border-cyan-400/20
                    border-t-cyan-400
                  "
                />


                <motion.div
                  animate={{
                    rotate: -360,
                  }}

                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}

                  className="
                    absolute
                    inset-3
                    rounded-full
                    border-2
                    border-purple-400/20
                    border-t-purple-400
                  "
                />


                <motion.div
                  animate={{
                    scale: [
                      1,
                      1.15,
                      1,
                    ],

                    opacity: [
                      0.7,
                      1,
                      0.7,
                    ],
                  }}

                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}

                  className="
                    w-12 h-12
                    rounded-full
                    bg-cyan-400/20
                    flex items-center
                    justify-center
                  "
                >

                  <MdVerifiedUser
                    size={28}
                    className="
                      text-cyan-400
                    "
                  />

                </motion.div>

              </div>


              <h2
                className="
                  mt-8
                  text-2xl
                  font-bold
                  text-white
                "
              >
                Verifying Drug
              </h2>


              <p
                className="
                  mt-3
                  text-center
                  text-gray-400
                  leading-relaxed
                "
              >
                Validating blockchain authenticity
                and analyzing pharmaceutical records...
              </p>


              <div
                className="
                  mt-8
                  w-full
                  space-y-4
                "
              >

                {[
                  "Scanning QR signature",
                  "Connecting to blockchain",
                  "Verifying smart contract",
                  "Analyzing drug integrity",
                ].map(
                  (step, index) => (

                    <motion.div
                      key={index}

                      initial={{
                        opacity: 0.3,
                      }}

                      animate={{
                        opacity: [
                          0.3,
                          1,
                          0.3,
                        ],
                      }}

                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay:
                          index * 0.4,
                      }}

                      className="
                        flex items-center
                        gap-3
                        rounded-xl
                        border
                        border-cyan-500/10
                        bg-cyan-500/5
                        px-4 py-3
                      "
                    >

                      <div
                        className="
                          w-2 h-2
                          rounded-full
                          bg-cyan-400
                        "
                      />

                      <span
                        className="
                          text-sm
                          text-cyan-100
                        "
                      >
                        {step}
                      </span>

                    </motion.div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          INVALID QR
      ===================================================== */}

      {invalidQRMessage && (

        <div
          className="
            fixed inset-0 z-[80]
            flex items-center justify-center
            bg-black/80
            backdrop-blur-sm
            px-4
          "
        >

          <div
            className="
              relative
              w-full max-w-md
              rounded-3xl
              border border-red-500/20
              bg-[#120b0b]
              p-7
              shadow-[0_0_70px_rgba(239,68,68,0.18)]
              overflow-hidden
            "
          >

            <div
              className="
                absolute inset-0
                bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.15),transparent_45%)]
              "
            />


            <button
              onClick={() =>
                setInvalidQRMessage("")
              }

              className="
                absolute top-4 right-4
                text-gray-400
                hover:text-white
                text-xl z-10
              "
            >
              ✕
            </button>


            <div
              className="
                relative z-10
                flex flex-col
                items-center
                text-center
              "
            >

              <div
                className="
                  w-24 h-24
                  rounded-full
                  bg-red-500/10
                  border border-red-500/20
                  flex items-center
                  justify-center
                  mb-6
                "
              >

                <MdDangerous
                  size={50}
                  className="
                    text-red-400
                  "
                />

              </div>


              <h2
                className="
                  text-3xl
                  font-bold
                  text-red-400
                "
              >
                Verification Failed
              </h2>


              <p
                className="
                  mt-4
                  text-gray-300
                  leading-relaxed
                "
              >
                {invalidQRMessage}
              </p>


              <div
                className="
                  mt-6
                  rounded-2xl
                  border border-red-500/20
                  bg-red-500/5
                  p-4
                  text-sm
                  text-red-200
                "
              >
                This QR code may be invalid,
                damaged, or not registered in
                the pharmaceutical verification
                system.
              </div>


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

      )}


      {/* =====================================================
          VERIFICATION RESULT
      ===================================================== */}

      {showVerificationResult &&
        verificationResult && (

          <div
            className="
              fixed inset-0 z-[60]
              flex items-center justify-center
              bg-black/80
              backdrop-blur-sm
              px-4
            "
          >

            <div
              className="
                relative
                w-full max-w-3xl
                max-h-[90vh]
                overflow-y-auto
                rounded-3xl
                border border-cyan-500/20
                bg-[#07111f]
                p-6
                shadow-[0_0_70px_rgba(0,229,255,0.18)]
              "
            >

              <div
                className="
                  absolute inset-0
                  bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.12),transparent_40%)]
                  pointer-events-none
                "
              />


              {/* CLOSE */}

              <button
                onClick={() =>
                  setShowVerificationResult(
                    false
                  )
                }

                className="
                  absolute top-4 right-4
                  text-gray-400
                  hover:text-white
                  text-xl z-10
                "
              >
                ✕
              </button>


              {/* STATUS */}

              <div
                className="
                  relative
                  flex flex-col
                  items-center
                  text-center
                  mb-8
                "
              >

                {verificationResult.isAuthentic ? (

                  <>
                    <div
                      className="
                        w-24 h-24
                        rounded-full
                        flex items-center
                        justify-center
                        bg-green-500/10
                        border border-green-500/20
                        mb-4
                      "
                    >

                      <MdVerifiedUser
                        size={50}
                        className="
                          text-green-400
                        "
                      />

                    </div>


                    <h2
                      className="
                        text-3xl
                        font-bold
                        text-green-400
                      "
                    >
                      Authentic Drug
                    </h2>


                    <p
                      className="
                        text-gray-400
                        mt-2
                      "
                    >
                      Blockchain verification
                      successful
                    </p>

                  </>

                ) : (

                  <>
                    <div
                      className="
                        w-24 h-24
                        rounded-full
                        flex items-center
                        justify-center
                        bg-red-500/10
                        border border-red-500/20
                        mb-4
                      "
                    >

                      <MdDangerous
                        size={50}
                        className="
                          text-red-400
                        "
                      />

                    </div>


                    <h2
                      className="
                        text-3xl
                        font-bold
                        text-red-400
                      "
                    >
                      Fake / Invalid Drug
                    </h2>


                    <p
                      className="
                        text-gray-400
                        mt-2
                      "
                    >
                      Drug not found in blockchain
                    </p>

                  </>

                )}

              </div>


              {/* DRUG DETAILS */}

              {verificationResult.drug && (

                <>

                  {/* EXPIRY */}

                  {isDrugExpired(
                    verificationResult
                      .drug
                      .expiryDate
                  ) && (

                    <div
                      className="
                        mb-5
                        rounded-2xl
                        border border-red-500/20
                        bg-red-500/10
                        p-5
                        flex items-center
                        gap-4
                      "
                    >

                      <div
                        className="
                          w-14 h-14
                          rounded-full
                          bg-red-500/10
                          flex items-center
                          justify-center
                          shrink-0
                        "
                      >

                        <MdDangerous
                          size={32}
                          className="
                            text-red-400
                          "
                        />

                      </div>


                      <div>

                        <h3
                          className="
                            text-red-400
                            text-lg
                            font-bold
                          "
                        >
                          Expired Drug Warning
                        </h3>


                        <p
                          className="
                            text-gray-300
                            mt-1
                          "
                        >
                          This pharmaceutical
                          product has expired
                          and should not be
                          consumed or distributed.
                        </p>

                      </div>

                    </div>

                  )}


                  {/* DETAILS GRID */}

                  <div
                    className="
                      grid
                      md:grid-cols-2
                      gap-5
                    "
                  >

                    <InfoCard
                      label="Drug Name"
                      value={
                        verificationResult
                          .drug
                          .name
                      }
                    />


                    <InfoCard
                      label="Drug ID"
                      value={
                        verificationResult
                          .drug
                          .drugId
                      }
                    />


                    <InfoCard
                      label="Batch Number"
                      value={
                        verificationResult
                          .drug
                          .batchNumber
                      }
                    />


                    <InfoCard
                      label="Current Stage"
                      value={
                        verificationResult
                          .drug
                          .currentStage
                      }
                    />


                    <InfoCard
                      label="Current Owner"
                      value={
                        verificationResult
                          .drug
                          .currentOwner
                          ?.organizationName ||
                        verificationResult
                          .drug
                          .currentOwner
                          ?.name
                      }
                    />


                    <InfoCard
                      label="Expiry Date"
                      value={
                        new Date(
                          verificationResult
                            .drug
                            .expiryDate
                        ).toLocaleDateString()
                      }
                    />

                  </div>


                  {/* BLOCKCHAIN */}

                  <div
                    className="
                      mt-6
                      rounded-2xl
                      border border-cyan-500/20
                      bg-cyan-500/5
                      p-5
                    "
                  >

                    <div
                      className="
                        flex items-center
                        justify-between
                      "
                    >

                      <div>

                        <p
                          className="
                            text-sm
                            text-cyan-400
                          "
                        >
                          Blockchain Status
                        </p>


                        <p
                          className="
                            text-white
                            font-semibold
                            mt-1
                          "
                        >
                          {
                            verificationResult
                              .isBlockchainVerified
                              ? "Verified On Blockchain"
                              : "Not Verified"
                          }
                        </p>

                      </div>


                      <div
                        className="
                          px-4 py-2
                          rounded-full
                          bg-green-500/10
                          border border-green-500/20
                          text-green-400
                          text-sm
                        "
                      >
                        Secure
                      </div>

                    </div>

                  </div>


                  {/* AI RISK */}

                  <div
                    className="
                      mt-5
                      grid
                      md:grid-cols-2
                      gap-5
                    "
                  >

                    <div
                      className="
                        rounded-2xl
                        border border-purple-500/20
                        bg-purple-500/5
                        p-5
                      "
                    >

                      <p
                        className="
                          text-sm
                          text-purple-400
                        "
                      >
                        AI Risk Score
                      </p>


                      <h3
                        className="
                          text-4xl
                          font-bold
                          text-white
                          mt-2
                        "
                      >
                        {
                          verificationResult
                            .drug
                            ?.latestRiskScore ?? 0
                        }%
                      </h3>

                    </div>


                    <div
                      className="
                        rounded-2xl
                        border border-amber-500/20
                        bg-amber-500/5
                        p-5
                      "
                    >

                      <p
                        className="
                          text-sm
                          text-amber-400
                        "
                      >
                        Anomaly Detection
                      </p>


                      <h3
                        className="
                          text-xl
                          font-bold
                          mt-3
                          text-white
                        "
                      >
                        {
                          verificationResult
                            .drug
                            ?.hasAnomaly
                            ? "Suspicious Activity"
                            : "No Anomalies"
                        }
                      </h3>

                    </div>

                  </div>

                </>

              )}

            </div>

          </div>

        )}

    </>
  );
}