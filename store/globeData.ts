/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface GlobeState {
  pointsData: any[];
  loading: boolean;
  fetchPointsData: () => Promise<void>;
}

export const useGlobeStore = create<GlobeState>((set) => ({
  pointsData: [],
  loading: false,
  fetchPointsData: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/geoLocationData");
      if (!response.ok) {
        throw new Error("Failed to fetch geolocation data");
      }
      const data = await response.json();
      set({ pointsData: data, loading: false });
    } catch (error) {
      console.error("Failed to fetch geolocation data:", error);
      set({ loading: false });
    }
  },
}));
