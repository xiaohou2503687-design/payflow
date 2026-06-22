function predictChurn(subscriptions) {
  const activeSubs = subscriptions.filter(s =>
    s.status === "active" || s.status === "trialing" || s.status === "past_due"
  );

  const predictions = [];

  for (const sub of activeSubs) {
    const score = calculateRiskScore(sub);
    const flags = identifyRiskFlags(sub);

    const risk = score >= 80 ? "critical" : score >= 60 ? "high" : score >= 35 ? "medium" : score >= 15 ? "low" : "healthy";

    predictions.push({
      customerId: sub.customer,
      subscriptionId: sub.id,
      status: sub.status,
      riskScore: score,
      risk,
      flags,
      created: new Date(sub.created * 1000).toISOString().slice(0, 10),
      amount: (sub.items?.data?.[0]?.price?.unit_amount || sub.plan?.amount || 0) / 100,
      interval: sub.items?.data?.[0]?.price?.recurring?.interval || sub.plan?.interval || "month"
    });
  }

  predictions.sort((a, b) => b.riskScore - a.riskScore);

  const summary = {
    total: predictions.length,
    critical: predictions.filter(p => p.risk === "critical").length,
    high: predictions.filter(p => p.risk === "high").length,
    medium: predictions.filter(p => p.risk === "medium").length,
    low: predictions.filter(p => p.risk === "low").length,
    healthy: predictions.filter(p => p.risk === "healthy").length
  };

  return { predictions, summary };
}

function calculateRiskScore(sub) {
  let score = 0;

  if (sub.status === "past_due") score += 40;
  if (sub.status === "trialing" && sub.trial_end) {
    const daysLeft = (sub.trial_end - Math.floor(Date.now() / 1000)) / 86400;
    if (daysLeft < 3) score += 30;
    else if (daysLeft < 7) score += 15;
  }

  if (sub.cancel_at_period_end) score += 60;

  if (sub.collection_method === "send_invoice") score += 10;

  const created = new Date(sub.created * 1000);
  const ageDays = (Date.now() - created.getTime()) / 86400000;
  if (ageDays < 30) score += 20;
  else if (ageDays < 90) score += 10;

  const amount = (sub.items?.data?.[0]?.price?.unit_amount || sub.plan?.amount || 0) / 100;
  if (amount > 100) score += 10;
  if (amount < 10) score += 5;

  return Math.min(100, score);
}

function identifyRiskFlags(sub) {
  const flags = [];

  if (sub.status === "past_due") flags.push("💳 Payment past due");
  if (sub.cancel_at_period_end) flags.push("🚫 Scheduled for cancellation");
  if (sub.status === "trialing") {
    if (sub.trial_end) {
      const daysLeft = Math.ceil((sub.trial_end - Math.floor(Date.now() / 1000)) / 86400);
      flags.push(`⏳ Trial ending in ${daysLeft} days`);
    } else {
      flags.push("⏳ On trial period");
    }
  }

  const created = new Date(sub.created * 1000);
  const ageDays = Math.floor((Date.now() - created.getTime()) / 86400000);
  if (ageDays < 30) flags.push(`🆕 New customer (${ageDays} days)`);

  if (sub.collection_method === "send_invoice") flags.push("📄 Manual invoice payment");

  const amount = (sub.items?.data?.[0]?.price?.unit_amount || sub.plan?.amount || 0) / 100;
  if (amount > 100) flags.push("💎 High-value account");
  if (amount < 10) flags.push("💰 Low-value account");

  return flags;
}

module.exports = { predictChurn };
