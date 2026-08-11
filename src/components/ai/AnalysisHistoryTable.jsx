import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import AIReportModal from "./AIReportModal";
import generateAIReportPDF from "../../utils/generateAIReportPDF";

import {
  MdVisibility,
  MdDownload,
  MdSearch,
} from "react-icons/md";

const riskBadge = (risk = "") => {
  switch (risk.toLowerCase()) {
    case "low":
      return "bg-green-500/10 text-green-400";

    case "medium":
      return "bg-yellow-500/10 text-yellow-400";

    case "high":
      return "bg-orange-500/10 text-orange-400";

    default:
      return "bg-red-500/10 text-red-400";
  }
};

const predictionBadge = (prediction = "") => {
  switch (prediction.toLowerCase()) {
    case "safe":
      return "bg-green-500/10 text-green-400";

    case "under investigation":
      return "bg-yellow-500/10 text-yellow-400";

    case "suspicious":
      return "bg-orange-500/10 text-orange-400";

    default:
      return "bg-red-500/10 text-red-400";
  }
};

const AnalysisHistoryTable = ({
  history = [],
}) => {
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (report) => {
  setSelectedReport(report);
  setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  const filteredHistory = useMemo(() => {
    if (!search.trim()) return history;

    return history.filter(
      (item) =>
        item.prediction
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.riskLevel
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item._id
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [history, search]);

  return (
    <motion.div
      //whileHover={{ scale: 1.005 }}
      className="
            bg-[#0B1220]
            border border-cyan-500/20
            rounded-2xl
            p-6
            shadow-lg
         "
    >
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            Analysis History
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Previous AI analysis reports.
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <MdSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
            size={18}
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search Analysis"
            className="
                     w-full
                     bg-[#020817]
                     border border-cyan-500/20
                     rounded-xl
                     pl-11
                     pr-4
                     py-3
                     text-white
                     placeholder:text-gray-500
                     outline-none
                  "
          />
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          No analysis history found.
        </div>
      ) : (
        <>
          {/* Desktop */}

          <div className="overflow-x-auto hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 text-gray-400">
                    Report ID
                  </th>

                  <th className="text-left py-4 text-gray-400">
                    Date
                  </th>

                  <th className="text-left py-4 text-gray-400">
                    Risk Score
                  </th>

                  <th className="text-left py-4 text-gray-400">
                    Risk Level
                  </th>

                  <th className="text-left py-4 text-gray-400">
                    Prediction
                  </th>

                  <th className="text-left py-4 text-gray-400">
                    Confidence
                  </th>

                  <th className="text-center py-4 text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredHistory.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-white/5 hover:bg-cyan-500/5 transition"
                  >
                    <td className="py-5 text-cyan-400 font-semibold">
                      {item._id.slice(-8)}
                    </td>

                    <td className="text-white">
                      {new Date(
                        item.analyzedAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="text-white">
                      {item.riskScore}/100
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${riskBadge(
                          item.riskLevel
                        )}`}
                      >
                        {item.riskLevel}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${predictionBadge(
                          item.prediction
                        )}`}
                      >
                        {item.prediction}
                      </span>
                    </td>

                    <td className="text-white">
                      {item.confidence}%
                    </td>

                    <td>
                      <div className="flex justify-center gap-3">
                        <button 
                        onClick={() => handleView(item)}
                        className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition">
                          <MdVisibility size={20} />
                        </button>

                        <button 
                        onClick={() => generateAIReportPDF(item)}
                        className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition">
                          <MdDownload size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}

          <div className="md:hidden space-y-4">
            {filteredHistory.map((item) => (
              <div
                key={item._id}
                className="rounded-xl bg-[#020817] border border-cyan-500/10 p-4"
              >
                <div className="flex justify-between">
                  <h3 className="text-cyan-400 font-semibold">
                    {item._id.slice(-8)}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${riskBadge(
                      item.riskLevel
                    )}`}
                  >
                    {item.riskLevel}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mt-2">
                  {new Date(
                    item.analyzedAt
                  ).toLocaleDateString()}
                </p>

                <p className="text-white mt-3">
                  Prediction :
                  <span className="ml-2">
                    {item.prediction}
                  </span>
                </p>

                <p className="text-white">
                  Confidence :
                  <span className="ml-2">
                    {item.confidence}%
                  </span>
                </p>

                <div className="flex gap-3 mt-4">
                  <button 
                  onClick={() => handleView(item)}
                  className="flex-1 h-11 rounded-lg bg-cyan-500/10 text-cyan-400">
                    View
                  </button>

                  <button 
                  onClick={() => generateAIReportPDF(item)}className="flex-1 h-11 rounded-lg bg-purple-500/10 text-purple-400">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
          <AIReportModal
            open={isModalOpen}
            onClose={handleClose}
            report={selectedReport}
          />
        </>
      )}
    </motion.div>
  );
};

export default AnalysisHistoryTable;