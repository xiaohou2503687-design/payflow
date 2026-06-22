function calculateMRR(subscriptions) {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 86400000);

  let currentMRR = 0;
  let lastMonthMRR = 0;
  let newMRR = 0;
  let expansionMRR = 0;
  let contractionMRR = 0;
  let churnedMRR = 0;

  const dailyMRR = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(now.getTime() - i * 86400000);
    dailyMRR[d.toISOString().slice(0, 10)] = 0;
  }

  const activeSubs = subscriptions.filter(s =>
    s.status === "active" || s.status === "trialing" || s.status === "past_due"
  );
  const cancelledSubs = subscriptions.filter(s => s.status === "canceled" || s.status === "unpaid");

  for (const sub of activeSubs) {
    const amount = (sub.items?.data?.[0]?.price?.unit_amount || sub.plan?.amount || 0) / 100;
    const interval = sub.items?.data?.[0]?.price?.recurring?.interval || sub.plan?.interval || "month";
    const monthlyAmount = interval === "year" ? amount / 12 : interval === "week" ? amount * 4.33 : amount;
    const created = new Date(sub.created * 1000);

    currentMRR += monthlyAmount;

    if (created > thirtyDaysAgo) {
      newMRR += monthlyAmount;
    }

    for (const key of Object.keys(dailyMRR)) {
      if (new Date(key) >= created) {
        dailyMRR[key] += monthlyAmount / 30;
      }
    }
  }

  for (const sub of cancelledSubs) {
    const amount = (sub.items?.data?.[0]?.price?.unit_amount || sub.plan?.amount || 0) / 100;
    const interval = sub.items?.data?.[0]?.price?.recurring?.interval || sub.plan?.interval || "month";
    const monthlyAmount = interval === "year" ? amount / 12 : interval === "week" ? amount * 4.33 : amount;
    const canceledAt = sub.canceled_at ? new Date(sub.canceled_at * 1000) : new Date(sub.ended_at * 1000);

    if (canceledAt > thirtyDaysAgo) {
      churnedMRR += monthlyAmount;
    }
  }

  const mrrGrowth = lastMonthMRR > 0 ? ((currentMRR - lastMonthMRR) / lastMonthMRR) * 100 : 0;

  return {
    currentMRR: Math.round(currentMRR * 100) / 100,
    newMRR: Math.round(newMRR * 100) / 100,
    churnedMRR: Math.round(churnedMRR * 100) / 100,
    netNewMRR: Math.round((newMRR - churnedMRR) * 100) / 100,
    mrrGrowth: Math.round(mrrGrowth * 100) / 100,
    activeSubscriptions: activeSubs.length,
    cancelledSubscriptions: cancelledSubs.length,
    dailyMRR
  };
}

function calculateARR(mrrData) {
  return {
    ARR: Math.round(mrrData.currentMRR * 12 * 100) / 100,
    projectedARR: Math.round(mrrData.currentMRR * 12 * (1 + mrrData.mrrGrowth / 100) * 100) / 100
  };
}

function calculateChurn(subscriptions, periodDays = 30) {
  const now = new Date();
  const periodStart = new Date(now.getTime() - periodDays * 86400000);
  const periodStartTs = Math.floor(periodStart.getTime() / 1000);

  const totalAtStart = subscriptions.filter(s =>
    s.status === "active" || s.status === "trialing" || s.status === "past_due" || s.status === "canceled" || s.status === "unpaid"
  ).filter(s => s.created < periodStartTs).length;

  const churnedInPeriod = subscriptions.filter(s =>
    (s.status === "canceled" || s.status === "unpaid") &&
    s.canceled_at && s.canceled_at > periodStartTs
  ).length;

  const churnRate = totalAtStart > 0 ? (churnedInPeriod / totalAtStart) * 100 : 0;

  const churnRisk = churnRate > 10 ? "critical" : churnRate > 7 ? "high" : churnRate > 5 ? "medium" : churnRate > 3 ? "low" : "healthy";

  return {
    churnRate: Math.round(churnRate * 100) / 100,
    churnedCount: churnedInPeriod,
    totalAtStart,
    periodDays,
    risk: churnRisk,
    monthlyChurnEstimate: Math.round(churnRate * 100) / 100
  };
}

function calculateLTV(mrrData, churnData) {
  const arpu = mrrData.activeSubscriptions > 0 ? mrrData.currentMRR / mrrData.activeSubscriptions : 0;
  const monthlyChurn = churnData.churnRate / 100;
  const avgLifetimeMonths = monthlyChurn > 0 ? 1 / monthlyChurn : 36;
  const ltv = arpu * avgLifetimeMonths;

  return {
    arpu: Math.round(arpu * 100) / 100,
    avgLifetimeMonths: Math.round(avgLifetimeMonths * 10) / 10,
    ltv: Math.round(ltv * 100) / 100
  };
}

module.exports = { calculateMRR, calculateARR, calculateChurn, calculateLTV };
