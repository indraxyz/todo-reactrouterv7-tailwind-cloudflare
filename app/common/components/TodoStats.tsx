import { TodoStatCard } from "./TodoStatCard";
import { ProgressBar } from "./ProgressBar";
import { QuickInsights } from "./QuickInsights";
import { TODO_STAT_CARDS } from "../constants";

type TodoStatsProps = {
  stats: {
    total: number;
    pending: number;
    progress: number;
    completed: number;
    cancelled: number;
  };
};

export const TodoStats = ({ stats }: TodoStatsProps) => {
  const getCompletionRate = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  };

  const getProgressRate = () => {
    if (stats.total === 0) return 0;
    return Math.round(((stats.completed + stats.progress) / stats.total) * 100);
  };

  const statCards = TODO_STAT_CARDS.map((card) => ({
    ...card,
    value: stats[card.field],
  }));

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {statCards.map((stat) => (
          <TodoStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            textColor={stat.textColor}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressBar
          title="Completion Rate"
          percentage={getCompletionRate()}
          color="green"
          description={`${stats.completed} of ${stats.total} todos completed`}
        />
        <ProgressBar
          title="Progress Rate"
          percentage={getProgressRate()}
          color="blue"
          description={`${stats.completed + stats.progress} of ${
            stats.total
          } todos in progress or completed`}
        />
      </div>

      {/* Quick Insights */}
      <div className="mt-6">
        <QuickInsights
          insights={[
            {
              value: stats.pending,
              label: "Need Attention",
              color: "blue",
            },
            {
              value: stats.completed,
              label: "Successfully Done",
              color: "green",
            },
            {
              value: stats.cancelled,
              label: "Cancelled",
              color: "red",
            },
          ]}
        />
      </div>
    </div>
  );
};
