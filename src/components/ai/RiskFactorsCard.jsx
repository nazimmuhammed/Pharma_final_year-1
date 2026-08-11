import { motion } from "framer-motion";

import {
  MdWarning,
  MdLocationOn,
  MdOutlineInventory2,
  MdVerified,
  MdOutlineReportProblem,
} from "react-icons/md";

const defaultFactors = [];

const getIcon = (factor) => {
  switch (factor) {
    case "Duplicate Scan":
      return MdOutlineInventory2;

    case "Blockchain Verification":
      return MdVerified;

    case "Suspicious Location":
    case "Unknown Location":
      return MdLocationOn;

    case "Expired Drug":
      return MdWarning;

    default:
      return MdOutlineReportProblem;
  }
};

const getSeverityStyle = (severity = "Safe") => {
  switch (severity.toLowerCase()) {
    case "critical":
      return {
        label: "Critical",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
      };

    case "high":
      return {
        label: "High",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
      };

    case "medium":
      return {
        label: "Medium",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
      };

    default:
      return {
        label: "Safe",
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
      };
  }
};

const RiskFactorsCard = ({
  riskFactors = defaultFactors,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="
            bg-[#0B1220]
            border border-cyan-500/20
            rounded-2xl
            p-6
            shadow-lg
         "
    >
      <div className="mb-6">
        <h2
          className="
                  text-xl
                  font-bold
                  text-white
               "
        >
          Risk Factors
        </h2>

        <p
          className="
                  text-gray-400
                  text-sm
                  mt-1
               "
        >
          Factors contributing to the AI risk score.
        </p>
      </div>

      {riskFactors.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          No risk factors found.
        </div>
      ) : (
        <div className="space-y-4">
          {riskFactors.map((item, index) => {
            const Icon = getIcon(item.factor);

            const severity = getSeverityStyle(
              item.severity
            );

            return (
              <motion.div
                key={index}
                whileHover={{
                  x: 5,
                }}
                className={`
                           p-4
                           rounded-xl
                           border
                           ${severity.border}
                           bg-[#020817]
                           flex
                           items-center
                           justify-between
                        `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                                 w-12
                                 h-12
                                 rounded-xl
                                 flex
                                 items-center
                                 justify-center
                                 ${severity.bg}
                              `}
                  >
                    <Icon
                      size={24}
                      className={severity.color}
                    />
                  </div>

                  <div>
                    <h4
                      className="
                                    text-white
                                    font-semibold
                                 "
                    >
                      {item.factor}
                    </h4>

                    <p
                      className="
                                    text-sm
                                    text-gray-400
                                    mt-1
                                 "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`
                                 px-3
                                 py-1
                                 rounded-full
                                 text-xs
                                 font-semibold
                                 ${severity.bg}
                                 ${severity.color}
                              `}
                  >
                    {severity.label}
                  </div>

                  <p
                    className="
                                 text-gray-500
                                 text-xs
                                 mt-2
                              "
                  >
                    +{item.score} Risk
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default RiskFactorsCard;