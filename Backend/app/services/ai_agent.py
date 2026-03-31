def analyze_issue(cpu, server):
    """
    Simple AI logic (rule-based for hackathon)
    """

    if cpu > 90:
        return {
            "root_cause": "CPU overload due to high computation load",
            "action": "restart_instance",
            "explanation": f"{server} CPU reached {cpu}%, system overloaded. Restart recommended."
        }

    elif cpu > 70:
        return {
            "root_cause": "Moderate CPU spike, possible heavy process",
            "action": "monitor",
            "explanation": f"{server} CPU is {cpu}%, monitoring recommended."
        }

    else:
        return {
            "root_cause": "System stable",
            "action": "none",
            "explanation": f"{server} is healthy."
        }