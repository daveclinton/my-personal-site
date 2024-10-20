import { create } from "zustand";

type SlugData = {
  name: string;
  value: number;
}[];

interface PortfolioState {
  slugData: SlugData;
  loading: boolean;
  error: string | null;
  fetchSlugData: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  slugData: [],
  loading: true,
  error: null,
  fetchSlugData: async () => {
    try {
      const response = await fetch("/api/getSlugData");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SlugData = await response.json();
      set({ slugData: data, loading: false });
    } catch (e) {
      console.error("Failed to fetch slug data:", e);
      set({
        error: e instanceof Error ? e.message : "An unknown error occurred",
        loading: false,
      });
    }
  },
}));
