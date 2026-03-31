import { Wrench, CheckCircle, XCircle, Clock } from "lucide-react";

interface Remediation {
  id: string;
  action: string;
  target: string;
  status: "success" | "failed";
  executionTime: string;
  timestamp: string;
}

export function RemediationPanel({ remediations }: { remediations: any[] }) {
  const safeData = Array.isArray(remediations) ? remediations : [];

  console.log("REMEDIATIONS RECEIVED:", safeData);

  return (
    <div className="space-y-4">
      {safeData.length === 0 && (
        <div className="text-xs text-muted-foreground">
          No remediation actions yet...
        </div>
      )}

      {safeData.map((r) => (
        <div key={r.id} className="metric-card">
          <p className="text-sm font-medium">{r.server}</p>
          <p className="text-xs">Action: {r.action}</p>
          <p className="text-xs">Impact: {r.impact}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(r.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}