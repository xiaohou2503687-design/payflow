#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");

program
  .name("payflow")
  .description("💰 Stripe analytics for indie hackers")
  .version("0.1.0");

program
  .command("connect")
  .description("Connect your Stripe account")
  .option("-k, --key <key>", "Stripe secret key (sk_live_... or sk_test_...)")
  .option("--test", "Use test mode", false)
  .action(async (options) => {
    const { connect } = require("../src/commands/connect");
    await connect(options);
  });

program
  .command("dashboard")
  .description("Show MRR dashboard")
  .option("-p, --period <period>", "Period: 7d|30d|90d|12m", "30d")
  .option("-j, --json", "Output as JSON")
  .action(async (options) => {
    const { dashboard } = require("../src/commands/dashboard");
    await dashboard(options);
  });

program
  .command("predict")
  .description("Churn prediction & risk analysis")
  .option("-j, --json", "Output as JSON")
  .action(async (options) => {
    const { predict } = require("../src/commands/predict");
    await predict(options);
  });

program
  .command("health")
  .description("Quick business health check")
  .action(async (options) => {
    const { health } = require("../src/commands/health");
    await health(options);
  });

program
  .command("status")
  .description("Check connection status")
  .action(() => {
    const { getConfig } = require("../src/utils/storage");
    const config = getConfig();
    if (config.stripeKey) {
      console.log(chalk.green("✅ Connected to Stripe"));
      console.log(chalk.gray(`   Mode: ${config.stripeKey.startsWith("sk_test_") ? "Test" : "Live"}`));
      console.log(chalk.gray(`   Connected: ${config.connectedAt || "unknown"}`));
    } else {
      console.log(chalk.yellow("⚠️  Not connected. Run `payflow connect --key sk_...`"));
    }
  });

program.parse();
