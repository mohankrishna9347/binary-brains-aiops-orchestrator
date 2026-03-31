import { useState, useEffect, useCallback } from "react";

export function useAutoRefresh<T>(fetchFn: () => Promise<T>, intervalMs = 5000) {
  const [data, setData] = useState<T | null>(null);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refresh = useCallback(async () => {
    try {
      const result = await fetchFn();   // ✅ WAIT for API
      console.log("AUTO REFRESH RESULT:", result);
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("AUTO REFRESH ERROR:", err);
    }
  }, [fetchFn]);

  useEffect(() => {
    refresh(); // initial load

    if (!isAutoRefresh) return;

    const id = setInterval(refresh, intervalMs);
    return () => clearInterval(id);
  }, [isAutoRefresh, intervalMs, refresh]);

  return { data, isAutoRefresh, setIsAutoRefresh, lastUpdated, refresh };
}