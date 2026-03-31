import { Badge } from "@/components/ui/badge";

interface Incident {
  id: string;
  server: string;
  issue: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "active" | "resolved" | "investigating";
  timestamp: string;
}

const severityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  low: "secondary",
  medium: "outline",
  high: "destructive",
  critical: "destructive",
};

const severityClass: Record<string, string> = {
  low: "",
  medium: "border-warning text-warning",
  high: "",
  critical: "animate-pulse",
};

const statusDot: Record<string, string> = {
  active: "status-dot-critical",
  resolved: "status-dot-active",
  investigating: "status-dot-warning",
};

export function IncidentsTable({ incidents }: { incidents: Incident[] | any }) {
  // ✅ CRITICAL FIX — ensure always array
  const safeIncidents: Incident[] = Array.isArray(incidents) ? incidents : [];

  // 🧪 Debug (remove later)
  console.log("Incidents received:", safeIncidents);

  return (
    <div className="metric-card overflow-hidden p-0">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold">Alerts & Incidents</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left p-3 font-medium">ID</th>
              <th className="text-left p-3 font-medium">Server</th>
              <th className="text-left p-3 font-medium">Issue</th>
              <th className="text-left p-3 font-medium">Severity</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Time</th>
            </tr>
          </thead>

          <tbody>
            {/* ✅ EMPTY STATE (VERY IMPORTANT) */}
            {safeIncidents.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-muted-foreground">
                  No incidents detected
                </td>
              </tr>
            ) : (
              safeIncidents.map((inc) => (
                <tr
                  key={inc.id}
                  className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                >
                  <td className="p-3 font-mono text-primary">{inc.id}</td>
                  <td className="p-3 font-mono">{inc.server}</td>
                  <td className="p-3">{inc.issue}</td>

                  <td className="p-3">
                    <Badge
                      variant={severityVariant[inc.severity] || "default"}
                      className={severityClass[inc.severity] || ""}
                    >
                      {inc.severity}
                    </Badge>
                  </td>

                  <td className="p-3">
                    <span className="flex items-center gap-2">
                      <span className={`status-dot ${statusDot[inc.status] || ""}`} />
                      {inc.status}
                    </span>
                  </td>

                  <td className="p-3 text-muted-foreground">
                    {inc.timestamp
                      ? new Date(inc.timestamp).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}