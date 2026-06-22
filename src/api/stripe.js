const { getConfig, getCache, setCache } = require("../utils/storage");

function getStripeClient() {
  const config = getConfig();
  if (!config.stripeKey) {
    throw new Error("Not connected to Stripe. Run `payflow connect --key sk_...`");
  }
  const Stripe = require("stripe");
  return new Stripe(config.stripeKey, { apiVersion: "2025-06-15" });
}

async function fetchSubscriptions(periodDays = 30) {
  const cacheKey = `subscriptions_${periodDays}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const stripe = getStripeClient();
  const subscriptions = [];
  const since = Math.floor(Date.now() / 1000) - (periodDays * 86400);

  let hasMore = true;
  let startingAfter = undefined;

  while (hasMore) {
    const result = await stripe.subscriptions.list({
      limit: 100,
      starting_after: startingAfter,
      status: "all",
      created: { gte: since }
    });
    subscriptions.push(...result.data);
    hasMore = result.has_more;
    if (result.data.length > 0) {
      startingAfter = result.data[result.data.length - 1].id;
    }
  }

  setCache(cacheKey, subscriptions, 120000);
  return subscriptions;
}

async function fetchCustomers() {
  const cached = getCache("customers");
  if (cached) return cached;

  const stripe = getStripeClient();
  const customers = [];
  let hasMore = true;
  let startingAfter = undefined;

  while (hasMore) {
    const result = await stripe.customers.list({ limit: 100, starting_after: startingAfter });
    customers.push(...result.data);
    hasMore = result.has_more;
    if (result.data.length > 0) {
      startingAfter = result.data[result.data.length - 1].id;
    }
  }

  setCache("customers", customers, 300000);
  return customers;
}

async function fetchInvoices(periodDays = 90) {
  const cacheKey = `invoices_${periodDays}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const stripe = getStripeClient();
  const invoices = [];
  const since = Math.floor(Date.now() / 1000) - (periodDays * 86400);

  let hasMore = true;
  let startingAfter = undefined;

  while (hasMore) {
    const result = await stripe.invoices.list({
      limit: 100,
      starting_after: startingAfter,
      status: "paid",
      created: { gte: since }
    });
    invoices.push(...result.data);
    hasMore = result.has_more;
    if (result.data.length > 0) {
      startingAfter = result.data[result.data.length - 1].id;
    }
  }

  setCache(cacheKey, invoices, 120000);
  return invoices;
}

async function fetchCharges(periodDays = 90) {
  const cacheKey = `charges_${periodDays}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const stripe = getStripeClient();
  const charges = [];
  const since = Math.floor(Date.now() / 1000) - (periodDays * 86400);

  let hasMore = true;
  let startingAfter = undefined;

  while (hasMore) {
    const result = await stripe.charges.list({
      limit: 100,
      starting_after: startingAfter,
      created: { gte: since }
    });
    charges.push(...result.data.filter(c => c.paid && !c.refunded));
    hasMore = result.has_more;
    if (result.data.length > 0) {
      startingAfter = result.data[result.data.length - 1].id;
    }
  }

  setCache(cacheKey, charges, 120000);
  return charges;
}

async function validateKey(key) {
  try {
    const Stripe = require("stripe");
    const stripe = new Stripe(key, { apiVersion: "2025-06-15" });
    const account = await stripe.account.retrieve();
    return { valid: true, account: { id: account.id, email: account.email, country: account.country, businessName: account.business_profile?.name } };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

module.exports = { getStripeClient, fetchSubscriptions, fetchCustomers, fetchInvoices, fetchCharges, validateKey };
