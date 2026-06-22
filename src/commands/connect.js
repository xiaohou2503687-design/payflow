const chalk = require("chalk");
const { saveConfig } = require("../utils/storage");
const { validateKey } = require("../api/stripe");

async function connect(options) {
  const key = options.key || process.env.STRIPE_SECRET_KEY;

  if (!key) {
    console.log(chalk.yellow("\n  💡 Connect your Stripe account:"));
    console.log(chalk.gray("     payflow connect --key sk_live_xxxxxxxx"));
    console.log(chalk.gray("     payflow connect --key sk_test_xxxxxxxx --test"));
    console.log("");
    console.log(chalk.gray("  Find your key at: https://dashboard.stripe.com/apikeys"));
    console.log("");
    return;
  }

  if (!key.startsWith("sk_")) {
    console.log(chalk.red("\n  ❌ Invalid key format. Stripe keys start with `sk_`"));
    console.log("");
    return;
  }

  console.log(chalk.cyan("\n  🔑 Validating Stripe key...\n"));

  const result = await validateKey(key);

  if (!result.valid) {
    console.log(chalk.red(`  ❌ Validation failed: ${result.error}`));
    console.log("");
    return;
  }

  saveConfig({
    stripeKey: key,
    mode: key.startsWith("sk_test_") ? "test" : "live",
    connectedAt: new Date().toISOString(),
    account: result.account
  });

  console.log(chalk.green.bold("  ✅ Connected successfully!"));
  console.log("");
  console.log(chalk.white(`  Account: ${result.account.businessName || result.account.id}`));
  console.log(chalk.gray(`  Email:   ${result.account.email || "N/A"}`));
  console.log(chalk.gray(`  Country: ${result.account.country || "N/A"}`));
  console.log(chalk.gray(`  Mode:    ${key.startsWith("sk_test_") ? "🧪 Test" : "💰 Live"}`));
  console.log("");
  console.log(chalk.white("  Try these commands:"));
  console.log(chalk.cyan("    payflow dashboard     Show MRR dashboard"));
  console.log(chalk.cyan("    payflow predict       Churn risk analysis"));
  console.log(chalk.cyan("    payflow health        Business health check"));
  console.log("");
}

module.exports = { connect };
