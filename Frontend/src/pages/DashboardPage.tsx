import { Server, AlertTriangle, ShieldAlert, HeartPulse } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { LiveCharts } from "@/components/dashboard/LiveCharts";
import { IncidentsTable } from "@/components/dashboard/IncidentsTable";
import { StatusBar } from "@/components/dashboard/StatusBar";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import { getMetrics, getIncidents } from "@/services/mockData";

export default function DashboardPage() {
  const metrics = useAutoRefresh(getMetrics, 5000);
  const incidents = useAutoRefresh(getIncidents, 10000);

  // ✅ Safe fallback
  const overview = metrics.data?.overview || {
    totalServers: 0,
    activeAlerts: 0,
    anomaliesDetected: 0,
    healthyPercent: 0,
  };

  const timeSeries = metrics.data?.timeSeries || [];
  const incidentsData = incidents.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">System Overview</h2>
          <p className="text-xs text-muted-foreground">
            Real-time infrastructure monitoring
          </p>
        </div>

        <StatusBar
          isAutoRefresh={metrics.isAutoRefresh}
          onToggle={metrics.setIsAutoRefresh}
          lastUpdated={metrics.lastUpdated}
          onRefresh={metrics.refresh}
        />
      </div>

      {/* ✅ NO CRASH HERE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Servers"
          value={overview.totalServers}
          icon={Server}
          variant="default"
        />

        <MetricCard
          title="Active Alerts"
          value={overview.activeAlerts}
          icon={AlertTriangle}
          variant="warning"
          trend="up"
          subtitle="Live alerts"
        />

        <MetricCard
          title="Anomalies"
          value={overview.anomaliesDetected}
          icon={ShieldAlert}
          variant="destructive"
        />

        <MetricCard
          title="Healthy"
          value={`${overview.healthyPercent}%`}
          icon={HeartPulse}
          variant="success"
          subtitle="Above threshold"
        />
      </div>

      {/* ✅ Safe chart */}
      <LiveCharts data={timeSeries} />

      {/* ✅ Safe table */}
      <IncidentsTable incidents={incidentsData} />
    </div>
  );
}