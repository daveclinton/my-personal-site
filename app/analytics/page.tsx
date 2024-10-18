import GlobeAllCities from "@/components/AnalyticsGlobe/Globe";
import portfolioVisits from "@/utils/sampleData";

const AnalyticsPage = () => {
  return <GlobeAllCities data={portfolioVisits} />;
};

export default AnalyticsPage;
