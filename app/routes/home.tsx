import { Link } from "react-router";
import { Plus, ListTodo } from "lucide-react";
import { ClientOnly } from "../common/components/ClientOnly";
import { StatCard } from "../common/components/StatCard";
import { FeatureCard } from "../common/components/FeatureCard";
import { useTodos } from "../common/hooks/useTodos";
import {
  HOME_FEATURES,
  createHomeStatsConfig,
  PAGE_CONTENT,
} from "../common/constants";

export default function HomePage() {
  const { stats: todoStats } = useTodos();

  const features = HOME_FEATURES;
  const stats = createHomeStatsConfig(todoStats);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {PAGE_CONTENT.HOME.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {PAGE_CONTENT.HOME.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/todos"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ListTodo className="w-6 h-6 mr-2" />
                Get Started
              </Link>
              <Link
                to="/todos/new"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-all duration-200"
              >
                <Plus className="w-6 h-6 mr-2" />
                Create Todo
              </Link>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {PAGE_CONTENT.HOME.overview_title}
          </h2>
          <p className="text-lg text-gray-600">
            {PAGE_CONTENT.HOME.overview_subtitle}
          </p>
        </div>
        <ClientOnly>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
        </ClientOnly>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {PAGE_CONTENT.HOME.features_title}
          </h2>
          <p className="text-lg text-gray-600">
            {PAGE_CONTENT.HOME.features_subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {PAGE_CONTENT.HOME.cta_title}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {PAGE_CONTENT.HOME.cta_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/todos"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <ListTodo className="w-5 h-5 mr-2" />
              View All Todos
            </Link>
            <Link
              to="/todos/new"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Todo
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {PAGE_CONTENT.HOME.footer_title}
          </h3>
          <p className="text-gray-400 mb-6">
            {PAGE_CONTENT.HOME.footer_subtitle}
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              to="/todos"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Todos
            </Link>
            <Link
              to="/todos/new"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Create
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
