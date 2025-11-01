# 🟦 TypeScript Interview Preparation: Complete Cheat Sheet

**Last Updated:** October 31, 2025  
**Difficulty Level:** Beginner to Advanced  
**Estimated Prep Time:** 20-30 hours

---

## 📋 Table of Contents

1. [Part 1: TypeScript Fundamentals](#part-1-typescript-fundamentals)
2. [Part 2: Advanced Types](#part-2-advanced-types)
3. [Part 3: Classes & Interfaces](#part-3-classes--interfaces)
4. [Part 4: TypeScript & React](#part-4-typescript--react)
5. [Part 5: Utility Types & Type Guards](#part-5-utility-types--type-guards)
6. [Part 6: 30+ MCQs](#part-6-30-mcqs)
7. [Part 7: 10+ Subjective Q&A](#part-7-10-subjective-qa)
8. [TLDR Summary](#tldr-summary)

---

# Part 1: TypeScript Fundamentals

## 1. Basic Types & Type Annotations - Deep Dive

### Explanation:

TypeScript's type system provides static type checking at compile time, catching errors before runtime. Understanding primitive and complex types is crucial for writing robust TypeScript code.

### Primitive Types:

```typescript
// Primitive Types with detailed examples
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xff;
let binary: number = 0b1010;
let octal: number = 0o744;

let firstName: string = "Alice";
let lastName: string = `Johnson`; // Template literals
let fullName: string = `${firstName} ${lastName}`;

let isActive: boolean = true;
let isCompleted: boolean = false;

// Special primitive: symbol (unique identifier)
let id1: symbol = Symbol("id");
let id2: symbol = Symbol("id");
console.log(id1 === id2); // false - each symbol is unique

// BigInt for large integers
let bigNumber: bigint = 9007199254740991n;
```

### Complex Types:

```typescript
// Arrays - multiple syntaxes
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: Array<string> = ["hello", "world"];
let mixed: (string | number)[] = ["hello", 42, "world"];

// Readonly arrays
let readonlyNumbers: readonly number[] = [1, 2, 3];
let readonlyStrings: ReadonlyArray<string> = ["a", "b", "c"];
// readonlyNumbers.push(4); // Error: Property 'push' does not exist

// Tuples - fixed length arrays with specific types
let person: [string, number, boolean] = ["Alice", 30, true];
let [name, age, active] = person; // Destructuring with types

// Named tuples (TypeScript 4.0+)
let point: [x: number, y: number] = [10, 20];

// Optional tuple elements
let optionalTuple: [string, number?] = ["hello"];
optionalTuple = ["hello", 42];

// Rest elements in tuples
let scores: [string, ...number[]] = ["Alice", 95, 87, 92];

// Object types
let user: { name: string; age: number; email?: string } = {
  name: "Bob",
  age: 25,
};

// Index signatures for dynamic object properties
let dictionary: { [key: string]: string } = {
  hello: "hola",
  goodbye: "adiós",
};

// Nested object types
let company: {
  name: string;
  employees: {
    name: string;
    position: string;
    salary: number;
  }[];
} = {
  name: "TechCorp",
  employees: [
    { name: "Alice", position: "Developer", salary: 75000 },
    { name: "Bob", position: "Designer", salary: 65000 },
  ],
};
```

### Special Types:

```typescript
// Any - disables type checking (use sparingly)
let anything: any = 42;
anything = "hello";
anything = true;
anything.foo.bar.baz; // No compile-time error

// Unknown - safer alternative to any
let userInput: unknown = getUserInput();
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // Type narrowing required
}

// Void - absence of return value
function logMessage(message: string): void {
  console.log(message);
  // No return statement or return undefined
}

// Never - functions that never return
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // Never exits
  }
}

// Null and Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// With strictNullChecks enabled
let maybeString: string | null = null;
let optionalString: string | undefined = undefined;
```

### Enums - Comprehensive Guide:

```typescript
// Numeric enums
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

let dir: Direction = Direction.Up;
console.log(Direction[0]); // "Up" - reverse mapping

// Explicit numeric values
enum Status {
  Draft = 1,
  Published = 2,
  Archived = 4,
}

// String enums
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

// Heterogeneous enums (mixed types)
enum Mixed {
  No = 0,
  Yes = "YES",
}

// Const enums (inlined at compile time)
const enum HttpStatusCode {
  OK = 200,
  NotFound = 404,
  InternalServerError = 500,
}

// Usage in functions
function handleStatus(status: Status): string {
  switch (status) {
    case Status.Draft:
      return "Document is in draft";
    case Status.Published:
      return "Document is published";
    case Status.Archived:
      return "Document is archived";
    default:
      return "Unknown status";
  }
}

// Enum as object type
function getColorValue(color: keyof typeof Color): string {
  return Color[color];
}
```

### Function Types:

```typescript
// Function declarations with types
function add(x: number, y: number): number {
  return x + y;
}

// Function expressions
const multiply = function (x: number, y: number): number {
  return x * y;
};

// Arrow functions
const divide = (x: number, y: number): number => x / y;

// Optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// Default parameters
function createUser(name: string, age: number = 18): User {
  return { name, age };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Function overloads
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;
function format(value: string | number | boolean): string {
  return String(value);
}

// Higher-order functions
function createMultiplier(factor: number): (x: number) => number {
  return (x: number) => x * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

// Generic function types
type GenericFunction<T, U> = (arg: T) => U;

const stringToNumber: GenericFunction<string, number> = (str) => parseInt(str);
const numberToString: GenericFunction<number, string> = (num) => num.toString();

// Callback types
type EventCallback = (event: { type: string; data: any }) => void;

function addEventListener(event: string, callback: EventCallback): void {
  // Implementation
}

// Promise types
async function fetchData(): Promise<User[]> {
  const response = await fetch("/api/users");
  return response.json();
}

// Function with this parameter
interface Counter {
  count: number;
  increment(this: Counter): void;
}

const counter: Counter = {
  count: 0,
  increment(this: Counter) {
    this.count++;
  },
};
```

### Type Assertions and Type Narrowing:

```typescript
// Type assertions
let someValue: unknown = "hello world";
let strLength: number = (someValue as string).length;
let strLength2: number = (<string>someValue).length; // JSX conflicts

// Non-null assertion operator
function processUser(user: User | null) {
  // We know user is not null here
  console.log(user!.name);
}

// Type narrowing with type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  }
}

// Discriminated unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      // Exhaustiveness check
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// instanceof narrowing
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's a Dog
  } else {
    animal.meow(); // TypeScript knows it's a Cat
  }
}

// in operator narrowing
type Bird = { fly(): void; layEggs(): void };
type Fish = { swim(): void; layEggs(): void };

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly(); // TypeScript knows it's a Bird
  } else {
    animal.swim(); // TypeScript knows it's a Fish
  }
}
```

---

## 2. Interfaces vs Type Aliases - Complete Comparison

### When to Use Interfaces:

```typescript
// Interfaces are best for object shapes that might be extended
interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  preferences?: {
    theme: "light" | "dark";
    notifications: boolean;
  };
}

// Interface extension
interface AdminUser extends User {
  permissions: string[];
  lastLogin: Date;
}

// Multiple inheritance
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface AuditableUser extends User, Timestamped {
  modifiedBy: string;
}

// Declaration merging - interfaces can be reopened
interface Window {
  customProperty: string;
}

// Later in the same module
interface Window {
  anotherCustomProperty: number;
}

// Now Window has both properties

// Interface for function signatures
interface Greeter {
  (name: string): string;
}

const greet: Greeter = (name) => `Hello, ${name}`;

// Interface for constructor signatures
interface ClockConstructor {
  new (hour: number, minute: number): Clock;
}

interface Clock {
  currentTime: Date;
  setTime(d: Date): void;
}

// Interface for indexable types
interface StringArray {
  [index: number]: string;
}

interface StringDictionary {
  [key: string]: string;
}

// Hybrid types (callable + properties)
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {
    return `Count: ${start}`;
  } as Counter;

  counter.interval = 123;
  counter.reset = function () {
    console.log("Reset called");
  };

  return counter;
}
```

### When to Use Type Aliases:

```typescript
// Type aliases are better for unions, intersections, and complex types
type Status = "pending" | "approved" | "rejected";
type ID = string | number;

// Union types
type Theme = "light" | "dark" | "auto";
type EventType = "click" | "hover" | "focus" | "blur";

// Intersection types
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type UserWithTimestamp = User & Timestamped;

// Function types
type EventHandler<T = any> = (event: T) => void;
type AsyncFunction<T, U> = (arg: T) => Promise<U>;

// Tuple types
type Point2D = [number, number];
type Point3D = [number, number, number];
type RGB = [red: number, green: number, blue: number];

// Template literal types (TypeScript 4.1+)
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickHandler = EventName<"click">; // "onClick"

// Mapped types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type ApiResponse<T> = T extends string ? { message: T } : { data: T };

// Recursive types
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

// Advanced type manipulation
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;
type StringArrayType = ExtractArrayType<string[]>; // string

// Utility type creation
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Brand types for nominal typing
type UserId = string & { __brand: "UserId" };
type Email = string & { __brand: "Email" };

function createUserId(id: string): UserId {
  return id as UserId;
}

function sendEmail(to: Email, subject: string) {
  // Implementation
}

// This prevents mixing up string types
const userId = createUserId("user123");
const email = "user@example.com" as Email;
// sendEmail(userId, "Hello"); // Error: UserId is not assignable to Email
```

### Key Differences Summary:

```typescript
// Interfaces
interface UserInterface {
  name: string;
}

// Can be extended
interface ExtendedUser extends UserInterface {
  age: number;
}

// Can be reopened (declaration merging)
interface UserInterface {
  email: string; // Now UserInterface has both name and email
}

// Type Aliases
type UserType = {
  name: string;
};

// Cannot be reopened, but can be intersected
type ExtendedUserType = UserType & {
  age: number;
};

// Better for complex type operations
type ConditionalType<T> = T extends string ? "string" : "other";
type UnionType = "a" | "b" | "c";
type TupleType = [string, number, boolean];

// Performance considerations
// Interfaces are generally faster for type checking in complex scenarios
// Type aliases are better for simple unions and primitive types

// Best Practices:
// 1. Use interfaces for object shapes that might be extended
// 2. Use types for unions, intersections, computed types
// 3. Use interfaces for public APIs that others might extend
// 4. Use types for complex type transformations
// 5. Be consistent within your codebase
```

---

# Part 2: Advanced Types & Generics

## 1. Generics - Complete Guide

### Explanation:

Generics enable writing reusable, type-safe code that works with multiple types while preserving type information. They're essential for creating flexible APIs and data structures.

### Basic Generic Functions:

```typescript
// Simple generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage with explicit type
let output1 = identity<string>("hello");
let output2 = identity<number>(42);

// Type inference (preferred)
let output3 = identity("world"); // TypeScript infers T as string
let output4 = identity(123); // TypeScript infers T as number

// Generic function with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const stringNumberPair = pair("hello", 42); // [string, number]
const booleanDatePair = pair(true, new Date()); // [boolean, Date]

// Generic function with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30, email: "alice@example.com" };
const name = getProperty(person, "name"); // string
const age = getProperty(person, "age"); // number
// const invalid = getProperty(person, "salary"); // Error: Argument of type '"salary"' is not assignable
```

### Generic Classes:

```typescript
// Generic class with type parameter
class GenericStorage<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  getAll(): T[] {
    return [...this.items];
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  map<U>(mapper: (item: T) => U): U[] {
    return this.items.map(mapper);
  }
}

// Usage
const numberStorage = new GenericStorage<number>();
numberStorage.add(1);
numberStorage.add(2);
numberStorage.add(3);

const stringStorage = new GenericStorage<string>();
stringStorage.add("hello");
stringStorage.add("world");

// Generic class with constraints
interface Identifiable {
  id: string | number;
}

class Repository<T extends Identifiable> {
  private items: Map<string | number, T> = new Map();

  save(item: T): void {
    this.items.set(item.id, item);
  }

  findById(id: string | number): T | undefined {
    return this.items.get(id);
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }

  delete(id: string | number): boolean {
    return this.items.delete(id);
  }
}

// Usage with interfaces
interface User extends Identifiable {
  id: string;
  name: string;
  email: string;
}

interface Product extends Identifiable {
  id: number;
  name: string;
  price: number;
}

const userRepository = new Repository<User>();
const productRepository = new Repository<Product>();
```

### Generic Interfaces:

```typescript
// Generic interface for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Generic interface for event handlers
interface EventEmitter<T> {
  on(event: string, listener: (data: T) => void): void;
  emit(event: string, data: T): void;
  off(event: string, listener: (data: T) => void): void;
}

// Implementation
class SimpleEventEmitter<T> implements EventEmitter<T> {
  private listeners: Map<string, ((data: T) => void)[]> = new Map();

  on(event: string, listener: (data: T) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  emit(event: string, data: T): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
    }
  }

  off(event: string, listener: (data: T) => void): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}

// Generic interface for data access
interface CrudRepository<T, ID> {
  create(entity: Omit<T, "id">): Promise<T>;
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: ID, entity: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
}

// Generic interface with multiple constraints
interface Comparable<T> {
  compareTo(other: T): number;
}

interface Sortable<T extends Comparable<T>> {
  sort(): T[];
  sortBy<K extends keyof T>(key: K): T[];
}
```

### Advanced Generic Patterns:

```typescript
// Conditional types with generics
type ApiResponseType<T> = T extends string
  ? { message: T }
  : T extends number
  ? { count: T }
  : { data: T };

// Mapped types with generics
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// Generic utility types
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Example usage
interface Example {
  name: string;
  age: number;
  isActive: boolean;
  tags: string[];
}

type StringKeys = KeysOfType<Example, string>; // "name"
type NumberKeys = KeysOfType<Example, number>; // "age"
type ArrayKeys = KeysOfType<Example, unknown[]>; // "tags"

// Generic factory pattern
interface Factory<T> {
  create(...args: any[]): T;
}

class UserFactory implements Factory<User> {
  create(name: string, email: string): User {
    return {
      id: Math.random().toString(36),
      name,
      email,
    };
  }
}

class ProductFactory implements Factory<Product> {
  create(name: string, price: number): Product {
    return {
      id: Math.floor(Math.random() * 1000),
      name,
      price,
    };
  }
}

// Generic builder pattern
class QueryBuilder<T> {
  private conditions: string[] = [];
  private orderBy: string[] = [];
  private limitValue?: number;

  where(condition: keyof T, operator: string, value: any): this {
    this.conditions.push(`${String(condition)} ${operator} '${value}'`);
    return this;
  }

  order(field: keyof T, direction: "ASC" | "DESC" = "ASC"): this {
    this.orderBy.push(`${String(field)} ${direction}`);
    return this;
  }

  limit(count: number): this {
    this.limitValue = count;
    return this;
  }

  build(): string {
    let query = "SELECT * FROM table";

    if (this.conditions.length > 0) {
      query += ` WHERE ${this.conditions.join(" AND ")}`;
    }

    if (this.orderBy.length > 0) {
      query += ` ORDER BY ${this.orderBy.join(", ")}`;
    }

    if (this.limitValue) {
      query += ` LIMIT ${this.limitValue}`;
    }

    return query;
  }
}

// Usage
const userQuery = new QueryBuilder<User>()
  .where("name", "=", "Alice")
  .where("age", ">", 18)
  .order("name", "ASC")
  .limit(10)
  .build();
```

### Generic Constraints and Advanced Patterns:

```typescript
// Multiple constraints
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Named {
  name: string;
}

function processEntity<T extends Named & Timestamped>(entity: T): T {
  console.log(`Processing ${entity.name}, created at ${entity.createdAt}`);
  return {
    ...entity,
    updatedAt: new Date(),
  };
}

// Conditional constraints
type NonNullable<T> = T extends null | undefined ? never : T;

function assertNonNull<T>(value: T): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error("Value cannot be null or undefined");
  }
  return value as NonNullable<T>;
}

// Generic type inference
function createArray<T>(length: number, value: T): T[] {
  return new Array(length).fill(value);
}

const stringArray = createArray(3, "hello"); // string[]
const numberArray = createArray(5, 42); // number[]

// Infer return types
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getString(): string {
  return "hello";
}

function getNumber(): number {
  return 42;
}

type StringReturn = ReturnType<typeof getString>; // string
type NumberReturn = ReturnType<typeof getNumber>; // number

// Generic promise handling
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const data = await response.json();

  return {
    data: data as T,
    status: response.status,
    message: response.statusText,
    timestamp: new Date(),
  };
}

// Usage with type inference
interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: string;
    notifications: boolean;
  };
}

const userProfileResponse = await fetchData<UserProfile>("/api/user/profile");
// TypeScript knows userProfileResponse.data is UserProfile

// Generic error handling
class Result<T, E = Error> {
  constructor(private value?: T, private error?: E) {}

  static success<T>(value: T): Result<T> {
    return new Result(value);
  }

  static failure<E>(error: E): Result<never, E> {
    return new Result(undefined, error);
  }

  isSuccess(): this is Result<T, never> {
    return this.error === undefined;
  }

  isFailure(): this is Result<never, E> {
    return this.error !== undefined;
  }

  getValue(): T {
    if (this.isFailure()) {
      throw new Error("Cannot get value from failed result");
    }
    return this.value!;
  }

  getError(): E {
    if (this.isSuccess()) {
      throw new Error("Cannot get error from successful result");
    }
    return this.error!;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.isSuccess()) {
      try {
        return Result.success(fn(this.getValue()));
      } catch (error) {
        return Result.failure(error as E);
      }
    }
    return Result.failure(this.getError());
  }

  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isSuccess()) {
      return fn(this.getValue());
    }
    return Result.failure(this.getError());
  }
}

// Usage
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Result.failure("Division by zero");
  }
  return Result.success(a / b);
}

const result = divide(10, 2)
  .map((x) => x * 2)
  .map((x) => x.toString());

if (result.isSuccess()) {
  console.log(result.getValue()); // "10"
}
```

## 2. Union, Intersection & Conditional Types

### Union Types - Advanced Patterns:

```typescript
// Basic union types
type Status = "pending" | "approved" | "rejected";
type ID = string | number;
type Theme = "light" | "dark" | "auto";

// Discriminated unions (Tagged unions)
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: any;
}

interface ErrorState {
  status: "error";
  error: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

// Type guards for discriminated unions
function handleAsyncState(state: AsyncState) {
  switch (state.status) {
    case "loading":
      console.log("Loading...");
      break;
    case "success":
      console.log("Data:", state.data); // TypeScript knows data exists
      break;
    case "error":
      console.log("Error:", state.error); // TypeScript knows error exists
      break;
    default:
      // Exhaustiveness check
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
  }
}

// Complex discriminated unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number }
  | { kind: "polygon"; sides: number; sideLength: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    case "polygon":
      // Simplified polygon area calculation
      return (
        (shape.sides * shape.sideLength ** 2) /
        (4 * Math.tan(Math.PI / shape.sides))
      );
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// Union with shared properties
interface Bird {
  type: "bird";
  fly(): void;
  layEggs(): void;
}

interface Fish {
  type: "fish";
  swim(): void;
  layEggs(): void;
}

interface Insect {
  type: "insect";
  crawl(): void;
  layEggs(): void;
}

type Animal = Bird | Fish | Insect;

// All animals can lay eggs (shared property)
function reproduceAnimal(animal: Animal) {
  animal.layEggs(); // Always available

  // Type-specific behavior
  if (animal.type === "bird") {
    animal.fly();
  } else if (animal.type === "fish") {
    animal.swim();
  } else {
    animal.crawl();
  }
}

// Template literal types for dynamic unions
type EventName = "click" | "focus" | "blur";
type EventHandler<T extends EventName> = `on${Capitalize<T>}`;

type ClickHandler = EventHandler<"click">; // "onClick"
type FocusHandler = EventHandler<"focus">; // "onFocus"

// Dynamic union creation
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type ApiEndpoint = `/api/${"users" | "products" | "orders"}`;
type RequestConfig<M extends HttpMethod> = {
  method: M;
  url: string;
  data?: M extends "GET" | "DELETE" ? never : any;
};

const getRequest: RequestConfig<"GET"> = {
  method: "GET",
  url: "/api/users",
  // data: {} // Error: data not allowed for GET
};

const postRequest: RequestConfig<"POST"> = {
  method: "POST",
  url: "/api/users",
  data: { name: "John", email: "john@example.com" },
};
```

### Intersection Types - Deep Dive:

```typescript
// Basic intersection types
interface Name {
  name: string;
}

interface Age {
  age: number;
}

interface Email {
  email: string;
}

type Person = Name & Age & Email;

const person: Person = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
};

// Intersection with conflicting properties
interface A {
  prop: string;
}

interface B {
  prop: number;
}

type Conflict = A & B; // prop: never (impossible type)

// Merging function signatures
interface Clickable {
  onClick(event: MouseEvent): void;
}

interface Focusable {
  onFocus(event: FocusEvent): void;
}

type Interactive = Clickable & Focusable;

// Mixin pattern with intersections
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Auditable {
  createdBy: string;
  modifiedBy: string;
}

interface Deletable {
  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: string;
}

type BaseEntity = {
  id: string;
};

type AuditableEntity<T> = T & Timestamped & Auditable;
type SoftDeletableEntity<T> = T & Deletable;
type FullAuditEntity<T> = T & Timestamped & Auditable & Deletable;

interface UserData {
  name: string;
  email: string;
}

type User = FullAuditEntity<BaseEntity & UserData>;

// Advanced intersection patterns
type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? K extends keyof T
      ? T[K] extends object
        ? U[K] extends object
          ? DeepMerge<T[K], U[K]>
          : U[K]
        : U[K]
      : U[K]
    : K extends keyof T
    ? T[K]
    : never;
};

// Conditional intersection
type ConditionalMerge<T, U, Condition> = Condition extends true ? T & U : T;

// Intersection with generic constraints
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = mergeObjects(
  { name: "Alice", age: 30 },
  { email: "alice@example.com", isActive: true }
);
// Type: { name: string; age: number; email: string; isActive: boolean; }

// Brand intersection for nominal typing
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;
type Email = Brand<string, "Email">;

function createUserId(id: string): UserId {
  return id as UserId;
}

function createEmail(email: string): Email {
  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }
  return email as Email;
}

// Functions that accept branded types
function getUserById(id: UserId): Promise<User> {
  // Implementation
  return Promise.resolve({} as User);
}

function sendEmail(to: Email, subject: string, body: string): void {
  // Implementation
}

// This prevents mixing up different string types
const userId = createUserId("user-123");
const email = createEmail("user@example.com");

// getUserById(email); // Error: Email is not assignable to UserId
// sendEmail(userId, "Hello", "Message"); // Error: UserId is not assignable to Email
```

### Conditional Types - Advanced Usage:

```typescript
// Basic conditional types
type IsString<T> = T extends string ? true : false;
type IsArray<T> = T extends any[] ? true : false;
type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
type Test3 = IsArray<string[]>; // true
type Test4 = IsFunction<() => void>; // true

// Extracting types with infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Parameters<T> = T extends (...args: infer P) => any ? P : never;
type ArrayElement<T> = T extends (infer U)[] ? U : never;

function exampleFunction(a: string, b: number): boolean {
  return Boolean(a) && Boolean(b);
}

type FunctionReturn = ReturnType<typeof exampleFunction>; // boolean
type FunctionParams = Parameters<typeof exampleFunction>; // [string, number]
type StringArrayElement = ArrayElement<string[]>; // string

// Complex conditional type chains
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends any[]
      ? ReadonlyArray<DeepReadonly<T[P][0]>>
      : DeepReadonly<T[P]>
    : T[P];
};

interface NestedObject {
  user: {
    name: string;
    preferences: {
      theme: string;
      notifications: boolean;
    };
    tags: string[];
  };
}

type ReadonlyNested = DeepReadonly<NestedObject>;
// All properties including nested ones are readonly

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

// Non-distributive conditional types
type ToArrayNonDistributive<T> = [T] extends [any] ? T[] : never;
type UnionArray = ToArrayNonDistributive<string | number>; // (string | number)[]

// Advanced type filtering
type NonNullable<T> = T extends null | undefined ? never : T;
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
}[keyof Base];

interface Example {
  name: string;
  age: number;
  isActive: boolean;
  tags: string[];
  metadata?: object;
}

type StringProperties = FilterFlags<Example, string>; // "name"
type NumberProperties = FilterFlags<Example, number>; // "age"
type OptionalProperties = FilterFlags<Example, undefined>; // never (no optional props in this context)

// Template literal conditional types
type EventHandlerName<T extends string> = `on${Capitalize<T>}`;
type ExtractEventName<T> = T extends `on${infer U}` ? Lowercase<U> : never;

type ClickHandlerName = EventHandlerName<"click">; // "onClick"
type ExtractedEvent = ExtractEventName<"onClick">; // "click"

// Recursive conditional types
type Flatten<T> = T extends any[]
  ? T[0] extends any[]
    ? Flatten<T[0]>
    : T[0]
  : T;

type NestedArray = string[][][];
type FlattenedType = Flatten<NestedArray>; // string

// Conditional types with multiple inferences
type SplitString<
  S extends string,
  D extends string
> = S extends `${infer T}${D}${infer U}` ? [T, ...SplitString<U, D>] : [S];

type PathSegments = SplitString<"user.profile.name", ".">; // ["user", "profile", "name"]

// Advanced utility conditional types
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: {
    theme: string;
    notifications: boolean;
  };
}

type UserRequiredKeys = RequiredKeys<UserProfile>; // "id" | "name" | "email"
type UserOptionalKeys = OptionalKeys<UserProfile>; // "avatar" | "preferences"

// Conditional types for API design
type ApiEndpointMethod<T extends string> =
  T extends `${infer Method} ${infer Path}`
    ? { method: Method; path: Path }
    : never;

type GetUsersEndpoint = ApiEndpointMethod<"GET /api/users">;
// { method: "GET"; path: "/api/users" }

type PostUserEndpoint = ApiEndpointMethod<"POST /api/users">;
// { method: "POST"; path: "/api/users" }

// Conditional types for state machine
type StateTransition<From, Event, To> = {
  from: From;
  event: Event;
  to: To;
};

type ValidTransition<
  T extends StateTransition<any, any, any>,
  From,
  Event
> = T extends StateTransition<From, Event, infer To> ? To : never;

type LoginStates =
  | StateTransition<"idle", "submit", "loading">
  | StateTransition<"loading", "success", "success">
  | StateTransition<"loading", "error", "error">
  | StateTransition<"error", "retry", "loading">
  | StateTransition<"success", "reset", "idle">;

type AfterSubmit = ValidTransition<LoginStates, "idle", "submit">; // "loading"
type AfterSuccess = ValidTransition<LoginStates, "loading", "success">; // "success"
```

---

# Part 3: Classes, Interfaces & Advanced OOP

## 1. Class Syntax & Inheritance - Comprehensive Guide

### Basic Classes:

```typescript
// Basic class with constructor and methods
class Animal {
  // Property declarations
  public name: string;
  protected species: string;
  private age: number;
  readonly id: string;

  // Constructor with parameter properties
  constructor(
    name: string,
    species: string,
    age: number,
    public habitat: string = "unknown" // Parameter property
  ) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.id = Math.random().toString(36);
  }

  // Public method
  public makeSound(): void {
    console.log(`${this.name} makes a sound`);
  }

  // Protected method (accessible in subclasses)
  protected getSpecies(): string {
    return this.species;
  }

  // Private method (only accessible within this class)
  private incrementAge(): void {
    this.age++;
  }

  // Getter
  get currentAge(): number {
    return this.age;
  }

  // Setter with validation
  set currentAge(age: number) {
    if (age >= 0 && age <= 100) {
      this.age = age;
    } else {
      throw new Error("Invalid age");
    }
  }

  // Static method
  static compareAnimals(animal1: Animal, animal2: Animal): string {
    if (animal1.currentAge > animal2.currentAge) {
      return `${animal1.name} is older`;
    } else if (animal2.currentAge > animal1.currentAge) {
      return `${animal2.name} is older`;
    } else {
      return "They are the same age";
    }
  }

  // Method with overloads
  move(distance: number): void;
  move(x: number, y: number): void;
  move(distanceOrX: number, y?: number): void {
    if (y === undefined) {
      console.log(`${this.name} moved ${distanceOrX} meters`);
    } else {
      console.log(`${this.name} moved to position (${distanceOrX}, ${y})`);
    }
  }
}

// Inheritance with super calls
class Dog extends Animal {
  private breed: string;

  constructor(
    name: string,
    age: number,
    breed: string,
    public isTrained: boolean = false
  ) {
    super(name, "Canine", age, "Domestic");
    this.breed = breed;
  }

  // Override parent method
  public makeSound(): void {
    console.log(`${this.name} barks: Woof! Woof!`);
  }

  // Additional method specific to Dog
  public fetch(item: string): void {
    if (this.isTrained) {
      console.log(`${this.name} fetches the ${item}`);
    } else {
      console.log(`${this.name} doesn't know how to fetch yet`);
    }
  }

  // Protected method usage
  public getInfo(): string {
    return `${this.name} is a ${this.breed} ${this.getSpecies()}`;
  }

  // Static method
  static createPuppy(name: string, breed: string): Dog {
    return new Dog(name, 1, breed, false);
  }
}

// Abstract classes
abstract class Vehicle {
  protected engine: string;
  protected fuel: number;

  constructor(engine: string, fuel: number = 100) {
    this.engine = engine;
    this.fuel = fuel;
  }

  // Concrete method
  public refuel(amount: number): void {
    this.fuel = Math.min(this.fuel + amount, 100);
    console.log(`Refueled. Current fuel: ${this.fuel}%`);
  }

  // Abstract method (must be implemented by subclasses)
  abstract start(): void;
  abstract stop(): void;
  abstract getMaxSpeed(): number;

  // Abstract getter
  abstract get vehicleType(): string;
}

class Car extends Vehicle {
  private doors: number;
  private transmission: "manual" | "automatic";

  constructor(
    engine: string,
    doors: number,
    transmission: "manual" | "automatic",
    fuel: number = 100
  ) {
    super(engine, fuel);
    this.doors = doors;
    this.transmission = transmission;
  }

  start(): void {
    if (this.fuel > 0) {
      console.log(`Car started with ${this.engine} engine`);
    } else {
      console.log("Cannot start: No fuel");
    }
  }

  stop(): void {
    console.log("Car stopped");
  }

  getMaxSpeed(): number {
    return this.engine.includes("V8") ? 200 : 150;
  }

  get vehicleType(): string {
    return `${this.doors}-door car with ${this.transmission} transmission`;
  }

  // Car-specific method
  public honk(): void {
    console.log("Beep! Beep!");
  }
}

class Motorcycle extends Vehicle {
  private hasSidecar: boolean;

  constructor(engine: string, hasSidecar: boolean = false) {
    super(engine, 50); // Motorcycles have smaller fuel tanks
    this.hasSidecar = hasSidecar;
  }

  start(): void {
    console.log(`Motorcycle started with ${this.engine} engine`);
  }

  stop(): void {
    console.log("Motorcycle stopped");
  }

  getMaxSpeed(): number {
    return this.hasSidecar ? 120 : 180;
  }

  get vehicleType(): string {
    return this.hasSidecar ? "Motorcycle with sidecar" : "Motorcycle";
  }

  public wheelie(): void {
    if (!this.hasSidecar) {
      console.log("Performing a wheelie!");
    } else {
      console.log("Cannot perform wheelie with sidecar");
    }
  }
}
```

### Interface Implementation:

```typescript
// Multiple interface implementation
interface Flyable {
  altitude: number;
  fly(height: number): void;
  land(): void;
}

interface Swimmable {
  depth: number;
  swim(depth: number): void;
  surface(): void;
}

interface Identifiable {
  readonly id: string;
  getName(): string;
}

// Interface extending other interfaces
interface AquaticBird extends Flyable, Swimmable, Identifiable {
  species: string;
  migrate(destination: string): void;
}

class Duck implements AquaticBird {
  readonly id: string;
  public altitude: number = 0;
  public depth: number = 0;
  public species: string;
  private name: string;

  constructor(name: string, species: string = "Mallard") {
    this.id = `duck-${Math.random().toString(36).substr(2, 9)}`;
    this.name = name;
    this.species = species;
  }

  getName(): string {
    return this.name;
  }

  fly(height: number): void {
    this.altitude = height;
    console.log(`${this.name} is flying at ${height} feet`);
  }

  land(): void {
    this.altitude = 0;
    console.log(`${this.name} has landed`);
  }

  swim(depth: number): void {
    this.depth = depth;
    console.log(`${this.name} is swimming at ${depth} feet deep`);
  }

  surface(): void {
    this.depth = 0;
    console.log(`${this.name} has surfaced`);
  }

  migrate(destination: string): void {
    console.log(`${this.name} is migrating to ${destination}`);
  }

  // Duck-specific behavior
  quack(): void {
    console.log(`${this.name} says: Quack!`);
  }
}

// Interface for constructor signatures
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
  currentTime: Date;
}

interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
  tick(): void;
}

// Factory pattern with interface
function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  currentTime: Date;
  static currentTime: Date = new Date();

  constructor(hour: number, minute: number) {
    this.currentTime = new Date();
    this.currentTime.setHours(hour, minute, 0, 0);
  }

  setTime(d: Date): void {
    this.currentTime = d;
  }

  tick(): void {
    this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
    console.log(`Digital time: ${this.currentTime.toLocaleTimeString()}`);
  }
}

class AnalogClock implements ClockInterface {
  currentTime: Date;
  static currentTime: Date = new Date();

  constructor(hour: number, minute: number) {
    this.currentTime = new Date();
    this.currentTime.setHours(hour, minute, 0, 0);
  }

  setTime(d: Date): void {
    this.currentTime = d;
  }

  tick(): void {
    this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
    const hours = this.currentTime.getHours() % 12;
    const minutes = this.currentTime.getMinutes();
    console.log(`Analog time: ${hours}:${minutes.toString().padStart(2, "0")}`);
  }
}

// Generic classes with interfaces
interface Repository<T> {
  save(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

abstract class BaseRepository<T extends { id: string }>
  implements Repository<T>
{
  protected items: Map<string, T> = new Map();

  async save(entity: T): Promise<T> {
    this.items.set(entity.id, entity);
    return entity;
  }

  async findById(id: string): Promise<T | null> {
    return this.items.get(id) || null;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.items.values());
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const entity = this.items.get(id);
    if (!entity) {
      throw new Error(`Entity with id ${id} not found`);
    }
    const updated = { ...entity, ...updates };
    this.items.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    if (!this.items.has(id)) {
      throw new Error(`Entity with id ${id} not found`);
    }
    this.items.delete(id);
  }

  // Abstract method for validation
  abstract validate(entity: T): boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

class UserRepository extends BaseRepository<User> {
  validate(user: User): boolean {
    return (
      user.name.length > 0 && user.email.includes("@") && user.id.length > 0
    );
  }

  // Additional user-specific methods
  async findByEmail(email: string): Promise<User | null> {
    const users = await this.findAll();
    return users.find((user) => user.email === email) || null;
  }

  async findRecentUsers(days: number = 7): Promise<User[]> {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const users = await this.findAll();
    return users.filter((user) => user.createdAt >= cutoff);
  }
}
```

## 2. Decorators - Advanced Patterns

### Class Decorators:

```typescript
// Basic class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function logged<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      console.log(`Creating instance of ${constructor.name}`);
      super(...args);
    }
  };
}

// Decorator factory
function component(name: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      componentName = name;

      constructor(...args: any[]) {
        super(...args);
        console.log(`Component ${name} initialized`);
      }
    };
  };
}

@sealed
@logged
@component("UserCard")
class UserComponent {
  constructor(public name: string) {}

  render() {
    return `<div>Hello, ${this.name}</div>`;
  }
}

// Metadata decorator
function metadata(key: string, value: any) {
  return function (target: any) {
    Reflect.defineMetadata(key, value, target);
  };
}

@metadata("version", "1.0.0")
@metadata("author", "John Doe")
class ApiController {
  getUsers() {
    return [];
  }
}
```

### Method Decorators:

```typescript
// Performance monitoring decorator
function performance(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} execution time: ${end - start}ms`);
    return result;
  };

  return descriptor;
}

// Async method decorator
function asyncRetry(retries: number = 3, delay: number = 1000) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: Error;

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error as Error;
          console.log(`Attempt ${attempt} failed: ${error.message}`);

          if (attempt < retries) {
            await new Promise((resolve) =>
              setTimeout(resolve, delay * attempt)
            );
          }
        }
      }

      throw lastError!;
    };

    return descriptor;
  };
}

// Authorization decorator
function authorize(roles: string[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // In a real app, you'd get this from context/session
      const userRoles = this.getCurrentUserRoles();

      const hasPermission = roles.some((role) => userRoles.includes(role));

      if (!hasPermission) {
        throw new Error(`Access denied. Required roles: ${roles.join(", ")}`);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

// Cache decorator
function cache(ttl: number = 60000) {
  // TTL in milliseconds
  const cacheMap = new Map<string, { value: any; expiry: number }>();

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const key = `${propertyKey}-${JSON.stringify(args)}`;
      const cached = cacheMap.get(key);

      if (cached && cached.expiry > Date.now()) {
        console.log(`Cache hit for ${propertyKey}`);
        return cached.value;
      }

      const result = originalMethod.apply(this, args);

      // Handle promises
      if (result instanceof Promise) {
        return result.then((resolvedValue) => {
          cacheMap.set(key, {
            value: resolvedValue,
            expiry: Date.now() + ttl,
          });
          return resolvedValue;
        });
      } else {
        cacheMap.set(key, {
          value: result,
          expiry: Date.now() + ttl,
        });
        return result;
      }
    };

    return descriptor;
  };
}

class UserService {
  private userRoles = ["admin", "user"];

  getCurrentUserRoles(): string[] {
    return this.userRoles;
  }

  @performance
  @cache(30000) // Cache for 30 seconds
  getUsers(): User[] {
    // Simulate expensive operation
    const users = Array.from({ length: 1000 }, (_, i) => ({
      id: `user-${i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      createdAt: new Date(),
    }));

    return users;
  }

  @authorize(["admin"])
  @asyncRetry(3, 2000)
  async deleteUser(userId: string): Promise<void> {
    // Simulate API call that might fail
    if (Math.random() < 0.7) {
      throw new Error("Network error");
    }

    console.log(`User ${userId} deleted successfully`);
  }

  @performance
  @authorize(["admin", "moderator"])
  updateUser(userId: string, updates: Partial<User>): User {
    console.log(`Updating user ${userId}:`, updates);
    return {
      id: userId,
      name: updates.name || "Unknown",
      email: updates.email || "unknown@example.com",
      createdAt: new Date(),
    };
  }
}
```

### Property Decorators:

```typescript
// Validation decorators
function required(target: any, propertyKey: string) {
  const privateKey = `_${propertyKey}`;

  Object.defineProperty(target, propertyKey, {
    get() {
      return this[privateKey];
    },
    set(value: any) {
      if (value === null || value === undefined) {
        throw new Error(`${propertyKey} is required`);
      }
      this[privateKey] = value;
    },
    enumerable: true,
    configurable: true,
  });
}

function minLength(length: number) {
  return function (target: any, propertyKey: string) {
    const privateKey = `_${propertyKey}`;

    Object.defineProperty(target, propertyKey, {
      get() {
        return this[privateKey];
      },
      set(value: string) {
        if (typeof value === "string" && value.length < length) {
          throw new Error(
            `${propertyKey} must be at least ${length} characters long`
          );
        }
        this[privateKey] = value;
      },
      enumerable: true,
      configurable: true,
    });
  };
}

function email(target: any, propertyKey: string) {
  const privateKey = `_${propertyKey}`;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  Object.defineProperty(target, propertyKey, {
    get() {
      return this[privateKey];
    },
    set(value: string) {
      if (typeof value === "string" && !emailRegex.test(value)) {
        throw new Error(`${propertyKey} must be a valid email address`);
      }
      this[privateKey] = value;
    },
    enumerable: true,
    configurable: true,
  });
}

// Serialization decorators
function serialize(alias?: string) {
  return function (target: any, propertyKey: string) {
    const serializableProps = target.constructor._serializableProps || [];
    serializableProps.push({ key: propertyKey, alias: alias || propertyKey });
    target.constructor._serializableProps = serializableProps;
  };
}

function ignore(target: any, propertyKey: string) {
  const ignoredProps = target.constructor._ignoredProps || [];
  ignoredProps.push(propertyKey);
  target.constructor._ignoredProps = ignoredProps;
}

class UserProfile {
  @required
  @minLength(2)
  @serialize("fullName")
  name!: string;

  @required
  @email
  @serialize()
  email!: string;

  @serialize("userAge")
  age!: number;

  @ignore
  private password!: string;

  @serialize()
  createdAt: Date = new Date();

  constructor(name: string, email: string, age: number, password: string) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.password = password;
  }

  toJSON(): any {
    const serializableProps =
      (this.constructor as any)._serializableProps || [];
    const result: any = {};

    for (const prop of serializableProps) {
      result[prop.alias] = (this as any)[prop.key];
    }

    return result;
  }

  static fromJSON(json: any): UserProfile {
    // Implementation would map from JSON back to object
    return new UserProfile(
      json.fullName,
      json.email,
      json.userAge,
      "defaultPassword"
    );
  }
}
```

### Parameter Decorators:

```typescript
// Parameter validation decorators
function validate(target: any, propertyKey: string, parameterIndex: number) {
  const existingValidators =
    Reflect.getMetadata("validators", target, propertyKey) || [];
  existingValidators.push({ index: parameterIndex, validator: "required" });
  Reflect.defineMetadata("validators", existingValidators, target, propertyKey);
}

function range(min: number, max: number) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingValidators =
      Reflect.getMetadata("validators", target, propertyKey) || [];
    existingValidators.push({
      index: parameterIndex,
      validator: "range",
      min,
      max,
    });
    Reflect.defineMetadata(
      "validators",
      existingValidators,
      target,
      propertyKey
    );
  };
}

// Method decorator to process parameter validators
function validateParams(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const validators =
      Reflect.getMetadata("validators", target, propertyKey) || [];

    for (const validator of validators) {
      const value = args[validator.index];

      switch (validator.validator) {
        case "required":
          if (value === null || value === undefined) {
            throw new Error(
              `Parameter at index ${validator.index} is required`
            );
          }
          break;
        case "range":
          if (
            typeof value === "number" &&
            (value < validator.min || value > validator.max)
          ) {
            throw new Error(
              `Parameter at index ${validator.index} must be between ${validator.min} and ${validator.max}`
            );
          }
          break;
      }
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class MathService {
  @validateParams
  add(@validate a: number, @validate b: number): number {
    return a + b;
  }

  @validateParams
  divide(
    @validate @range(1, Number.MAX_VALUE) numerator: number,
    @validate @range(0.001, Number.MAX_VALUE) denominator: number
  ): number {
    return numerator / denominator;
  }
}

// Dependency injection with parameter decorators
const services = new Map<string, any>();

function inject(token: string) {
  return function (
    target: any,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) {
    const existingTokens = Reflect.getMetadata("tokens", target) || [];
    existingTokens[parameterIndex] = token;
    Reflect.defineMetadata("tokens", existingTokens, target);
  };
}

function injectable<T extends { new (...args: any[]): {} }>(constructor: T) {
  const tokens = Reflect.getMetadata("tokens", constructor) || [];

  return class extends constructor {
    constructor(...args: any[]) {
      const injectedArgs = tokens.map((token: string, index: number) => {
        return services.get(token) || args[index];
      });

      super(...injectedArgs);
    }
  } as T;
}

// Register services
services.set("logger", {
  log: (message: string) => console.log(`[LOG]: ${message}`),
});

services.set("database", {
  save: (data: any) => console.log("Saving to database:", data),
  find: (id: string) => ({ id, name: "Test User" }),
});

@injectable
class OrderService {
  constructor(
    @inject("logger") private logger: any,
    @inject("database") private database: any
  ) {}

  createOrder(orderData: any): void {
    this.logger.log("Creating new order");
    this.database.save(orderData);
    this.logger.log("Order created successfully");
  }
}
```

---

# Part 4: TypeScript & React - Complete Integration Guide

## 1. Typing Props and State - Advanced Patterns

### Function Components with TypeScript:

```typescript
import React, { ReactNode, CSSProperties } from "react";

// Basic prop types
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isActive: boolean;
  };
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
  className?: string;
  style?: CSSProperties;
}

// Component with destructured props
const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  className = "",
  style,
}) => {
  return (
    <div className={`user-card ${className}`} style={style}>
      <img src={user.avatar || "/default-avatar.png"} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <span className={`status ${user.isActive ? "active" : "inactive"}`}>
        {user.isActive ? "Active" : "Inactive"}
      </span>
      <div className="actions">
        {onEdit && <button onClick={() => onEdit(user.id)}>Edit</button>}
        {onDelete && <button onClick={() => onDelete(user.id)}>Delete</button>}
      </div>
    </div>
  );
};

// Generic component with constraints
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyComponent?: ReactNode;
  loading?: boolean;
  error?: string;
}

function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyComponent = <div>No items found</div>,
  loading = false,
  error,
}: ListProps<T>) {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (items.length === 0) {
    return <>{emptyComponent}</>;
  }

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// Usage of generic component
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <List
      items={products}
      keyExtractor={(product) => product.id}
      renderItem={(product, index) => (
        <div>
          <h4>{product.name}</h4>
          <p>Price: ${product.price}</p>
          <span>Category: {product.category}</span>
        </div>
      )}
      emptyComponent={<div>No products available</div>}
    />
  );
};

// Component with children patterns
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "small" | "medium" | "large";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal modal--${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="modal-header">
            <h2>{title}</h2>
            <button onClick={onClose}>&times;</button>
          </div>
        )}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

// Render props pattern with TypeScript
interface DataFetcherProps<T> {
  url: string;
  children: (data: {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }) => ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <>{children({ data, loading, error, refetch: fetchData })}</>;
}

// Usage of render props
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  return (
    <DataFetcher<User> url={`/api/users/${userId}`}>
      {({ data, loading, error, refetch }) => {
        if (loading) return <div>Loading user...</div>;
        if (error) return <div>Error: {error}</div>;
        if (!data) return <div>No user found</div>;

        return (
          <div>
            <UserCard user={data} />
            <button onClick={refetch}>Refresh</button>
          </div>
        );
      }}
    </DataFetcher>
  );
};

// Higher-Order Component with TypeScript
interface WithLoadingProps {
  loading: boolean;
}

function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> {
  return ({ loading, ...props }) => {
    if (loading) {
      return <div className="loading-spinner">Loading...</div>;
    }

    return <Component {...(props as P)} />;
  };
}

// HOC with additional props
interface WithAuthProps {
  user: User | null;
  isAuthenticated: boolean;
}

function withAuth<P extends object>(
  Component: React.ComponentType<P & WithAuthProps>
): React.FC<P> {
  return (props) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
      // Check authentication status
      const token = localStorage.getItem("authToken");
      if (token) {
        // Validate token and get user
        setIsAuthenticated(true);
        // setUser(userData);
      }
    }, []);

    if (!isAuthenticated) {
      return <div>Please log in to access this content</div>;
    }

    return (
      <Component {...props} user={user} isAuthenticated={isAuthenticated} />
    );
  };
}

// Usage of HOCs
const LoadingUserCard = withLoading(UserCard);
const AuthenticatedUserProfile = withAuth(UserProfile);
```

## 2. React Hooks with TypeScript

### useState Advanced Patterns:

```typescript
import React, { useState, useCallback, useMemo } from "react";

// Complex state with TypeScript
interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  editingId: string | null;
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoApp: React.FC = () => {
  const [state, setState] = useState<TodoState>({
    todos: [],
    filter: "all",
    editingId: null,
  });

  // Type-safe state updater
  const updateState = useCallback(
    (updater: Partial<TodoState> | ((prev: TodoState) => TodoState)) => {
      setState((prev) =>
        typeof updater === "function" ? updater(prev) : { ...prev, ...updater }
      );
    },
    []
  );

  const addTodo = useCallback(
    (text: string) => {
      const newTodo: Todo = {
        id: `todo-${Date.now()}`,
        text,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      updateState((prev) => ({
        ...prev,
        todos: [...prev.todos, newTodo],
      }));
    },
    [updateState]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      updateState((prev) => ({
        ...prev,
        todos: prev.todos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
            : todo
        ),
      }));
    },
    [updateState]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      updateState((prev) => ({
        ...prev,
        todos: prev.todos.filter((todo) => todo.id !== id),
      }));
    },
    [updateState]
  );

  const editTodo = useCallback(
    (id: string, newText: string) => {
      updateState((prev) => ({
        ...prev,
        todos: prev.todos.map((todo) =>
          todo.id === id
            ? { ...todo, text: newText, updatedAt: new Date() }
            : todo
        ),
        editingId: null,
      }));
    },
    [updateState]
  );

  // Filtered todos with useMemo
  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case "active":
        return state.todos.filter((todo) => !todo.completed);
      case "completed":
        return state.todos.filter((todo) => todo.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);

  // Stats with useMemo
  const stats = useMemo(
    () => ({
      total: state.todos.length,
      active: state.todos.filter((todo) => !todo.completed).length,
      completed: state.todos.filter((todo) => todo.completed).length,
    }),
    [state.todos]
  );

  return (
    <div className="todo-app">
      <TodoInput onAdd={addTodo} />
      <TodoFilters
        currentFilter={state.filter}
        onFilterChange={(filter) => updateState({ filter })}
        stats={stats}
      />
      <TodoList
        todos={filteredTodos}
        editingId={state.editingId}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onStartEditing={(id) => updateState({ editingId: id })}
        onCancelEditing={() => updateState({ editingId: null })}
      />
    </div>
  );
};

// Custom hook with TypeScript
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiActions {
  refetch: () => Promise<void>;
  reset: () => void;
}

function useApi<T>(url: string): UseApiState<T> & UseApiActions {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: T = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }, [url]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
    reset,
  };
}

// Generic hook for form handling
interface UseFormConfig<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void> | void;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  handleChange: (field: keyof T) => (value: T[keyof T]) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFieldValue: (field: keyof T, value: T[keyof T]) => void;
  setFieldError: (field: keyof T, error: string) => void;
  resetForm: () => void;
}

function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormConfig<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (field: keyof T) => (value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (field: keyof T) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      // Validate field on blur
      if (validate) {
        const fieldErrors = validate(values);
        if (fieldErrors[field]) {
          setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
        }
      }
    },
    [values, validate]
  );

  const setFieldValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate all fields
      if (validate) {
        const allErrors = validate(values);
        setErrors(allErrors);

        if (Object.keys(allErrors).length > 0) {
          return;
        }
      }

      try {
        setIsSubmitting(true);
        await onSubmit(values);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
  };
}

// Usage of custom form hook
interface UserFormData {
  name: string;
  email: string;
  age: number;
  bio: string;
}

const UserForm: React.FC<{
  onSubmit: (data: UserFormData) => Promise<void>;
}> = ({ onSubmit }) => {
  const form = useForm<UserFormData>({
    initialValues: {
      name: "",
      email: "",
      age: 0,
      bio: "",
    },
    validate: (values) => {
      const errors: Partial<Record<keyof UserFormData, string>> = {};

      if (!values.name.trim()) {
        errors.name = "Name is required";
      }

      if (!values.email.includes("@")) {
        errors.email = "Invalid email address";
      }

      if (values.age < 0 || values.age > 120) {
        errors.age = "Age must be between 0 and 120";
      }

      return errors;
    },
    onSubmit,
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={form.values.name}
          onChange={(e) => form.handleChange("name")(e.target.value)}
          onBlur={form.handleBlur("name")}
        />
        {form.touched.name && form.errors.name && (
          <span className="error">{form.errors.name}</span>
        )}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={form.values.email}
          onChange={(e) => form.handleChange("email")(e.target.value)}
          onBlur={form.handleBlur("email")}
        />
        {form.touched.email && form.errors.email && (
          <span className="error">{form.errors.email}</span>
        )}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          value={form.values.age}
          onChange={(e) =>
            form.handleChange("age")(parseInt(e.target.value, 10))
          }
          onBlur={form.handleBlur("age")}
        />
        {form.touched.age && form.errors.age && (
          <span className="error">{form.errors.age}</span>
        )}
      </div>

      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          value={form.values.bio}
          onChange={(e) => form.handleChange("bio")(e.target.value)}
          onBlur={form.handleBlur("bio")}
        />
      </div>

      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
```

## 3. useReducer and Context with TypeScript

### Advanced useReducer Patterns:

```typescript
// Complex state management with useReducer
interface AppState {
  user: User | null;
  theme: "light" | "dark";
  notifications: Notification[];
  modals: {
    [key: string]: boolean;
  };
  loading: {
    [key: string]: boolean;
  };
}

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  actions?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

// Action types with discriminated union
type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "OPEN_MODAL"; payload: string }
  | { type: "CLOSE_MODAL"; payload: string }
  | { type: "SET_LOADING"; payload: { key: string; loading: boolean } }
  | { type: "RESET_STATE" };

// Reducer with type safety
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        ),
      };

    case "OPEN_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload]: true,
        },
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload]: false,
        },
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.loading,
        },
      };

    case "RESET_STATE":
      return initialAppState;

    default:
      // Exhaustiveness check
      const _exhaustiveCheck: never = action;
      return state;
  }
}

const initialAppState: AppState = {
  user: null,
  theme: "light",
  notifications: [],
  modals: {},
  loading: {},
};

// Context with TypeScript
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    login: (user: User) => void;
    logout: () => void;
    toggleTheme: () => void;
    showNotification: (notification: Omit<Notification, "id">) => void;
    hideNotification: (id: string) => void;
    openModal: (modalId: string) => void;
    closeModal: (modalId: string) => void;
    setLoading: (key: string, loading: boolean) => void;
  };
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

// Custom hook for using context
function useAppContext(): AppContextType {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

// Provider component
interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(appReducer, initialAppState);

  // Action creators
  const actions = React.useMemo(
    () => ({
      login: (user: User) => {
        dispatch({ type: "SET_USER", payload: user });
      },

      logout: () => {
        dispatch({ type: "SET_USER", payload: null });
        localStorage.removeItem("authToken");
      },

      toggleTheme: () => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        dispatch({ type: "SET_THEME", payload: newTheme });
        localStorage.setItem("theme", newTheme);
      },

      showNotification: (notification: Omit<Notification, "id">) => {
        const id = `notification-${Date.now()}`;
        const fullNotification: Notification = {
          ...notification,
          id,
        };

        dispatch({ type: "ADD_NOTIFICATION", payload: fullNotification });

        // Auto-remove notification after duration
        if (notification.duration !== undefined && notification.duration > 0) {
          setTimeout(() => {
            dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
          }, notification.duration);
        }
      },

      hideNotification: (id: string) => {
        dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
      },

      openModal: (modalId: string) => {
        dispatch({ type: "OPEN_MODAL", payload: modalId });
      },

      closeModal: (modalId: string) => {
        dispatch({ type: "CLOSE_MODAL", payload: modalId });
      },

      setLoading: (key: string, loading: boolean) => {
        dispatch({ type: "SET_LOADING", payload: { key, loading } });
      },
    }),
    [state.theme]
  );

  const contextValue = React.useMemo(
    () => ({
      state,
      dispatch,
      actions,
    }),
    [state, actions]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Usage in components
const Dashboard: React.FC = () => {
  const { state, actions } = useAppContext();

  React.useEffect(() => {
    actions.showNotification({
      type: "info",
      title: "Welcome!",
      message: "Welcome to your dashboard",
      duration: 5000,
    });
  }, [actions]);

  const handleLogout = () => {
    actions.showNotification({
      type: "success",
      title: "Logged out",
      message: "You have been successfully logged out",
      duration: 3000,
    });
    actions.logout();
  };

  return (
    <div className={`dashboard theme-${state.theme}`}>
      <header>
        <h1>Dashboard</h1>
        <div className="actions">
          <button onClick={actions.toggleTheme}>
            Switch to {state.theme === "light" ? "dark" : "light"} mode
          </button>
          {state.user && <button onClick={handleLogout}>Logout</button>}
        </div>
      </header>

      <main>
        {state.user ? (
          <div>
            <h2>Welcome, {state.user.name}!</h2>
            <UserProfile user={state.user} />
          </div>
        ) : (
          <div>Please log in to access your dashboard</div>
        )}
      </main>

      {/* Render notifications */}
      <div className="notifications">
        {state.notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onClose={() => actions.hideNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Typed event handlers
interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
  initialQuery?: string;
}

interface SearchFilters {
  category?: string;
  sortBy?: "name" | "date" | "price";
  sortOrder?: "asc" | "desc";
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
  initialQuery = "",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFilterChange =
    (key: keyof SearchFilters) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilters((prev) => ({
        ...prev,
        [key]: e.target.value || undefined,
      }));
    };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
      />

      <select
        value={filters.category || ""}
        onChange={handleFilterChange("category")}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>

      <select
        value={filters.sortBy || ""}
        onChange={handleFilterChange("sortBy")}
      >
        <option value="">Default Sort</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="price">Price</option>
      </select>

      <select
        value={filters.sortOrder || ""}
        onChange={handleFilterChange("sortOrder")}
      >
        <option value="">Sort Order</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button type="submit">Search</button>
    </form>
  );
};
```

---

# Part 5: Utility Types & Type Guards - Comprehensive Guide

## 1. Built-in Utility Types - Deep Dive

### Core Utility Types:

```typescript
// Base interface for examples
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  avatar?: string;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
    language: string;
  };
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Partial<T> - Makes all properties optional
type PartialUser = Partial<User>;
// Equivalent to:
type PartialUserManual = {
  id?: string;
  name?: string;
  email?: string;
  age?: number;
  avatar?: string;
  preferences?: {
    theme: "light" | "dark";
    notifications: boolean;
    language: string;
  };
  roles?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

// Usage example
function updateUser(id: string, updates: PartialUser): User {
  const currentUser = getUserById(id);
  return {
    ...currentUser,
    ...updates,
    updatedAt: new Date(),
  };
}

// Required<T> - Makes all properties required
interface OptionalUser {
  id?: string;
  name?: string;
  email?: string;
}

type RequiredUser = Required<OptionalUser>;
// Equivalent to:
type RequiredUserManual = {
  id: string;
  name: string;
  email: string;
};

// Readonly<T> - Makes all properties readonly
type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = createUser();
// user.name = "New Name"; // Error: Cannot assign to 'name' because it is a read-only property

// Pick<T, K> - Creates type by picking specific properties
type UserSummary = Pick<User, "id" | "name" | "email">;
// Equivalent to:
type UserSummaryManual = {
  id: string;
  name: string;
  email: string;
};

// Usage example
function getUserSummary(user: User): UserSummary {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

// Omit<T, K> - Creates type by omitting specific properties
type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
// Equivalent to:
type CreateUserInputManual = {
  name: string;
  email: string;
  age: number;
  avatar?: string;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
    language: string;
  };
  roles: string[];
};

// Usage example
function createUser(input: CreateUserInput): User {
  return {
    ...input,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// Record<K, T> - Creates type with specific keys and value type
type UserRoles = Record<string, string[]>;
// Equivalent to:
type UserRolesManual = {
  [key: string]: string[];
};

const userRolesByDepartment: UserRoles = {
  engineering: ["developer", "senior-developer", "tech-lead"],
  design: ["designer", "senior-designer", "design-lead"],
  product: ["product-manager", "senior-pm"],
};

// More specific Record usage
type HttpStatusCode = 200 | 404 | 500;
type StatusMessage = Record<HttpStatusCode, string>;

const statusMessages: StatusMessage = {
  200: "OK",
  404: "Not Found",
  500: "Internal Server Error",
};

// Exclude<T, U> - Excludes types from union
type Theme = "light" | "dark" | "auto" | "high-contrast";
type BasicTheme = Exclude<Theme, "auto" | "high-contrast">;
// Result: 'light' | 'dark'

// Extract<T, U> - Extracts types from union
type StringProperties = Extract<keyof User, string>;
// All keys are strings, so this returns all keys

// NonNullable<T> - Excludes null and undefined
type NonNullableString = NonNullable<string | null | undefined>;
// Result: string

// Usage example
function processValue<T>(value: T): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error("Value cannot be null or undefined");
  }
  return value as NonNullable<T>;
}

// ReturnType<T> - Gets return type of function
function getUser(): User {
  return {} as User;
}

type GetUserReturn = ReturnType<typeof getUser>; // User

// Parameters<T> - Gets parameter types as tuple
function updateUserProfile(id: string, name: string, age: number): void {}

type UpdateUserParams = Parameters<typeof updateUserProfile>;
// Result: [string, string, number]

// ConstructorParameters<T> - Gets constructor parameter types
class DatabaseConnection {
  constructor(host: string, port: number, database: string) {}
}

type DbConnectionParams = ConstructorParameters<typeof DatabaseConnection>;
// Result: [string, number, string]

// InstanceType<T> - Gets instance type of constructor
type DbInstance = InstanceType<typeof DatabaseConnection>;
// Result: DatabaseConnection
```

### Advanced Utility Type Patterns:

```typescript
// Custom utility types
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends any[]
      ? T[P]
      : DeepPartial<T[P]>
    : T[P];
};

type DeepPartialUser = DeepPartial<User>;
// All nested properties are also optional

// DeepReadonly utility
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends any[]
      ? ReadonlyArray<DeepReadonly<T[P][0]>>
      : DeepReadonly<T[P]>
    : T[P];
};

type DeepReadonlyUser = DeepReadonly<User>;

// Mutable utility (opposite of Readonly)
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type MutableUser = Mutable<ReadonlyUser>;

// Optional utility for specific keys
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type UserWithOptionalAvatar = PartialBy<User, "avatar">;

// Required utility for specific keys
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type UserWithRequiredAvatar = RequiredBy<User, "avatar">;

// Nullable utility
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;

// Optional fields utility
type OptionalFields<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type UserOptionalFields = OptionalFields<User>; // 'avatar'

// Required fields utility
type RequiredFields<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type UserRequiredFields = RequiredFields<User>;

// Function property names
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

class UserService {
  private users: User[] = [];

  addUser(user: User): void {}
  removeUser(id: string): void {}
  getUser(id: string): User | null {
    return null;
  }

  userName: string = "";
  userCount: number = 0;
}

type UserServiceMethods = FunctionPropertyNames<UserService>;
// 'addUser' | 'removeUser' | 'getUser'

type UserServiceProperties = NonFunctionPropertyNames<UserService>;
// 'userName' | 'userCount'

// Promise unwrapping utility
type Awaited<T> = T extends Promise<infer U> ? U : T;

type UserPromise = Promise<User>;
type UnwrappedUser = Awaited<UserPromise>; // User

// Array element type extraction
type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

type StringArray = string[];
type StringElement = ArrayElement<StringArray>; // string

// Object values type
type ValueOf<T> = T[keyof T];

interface Colors {
  red: "#FF0000";
  green: "#00FF00";
  blue: "#0000FF";
}

type ColorValue = ValueOf<Colors>; // '#FF0000' | '#00FF00' | '#0000FF'

// Conditional type for filtering
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
}[keyof Base];

type StringKeys = FilterFlags<User, string>; // 'id' | 'name' | 'email'
type NumberKeys = FilterFlags<User, number>; // 'age'
type DateKeys = FilterFlags<User, Date>; // 'createdAt' | 'updatedAt'

// Merge utility types
type Merge<T, U> = Omit<T, keyof U> & U;

interface BaseUser {
  id: string;
  name: string;
  email: string;
}

interface AdminExtension {
  isAdmin: boolean;
  permissions: string[];
  email: string; // Override email type if needed
}

type AdminUser = Merge<BaseUser, AdminExtension>;

// Brand types for nominal typing
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;
type Email = Brand<string, "Email">;

function createUserId(id: string): UserId {
  return id as UserId;
}

function getUserById(id: UserId): User | null {
  // Implementation
  return null;
}

// This prevents mixing up different string types
const userId = createUserId("user-123");
const productId = "product-456" as ProductId;

// getUserById(productId); // Error: ProductId is not assignable to UserId

// Path utility for nested object access
type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

type UserPaths = Path<User>;
// 'id' | 'name' | 'email' | 'age' | 'avatar' | 'preferences' | 'preferences.theme' | 'preferences.notifications' | 'preferences.language' | 'roles' | 'createdAt' | 'updatedAt'

// PathValue utility to get type at path
type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

type UserNameType = PathValue<User, "name">; // string
type UserThemeType = PathValue<User, "preferences.theme">; // 'light' | 'dark'

// Get and set utility functions using paths
function get<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P> {
  const keys = path.split(".");
  let result: any = obj;

  for (const key of keys) {
    result = result[key];
    if (result === undefined) break;
  }

  return result;
}

function set<T, P extends Path<T>>(obj: T, path: P, value: PathValue<T, P>): T {
  const keys = path.split(".");
  const result = { ...obj };
  let current: any = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = { ...current[key] };
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

// Usage
const user: User = createUser({} as CreateUserInput);
const userName = get(user, "name"); // string
const userTheme = get(user, "preferences.theme"); // 'light' | 'dark'

const updatedUser = set(user, "preferences.theme", "dark");
```

## 2. Type Guards - Advanced Patterns

### Built-in Type Guards:

```typescript
// typeof type guards
function processValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else if (typeof value === "number") {
    // TypeScript knows value is number here
    return value.toString();
  } else {
    // TypeScript knows value is boolean here
    return value ? "true" : "false";
  }
}

// instanceof type guards
class Dog {
  bark() {
    return "Woof!";
  }
}

class Cat {
  meow() {
    return "Meow!";
  }
}

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return animal.bark(); // TypeScript knows animal is Dog
  } else {
    return animal.meow(); // TypeScript knows animal is Cat
  }
}

// in operator type guards
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function move(animal: Bird | Fish): void {
  if ("fly" in animal) {
    animal.fly(); // TypeScript knows animal is Bird
  } else {
    animal.swim(); // TypeScript knows animal is Fish
  }
}

// Array.isArray type guard
function processStringOrArray(value: string | string[]): string[] {
  if (Array.isArray(value)) {
    return value; // TypeScript knows value is string[]
  } else {
    return [value]; // TypeScript knows value is string
  }
}
```

### Custom Type Guards:

```typescript
// Basic custom type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

// Object type guards
interface User {
  id: string;
  name: string;
  email: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as User).id === "string" &&
    typeof (value as User).name === "string" &&
    typeof (value as User).email === "string"
  );
}

// Enhanced object validation
function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}

function isValidUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    hasProperty(obj, "id") &&
    isString(obj.id) &&
    hasProperty(obj, "name") &&
    isString(obj.name) &&
    hasProperty(obj, "email") &&
    isString(obj.email) &&
    obj.email.includes("@")
  );
}

// Discriminated union type guards
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: any;
}

interface ErrorState {
  status: "error";
  error: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

function isLoadingState(state: AsyncState): state is LoadingState {
  return state.status === "loading";
}

function isSuccessState(state: AsyncState): state is SuccessState {
  return state.status === "success";
}

function isErrorState(state: AsyncState): state is ErrorState {
  return state.status === "error";
}

// Usage
function handleAsyncState(state: AsyncState) {
  if (isLoadingState(state)) {
    console.log("Loading...");
  } else if (isSuccessState(state)) {
    console.log("Data:", state.data); // TypeScript knows data exists
  } else if (isErrorState(state)) {
    console.log("Error:", state.error); // TypeScript knows error exists
  }
}

// Generic type guards
function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

function isObjectWith<T extends Record<string, unknown>>(
  value: unknown,
  shape: { [K in keyof T]: (value: unknown) => value is T[K] }
): value is T {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  for (const [key, guard] of Object.entries(shape)) {
    if (!(key in obj) || !guard(obj[key])) {
      return false;
    }
  }

  return true;
}

// Usage
const userArray = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

if (isArrayOf(userArray, isUser)) {
  // TypeScript knows userArray is User[]
  userArray.forEach((user) => {
    console.log(user.name); // No type errors
  });
}

// Complex validation with detailed error reporting
interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

function validateUser(value: unknown): ValidationResult<User> {
  const errors: string[] = [];

  if (typeof value !== "object" || value === null) {
    return { success: false, errors: ["Value must be an object"] };
  }

  const obj = value as Record<string, unknown>;

  if (!("id" in obj)) {
    errors.push("Missing required field: id");
  } else if (!isString(obj.id)) {
    errors.push("Field id must be a string");
  } else if (obj.id.length === 0) {
    errors.push("Field id cannot be empty");
  }

  if (!("name" in obj)) {
    errors.push("Missing required field: name");
  } else if (!isString(obj.name)) {
    errors.push("Field name must be a string");
  } else if (obj.name.length === 0) {
    errors.push("Field name cannot be empty");
  }

  if (!("email" in obj)) {
    errors.push("Missing required field: email");
  } else if (!isString(obj.email)) {
    errors.push("Field email must be a string");
  } else if (!obj.email.includes("@")) {
    errors.push("Field email must be a valid email address");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: obj as User,
  };
}

// Runtime type validation utility
class TypeValidator {
  static string(value: unknown, fieldName?: string): string {
    if (!isString(value)) {
      throw new Error(`${fieldName || "Value"} must be a string`);
    }
    return value;
  }

  static number(value: unknown, fieldName?: string): number {
    if (!isNumber(value)) {
      throw new Error(`${fieldName || "Value"} must be a number`);
    }
    return value;
  }

  static boolean(value: unknown, fieldName?: string): boolean {
    if (!isBoolean(value)) {
      throw new Error(`${fieldName || "Value"} must be a boolean`);
    }
    return value;
  }

  static array<T>(
    value: unknown,
    itemValidator: (item: unknown) => T,
    fieldName?: string
  ): T[] {
    if (!Array.isArray(value)) {
      throw new Error(`${fieldName || "Value"} must be an array`);
    }
    return value.map((item, index) => {
      try {
        return itemValidator(item);
      } catch (error) {
        throw new Error(`${fieldName || "Array"}[${index}]: ${error.message}`);
      }
    });
  }

  static object<T>(
    value: unknown,
    validator: (obj: Record<string, unknown>) => T,
    fieldName?: string
  ): T {
    if (typeof value !== "object" || value === null) {
      throw new Error(`${fieldName || "Value"} must be an object`);
    }
    return validator(value as Record<string, unknown>);
  }

  static optional<T>(
    value: unknown,
    validator: (value: unknown) => T
  ): T | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }
    return validator(value);
  }
}

// Usage of TypeValidator
function parseUserFromApi(data: unknown): User {
  return TypeValidator.object(
    data,
    (obj) => ({
      id: TypeValidator.string(obj.id, "id"),
      name: TypeValidator.string(obj.name, "name"),
      email: TypeValidator.string(obj.email, "email"),
    }),
    "user"
  );
}

// Type narrowing with assertion functions
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Expected string");
  }
}

function assertIsUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error("Expected valid user object");
  }
}

// Usage
function processApiResponse(response: unknown) {
  assertIsUser(response);
  // TypeScript now knows response is User
  console.log(response.name); // No type error
}

// Conditional type guards
function isTruthy<T>(value: T): value is NonNullable<T> {
  return Boolean(value);
}

function isNonEmptyArray<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0;
}

// Usage
const maybeUsers: (User | null)[] = [user1, null, user2];
const validUsers = maybeUsers.filter(isTruthy); // User[]

const userList: User[] = [];
if (isNonEmptyArray(userList)) {
  // TypeScript knows userList has at least one element
  const firstUser = userList[0]; // No undefined possibility
}

// Advanced type guard factories
function createEnumGuard<T extends Record<string, string | number>>(
  enumObject: T
) {
  const enumValues = Object.values(enumObject);
  return function (value: unknown): value is T[keyof T] {
    return enumValues.includes(value as any);
  };
}

enum UserRole {
  Admin = "admin",
  User = "user",
  Moderator = "moderator",
}

const isUserRole = createEnumGuard(UserRole);

// Usage
function assignRole(role: unknown) {
  if (isUserRole(role)) {
    // TypeScript knows role is UserRole
    console.log(`Assigning role: ${role}`);
  } else {
    throw new Error("Invalid role");
  }
}
```

---

# Part 6: 30+ MCQs

1. Which type is used for values that never occur?

   - (A) any
   - (B) unknown
   - (C) void
   - (D) never
   - **Answer:** D

2. How do you make all properties of an interface optional?

   - (A) by using Partial<T>
   - (B) by using Pick<T, K>
   - (C) by using Omit<T, K>
   - (D) by using Readonly<T>
   - **Answer:** A

3. What does the following type mean?

```typescript
type A = string | number;
```

- (A) A can be a string or number
- (B) A must be both string and number
- (C) A can only be a string
- (D) A can only be a number
- **Answer:** A

4. Which keyword is used to define a type alias?

   - (A) interface
   - (B) class
   - (C) type
   - (D) enum
   - **Answer:** C

5. How do you extend an interface?

   - (A) interface B extends A {}
   - (B) type B = A & {}
   - (C) class B implements A {}
   - (D) All of the above
   - **Answer:** A

6. What is the output type of the following function?

```typescript
function foo(): void {}
```

- (A) undefined
- (B) null
- (C) void
- (D) never
- **Answer:** C

7. What is the result of using the 'readonly' modifier on an array?

   - (A) Its values cannot be changed
   - (B) Its length cannot be changed
   - (C) The array cannot be reassigned
   - (D) All of the above
   - **Answer:** A

8. Which utility type makes all properties of a type read-only?

   - (A) Partial<T>
   - (B) Readonly<T>
   - (C) Pick<T, K>
   - (D) Record<K, T>
   - **Answer:** B

9. What is declaration merging?

   - (A) Combining multiple interface declarations
   - (B) Combining type aliases
   - (C) Combining modules
   - (D) None of the above
   - **Answer:** A

10. Can interfaces extend types?

- (A) Yes
- (B) No
- **Answer:** B

11. Which type is safest for accepting any value but requiring type checking before use?

- (A) any
- (B) unknown
- (C) never
- (D) object
- **Answer:** B

12. What is a discriminated union?

- (A) A union of types with a common property to distinguish them
- (B) An intersection type
- (C) A mapped type
- (D) A utility type
- **Answer:** A

13. How do you type an array of strings?

- (A) string[]
- (B) Array<string>
- (C) Both A and B
- (D) object[]
- **Answer:** C

14. What does the "?" mean in an interface property?

- (A) Required property
- (B) Optional property
- (C) Readonly property
- (D) Deprecated property
- **Answer:** B

15. Which type would you use to represent a function that never returns?

- (A) any
- (B) void
- (C) never
- (D) unknown
- **Answer:** C

16. How do you specify a default value for a function parameter?

- (A) param: type = value
- (B) param = value: type
- (C) param: value = type
- (D) value: type = param
- **Answer:** A

17. What is the difference between interface and type alias regarding merging?

- (A) Both can merge
- (B) Only interface can merge
- (C) Only type can merge
- (D) Neither can merge
- **Answer:** B

18. What is the output of typeof null in TypeScript?

- (A) "object"
- (B) "null"
- (C) "undefined"
- (D) "number"
- **Answer:** A

19. What does keyof do?

- (A) Returns the keys of a type as a union
- (B) Returns the values of a type
- (C) Returns an array of keys
- (D) Returns an object
- **Answer:** A

20. What does the "as const" assertion do?

- (A) Makes all properties mutable
- (B) Makes the value deeply readonly
- (C) Makes the value a string
- (D) None of the above
- **Answer:** B

21. Which of the following is not a valid enum in TypeScript?

- (A) Numeric
- (B) String
- (C) Boolean
- (D) Heterogeneous
- **Answer:** C

22. How do you import only type information from a module?

- (A) import type { Foo } from './foo'
- (B) import Foo from './foo'
- (C) import { Foo } from './foo'
- (D) import \* as Foo from './foo'
- **Answer:** A

23. What is the main benefit of using generics?

- (A) Reduce code size
- (B) Reuse code for multiple types
- (C) Prevent runtime errors
- (D) Make code asynchronous
- **Answer:** B

24. What does "extends" mean in a generic constraint?

- (A) The type must inherit from another type
- (B) The type must match or be assignable to the constraint
- (C) The type must be a class
- (D) None of the above
- **Answer:** B

25. How do you define a tuple of [number, string]?

- (A) [number, string]
- (B) Array<number | string>
- (C) (number, string)
- (D) Tuple<number, string>
- **Answer:** A

26. What does Omit<T, K> do?

- (A) Exclude keys K from type T
- (B) Make all properties optional
- (C) Pick only keys K from T
- (D) None of the above
- **Answer:** A

27. Which type is used to represent an object with any number of properties?

- (A) Record<string, any>
- (B) object
- (C) any[]
- (D) unknown
- **Answer:** A

28. What is a mapped type?

- (A) Type based on existing type's keys
- (B) Type for mapping arrays
- (C) Type for mapping functions
- (D) Type for mapping enums
- **Answer:** A

29. What is the difference between "=="" and "===" in TypeScript?

- (A) No difference
- (B) "===" checks type and value, "==" checks value only
- (C) "===" checks value only, "==" checks type and value
- (D) Both are not used in TypeScript
- **Answer:** B

30. What does "infer" do in conditional types?

- (A) Infers a type within a conditional type
- (B) Infers a value
- (C) Infers a function
- (D) None of the above
- **Answer:** A

---

# Part 7: 10+ Subjective Q&A

1. Explain the difference between type aliases and interfaces in TypeScript.

2. How does TypeScript improve code maintainability in large projects?

3. Describe generics in TypeScript and provide an example use-case.

4. What are utility types? List and explain two.

5. How do you use TypeScript with React components?

6. What is a type guard? Give an example.

7. Explain the concept of intersection types and provide a code example.

8. How can you handle third-party JavaScript libraries in TypeScript?

9. What is declaration merging and when is it useful?

10. Describe how to use enums and their benefits.

11. Explain the role and use of "never" in function return types.

12. How do you handle null/undefined values safely in TypeScript?

13. What are discriminated unions and why are they useful?

14. Explain type inference and when you need explicit annotations.

15. Describe how to write and use custom type guards.

---

# TLDR Summary

## Core Type System

- **Basic Types**: string, number, boolean, array, tuple, enum, any, unknown, never, void with comprehensive type safety
- **Type Annotations**: Explicit typing for variables, functions, and complex structures with strict null checks
- **Type Inference**: Smart automatic type detection reducing need for explicit annotations
- **Literal Types**: Exact string/number values as types for precise constraints
- **Union Types**: Multiple possible types with discriminated unions for type safety
- **Intersection Types**: Combining multiple types with & operator for complex object shapes

## Advanced Type Features

- **Generics**: Reusable code with type parameters, constraints, and conditional logic
- **Conditional Types**: Dynamic type selection based on type relationships with infer keyword
- **Mapped Types**: Transform existing types systematically with key manipulation
- **Template Literal Types**: String manipulation at type level for dynamic type generation
- **Recursive Types**: Self-referencing types for complex data structures like JSON or trees

## Object-Oriented Programming

- **Interfaces**: Contract definitions with extension, declaration merging, and hybrid types
- **Classes**: Full OOP support with inheritance, access modifiers, abstract classes, static members
- **Abstract Classes**: Base classes with abstract methods requiring implementation in subclasses
- **Decorators**: Metadata and behavior modification for classes, methods, properties, and parameters
- **Mixins**: Multiple inheritance patterns through intersection types and class factories

## Utility Types Mastery

- **Built-in Utilities**: Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, NonNullable
- **Advanced Utilities**: ReturnType, Parameters, ConstructorParameters, InstanceType, Awaited
- **Custom Utilities**: DeepPartial, DeepReadonly, RequiredBy, PartialBy, Brand types for nominal typing
- **Type Manipulation**: PathValue, FilterFlags, Merge for complex type transformations

## Type Guards & Validation

- **Built-in Guards**: typeof, instanceof, in operator for runtime type checking
- **Custom Guards**: User-defined type predicates with comprehensive validation logic
- **Assertion Functions**: Functions that assert types and narrow type space
- **Runtime Validation**: TypeValidator patterns for API data validation and error handling

## React Integration

- **Component Typing**: Comprehensive prop interfaces, generic components, children patterns
- **Hook Typing**: useState, useEffect, useReducer, useContext with proper type safety
- **Event Handling**: Typed event handlers with proper SyntheticEvent types
- **Custom Hooks**: Reusable stateful logic with proper return type definitions
- **Context Patterns**: Typed context providers with action creators and state management

## Error Handling & Debugging

- **Strict Mode**: Comprehensive compiler options for maximum type safety
- **Error Messages**: Understanding TypeScript error messages and resolution strategies
- **Type Assertions**: When and how to use type assertions safely
- **Debugging Types**: Using conditional types and utility types for type debugging

## Best Practices

- **Interface vs Type**: Use interfaces for object shapes that extend, types for unions and complex operations
- **Generic Constraints**: Proper use of extends keyword for type parameter limitations
- **Nominal Typing**: Brand types for preventing primitive type confusion
- **Performance**: Understanding compilation performance and type-checking optimization
- **Code Organization**: Module declarations, namespace usage, and proper file structuring

## Advanced Patterns

- **Builder Pattern**: Type-safe fluent interfaces with method chaining
- **Factory Pattern**: Generic factories with proper type inference
- **Repository Pattern**: Generic CRUD operations with type constraints
- **State Management**: Complex reducer patterns with discriminated unions
- **API Design**: Type-safe API clients with proper error handling

## Development Workflow

- **Configuration**: tsconfig.json optimization for different environments
- **Tooling Integration**: ESLint, Prettier, bundlers with TypeScript
- **Testing**: Type-safe testing patterns with proper mocking
- **Migration**: Gradual migration strategies from JavaScript to TypeScript
- **Performance Monitoring**: Bundle analysis and type-checking performance optimization

---

**📚 This comprehensive TypeScript guide covers fundamental to expert-level concepts with practical examples, advanced patterns, and real-world use cases. Master these concepts to write type-safe, maintainable, and scalable applications!**
