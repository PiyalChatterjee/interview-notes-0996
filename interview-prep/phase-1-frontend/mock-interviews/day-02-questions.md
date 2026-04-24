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

_(Write here)_

---

**Mentor-Calibrated Answer (Senior-Level):**

_(Will be added after your answer)_

---

**Self-Evaluation:**

_(Score + improvements after your answer)_

---

## Question 3

> "How do you prevent a broken remote from taking down the full user journey in production?"

**Your Answer:**

_(Write here)_

---

**Mentor-Calibrated Answer (Senior-Level):**

_(Will be added after your answer)_

---

**Self-Evaluation:**

_(Score + improvements after your answer)_

---

## Overall Day 2 Reflection

- What clicked today?
- What needs more reinforcement?
- One thing to revisit before Day 3:
