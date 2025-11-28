type InsightItem = {
  value: number;
  label: string;
  color: "blue" | "green" | "red" | "yellow" | "purple" | "orange";
};

type QuickInsightsProps = {
  title?: string;
  insights: InsightItem[];
};

const colorConfig = {
  blue: "text-blue-600",
  green: "text-green-600",
  red: "text-red-600",
  yellow: "text-yellow-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
};

export const QuickInsights = ({
  title = "Quick Insights",
  insights,
}: QuickInsightsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div
        className={`grid grid-cols-1 ${
          insights.length <= 3
            ? `md:grid-cols-${insights.length}`
            : "md:grid-cols-3 lg:grid-cols-4"
        } gap-4`}
      >
        {insights.map((insight, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className={`text-2xl font-bold ${colorConfig[insight.color]}`}>
              {insight.value}
            </div>
            <div className="text-sm text-gray-600">{insight.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
