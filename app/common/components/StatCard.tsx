import React from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const getGradientClasses = (color: string) => {
  const gradientMap: Record<string, string> = {
    "text-blue-600": "from-blue-500 to-blue-600",
    "text-green-600": "from-green-500 to-green-600",
    "text-purple-600": "from-purple-500 to-purple-600",
    "text-orange-600": "from-orange-500 to-orange-600",
    "text-red-600": "from-red-500 to-red-600",
    "text-indigo-600": "from-indigo-500 to-indigo-600",
    "text-gray-600": "from-gray-500 to-gray-600",
  };
  return gradientMap[color] || "from-gray-500 to-gray-600";
};

const getIconBgClasses = (color: string) => {
  const bgMap: Record<string, string> = {
    "text-blue-600":
      "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    "text-green-600":
      "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    "text-purple-600":
      "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    "text-orange-600":
      "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
    "text-red-600": "bg-gradient-to-br from-red-50 to-red-100 border-red-200",
    "text-indigo-600":
      "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200",
    "text-gray-600":
      "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200",
  };
  return (
    bgMap[color] || "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
  );
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  color,
}) => {
  const gradientClasses = getGradientClasses(color);
  const iconBgClasses = getIconBgClasses(color);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Gradient Background Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientClasses} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative p-6 text-center">
        {/* Icon Container */}
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${iconBgClasses} border mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon
            className={`w-7 h-7 ${color} group-hover:scale-110 transition-transform duration-300`}
          />
        </div>

        {/* Value with Animation */}
        <div className="relative">
          <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
            {value}
          </div>
          {/* Animated underline */}
          <div
            className={`h-0.5 w-0 group-hover:w-8 mx-auto bg-gradient-to-r ${gradientClasses} transition-all duration-300 rounded-full`}
          />
        </div>

        {/* Label */}
        <div className="text-sm font-medium text-gray-600 mt-3 group-hover:text-gray-700 transition-colors duration-300">
          {label}
        </div>

        {/* Subtle pulse effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${gradientClasses} rounded-2xl opacity-0 group-hover:opacity-10 blur transition-all duration-300 -z-10`}
        />
      </div>
    </div>
  );
};
