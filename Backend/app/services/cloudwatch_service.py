import boto3
from datetime import datetime, timedelta

cloudwatch = boto3.client("cloudwatch", region_name="ap-southeast-2")

def get_cpu_utilization(instance_id):
    try:
        # DO NOT round time (IMPORTANT FIX)
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(minutes=15)  # shorter window = fresher data

        response = cloudwatch.get_metric_statistics(
            Namespace="AWS/EC2",
            MetricName="CPUUtilization",
            Dimensions=[
                {
                    "Name": "InstanceId",
                    "Value": instance_id
                }
            ],
            StartTime=start_time,
            EndTime=end_time,
            Period=60,  # 🔥 1 minute (matches your graph setting)
            Statistics=["Average"]
        )

        print("RAW RESPONSE:", response)

        datapoints = response.get("Datapoints", [])

        if not datapoints:
            return {
                "message": "No datapoints yet — wait 2–3 mins",
                "debug": response
            }

        # Sort by timestamp
        datapoints.sort(key=lambda x: x["Timestamp"])

        formatted = [
            {
                "time": point["Timestamp"].strftime("%Y-%m-%d %H:%M:%S"),
                "value": round(point["Average"], 2)
            }
            for point in datapoints
        ]

        return {
            "instance_id": instance_id,
            "metric": "CPUUtilization",
            "data": formatted
        }

    except Exception as e:
        return {"error": str(e)}