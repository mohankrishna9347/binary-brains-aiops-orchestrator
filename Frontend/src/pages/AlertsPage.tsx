import { IncidentsTable } from "@/components/dashboard/IncidentsTable";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import { getIncidents } from "@/services/mockData";
import { StatusBar } from "@/components/dashboard/StatusBar";

export default function AlertsPage() {
  const { data, isAutoRefresh, setIsAutoRefresh, lastUpdated, refresh } = useAutoRefresh(getIncidents, 10000);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Alerts & Incidents</h2>
          <p className="text-xs text-muted-foreground">All infrastructure alerts and incident tracking</p>
        </div>
        <StatusBar isAutoRefresh={isAutoRefresh} onToggle={setIsAutoRefresh} lastUpdated={lastUpdated} onRefresh={refresh} />
      </div>
      <IncidentsTable incidents={data} />
    </div>
  );
}
