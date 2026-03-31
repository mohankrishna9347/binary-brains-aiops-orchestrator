import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "success" | "warning" | "destructive";
}

const variantStyles = {
  default: "text-primary",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
};

export function MetricCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
        <Icon className={`h-4 w-4 ${variantStyles[variant]}`} />
      </div>
      <div className={`text-2xl font-semibold font-mono ${variantStyles[variant]}`}>{value}</div>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {trend === "up" && <span className="text-destructive">↑</span>}
          {trend === "down" && <span className="text-success">↓</span>}
          {subtitle}
        </p>
      )}
    </div>
  );
}
