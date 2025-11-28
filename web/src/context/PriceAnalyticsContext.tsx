import { createContext, useContext, useState, ReactNode } from "react";

export type PriceAnalytics = {
  labels: string[];
  values: number[];
};

export const PriceAnalyticsContext = createContext<PriceAnalytics | null>(null);

export function usePriceAnalytics() {
  const ctx = useContext(PriceAnalyticsContext);
  if (!ctx) {
    throw new Error("usePriceAnalytics must be used inside PriceAnalyticsProvider");
  }
  return ctx;
}

// ADD THIS PROVIDER
export function PriceAnalyticsProvider({ children }: { children: ReactNode }) {
  const [analytics] = useState<PriceAnalytics>({
    labels: [],
    values: []
  });

  return (
    <PriceAnalyticsContext.Provider value={analytics}>
      {children}
    </PriceAnalyticsContext.Provider>
  );
}
