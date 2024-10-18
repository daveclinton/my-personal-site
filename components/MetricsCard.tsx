/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Users,
  Eye,
  Star,
  MessageCircle,
} from "lucide-react";

const metrics = [
  {
    name: "Total Users",
    value: "8,821",
    change: "+12.3%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Page Views",
    value: "1.2M",
    change: "+8.1%",
    trend: "up",
    icon: Eye,
  },
  {
    name: "Projects Completed",
    value: "142",
    change: "+28.5%",
    trend: "up",
    icon: Star,
  },
  {
    name: "Client Messages",
    value: "382",
    change: "-3.7%",
    trend: "down",
    icon: MessageCircle,
  },
];

function MetricItem({ metric }: any) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <span className="rounded-full bg-pink-900 p-2 text-pink-200">
          <metric.icon className="h-6 w-6" />
        </span>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-400">{metric.name}</p>
          <p className="text-2xl font-semibold text-white">{metric.value}</p>
        </div>
      </div>
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${
          metric.trend === "up"
            ? "bg-green-900 text-green-200"
            : "bg-red-900 text-red-200"
        }`}
      >
        {metric.trend === "up" ? (
          <ArrowUpIcon className="mr-1 h-4 w-4" />
        ) : (
          <ArrowDownIcon className="mr-1 h-4 w-4" />
        )}
        {metric.change}
      </span>
    </div>
  );
}

export default function MetricCard() {
  return (
    <div className="rounded-lg bg-[#1F1F22] max-h-[490px] shadow-lg">
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-white">Portfolio Metrics</h2>
        <p className="mt-1 text-sm text-gray-400">
          Key performance indicators for my projects and client interactions.
        </p>
      </div>
      <div className="divide-y divide-gray-800">
        {metrics.map((metric) => (
          <MetricItem key={metric.name} metric={metric} />
        ))}
      </div>
    </div>
  );
}
