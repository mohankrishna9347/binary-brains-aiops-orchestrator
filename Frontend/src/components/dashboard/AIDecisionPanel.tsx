import { Brain, Zap, TrendingUp } from "lucide-react";

interface Decision {
  id: string;
  detectedIssue: string;
  decision: string;
  reason: string;
  confidence: number;
  timestamp: string;
}

export function AIDecisionPanel({ decisions }: { decisions: any }) {

  console.log("DECISIONS RECEIVED:", decisions);

  // ✅ FIX: ensure array
  const safeDecisions = Array.isArray(decisions) ? decisions : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Brain className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold">AI Decision Log</h3>
      </div>

      {safeDecisions.length === 0 && (
        <div className="text-xs text-muted-foreground">
          No AI decisions yet...
        </div>
      )}

      {safeDecisions.map((d: any) => (
        <div key={d.id} className="metric-card space-y-3">
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs text-primary">{d.id}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(d.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <Zap className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
            <p className="text-xs">
              <span className="text-muted-foreground">Detected:</span> {d.detectedIssue}
            </p>
          </div>

          <div className="flex items-start gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
            <p className="text-xs">
              <span className="text-muted-foreground">Action:</span> {d.decision}
            </p>
          </div>

          <div className="bg-secondary/50 rounded-md p-3">
            <p className="text-xs text-muted-foreground mb-1">Reasoning</p>
            <p className="text-xs leading-relaxed">{d.reason}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${d.confidence || 0}%` }}
              />
            </div>
            <span className="text-xs font-mono text-primary">
              {d.confidence || 0}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}