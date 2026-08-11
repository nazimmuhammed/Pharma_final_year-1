import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaSearch } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";

import {
  analyzeDrug,
  getLatestReport,
  getAnalysisHistory,
} from "../../Redux/Slices/aiSlice"

const SearchBar = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ai);

  const [drugId, setDrugId] = useState("");

  const handleSearch = async () => {
    if (!drugId.trim()) return;

    try {
      await dispatch(analyzeDrug(drugId)).unwrap();

      await dispatch(getLatestReport(drugId)).unwrap();

      await dispatch(getAnalysisHistory(drugId)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="
         bg-[#0B1220]
         border border-cyan-500/20
         rounded-2xl
         p-6
         shadow-lg
      "
    >
      {/* Heading */}

      <div className="mb-5">
        <h2
          className="
               text-2xl
               font-bold
               text-white
               mb-2
            "
        >
          AI Risk Analysis
        </h2>

        <p
          className="
               text-gray-400
               text-sm
            "
        >
          Search a drug using Drug ID or scan its QR code to perform
          AI-powered risk analysis.
        </p>
      </div>

      {/* Search */}

      <div
        className="
            flex
            flex-col
            lg:flex-row
            gap-4
         "
      >
        {/* Input */}

        <div className="flex-1 relative">
          <input
            type="text"
            value={drugId}
            onChange={(e) => setDrugId(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter Drug ID"
            className="
                  w-full
                  bg-[#020817]
                  border
                  border-cyan-500/20
                  rounded-xl
                  h-14
                  pl-14
                  pr-4
                  text-white
                  placeholder:text-gray-500
                  focus:border-cyan-400
                  outline-none
                  transition-all
                  "
          />

          <FaSearch
            className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-cyan-400
                  "
            size={18}
          />
        </div>

        {/* Search */}

        <button
          onClick={handleSearch}
          disabled={loading}
          className="
               h-14
               px-8
               rounded-xl

               bg-gradient-to-r
               from-cyan-500
               to-blue-600

               text-white
               font-semibold

               hover:scale-105
               transition-all

               disabled:opacity-50
               disabled:cursor-not-allowed
               "
        >
          {loading ? "Analyzing..." : "Search"}
        </button>

        {/* OR */}

        <div
          className="
               hidden
               lg:flex
               items-center
               text-gray-500
               font-semibold
               "
        >
          OR
        </div>

        {/* QR */}

        <button
          className="
               h-14
               px-8

               rounded-xl

               border
               border-purple-500/30

               text-purple-300

               flex
               items-center
               gap-2

               hover:bg-purple-500/10

               transition-all
               "
        >
          <MdQrCodeScanner size={24} />

          Scan QR
        </button>
      </div>
    </div>
  );
};

export default SearchBar;