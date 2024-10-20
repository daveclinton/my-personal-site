/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Loader2 } from "lucide-react";
import geoJsonData from "@/utils/globe.geojson.json";
import { useGlobeStore } from "@/store/globeData";

const Globe = React.lazy(() => import("react-globe.gl"));

const GlobeComponent = () => {
  const [globeSize, setGlobeSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  const globeRef = useRef<any>(null);

  const { pointsData, loading, fetchPointsData } = useGlobeStore();

  const onGlobeReady = useCallback(() => {
    setGlobeReady(true);
    if (globeRef.current) {
      const globeScene = globeRef.current.scene();
      const globeCamera = globeRef.current.camera();
      let frame: number;

      globeCamera.position.z = 250;

      const rotateGlobe = () => {
        globeScene.rotation.y += 0.01;
        frame = requestAnimationFrame(rotateGlobe);
      };

      rotateGlobe();

      return () => {
        cancelAnimationFrame(frame);
      };
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      const container = document.getElementById("globe-container");
      if (container) {
        const width = container.offsetWidth;
        const height = Math.min(width, window.innerHeight * 0.7);
        setGlobeSize({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchPointsData();
  }, [fetchPointsData]);

  return (
    <div
      id="globe-container"
      className="relative flex justify-center items-center"
      style={{ height: `${globeSize.height}px` }}
    >
      {(!globeReady || loading) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-pink-900 animate-spin" />
        </div>
      )}
      {isMounted && (
        <div
          className={`transition-opacity duration-1000 ${
            globeReady && !loading ? "opacity-100" : "opacity-0"
          }`}
        >
          <Globe
            ref={globeRef}
            pointsData={pointsData}
            width={globeSize.width}
            height={globeSize.height}
            polygonsData={geoJsonData.features}
            backgroundColor="#1c1c20"
            onGlobeReady={onGlobeReady}
            showGraticules={true}
            polygonCapColor={() => "#E90074"}
            polygonSideColor={() => "#FEF9F2"}
            polygonAltitude={0.01}
            atmosphereColor="#E90074"
            pointAltitude="size"
            pointColor="color"
            pointLabel="label"
            pointRadius={0.5}
          />
        </div>
      )}
    </div>
  );
};

export default GlobeComponent;
