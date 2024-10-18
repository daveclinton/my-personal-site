/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import type { GeoJsonObject } from "geojson";
import type * as THREE from "three";
interface CityData {
  latitude: number;
  longitude: number;
  visits: number;
}

interface Props {
  data: CityData[];
  width?: number;
  height?: number;
}

const GlobeAllCities: React.FC<Props> = ({
  data,
  width = 390,
  height = 458,
}) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initGlobe = useCallback(async () => {
    try {
      const [geoJson, GlobeModule, THREE] = await Promise.all([
        import("../utils/globe.geojson.json") as Promise<GeoJsonObject>,
        import("globe.gl"),
        import("three"),
      ]);

      const Globe = GlobeModule.default;

      const points = data.map((item) => ({
        lat: item.latitude,
        lng: item.longitude,
        altitude: Math.min(0.8, Math.max(0.01, item.visits / 1000)),
        radius: 0.3,
        color: "#ff69b4",
      }));

      worldRef.current = Globe({
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
          Array.from({ length: 500 }, () => ({
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360,
            alt: Math.random() * 1.4 + 0.1,
          }))
        )
        .customThreeObject(
          () =>
            new THREE.Mesh(
              new THREE.SphereGeometry(0.3),
              new THREE.MeshBasicMaterial({
                color: "#ffffff",
                opacity: 0.8,
                transparent: true,
              })
            )
        )
        .customThreeObjectUpdate((obj: THREE.Object3D, d: any) => {
          Object.assign(
            obj.position,
            worldRef.current.getCoords(d.lat, d.lng, d.alt)
          );
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

      worldRef.current(globeRef.current!);
      const orbitControls = worldRef.current.controls();
      orbitControls.autoRotate = true;
      orbitControls.enableZoom = false;
    } catch (err) {
      console.error("Error initializing globe:", err);
      setError("Failed to initialize globe visualization");
    }
  }, [data, width, height]);

  useEffect(() => {
    if (globeRef.current) {
      initGlobe();
    }

    const handleVisibility = () => {
      if (worldRef.current) {
        worldRef.current.controls().autoRotate =
          document.visibilityState === "visible";
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (worldRef.current) {
        worldRef.current.dispose();
      }
    };
  }, [initGlobe]);

  return (
    <div className="rounded-lg bg-[#1F1F22] shadow-lg overflow-hidden">
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-white">My Global Reach</h2>
        <p className="mt-1 text-sm text-gray-400">
          Visualizing my worldwide impact
        </p>
      </div>
      {error && (
        <div className="flex items-center justify-center p-10 text-red-500">
          <p>{error}</p>
        </div>
      )}
      {!isLoaded && !error && (
        <div className="flex items-center justify-center p-10">
          <Loader2 className="mr-2 h-6 w-6 animate-spin text-white" />
          <p className="text-white">Initializing globe...</p>
        </div>
      )}
      <div
        ref={globeRef}
        style={{ width: `${width}px`, height: `${height}px` }}
        className={`bg-[#1F1F22] ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      />
    </div>
  );
};

export default GlobeAllCities;
