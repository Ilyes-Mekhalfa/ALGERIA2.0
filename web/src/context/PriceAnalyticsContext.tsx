import { createContext, useContext, ReactNode } from "react";
// reuse the hook implementation which already fetches analytics and provides mock fallback
import usePriceAnalyticsHook, { PriceAnalytics as HookPriceAnalytics } from "../hooks/usePriceAnalytics";

export type PriceAnalytics = HookPriceAnalytics;

export const PriceAnalyticsContext = createContext<PriceAnalytics | null>(null);

export function usePriceAnalytics() {
  const ctx = useContext(PriceAnalyticsContext);
  if (!ctx) {
    throw new Error("usePriceAnalytics must be used inside PriceAnalyticsProvider");
  }
  return ctx;
}

// Provider now uses the hook (react-query) to populate analytics so components using the context
// get live data from the backend with the existing mock fallback in the hook.
export function PriceAnalyticsProvider({ children }: { children: ReactNode }) {
  const { data } = usePriceAnalyticsHook();

  const analytics: PriceAnalytics = data ?? { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], values: [60, 70, 65, 80, 75, 85] };

  return (
    <PriceAnalyticsContext.Provider value={analytics}>
      {children}
    </PriceAnalyticsContext.Provider>
  );
}
