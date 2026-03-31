import { RemediationPanel } from "@/components/dashboard/RemediationPanel";
import { getRemediations } from "@/services/mockData";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

export default function RemediationPage() {
  const remediations = useAutoRefresh(getRemediations, 5000);

  if (!remediations.data) {
    return <div className="p-6 text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Remediation</h2>
        <p className="text-xs text-muted-foreground">
          Automated recovery actions executed by AI agents
        </p>
      </div>

      <RemediationPanel remediations={remediations.data} />
    </div>
  );
}