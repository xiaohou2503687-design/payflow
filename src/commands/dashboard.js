const chalk = require("chalk");
const asciichart = require("asciichart");
const { getConfig } = require("../utils/storage");
const { fetchSubscriptions, fetchInvoices } = require("../api/stripe");
const { calculateMRR, calculateARR, calculateChurn, calculateLTV } = require("../analytics/mrr");

async function dashboard(options) {
  const config = getConfig();
  if (!config.stripeKey) {
    console.log(chalk.yellow("\n  ⚠️  Not connected. Run `payflow connect --key sk_...`\n"));
    return;
  }

  const period = options.period || "30d";
  const periodDays = period === "7d" ? 7 : period === "30d" ? 30 : period === "90d" ? 90 : 365;

  console.log(chalk.cyan("\n  💰 Fetching your Stripe data...\n"));

  const [subscriptions, invoices] = await Promise.all([
    fetchSubscriptions(periodDays),
    fetchInvoices(periodDays)
  ]);

  const mrrData = calculateMRR(subscriptions);
  const arrData = calculateARR(mrrData);
  const churnData = calculateChurn(subscriptions, 30);
  const ltvData = calculateLTV(mrrData, churnData);

  if (options.json) {
    console.log(JSON.stringify({ mrr: mrrData, arr: arrData, churn: churnData, ltv: ltvData }, null, 2));
    return;
  }

  console.log(chalk.bold.white("╔════════════════════════════════════════════╗"));
  console.log(chalk.bold.white("║         💰 PayFlow MRR Dashboard           ║"));
  console.log(chalk.bold.white("╚════════════════════════════════════════════╝"));
  console.log("");

  const mrrColor = mrrData.mrrGrowth >= 0 ? chalk.green : chalk.red;
  console.log(`  ${chalk.bold("MRR:")}      ${chalk.bold.green("$" + mrrData.currentMRR.toLocaleString())}  ${mrrColor(`(${mrrData.mrrGrowth >= 0 ? "+" : ""}${mrrData.mrrGrowth}%)`)}`);
  console.log(`  ${chalk.bold("ARR:")}      ${chalk.green("$" + arrData.ARR.toLocaleString())}`);
  console.log(`  ${chalk.bold("Active:")}   ${chalk.blue(mrrData.activeSubscriptions)} subscriptions`);
  console.log("");

  console.log(chalk.bold("  📊 MRR Breakdown (30d)"));
  console.log(`     ${chalk.green("+ New:")}        $${mrrData.newMRR.toLocaleString()}`);
  console.log(`     ${chalk.red("- Churned:")}    $${mrrData.churnedMRR.toLocaleString()}`);
  console.log(`     ${chalk.cyan("= Net New:")}    $${mrrData.netNewMRR.toLocaleString()}`);
  console.log("");

  console.log(chalk.bold("  📉 Churn Analytics"));
  const churnColor = churnData.risk === "healthy" ? chalk.green : churnData.risk === "low" ? chalk.blue : churnData.risk === "medium" ? chalk.yellow : churnData.risk === "high" ? chalk.red : chalk.bgRed.white;
  console.log(`     Rate:   ${churnColor(churnData.churnRate + "%")}  (${churnData.risk})`);
  console.log(`     Lost:   ${chalk.red(churnData.churnedCount)} subscriptions this month`);
  console.log("");

  console.log(chalk.bold("  💎 Customer Economics"));
  console.log(`     ARPU:   $${ltvData.arpu}/mo`);
  console.log(`     LTV:    $${ltvData.ltv.toLocaleString()} (${ltvData.avgLifetimeMonths} months)`);
  console.log("");

  if (mrrData.dailyMRR && Object.keys(mrrData.dailyMRR).length > 1) {
    console.log(chalk.bold("  📈 MRR Trend (30d)"));
    const dates = Object.keys(mrrData.dailyMRR).sort();
    const values = dates.map(d => mrrData.dailyMRR[d]);
    if (values.length > 1) {
      const chart = asciichart.plot(values, {
        height: 6,
        width: 50,
        format: x => `$${Math.round(x).toLocaleString().padStart(6)}`
      });
      console.log(chart);
    }
    console.log("");
  }

  console.log(chalk.gray("  ──────────────────────────────────────────"));
  console.log(chalk.white("  💡 Revenue: ") + chalk.green(`$${Math.round(mrrData.currentMRR * 12)}/yr`) + chalk.gray(" projected"));
  console.log("");
  console.log(chalk.gray(`  Data from Stripe · ${new Date().toISOString().slice(0, 16)}`));
  console.log("");
}

module.exports = { dashboard };
