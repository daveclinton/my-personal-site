import GlobeAllCities from "@/components/AnalyticsGlobe/Globe";
import portfolioVisits from "@/utils/sampleData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "David Clinton's Portfolio Analytics",
  description: "Explore the analytics of my portfolio",
  openGraph: {
    title: "David Clinton's Analytics",
    description: "Explore the analytics of my portfolio",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
    siteName: "David Clinton's Site",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=David Clinton's Projects`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Clinton's Portfolio Analytics",
    description: "Explore the analytics of my portfolio",
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=David Clinton's Projects`,
    ],
  },
};

const AnalyticsPage = () => {
  return <GlobeAllCities data={portfolioVisits} />;
};

export default AnalyticsPage;
