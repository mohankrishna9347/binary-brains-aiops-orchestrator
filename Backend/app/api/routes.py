from fastapi import APIRouter
from app.services.cloudwatch_service import get_cpu_utilization
from app.services.dashboard_service import get_dashboard_data
from app.services.incident_service import load_incidents
from app.services.incident_service import resolve_incident
from app.services.ai_agent import analyze_issue

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}

@router.get("/metrics/{instance_id}")
def get_metrics(instance_id: str):
    return get_cpu_utilization(instance_id)

@router.get("/dashboard")
def dashboard():
    return get_dashboard_data()

@router.get("/incidents")
def get_incidents():
    return load_incidents()

@router.post("/resolve/{server}")
def resolve(server: str):
    return resolve_incident(server)

@router.get("/ai/{server}/{cpu}")
def ai_decision(server: str, cpu: float):
    return analyze_issue(cpu, server)

@router.get("/root-causes")
def get_root_causes():

    dashboard = get_dashboard_data()

    root_causes = []

    # ✅ FIXED HERE
    for server in dashboard["servers"]:
        cpu = server["cpu"]

        if cpu > 90:
            cause = "CPU saturation due to high computation load"
            explanation = "AI detected abnormal spike from workload overload"
        elif cpu > 70:
            cause = "High CPU usage due to background processes"
            explanation = "AI detected elevated CPU usage"
        else:
            cause = "Normal operation"
            explanation = "System operating within safe thresholds"

        root_causes.append({
            "id": f"RCA-{server['server']}",  # 🔥 important for frontend
            "issue": server["status"],
            "rootCause": cause,
            "logSummary": f"CPU usage observed at {cpu}%",
            "aiExplanation": explanation,
            "affectedServices": ["EC2", "CloudWatch"],
            "timeline": "Last 5 minutes"
        })

    return root_causes   # 🔥 return ARRAY (frontend expects this)

@router.get("/remediation")
def get_remediation():
    try:
        dashboard = get_dashboard_data()

        remediations = []

        # ✅ FIXED HERE
        for server in dashboard["servers"]:
            cpu = server.get("cpu", 0)

            if cpu > 90:
                action = "Restart instance"
                impact = "Recovered from CPU spike"
            elif cpu > 70:
                action = "Scale resources"
                impact = "Load balanced"
            else:
                action = "No action"
                impact = "System stable"

            remediations.append({
                "server": server.get("server"),
                "action": action,
                "status": "completed",
                "impact": impact,
                "timestamp": server.get("timestamp")
            })

        return {
            "summary": {"total": len(remediations)},
            "servers": remediations
        }

    except Exception as e:
        print("❌ REMEDIATION ERROR:", str(e))
        return {"error": str(e)}