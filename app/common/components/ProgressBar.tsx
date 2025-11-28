type ProgressBarProps = {
  title: string;
  percentage: number;
  color: "green" | "blue" | "purple" | "orange";
  description: string;
};

const colorConfig = {
  green: {
    text: "text-green-600",
    bg: "bg-green-500",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-500",
  },
  purple: {
    text: "text-purple-600",
    bg: "bg-purple-500",
  },
  orange: {
    text: "text-orange-600",
    bg: "bg-orange-500",
  },
};

export const ProgressBar = ({
  title,
  percentage,
  color,
  description,
}: ProgressBarProps) => {
  const colors = colorConfig[color];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span className={`text-2xl font-bold ${colors.text}`}>
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${colors.bg} h-3 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
};
