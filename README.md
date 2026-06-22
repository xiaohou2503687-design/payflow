<p align="center">
  <img src="https://img.shields.io/npm/v/payflow-analytics?color=blue&label=npx%20payflow" alt="npm">
  <img src="https://img.shields.io/github/license/xiaohou2503687-design/payflow" alt="license">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs">
</p>

# 💰 PayFlow

> **One-command Stripe analytics. MRR. Churn prediction. LTV. Right in your terminal.**

```bash
npx payflow connect --key sk_live_xxx
npx payflow dashboard
```

---

## 😤 The Problem

You built a SaaS. You have Stripe. But you can''t answer simple questions:
- What''s my MRR right now?
- Who''s about to churn?
- Is my business healthy?

Stripe''s dashboard is built for e-commerce, not SaaS. ProfitWell got acquired and went enterprise-only. Baremetrics starts at $50/month.

PayFlow is **$0 to start**. Just connect and see your numbers.

---

## ⚡ Quick Start

```bash
# Connect (one time)
npx payflow connect --key sk_live_xxxxxxxx

# See your money
npx payflow dashboard

# Find who''s leaving
npx payflow predict

# Business health check
npx payflow health

# Check connection
npx payflow status
```

---

## 📊 What You Get

```
╔════════════════════════════════════════════╗
║         💰 PayFlow MRR Dashboard           ║
╚════════════════════════════════════════════╝

  MRR:      $4,230  (+12.5%)
  ARR:      $50,760
  Active:   47 subscriptions

  📊 MRR Breakdown (30d)
     + New:        $850
     - Churned:    $380
     = Net New:    $470

  📉 Churn Analytics
     Rate:   3.2%  (healthy)
     Lost:   2 subscriptions this month

  💎 Customer Economics
     ARPU:   $90/mo
     LTV:    $2,700 (30 months)

  📈 MRR Trend (30d)
     $4,230 ┤    ╭─╮
     $3,800 ┤  ╭─╯ ╰─╮
     $3,400 ┤──╯      ╰
```

---

## 🔮 Churn Prediction

PayFlow scores every subscription and flags who''s about to leave:

```
╔════════════════════════════════════════════╗
║       🔮 Churn Risk Prediction             ║
╚════════════════════════════════════════════╝

  2 CRITICAL   3 HIGH   5 MEDIUM   12 LOW

  ⚠️  5 subscriptions at risk — $450/mo MRR at stake

  85% $49/mo — cus_QxYzA...
     🚫 Scheduled for cancellation
     💎 High-value account

  75% $29/mo — cus_AbCdE...
     💳 Payment past due
     🆕 New customer (12 days)
```

8-dimension risk scoring: payment status, trial ending, cancellation scheduled, account age, plan value, collection method, and more.

---

## 💰 Pricing

| Plan | Price | MRR Limit | Features |
|------|-------|-----------|----------|
| **Free** | $0 | Up to $1K MRR | Dashboard, basic churn, health check |
| **Pro** | **$19/mo** | Up to $10K MRR | Churn prediction, LTV, CSV export, daily email |
| **Business** | **$49/mo** | Unlimited | Team access, webhooks, priority support |
| **Lifetime** | **$199** | Unlimited | Everything, forever |

**[👉 Get Pro / Lifetime](https://xiaohou2503687-design.github.io/payflow/pricing)**

---

## 🔒 Privacy

Your Stripe data **never leaves your machine**. PayFlow runs entirely locally. The only outbound connection is directly to Stripe''s API.

---

## 🌟 Why PayFlow?

- **Zero setup** — one command to connect
- **Local-first** — your data stays on your machine
- **SaaS-native** — built for subscription businesses, not e-commerce
- **Open source** — MIT license
- **AI-powered churn prediction** — know who''s leaving before they do

---

## 🤝 Sponsors & Support

⭐ **Star this repo** if it saves you $50/month on Baremetrics!

<a href="https://github.com/sponsors/xiaohou2503687-design"><img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4-%23db61a2?logo=github"></a>
<a href="https://ko-fi.com/shipfast"><img src="https://img.shields.io/badge/Ko--fi-Buy%20me%20a%20coffee-ff5e5b?logo=ko-fi"></a>

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/xiaohou2503687-design">chunfeng3681</a> | MIT License</sub>
</p>
