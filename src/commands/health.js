const chalk = require("chalk");
const { getConfig } = require("../utils/storage");
const { fetchSubscriptions, fetchCustomers } = require("../api/stripe");
const { calculateMRR, calculateChurn, calculateLTV } = require("../analytics/mrr");

async function health() {
  const config = getConfig();
  if (!config.stripeKey) {
    console.log(chalk.yellow("\n  ⚠️  Not connected. Run `payflow connect --key sk_...`\n"));
    return;
  }

  console.log(chalk.cyan("\n  🏥 Running business health check...\n"));

  const [subscriptions, customers] = await Promise.all([
    fetchSubscriptions(365),
    fetchCustomers()
  ]);

  const mrrData = calculateMRR(subscriptions);
  const churnData = calculateChurn(subscriptions, 30);
  const ltvData = calculateLTV(mrrData, churnData);

  const checks = [];

  const mrrScore = mrrData.currentMRR > 10000 ? 4 : mrrData.currentMRR > 5000 ? 3 : mrrData.currentMRR > 1000 ? 2 : mrrData.currentMRR > 0 ? 1 : 0;
  checks.push({ name: "MRR Health", score: mrrScore, max: 4, detail: `$${mrrData.currentMRR.toLocaleString()}/mo` });

  const growthScore = mrrData.mrrGrowth > 20 ? 4 : mrrData.mrrGrowth > 10 ? 3 : mrrData.mrrGrowth > 0 ? 2 : mrrData.mrrGrowth > -5 ? 1 : 0;
  checks.push({ name: "Growth Rate", score: growthScore, max: 4, detail: `${mrrData.mrrGrowth}%` });

  const churnScore = churnData.risk === "healthy" ? 4 : churnData.risk === "low" ? 3 : churnData.risk === "medium" ? 2 : churnData.risk === "high" ? 1 : 0;
  checks.push({ name: "Churn Health", score: churnScore, max: 4, detail: `${churnData.churnRate}%` });

  const ltvRatio = ltvData.ltv > 0 && ltvData.arpu > 0 ? ltvData.ltv / ltvData.arpu : 0;
  const ltvScore = ltvRatio > 24 ? 4 : ltvRatio > 12 ? 3 : ltvRatio > 6 ? 2 : ltvRatio > 3 ? 1 : 0;
  checks.push({ name: "LTV:CAC Ratio", score: ltvScore, max: 4, detail: `${ltvData.avgLifetimeMonths}mo LTV` });

  const custScore = customers.length > 500 ? 4 : customers.length > 100 ? 3 : customers.length > 20 ? 2 : customers.length > 0 ? 1 : 0;
  checks.push({ name: "Customer Base", score: custScore, max: 4, detail: `${customers.length} customers` });

  const totalScore = checks.reduce((s, c) => s + c.score, 0);
  const maxScore = checks.reduce((s, c) => s + c.max, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);
  const grade = percentage >= 90 ? "A+" : percentage >= 80 ? "A" : percentage >= 65 ? "B" : percentage >= 50 ? "C" : percentage >= 35 ? "D" : "F";
  const gradeColor = percentage >= 80 ? chalk.green : percentage >= 50 ? chalk.yellow : chalk.red;

  console.log(chalk.bold.white("╔════════════════════════════════════════════╗"));
  console.log(chalk.bold.white("║       🏥 Business Health Check             ║"));
  console.log(chalk.bold.white("╚════════════════════════════════════════════╝"));
  console.log("");
  console.log(`  ${gradeColor.bold(` Grade: ${grade} `)}  ${chalk.gray(`(${totalScore}/${maxScore} points)`)}`);
  console.log("");

  for (const check of checks) {
    const bar = "█".repeat(check.score) + "░".repeat(check.max - check.score);
    const color = check.score === 4 ? chalk.green : check.score === 3 ? chalk.blue : check.score === 2 ? chalk.yellow : check.score === 1 ? chalk.red : chalk.gray;
    console.log(`  ${check.name.padEnd(18)} ${color(bar)}  ${chalk.gray(check.detail)}`);
  }

  console.log("");
  console.log(chalk.white("  💡 Recommendations:"));
  if (churnScore < 3) console.log(chalk.red("     • High churn — run `payflow predict` to find at-risk customers"));
  if (mrrScore < 2) console.log(chalk.yellow("     • Low MRR — focus on customer acquisition and pricing optimization"));
  if (growthScore < 2) console.log(chalk.yellow("     • Slow growth — consider new acquisition channels"));
  if (percentage >= 80) console.log(chalk.green("     • Doing great! Keep scaling what works."));
  console.log("");
}

module.exports = { health };
