import { RootCausePanel } from "@/components/dashboard/RootCausePanel";
import { getRootCauses } from "@/services/mockData";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

export default function RootCausePage() {

  // ✅ USE AUTO REFRESH (IMPORTANT)
  const rootCauses = useAutoRefresh(getRootCauses, 5000);

  // ✅ Prevent crash
  if (!rootCauses.data) {
    return <div className="p-6 text-sm text-muted-foreground">Loading root causes...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Root Cause Analysis</h2>
        <p className="text-xs text-muted-foreground">
          AI-powered deep analysis of infrastructure issues
        </p>
      </div>

      {/* ✅ FIXED HERE */}
      <RootCausePanel rootCauses={rootCauses.data || []} />
    </div>
  );
}