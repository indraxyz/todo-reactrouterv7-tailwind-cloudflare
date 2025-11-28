import React from "react";
import type { LucideIcon } from "lucide-react";

interface TodoStatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  textColor: string;
  bgColor: string;
}

export const TodoStatCard: React.FC<TodoStatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  textColor,
  bgColor,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center ">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`size-8 ${textColor}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};
