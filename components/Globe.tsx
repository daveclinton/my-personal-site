/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";

interface Props {
  data: any;
  width?: number;
  height?: number;
}

const GlobeAllCities: React.FC<Props> = ({
  data,
  width = 390,
  height = 458,
  // mobile
  // width = 360,
  // height = 438,
}) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let world: any;

    const initGlobe = async () => {
      const geoJson = await import("../utils/globe.geojson.json");
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
      world = Globe({
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
        .pointColor("color")(globeRef.current!);
      const orbitControls = world.controls();
      orbitControls.autoRotate = true;
      orbitControls.enableZoom = false;
    };

    if (globeRef.current) {
      initGlobe();
    }

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        world.controls().autoRotate = true;
      } else {
        world.controls().autoRotate = false;
      }
    };
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [data, width, height]);

  return (
    <div className="rounded-lg bg-[#1F1F22] shadow-lg overflow-hidden">
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-white">My Global Reach</h2>
        <p className="mt-1 text-sm text-gray-400">
          Visualizing my worldwide impact
        </p>
      </div>
      {!isLoaded && (
        <div className="flex items-center flex-col p-10">
          <FancyLoadingIndicator />
        </div>
      )}
      <div
        ref={globeRef}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
};

export default GlobeAllCities;

function FancyLoadingIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + Math.random() * 10, 100);
        if (newProgress === 100) {
          clearInterval(timer);
        }
        return newProgress;
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
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
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="mt-8 flex space-x-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: `${index * 0.15}s` }}
          />
        ))}
      </div>
    </React.Fragment>
  );
}
