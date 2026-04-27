# Day 2 Mock Interview - Microfrontends

> Live Q&A log maintained in the same format as Day 1.

---

## Question 1

> "Our CTO asks: Why are we moving to microfrontends? Convince me this is not overengineering."

**Your Answer:**

Microfrontends scale teams. This way we can enhance business by focusing on different features in parallel, rather than one team focusing on everything.

Technically, it helps in splitting code and progressing in parallel. CI/CD becomes easier to control and observe.

Inconsistency can be an issue, teams need to be in sync while developing.

Enforce dependency policy and proper semantic version ranges so teams stay in sync. Also keep a fallback UI with remote load timeout so user experience remains seamless.

---

**Mentor-Calibrated Answer (Senior-Level):**

Microfrontends are primarily an organizational scaling strategy.

Business-wise, they let domain teams release independently, reducing release coordination overhead and improving time-to-market.

Technically, runtime composition isolates domains and reduces blast radius when a single module fails.

The biggest risk is runtime integration/version drift in shared dependencies.

I mitigate this using singleton shared dependencies (`react`, `react-dom`), semantic version governance, contract checks, and host-level fallback boundaries with timeout handling.

If one small team owns tightly coupled features and releases together, I would reject microfrontends and keep a monolith for lower operational complexity.

---

**Self-Evaluation:**

- Score: 7/10
- What went well:
  - Strong business framing (team scaling and parallel delivery).
  - Correct risk identification (cross-team inconsistency).
  - Good mitigation instincts (dependency policy, semantic versioning, fallback UI).
- What to improve:
  - Add explicit rejection condition (when monolith is better).
  - Use precise senior terms: runtime integration failures, dependency drift, singleton shared dependencies.

---

**Concepts To Reinforce:**

1. Microfrontend is an org scaling strategy first, technical pattern second.
2. Host vs remote responsibility boundaries.
3. Singleton shared dependencies in Module Federation.
4. Failure containment with Suspense + ErrorBoundary + timeout fallbacks.

---

## Question 2

> "You are implementing Module Federation. What exact modules would you keep in the host vs remote, and why?"

**Your Answer:**

Host is the orchestrator: it controls the shell with error boundary, lazy loading, top-level routing, and layout. This ensures if any remote feature fails, the user interaction doesn't stop.

Remote owns a bounded domain: it develops and deploys the feature independently, and the host consumes it.

We share React and React-DOM as singletons to prevent version drift. From the host's perspective, it's one component; behind it are two independent entities.

Advantage: team autonomy—each team deploys independently—and controlled blast radius if a feature fails.

---

**Mentor-Calibrated Answer (Senior-Level):**

Host is the orchestrator: it controls the application shell with error boundary, lazy loading, top-level routing, and layout. This ensures if any remote feature fails, the user journey continues uninterrupted.

Remote owns a bounded domain: the team develops, tests, and deploys the feature independently. Host consumes it at runtime.

We share React and React-DOM as singletons to prevent version drift—keeping shared versions aligned while allowing independent deployments.

Advantage: team autonomy (each domain team ships independently), controlled blast radius (remote failure doesn't crash the shell), and cleaner governance (one team, one feature, one deployed artifact).

---

**Self-Evaluation:**

- Score: 8.5/10
- What went well:
  - Clear host/remote split (orchestrator vs. domain).
  - Concrete shell mechanics (error boundary, lazy loading, routing).
  - Resilience framing (failure containment).
  - Dependency governance (singletons, version alignment).
  - Business outcomes (autonomy + blast radius).
  - Confident, concise tone.
- What to refine:
  - "From host's perspective, one component; behind it two entities" is slightly abstract. Replace with: "keeping shared versions aligned while allowing independent deployments."

---

## Question 3

> "How do you prevent a broken remote from taking down the full user journey in production?"

**Your Answer:**

Add error boundary over Suspense—helps catch state and render based on state. Also high-level routing—helps route when retries reach a certain point, stops interaction if error is fatal.

Add logging for every error encountered—needed for debugging. Add timeout—gives time to load modules; if timeout reached, render failsafe component and log failure.

---

**Mentor-Calibrated Answer (Senior-Level):**

Error boundary wraps Suspense to catch async load failures in isolation. Track retry count internally—if max retries (e.g., 3) exhausted, route to a fatal error page instead of showing retry UI. This prevents infinite retry loops and user frustration.

Implement a 5-second timeout on module import using Promise.race; timeout rejection triggers error boundary fallback with failsafe UI (empty state or cached data).

Log all failures with correlation IDs (tie load attempt → timeout/error → retry → final outcome) so production ops can trace root cause per user session.

Result: broken remote stays contained in its boundary, host shell remains responsive, other features work, and observability enables rapid incident response.

---

**Self-Evaluation:**

- Score: 8.5/10
- What went well:
  - Layered architecture (error boundary OVER Suspense).
  - State-driven rendering with max-retry circuit breaker.
  - Timeout as safety net to prevent hangs.
  - Observability-first mindset (logging for every error).
  - Production maturity (failsafe, correlation IDs implied).
  - Concise, actionable language.
- What to refine for 9+:
  - Explicitly state max retry count (e.g., "3 attempts then fatal").
  - Name the failsafe fallback strategy (e.g., "render cached data, read-only UI, or empty state").
  - Make blast radius containment explicit (e.g., "correlation IDs allow host to isolate which remote failed and continue serving other features").

---

**Concepts To Reinforce:**

1. Error boundaries + Suspense + timeout = resilience triangle.
2. State-driven rendering based on error type (recoverable vs. fatal).
3. Observability (logging, correlation IDs, structured error metadata).
4. Circuit breaker pattern (max retries, graceful degradation, fatal state routing).

---

## Overall Day 2 Reflection

- **What clicked today:** Host-vs-remote ownership became very clear in both design and implementation. You connected interview theory to real execution: `Suspense` + `ErrorBoundary` + timeout + retry behavior, and you framed resilience in business terms (blast radius, user journey continuity, team autonomy).
- **What needs more reinforcement:** Say the numbers and fallback strategy explicitly in interviews: "3 retries then fatal route," "5s timeout," and "failsafe UI (cached/read-only/empty state)." Also keep correlation-ID observability language concise and repeatable.
- **One thing to revisit before Day 3:** Do one 60-second recap out loud of the production failure-handling flow: remote load -> timeout/error -> boundary fallback -> retries -> fatal route -> telemetry/logging trace.
