import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../components/ai/SearchBar";
import MetricCard from "../components/ai/MetricCard";
import PredictionCard from "../components/ai/PredictionCard";
import ConfidenceCard from "../components/ai/ConfidenceCard";
import LatestAnalysisCard from "../components/ai/LatestAnalysisCard";

import RiskTrendChart from "../components/ai/RiskTrendChart";
import RiskFactorsCard from "../components/ai/RiskFactorsCard";

import AIInsightsCard from "../components/ai/AIInsightsCard";
import RecommendationCard from "../components/ai/RecommendationCard";

import AnalysisHistoryTable from "../components/ai/AnalysisHistoryTable";

import {getAnalysisHistory} from "../Redux/Slices/aiSlice"

export default function AIRiskAnalysis() {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    latestAnalysis,
    analysisHistory,
    report,
  } = useSelector((state) => state.ai);

  useEffect(() => {
    if (report?.drugId) {
      dispatch(getAnalysisHistory(report.drugId));
    }
  }, [dispatch, report?.drugId]);

  const analysis = report || latestAnalysis;

  return (
    <div
      className="
        p-6
        space-y-6
        bg-[#020817]
        min-h-screen
      "
    >
      {/* Search */}
      <SearchBar />

      {/* Loading */}
      {loading && (
        <div className="text-cyan-400 text-center">
          Running AI analysis...
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="
            bg-red-500/10
            border
            border-red-500/30
            rounded-xl
            p-4
            text-red-400
          "
        >
          {error}
        </div>
      )}

      {analysis && (
        <>
          {/* Top Cards */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-6
            "
          >
            <MetricCard
              title="AI Risk Score"
              value={analysis.riskScore}
              status={analysis.riskLevel}
              color={
                analysis.riskLevel === "critical"
                  ? "#ef4444"
                  : analysis.riskLevel === "high"
                  ? "#f97316"
                  : analysis.riskLevel === "medium"
                  ? "#eab308"
                  : "#22c55e"
              }
            />

            <PredictionCard
              prediction={analysis.prediction}
              description={analysis.summary}
              confidence={analysis.confidence}
            />

            <ConfidenceCard
              confidence={analysis.confidence}
              model={analysis.analysisSource}
            />

            <LatestAnalysisCard
              analyzedAt={analysis.analyzedAt}
              processingTime={analysis.processingTime}
              modelVersion={analysis.modelVersion}
            />
          </div>

          {/* Charts */}

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-6
            "
          >
            <RiskTrendChart
              data={analysisHistory}
            />

            <RiskFactorsCard
              riskFactors={analysis.riskFactors}
            />
          </div>

          {/* Insights */}

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-6
            "
          >
            <AIInsightsCard
              insights={analysis.insights}
            />

            <RecommendationCard
              recommendations={
                analysis.recommendations
              }
            />
          </div>

          {/* History */}

          <AnalysisHistoryTable
            history={analysisHistory}
          />
        </>
      )}
    </div>
  );
}