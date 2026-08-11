import { motion } from "framer-motion";

export default function QRCodeModal({
  showQRModal,
  selectedQRDrug,
  setShowQRModal,
}) {
  if (
    !showQRModal ||
    !selectedQRDrug
  ) {
    return null;
  }

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(
        selectedQRDrug.qrCodeImage
      );

      if (!response.ok) {
        throw new Error("Failed to fetch QR code");
      }

      const blob = await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${selectedQRDrug.drugId}-QR.png`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(
        "QR download failed:",
        error
      );
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70 backdrop-blur-sm
        px-4
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
          relative
          w-full max-w-md
          rounded-3xl
          border border-purple-500/20
          bg-[#07111f]
          p-8
          text-center
        "
      >
        {/* Close */}
        <button
          onClick={() =>
            setShowQRModal(false)
          }
          className="
            absolute top-4 right-4
            text-gray-400
            hover:text-white
            text-xl
          "
        >
          ✕
        </button>

        {/* Title */}
        <h2
          className="
            text-3xl font-bold
            text-white
          "
        >
          Drug QR Code
        </h2>

        <p
          className="
            text-gray-400 mt-3
          "
        >
          Blockchain verification QR
          for pharmaceutical tracking
        </p>

        {/* QR Image */}
        <div
          className="
            mt-8
            rounded-3xl
            border border-white/10
            bg-white
            p-5
            flex items-center justify-center
          "
        >
          <img
            src={
              selectedQRDrug.qrCodeImage
            }
            alt="Drug QR"
            className="
              w-72 h-72
              object-contain
            "
          />
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownloadQR}
          className="
            mt-5
            w-full
            rounded-2xl
            bg-purple-600
            hover:bg-purple-500
            text-white
            font-semibold
            py-3
            transition-all
          "
        >
          Download QR Code
        </button>

        {/* Info */}
        <div
          className="
            mt-6
            rounded-2xl
            border border-white/10
            bg-white/5
            p-4
            text-left
          "
        >
          <p
            className="
              text-xs
              text-purple-400
            "
          >
            Drug Name
          </p>

          <p
            className="
              text-white
              font-semibold
              mt-1
            "
          >
            {selectedQRDrug.name}
          </p>

          <p
            className="
              mt-4
              text-xs
              text-purple-400
            "
          >
            Drug ID
          </p>

          <p
            className="
              text-gray-300
              mt-1
              break-all
            "
          >
            {selectedQRDrug.drugId}
          </p>
        </div>
      </motion.div>
    </div>
  );
}