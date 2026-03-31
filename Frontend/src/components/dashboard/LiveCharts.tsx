import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface ChartData {
  time: string;
  cpu: number;
  memory: number;
  network: number;
  disk: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-xs font-mono" style={{ color: p.color }}>
          {p.name}: {p.value}{p.name === "network" ? " Mbps" : "%"}
        </p>
      ))}
    </div>
  );
};

function MiniChart({ data, dataKey, color, label, unit }: { data: ChartData[]; dataKey: string; color: string; label: string; unit: string }) {
  const currentVal = data[data.length - 1]?.[dataKey as keyof ChartData] ?? 0;
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-sm font-mono" style={{ color }}>{String(currentVal)}{unit}</span>
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 20% 16%)" />
          <XAxis dataKey="time" hide />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#grad-${dataKey})`} strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LiveCharts({ data }: { data: ChartData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MiniChart data={data} dataKey="cpu" color="hsl(173 80% 50%)" label="CPU Usage" unit="%" />
      <MiniChart data={data} dataKey="memory" color="hsl(210 100% 60%)" label="Memory Usage" unit="%" />
      <MiniChart data={data} dataKey="network" color="hsl(270 70% 60%)" label="Network Traffic" unit=" Mbps" />
      <MiniChart data={data} dataKey="disk" color="hsl(38 92% 55%)" label="Disk Usage" unit="%" />
    </div>
  );
}
