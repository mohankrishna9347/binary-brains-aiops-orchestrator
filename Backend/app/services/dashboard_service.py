import json
import random

from app.services.cloudwatch_service import get_cpu_utilization
from app.services.incident_service import create_incident, resolve_incident
from app.services.ai_agent import analyze_issue
from app.services.remediation_service import restart_instance


def get_dashboard_data():
    with open("app/data/mock_servers.json") as f:
        servers = json.load(f)

    dashboard = []

    for server in servers:
        cpu_data = get_cpu_utilization(server["instance_id"])

        # ✅ Get peak CPU (better for demo)
        latest_cpu = 0
        if "data" in cpu_data and cpu_data["data"]:
            latest_cpu = max(point["value"] for point in cpu_data["data"])

        # ✅ Simulated metrics
        memory = round(random.uniform(40, 90), 2)
        disk = round(random.uniform(30, 80), 2)
        network = round(random.uniform(100, 300), 2)

        # ✅ AI Analysis
        ai_result = analyze_issue(latest_cpu, server["id"])

        # 🚨 Incident + Status Handling
        if latest_cpu > 70:
            create_incident(
                server["id"],
                ai_result["root_cause"],
                "critical" if latest_cpu > 90 else "high"
            )
            status = "alert"
        else:
            resolve_incident(server["id"])
            status = "healthy"

        # 🔧 Auto Remediation (ONLY for critical)
        if ai_result["action"] == "restart_instance":
            restart_instance(server["instance_id"])

        dashboard.append({
            "server": server["id"],
            "cpu": latest_cpu,
            "memory": memory,
            "disk": disk,
            "network": network,
            "status": status,
            "ai_decision": ai_result
        })

    # ✅ 🔥 ADD SUMMARY (VERY IMPORTANT FOR UI)
    total_servers = len(dashboard)
    active_alerts = sum(1 for s in dashboard if s["status"] == "alert")
    healthy_count = sum(1 for s in dashboard if s["status"] == "healthy")

    healthy_percent = round((healthy_count / total_servers) * 100, 2) if total_servers else 0

    return {
        "summary": {
            "total_servers": total_servers,
            "active_alerts": active_alerts,
            "anomalies": active_alerts,  # same for now (can improve later)
            "healthy": healthy_percent
        },
        "servers": dashboard
    }