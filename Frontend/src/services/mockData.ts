const BASE_URL = "http://127.0.0.1:8000";

// -------------------- METRICS --------------------
export async function getMetrics() {
  try {
    const res = await fetch("http://127.0.0.1:8000/dashboard");
    const data = await res.json();

    console.log("DASHBOARD API:", data);

    const servers = data.servers || [];

    // 🔥 FIX: convert to chart format
    const timeSeries = servers.map((s: any, index: number) => ({
      time: `S${index + 1}`,   // simple label (or timestamp later)
      cpu: s.cpu || 0,
      memory: s.memory || 0,
      network: s.network || 0,
      disk: s.disk || 0,
    }));

    console.log("CHART DATA:", timeSeries);

    return {
      overview: {
        totalServers: data.summary?.total_servers || 0,
        activeAlerts: data.summary?.active_alerts || 0,
        anomaliesDetected: data.summary?.anomalies || 0,
        healthyPercent: data.summary?.healthy || 0,
      },

      timeSeries: timeSeries, // ✅ FIXED
    };
  } catch (err) {
    console.error("METRICS ERROR:", err);
    return {
      overview: {
        totalServers: 0,
        activeAlerts: 0,
        anomaliesDetected: 0,
        healthyPercent: 0,
      },
      timeSeries: [],
    };
  }
}
// -------------------- INCIDENTS --------------------
export async function getIncidents() {
  try {
    const res = await fetch("http://127.0.0.1:8000/incidents");
    const data = await res.json();

    if (!Array.isArray(data)) return [];

    const mapped = data.map((inc: any) => ({
      id: inc.id,
      server: inc.server,
      issue: inc.issue,
      severity: inc.severity,
      status: inc.status,
      timestamp: inc.time,
    }));

    // 🔥 SORT LATEST FIRST
    return mapped.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (err) {
    console.error("INCIDENT ERROR:", err);
    return [];
  }
}

// -------------------- AI DECISIONS --------------------
export async function getDecisions() {
  const res = await fetch("http://127.0.0.1:8000/dashboard");
  const data = await res.json();

  console.log("DECISIONS API:", data);

  const servers = data.servers || [];

  const decisions = servers.map((s: any, i: number) => ({
    id: `DEC-${i + 1}`,
    detectedIssue: s.cpu > 80 ? "High CPU usage" : "Normal",
    decision: s.cpu > 80 ? "Restart instance" : "No action",
    reason: `CPU at ${s.cpu}%`,
    confidence: Math.min(100, Math.round(s.cpu)),
    timestamp: new Date().toISOString(),
  }));

  console.log("MAPPED DECISIONS:", decisions);

  return decisions;
}

// -------------------- ROOT CAUSE --------------------
export async function getRootCauses() {
  const res = await fetch("http://127.0.0.1:8000/root-causes");
  const data = await res.json();

  console.log("ROOT CAUSE API:", data);

  return Array.isArray(data)
    ? data.map((rca: any) => ({
      id: rca.id,
      issue: rca.issue,
      rootCause: rca.rootCause,
      logSummary: rca.logSummary,
      aiExplanation: rca.aiExplanation,
      affectedServices: rca.affectedServices,
      timeline: rca.timeline,
    }))
    : [];
}
// -------------------- REMEDIATION --------------------
export async function getRemediations() {
  const res = await fetch("http://127.0.0.1:8000/remediation");
  const data = await res.json();

  console.log("REMEDIATION API:", data);

  return Array.isArray(data.servers)
    ? data.servers.map((r: any, index: number) => ({
      id: `REM-${index + 1}`,
      server: r.server,
      action: r.action || "Restart instance",
      status: r.status || "completed",
      impact: r.impact || "System stabilized",
      timestamp: r.timestamp || new Date().toISOString(),
    }))
    : [];
}