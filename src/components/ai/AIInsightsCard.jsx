import { motion } from "framer-motion";

import {
  MdPsychology,
  MdInfo,
  MdWarningAmber,
  MdDangerous,
} from "react-icons/md";

const defaultInsights = [];

const getStyles = (severity = "info") => {
  switch (severity.toLowerCase()) {
    case "critical":
      return {
        icon: MdDangerous,
        border: "border-red-500/20",
        bg: "bg-red-500/10",
        text: "text-red-400",
        badge: "Critical",
      };

    case "warning":
      return {
        icon: MdWarningAmber,
        border: "border-yellow-500/20",
        bg: "bg-yellow-500/10",
        text: "text-yellow-400",
        badge: "Warning",
      };

    default:
      return {
        icon: MdInfo,
        border: "border-cyan-500/20",
        bg: "bg-cyan-500/10",
        text: "text-cyan-400",
        badge: "Info",
      };
  }
};

const AIInsightsCard = ({
  insights = defaultInsights,
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
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div
          className="
                  w-12
                  h-12
                  rounded-xl
                  bg-cyan-500/10
                  flex
                  items-center
                  justify-center
               "
        >
          <MdPsychology
            size={26}
            className="text-cyan-400"
          />
        </div>

        <div>
          <h2
            className="
                     text-xl
                     font-bold
                     text-white
                  "
          >
            AI Insights
          </h2>

          <p
            className="
                     text-sm
                     text-gray-400
                  "
          >
            AI-generated forensic observations
          </p>
        </div>
      </div>

      {/* Empty State */}

      {insights.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          No AI insights available.
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((item, index) => {
            const style = getStyles(item.severity);

            const Icon = style.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  x: 4,
                }}
                className={`
                              p-4
                              rounded-xl
                              border
                              ${style.border}
                              bg-[#020817]
                              flex
                              gap-4
                           `}
              >
                <div
                  className={`
                                 w-11
                                 h-11
                                 rounded-xl
                                 ${style.bg}
                                 flex
                                 items-center
                                 justify-center
                                 shrink-0
                              `}
                >
                  <Icon
                    size={22}
                    className={style.text}
                  />
                </div>

                <div className="flex-1">
                  <div
                    className="
                                    flex
                                    justify-between
                                    items-center
                                 "
                  >
                    <h4
                      className="
                                       text-white
                                       font-semibold
                                    "
                    >
                      {item.type}
                    </h4>

                    <span
                      className={`
                                       text-xs
                                       px-3
                                       py-1
                                       rounded-full
                                       ${style.bg}
                                       ${style.text}
                                    `}
                    >
                      {style.badge}
                    </span>
                  </div>

                  <p
                    className="
                                    text-gray-400
                                    text-sm
                                    mt-2
                                 "
                  >
                    {item.description}
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

export default AIInsightsCard;