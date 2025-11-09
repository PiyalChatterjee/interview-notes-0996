// Problem 7: Debounce Function
function debounce(fn, delay) {
  // Implement debounce using closures
  // Should delay function execution until user stops calling it
  let timeoutId;

  return function (...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);

    // Set new timeout
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// Test debounce
const handleSearch = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 500);

console.log("--- Testing Debounce ---");
console.log("User types fast:");
handleSearch("h");
handleSearch("he");
handleSearch("hel");
handleSearch("hell");
handleSearch("hello");
// Should only log once: "Searching for: hello" after 500ms

// Problem 8: Throttle Function
function throttle(fn, limit) {
  // Implement throttle using closures
  // Should ensure fn is called at most once per limit period
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Test throttle
const handleScroll = throttle(() => {
  console.log("Scrolled!");
}, 1000);

console.log("\n--- Testing Throttle ---");
console.log("User scrolls continuously:");
handleScroll(); // Logs immediately
handleScroll(); // Ignored (within 1000ms)
handleScroll(); // Ignored (within 1000ms)

setTimeout(() => handleScroll(), 500); // Ignored (within 1000ms)
setTimeout(() => handleScroll(), 1100); // Logs (after 1000ms passed)
setTimeout(() => handleScroll(), 1200); // Ignored (within 1000ms of previous)
setTimeout(() => handleScroll(), 2200); // Logs (after 1000ms passed)

// EXPLANATION:

console.log("\n--- How They Work ---");

console.log(`
DEBOUNCE:
- Delays execution until user stops triggering the function
- Resets the timer on every call
- Use case: Search input, window resize, form validation
- Example: Wait for user to finish typing before making API call

THROTTLE:
- Limits execution to once per time period
- Ignores calls during the "cooldown" period
- Use case: Scroll events, mouse movement, button clicks
- Example: Update scroll position indicator max once per second

KEY DIFFERENCES:
┌──────────┬─────────────────────────────────┬────────────────────────────┐
│          │ Debounce                        │ Throttle                   │
├──────────┼─────────────────────────────────┼────────────────────────────┤
│ Timing   │ Executes after delay ends       │ Executes immediately, then │
│          │                                 │ waits for cooldown         │
├──────────┼─────────────────────────────────┼────────────────────────────┤
│ Behavior │ Resets timer on every call      │ Ignores calls during wait  │
├──────────┼─────────────────────────────────┼────────────────────────────┤
│ When     │ After user stops                │ At regular intervals       │
└──────────┴─────────────────────────────────┴────────────────────────────┘
`);

// Real-world examples:

// Debounce: Search autocomplete
const searchAPI = debounce((query) => {
  // API call only happens when user stops typing
  console.log(`API call for: ${query}`);
}, 300);

// Throttle: Infinite scroll
const checkScrollPosition = throttle(() => {
  // Check scroll position max once per second
  const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
  console.log(`Scroll position: ${scrollPercent}%`);
}, 1000);

// Advanced: Debounce with immediate execution option
function debounceAdvanced(fn, delay, immediate = false) {
  let timeoutId;

  return function (...args) {
    const callNow = immediate && !timeoutId;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        fn(...args);
      }
    }, delay);

    if (callNow) {
      fn(...args);
    }
  };
}

// Advanced: Throttle with trailing call option
function throttleAdvanced(fn, limit, trailing = false) {
  let inThrottle = false;
  let lastArgs = null;

  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
        if (trailing && lastArgs) {
          fn(...lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else if (trailing) {
      lastArgs = args;
    }
  };
}
