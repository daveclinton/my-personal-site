/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import MetricCard from "../MetricsCard";

interface Props {
  data: any;
  width?: number;
  height?: number;
}

const GlobeAllCities: React.FC<Props> = ({
  data,
  width = 390,
  height = 458,
}) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const initGlobe = useCallback(async () => {
    const geoJson = await import("@/utils/globe.geojson.json");
    const GlobeModule = await import("globe.gl");
    const Globe = GlobeModule.default;
    const THREE = await import("three");

    const points = data.map((item: any) => ({
      lat: item.latitude,
      lng: item.longitude,
      altitude: Math.min(0.8, Math.max(0.01, item.visits / 1000)),
      radius: 0.3,
      color: "#ff69b4",
    }));

    const world = Globe({
      animateIn: true,
      rendererConfig: { antialias: true, alpha: true },
    })
      .onGlobeReady(() => setIsLoaded(true))
      .pointOfView({
        lat: 19.054339351561637,
        lng: -50.421161072148465,
        altitude: 1.8,
      })
      .pointsMerge(true)
      .width(width)
      .height(height)
      .backgroundColor("rgba(0,0,0,0)")
      .globeMaterial(
        new THREE.MeshPhongMaterial({
          color: "#f0f0f0",
          transparent: true,
          opacity: 0.95,
        })
      )
      .customLayerData(
        [...Array(500)].map(() => ({
          lat: (Math.random() - 0.5) * 180,
          lng: (Math.random() - 0.5) * 360,
          alt: Math.random() * 1.4 + 0.1,
        }))
      )
      .customThreeObject(() => {
        return new THREE.Mesh(
          new THREE.SphereGeometry(0.3),
          new THREE.MeshBasicMaterial({
            color: "#ffffff",
            opacity: 0.8,
            transparent: true,
          })
        );
      })
      .customThreeObjectUpdate((obj: any, d: any) => {
        Object.assign(obj.position, world.getCoords(d.lat, d.lang, d.alt));
      })
      .atmosphereColor("#ff69b4")
      .atmosphereAltitude(0.25)
      .hexPolygonsData(geoJson.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.4)
      .hexPolygonColor(() => "#4a0e39")
      .showGraticules(true)
      .pointsData(points)
      .pointAltitude("altitude")
      .pointColor("color");

    if (globeRef.current) {
      world(globeRef.current);
    }

    const orbitControls = world.controls();
    orbitControls.autoRotate = true;
    orbitControls.enableZoom = false;

    return world;
  }, [data, width, height]);

  useEffect(() => {
    let world: any;

    const loadGlobe = async () => {
      world = await initGlobe();

      const handleVisibility = () => {
        if (document.visibilityState === "visible") {
          world.controls().autoRotate = true;
        } else {
          world.controls().autoRotate = false;
        }
      };

      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibility);
      };
    };

    loadGlobe();
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(loadingInterval);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => {
      clearInterval(loadingInterval);
    };
  }, [initGlobe]);

  return (
    <div className="container mx-auto">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-5">
            <h2 className="text-2xl font-bold text-white">My Global Reach</h2>
            <p className="mt-1 text-sm text-gray-400">
              Visualizing my worldwide impact
            </p>
          </div>
          {!isLoaded && (
            <InteractiveLoadingIndicator progress={loadingProgress} />
          )}
          <div
            ref={globeRef}
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        </div>
        <MetricCard />
      </div>
    </div>
  );
};

export default GlobeAllCities;

const InteractiveLoadingIndicator: React.FC<{ progress: number }> = ({
  progress,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-pink-300">
            Loading Globe Data
          </span>
          <span className="text-sm font-medium text-pink-300">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="mt-8 flex space-x-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-4 h-4 bg-pink-500 rounded-full animate-pulse"
            style={{
              animationDuration: `${1 + index * 0.2}s`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
