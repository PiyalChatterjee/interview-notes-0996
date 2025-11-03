# 🚀 JavaScript Interview Preparation: Complete Cheat Sheet

**Last Updated:** October 30, 2025  
**Difficulty Level:** Beginner to Advanced  
**Estimated Prep Time:** 20-30 hours

---

## 📋 Table of Contents

1. [Part 1: JavaScript Fundamentals](#part-1-javascript-fundamentals)
2. [Part 2: Advanced Topics](#part-2-advanced-topics)
3. [Part 3: ES6+ Features](#part-3-es6-features)
4. [Part 4: Interactive DOM Examples](#part-4-interactive-dom-examples)
5. [Part 5: 150+ MCQs](#part-5-150-mcqs)
6. [Part 6: 50+ Subjective Q&A](#part-6-50-subjective-qa)
7. [References & Citations](#references--citations)

---

# Part 1: JavaScript Fundamentals

## 1. Variables & Data Types

### Var vs Let vs Const

**Explanation:**

- **`var`**: Function scoped, hoisted, can be redeclared and updated
- **`let`**: Block scoped, hoisted (Temporal Dead Zone), can be updated but not redeclared
- **`const`**: Block scoped, hoisted (TDZ), cannot be updated or redeclared, but properties can be modified

**Code Examples:**

```javascript
// VAR - Function Scoped
function varExample() {
  if (true) {
    var x = 1;
  }
  console.log(x); // 1 (accessible outside if block)
}

// LET - Block Scoped
function letExample() {
  if (true) {
    let y = 2;
  }
  console.log(y); // ReferenceError: y is not defined
}

// CONST - Block Scoped, Immutable
const obj = { name: "Alice" };
obj.name = "Bob"; // ✓ Works (property modification)
obj = {}; // ✗ TypeError: Assignment to constant variable

// HOISTING DIFFERENCES
console.log(a); // undefined (hoisted)
var a = 5;

console.log(b); // ReferenceError (TDZ)
let b = 10;

// REDECLARATION
var x = 1;
var x = 2; // ✓ Allowed

let y = 1;
let y = 2; // ✗ SyntaxError

const z = 1;
const z = 2; // ✗ SyntaxError
```

**MCQ:**
Q: What is the output?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// (A) 0, 1, 2  (B) 3, 3, 3  (C) undefined  (D) ReferenceError
// Answer: B (var is function-scoped, i is 3 after loop)
```

**Q&A:**
Q: How would you fix the above to print 0, 1, 2?

```javascript
// Solution 1: Use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// Solution 2: IIFE (Immediately Invoked Function Expression)
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}

// Solution 3: bind method
for (var i = 0; i < 3; i++) {
  setTimeout(console.log.bind(console, i), 100);
}
```

---

### Primitive vs Reference Types

**Code Example:**

```javascript
// PRIMITIVE TYPES - Passed by value
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 (unchanged)

// REFERENCE TYPES - Passed by reference
let obj1 = { value: 5 };
let obj2 = obj1;
obj2.value = 10;
console.log(obj1.value); // 10 (changed)

// DEEP COPY vs SHALLOW COPY
const original = { name: "Alice", address: { city: "NYC" } };

// Shallow copy
const shallow = { ...original };
shallow.address.city = "LA";
console.log(original.address.city); // LA (modified)

// Deep copy
const deep = JSON.parse(JSON.stringify(original));
deep.address.city = "Boston";
console.log(original.address.city); // LA (unchanged)

// Using structuredClone (newer approach)
const deepClone = structuredClone(original);
```

---

## 2. Functions & Closures

### Function Types

**Code Example:**

```javascript
// 1. FUNCTION DECLARATION (Hoisted)
function add(a, b) {
  return a + b;
}

// 2. FUNCTION EXPRESSION (Not hoisted)
const subtract = function (a, b) {
  return a - b;
};

// 3. ARROW FUNCTION (No 'this' binding, no 'arguments')
const multiply = (a, b) => a * b;

// 4. IIFE - Immediately Invoked Function Expression
(function () {
  console.log("Runs immediately!");
})();

// 5. GENERATOR FUNCTION
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }

// 6. ASYNC FUNCTION
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}
```

**Key Differences Table:**

| Feature        | Regular | Arrow   | Generator | Async   |
| -------------- | ------- | ------- | --------- | ------- |
| `this` binding | Dynamic | Lexical | Dynamic   | Dynamic |
| `arguments`    | Yes     | No      | Yes       | Yes     |
| `new` keyword  | Yes     | No      | Yes       | No      |
| Return value   | Any     | Any     | Generator | Promise |

---

### Closures - Deep Dive

**Explanation:**
A closure is a function that has access to its lexical scope even after the function has returned. Closures allow data privacy and are powerful for creating factories and decorators.

**Code Examples:**

```javascript
// BASIC CLOSURE
function counter() {
  let count = 0; // Private variable
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count,
  };
}
const c = counter();
console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(c.get()); // 2

// CLOSURE FACTORY
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// MODULE PATTERN (Using closures)
const calculator = (function () {
  let result = 0;

  return {
    add(x) {
      result += x;
      return this;
    },
    subtract(x) {
      result -= x;
      return this;
    },
    multiply(x) {
      result *= x;
      return this;
    },
    getResult() {
      return result;
    },
  };
})();

console.log(calculator.add(5).multiply(2).subtract(3).getResult()); // 7

// MEMORY LEAK WITH CLOSURES
function problematicClosure() {
  const largeArray = new Array(1000000).fill("data");
  return function () {
    console.log(largeArray.length); // Still holds reference to largeArray
  };
}

// PROPER CLEANUP
function properClosure() {
  let largeArray = new Array(1000000).fill("data");
  const length = largeArray.length;
  largeArray = null; // Release reference
  return function () {
    console.log(length);
  };
}
```

**MCQ:**

```javascript
const functions = [];
for (var i = 0; i < 3; i++) {
  functions.push(() => i);
}
console.log(functions[0]()); // (A) 0  (B) 3  (C) undefined  (D) Error
// Answer: B (i is 3 after loop ends)
```

**Q&A:**
Q: How would you use closures to create private methods?

```javascript
class User {
  constructor(name) {
    let _name = name; // Private variable

    this.getName = () => _name;
    this.setName = (newName) => {
      if (newName.length > 0) _name = newName;
    };
  }
}

const user = new User("Alice");
console.log(user.getName()); // Alice
user.setName("Bob");
console.log(user.getName()); // Bob
console.log(user._name); // undefined (truly private)
```

---

## 3. Scope & Hoisting

### Understanding Scope

**Code Example:**

```javascript
// GLOBAL SCOPE
var globalVar = "global";
let globalLet = "global let";

function testScope() {
  // FUNCTION SCOPE
  var functionVar = "function";
  let functionLet = "function let";

  if (true) {
    // BLOCK SCOPE
    var blockVar = "block var";
    let blockLet = "block let";
  }

  console.log(blockVar); // 'block var' (var ignores block scope)
  // console.log(blockLet); // ReferenceError (let respects block scope)
}

// LEXICAL SCOPE
function outer() {
  const name = "outer";

  function inner() {
    console.log(name); // Has access to outer's scope
  }

  inner();
}
outer(); // 'outer'

// SCOPE CHAIN
const global = "global";

function level1() {
  const level1Var = "level1";

  function level2() {
    const level2Var = "level2";

    function level3() {
      console.log(global); // Searches: level3 → level2 → level1 → global
    }

    level3();
  }

  level2();
}
```

---

### Hoisting

**Explanation:**
Hoisting is JavaScript's behavior of moving declarations to the top of their scope before execution. Variables and functions are hoisted differently.

**Code Example:**

```javascript
// FUNCTION DECLARATION HOISTING (Complete - can be called before declaration)
console.log(greet()); // Works! Returns "Hello"

function greet() {
  return "Hello";
}

// FUNCTION EXPRESSION HOISTING (Partial - variable is hoisted, not the function)
console.log(add); // undefined (variable hoisted but not initialized)
// console.log(add(2, 3)); // TypeError: add is not a function

var add = function (a, b) {
  return a + b;
};

// VARIABLE HOISTING
console.log(x); // undefined (hoisted but not initialized)
var x = 5;

// LET/CONST HOISTING (Temporal Dead Zone)
// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// CLASS HOISTING (Similar to let/const - TDZ)
// const obj = new MyClass(); // ReferenceError

class MyClass {
  constructor() {
    this.name = "MyClass";
  }
}

// HOISTING RULES SUMMARY
console.log("\n=== HOISTING SUMMARY ===");

// Var: Hoisted, initialized as undefined
console.log(typeof varVar); // undefined
var varVar = 1;

// Let: Hoisted, not initialized (TDZ)
// console.log(typeof letVar); // ReferenceError
let letVar = 2;

// Const: Hoisted, not initialized (TDZ)
// console.log(typeof constVar); // ReferenceError
const constVar = 3;

// Function declaration: Fully hoisted
console.log(typeof funcDecl); // function
function funcDecl() {}

// Function expression: Only variable hoisted
console.log(typeof funcExpr); // undefined
var funcExpr = function () {};
```

---

## 4. Objects & Arrays

### Object Operations

**Code Example:**

```javascript
// OBJECT CREATION
const obj = {
  name: "Alice",
  age: 30,
  greet() {
    return `Hello, ${this.name}`;
  },
};

// PROPERTY ACCESS
console.log(obj.name); // Dot notation
console.log(obj["name"]); // Bracket notation

// DYNAMIC PROPERTY ACCESS
const key = "age";
console.log(obj[key]); // 30

// OBJECT METHODS
console.log(Object.keys(obj)); // ['name', 'age', 'greet']
console.log(Object.values(obj)); // ['Alice', 30, f]
console.log(Object.entries(obj)); // [['name', 'Alice'], ['age', 30], ...]

// OBJECT ASSIGNMENT & MERGING
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const merged = Object.assign({}, obj1, obj2);
console.log(merged); // { a: 1, b: 3, c: 4 }

// SPREAD OPERATOR (Modern approach)
const merged2 = { ...obj1, ...obj2 };
console.log(merged2); // { a: 1, b: 3, c: 4 }

// PROPERTY DESCRIPTORS
Object.defineProperty(obj, "email", {
  value: "alice@example.com",
  writable: false,
  enumerable: true,
  configurable: false,
});

// FREEZE, SEAL, PREVENT EXTENSIONS
Object.freeze(obj); // Cannot add, delete, or modify
Object.seal(obj); // Can modify existing, cannot add/delete
Object.preventExtensions(obj); // Cannot add, but can modify/delete
```

---

### Array Methods - Comprehensive

**Code Example:**

```javascript
const numbers = [1, 2, 3, 4, 5];

// 1. MAP - Transform each element
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 2. FILTER - Keep elements that pass test
const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

// 3. REDUCE - Accumulate single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Group by property
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 30 },
];

const groupedByAge = users.reduce((acc, user) => {
  const age = user.age;
  if (!acc[age]) acc[age] = [];
  acc[age].push(user);
  return acc;
}, {});

console.log(groupedByAge);
// { '25': [Alice, Bob], '30': [Charlie] }

// 4. FIND - Get first element that matches
const firstEven = numbers.find((n) => n % 2 === 0);
console.log(firstEven); // 2

// 5. FINDINDEX - Get index of first match
const index = numbers.findIndex((n) => n === 3);
console.log(index); // 2

// 6. FOREACH - Execute for each element (no return)
numbers.forEach((n, i) => console.log(`${i}: ${n}`));

// 7. SOME - Check if any element passes test
const hasEven = numbers.some((n) => n % 2 === 0);
console.log(hasEven); // true

// 8. EVERY - Check if all elements pass test
const allPositive = numbers.every((n) => n > 0);
console.log(allPositive); // true

// 9. INCLUDES - Check if array contains value
console.log(numbers.includes(3)); // true

// 10. FLAT - Flatten nested arrays
const nested = [1, [2, 3, [4, 5]]];
console.log(nested.flat()); // [1, 2, 3, [4, 5]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5]

// 11. FLATMAP - Map then flatten
const sentences = ["Hello world", "How are you"];
const words = sentences.flatMap((s) => s.split(" "));
console.log(words); // ['Hello', 'world', 'How', 'are', 'you']

// 12. SORT - Sort in place
const sorted = [3, 1, 4, 1, 5].sort((a, b) => a - b);
console.log(sorted); // [1, 1, 3, 4, 5]

// 13. REVERSE - Reverse in place
const reversed = [1, 2, 3].reverse();
console.log(reversed); // [3, 2, 1]

// 14. CONCAT - Combine arrays (non-mutating)
const combined = [1, 2].concat([3, 4]);
console.log(combined); // [1, 2, 3, 4]

// 15. SLICE - Extract portion (non-mutating)
const sliced = numbers.slice(1, 3);
console.log(sliced); // [2, 3]

// 16. SPLICE - Remove/insert (mutating)
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 2, "a", "b"); // Remove 2 from index 2, insert 'a', 'b'
console.log(arr); // [1, 2, 'a', 'b', 5]

// CHAINING ARRAY METHODS
const result = numbers
  .filter((n) => n > 2)
  .map((n) => n * 2)
  .reduce((sum, n) => sum + n, 0);
console.log(result); // (3*2) + (4*2) + (5*2) = 24
```

**MCQ:**

```javascript
const arr = [1, 2, 3];
const result = arr.map((x) => x * 2).filter((x) => x > 3);
// (A) [2, 4]  (B) [4, 6]  (C) []  (D) Error
// Answer: B ([2, 4, 6] after map, [4, 6] after filter)
```

---

## 5. Asynchronous JavaScript

### Callbacks

**Code Example:**

```javascript
// CALLBACK PATTERN
function fetchUserData(userId, callback) {
  setTimeout(() => {
    const user = { id: userId, name: "Alice" };
    callback(null, user); // (error, data) convention
  }, 1000);
}

fetchUserData(1, (err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log(user);
  }
});

// CALLBACK HELL (Pyramid of Doom)
getUser(1, function (err, user) {
  if (!err) {
    getOrders(user.id, function (err, orders) {
      if (!err) {
        getOrderDetails(orders[0].id, function (err, details) {
          if (!err) {
            console.log(details);
          }
        });
      }
    });
  }
});
```

---

### Promises

**Code Example:**

```javascript
// CREATING A PROMISE
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve('Success!');
    } else {
      reject(new Error('Failed!'));
    }
  }, 1000);
});

// CONSUMING A PROMISE
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));

// PROMISE METHODS
// 1. Promise.all - Wait for all to resolve
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
.then(responses => Promise.all(responses.map(r => r.json())))
.then(data => console.log(data))
.catch(err => console.error(err));

// 2. Promise.race - First to settle wins
Promise.race([
  fetch('/api/fast'),
  fetch('/api/slow')
])
.then(response => console.log('First response:', response));

// 3. Promise.allSettled - Wait for all, returns status
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
])
.then(results => console.log(results));
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: 'error' },
//   { status: 'fulfilled', value: 3 }
// ]

// 4. Promise.any - First fulfilled wins
Promise.any([
  Promise.reject('error1'),
  Promise.reject('error2'),
  Promise.resolve('success')
])
.then(result => console.log(result)); // 'success'
.catch(err => console.error(err)); // AggregateError

// PROMISE CHAINING
fetch('/api/user/1')
  .then(response => response.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error('Error:', error));
```

---

### Async/Await - Deep Dive

**Code Example:**

```javascript
// BASIC ASYNC/AWAIT
async function getUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw if needed
  } finally {
    console.log("Request completed");
  }
}

// PARALLEL EXECUTION
async function fetchMultiple() {
  try {
    // Sequential (slower)
    const user = await fetch("/api/user").then((r) => r.json());
    const posts = await fetch("/api/posts").then((r) => r.json());

    // Parallel (faster)
    const [userData, postsData] = await Promise.all([
      fetch("/api/user").then((r) => r.json()),
      fetch("/api/posts").then((r) => r.json()),
    ]);

    return { userData, postsData };
  } catch (error) {
    console.error(error);
  }
}

// ERROR HANDLING
async function robustFetch(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// ASYNC ITERATOR
async function* asyncGenerator() {
  for (let i = 0; i < 3; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  for await (const value of asyncGenerator()) {
    console.log(value); // 0, 1, 2 (with 1s delay each)
  }
})();

// TIMING & TIMEOUT
async function withTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), timeoutMs)
  );
  return Promise.race([promise, timeoutPromise]);
}
```

**MCQ:**

```javascript
async function test() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}

console.log("start");
test();
console.log("end");

// Output order?
// (A) start, 1, end, 2
// (B) start, end, 1, 2
// (C) 1, start, 2, end
// (D) start, 1, 2, end
// Answer: A
```

**Q&A:**
Q: How would you cancel an async operation?

```javascript
// Using AbortController
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch("/api/data", { signal: controller.signal });
  const data = await response.json();
  console.log(data);
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request was cancelled");
  }
} finally {
  clearTimeout(timeoutId);
}
```

---

## 6. Error Handling

**Code Example:**

```javascript
// TRY-CATCH-FINALLY
try {
  // Code that might throw
  const result = JSON.parse("invalid json");
} catch (error) {
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);
} finally {
  console.log("Always runs");
}

// CUSTOM ERRORS
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email format");
  }
}

try {
  validateEmail("invalid-email");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation failed:", error.message);
  }
}

// PROMISE ERROR HANDLING
function divide(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject(new Error("Division by zero"));
    } else {
      resolve(a / b);
    }
  });
}

divide(10, 0)
  .then((result) => console.log(result))
  .catch((error) => console.error(error.message))
  .finally(() => console.log("Done"));

// GLOBAL ERROR HANDLER
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  // Send to error tracking service
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});
```

---

# Part 2: Advanced Topics

## 7. The `this` Keyword - Complete Guide

**Explanation:**
The value of `this` is determined by how a function is called, not where it's defined. Understanding this is crucial for JavaScript mastery.

**Code Example:**

```javascript
// 1. GLOBAL CONTEXT
console.log(this); // window (browser) or global (Node.js)

function globalFunc() {
  console.log(this); // window or global
}
globalFunc();

// 2. OBJECT METHOD
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name); // 'Alice'
  },
};
obj.greet();

// 3. CONSTRUCTOR FUNCTION
function Person(name) {
  this.name = name;
  this.introduce = function () {
    console.log(`Hi, I'm ${this.name}`);
  };
}

const person = new Person("Bob");
person.introduce(); // "Hi, I'm Bob"

// 4. EVENT HANDLER
const button = document.querySelector("button");
button.addEventListener("click", function () {
  console.log(this); // button element
});

// With arrow function:
button.addEventListener("click", () => {
  console.log(this); // lexical this (parent scope)
});

// 5. ARROW FUNCTIONS (Lexical this)
const obj2 = {
  name: "Charlie",
  greet: () => {
    console.log(this.name); // undefined (lexical this from parent)
  },
  regularMethod: function () {
    const arrow = () => {
      console.log(this.name); // 'Charlie' (lexical this from method)
    };
    arrow();
  },
};

// 6. NESTED FUNCTIONS (Common Pitfall)
const user = {
  name: "Diana",
  hobbies: ["reading", "coding"],
  showHobbies: function () {
    this.hobbies.forEach(function (hobby) {
      console.log(this.name + " likes " + hobby); // 'undefined likes ...'
    });
  },
};

// Fix with arrow function:
const user2 = {
  name: "Diana",
  hobbies: ["reading", "coding"],
  showHobbies: function () {
    this.hobbies.forEach((hobby) => {
      console.log(this.name + " likes " + hobby); // 'Diana likes ...'
    });
  },
};

// 7. CLASS CONTEXT
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }

  // Arrow function method
  reset = () => {
    this.count = 0;
  };
}

const counter = new Counter();
counter.increment();

const increment = counter.increment;
// increment(); // TypeError: this is undefined

const reset = counter.reset;
reset(); // Works (arrow function has bound this)
```

---

## 8. bind, call, apply

**Code Example:**

```javascript
// DEFINING A GENERIC FUNCTION
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

// 1. CALL - Immediately invokes with specific this
console.log(introduce.call(person1, "Hello", "!")); // "Hello, I'm Alice!"
console.log(introduce.call(person2, "Hi", "?")); // "Hi, I'm Bob?"

// 2. APPLY - Like call but arguments as array
console.log(introduce.apply(person1, ["Hello", "!"])); // "Hello, I'm Alice!"

// Find max in array using apply
const numbers = [5, 2, 8, 1, 9];
const max = Math.max.apply(null, numbers);
console.log(max); // 9

// Spread operator alternative
const max2 = Math.max(...numbers);

// 3. BIND - Returns new function with bound this
const greet = introduce.bind(person1, "Hey");
console.log(greet("!")); // "Hey, I'm Alice!"
console.log(greet("?")); // "Hey, I'm Alice?"

// Practical example: Button handler
class Button {
  constructor(label) {
    this.label = label;
  }

  click() {
    console.log(`${this.label} clicked`);
  }
}

const btn = new Button("Submit");

// Without bind - this is lost
// document.querySelector('button').addEventListener('click', btn.click);

// With bind - this is preserved
// document.querySelector('button').addEventListener('click', btn.click.bind(btn));

// BORROWING METHODS
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const result = Array.prototype.slice.call(arrayLike);
console.log(result); // ['a', 'b', 'c']

// PARTIAL APPLICATION WITH BIND
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10

const triple = multiply.bind(null, 3);
console.log(triple(5)); // 15
```

**MCQ:**

```javascript
const obj = {
  name: "Alice",
  method: function () {
    console.log(this.name);
  },
};

const func = obj.method;
func(); // What does it print?
// (A) 'Alice'  (B) undefined  (C) window  (D) Error
// Answer: B (this is undefined in strict mode, window in non-strict)
```

---

## 9. Event Delegation

**Code Example:**

```javascript
// HTML:
// <ul id="list">
//   <li><button class="delete">Delete</button>Item 1</li>
//   <li><button class="delete">Delete</button>Item 2</li>
//   <li><button class="delete">Delete</button>Item 3</li>
// </ul>

// WITHOUT EVENT DELEGATION (Inefficient)
document.querySelectorAll(".delete").forEach((btn) => {
  btn.addEventListener("click", handleDelete);
});

// WITH EVENT DELEGATION (Efficient)
document.getElementById("list").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    handleDelete.call(e.target);
  }
});

function handleDelete() {
  this.parentElement.remove();
}

// ADVANCED EVENT DELEGATION
document.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete");
  if (deleteBtn) {
    console.log("Delete clicked");
  }

  const editBtn = e.target.closest(".edit");
  if (editBtn) {
    console.log("Edit clicked");
  }
});

// EVENT DELEGATION WITH DYNAMIC ELEMENTS
const container = document.getElementById("container");

// Add new item dynamically
document.getElementById("addBtn").addEventListener("click", () => {
  const item = document.createElement("div");
  item.className = "item";
  item.textContent = "New item";
  container.appendChild(item);
  // Event listeners still work! No need to re-attach
});

// Single listener for all (current and future)
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    e.target.style.background = "yellow";
  }
});
```

---

## 10. Prototypes & Inheritance

**Code Example:**

```javascript
// PROTOTYPE CHAIN
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
};

const dog = new Animal("Dog");
dog.speak(); // 'Dog makes a sound'

// CHECK PROTOTYPE
console.log(dog instanceof Animal); // true
console.log(Object.getPrototypeOf(dog) === Animal.prototype); // true
console.log(dog.hasOwnProperty("name")); // true
console.log(dog.hasOwnProperty("speak")); // false (on prototype)

// PROTOTYPE INHERITANCE
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(`${this.name} barks!`);
};

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.speak(); // 'Buddy makes a sound' (inherited)
myDog.bark(); // 'Buddy barks!'

// ES6 CLASS SYNTAX
class Animal2 {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }

  static info() {
    return "This is an Animal class";
  }
}

class Dog2 extends Animal2 {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks!`);
  }
}

const dog2 = new Dog2("Max", "Labrador");
dog2.speak(); // 'Max barks!' (overridden method)
console.log(Dog2.info()); // 'This is an Animal class' (static method)

// PROTOTYPE CHAIN VISUALIZATION
console.log(Object.getPrototypeOf(dog2)); // Dog2.prototype
console.log(Object.getPrototypeOf(Object.getPrototypeOf(dog2))); // Animal2.prototype
console.log(
  Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(dog2)))
); // Object.prototype
console.log(
  Object.getPrototypeOf(
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(dog2)))
  )
); // null
```

---

## 11. Prototypes & Inheritance - Advanced

**Code Example:**

```javascript
// MIXIN PATTERN
const canEat = {
  eat() {
    console.log(`${this.name} is eating`);
  },
};

const canWalk = {
  walk() {
    console.log(`${this.name} is walking`);
  },
};

function Person(name) {
  this.name = name;
}

// Mix in behaviors
Object.assign(Person.prototype, canEat, canWalk);

const person = new Person("Alice");
person.eat(); // 'Alice is eating'
person.walk(); // 'Alice is walking'

// PROPERTY DESCRIPTORS
const obj = {};

Object.defineProperty(obj, "name", {
  value: "Bob",
  writable: false, // Cannot be changed
  enumerable: true, // Shows in Object.keys()
  configurable: false, // Cannot be reconfigured
});

// Object.defineProperties
Object.defineProperties(obj, {
  age: {
    value: 30,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  email: {
    get() {
      return this._email;
    },
    set(value) {
      this._email = value;
    },
    enumerable: true,
    configurable: true,
  },
});

// OBJECT.CREATE
const parent = {
  greet() {
    return `Hello, ${this.name}`;
  },
};

const child = Object.create(parent);
child.name = "Charlie";
console.log(child.greet()); // 'Hello, Charlie'
console.log(Object.getPrototypeOf(child) === parent); // true
```

---

# Part 3: ES6+ Features

## 12. Destructuring

**Code Example:**

```javascript
// ARRAY DESTRUCTURING
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1, 2, 3

// Skip elements
const [first, , third] = [1, 2, 3];
console.log(first, third); // 1, 3

// Rest operator
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [x = 10, y = 20] = [1];
console.log(x, y); // 1, 20

// OBJECT DESTRUCTURING
const { name, age } = { name: "Alice", age: 30, city: "NYC" };
console.log(name, age); // Alice, 30

// Rename properties
const { name: fullName, age: years } = { name: "Bob", age: 25 };
console.log(fullName, years); // Bob, 25

// Default values
const { name: n = "Unknown", role = "User" } = { name: "Charlie" };
console.log(n, role); // Charlie, User

// Nested destructuring
const {
  address: { city, country },
} = {
  name: "Diana",
  address: { city: "Paris", country: "France" },
};
console.log(city, country); // Paris, France

// FUNCTION PARAMETER DESTRUCTURING
function displayUser({ name, age, city = "Unknown" }) {
  console.log(`${name}, ${age} years old, from ${city}`);
}

displayUser({ name: "Eve", age: 28, city: "Boston" });

// SWAPPING VARIABLES
let x = 5,
  y = 10;
[x, y] = [y, x];
console.log(x, y); // 10, 5

// DESTRUCTURING IN LOOPS
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

for (const { id, name } of users) {
  console.log(`${id}: ${name}`);
}
```

---

## 13. Spread & Rest Operators

**Code Example:**

```javascript
// ARRAY SPREAD
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

const withExtra = [0, ...arr1, 3.5, ...arr2, 7];
console.log(withExtra); // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// OBJECT SPREAD
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// Override properties
const overridden = { ...obj1, b: 20 };
console.log(overridden); // { a: 1, b: 20 }

// SHALLOW COPY
const original = { name: "Alice", address: { city: "NYC" } };
const copy = { ...original };

copy.address.city = "LA";
console.log(original.address.city); // 'LA' (shallow copy issue)

// REST PARAMETERS
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// Mix regular and rest parameters
function printInfo(greeting, ...args) {
  console.log(greeting);
  console.log(args);
}

printInfo("Hello", "Alice", "Bob", "Charlie");
// 'Hello'
// ['Alice', 'Bob', 'Charlie']

// REST IN DESTRUCTURING
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]

const { name, ...others } = { name: "Bob", age: 30, city: "NYC" };
console.log(name); // 'Bob'
console.log(others); // { age: 30, city: 'NYC' }
```

---

## 14. Template Literals

**Code Example:**

```javascript
// BASIC TEMPLATE LITERAL
const name = "Alice";
const age = 30;

const message = `Hello, ${name}! You are ${age} years old.`;
console.log(message); // Hello, Alice! You are 30 years old.

// MULTILINE STRINGS
const html = `
  <div class="card">
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;
console.log(html);

// EXPRESSIONS IN TEMPLATES
const a = 5,
  b = 10;
console.log(`${a} + ${b} = ${a + b}`); // 5 + 10 = 15

// FUNCTION CALLS IN TEMPLATES
function greet(person) {
  return `Hello, ${person}!`;
}

console.log(`Message: ${greet("Bob")}`); // Message: Hello, Bob!

// TAGGED TEMPLATE LITERALS
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] ? `<strong>${values[i]}</strong>` : "");
  }, "");
}

const highlighted = highlight`My name is ${"Alice"} and I am ${"developer"}`;
console.log(highlighted);
// My name is <strong>Alice</strong> and I am <strong>developer</strong>

// ESCAPING SPECIAL CHARACTERS
const json = `{"name": "Alice", "age": 30}`;
console.log(json);

const escaped = `Line 1\nLine 2\tTabbed`;
console.log(escaped);
```

---

## 15. Generators & Iterators

**Code Example:**

```javascript
// BASIC GENERATOR
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = countUp();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// GENERATOR WITH FOR...OF
for (const value of countUp()) {
  console.log(value); // 1, 2, 3
}

// INFINITE SEQUENCE GENERATOR
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const inf = infiniteSequence();
console.log(inf.next().value); // 0
console.log(inf.next().value); // 1
console.log(inf.next().value); // 2

// GENERATOR WITH RETURN VALUE
function* withReturn() {
  yield 1;
  yield 2;
  return "Done!";
}

const genReturn = withReturn();
console.log(genReturn.next()); // { value: 1, done: false }
console.log(genReturn.next()); // { value: 2, done: false }
console.log(genReturn.next()); // { value: 'Done!', done: true }

// GENERATOR DELEGATION
function* generator1() {
  yield 1;
  yield 2;
}

function* generator2() {
  yield* generator1();
  yield 3;
}

for (const value of generator2()) {
  console.log(value); // 1, 2, 3
}

// CUSTOM ITERATOR
const iterableObject = {
  data: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { done: true };
      },
    };
  },
};

for (const value of iterableObject) {
  console.log(value); // 1, 2, 3, 4, 5
}

// FIBONACCI SEQUENCE GENERATOR
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

---

## 16. WeakMap & WeakSet

**Code Example:**

```javascript
// WEAKMAP - Weak references to objects
const wm = new WeakMap();

const obj1 = { id: 1 };
const obj2 = { id: 2 };

wm.set(obj1, "value1");
wm.set(obj2, "value2");

console.log(wm.get(obj1)); // 'value1'
console.log(wm.has(obj2)); // true

wm.delete(obj1);
console.log(wm.has(obj1)); // false

// USE CASE: Private data
class Counter {
  constructor() {
    this._data = new WeakMap();
    this._data.set(this, { count: 0 });
  }

  increment() {
    const data = this._data.get(this);
    data.count++;
    return data.count;
  }

  get count() {
    return this._data.get(this).count;
  }
}

const counter = new Counter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.count); // 2

// WEAKSET - Weak references to objects
const ws = new WeakSet();

const user1 = { name: "Alice" };
const user2 = { name: "Bob" };

ws.add(user1);
ws.add(user2);

console.log(ws.has(user1)); // true
console.log(ws.has(user2)); // true

// USE CASE: Mark objects
const processedObjects = new WeakSet();

function process(obj) {
  if (processedObjects.has(obj)) {
    console.log("Already processed");
    return;
  }
  console.log("Processing...", obj);
  processedObjects.add(obj);
}

process(user1); // Processing...
process(user1); // Already processed
```

---

## 17. Regular Expressions

**Code Example:**

```javascript
// CREATING REGEX
const regex1 = /hello/i; // Literal notation
const regex2 = new RegExp("hello", "i"); // Constructor

// PATTERNS
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
const urlPattern =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// TESTING
console.log(/hello/.test("hello world")); // true
console.log(/hello/i.test("HELLO WORLD")); // true

// MATCHING
const text = "The quick brown fox jumps over the lazy dog";
const matches = text.match(/\b\w{4,}\b/g); // Words with 4+ chars
console.log(matches); // ['quick', 'brown', 'jumps', 'lazy']

// REPLACE
const replaced = text.replace(/fox/i, "cat");
console.log(replaced); // The quick brown cat jumps over the lazy dog

// Replace with function
const result = "hello world".replace(/\b\w/g, (match) => match.toUpperCase());
console.log(result); // Hello World

// SPLIT
const csv = "name,age,city";
const parts = csv.split(",");
console.log(parts); // ['name', 'age', 'city']

// COMMON PATTERNS
const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\d{10}$/,
  zipcode: /^\d{5}$/,
  url: /^https?:\/\/.+/,
  hexColor: /^#[0-9A-F]{6}$/i,
  ipAddress: /^(\d{1,3}\.){3}\d{1,3}$/,
  creditCard: /^\d{16}$/,
  ssn: /^\d{3}-\d{2}-\d{4}$/,
};

// NAMED CAPTURE GROUPS
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = "2025-10-30".match(dateRegex);
console.log(match.groups); // { year: '2025', month: '10', day: '30' }

// LOOKAHEAD & LOOKBEHIND
const lookahead = /\d+(?=px)/; // Number followed by 'px'
console.log("100px".match(lookahead)); // ['100']

const lookbehind = /(?<=\$)\d+/; // Number preceded by '$'
console.log("$100".match(lookbehind)); // ['100']
```

---

## 18. Memory Management & Garbage Collection

**Code Example:**

```javascript
// MEMORY LEAKS

// 1. ACCIDENTAL GLOBAL VARIABLES
function leak1() {
  unusedVariable = "This creates a global"; // Becomes window.unusedVariable
}

// Fix: Use strict mode or declare variables
function fix1() {
  let usedVariable = "Properly scoped";
}

// 2. FORGOTTEN TIMERS
let id = setInterval(() => {
  console.log("Running");
}, 1000);

// Memory leaks - timer never cleared
// Fix:
clearInterval(id);

// 3. FORGOTTEN EVENT LISTENERS
const element = document.getElementById("myElement");
element.addEventListener("click", () => {
  console.log("Clicked");
});

// Memory leaks if element is removed from DOM
// Fix: Remove listener when done
function removeListener() {
  element.removeEventListener("click", handler);
}

// 4. DETACHED DOM NODES
function leakDom() {
  const element = document.createElement("div");
  element.id = "big";
  document.body.appendChild(element);

  return element; // Keeps reference even after removal
}

// Fix:
function fixDom() {
  const element = document.createElement("div");
  document.body.appendChild(element);

  // Use and release
  return null;
}

// 5. CLOSURES HOLDING LARGE DATA
function createLargeClosure() {
  const largeArray = new Array(1000000).fill("data");

  return function () {
    console.log(largeArray.length); // Holds reference
  };
}

// Fix:
function createSmallClosure() {
  let largeArray = new Array(1000000).fill("data");
  const length = largeArray.length;
  largeArray = null; // Release reference

  return function () {
    console.log(length);
  };
}

// 6. CIRCULAR REFERENCES
class Node {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.child = null;
  }
}

const parent = new Node("parent");
const child = new Node("child");
parent.child = child;
child.parent = parent; // Circular reference

// Modern JS garbage collectors handle this, but can still cause issues
// Fix:
function cleanup() {
  parent.child = null;
  child.parent = null;
}

// BEST PRACTICES FOR MEMORY MANAGEMENT
class ProperResource {
  constructor() {
    this.data = [];
  }

  initialize() {
    // Setup code
    this.timer = setInterval(() => {
      // Process
    }, 1000);
  }

  cleanup() {
    clearInterval(this.timer);
    this.data = null;
  }
}

const resource = new ProperResource();
resource.initialize();

// When done:
resource.cleanup();
```

---

# Part 4: Interactive DOM Examples

## DOM Manipulation with HTML/CSS Examples

### Example 1: Todo List with Event Delegation

**HTML:**

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial;
        margin: 20px;
      }
      #todoList {
        list-style: none;
        padding: 0;
      }
      .todo-item {
        padding: 10px;
        margin: 5px 0;
        background: #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 4px;
      }
      .todo-item.completed {
        text-decoration: line-through;
        opacity: 0.5;
      }
      button {
        padding: 5px 10px;
        margin-left: 5px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background: #007bff;
        color: white;
      }
      button:hover {
        background: #0056b3;
      }
      .delete {
        background: #dc3545;
      }
      .delete:hover {
        background: #c82333;
      }
    </style>
  </head>
  <body>
    <h1>Todo List</h1>
    <input type="text" id="todoInput" placeholder="Add a new todo" />
    <button id="addBtn">Add</button>
    <ul id="todoList"></ul>

    <script>
      const todoInput = document.getElementById("todoInput");
      const addBtn = document.getElementById("addBtn");
      const todoList = document.getElementById("todoList");

      // Add todo
      addBtn.addEventListener("click", addTodo);
      todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTodo();
      });

      // EVENT DELEGATION for all todo actions
      todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("toggle")) {
          e.target.parentElement.parentElement.classList.toggle("completed");
        }
        if (e.target.classList.contains("delete")) {
          e.target.parentElement.parentElement.remove();
        }
      });

      function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
          const li = document.createElement("li");
          li.className = "todo-item";
          li.innerHTML = `
          <span>${text}</span>
          <div>
            <button class="toggle">Done</button>
            <button class="delete">Delete</button>
          </div>
        `;
          todoList.appendChild(li);
          todoInput.value = "";
        }
      }
    </script>
  </body>
</html>
```

---

### Example 2: Form Validation & DOM Manipulation

**HTML:**

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial;
        margin: 20px;
      }
      .form-group {
        margin: 15px 0;
      }
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      input {
        padding: 8px;
        width: 300px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .error {
        border-color: #dc3545;
      }
      .error-message {
        color: #dc3545;
        font-size: 12px;
        margin-top: 3px;
      }
      .success {
        color: #28a745;
      }
      button {
        padding: 10px 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <h1>User Registration Form</h1>
    <form id="form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <div class="error-message" id="nameError"></div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />
        <div class="error-message" id="emailError"></div>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" />
        <div class="error-message" id="passwordError"></div>
      </div>

      <button type="submit">Register</button>
      <div id="message"></div>
    </form>

    <script>
      const form = document.getElementById("form");
      const inputs = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        password: document.getElementById("password"),
      };
      const errors = {
        name: document.getElementById("nameError"),
        email: document.getElementById("emailError"),
        password: document.getElementById("passwordError"),
      };
      const messageDiv = document.getElementById("message");

      // REAL-TIME VALIDATION
      Object.keys(inputs).forEach((key) => {
        inputs[key].addEventListener("blur", () => validateField(key));
        inputs[key].addEventListener("input", () => {
          if (errors[key].textContent) validateField(key);
        });
      });

      function validateField(field) {
        let isValid = true;
        const value = inputs[field].value.trim();

        switch (field) {
          case "name":
            if (value.length < 3) {
              errors[field].textContent = "Name must be at least 3 characters";
              isValid = false;
            } else {
              errors[field].textContent = "";
            }
            break;

          case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              errors[field].textContent = "Invalid email format";
              isValid = false;
            } else {
              errors[field].textContent = "";
            }
            break;

          case "password":
            if (value.length < 6) {
              errors[field].textContent =
                "Password must be at least 6 characters";
              isValid = false;
            } else {
              errors[field].textContent = "";
            }
            break;
        }

        // Update visual state
        inputs[field].classList.toggle("error", !isValid);
        return isValid;
      }

      // FORM SUBMISSION
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const isFormValid = Object.keys(inputs).every((field) =>
          validateField(field)
        );

        if (isFormValid) {
          messageDiv.innerHTML =
            '<div class="success">Registration successful!</div>';
          form.reset();
        } else {
          messageDiv.innerHTML =
            '<div class="error-message">Please fix the errors above.</div>';
        }
      });
    </script>
  </body>
</html>
```

---

# Part 5: Advanced JavaScript Concepts

## 19. JavaScript Engine & Runtime

### V8 Engine Architecture

**Code Example:**

```javascript
// COMPILATION PHASES IN V8

// 1. PARSING - Source code to AST (Abstract Syntax Tree)
function parseExample() {
  const x = 5;
  return x * 2;
}

// 2. IGNITION INTERPRETER - Bytecode generation
// Fast startup, slower execution for frequently used code

// 3. TURBOFAN OPTIMIZING COMPILER - JIT compilation
// Hot functions get optimized machine code

// OPTIMIZATION EXAMPLES
function hotFunction(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]; // V8 optimizes this loop
  }
  return sum;
}

// Call many times to trigger optimization
for (let i = 0; i < 10000; i++) {
  hotFunction([1, 2, 3, 4, 5]);
}

// DEOPTIMIZATION - When assumptions break
function polymorphic(obj) {
  return obj.x + obj.y; // Initially optimized for one shape
}

polymorphic({ x: 1, y: 2 }); // Shape 1
polymorphic({ x: 1, y: 2, z: 3 }); // Shape 2 - causes deoptimization
```

### Event Loop Deep Dive

**Code Example:**

```javascript
// EVENT LOOP VISUALIZATION
console.log("1. Synchronous");

setTimeout(() => console.log("2. Macro task"), 0);

Promise.resolve().then(() => console.log("3. Micro task"));

console.log("4. Synchronous");

// Output: 1, 4, 3, 2
// Microtasks have higher priority than macrotasks

// COMPLEX EXECUTION ORDER
console.log("Start");

setTimeout(() => console.log("Timer 1"), 0);
setTimeout(() => console.log("Timer 2"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

Promise.resolve().then(() => {
  console.log("Promise 3");
  setTimeout(() => console.log("Timer 3"), 0);
});

console.log("End");

// Output: Start, End, Promise 1, Promise 3, Promise 2, Timer 1, Timer 2, Timer 3

// MICROTASK QUEUE vs MACROTASK QUEUE
function demonstrateQueues() {
  console.log("Script start");

  // Macrotasks
  setTimeout(() => console.log("setTimeout"), 0);
  setImmediate(() => console.log("setImmediate")); // Node.js only

  // Microtasks
  Promise.resolve().then(() => console.log("Promise"));
  queueMicrotask(() => console.log("queueMicrotask"));

  console.log("Script end");
}

// EVENT LOOP STARVATION
function starveEventLoop() {
  function recursiveMicrotask() {
    Promise.resolve().then(recursiveMicrotask);
  }
  recursiveMicrotask(); // This will starve the event loop!
}

// PROPER ASYNC PATTERNS
async function properAsyncPattern() {
  const results = [];

  for (let i = 0; i < 1000; i++) {
    results.push(await processItem(i));

    // Yield control back to event loop periodically
    if (i % 100 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  return results;
}
```

### Memory Management Advanced

**Code Example:**

```javascript
// MEMORY HEAP STRUCTURE
// Stack: Primitive values, function calls, references
// Heap: Objects, functions, closures

// MEMORY LEAK PATTERNS

// 1. GLOBAL VARIABLES
window.accidentalGlobal = [];
function leak() {
  for (let i = 0; i < 1000; i++) {
    window.accidentalGlobal.push(new Array(1000));
  }
}

// 2. CLOSURE MEMORY LEAKS
function createLeak() {
  const largeData = new Array(1000000).fill("data");
  let smallData = "small";

  return function () {
    console.log(smallData); // Only needs smallData but holds largeData
  };
}

// FIXED VERSION
function createFixed() {
  let largeData = new Array(1000000).fill("data");
  const smallData = largeData.length; // Extract what we need
  largeData = null; // Release reference

  return function () {
    console.log(smallData);
  };
}

// 3. DOM DETACHED NODES
class ComponentManager {
  constructor() {
    this.components = new Map();
  }

  createComponent(id) {
    const element = document.createElement("div");
    element.id = id;
    document.body.appendChild(element);

    this.components.set(id, element); // Keeps reference
    return element;
  }

  removeComponent(id) {
    const element = this.components.get(id);
    if (element) {
      element.remove(); // Removes from DOM
      this.components.delete(id); // Remove reference
    }
  }
}

// 4. WEAK REFERENCES FOR CACHES
class WeakCache {
  constructor() {
    this.cache = new WeakMap();
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
  }

  // No need for manual cleanup - WeakMap handles it
}

// MEMORY PROFILING HELPERS
class MemoryProfiler {
  static measure(name, fn) {
    if (performance.measureUserAgentSpecificMemory) {
      return performance.measureUserAgentSpecificMemory().then((baseline) => {
        const result = fn();
        return performance.measureUserAgentSpecificMemory().then((after) => {
          console.log(`${name} memory delta:`, after.bytes - baseline.bytes);
          return result;
        });
      });
    } else {
      console.time(name);
      const result = fn();
      console.timeEnd(name);
      return result;
    }
  }
}
```

## 20. Functional Programming in JavaScript

### Pure Functions & Immutability

**Code Example:**

```javascript
// PURE FUNCTIONS - Same input = Same output, No side effects

// IMPURE FUNCTION
let counter = 0;
function impureIncrement(x) {
  counter++; // Side effect
  return x + counter;
}

// PURE FUNCTION
function pureIncrement(x, counter) {
  return x + counter + 1; // No side effects
}

// IMMUTABILITY PATTERNS
const immutableOperations = {
  // Array operations
  addItem: (arr, item) => [...arr, item],
  removeItem: (arr, index) => arr.filter((_, i) => i !== index),
  updateItem: (arr, index, newItem) =>
    arr.map((item, i) => (i === index ? newItem : item)),

  // Object operations
  updateProperty: (obj, key, value) => ({ ...obj, [key]: value }),
  removeProperty: (obj, key) => {
    const { [key]: removed, ...rest } = obj;
    return rest;
  },

  // Nested object updates
  updateNested: (obj, path, value) => {
    const [head, ...tail] = path;
    return {
      ...obj,
      [head]:
        tail.length === 0
          ? value
          : immutableOperations.updateNested(obj[head], tail, value),
    };
  },
};

// EXAMPLE USAGE
const users = [
  { id: 1, name: "Alice", address: { city: "NYC" } },
  { id: 2, name: "Bob", address: { city: "LA" } },
];

const newUsers = immutableOperations.addItem(users, {
  id: 3,
  name: "Charlie",
  address: { city: "Chicago" },
});
const updatedUsers = immutableOperations.updateNested(
  users[0],
  ["address", "city"],
  "Boston"
);

console.log(users); // Original unchanged
console.log(newUsers); // New array with added item
```

### Higher-Order Functions

**Code Example:**

```javascript
// FUNCTION COMPOSITION
const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);
const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

// UTILITY FUNCTIONS
const add = (x) => (y) => x + y;
const multiply = (x) => (y) => x * y;
const square = (x) => x * x;
const toString = (x) => x.toString();

// COMPOSITION EXAMPLES
const addFiveThenSquare = compose(square, add(5));
const multiplyByTwoThenAddFive = pipe(multiply(2), add(5));

console.log(addFiveThenSquare(3)); // (3 + 5)² = 64
console.log(multiplyByTwoThenAddFive(3)); // (3 * 2) + 5 = 11

// CURRYING
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// EXAMPLE: Curried functions
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6

// PARTIAL APPLICATION
const partial =
  (fn, ...presetArgs) =>
  (...laterArgs) =>
    fn(...presetArgs, ...laterArgs);

const log = (level, message, timestamp) =>
  `[${level}] ${timestamp}: ${message}`;
const logError = partial(log, "ERROR");
const logInfo = partial(log, "INFO");

console.log(logError("System failed", "2025-10-30"));
console.log(logInfo("System started", "2025-10-30"));

// MEMOIZATION
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// FIBONACCI WITH MEMOIZATION
const fibonacci = memoize(function (n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.time("fib");
console.log(fibonacci(40)); // Much faster with memoization
console.timeEnd("fib");

// FUNCTIONAL ARRAY OPERATIONS
const functionalOps = {
  // Transducer pattern
  map: curry((fn, array) => array.map(fn)),
  filter: curry((predicate, array) => array.filter(predicate)),
  reduce: curry((reducer, initial, array) => array.reduce(reducer, initial)),

  // Composition helpers
  tap: curry((fn, value) => {
    fn(value);
    return value;
  }),
  when: curry((predicate, fn, value) => (predicate(value) ? fn(value) : value)),
  unless: curry((predicate, fn, value) =>
    predicate(value) ? value : fn(value)
  ),
};

// EXAMPLE: Processing pipeline
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = pipe(
  functionalOps.filter((x) => x % 2 === 0),
  functionalOps.map((x) => x * x),
  functionalOps.reduce((sum, x) => sum + x, 0),
  functionalOps.tap(console.log)
)(numbers);

console.log(result); // Sum of squares of even numbers
```

## 21. Metaprogramming

### Proxies

**Code Example:**

```javascript
// BASIC PROXY
const target = { name: "Alice", age: 30 };

const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(`Getting ${prop}`);
    return obj[prop];
  },

  set(obj, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  },
});

proxy.name; // "Getting name"
proxy.age = 31; // "Setting age to 31"

// VALIDATION PROXY
function createValidatedObject(schema) {
  return new Proxy(
    {},
    {
      set(obj, prop, value) {
        const validator = schema[prop];
        if (validator && !validator(value)) {
          throw new Error(`Invalid value for ${prop}: ${value}`);
        }
        obj[prop] = value;
        return true;
      },
    }
  );
}

const userSchema = {
  name: (value) => typeof value === "string" && value.length > 0,
  age: (value) => typeof value === "number" && value >= 0 && value <= 150,
  email: (value) => typeof value === "string" && value.includes("@"),
};

const user = createValidatedObject(userSchema);
user.name = "Bob"; // ✓
user.age = 25; // ✓
// user.age = -5; // ✗ Error: Invalid value for age: -5

// ARRAY NEGATIVE INDEXING
function createNegativeIndexArray(array) {
  return new Proxy(array, {
    get(target, prop) {
      if (typeof prop === "string" && /^-\d+$/.test(prop)) {
        const index = target.length + parseInt(prop);
        return target[index];
      }
      return target[prop];
    },
  });
}

const arr = createNegativeIndexArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5 (last element)
console.log(arr[-2]); // 4 (second to last)

// OBSERVABLE OBJECT
function createObservable(target, callback) {
  return new Proxy(target, {
    set(obj, prop, value) {
      const oldValue = obj[prop];
      obj[prop] = value;
      callback(prop, oldValue, value);
      return true;
    },
  });
}

const observable = createObservable({}, (prop, oldVal, newVal) => {
  console.log(`Property ${prop} changed from ${oldVal} to ${newVal}`);
});

observable.name = "Alice"; // Property name changed from undefined to Alice
observable.name = "Bob"; // Property name changed from Alice to Bob

// FUNCTION INTERCEPTOR
function createInterceptor(fn) {
  return new Proxy(fn, {
    apply(target, thisArg, argumentsList) {
      console.log(`Calling function with args:`, argumentsList);
      const result = target.apply(thisArg, argumentsList);
      console.log(`Function returned:`, result);
      return result;
    },
  });
}

const add = createInterceptor((a, b) => a + b);
add(2, 3); // Logs calling info and result
```

### Symbols & Reflection

**Code Example:**

```javascript
// SYMBOLS - Unique identifiers
const id = Symbol("id");
const name = Symbol("name");

const user = {
  [id]: 12345,
  [name]: "Alice",
  age: 30,
};

console.log(user[id]); // 12345
console.log(Object.keys(user)); // ['age'] - symbols not enumerable

// WELL-KNOWN SYMBOLS
class CustomIterable {
  constructor(data) {
    this.data = data;
  }

  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { done: true };
      },
    };
  }

  [Symbol.toStringTag] = "CustomIterable";

  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.data.length;
    }
    if (hint === "string") {
      return this.data.join(",");
    }
    return this.data.length;
  }
}

const iterable = new CustomIterable([1, 2, 3, 4, 5]);
for (const value of iterable) {
  console.log(value); // 1, 2, 3, 4, 5
}

console.log(String(iterable)); // "1,2,3,4,5"
console.log(Number(iterable)); // 5
console.log(Object.prototype.toString.call(iterable)); // [object CustomIterable]

// REFLECTION
class MyClass {
  constructor(value) {
    this.value = value;
  }

  method() {
    return this.value * 2;
  }

  static staticMethod() {
    return "static";
  }
}

// Reflect.construct
const instance = Reflect.construct(MyClass, [10]);
console.log(instance.value); // 10

// Reflect.apply
const result = Reflect.apply(instance.method, instance, []);
console.log(result); // 20

// Reflect.defineProperty
Reflect.defineProperty(MyClass.prototype, "newMethod", {
  value: function () {
    return "new";
  },
  configurable: true,
});

// Reflect.ownKeys - includes symbols
const obj = { a: 1, [Symbol("b")]: 2 };
console.log(Reflect.ownKeys(obj)); // ['a', Symbol(b)]

// METADATA WITH SYMBOLS (Common pattern)
const metadata = Symbol("metadata");

class Component {
  static [metadata] = {
    name: "Component",
    version: "1.0.0",
  };

  static getMetadata() {
    return this[metadata];
  }
}

console.log(Component.getMetadata()); // { name: 'Component', version: '1.0.0' }
```

## 22. Performance Optimization

### Code Optimization Techniques

**Code Example:**

```javascript
// PERFORMANCE MEASUREMENT
class PerformanceProfiler {
  static measure(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
    return result;
  }

  static async measureAsync(name, fn) {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
    return result;
  }
}

// OPTIMIZATION PATTERNS

// 1. OBJECT POOLING
class ObjectPool {
  constructor(createFn, resetFn, initialSize = 10) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];

    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }
  }

  acquire() {
    return this.pool.length > 0 ? this.pool.pop() : this.createFn();
  }

  release(obj) {
    this.resetFn(obj);
    this.pool.push(obj);
  }
}

// Example: Vector object pool
const vectorPool = new ObjectPool(
  () => ({ x: 0, y: 0 }),
  (obj) => {
    obj.x = 0;
    obj.y = 0;
  }
);

function useVector() {
  const v = vectorPool.acquire();
  v.x = 10;
  v.y = 20;
  // ... use vector
  vectorPool.release(v);
}

// 2. DEBOUNCING & THROTTLING
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 300);

const throttledScroll = throttle(() => {
  console.log("Scroll event");
}, 100);

// 3. MEMOIZATION WITH LRU CACHE
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return undefined;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

function memoizeWithLRU(fn, cacheSize = 100) {
  const cache = new LRUCache(cacheSize);
  return function (...args) {
    const key = JSON.stringify(args);
    let result = cache.get(key);
    if (result === undefined) {
      result = fn.apply(this, args);
      cache.set(key, result);
    }
    return result;
  };
}

// 4. LAZY EVALUATION
class LazyValue {
  constructor(computeFn) {
    this.computeFn = computeFn;
    this.computed = false;
    this.value = undefined;
  }

  get() {
    if (!this.computed) {
      this.value = this.computeFn();
      this.computed = true;
    }
    return this.value;
  }
}

const expensiveComputation = new LazyValue(() => {
  console.log("Computing expensive value...");
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += Math.sqrt(i);
  }
  return sum;
});

// Only computed when accessed
console.log(expensiveComputation.get()); // Computes
console.log(expensiveComputation.get()); // Returns cached value

// 5. BATCH OPERATIONS
class BatchProcessor {
  constructor(batchSize = 100, delay = 10) {
    this.batchSize = batchSize;
    this.delay = delay;
    this.queue = [];
    this.processing = false;
  }

  add(item) {
    this.queue.push(item);
    if (!this.processing) {
      this.scheduleProcess();
    }
  }

  scheduleProcess() {
    this.processing = true;
    setTimeout(() => this.process(), this.delay);
  }

  process() {
    const batch = this.queue.splice(0, this.batchSize);
    if (batch.length > 0) {
      this.processBatch(batch);
    }

    if (this.queue.length > 0) {
      this.scheduleProcess();
    } else {
      this.processing = false;
    }
  }

  processBatch(items) {
    console.log(`Processing batch of ${items.length} items`);
    // Process items in batch
  }
}

const batchProcessor = new BatchProcessor();

// Add items individually - they'll be processed in batches
for (let i = 0; i < 250; i++) {
  batchProcessor.add(`Item ${i}`);
}
```

---

# Part 5: 150+ MCQs

## JavaScript Fundamentals MCQs

**Q1:** What is the output?

```javascript
console.log(typeof null);
```

(A) "null" (B) "object" (C) "undefined" (D) Error  
**Answer: B** - `null` is a primitive but `typeof null` returns "object" (historical bug)

**Q2:** What does this code print?

```javascript
console.log([] + []);
```

(A) [] (B) "" (C) undefined (D) Error  
**Answer: B** - Arrays are converted to strings and concatenated

**Q3:** What is the result?

```javascript
console.log(3 > 2 > 1);
```

(A) true (B) false (C) Error (D) undefined  
**Answer: B** - Evaluates as `(3 > 2) > 1` → `true > 1` → `1 > 1` → false

**Q4:** What is the output?

```javascript
function test() {
  console.log(a);
  var a = 1;
}
test();
```

(A) 1 (B) undefined (C) ReferenceError (D) null  
**Answer: B** - Variable is hoisted but not initialized

**Q5:** What does this return?

```javascript
(function () {
  return typeof arguments;
})();
```

(A) "array" (B) "object" (C) "arguments" (D) "function"  
**Answer: B** - arguments is an object-like structure

**Q6:** What is the output?

```javascript
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);
```

(A) 1 (B) 10 (C) undefined (D) Error  
**Answer: A** - Function declaration creates local scope for `a`

**Q7:** What does this log?

```javascript
console.log(1 + "2" + "2");
console.log(1 + +"2" + "2");
```

(A) "122", "32" (B) "122", "122" (C) 5, "32" (D) "122", "32"  
**Answer: A** - String concatenation vs numeric addition

**Q8:** What is the result?

```javascript
console.log(!!"false" == !!"true");
```

(A) true (B) false (C) undefined (D) Error  
**Answer: A** - Both convert to true (non-empty strings)

**Q9:** What does this output?

```javascript
var obj = {
  name: "Alice",
  getName: function () {
    return this.name;
  },
};
var getName = obj.getName;
console.log(getName());
```

(A) "Alice" (B) undefined (C) Error (D) null  
**Answer: B** - `this` is not bound to obj when called directly

**Q10:** What is the result?

```javascript
console.log(0.1 + 0.2 === 0.3);
```

(A) true (B) false (C) Error (D) undefined  
**Answer: B** - Floating point precision issue

## ES6+ Features MCQs

**Q11:** What is the output?

```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

(A) [1, 2, 3] (B) [1, 2, 3, 4] (C) Error (D) undefined  
**Answer: B** - const prevents reassignment, not mutation

**Q12:** What does this destructuring do?

```javascript
const { a, b, c = 3 } = { a: 1, b: 2 };
console.log(c);
```

(A) undefined (B) 3 (C) Error (D) null  
**Answer: B** - Default value is used when property is missing

**Q13:** What is the output?

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => setTimeout(resolve, 100, "foo"));

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
```

(A) [3, 42, 'foo'] (B) ['foo', 42, 3] (C) Error (D) undefined  
**Answer: A** - Promise.all preserves order

**Q14:** What does this arrow function return?

```javascript
const fn = () => {
  foo: "bar";
};
console.log(fn());
```

(A) {foo: "bar"} (B) undefined (C) Error (D) "bar"  
**Answer: B** - Braces interpreted as block, not object literal

**Q15:** What is the result?

```javascript
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);
```

(A) 1, 2 (B) 2, 1 (C) Error (D) undefined, undefined  
**Answer: B** - Destructuring assignment swaps values

## Asynchronous JavaScript MCQs

**Q16:** What is the execution order?

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```

(A) 1, 2, 3, 4 (B) 1, 4, 3, 2 (C) 1, 4, 2, 3 (D) 1, 3, 4, 2  
**Answer: B** - Synchronous first, then microtasks, then macrotasks

**Q17:** What happens with this async function?

```javascript
async function test() {
  return 1;
}
console.log(typeof test());
```

(A) "number" (B) "promise" (C) "object" (D) "function"  
**Answer: C** - async functions always return Promise objects

**Q18:** What is the output?

```javascript
Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => {
    throw new Error("error");
  })
  .then((x) => x + 1)
  .catch((e) => "caught")
  .then((x) => x + "!");
```

(A) "caught!" (B) Error (C) "3!" (D) undefined  
**Answer: A** - Error is caught and chain continues

**Q19:** What does this async/await code output?

```javascript
async function test() {
  console.log("start");
  await Promise.resolve();
  console.log("end");
}
console.log("before");
test();
console.log("after");
```

(A) before, start, end, after (B) before, start, after, end (C) start, before, after, end (D) before, after, start, end  
**Answer: B** - await makes execution asynchronous

**Q20:** What is the result?

```javascript
Promise.race([
  new Promise((resolve) => setTimeout(resolve, 100, "slow")),
  new Promise((resolve) => setTimeout(resolve, 50, "fast")),
]).then((value) => console.log(value));
```

(A) "slow" (B) "fast" (C) ["slow", "fast"] (D) Error  
**Answer: B** - Promise.race resolves with first resolved value

## Advanced Concepts MCQs

**Q21:** What is the output?

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return "Hello";
};

const p = new Person("Alice");
delete p.greet;
console.log(p.greet());
```

(A) "Hello" (B) undefined (C) Error (D) null  
**Answer: A** - Can't delete inherited properties

**Q22:** What does this Proxy do?

```javascript
const proxy = new Proxy(
  {},
  {
    get(target, prop) {
      return prop in target ? target[prop] : 42;
    },
  }
);
console.log(proxy.foo);
```

(A) undefined (B) 42 (C) Error (D) null  
**Answer: B** - Proxy returns 42 for non-existent properties

**Q23:** What is the output?

```javascript
const sym1 = Symbol("test");
const sym2 = Symbol("test");
console.log(sym1 === sym2);
```

(A) true (B) false (C) Error (D) undefined  
**Answer: B** - Symbols are always unique

**Q24:** What does this generator return?

```javascript
function* gen() {
  yield 1;
  yield 2;
  return 3;
}
const g = gen();
console.log([...g]);
```

(A) [1, 2, 3] (B) [1, 2] (C) [3] (D) Error  
**Answer: B** - Spread operator doesn't include return value

**Q25:** What is the result?

```javascript
class Child extends Parent {
  constructor() {
    this.name = "child";
    super();
  }
}
```

(A) Works fine (B) ReferenceError (C) SyntaxError (D) TypeError  
**Answer: B** - Must call super() before using this

**Q26:** What does this output?

```javascript
const arr = [1, 2, 3];
const [x, y, z, w = 4] = arr;
console.log(w);
```

(A) undefined (B) 4 (C) Error (D) null  
**Answer: B** - Default value is used when array element is missing

**Q27:** What is the result?

```javascript
function test() {
  return;
  {
    message: "Hello";
  }
}
console.log(test());
```

(A) {message: 'Hello'} (B) undefined (C) Error (D) null  
**Answer: B** - Automatic semicolon insertion after return

**Q28:** What does this Map operation do?

```javascript
const map = new Map();
map.set("key", "value");
map.set("key", "newValue");
console.log(map.size);
```

(A) 1 (B) 2 (C) 0 (D) Error  
**Answer: A** - Setting same key updates the value

**Q29:** What is the output?

```javascript
const obj = { a: 1 };
const newObj = { ...obj, a: 2, b: 3 };
console.log(newObj);
```

(A) {a: 1, b: 3} (B) {a: 2, b: 3} (C) {a: 1, a: 2, b: 3} (D) Error  
**Answer: B** - Later properties override earlier ones

**Q30:** What does this Set operation return?

```javascript
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set.size);
```

(A) 6 (B) 3 (C) 4 (D) Error  
**Answer: B** - Set only stores unique values

---

# Part 6: 50+ Subjective Q&A

## Core JavaScript Concepts

**Q1: Explain the difference between `call`, `apply`, and `bind` methods.**

**Answer:**

- **`call`**: Immediately invokes function with specified `this` and individual arguments
- **`apply`**: Immediately invokes function with specified `this` and arguments as array
- **`bind`**: Returns new function with bound `this` and optional preset arguments

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const person = { name: "Alice" };

// call - individual arguments
greet.call(person, "Hello", "!"); // "Hello, I'm Alice!"

// apply - arguments as array
greet.apply(person, ["Hi", "?"]); // "Hi, I'm Alice?"

// bind - returns new function
const boundGreet = greet.bind(person, "Hey");
boundGreet("!"); // "Hey, I'm Alice!"
```

**Q2: What is closure and how is it useful in JavaScript?**

**Answer:**
Closure is a function's ability to access variables from its outer/lexical scope even after the outer function has returned. It's created when a function is defined inside another function.

**Uses:**

- Data privacy and encapsulation
- Module pattern
- Callbacks and event handlers
- Function factories
- Partial application

```javascript
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
console.log(counter.getCount()); // 0
counter.increment();
console.log(counter.getCount()); // 1
// count is not directly accessible from outside
```

**Q3: Explain event delegation and its benefits.**

**Answer:**
Event delegation is a technique where you attach a single event listener to a parent element to handle events for multiple child elements, using event bubbling.

**Benefits:**

- Performance improvement (fewer event listeners)
- Handles dynamically added elements automatically
- Simplified code maintenance
- Memory efficiency

```javascript
// Instead of attaching listeners to each button
document.getElementById("container").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    // Handle delete
  } else if (e.target.classList.contains("edit-btn")) {
    // Handle edit
  }
});
```

**Q4: What are the differences between Promise and async/await?**

**Answer:**
Both handle asynchronous operations, but with different syntax and behavior:

**Promises:**

- Chain-based syntax with `.then()` and `.catch()`
- Explicit promise handling
- Can be harder to read with complex chains

**Async/Await:**

- Synchronous-looking syntax
- Built on top of Promises
- Better error handling with try/catch
- Easier to read and debug

```javascript
// Promise chain
fetch("/api/user")
  .then((response) => response.json())
  .then((user) => fetch(`/api/posts/${user.id}`))
  .then((response) => response.json())
  .then((posts) => console.log(posts))
  .catch((error) => console.error(error));

// Async/await
async function fetchUserPosts() {
  try {
    const userResponse = await fetch("/api/user");
    const user = await userResponse.json();
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}
```

**Q5: Explain prototypal inheritance in JavaScript.**

**Answer:**
JavaScript uses prototypal inheritance where objects can inherit directly from other objects. Every object has a prototype (except Object.prototype), and when you access a property, JavaScript looks up the prototype chain.

```javascript
// Constructor function approach
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(`${this.name} barks!`);
};

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak(); // Inherited from Animal
dog.bark(); // Own method
```

## Asynchronous Programming

**Q6: Explain the Event Loop in JavaScript.**

**Answer:**
The Event Loop is the mechanism that handles asynchronous operations in JavaScript's single-threaded environment.

**Components:**

1. **Call Stack**: Executes synchronous code
2. **Web APIs**: Handle async operations (setTimeout, DOM events, HTTP requests)
3. **Callback Queue (Macrotask Queue)**: Stores callbacks from Web APIs
4. **Microtask Queue**: Stores Promise callbacks, has higher priority
5. **Event Loop**: Moves tasks from queues to call stack when it's empty

**Execution Order:**

1. Execute all synchronous code
2. Process all microtasks
3. Process one macrotask
4. Repeat

```javascript
console.log("1"); // Call stack

setTimeout(() => console.log("2"), 0); // Macrotask queue

Promise.resolve().then(() => console.log("3")); // Microtask queue

console.log("4"); // Call stack

// Output: 1, 4, 3, 2
```

**Q7: How would you implement a Promise from scratch?**

**Answer:**

```javascript
class SimplePromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new SimplePromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          const result = onFulfilled ? onFulfilled(value) : value;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = (reason) => {
        try {
          const result = onRejected ? onRejected(reason) : reason;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === "fulfilled") {
        setTimeout(() => handleFulfilled(this.value), 0);
      } else if (this.state === "rejected") {
        setTimeout(() => handleRejected(this.reason), 0);
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
```

## ES6+ Features

**Q8: Explain destructuring assignment with examples.**

**Answer:**
Destructuring allows extracting values from arrays or properties from objects into distinct variables.

```javascript
// Array destructuring
const [a, b, c] = [1, 2, 3];
const [first, , third] = [1, 2, 3]; // Skip elements
const [head, ...tail] = [1, 2, 3, 4]; // Rest operator
const [x = 10, y = 20] = [1]; // Default values

// Object destructuring
const { name, age } = { name: "Alice", age: 30, city: "NYC" };
const { name: fullName, age: years } = { name: "Bob", age: 25 }; // Rename
const { title = "Mr." } = { name: "Charlie" }; // Default values

// Nested destructuring
const {
  address: { city, country },
} = {
  name: "Diana",
  address: { city: "Paris", country: "France" },
};

// Function parameters
function displayUser({ name, age, city = "Unknown" }) {
  console.log(`${name}, ${age}, ${city}`);
}

// Swapping variables
let a = 5,
  b = 10;
[a, b] = [b, a];
```

**Q9: What are generators and how do you use them?**

**Answer:**
Generators are functions that can be paused and resumed, yielding multiple values over time.

```javascript
function* numberGenerator() {
  console.log("Start");
  yield 1;
  console.log("After first yield");
  yield 2;
  console.log("After second yield");
  yield 3;
  console.log("End");
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Infinite sequences
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Custom iterators
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

for (const num of range(0, 10, 2)) {
  console.log(num); // 0, 2, 4, 6, 8
}
```

## Performance and Optimization

**Q10: How do you prevent memory leaks in JavaScript?**

**Answer:**
Memory leaks occur when objects are no longer needed but aren't garbage collected due to references.

**Common causes and solutions:**

1. **Global variables**

```javascript
// Bad
function leak() {
  accidentalGlobal = "This creates a global variable";
}

// Good
function noLeak() {
  "use strict";
  let localVariable = "Properly scoped";
}
```

2. **Forgotten timers**

```javascript
// Bad
const timer = setInterval(() => {
  // Timer keeps running
}, 1000);

// Good
const timer = setInterval(() => {
  // Do work
}, 1000);

// Clean up when done
clearInterval(timer);
```

3. **Event listeners**

```javascript
// Bad
element.addEventListener("click", handler);
// Element removed but listener remains

// Good
function cleanup() {
  element.removeEventListener("click", handler);
}
```

4. **Closures holding large objects**

```javascript
// Bad
function createClosure() {
  const largeArray = new Array(1000000);
  return function () {
    console.log(largeArray.length); // Holds entire array
  };
}

// Good
function createClosure() {
  let largeArray = new Array(1000000);
  const length = largeArray.length;
  largeArray = null; // Release reference
  return function () {
    console.log(length);
  };
}
```

**Q11: What is the difference between deep copy and shallow copy?**

**Answer:**

- **Shallow copy**: Copies only the first level of properties. Nested objects are still referenced.
- **Deep copy**: Recursively copies all levels, creating completely independent objects.

```javascript
const original = {
  name: "Alice",
  address: { city: "NYC", country: "USA" },
  hobbies: ["reading", "coding"],
};

// Shallow copy methods
const shallow1 = { ...original };
const shallow2 = Object.assign({}, original);

// Problem with shallow copy
shallow1.address.city = "LA";
console.log(original.address.city); // 'LA' - original is affected!

// Deep copy methods
const deep1 = JSON.parse(JSON.stringify(original)); // Limited - no functions, dates issues
const deep2 = structuredClone(original); // Modern approach
const deep3 = _.cloneDeep(original); // Using Lodash

// Custom deep copy function
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepCopy(item));
  if (typeof obj === "object") {
    const copy = {};
    Object.keys(obj).forEach((key) => {
      copy[key] = deepCopy(obj[key]);
    });
    return copy;
  }
}
```

**Q12: Explain debouncing and throttling with examples.**

**Answer:**
Both are techniques to control the frequency of function execution.

**Debouncing**: Delays function execution until after a specified time has passed since the last call.
**Throttling**: Limits function execution to once per specified time interval.

```javascript
// Debouncing - waits for pause in calls
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage: Search as user types
const debouncedSearch = debounce((query) => {
  console.log("Searching for:", query);
  // API call here
}, 300);

// Throttling - limits frequency
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Usage: Scroll event handling
const throttledScroll = throttle(() => {
  console.log("Scroll event handled");
  // Update position or lazy load
}, 100);

// Advanced throttling with leading and trailing options
function advancedThrottle(func, limit, options = {}) {
  let timeout,
    previous = 0;
  const { leading = true, trailing = true } = options;

  return function (...args) {
    const now = Date.now();

    if (!previous && !leading) previous = now;

    const remaining = limit - (now - previous);

    if (remaining <= 0 || remaining > limit) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        previous = leading ? Date.now() : 0;
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}
```

---

# Part 7: TLDR Summary

## 🚀 JavaScript Core Concepts - Quick Reference

### Variables & Scope

- **`var`**: Function-scoped, hoisted, can redeclare
- **`let`**: Block-scoped, TDZ, can reassign
- **`const`**: Block-scoped, TDZ, immutable binding
- **Hoisting**: Declarations moved to top of scope
- **TDZ**: Temporal Dead Zone for let/const

### Data Types

- **Primitives**: string, number, boolean, null, undefined, symbol, bigint
- **Reference**: object, array, function
- **Type coercion**: Implicit conversion between types
- **Equality**: `==` (coercion) vs `===` (strict)

### Functions

- **Declaration**: Hoisted, can call before definition
- **Expression**: Not hoisted, assigned to variable
- **Arrow**: Lexical `this`, no `arguments`, shorter syntax
- **IIFE**: Immediately Invoked Function Expression
- **Higher-order**: Functions that take/return other functions

### Closures

- Function accessing outer scope variables
- Created when function defined inside another
- Use cases: Privacy, modules, callbacks, factories

### `this` Keyword

- **Global**: window/global object
- **Method**: Object that owns the method
- **Constructor**: New instance being created
- **Arrow**: Lexical `this` from enclosing scope
- **Explicit**: Set with call/apply/bind

### Prototypes

- Every object has `__proto__` property
- Functions have `prototype` property
- Inheritance through prototype chain
- ES6 classes are syntactic sugar over prototypes

### Asynchronous JavaScript

- **Callbacks**: Functions passed as arguments
- **Promises**: Represent eventual completion/failure
- **Async/Await**: Syntactic sugar over promises
- **Event Loop**: Single-threaded async execution model

### ES6+ Features

- **Destructuring**: Extract values from arrays/objects
- **Spread/Rest**: `...` operator for arrays/objects
- **Template literals**: String interpolation with `${}`
- **Modules**: Import/export functionality
- **Classes**: OOP syntax over prototypes

### Advanced Concepts

- **Event delegation**: Single listener on parent element
- **Debouncing/Throttling**: Control function execution frequency
- **Memoization**: Cache function results
- **Proxies**: Intercept object operations
- **Symbols**: Unique property keys
- **Generators**: Pausable functions with yield

### Performance Tips

- **Avoid global variables**: Use proper scoping
- **Clean up listeners**: Prevent memory leaks
- **Use object pooling**: Reuse objects instead of creating new ones
- **Batch DOM operations**: Minimize reflows/repaints
- **Lazy loading**: Load resources when needed

### Common Patterns

- **Module pattern**: Private variables with closures
- **Observer pattern**: Event-driven programming
- **Singleton pattern**: Single instance of class
- **Factory pattern**: Create objects without specifying exact class
- **Decorator pattern**: Add behavior to objects dynamically

### Error Handling

- **Try/catch/finally**: Handle synchronous errors
- **Promise.catch()**: Handle promise rejections
- **Global handlers**: window.onerror, unhandledrejection
- **Custom errors**: Extend Error class for specific types

### Best Practices

- Use strict mode: `'use strict'`
- Prefer `const` > `let` > avoid `var`
- Use meaningful variable names
- Keep functions small and focused
- Handle errors appropriately
- Comment complex logic
- Use linting tools (ESLint)
- Write tests for critical functionality

---

## 📊 Quick Comparison Tables

| Feature   | var             | let       | const     |
| --------- | --------------- | --------- | --------- |
| Scope     | Function        | Block     | Block     |
| Hoisting  | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Redeclare | Yes             | No        | No        |
| Reassign  | Yes             | Yes       | No        |

| Method | When Executed | Returns         | Arguments  |
| ------ | ------------- | --------------- | ---------- |
| call   | Immediately   | Function result | Individual |
| apply  | Immediately   | Function result | Array      |
| bind   | When called   | New function    | Individual |

| Async Pattern | Syntax           | Error Handling  | Readability          |
| ------------- | ---------------- | --------------- | -------------------- |
| Callbacks     | Nested functions | Manual checking | Poor (callback hell) |
| Promises      | .then().catch()  | .catch() chain  | Good                 |
| Async/Await   | Synchronous-like | try/catch       | Excellent            |

---

**🎯 Interview Tips:**

1. **Understand the fundamentals**: Focus on closures, prototypes, and `this`
2. **Practice async patterns**: Know when to use callbacks vs promises vs async/await
3. **Know ES6+ features**: Destructuring, arrow functions, classes are commonly tested
4. **Understand performance**: Memory leaks, event delegation, optimization techniques
5. **Practice coding**: Write actual code, don't just memorize concepts
6. **Debug systematically**: Understand how to troubleshoot common issues
7. **Stay updated**: JavaScript evolves rapidly, know latest features

**Total Study Time: 25-30 hours**  
**Practice Projects: 5-10 small applications**  
**Mock Interviews: 3-5 sessions**

---

# References & Citations

## Official Documentation

1. [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
2. [ECMAScript Specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
3. [Node.js Documentation](https://nodejs.org/en/docs/)

## Books

1. "You Don't Know JS" by Kyle Simpson
2. "JavaScript: The Good Parts" by Douglas Crockford
3. "Eloquent JavaScript" by Marijn Haverbeke
4. "JavaScript: The Definitive Guide" by David Flanagan

## Online Resources

1. [JavaScript.info](https://javascript.info/)
2. [Exercism JavaScript Track](https://exercism.org/tracks/javascript)
3. [LeetCode](https://leetcode.com/)
4. [HackerRank JavaScript Domain](https://www.hackerrank.com/domains/javascript)

## Performance & Best Practices

1. [Google Web Fundamentals](https://developers.google.com/web/fundamentals)
2. [V8 Blog](https://v8.dev/blog)
3. [WebPageTest](https://www.webpagetest.org/)

## Style Guides

1. [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
2. [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
3. [StandardJS](https://standardjs.com/)

---

**📝 Last Updated:** November 1, 2025  
**📧 Contact:** [Your Email]  
**🔗 GitHub:** [Your GitHub Profile]

_Happy Coding! 🚀_
