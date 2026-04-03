/**
 * Experience — ordered for impact: Mercado Libre ecosystem first, then current fintech,
 * scale/performance, exchange architecture, and supporting leadership roles.
 * Each role: problem → what I designed/led → outcomes.
 */

export const featuredRoles = [
  {
    id: "realtrends",
    title: "Python Engineer — Tech Leader",
    org: "RealTrends · Mercado Libre ecosystem",
    period: "Feb 2019 — Feb 2021",
    problem:
      "Sellers and operators on Mercado Libre needed reliable, low-latency tooling for analytics, inventory, and sales — without slowing down as data volume grew.",
    highlights: [
      "Led engineering for platform capabilities used at scale across the Mercado Libre seller base: roadmap alignment, technical standards, and predictable releases.",
      "Designed and shipped backend services and data paths for near–real-time processing, reducing end-to-end latency on critical seller workflows.",
      "Mentored engineers and owned technical tradeoffs (Django, PostgreSQL, AWS) so the team could scale features without sacrificing stability.",
    ],
    stack: "Python, Django, PostgreSQL, AWS, real-time processing, performance tuning",
  },
  {
    id: "agioratings",
    title: "Software Engineer",
    org: "NanLabs · AgioRatings",
    period: "Dec 2023 — Present",
    problem:
      "Digital asset markets generate continuous signals; the product needed dependable backends to ingest, score, and alert on distress patterns without blocking analysts.",
    highlights: [
      "Architected and built FastAPI services for real-time financial telemetry and anomaly detection, deployed on Azure with production-grade CI/CD (GitHub Actions).",
      "Implemented async-friendly pipelines and integrations so high-volume monitoring stays responsive and failures are observable.",
      "Partnered with data and product stakeholders to turn streaming-style analytics into decisions that shorten reaction time for investment workflows.",
    ],
    stack: "Python, FastAPI, Azure, GitHub Actions, MongoDB, async processing",
  },
  {
    id: "glasfunds",
    title: "Python Engineer",
    org: "Foxbox Digital · GLASFunds",
    period: "Aug 2022 — Oct 2023",
    problem:
      "A wealth-management platform needed faster page loads and more headroom as portfolios, reports, and concurrent users grew on GCP.",
    highlights: [
      "Led performance and scaling work on Django backends: query optimization, caching strategy, and service boundaries that improved perceived speed across core flows.",
      "Improved end-to-end platform performance by roughly 40% on key workloads through profiling-driven changes and more efficient data access patterns.",
      "Standardized GitHub Actions–based delivery so teams could ship optimizations safely and iterate quickly on a growing product surface.",
    ],
    stack: "Python, Django, Google Cloud Platform, GitHub Actions",
  },
  {
    id: "dexter",
    title: "Python Lead Developer · Backend & platform",
    org: "Dexter Development · Cryptocurrency exchange",
    period: "Jul 2016 — Nov 2017",
    problem:
      "A new exchange had to move from MVP to a defensible architecture: custody and transfer flows, KYC, and high-concurrency order handling with clear auditability.",
    highlights: [
      "Designed the backend architecture for trading, balances, and internal operations — public APIs, service boundaries, and persistence across MongoDB and PostgreSQL.",
      "Integrated custody and transfer workflows (including Fireblocks) and identity verification (KYC via Jumio) so compliance and operations could scale with volume.",
      "Owned real-time transaction paths and operational tooling (Django admin) that reduced manual intervention and strengthened security posture for production traffic.",
    ],
    stack: "Django, MongoDB, PostgreSQL, Fireblocks, Jumio (KYC), exchange integrations",
  },
  {
    id: "apptim",
    title: "Senior Software Engineer",
    org: "Apptim",
    period: "Feb 2021 — Jul 2022",
    problem:
      "Mobile teams needed automated, trustworthy performance signals in CI — not ad-hoc profiling — before regressions reached users.",
    highlights: [
      "Led development of Python-based performance tooling integrated with Xcode Instruments, adb, AWS Device Farm, and GitHub Actions for repeatable pipelines.",
      "Drove the Python 2 → 3 migration and hardened integrations that downstream teams relied on for release confidence.",
      "Improved signal quality for latency and resource usage so product and QA could catch issues earlier in the delivery cycle.",
    ],
    stack: "Python, AWS, GitHub Actions, Java, Electron, Vue.js",
  },
  {
    id: "alpelo",
    title: "Lead Engineer",
    org: "Al Pelo · On-demand delivery",
    period: "Jan 2018 — Feb 2019",
    problem:
      "An early-stage delivery product needed its first engineering team, a coherent backend, and AWS infrastructure that could grow past MVP.",
    highlights: [
      "Built and led the initial engineering organization; defined architecture in Django and async workflows on AWS (S3, RDS, SQS, SNS).",
      "Designed systems for dispatch and operations that improved reliability as order volume and partner integrations increased.",
      "Owned technical decisions from infrastructure to release process so the company could ship quickly without accumulating unpayable debt.",
    ],
    stack: "Python, Django, AWS",
  },
];

export const earlierRoles = [
  {
    id: "django-teacher",
    title: "Django Intensive Course — Instructor",
    org: "Catamarca Government & local tech cluster",
    period: "Nov 2016 — Jun 2017",
    summary:
      "Led an advanced Django program for professionals — teaching patterns applicable to production web backends.",
  },
  {
    id: "ministry",
    title: "Technical Consultant",
    org: "Argentina Ministry of Economy",
    period: "2015",
    summary:
      "Led delivery of internal dashboards and citizen-facing platforms with Django, PostgreSQL, and AWS.",
  },
  {
    id: "freelance",
    title: "Freelance Android / Django Developer",
    org: "Independent",
    period: "2013 — 2015",
    summary:
      "End-to-end delivery of custom mobile and web backends for clients in Argentina.",
  },
  {
    id: "unc",
    title: "Java Developer",
    org: "National University of Catamarca",
    period: "2010 — 2015",
    summary:
      "Built internal systems that improved academic and administrative processes.",
  },
];
