import boto3
from datetime import datetime, timedelta

ec2 = boto3.client("ec2", region_name="ap-southeast-2")

last_restart = {}

def restart_instance(instance_id):
    now = datetime.utcnow()

    # ⛔ Prevent frequent restarts (cooldown 5 mins)
    if instance_id in last_restart:
        if now - last_restart[instance_id] < timedelta(minutes=5):
            return {"status": "cooldown_active"}

    try:
        ec2.reboot_instances(InstanceIds=[instance_id])
        last_restart[instance_id] = now
        return {"status": "restarted"}
    except Exception as e:
        return {"error": str(e)}