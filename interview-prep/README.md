# Azure Full Stack Developer — 10-Day Interview Prep Sprint

> **Role Target:** Azure Full Stack Developer (.NET 8 · React 18/19 · Azure Functions · Cosmos DB · Redis)
> **Start Date:** May 5, 2026 | **Prep Window:** April 24 – May 4 (10 days)

---

## Repository Purpose

This repo is your **living portfolio** during prep. Every coding challenge you complete here becomes interview evidence. Every architecture decision you make mirrors what you'll be asked to justify in the interview.

---

## 10-Day Curriculum Map

| Phase | Days | Theme | Key Technologies |
|-------|------|-------|-----------------|
| 1 | 1–2  | Modern Frontend | React 18/19, Microfrontends, PWA, TypeScript |
| 2 | 3–4  | Serverless & Storage | Azure Functions, Blob Storage, Triggers/Bindings |
| 3 | 5–6  | Purposed Databases | Azure SQL, Cosmos DB, EF Core / Prisma |
| 4 | 7–8  | Performance & Security | Redis Cache, Azure AD, Managed Identities |
| 5 | 9–10 | System Design & Interview Sim | Full-stack Architecture, Mock Interviews |

---

## Folder Structure

```
interview-prep/
├── README.md                       ← You are here
├── CURRICULUM.md                   ← Detailed daily breakdown
│
├── phase-1-frontend/
│   ├── lessons/
│   │   ├── day-01-react-18-concurrent.md
│   │   └── day-02-microfrontends-pwa.md
│   ├── challenges/
│   │   ├── day-01-react-challenge/   ← React 18 coding task
│   │   └── day-02-mfe-challenge/     ← Module Federation task
│   └── mock-interviews/
│       ├── day-01-questions.md
│       └── day-02-questions.md
│
├── phase-2-serverless/
│   ├── lessons/
│   ├── challenges/
│   └── mock-interviews/
│
├── phase-3-databases/
│   ├── lessons/
│   ├── challenges/
│   └── mock-interviews/
│
├── phase-4-performance-security/
│   ├── lessons/
│   ├── challenges/
│   └── mock-interviews/
│
├── phase-5-system-design/
│   ├── lessons/
│   ├── challenges/
│   └── mock-interviews/
│
└── shared/
    ├── architecture-diagrams/
    ├── cheat-sheets/
    └── glossary.md
```

---

## How to Use This Repo

1. **Read the lesson** in `lessons/day-XX.md` — understand the *why*.
2. **Implement the challenge** in `challenges/day-XX-challenge/` — produce working code.
3. **Answer the mock interview questions** in `mock-interviews/day-XX-questions.md` — write your answers, then compare to the provided evaluation rubric.
4. **Commit your work daily** — your git history is proof of progress.

---

## Key Success Metrics

- [ ] Can explain Concurrent Rendering, Transitions, and Server Components without notes
- [ ] Can build an Azure Function with HTTP + Blob triggers from scratch
- [ ] Can model a NoSQL schema in Cosmos DB for a real use case
- [ ] Can secure an API with Managed Identity (zero secrets in code)
- [ ] Can whiteboard a full PWA architecture in under 10 minutes
