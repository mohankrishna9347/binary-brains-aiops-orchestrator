import { Search, AlertTriangle, FileText, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RootCause {
  id: string;
  issue: string;
  rootCause: string;
  logSummary: string;
  aiExplanation: string;
  affectedServices: string[];
  timeline: string;
}

export function RootCausePanel({ rootCauses }: { rootCauses: RootCause[] }) {
  const safeData = Array.isArray(rootCauses) ? rootCauses : [];

  console.log("ROOT CAUSES RECEIVED:", safeData);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold">Root Cause Analysis</h3>
      </div>

      {safeData.length === 0 && (
        <div className="text-xs text-muted-foreground">
          No root cause analysis available yet...
        </div>
      )}

      {safeData.map((rca) => (
        <div key={rca.id} className="metric-card space-y-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">{rca.issue}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {rca.timeline}
              </p>
            </div>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
            <p className="text-xs font-medium text-destructive mb-1">
              Root Cause
            </p>
            <p className="text-xs">{rca.rootCause}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <FileText className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">
                Log Summary
              </span>
            </div>
            <p className="text-xs font-mono bg-secondary/50 rounded p-2 leading-relaxed">
              {rca.logSummary}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Cpu className="h-3 w-3 text-primary" />
              <span className="text-xs text-muted-foreground font-medium">
                AI Explanation
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              {rca.aiExplanation}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {rca.affectedServices.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="text-[10px] font-mono"
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}