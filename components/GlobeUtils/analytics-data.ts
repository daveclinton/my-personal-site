"use client";
import * as THREE from "three";

function AnalyticsGlobeData() {
  const newMaterial = new THREE.MeshBasicMaterial();
  newMaterial.color = new THREE.Color("#dcdcdc");

  return { newMaterial };
}

export default AnalyticsGlobeData;
