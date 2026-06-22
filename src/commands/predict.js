const chalk = require("chalk");
const { getConfig } = require("../utils/storage");
const { fetchSubscriptions } = require("../api/stripe");
const { predictChurn } = require("../ai/predictor");

async function predict(options) {
  const config = getConfig();
  if (!config.stripeKey) {
    console.log(chalk.yellow("\n  ⚠️  Not connected. Run `payflow connect --key sk_...`\n"));
    return;
  }

  console.log(chalk.cyan("\n  🔮 Analyzing churn risk...\n"));

  const subscriptions = await fetchSubscriptions(365);
  const { predictions, summary } = predictChurn(subscriptions);

  if (options.json) {
    console.log(JSON.stringify({ predictions, summary }, null, 2));
    return;
  }

  console.log(chalk.bold.white("╔════════════════════════════════════════════╗"));
  console.log(chalk.bold.white("║       🔮 Churn Risk Prediction             ║"));
  console.log(chalk.bold.white("╚════════════════════════════════════════════╝"));
  console.log("");

  console.log(`  ${chalk.bgRed.white(` ${summary.critical} CRITICAL `)}  ${chalk.red(`${summary.high} HIGH`)}  ${chalk.yellow(`${summary.medium} MEDIUM`)}  ${chalk.blue(`${summary.low} LOW`)}  ${chalk.green(`${summary.healthy} HEALTHY`)}`);
  console.log("");

  if (summary.critical + summary.high === 0) {
    console.log(chalk.green("  🎉 No high-risk subscriptions! Your customers look happy."));
    console.log("");
    return;
  }

  const atRisk = predictions.filter(p => p.risk === "critical" || p.risk === "high");
  const totalAtRiskMRR = atRisk.reduce((sum, p) => sum + p.amount, 0);

  console.log(chalk.red.bold(`  ⚠️  ${atRisk.length} subscriptions at risk — $${Math.round(totalAtRiskMRR).toLocaleString()}/mo MRR at stake`));
  console.log("");
  console.log(chalk.bold("  Top risks:"));
  console.log("");

  const top = atRisk.slice(0, 8);
  for (const p of top) {
    const riskColor = p.risk === "critical" ? chalk.bgRed.white : chalk.red;
    console.log(`  ${riskColor(` ${p.riskScore}% `)} $${p.amount}/mo — ${p.customerId?.toString().slice(0, 12)}...`);
    for (const flag of p.flags.slice(0, 3)) {
      console.log(`     ${flag}`);
    }
    console.log("");
  }

  if (atRisk.length > 8) {
    console.log(chalk.gray(`  ... and ${atRisk.length - 8} more at-risk subscriptions`));
    console.log("");
  }

  console.log(chalk.white("  💡 Actions:"));
  console.log(chalk.gray("     • Reach out to critical-risk customers with a personal email"));
  console.log(chalk.gray("     • Offer a discount or annual plan to high-risk accounts"));
  console.log(chalk.gray("     • Review trial-ending customers and send onboarding tips"));
  console.log("");
}

module.exports = { predict };
