<p align="center">
  <img src="https://img.shields.io/npm/v/payflow-analytics?color=blue&label=npx%20payflow" alt="npm">
  <img src="https://img.shields.io/github/license/xiaohou2503687-design/payflow" alt="license">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs">
</p>

# 棣冩尩 PayFlow

> **One-command Stripe analytics. MRR. Churn prediction. LTV. Right in your terminal.**

```bash
npx payflow connect --key sk_live_xxx
npx payflow dashboard
```

---

## 棣冩Й The Problem

You built a SaaS. You have Stripe. But you can''t answer simple questions:
- What''s my MRR right now?
- Who''s about to churn?
- Is my business healthy?

Stripe''s dashboard is built for e-commerce, not SaaS. ProfitWell got acquired and went enterprise-only. Baremetrics starts at $50/month.

PayFlow is **$0 to start**. Just connect and see your numbers.

---

## 閳?Quick Start

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

## 棣冩惓 What You Get

```
閳烘柡鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅?閳?        棣冩尩 PayFlow MRR Dashboard           閳?閳烘埃鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏆?
  MRR:      $4,230  (+12.5%)
  ARR:      $50,760
  Active:   47 subscriptions

  棣冩惓 MRR Breakdown (30d)
     + New:        $850
     - Churned:    $380
     = Net New:    $470

  棣冩惒 Churn Analytics
     Rate:   3.2%  (healthy)
     Lost:   2 subscriptions this month

  棣冩嫷 Customer Economics
     ARPU:   $90/mo
     LTV:    $2,700 (30 months)

  棣冩惐 MRR Trend (30d)
     $4,230 閳?   閳侯厸鏀㈤埡?     $3,800 閳? 閳侯厸鏀㈤埡?閳烘壋鏀㈤埡?     $3,400 閳广倐鏀㈤埞鈧埡?     閳?```

---

## 棣冩暛 Churn Prediction

PayFlow scores every subscription and flags who''s about to leave:

```
閳烘柡鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅?閳?      棣冩暛 Churn Risk Prediction             閳?閳烘埃鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏅查埡鎰ㄦ櫜閳烘劏鏆?
  2 CRITICAL   3 HIGH   5 MEDIUM   12 LOW

  閳跨媴绗? 5 subscriptions at risk 閳?$450/mo MRR at stake

  85% $49/mo 閳?cus_QxYzA...
     棣冩瘒 Scheduled for cancellation
     棣冩嫷 High-value account

  75% $29/mo 閳?cus_AbCdE...
     棣冩尭 Payment past due
     棣冨晭 New customer (12 days)
```

8-dimension risk scoring: payment status, trial ending, cancellation scheduled, account age, plan value, collection method, and more.

---

## 棣冩尩 Pricing

| Plan | Price | MRR Limit | Features |
|------|-------|-----------|----------|
| **Free** | $0 | Up to $1K MRR | Dashboard, basic churn, health check |
| **Pro** | **$19/mo** | Up to $10K MRR | Churn prediction, LTV, CSV export, daily email |
| **Business** | **$49/mo** | Unlimited | Team access, webhooks, priority support |
| **Lifetime** | **$199** | Unlimited | Everything, forever |

**[棣冩啝 Get Pro / Lifetime](https://xiaohou2503687-design.github.io/payflow/pricing)**

---

## 棣冩晙 Privacy

Your Stripe data **never leaves your machine**. PayFlow runs entirely locally. The only outbound connection is directly to Stripe''s API.

---

## 棣冨皞 Why PayFlow?

- **Zero setup** 閳?one command to connect
- **Local-first** 閳?your data stays on your machine
- **SaaS-native** 閳?built for subscription businesses, not e-commerce
- **Open source** 閳?MIT license
- **AI-powered churn prediction** 閳?know who''s leaving before they do

---

## 棣冾檪 Sponsors & Support

鐚?**Star this repo** if it saves you $50/month on Baremetrics!

<a href="https://github.com/sponsors/xiaohou2503687-design"><img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4-%23db61a2?logo=github"></a>
<a href="https://ko-fi.com/shipfast"><img src="https://img.shields.io/badge/Ko--fi-Buy%20me%20a%20coffee-ff5e5b?logo=ko-fi"></a>

---

<p align="center">
  <sub>Built with 閴傘倧绗?by <a href="https://github.com/xiaohou2503687-design">chunfeng3681</a> | MIT License</sub>
</p>

---

## 🧰 More Tools

- [💰 🛡️ GuardRail — Security scanner
- [🔍 🔍 SEOmatic — AI content cluster generator
- [🚀 ShipFast](https://github.com/xiaohou2503687-design/shipfast-oss) — One-command deploy