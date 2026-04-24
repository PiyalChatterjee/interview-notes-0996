# Day 1 Mock Interview — My Answers

> Write your answers below each question, then compare to the evaluation rubric in the lesson file.

---

## Question 1

> "Our product team wants to implement a real-time search filter on a catalog page with 10,000 SKUs. The current implementation freezes the browser on every keystroke. Walk me through your complete solution using React 18 APIs."

**Your Answer:**

Well, we need lazy loading to handle such a high load. Inside the components, there needs to be debouncing to do async calls but also keep the page responsive. For filtering, use `useTransition` to do async-like behavior. Also use `useMemo` to render the list, and `useDeferredValue` to update the filter value. That way, the page is responsive and the result is rendered. `useMemo` helps in caching.

---

**Mentor-Calibrated Answer (Senior-Level):**

I would first identify the root cause: the filter work and list rendering are happening synchronously on every keystroke, blocking the main thread and hurting INP.

Then I would split urgent vs non-urgent work:
- Urgent: keep input updates immediate so typing never lags.
- Non-urgent: wrap expensive filter state updates in `startTransition`.

For large list rendering:
- Use `useDeferredValue` so heavy child components can read a deferred filter value.
- Wrap the result list with `memo` so deferred rendering actually reduces re-renders.
- Use `useMemo` for expensive derived calculations (filtered/sorted arrays).

For network-backed search:
- Add debouncing to reduce request volume.
- Keep debouncing as complementary to concurrent rendering, not a replacement.

For 10,000+ SKUs:
- Add list virtualization (`react-window` or TanStack Virtual) so only visible rows render.
- Verify with React Profiler and Web Vitals (especially INP) before/after.

Result: typing stays responsive, expensive rendering is interruptible, and large datasets remain performant.

---

**Self-Evaluation:** _(After writing your answer, score yourself 1–5 and note what you missed)_

- Score: 3.5/5
- What went well:
	- Correctly named key tools: lazy loading, debouncing, `useTransition`, `useMemo`, `useDeferredValue`.
	- Focused on responsiveness.
- What to improve:
	- Say the root cause explicitly: synchronous rendering blocks the main thread.
	- Clarify that `useTransition` is priority scheduling, not true async execution.
	- Mention that `useDeferredValue` helps read-side deferral and works best with `memo`.
	- Add virtualization for 10k items.

---

**Concepts To Reinforce Before Day 2:**

1. Urgent vs non-urgent updates in Concurrent Rendering.
2. `useTransition` (write-side priority) vs `useDeferredValue` (read-side deferral).
3. `useMemo` vs `memo` vs `useCallback` and when each matters.
4. Debounce/throttle vs transition (problem each one solves).
5. Virtualized lists for large datasets.

---

## Question 2

> "What is the difference between `useTransition` and `useDeferredValue`? Can they be used together, and if so, when would you?"

**Your Answer:**

`useTransition` helps in bypassing the activity, helps to keep the page responsive as the state update is happening. `useDeferredValue` updates the value late, keeping UI working. The difference is there is concurrent activity in `useTransition` and delayed activity in `useDeferredValue`. Both can happen together — especially when filtering a big list. `useTransition` helps work on non-urgent activity, and for that non-urgent activity, to propagate the changes, we use `useDeferredValue`.

Parent-child relationship: urgent is to update the input field for the filter. The filtering is non-urgent. UI interactive activity is always urgent, but the process out of the input is non-urgent.

---

**Mentor-Calibrated Answer (Senior-Level):**

The core distinction is ownership of the state setter:

- `useTransition`: use it when **you own the state setter** — you wrap the update in `startTransition` to mark it as low priority (write-side control).
- `useDeferredValue`: use it when **you don't own the setter** — the value comes from a parent prop, and you defer how quickly the child reads it (read-side control).

Neither is truly "delayed" or "async." React runs **both renders concurrently** — the urgent render first, then the deferred one in the background. The stale (previous) value stays visible while the new one is being computed.

Critical requirement: `useDeferredValue` only helps if the child component is wrapped in `memo`. Without `memo`, React re-renders the child eagerly anyway and the deferral does nothing.

Used together — concrete parent-child scenario:
```
Parent owns: query state + startTransition (write-side — useTransition)
  → passes query as prop to child

Child receives query as prop:
  → applies useDeferredValue(query)     (read-side — useDeferredValue)
  → wrapped in memo to prevent eager re-renders
```

Urgent: typing in the input (input value updates immediately).
Non-urgent transition: filter state update (wrapped in startTransition).
Deferred read: child ResultsList receives deferredQuery and renders in background.

---

**Self-Evaluation:**

- Score: 5.5/10
- What went well:
  - Correctly identified urgent vs non-urgent split.
  - Knew both can be used together.
  - Parent-child intuition was right.
- What to improve:
  - The key selector is: "Do I own the state setter?" — use that as your decision rule.
  - `useDeferredValue` doesn't "delay" — React renders **both simultaneously**, showing the stale value until the new one is ready.
  - Always mention: `memo` is required for `useDeferredValue` to have any effect.
  - Avoid "bypassing" — the correct term is "marking as low priority / non-urgent."

---

**Concepts To Reinforce:**

1. Concurrent rendering renders both versions simultaneously — it is not async or delayed.
2. Decision rule: own the setter → `useTransition` | prop from parent → `useDeferredValue`.
3. `memo` is a prerequisite for `useDeferredValue` to work.
4. Both APIs use the same Concurrent Renderer mechanism — they differ only in where you apply the priority hint.

---

## Question 3

> "How would you architect a React 18 PWA so that it scores 90+ on Google Lighthouse Performance? What specific React APIs map to which Lighthouse metrics?"

**Your Answer:**

I would try to achieve this architecture flow:

User interacts → `useTransition` (prioritize the activity and hold on non-urgent activity by memoising) → `Suspense` (helps to load a fallback page in case some UI elements break when page loads) → lazy load (render requested components) → browser → Service Worker (caches assets to render)

---

**Mentor-Calibrated Answer (Senior-Level):**

I would address each Lighthouse metric individually:

**LCP / FCP — Fast First Paint:**
Use the PWA App Shell Architecture. The Service Worker caches the shell HTML/CSS/JS on first visit. On repeat visits it serves from cache, bypassing the network entirely. The user sees content in milliseconds regardless of connection speed.

**INP — Interaction to Next Paint:**
Use `useTransition` so that user interactions (clicks, typing) are always processed immediately. Expensive state updates are marked as non-urgent and run in the background without blocking the input response.

**CLS — Cumulative Layout Shift:**
Use `Suspense` fallbacks with skeleton screens that have fixed/known dimensions. This prevents content from jumping around while dynamic components are loading.

**TTI — Time to Interactive:**
Use `React.lazy` with `Suspense` for route-based code splitting. The initial bundle stays small, so the main thread is free to respond to events earlier.

**FID / Offline:**
Service Worker intercepts all fetch requests. Cache-first strategy for shell assets, network-first for API data with a cached fallback when offline.

Metric to API mapping:

| Metric | Solution |
|--------|----------|
| LCP / FCP | Service Worker cache-first for App Shell |
| INP | `useTransition` — urgent input, non-urgent compute |
| CLS | `Suspense` skeleton fallbacks with fixed dimensions |
| TTI | `React.lazy` — route-based code splitting |
| Offline | Service Worker with network-first + cache fallback |

---

**Self-Evaluation:**

- Score: 5/10
- What went well:
  - Correctly identified the general architecture flow from user interaction to Service Worker.
  - `useTransition`, `Suspense`, `React.lazy`, and Service Worker were all named.
  - The sequence shows genuine understanding of how the layers connect.
- What to improve:
  - The answer needs to be organized by **metric name** — LCP, INP, CLS, TTI. Without naming metrics, the interviewer cannot tell if you know what you're optimizing for.
  - `useTransition` does not "memoise" — `useMemo`/`memo` handle memoization. `useTransition` handles render priority.
  - `Suspense` is not for "when UI elements break" — it is specifically for showing a fallback while lazy-loaded or async components are rendering.
  - Service Worker at the end is correct architecture but interviewers expect it mentioned alongside LCP/FCP, not as an afterthought.

---

**Concepts To Reinforce:**

1. The 5 Lighthouse metrics and what each measures.
2. `useTransition` = priority scheduler, not a memoization tool.
3. `Suspense` = loading boundary for lazy/async components, not an error boundary (that is `ErrorBoundary`).
4. Service Worker is the first line of defense for LCP and FCP — mention it first, not last.

---

## Overall Day 1 Reflection

- **What clicked today:** The architecture flow — how user interaction, React concurrent APIs, and the Service Worker form a continuous pipeline for performance.
- **What needs more reinforcement:** Lighthouse metric names and which exact API fixes each one. Also the precise role of `Suspense` vs `ErrorBoundary`.
- **One thing to revisit before Day 2:** Read the "Mentor Concept Booster" section in the Day 1 lesson. Recite the metric → API mapping table from memory before starting Day 2.
