import { Server, AlertTriangle, Brain, Search, Wrench, BarChart3, Activity } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import { getMetrics } from "@/services/mockData";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Alerts & Incidents", url: "/alerts", icon: AlertTriangle },
  { title: "AI Decisions", url: "/decisions", icon: Brain },
  { title: "Root Cause Analysis", url: "/root-cause", icon: Search },
  { title: "Remediation", url: "/remediation", icon: Wrench },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  // ✅ FIX: Hook moved inside component
  const metrics = useAutoRefresh(getMetrics, 5000);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary shrink-0" />
          {!collapsed && (
            <div>
              <h1 className="text-sm font-semibold text-sidebar-accent-foreground">
                AIOps
              </h1>
              <p className="text-[10px] text-sidebar-foreground">
                Operations Orchestrator
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2">
            <Server className="h-3.5 w-3.5 text-success" />
            <span className="text-[10px] text-sidebar-foreground">
              {metrics.data?.overview?.totalServers ?? 0} servers monitored
              <span className="ml-2 text-success">● Live</span>
            </span>
          </div>
        </div>
      )}
    </Sidebar>
  );
}