import { AIDecisionPanel } from "@/components/dashboard/AIDecisionPanel";
import { getDecisions } from "@/services/mockData";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

export default function DecisionsPage() {
  const decisions = useAutoRefresh(getDecisions, 5000);

  // ✅ IMPORTANT FIX
  if (!decisions.data) {
    return <div className="p-6 text-sm text-muted-foreground">Loading AI decisions...</div>;
  }

  return (
    <div className="p-6">
      <AIDecisionPanel decisions={decisions.data} />
    </div>
  );
}
