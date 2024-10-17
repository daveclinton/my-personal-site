import GlobeAllCities from "@/components/Globe";
import MetricCard from "@/components/MetricsCard";
import portfolioVisits from "@/utils/sampleData";

const AnalyticsPage = () => {
  return (
    <div className="container mx-auto">
      <div className="grid gap-8 lg:grid-cols-2">
        <GlobeAllCities data={portfolioVisits} />
        <MetricCard />
      </div>
    </div>
  );
};

export default AnalyticsPage;
