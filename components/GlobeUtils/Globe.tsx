/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

import { Loader2 } from "lucide-react";

const Globe = React.lazy(() => import("react-globe.gl"));

const GlobeComponent = () => {
  const [globeSize, setGlobeSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  const globeRef = useRef<any>(null);

  const onGlobeReady = useCallback(() => {
    setGlobeReady(true);
    if (globeRef.current) {
      const globeScene = globeRef.current.scene();
      const globeCamera = globeRef.current.camera();
      let frame: number;

      globeCamera.position.z = 300;

      const rotateGlobe = () => {
        globeScene.rotation.y += 0.005;
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

  const data = [
    {
      lat: 29.953204744601763,
      lng: -90.08925929478903,
      altitude: 0.4,
      color: "#00ff33",
    },
  ];

  return (
    <div
      id="globe-container"
      className="relative flex justify-center items-center"
      style={{ height: `${globeSize.height}px` }}
    >
      {!globeReady ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-pink-900 animate-spin" />
        </div>
      ) : null}
      {isMounted && (
        <div
          className={`transition-opacity duration-1000 ${
            globeReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <Globe
            ref={globeRef}
            pointsData={data}
            width={globeSize.width}
            height={globeSize.height}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            onGlobeReady={onGlobeReady}
          />
        </div>
      )}
    </div>
  );
};

export default GlobeComponent;
