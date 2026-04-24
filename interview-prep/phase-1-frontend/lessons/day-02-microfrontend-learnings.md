# Day 2 Lesson - Microfrontends With Module Federation

> Goal: Understand microfrontends deeply enough to explain architecture tradeoffs and implement a host + remote setup with confidence.

---

## 1) What A Microfrontend Is (And Is Not)

A microfrontend is an architecture where one frontend is split into independently developed and deployed domain modules, then composed into one user experience.

Important framing for interviews:
- It is an organizational scaling strategy, not a trend.
- It solves team autonomy and release coordination problems.
- It adds integration and governance complexity.

Senior one-liner:
Microfrontends scale teams first, code second.

---

## 2) Why Teams Use It

Business drivers:
- Independent team releases by domain.
- Faster parallel delivery.
- Reduced release train bottlenecks.

Technical drivers:
- Bounded domain ownership in the UI.
- Smaller failure blast radius.
- Gradual modernization of legacy frontend sections.

---

## 3) When You Should Not Use It

Choose monolith when:
- One small team owns the full UI.
- Features are highly coupled and ship together.
- You need very strong consistency with low platform overhead.

Decision rule:
If team boundaries do not require runtime boundaries, stay monolith.

---

## 4) Composition Models

1. Build-time composition
- Import domain packages at build time.
- Simpler and safer.
- Less true team autonomy.

2. Runtime composition (Module Federation)
- Host loads remote modules dynamically.
- Best for independent deployments.
- More runtime risk and governance overhead.

3. Edge/server composition
- Assemble fragments at CDN or server.
- Good for strong SSR control.
- Higher platform complexity.

---

## 5) Module Federation Deep Dive

### 5.1 Host Responsibilities
- Global layout and navigation shell.
- Top-level routing.
- Auth bootstrap and token propagation.
- Error boundaries and resilience orchestration.
- Telemetry bootstrapping.

### 5.2 Remote Responsibilities
- Domain-specific UI and state.
- Domain API adapters.
- Feature logic and local routing where needed.

### 5.3 Shared Dependencies
- react and react-dom as singleton.
- Shared design tokens or UI primitives.
- Telemetry SDK and auth SDK where needed.

### 5.4 Failure Handling Pattern
- Wrap remotes in Suspense fallback for loading.
- Wrap remotes in ErrorBoundary for load/runtime failure.
- Add timeout and degraded UX path.
- Emit telemetry event with correlation id.

---

## 6) Risks Interviewers Expect You To Mention

1. Shared dependency drift
- Different versions across host/remotes can break runtime behavior.

2. Runtime integration failures
- Remote unavailable or contract mismatch causes production break.

3. UX inconsistency
- Teams diverge without shared design system and tokens.

4. Observability gaps
- One journey spans many deployed artifacts.

5. Performance regressions
- Duplicate bundles and extra network requests if sharing is misconfigured.

---

## 7) Mitigation Playbook

- Enforce dependency policy with semantic version constraints.
- Share React as singleton in federation config.
- Keep exposed contracts small and stable.
- Add contract tests for exposed modules.
- Add fallback boundaries and timeout handling.
- Centralize design tokens.
- Use distributed telemetry with correlation ids.

---

## 8) Azure Mapping For Your JD

Frontend hosting:
- Host and remotes on Azure Static Web Apps or App Service.

Identity:
- Azure AD initialized in host.
- Token forwarded to remotes and APIs.

Backend:
- Domain APIs via Azure Functions.

Configuration:
- Environment-driven remote manifest and feature flags.

Observability:
- Application Insights tracing across shell, remotes, and APIs.

---

## 9) Recommended Repo Blueprint (Day 2 Challenge)

phase-1-frontend/challenges/day-02-mfe-challenge/
- host/
	- src/
		- app-shell/
		- routes/
		- mfe/RemoteLoader.tsx
		- telemetry/
	- webpack.config.js
- remote-products/
	- src/
		- ProductsSearch.tsx
		- domain/
	- webpack.config.js
- shared/
	- ui-tokens/
	- contracts/

Start small:
- Expose one remote component first.
- Prove loading, fallback, and telemetry before scaling.

---

## 10) Interview Script (60 Seconds)

We choose microfrontends when multiple domain teams need independent release velocity. Module Federation enables runtime composition while preserving domain ownership. The main risks are dependency drift and remote load failures, so I enforce singleton shared dependencies, semantic version governance, contract checks, and host-level fallback boundaries with timeout. I centralize design tokens to keep UX consistent and use distributed telemetry for traceability. If one team owns tightly coupled features, I stay monolith because microfrontend overhead would outweigh benefits.

---

## 11) Rapid Revision Checklist

Before interview rounds, confirm you can answer these:
- Why microfrontend is an organizational decision.
- Host vs remote boundaries.
- One concrete failure mode and mitigation.
- When to reject microfrontends.
- How Azure AD, Azure Functions, and Application Insights fit the architecture.

---

## 12) Practice Prompts

1. Explain host vs remote boundaries for a catalog + checkout application.
2. Describe how you prevent a remote outage from breaking checkout.
3. Defend monolith over microfrontend for a startup with one team.
4. Explain how you keep bundle size in control with Module Federation.
