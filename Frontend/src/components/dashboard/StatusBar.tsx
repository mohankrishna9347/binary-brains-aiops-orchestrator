import { RefreshCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface StatusBarProps {
  isAutoRefresh: boolean;
  onToggle: (v: boolean) => void;
  lastUpdated: Date;
  onRefresh: () => void;
}

export function StatusBar({ isAutoRefresh, onToggle, lastUpdated, onRefresh }: StatusBarProps) {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className={`status-dot ${isAutoRefresh ? "status-dot-active" : ""}`} />
        <span>{isAutoRefresh ? "Live" : "Paused"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>Auto-refresh</span>
        <Switch checked={isAutoRefresh} onCheckedChange={onToggle} className="scale-75" />
      </div>
      <button onClick={onRefresh} className="flex items-center gap-1 hover:text-primary transition-colors">
        <RefreshCw className="h-3 w-3" /> Refresh
      </button>
      <span className="ml-auto">Updated: {lastUpdated.toLocaleTimeString()}</span>
    </div>
  );
}
