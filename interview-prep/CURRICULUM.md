# Full 10-Day Curriculum — Azure Full Stack Developer Interview Prep

---

## Phase 1: Modern Frontend (Days 1–2)

### Day 1 — React 18/19 Concurrent Rendering & PWA Foundations
- **Lesson:** [day-01-react-18-concurrent.md](phase-1-frontend/lessons/day-01-react-18-concurrent.md)
- **Challenge:** Build concurrent search + React 19 contact form in `phase-1-frontend/challenges/day-01-react-challenge/`
- **Mock Interview:** [day-01-questions.md](phase-1-frontend/mock-interviews/day-01-questions.md)
- **Key APIs:** `useTransition`, `useDeferredValue`, `useActionState`, `useOptimistic`, `Suspense`, `memo`

### Day 2 — Microfrontend Architecture with Module Federation
- **Topics:** Monolith vs. Microfrontend tradeoffs, Webpack 5 Module Federation, shared dependencies, independent deployability
- **Challenge:** Convert Day 1 app into Module Federation host; expose `<SearchPage>` as a remote
- **Key Concepts:** `exposes`, `remotes`, `shared` config in `webpack.config.js`, `React.lazy` for remote loading

---

## Phase 2: Serverless & Storage (Days 3–4)

### Day 3 — Azure Functions: Triggers, Bindings, and Local Dev
- **Topics:** Function App anatomy, HTTP/Timer/Queue/Blob triggers, input/output bindings, `local.settings.json`
- **Challenge:** Build a .NET 8 Isolated Function with:
  - HTTP trigger: `POST /api/contacts` (saves to Blob Storage)
  - Blob trigger: fires when a new contact file appears, logs it
  - Timer trigger: sweeps stale contacts every hour
- **Key Concepts:** `ILogger<T>`, dependency injection in Functions, `FunctionContext` vs. `HttpTriggerAttribute`

### Day 4 — Azure Blob Storage: Upload, SAS Tokens & Security
- **Topics:** Container/blob hierarchy, access tiers, SAS token generation (user delegation vs. account key), Managed Identity access
- **Challenge:** Extend Day 3 function to:
  - Generate SAS tokens for direct browser upload (no proxy)
  - Implement container-level vs. blob-level SAS
  - Connect to Blob Storage using `DefaultAzureCredential` (no connection strings in code)

---

## Phase 3: Purposed Databases (Days 5–6)

### Day 5 — Azure SQL with EF Core 8
- **Topics:** EF Core 8 new features (complex types, primitive collections), migrations, performance best practices, connection resiliency
- **Challenge:** Model and migrate a Product + Order schema:
  - Use EF Core 8 `ComplexType` for `Address`
  - Implement repository pattern with `IQueryable` best practices
  - Add compiled queries for hot paths
  - Configure Azure SQL connection with retry logic

### Day 6 — Cosmos DB: NoSQL Modeling & SDK
- **Topics:** Partition key design, RU/s cost optimization, point reads vs. queries, consistency levels, change feed
- **Challenge:** Design and implement a Cosmos DB schema for an e-commerce order system:
  - Model Orders (embed line items or reference?)
  - Choose partition key strategy (justify your choice)
  - Implement CRUD via .NET SDK v3
  - Implement Change Feed processor to trigger downstream events

---

## Phase 4: Performance & Security (Days 7–8)

### Day 7 — Azure Cache for Redis: Patterns & Implementation
- **Topics:** Cache-aside vs. write-through vs. write-behind, TTL strategies, cache invalidation, distributed sessions, pub/sub with Redis
- **Challenge:** Add Redis caching to the Day 5/6 API:
  - Cache product catalog with `IDistributedCache`
  - Implement cache invalidation on update
  - Use Redis pub/sub for real-time inventory updates

### Day 8 — Azure AD, Managed Identities & Zero-Trust Security
- **Topics:** App registrations, MSAL in React, Bearer token validation in .NET 8, Managed Identity for service-to-service, `DefaultAzureCredential` chain
- **Challenge:**
  - Add Azure AD auth to the React SPA (MSAL.js)
  - Protect .NET 8 API endpoints with `[Authorize]` + scope validation
  - Replace all connection strings with Managed Identity access

---

## Phase 5: System Design & Deployment (Days 9–10)

### Day 9 — PWA Architecture + CI/CD with Azure DevOps
- **Topics:** Full PWA checklist (manifest, SW, HTTPS, installability), Workbox strategies, Azure Static Web Apps, GitHub Actions → Azure deployment
- **Challenge:** Deploy the complete app:
  - Azure Static Web Apps for React frontend
  - Azure Functions for backend
  - Cosmos DB + Redis on Azure
  - Wire up CI/CD pipeline with `azure-staticwebapp.config.json`

### Day 10 — High-Pressure Mock Interview + System Design
- **Format:** 60-minute simulated interview
  - 15 min: System design whiteboard — "Design a scalable PWA for 100k concurrent users on Azure"
  - 20 min: Live coding challenge (to be revealed)
  - 25 min: Deep-dive questions on your implementation across Days 1–9
- **Evaluation:** Self-score on STAR format, technical depth, and communication clarity

---

## Quick Reference: JD Requirements Coverage

| JD Requirement | Covered In |
|----------------|------------|
| React 18/19 + TypeScript | Days 1–2 |
| Progressive Web Apps / SPA | Days 1, 9 |
| Microfrontends | Day 2 |
| Azure Functions | Days 3–4 |
| Blob Storage | Day 4 |
| Azure SQL DB | Day 5 |
| Azure Cosmos DB | Day 6 |
| Azure Cache for Redis | Day 7 |
| Azure AD / Security | Day 8 |
| .NET 8 | Days 3, 5–8 |
| CI/CD / Azure Deployment | Day 9 |
| System Design | Day 10 |
