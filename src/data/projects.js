/**
 * Selected work — backend systems, APIs, and real-world complexity only.
 */

export const selectedProjects = [
  {
    id: "openai-pricing",
    name: "OpenAI Pricing API",
    problem:
      "SaaS teams reselling OpenAI need accurate, explainable cost estimates across models and modalities before they commit to pricing.",
    solution:
      "Designed and implemented a Django REST API that computes usage-based spend from token and image-generation inputs, structured for billing integrations.",
    impact:
      "Shows how I ship production-minded APIs: clear contracts, documentation, and packaging for external integrators.",
    stack: ["Django", "Python", "REST"],
    repoUrl: "https://github.com/franpandol/openai_pricing",
    demoUrl: "",
    featured: true,
  },
  {
    id: "automotive-django",
    name: "Dealership platform API",
    problem:
      "Reference backends often skip the discipline real teams use: quality gates, containers, and automated checks.",
    solution:
      "Led-style reference implementation with Django REST Framework, Docker, flake8, black, pre-commit, and GitHub Actions mirroring professional delivery.",
    impact:
      "Demonstrates architecture-for-maintainability and CI hygiene at the level expected of senior backend owners.",
    stack: ["Django", "DRF", "Docker", "GitHub Actions"],
    repoUrl: "https://github.com/franpandol/automotive_django_app",
    demoUrl: "",
    featured: true,
  },
  {
    id: "stock-api",
    name: "Market data API",
    problem:
      "Financial data APIs must be easy to run, audit, and extend for reviewers and future contributors.",
    solution:
      "Built a containerized Django REST service with explicit dependencies, Dockerfile, and README oriented toward operational clarity.",
    impact:
      "Signals how I present complex backends to stakeholders: reproducible environments and clear boundaries.",
    stack: ["Django", "Python", "Docker"],
    repoUrl: "https://github.com/franpandol/stock_market_django",
    demoUrl: "",
    featured: true,
  },
];
