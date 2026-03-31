import json
from datetime import datetime
import os

FILE_PATH = "app/data/incidents.json"


# ✅ Load incidents safely
def load_incidents():
    if not os.path.exists(FILE_PATH):
        return []

    with open(FILE_PATH, "r") as f:
        try:
            return json.load(f)
        except:
            return []


# ✅ Save incidents
def save_incidents(data):
    with open(FILE_PATH, "w") as f:
        json.dump(data, f, indent=2)


# ✅ Generate ID
def generate_incident_id(existing):
    return f"INC-{1000 + len(existing)}"


# ✅ Create incident (NO DUPLICATES)
def create_incident(server, issue, severity):
    incidents = load_incidents()

    # 🚨 Prevent duplicate active incidents
    for inc in incidents:
        if (
            inc["server"] == server and
            inc["status"] == "active" and
            inc["issue"] == issue
        ):
            return inc  # Already exists → don't create again

    # Create new incident
    incident = {
        "id": generate_incident_id(incidents),
        "server": server,
        "issue": issue,
        "severity": severity,
        "status": "active",
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    incidents.append(incident)
    save_incidents(incidents)

    return incident


# ✅ Resolve incident (NEW FEATURE 🔥)
def resolve_incident(server):
    incidents = load_incidents()

    for inc in incidents:
        if inc["server"] == server and inc["status"] == "active":
            inc["status"] = "resolved"

    save_incidents(incidents)

    return {"message": f"Resolved incidents for {server}"}