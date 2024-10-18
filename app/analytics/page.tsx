import AnalyticsGlobe from "@/components/AnalyticsGlobe/AnalyticsGlobe";
import MetricCard from "@/components/MetricsCard";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl">THIS PAGE IS A WORK IN PROGRESS</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex">
          <MetricCard />
        </div>
        <div className="flex">
          <AnalyticsGlobe />
        </div>
      </div>
    </div>
  );
}
