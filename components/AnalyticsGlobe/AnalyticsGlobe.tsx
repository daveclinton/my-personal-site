"use client";
import Globe from "react-globe.gl";
import data from "@/utils/geoData.json";
import AnalyticsGlobeData from "./AnalyticsGlobeData";
import { useRef } from "react";
import useGlobeWidth from "@/hooks/useGlobeWidth";

const AnalyticsGlobe: React.FC = () => {
  const { arcsData, newMaterial, globeRef } = AnalyticsGlobeData();
  const containerRef = useRef<HTMLDivElement>(null);

  const { globeWidth } = useGlobeWidth();

  return (
    <div ref={containerRef} className="w-full h-full">
      <Globe
        ref={globeRef}
        width={globeWidth}
        height={globeWidth}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={newMaterial}
        arcsData={arcsData}
        arcColor={["#fce28b", "#fabc34", "#d87007"]}
        arcStroke={1}
        arcDashLength={1}
        arcDashGap={() => Math.random() * 3}
        arcDashAnimateTime={2000}
        hexPolygonsData={data.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonColor={() => "#357af9"}
        animateIn={false}
        atmosphereColor="#357af9"
      />
    </div>
  );
};

export default AnalyticsGlobe;
