import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RiskTrendChart = ({ data = [] }) => {
  const [filter, setFilter] = useState("7");

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    let filteredData = [...data];

    if (filter === "7") {
      filteredData = filteredData.slice(0, 7);
    } else if (filter === "30") {
      filteredData = filteredData.slice(0, 30);
    }

    return filteredData
      .reverse()
      .map((item) => ({
        date: new Date(item.analyzedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        risk: item.riskScore,
      }));
  }, [data, filter]);

  return (
    <motion.div
      whileHover={{
        scale: 1.01,
      }}
      className="
            bg-[#0B1220]
            border border-cyan-500/20
            rounded-2xl
            p-6
            shadow-lg
         "
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="
                     text-xl
                     font-bold
                     text-white
                  "
          >
            Risk Trend
          </h2>

          <p
            className="
                     text-sm
                     text-gray-400
                     mt-1
                  "
          >
            AI risk score over time
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
                  bg-[#020817]
                  border border-cyan-500/20
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  text-white
                  outline-none
               "
        >
          <option value="7">Last 7 Analyses</option>
          <option value="30">Last 30 Analyses</option>
          <option value="all">All Analyses</option>
        </select>
      </div>

      {/* Empty State */}

      {chartData.length === 0 ? (
        <div className="h-80 flex items-center justify-center text-gray-400">
          No analysis history available.
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                stroke="#1E293B"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
                stroke="#94A3B8"
              />

              <YAxis
                stroke="#94A3B8"
                domain={[0, 100]}
              />

              <Tooltip
                contentStyle={{
                  background: "#0F172A",
                  border: "1px solid #155E75",
                  borderRadius: "10px",
                }}
              />

              <Line
                type="monotone"
                dataKey="risk"
                stroke="#06B6D4"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#06B6D4",
                }}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
};

export default RiskTrendChart;