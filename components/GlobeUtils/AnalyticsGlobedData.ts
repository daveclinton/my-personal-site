"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { GlobeMethods } from "react-globe.gl";

function AnalyticsGlobeData() {
  const globeRef = useRef<GlobeMethods>();
  const N = 15;
  const arcsData = Array.from({ length: N }, () => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
  }));

  const newMaterial = new THREE.MeshBasicMaterial();
  newMaterial.color = new THREE.Color("#fff");

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 2;
      globeRef.current.controls().enableZoom = false;
    }
  }, []);

  return { arcsData, newMaterial, globeRef };
}

export default AnalyticsGlobeData;
