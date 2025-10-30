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
    body { font-family: Arial; margin: 20px; }
    .form-group { margin: 15px 0; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input { padding: 8px; width: 300px; border: 1px solid #ccc; border-radius: 4px; }
    .error { border-color: #dc3545; }
    .error-message { color: #dc3545; font-size: 12px; margin-top: 3px; }
    .success { color: #28a745; }
    button { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background: #0056b3; }
  </style>
</head>
<body>
  <h1>User Registration Form</h1>
  <form id="form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <div class="error-message" id="nameError"></div>
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
      <div class="error-message" id="emailError"></div>
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password">
      <div class="error-message" id="passwordError"></div>
    </div>

    <button type="submit">Register</button>
    <div id="message"></div>
  </form>

  <script>
    const form = document.getElementById('form');
    const inputs = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      password: document.getElementById('password')
    };
    const errors = {
      name: document.getElementById('nameError'),
      email: document.getElementById('emailError'),
      password: document.getElementById('passwordError')
    };
    const messageDiv = document.getElementById('message');

    // REAL-TIME VALIDATION
    Object.keys(inputs).forEach(key => {
      inputs[key].addEventListener('blur', () => validateField(key));
      inputs[key].addEventListener('input', () => {
        if (errors[key].textContent) validateField(key);
      });
    });

    function validateField(field) {
      let isValid = true;
      const value = inputs[field].value.trim();

      switch (field) {
        case 'name':
          if (value.length < 3) {
            errors[field].textContent = 'Name must be at least 3 characters';
            isValid = false;
          } else {
            errors[field].textContent = '';
          }
          break;

        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors[field].textContent = 'Invalid email format';
            isValid = false;
          } else {
            errors[field].textContent = '';
          }
          break;

        case 'password':
          if (value.length < 6) {
            errors[
```
