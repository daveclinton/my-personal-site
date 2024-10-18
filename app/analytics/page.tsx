import MetricCard from "@/components/MetricsCard";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/AnalyticsGlobe/AnalyticsGlobe"),
  { ssr: false }
);

const AnalyticsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl">THIS PAGE IS A WORK IN PROGRESS</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex">
          <MetricCard />
        </div>
        <div className="flex">
          <DynamicComponentWithNoSSR />
        </div>
      </div>
    </div>
  );
};
export default AnalyticsPage;
