<p align="center">
  <img src="https://img.shields.io/npm/v/payflow-analytics?color=blue&label=npx%20payflow" alt="npm">
  <img src="https://img.shields.io/github/license/xiaohou2503687-design/payflow" alt="license">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs">
</p>

# 馃挵 PayFlow

> **One-command Stripe analytics. MRR. Churn prediction. LTV. Right in your terminal.**

```bash
npx payflow connect --key sk_live_xxx
npx payflow dashboard
```

---

## 馃槫 The Problem

You built a SaaS. You have Stripe. But you can''t answer simple questions:
- What''s my MRR right now?
- Who''s about to churn?
- Is my business healthy?

Stripe''s dashboard is built for e-commerce, not SaaS. ProfitWell got acquired and went enterprise-only. Baremetrics starts at $50/month.

PayFlow is **$0 to start**. Just connect and see your numbers.

---

## 鈿?Quick Start

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

## 馃搳 What You Get

```
鈺斺晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晽
鈺?        馃挵 PayFlow MRR Dashboard           鈺?鈺氣晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨暆

  MRR:      $4,230  (+12.5%)
  ARR:      $50,760
  Active:   47 subscriptions

  馃搳 MRR Breakdown (30d)
     + New:        $850
     - Churned:    $380
     = Net New:    $470

  馃搲 Churn Analytics
     Rate:   3.2%  (healthy)
     Lost:   2 subscriptions this month

  馃拵 Customer Economics
     ARPU:   $90/mo
     LTV:    $2,700 (30 months)

  馃搱 MRR Trend (30d)
     $4,230 鈹?   鈺攢鈺?     $3,800 鈹? 鈺攢鈺?鈺扳攢鈺?     $3,400 鈹も攢鈹€鈺?     鈺?```

---

## 馃敭 Churn Prediction

PayFlow scores every subscription and flags who''s about to leave:

```
鈺斺晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晽
鈺?      馃敭 Churn Risk Prediction             鈺?鈺氣晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨暆

  2 CRITICAL   3 HIGH   5 MEDIUM   12 LOW

  鈿狅笍  5 subscriptions at risk 鈥?$450/mo MRR at stake

  85% $49/mo 鈥?cus_QxYzA...
     馃毇 Scheduled for cancellation
     馃拵 High-value account

  75% $29/mo 鈥?cus_AbCdE...
     馃挸 Payment past due
     馃啎 New customer (12 days)
```

8-dimension risk scoring: payment status, trial ending, cancellation scheduled, account age, plan value, collection method, and more.

---

## 馃挵 Pricing

| Plan | Price | MRR Limit | Features |
|------|-------|-----------|----------|
| **Free** | $0 | Up to $1K MRR | Dashboard, basic churn, health check |
| **Pro** | **$19/mo** | Up to $10K MRR | Churn prediction, LTV, CSV export, daily email |
| **Business** | **$49/mo** | Unlimited | Team access, webhooks, priority support |
| **Lifetime** | **$199** | Unlimited | Everything, forever |

**[馃憠 Get Pro / Lifetime](https://xiaohou2503687-design.github.io/payflow/pricing)**

---

## 馃敀 Privacy

Your Stripe data **never leaves your machine**. PayFlow runs entirely locally. The only outbound connection is directly to Stripe''s API.

---

## 馃専 Why PayFlow?

- **Zero setup** 鈥?one command to connect
- **Local-first** 鈥?your data stays on your machine
- **SaaS-native** 鈥?built for subscription businesses, not e-commerce
- **Open source** 鈥?MIT license
- **AI-powered churn prediction** 鈥?know who''s leaving before they do

---

## 馃 Sponsors & Support

猸?**Star this repo** if it saves you $50/month on Baremetrics!

<a href="https://github.com/sponsors/xiaohou2503687-design"><img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4-%23db61a2?logo=github"></a>
<a href="https://ko-fi.com/shipfast"><img src="https://img.shields.io/badge/Ko--fi-Buy%20me%20a%20coffee-ff5e5b?logo=ko-fi"></a>

---

<p align="center">
  <sub>Built with 鉂わ笍 by <a href="https://github.com/xiaohou2503687-design">chunfeng3681</a> | MIT License</sub>
</p>
