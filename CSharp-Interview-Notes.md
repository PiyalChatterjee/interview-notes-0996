# 🎯 C# Interview Preparation: Azure Cloud FullStack Developer

**Last Updated:** November 19, 2025  
**Target Role:** Azure Cloud FullStack Developer  
**Difficulty Level:** Beginner to Advanced  
**Estimated Prep Time:** 25-35 hours

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Core Concepts](#core-concepts)
3. [Q&A Section](#qa-section)
4. [Code Samples](#code-samples)
5. [TL;DR Summary](#tldr-summary)

---

# Introduction

## Overview of C# in Azure Cloud Context

C# is Microsoft's flagship object-oriented programming language and a cornerstone of modern cloud development on Azure. As an Azure Cloud FullStack Developer, C# proficiency is essential for:

- **Backend Services**: Building RESTful APIs with ASP.NET Core
- **Serverless Computing**: Developing Azure Functions for event-driven architectures
- **Microservices**: Creating scalable, distributed systems
- **Cloud-Native Applications**: Leveraging Azure SDK for .NET
- **Data Processing**: Working with Azure Cosmos DB, SQL Database, and Event Hubs
- **DevOps Integration**: Implementing CI/CD pipelines with Azure DevOps

## Key Areas to Focus for Interviews

### 1. **Language Fundamentals**
- Value vs Reference types
- Memory management and Garbage Collection
- Boxing/Unboxing
- Nullable types and null-coalescing operators

### 2. **Object-Oriented Programming**
- SOLID principles
- Inheritance, Polymorphism, Encapsulation, Abstraction
- Interfaces vs Abstract classes
- Design patterns (Factory, Singleton, Repository, etc.)

### 3. **Modern C# Features (C# 10+, .NET 6+)**
- Records and record structs
- Global using directives
- File-scoped namespaces
- Pattern matching enhancements
- Init-only properties
- Top-level statements
- Minimal APIs

### 4. **Asynchronous Programming**
- async/await pattern
- Task Parallel Library (TPL)
- Async streams
- ConfigureAwait
- Cancellation tokens

### 5. **LINQ & Lambda Expressions**
- Method syntax vs Query syntax
- Deferred execution
- IEnumerable vs IQueryable
- Custom LINQ operators

### 6. **Dependency Injection & IoC**
- Service lifetimes (Transient, Scoped, Singleton)
- Constructor injection
- DI containers in ASP.NET Core
- Service registration patterns

### 7. **Azure-Specific Knowledge**
- Azure SDK for .NET
- Azure Functions development
- Azure App Service deployment
- Azure Storage integration
- Managed Identity and KeyVault
- Application Insights integration

---

# Core Concepts

## 1. Object-Oriented Programming (OOP)

### Four Pillars of OOP

#### **Encapsulation**
Bundling data and methods that operate on that data within a single unit (class), hiding internal details.

```csharp
public class BankAccount
{
    private decimal _balance; // Private field
    
    public decimal Balance => _balance; // Read-only public property
    
    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Deposit amount must be positive");
        _balance += amount;
    }
}
```

#### **Inheritance**
Mechanism for creating new classes based on existing ones, promoting code reuse.

```csharp
public class Animal
{
    public string Name { get; set; }
    public virtual void MakeSound() => Console.WriteLine("Some sound");
}

public class Dog : Animal
{
    public override void MakeSound() => Console.WriteLine("Woof!");
}
```

#### **Polymorphism**
Ability of objects to take multiple forms, achieved through method overriding and interfaces.

```csharp
List<Animal> animals = new() { new Dog(), new Cat(), new Bird() };
foreach (var animal in animals)
{
    animal.MakeSound(); // Different output for each type
}
```

#### **Abstraction**
Hiding complex implementation details and exposing only essential features.

```csharp
public abstract class PaymentProcessor
{
    public abstract Task<bool> ProcessPayment(decimal amount);
    
    public void LogTransaction(decimal amount)
    {
        Console.WriteLine($"Transaction: {amount:C}");
    }
}
```

### SOLID Principles

#### **S - Single Responsibility Principle**
A class should have only one reason to change.

```csharp
// Bad: Multiple responsibilities
public class User
{
    public void SaveToDatabase() { }
    public void SendEmail() { }
    public void GenerateReport() { }
}

// Good: Single responsibility
public class User { }
public class UserRepository { public void Save(User user) { } }
public class EmailService { public void SendEmail(User user) { } }
public class ReportGenerator { public void Generate(User user) { } }
```

#### **O - Open/Closed Principle**
Open for extension, closed for modification.

```csharp
public interface IPaymentMethod
{
    Task<bool> Process(decimal amount);
}

public class CreditCardPayment : IPaymentMethod
{
    public async Task<bool> Process(decimal amount) { /* ... */ }
}

public class PayPalPayment : IPaymentMethod
{
    public async Task<bool> Process(decimal amount) { /* ... */ }
}
```

#### **L - Liskov Substitution Principle**
Derived classes must be substitutable for their base classes.

```csharp
public class Rectangle
{
    public virtual int Width { get; set; }
    public virtual int Height { get; set; }
    public int Area => Width * Height;
}

// Square should not inherit Rectangle as it violates LSP
// Better approach: use interfaces
```

#### **I - Interface Segregation Principle**
Clients should not be forced to depend on interfaces they don't use.

```csharp
// Bad: Fat interface
public interface IWorker
{
    void Work();
    void Eat();
    void Sleep();
}

// Good: Segregated interfaces
public interface IWorkable { void Work(); }
public interface IFeedable { void Eat(); }
public interface ISleepable { void Sleep(); }
```

#### **D - Dependency Inversion Principle**
Depend on abstractions, not concretions.

```csharp
public interface IEmailService
{
    Task SendEmail(string to, string subject, string body);
}

public class UserService
{
    private readonly IEmailService _emailService;
    
    // Depends on abstraction, not concrete implementation
    public UserService(IEmailService emailService)
    {
        _emailService = emailService;
    }
}
```

---

## 2. Value Types vs Reference Types

### Value Types
- Stored on the **stack** (or inline in objects)
- Contains actual data
- Examples: `int`, `double`, `struct`, `enum`, `bool`
- Assignment creates a copy

```csharp
int a = 10;
int b = a;  // Copy of value
b = 20;     // a is still 10
```

### Reference Types
- Stored on the **heap**
- Variable contains reference (pointer) to data
- Examples: `class`, `interface`, `delegate`, `string`, `array`
- Assignment copies the reference

```csharp
var list1 = new List<int> { 1, 2, 3 };
var list2 = list1;  // Both reference same object
list2.Add(4);       // list1 also has 4 now
```

### Boxing and Unboxing

**Boxing**: Converting value type to reference type (object)
**Unboxing**: Converting boxed value back to value type

```csharp
int value = 123;
object boxed = value;        // Boxing (expensive operation)
int unboxed = (int)boxed;    // Unboxing

// Avoid boxing in performance-critical code
// Use generics instead
List<int> numbers = new();   // Good: No boxing
ArrayList list = new();       // Bad: Boxing occurs
```

---

## 3. LINQ (Language Integrated Query)

### Query Syntax vs Method Syntax

```csharp
var numbers = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Query Syntax
var evenQuery = from n in numbers
                where n % 2 == 0
                select n;

// Method Syntax (more common)
var evenMethod = numbers.Where(n => n % 2 == 0);

// Complex query
var result = numbers
    .Where(n => n > 5)
    .OrderByDescending(n => n)
    .Select(n => n * 2)
    .ToList();
```

### Deferred Execution

LINQ queries are not executed until enumerated.

```csharp
var numbers = new List<int> { 1, 2, 3 };
var query = numbers.Where(n => n > 1); // Not executed yet

numbers.Add(4);

foreach (var n in query) // Executed here: 2, 3, 4
    Console.WriteLine(n);
```

### IEnumerable vs IQueryable

```csharp
// IEnumerable<T>: In-memory collections, LINQ to Objects
IEnumerable<Product> products = context.Products.ToList();
var filtered = products.Where(p => p.Price > 100); // Executed in memory

// IQueryable<T>: Database queries, LINQ to SQL/EF
IQueryable<Product> query = context.Products;
var filtered = query.Where(p => p.Price > 100); // Translated to SQL
```

### Common LINQ Operators

```csharp
var numbers = new[] { 1, 2, 3, 4, 5 };

// Filtering
var even = numbers.Where(n => n % 2 == 0);

// Projection
var squared = numbers.Select(n => n * n);

// Aggregation
var sum = numbers.Sum();
var average = numbers.Average();
var max = numbers.Max();
var count = numbers.Count(n => n > 3);

// Partitioning
var first3 = numbers.Take(3);
var skip2 = numbers.Skip(2);

// Joining
var customers = new[] { /* ... */ };
var orders = new[] { /* ... */ };
var result = from c in customers
             join o in orders on c.Id equals o.CustomerId
             select new { c.Name, o.Total };

// Grouping
var grouped = numbers.GroupBy(n => n % 2 == 0 ? "Even" : "Odd");
```

---

## 4. Asynchronous Programming

### async/await Pattern

```csharp
public async Task<string> GetDataAsync(string url)
{
    using var client = new HttpClient();
    
    // Non-blocking call
    var response = await client.GetStringAsync(url);
    
    return response;
}

// Calling async method
var data = await GetDataAsync("https://api.example.com/data");
```

### Task vs Task<T>

```csharp
// Task: async method that returns void (no result)
public async Task SaveDataAsync(Data data)
{
    await _repository.SaveAsync(data);
}

// Task<T>: async method that returns a result
public async Task<Data> GetDataAsync(int id)
{
    return await _repository.GetByIdAsync(id);
}
```

### Parallel Processing with Task.WhenAll

```csharp
public async Task<List<Result>> ProcessMultipleAsync(List<int> ids)
{
    // Execute all tasks in parallel
    var tasks = ids.Select(id => ProcessSingleAsync(id));
    var results = await Task.WhenAll(tasks);
    
    return results.ToList();
}
```

### ConfigureAwait

```csharp
// Library code: Use ConfigureAwait(false) to avoid capturing context
public async Task<string> LibraryMethodAsync()
{
    await Task.Delay(1000).ConfigureAwait(false);
    return "Done";
}

// UI code: Don't use ConfigureAwait(false) - need UI context
public async Task ButtonClickAsync()
{
    var result = await LibraryMethodAsync();
    TextBox.Text = result; // Need to be on UI thread
}
```

### Cancellation Tokens

```csharp
public async Task<string> LongRunningOperationAsync(CancellationToken cancellationToken)
{
    for (int i = 0; i < 100; i++)
    {
        cancellationToken.ThrowIfCancellationRequested();
        
        await Task.Delay(100, cancellationToken);
        // Do work...
    }
    
    return "Completed";
}

// Usage
var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
try
{
    var result = await LongRunningOperationAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Operation was cancelled");
}
```

### Async Streams (IAsyncEnumerable)

```csharp
public async IAsyncEnumerable<int> GenerateNumbersAsync()
{
    for (int i = 0; i < 10; i++)
    {
        await Task.Delay(100);
        yield return i;
    }
}

// Usage
await foreach (var number in GenerateNumbersAsync())
{
    Console.WriteLine(number);
}
```

---

## 5. Collections and Generics

### Generic Collections

```csharp
// List<T>: Dynamic array
List<string> names = new() { "Alice", "Bob", "Charlie" };
names.Add("David");

// Dictionary<TKey, TValue>: Key-value pairs
Dictionary<int, string> users = new()
{
    { 1, "Alice" },
    { 2, "Bob" }
};

// HashSet<T>: Unique elements, fast lookup
HashSet<int> uniqueNumbers = new() { 1, 2, 3, 2, 1 }; // Contains: 1, 2, 3

// Queue<T>: FIFO
Queue<string> queue = new();
queue.Enqueue("First");
var first = queue.Dequeue();

// Stack<T>: LIFO
Stack<int> stack = new();
stack.Push(1);
var top = stack.Pop();

// LinkedList<T>: Doubly-linked list
LinkedList<string> linkedList = new();
linkedList.AddFirst("First");
linkedList.AddLast("Last");
```

### Concurrent Collections

```csharp
using System.Collections.Concurrent;

// Thread-safe collections
ConcurrentDictionary<int, string> concurrentDict = new();
ConcurrentBag<int> concurrentBag = new();
ConcurrentQueue<string> concurrentQueue = new();

// Example usage
Parallel.For(0, 1000, i =>
{
    concurrentDict.TryAdd(i, $"Value{i}");
});
```

### Generic Constraints

```csharp
// where T : class - must be reference type
public class Repository<T> where T : class
{
    public void Add(T item) { }
}

// where T : struct - must be value type
public class ValueProcessor<T> where T : struct
{
    public T Process(T value) => value;
}

// where T : new() - must have parameterless constructor
public class Factory<T> where T : new()
{
    public T Create() => new T();
}

// where T : BaseClass - must inherit from BaseClass
public class Manager<T> where T : Entity
{
    public void Save(T entity) { }
}

// where T : IInterface - must implement interface
public class Processor<T> where T : IProcessable
{
    public void Process(T item) => item.Process();
}

// Multiple constraints
public class Service<T> where T : class, IEntity, new()
{
    // T must be a class, implement IEntity, and have a parameterless constructor
}
```

---

## 6. Delegates and Events

### Delegates

Delegates are type-safe function pointers.

```csharp
// Delegate declaration
public delegate void NotifyDelegate(string message);

public class EventPublisher
{
    // Using delegate
    public NotifyDelegate OnNotify;
    
    public void Trigger(string message)
    {
        OnNotify?.Invoke(message);
    }
}

// Usage
var publisher = new EventPublisher();
publisher.OnNotify += (msg) => Console.WriteLine($"Received: {msg}");
publisher.Trigger("Hello");
```

### Func, Action, and Predicate

```csharp
// Action: delegate with no return value
Action<string> print = (message) => Console.WriteLine(message);
print("Hello");

// Func: delegate with return value
Func<int, int, int> add = (a, b) => a + b;
int result = add(5, 3);

// Predicate: delegate that returns bool
Predicate<int> isEven = (n) => n % 2 == 0;
bool check = isEven(4);
```

### Events

Events provide encapsulation over delegates.

```csharp
public class Button
{
    // Event declaration
    public event EventHandler Clicked;
    
    public void Click()
    {
        OnClicked(EventArgs.Empty);
    }
    
    protected virtual void OnClicked(EventArgs e)
    {
        Clicked?.Invoke(this, e);
    }
}

// Usage
var button = new Button();
button.Clicked += (sender, e) => Console.WriteLine("Button clicked!");
button.Click();
```

### Custom Event Arguments

```csharp
public class OrderEventArgs : EventArgs
{
    public int OrderId { get; set; }
    public decimal Total { get; set; }
}

public class OrderService
{
    public event EventHandler<OrderEventArgs> OrderPlaced;
    
    public void PlaceOrder(int orderId, decimal total)
    {
        // Process order...
        
        OnOrderPlaced(new OrderEventArgs 
        { 
            OrderId = orderId, 
            Total = total 
        });
    }
    
    protected virtual void OnOrderPlaced(OrderEventArgs e)
    {
        OrderPlaced?.Invoke(this, e);
    }
}
```

---

## 7. Dependency Injection (DI)

### Service Lifetimes

```csharp
// Startup.cs or Program.cs
public void ConfigureServices(IServiceCollection services)
{
    // Transient: Created each time they're requested
    services.AddTransient<IEmailService, EmailService>();
    
    // Scoped: Created once per request/scope
    services.AddScoped<IUserRepository, UserRepository>();
    
    // Singleton: Created once for the application lifetime
    services.AddSingleton<IConfiguration>(Configuration);
}
```

### Constructor Injection

```csharp
public class UserService
{
    private readonly IUserRepository _repository;
    private readonly ILogger<UserService> _logger;
    private readonly IEmailService _emailService;
    
    // Dependencies injected via constructor
    public UserService(
        IUserRepository repository,
        ILogger<UserService> logger,
        IEmailService emailService)
    {
        _repository = repository;
        _logger = logger;
        _emailService = emailService;
    }
    
    public async Task<User> CreateUserAsync(User user)
    {
        _logger.LogInformation("Creating user: {Email}", user.Email);
        
        var created = await _repository.AddAsync(user);
        await _emailService.SendWelcomeEmailAsync(user.Email);
        
        return created;
    }
}
```

### Service Registration Patterns

```csharp
// Simple registration
services.AddScoped<IService, Service>();

// Factory pattern
services.AddScoped<IService>(provider => 
{
    var config = provider.GetRequiredService<IConfiguration>();
    return new Service(config["ServiceUrl"]);
});

// Multiple implementations
services.AddScoped<INotificationService, EmailNotificationService>();
services.AddScoped<INotificationService, SmsNotificationService>();

// Named services using Keyed Services (.NET 8+)
services.AddKeyedScoped<INotificationService, EmailNotificationService>("email");
services.AddKeyedScoped<INotificationService, SmsNotificationService>("sms");
```

---

## 8. Exception Handling

### Try-Catch-Finally

```csharp
public async Task<Result> ProcessDataAsync(string data)
{
    try
    {
        var processed = await ValidateAndProcessAsync(data);
        return Result.Success(processed);
    }
    catch (ValidationException ex)
    {
        _logger.LogWarning(ex, "Validation failed for data: {Data}", data);
        return Result.Failure(ex.Message);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Unexpected error processing data");
        return Result.Failure("An unexpected error occurred");
    }
    finally
    {
        // Cleanup code
        await CleanupAsync();
    }
}
```

### Custom Exceptions

```csharp
public class UserNotFoundException : Exception
{
    public int UserId { get; }
    
    public UserNotFoundException(int userId)
        : base($"User with ID {userId} was not found")
    {
        UserId = userId;
    }
    
    public UserNotFoundException(int userId, Exception innerException)
        : base($"User with ID {userId} was not found", innerException)
    {
        UserId = userId;
    }
}

// Usage
public async Task<User> GetUserAsync(int userId)
{
    var user = await _repository.FindAsync(userId);
    
    if (user == null)
        throw new UserNotFoundException(userId);
    
    return user;
}
```

### Global Exception Handling in ASP.NET Core

```csharp
// Middleware approach
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;
    
    public ExceptionHandlingMiddleware(
        RequestDelegate next, 
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }
    
    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = exception switch
        {
            ValidationException => StatusCodes.Status400BadRequest,
            UnauthorizedException => StatusCodes.Status401Unauthorized,
            NotFoundException => StatusCodes.Status404NotFound,
            _ => StatusCodes.Status500InternalServerError
        };
        
        var response = new
        {
            error = exception.Message,
            statusCode = context.Response.StatusCode
        };
        
        return context.Response.WriteAsJsonAsync(response);
    }
}
```

---

## 9. Memory Management and Garbage Collection

### Garbage Collection Basics

C# uses automatic memory management through the Garbage Collector (GC).

**Generations:**
- **Generation 0**: Short-lived objects (most objects die here)
- **Generation 1**: Medium-lived objects
- **Generation 2**: Long-lived objects (large objects, static data)

```csharp
// Force garbage collection (avoid in production)
GC.Collect();
GC.WaitForPendingFinalizers();
GC.Collect();

// Get generation of an object
object obj = new object();
int generation = GC.GetGeneration(obj);
```

### IDisposable Pattern

```csharp
public class ResourceHolder : IDisposable
{
    private bool _disposed = false;
    private FileStream _fileStream;
    private SqlConnection _connection;
    
    public ResourceHolder(string filePath)
    {
        _fileStream = new FileStream(filePath, FileMode.Open);
        _connection = new SqlConnection("connection-string");
    }
    
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    
    protected virtual void Dispose(bool disposing)
    {
        if (_disposed)
            return;
        
        if (disposing)
        {
            // Dispose managed resources
            _fileStream?.Dispose();
            _connection?.Dispose();
        }
        
        // Clean up unmanaged resources if any
        
        _disposed = true;
    }
    
    ~ResourceHolder()
    {
        Dispose(false);
    }
}

// Usage with using statement
using (var holder = new ResourceHolder("file.txt"))
{
    // Use resource
} // Dispose called automatically

// Or with using declaration (C# 8+)
using var holder = new ResourceHolder("file.txt");
// Use resource
// Dispose called at end of scope
```

### Memory Optimization Tips

```csharp
// 1. Use structs for small, immutable data
public readonly struct Point
{
    public int X { get; init; }
    public int Y { get; init; }
}

// 2. Use ArrayPool for large temporary arrays
var pool = ArrayPool<byte>.Shared;
byte[] buffer = pool.Rent(1024);
try
{
    // Use buffer
}
finally
{
    pool.Return(buffer);
}

// 3. Use Span<T> and Memory<T> for slicing
public void ProcessData(ReadOnlySpan<byte> data)
{
    var slice = data.Slice(0, 10); // No allocation
}

// 4. Avoid string concatenation in loops
// Bad
string result = "";
for (int i = 0; i < 1000; i++)
    result += i.ToString();

// Good
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
    sb.Append(i);
string result = sb.ToString();
```

---

## 10. Modern C# Features (C# 10+, .NET 6+)

### Records

```csharp
// Record types: Immutable reference types with value-based equality
public record Person(string FirstName, string LastName, int Age);

// Usage
var person1 = new Person("John", "Doe", 30);
var person2 = new Person("John", "Doe", 30);
Console.WriteLine(person1 == person2); // True (value equality)

// With expression: Non-destructive mutation
var person3 = person1 with { Age = 31 };

// Record structs (C# 10)
public readonly record struct Point(int X, int Y);
```

### File-Scoped Namespaces

```csharp
// Old way
namespace MyApp.Services
{
    public class UserService
    {
        // ...
    }
}

// New way (C# 10)
namespace MyApp.Services;

public class UserService
{
    // ...
}
```

### Global Using Directives

```csharp
// GlobalUsings.cs
global using System;
global using System.Collections.Generic;
global using System.Linq;
global using System.Threading.Tasks;
global using Microsoft.Extensions.Logging;
```

### Init-Only Properties

```csharp
public class User
{
    public int Id { get; init; }
    public string Name { get; init; }
}

// Can only be set during initialization
var user = new User { Id = 1, Name = "John" };
// user.Id = 2; // Compile error
```

### Pattern Matching Enhancements

```csharp
public static string GetDescription(object obj) => obj switch
{
    null => "null",
    int n when n > 0 => $"Positive: {n}",
    int n when n < 0 => $"Negative: {n}",
    int => "Zero",
    string s when s.Length > 10 => "Long string",
    string s => $"String: {s}",
    Person { Age: > 65 } p => $"Senior: {p.Name}",
    Person p => $"Person: {p.Name}",
    _ => "Unknown type"
};

// List patterns (C# 11)
public static bool CheckArray(int[] numbers) => numbers switch
{
    [] => false,                           // Empty array
    [1] => true,                          // Single element: 1
    [1, 2, 3] => true,                    // Exact match
    [1, .., 3] => true,                   // Starts with 1, ends with 3
    [var first, .. var rest] => true,     // Deconstruct
    _ => false
};
```

### Required Members (C# 11)

```csharp
public class Person
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public int Age { get; init; }
}

// Must initialize required members
var person = new Person 
{ 
    FirstName = "John",  // Required
    LastName = "Doe"     // Required
};
```

### Raw String Literals (C# 11)

```csharp
// Use """ for multi-line strings without escape sequences
string json = """
    {
        "name": "John",
        "age": 30,
        "address": "123 Main St"
    }
    """;

// Interpolated raw strings
string name = "John";
string message = $$"""
    Hello {{name}},
    Welcome to our system!
    """;
```


---

# Q&A Section

## Fundamentals

### Q1: What is the difference between value types and reference types in C#?

**Answer:**

**Value Types:**
- Store data directly in the variable
- Allocated on the stack (or inline in objects)
- Examples: `int`, `double`, `bool`, `struct`, `enum`
- Assignment creates a copy of the value
- Default value is 0 or equivalent (not null)
- Cannot be null (unless Nullable<T>)

**Reference Types:**
- Store a reference (pointer) to the data location
- Actual data stored on the heap
- Examples: `class`, `interface`, `delegate`, `string`, `array`
- Assignment copies the reference, not the data
- Default value is `null`
- Multiple variables can reference the same object

**Example:**
```csharp
// Value type
int a = 10;
int b = a;     // Copy of value
b = 20;        // a is still 10

// Reference type
var list1 = new List<int> { 1, 2, 3 };
var list2 = list1;  // Copy of reference
list2.Add(4);       // list1 also has 4 now
```

**Memory implications:**
- Value types are generally faster for small data
- Reference types allow sharing and are better for large data
- Value types don't require garbage collection
- Reference types need GC to clean up

---

### Q2: Explain boxing and unboxing. Why should we avoid them?

**Answer:**

**Boxing** is the process of converting a value type to a reference type (object or interface).
**Unboxing** is the reverse process of extracting the value type from the boxed object.

**How it works:**
```csharp
int value = 123;
object boxed = value;        // Boxing: value copied to heap
int unboxed = (int)boxed;    // Unboxing: value copied back
```

**Why avoid boxing/unboxing:**

1. **Performance overhead**: Both operations involve copying data and heap allocation
2. **Memory pressure**: Boxing creates objects on the heap that need garbage collection
3. **Type safety**: Unboxing requires explicit casting and can throw InvalidCastException

**When boxing occurs (implicitly):**
```csharp
int number = 42;
Console.WriteLine(number);           // Boxing occurs (object parameter)

ArrayList list = new();
list.Add(123);                       // Boxing occurs

// Better alternatives
Console.WriteLine("{0}", number);    // Still boxes, but explicit
List<int> typedList = new();
typedList.Add(123);                  // No boxing with generics
```

**Best practices:**
- Use generics instead of non-generic collections
- Use `string.Format` or string interpolation instead of `string.Concat` with value types
- Be aware of interface calls on structs (they box)
- Use generic constraints when possible

---

### Q3: What are nullable types and when would you use them?

**Answer:**

Nullable types allow value types to represent the normal range of values plus `null`.

**Syntax:**
```csharp
// Using Nullable<T>
Nullable<int> nullableInt1 = null;

// Using ? shorthand (preferred)
int? nullableInt2 = null;

// Assignment
int? number = 10;
number = null;  // Valid
```

**Checking for null:**
```csharp
int? number = null;

// HasValue and Value properties
if (number.HasValue)
{
    Console.WriteLine(number.Value);
}

// Null-conditional operator
Console.WriteLine(number?.ToString() ?? "null");

// Null-coalescing operator
int result = number ?? 0;  // Use 0 if null

// GetValueOrDefault
int value = number.GetValueOrDefault(); // Returns 0 if null
int value2 = number.GetValueOrDefault(42); // Returns 42 if null
```

**Common use cases:**

1. **Database fields**: Representing NULL database values
```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime? TerminationDate { get; set; }  // null if active
}
```

2. **Optional parameters**: Method parameters that may not be provided
```csharp
public void LogMessage(string message, DateTime? timestamp = null)
{
    var time = timestamp ?? DateTime.Now;
    Console.WriteLine($"[{time}] {message}");
}
```

3. **Partial data**: Data that may not always be available
```csharp
public class WeatherData
{
    public double Temperature { get; set; }
    public double? Humidity { get; set; }  // May not be measured
}
```

**Nullable Reference Types (C# 8+):**
```csharp
#nullable enable

string? nullableString = null;  // Can be null
string nonNullString = "Hello"; // Cannot be null (compiler warning)

// nonNullString = null; // Warning: Converting null literal or possible null value
```

---

### Q4: What are the four pillars of OOP? Provide examples for each.

**Answer:**

#### 1. **Encapsulation**
Bundling data and methods, hiding internal implementation details.

```csharp
public class BankAccount
{
    private decimal _balance;  // Private field
    
    public string AccountNumber { get; }
    
    public decimal Balance => _balance;  // Read-only access
    
    public BankAccount(string accountNumber)
    {
        AccountNumber = accountNumber;
        _balance = 0;
    }
    
    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive");
        
        _balance += amount;
    }
    
    public bool Withdraw(decimal amount)
    {
        if (amount <= 0 || amount > _balance)
            return false;
        
        _balance -= amount;
        return true;
    }
}
```

#### 2. **Inheritance**
Creating new classes based on existing classes, promoting code reuse.

```csharp
public class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public virtual void MakeSound()
    {
        Console.WriteLine("Some generic animal sound");
    }
    
    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping");
    }
}

public class Dog : Animal
{
    public string Breed { get; set; }
    
    public override void MakeSound()
    {
        Console.WriteLine("Woof! Woof!");
    }
    
    public void Fetch()
    {
        Console.WriteLine($"{Name} is fetching the ball");
    }
}
```

#### 3. **Polymorphism**
Ability to take multiple forms, achieved through method overriding and interfaces.

```csharp
public interface IShape
{
    double CalculateArea();
}

public class Circle : IShape
{
    public double Radius { get; set; }
    
    public double CalculateArea() => Math.PI * Radius * Radius;
}

public class Rectangle : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }
    
    public double CalculateArea() => Width * Height;
}

// Polymorphic behavior
List<IShape> shapes = new()
{
    new Circle { Radius = 5 },
    new Rectangle { Width = 10, Height = 20 }
};

foreach (var shape in shapes)
{
    Console.WriteLine($"Area: {shape.CalculateArea()}");
}
```

#### 4. **Abstraction**
Hiding complex implementation, exposing only essential features.

```csharp
public abstract class PaymentProcessor
{
    // Abstract method - must be implemented by derived classes
    public abstract Task<PaymentResult> ProcessPayment(decimal amount);
    
    // Concrete method - shared implementation
    public void LogTransaction(string transactionId, decimal amount)
    {
        Console.WriteLine($"Transaction {transactionId}: ${amount}");
    }
    
    // Template method pattern
    public async Task<bool> ExecutePayment(decimal amount)
    {
        ValidateAmount(amount);
        var result = await ProcessPayment(amount);
        LogTransaction(result.TransactionId, amount);
        return result.Success;
    }
    
    private void ValidateAmount(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive");
    }
}

public class CreditCardProcessor : PaymentProcessor
{
    public override async Task<PaymentResult> ProcessPayment(decimal amount)
    {
        // Credit card specific implementation
        await Task.Delay(100); // Simulate API call
        return new PaymentResult 
        { 
            Success = true, 
            TransactionId = Guid.NewGuid().ToString() 
        };
    }
}
```

---

## Advanced Concepts

### Q5: Explain the difference between IEnumerable and IQueryable. When would you use each?

**Answer:**

**IEnumerable<T>:**
- Used for in-memory collections
- LINQ to Objects
- Query executed immediately when enumerated
- Entire dataset loaded into memory
- Best for local collections

**IQueryable<T>:**
- Used for remote data sources (databases)
- LINQ to SQL, LINQ to EF
- Query built as expression tree
- Executed on the data source (database server)
- Supports query optimization
- Best for database queries

**Key differences:**

```csharp
// IEnumerable - ALL data loaded, then filtered in memory
IEnumerable<Product> products = context.Products.ToList();
var expensive = products.Where(p => p.Price > 100); // Executed in memory

// IQueryable - Filter translated to SQL, executed on server
IQueryable<Product> productsQuery = context.Products;
var expensive = productsQuery.Where(p => p.Price > 100); // Translated to SQL

// When executed:
// SELECT * FROM Products WHERE Price > 100
```

**Performance comparison:**

```csharp
// Bad: Loads 1 million records into memory, then filters
IEnumerable<Order> orders = context.Orders.ToList();
var recentOrders = orders.Where(o => o.Date > DateTime.Now.AddDays(-7));

// Good: SQL filters on server, returns only matching records
IQueryable<Order> ordersQuery = context.Orders;
var recentOrders = ordersQuery.Where(o => o.Date > DateTime.Now.AddDays(-7));
```

**When to use each:**

**Use IEnumerable when:**
- Working with in-memory collections (List, Array, etc.)
- Data is already loaded
- Need to use custom methods that can't be translated to SQL
- Small datasets

**Use IQueryable when:**
- Working with databases via EF Core or LINQ to SQL
- Want to leverage database-side filtering, sorting, paging
- Large datasets - let the database do the work
- Building dynamic queries

**Combining both:**

```csharp
// Query database with IQueryable
IQueryable<Order> query = context.Orders
    .Where(o => o.CustomerId == customerId)  // SQL
    .OrderByDescending(o => o.Date);         // SQL

// Then work with results using IEnumerable
IEnumerable<OrderDto> results = query
    .ToList()  // Execute query, get IEnumerable
    .Select(o => new OrderDto  // In-memory projection
    {
        OrderId = o.Id,
        DisplayName = FormatOrderName(o)  // Custom C# method
    });
```

---

### Q6: What is the difference between async/await and Task.Run? When would you use each?

**Answer:**

**async/await:**
- Language keywords for asynchronous programming
- Doesn't create new threads
- Efficient for I/O-bound operations
- Releases thread while waiting
- Continuation on original context (by default)

**Task.Run:**
- Queues work to the thread pool
- Creates/uses a thread pool thread
- Best for CPU-bound operations
- Offloads work to background thread

**Key differences:**

```csharp
// async/await - I/O bound (no thread created)
public async Task<string> DownloadDataAsync(string url)
{
    using var client = new HttpClient();
    return await client.GetStringAsync(url);  // Thread released while waiting
}

// Task.Run - CPU bound (uses thread pool)
public async Task<int> CalculateAsync(int n)
{
    return await Task.Run(() =>
    {
        // CPU-intensive work on background thread
        return Enumerable.Range(1, n).Sum();
    });
}
```

**When to use async/await:**

1. **I/O-bound operations:**
```csharp
// Database
var user = await dbContext.Users.FindAsync(id);

// HTTP requests
var response = await httpClient.GetAsync(url);

// File I/O
var content = await File.ReadAllTextAsync(path);

// Azure SDK
var blob = await blobClient.DownloadAsync();
```

2. **Benefits:**
- No new threads created
- Better scalability (more requests with fewer threads)
- Non-blocking
- Efficient resource usage

**When to use Task.Run:**

1. **CPU-bound operations in UI/Web apps:**
```csharp
// ASP.NET Core - offload CPU work
public async Task<IActionResult> ProcessData()
{
    var result = await Task.Run(() =>
    {
        // Heavy computation
        return PerformComplexCalculation();
    });
    
    return Ok(result);
}

// WPF/WinForms - keep UI responsive
private async void Button_Click(object sender, EventArgs e)
{
    var result = await Task.Run(() =>
    {
        // Long-running calculation
        return ProcessLargeDataset();
    });
    
    ResultLabel.Text = result;
}
```

2. **Synchronous code that needs to be async:**
```csharp
// Wrapping sync API to be async
public async Task<Result> LegacyOperationAsync()
{
    return await Task.Run(() => LegacySynchronousMethod());
}
```

**Anti-patterns to avoid:**

```csharp
// ❌ DON'T: Use Task.Run for I/O
public async Task<string> BadDownloadAsync(string url)
{
    return await Task.Run(async () =>
    {
        using var client = new HttpClient();
        return await client.GetStringAsync(url);
    }); // Wastes a thread!
}

// ✅ DO: Use async/await directly
public async Task<string> GoodDownloadAsync(string url)
{
    using var client = new HttpClient();
    return await client.GetStringAsync(url);
}

// ❌ DON'T: Use Task.Run in library code (ASP.NET Core)
public async Task<Order> GetOrderAsync(int id)
{
    return await Task.Run(() => _repository.GetOrder(id));
    // Let the caller decide about threading
}

// ✅ DO: Keep library methods naturally async
public async Task<Order> GetOrderAsync(int id)
{
    return await _repository.GetOrderAsync(id);
}
```

**Best practices:**

1. **For I/O operations:** Use async/await without Task.Run
2. **For CPU operations in UI apps:** Use Task.Run
3. **For CPU operations in ASP.NET Core:** Consider if you really need Task.Run (may reduce scalability)
4. **Library code:** Avoid Task.Run, let consumers decide
5. **ConfigureAwait:** Use `ConfigureAwait(false)` in library code

---

### Q7: Explain LINQ deferred execution. What are the benefits and potential pitfalls?

**Answer:**

**Deferred Execution** means LINQ queries are not executed when defined, but when enumerated (iterated).

**How it works:**

```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5 };

// Query defined, but NOT executed yet
var query = numbers.Where(n => n > 2);

// Modify source
numbers.Add(6);
numbers.Add(7);

// Query executed here, includes 6 and 7
foreach (var n in query)  // Output: 3, 4, 5, 6, 7
    Console.WriteLine(n);
```

**Immediate execution methods:**

```csharp
var numbers = new[] { 1, 2, 3, 4, 5 };

// These execute immediately
var list = numbers.Where(n => n > 2).ToList();        // Executes now
var array = numbers.Where(n => n > 2).ToArray();      // Executes now
var count = numbers.Count(n => n > 2);                // Executes now
var first = numbers.First(n => n > 2);                // Executes now
var sum = numbers.Where(n => n > 2).Sum();            // Executes now
var any = numbers.Any(n => n > 10);                   // Executes now
```

**Benefits:**

1. **Composability - Build queries incrementally:**
```csharp
IQueryable<Product> query = dbContext.Products;

// Add filters conditionally
if (!string.IsNullOrEmpty(category))
    query = query.Where(p => p.Category == category);

if (minPrice.HasValue)
    query = query.Where(p => p.Price >= minPrice.Value);

if (sortByPrice)
    query = query.OrderBy(p => p.Price);

// Execute once with all filters
var results = await query.ToListAsync();
```

2. **Performance - Query optimization:**
```csharp
// With IQueryable, entire query translated to SQL
var expensiveInStock = dbContext.Products
    .Where(p => p.Price > 100)
    .Where(p => p.InStock)
    .OrderBy(p => p.Name)
    .Take(10);  // Only top 10 fetched from database

// SQL: SELECT TOP 10 * FROM Products 
//      WHERE Price > 100 AND InStock = 1 
//      ORDER BY Name
```

3. **Lazy evaluation - Save resources:**
```csharp
var allOrders = dbContext.Orders
    .Where(o => o.CustomerId == customerId);

// Query not executed yet, no database hit

if (startDate.HasValue)
    allOrders = allOrders.Where(o => o.Date >= startDate);

// Still not executed

var orders = await allOrders.ToListAsync();  // NOW it executes
```

**Pitfalls:**

1. **Multiple enumeration:**
```csharp
// ❌ BAD: Query executed multiple times
var query = dbContext.Products.Where(p => p.Price > 100);

var count = query.Count();        // Executes query 1
var first = query.First();        // Executes query 2
var list = query.ToList();        // Executes query 3

// ✅ GOOD: Execute once, store results
var products = dbContext.Products
    .Where(p => p.Price > 100)
    .ToList();

var count = products.Count;       // In-memory
var first = products.First();     // In-memory
```

2. **Captured variables:**
```csharp
// ❌ PROBLEMATIC: i value when enumerated
var queries = new List<IEnumerable<int>>();
for (int i = 0; i < 3; i++)
{
    queries.Add(numbers.Where(n => n > i));  // Captures i
}

// All queries use i = 3 when enumerated
foreach (var q in queries)
    Console.WriteLine(q.Count());  // All same

// ✅ FIXED: Capture current value
for (int i = 0; i < 3; i++)
{
    int temp = i;  // Capture copy
    queries.Add(numbers.Where(n => n > temp));
}
```

3. **Modified collections:**
```csharp
// ❌ DANGEROUS: Modifying during enumeration
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var query = numbers.Where(n => n > 2);

foreach (var n in query)
{
    numbers.Remove(n);  // InvalidOperationException!
}

// ✅ SAFE: Materialize first
var toRemove = numbers.Where(n => n > 2).ToList();
foreach (var n in toRemove)
{
    numbers.Remove(n);
}
```

4. **Connection lifetime (databases):**
```csharp
// ❌ BAD: Connection closed before enumeration
public IEnumerable<Product> GetProducts()
{
    using (var context = new DbContext())
    {
        return context.Products.Where(p => p.InStock);
        // Query not executed, context disposed
    }
} // Exception when enumerated outside!

// ✅ GOOD: Materialize before returning
public List<Product> GetProducts()
{
    using (var context = new DbContext())
    {
        return context.Products
            .Where(p => p.InStock)
            .ToList();  // Execute within context lifetime
    }
}
```

**Best practices:**

1. **Use `.ToList()` or `.ToArray()`** when you need to enumerate multiple times
2. **Be careful with captured variables** in loops
3. **Materialize before disposing** context/connection
4. **Use `.AsNoTracking()`** in EF Core for read-only queries
5. **Leverage deferred execution** for building dynamic queries
6. **Profile and understand** when queries execute

---

### Q8: What are delegates? How are they different from events? Provide practical examples.

**Answer:**

**Delegates** are type-safe function pointers that can reference methods.
**Events** are a special kind of delegate with restricted access and subscriber pattern.

#### Delegates

**Basic delegate usage:**

```csharp
// Delegate declaration
public delegate void NotifyDelegate(string message);
public delegate int CalculateDelegate(int x, int y);

// Method that matches delegate signature
public void SendEmail(string message)
{
    Console.WriteLine($"Email: {message}");
}

public void SendSMS(string message)
{
    Console.WriteLine($"SMS: {message}");
}

// Usage
NotifyDelegate notify = SendEmail;
notify("Hello");  // Calls SendEmail

// Multicast - multiple methods
notify += SendSMS;
notify("Hello");  // Calls both SendEmail and SendSMS
```

**Built-in delegates (Func, Action, Predicate):**

```csharp
// Action: void return
Action<string> print = (msg) => Console.WriteLine(msg);
Action<int, int> add = (a, b) => Console.WriteLine(a + b);

// Func: has return value
Func<int, int, int> multiply = (a, b) => a * b;
Func<string, bool> isValid = (s) => !string.IsNullOrEmpty(s);

// Predicate: returns bool (older, prefer Func<T, bool>)
Predicate<int> isEven = (n) => n % 2 == 0;
```

**Practical delegate example:**

```csharp
public class DataProcessor
{
    // Delegate for custom validation
    public delegate bool ValidationDelegate(string data);
    
    public List<string> ProcessData(
        List<string> data, 
        ValidationDelegate validator)
    {
        var results = new List<string>();
        
        foreach (var item in data)
        {
            if (validator(item))  // Custom validation logic
            {
                results.Add(item.ToUpper());
            }
        }
        
        return results;
    }
}

// Usage with different validation strategies
var processor = new DataProcessor();

var data = new List<string> { "hello", "world", "test", "abc" };

// Strategy 1: Length validation
var longWords = processor.ProcessData(
    data, 
    (s) => s.Length > 3
);

// Strategy 2: Contains validation
var wordsWithL = processor.ProcessData(
    data,
    (s) => s.Contains('l')
);
```

#### Events

**Events provide encapsulation over delegates:**

```csharp
public class Button
{
    // Event declaration (encapsulated delegate)
    public event EventHandler Clicked;
    
    public void Click()
    {
        OnClicked(EventArgs.Empty);
    }
    
    protected virtual void OnClicked(EventArgs e)
    {
        // Invoke all subscribers
        Clicked?.Invoke(this, e);
    }
}

// Usage
var button = new Button();

// Subscribe
button.Clicked += (sender, e) => Console.WriteLine("Handler 1");
button.Clicked += (sender, e) => Console.WriteLine("Handler 2");

// Trigger
button.Click();  // Both handlers called

// Can only subscribe/unsubscribe, cannot:
// button.Clicked = null;  // Error!
// button.Clicked.Invoke(); // Error!
```

**Key differences:**

| Feature | Delegate | Event |
|---------|----------|-------|
| Access | Public field, can be invoked by anyone | Protected invocation (only owner can raise) |
| Assignment | Can be reassigned (`=`) | Cannot be reassigned from outside |
| Clearing | Can be set to null | Cannot be set to null from outside |
| Encapsulation | No encapsulation | Encapsulated (only `+=` and `-=`) |
| Purpose | Callback mechanism | Publisher-Subscriber pattern |

**Practical event example:**

```csharp
// Custom event arguments
public class OrderEventArgs : EventArgs
{
    public int OrderId { get; set; }
    public decimal Total { get; set; }
    public DateTime OrderDate { get; set; }
}

// Publisher
public class OrderService
{
    // Event with custom arguments
    public event EventHandler<OrderEventArgs> OrderPlaced;
    public event EventHandler<OrderEventArgs> OrderCancelled;
    
    public async Task<Order> CreateOrderAsync(Order order)
    {
        // Process order
        var created = await _repository.SaveAsync(order);
        
        // Raise event
        OnOrderPlaced(new OrderEventArgs
        {
            OrderId = created.Id,
            Total = created.Total,
            OrderDate = created.Date
        });
        
        return created;
    }
    
    protected virtual void OnOrderPlaced(OrderEventArgs e)
    {
        OrderPlaced?.Invoke(this, e);
    }
    
    public async Task CancelOrderAsync(int orderId)
    {
        await _repository.DeleteAsync(orderId);
        
        OnOrderCancelled(new OrderEventArgs { OrderId = orderId });
    }
    
    protected virtual void OnOrderCancelled(OrderEventArgs e)
    {
        OrderCancelled?.Invoke(this, e);
    }
}

// Subscribers
public class EmailNotificationService
{
    public EmailNotificationService(OrderService orderService)
    {
        // Subscribe to events
        orderService.OrderPlaced += OnOrderPlaced;
        orderService.OrderCancelled += OnOrderCancelled;
    }
    
    private void OnOrderPlaced(object sender, OrderEventArgs e)
    {
        Console.WriteLine($"Sending order confirmation email for Order #{e.OrderId}");
        // Send email...
    }
    
    private void OnOrderCancelled(object sender, OrderEventArgs e)
    {
        Console.WriteLine($"Sending cancellation email for Order #{e.OrderId}");
        // Send email...
    }
}

public class InventoryService
{
    public InventoryService(OrderService orderService)
    {
        orderService.OrderPlaced += OnOrderPlaced;
        orderService.OrderCancelled += OnOrderCancelled;
    }
    
    private void OnOrderPlaced(object sender, OrderEventArgs e)
    {
        Console.WriteLine($"Reducing inventory for Order #{e.OrderId}");
        // Update inventory...
    }
    
    private void OnOrderCancelled(object sender, OrderEventArgs e)
    {
        Console.WriteLine($"Restoring inventory for Order #{e.OrderId}");
        // Restore inventory...
    }
}

// Usage in DI container
services.AddScoped<OrderService>();
services.AddScoped<EmailNotificationService>();
services.AddScoped<InventoryService>();
```

**Memory leak prevention:**

```csharp
// ❌ PROBLEMATIC: Event subscription can cause memory leaks
public class Form
{
    public Form(LongLivedService service)
    {
        service.DataChanged += OnDataChanged;
        // If not unsubscribed, Form won't be GC'd while service lives
    }
    
    private void OnDataChanged(object sender, EventArgs e) { }
}

// ✅ SOLUTION: Unsubscribe in Dispose
public class Form : IDisposable
{
    private readonly LongLivedService _service;
    
    public Form(LongLivedService service)
    {
        _service = service;
        _service.DataChanged += OnDataChanged;
    }
    
    private void OnDataChanged(object sender, EventArgs e) { }
    
    public void Dispose()
    {
        _service.DataChanged -= OnDataChanged;
    }
}

// ✅ ALTERNATIVE: Weak event pattern (advanced)
public class WeakEventManager<TEventArgs> where TEventArgs : EventArgs
{
    private readonly List<WeakReference> _subscribers = new();
    
    public void AddHandler(EventHandler<TEventArgs> handler)
    {
        _subscribers.Add(new WeakReference(handler));
    }
    
    public void Raise(object sender, TEventArgs e)
    {
        var toRemove = new List<WeakReference>();
        
        foreach (var wr in _subscribers)
        {
            if (wr.Target is EventHandler<TEventArgs> handler)
            {
                handler(sender, e);
            }
            else
            {
                toRemove.Add(wr);
            }
        }
        
        foreach (var wr in toRemove)
        {
            _subscribers.Remove(wr);
        }
    }
}
```

---

### Q9: Explain Dependency Injection service lifetimes (Transient, Scoped, Singleton). When would you use each?

**Answer:**

#### Service Lifetimes in ASP.NET Core DI

**1. Transient**

- **Created:** Every time they're requested
- **Lifetime:** Disposed after use
- **Best for:** Lightweight, stateless services

```csharp
services.AddTransient<IEmailService, EmailService>();
```

**Example:**
```csharp
public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    
    public EmailService(IConfiguration config)
    {
        _config = config;
        Console.WriteLine("EmailService created");
    }
    
    public async Task SendEmailAsync(string to, string subject, string body)
    {
        // Send email
    }
}

// Each injection gets a NEW instance
public class UserController
{
    private readonly IEmailService _emailService1;
    private readonly IEmailService _emailService2;
    
    public UserController(IEmailService emailService1, IEmailService emailService2)
    {
        _emailService1 = emailService1;  // New instance
        _emailService2 = emailService2;  // Another new instance
        // Different instances!
    }
}
```

**2. Scoped**

- **Created:** Once per request/scope
- **Lifetime:** Disposed at end of request
- **Best for:** Per-request services, DbContext

```csharp
services.AddScoped<IUserRepository, UserRepository>();
services.AddDbContext<ApplicationDbContext>();  // Scoped by default
```

**Example:**
```csharp
public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;
    
    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
        Console.WriteLine("UserRepository created");
    }
}

public class UserService
{
    private readonly IUserRepository _repository;
    
    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }
}

public class UserController
{
    private readonly IUserRepository _repository1;
    private readonly IUserService _service;
    
    public UserController(IUserRepository repository1, IUserService service)
    {
        _repository1 = repository1;  // Instance A
        _service = service;           // service._repository is also Instance A
        // Same instance within request scope!
    }
}
```

**3. Singleton**

- **Created:** Once for application lifetime
- **Lifetime:** Until application stops
- **Best for:** Stateless services, caches, configuration

```csharp
services.AddSingleton<IMemoryCache, MemoryCache>();
services.AddSingleton<IConfiguration>(Configuration);
```

**Example:**
```csharp
public class CacheService : ICacheService
{
    private readonly ConcurrentDictionary<string, object> _cache;
    
    public CacheService()
    {
        _cache = new ConcurrentDictionary<string, object>();
        Console.WriteLine("CacheService created - ONLY ONCE");
    }
    
    public void Set(string key, object value) => _cache[key] = value;
    
    public object Get(string key) => _cache.TryGetValue(key, out var value) ? value : null;
}

// All controllers and services get THE SAME instance
```

#### Choosing the Right Lifetime

**Use Transient when:**
- Service is lightweight and stateless
- Service can be created/disposed frequently
- No shared state needed

```csharp
services.AddTransient<IEmailService, EmailService>();
services.AddTransient<IMessageFormatter, MessageFormatter>();
services.AddTransient<IValidator<T>, Validator<T>>();
```

**Use Scoped when:**
- Service has per-request state
- Working with databases (DbContext)
- Need same instance throughout request
- Services interact with each other in a request

```csharp
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<IOrderRepository, OrderRepository>();
services.AddScoped<IUnitOfWork, UnitOfWork>();
services.AddDbContext<ApplicationDbContext>();  // Scoped
```

**Use Singleton when:**
- Service is stateless or thread-safe
- Expensive to create
- Cache or shared state
- Configuration data

```csharp
services.AddSingleton<IMemoryCache, MemoryCache>();
services.AddSingleton<IHttpClientFactory, HttpClientFactory>();
services.AddSingleton<IConfiguration>(Configuration);
services.AddSingleton<ICacheService, CacheService>();
```

#### Common Pitfalls

**1. Captive Dependency (Anti-pattern)**

```csharp
// ❌ BAD: Singleton consuming Scoped service
services.AddSingleton<SingletonService>();  // Lives forever
services.AddScoped<ScopedService>();        // Lives per request

public class SingletonService
{
    private readonly ScopedService _scoped;
    
    // PROBLEM: Scoped service captured by Singleton
    // ScopedService will live as long as Singleton (forever)
    // DbContext in ScopedService will cause issues
    public SingletonService(ScopedService scoped)
    {
        _scoped = scoped;  // CAPTIVE DEPENDENCY!
    }
}

// ✅ GOOD: Use IServiceProvider to resolve scoped services
public class SingletonService
{
    private readonly IServiceProvider _serviceProvider;
    
    public SingletonService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public void DoWork()
    {
        using var scope = _serviceProvider.CreateScope();
        var scoped = scope.ServiceProvider.GetRequiredService<ScopedService>();
        // Use scoped service
    }
}
```

**2. Disposing Singleton**

```csharp
// ❌ BAD: Singleton implementing IDisposable
services.AddSingleton<IMyService, MyService>();

public class MyService : IMyService, IDisposable
{
    public void Dispose()
    {
        // This won't be called until app shutdown!
    }
}

// ✅ GOOD: Use Scoped or Transient if disposal needed
services.AddScoped<IMyService, MyService>();
```

**3. Thread Safety in Singleton**

```csharp
// ❌ BAD: Non-thread-safe singleton
public class CounterService  // Singleton
{
    private int _count = 0;
    
    public void Increment()
    {
        _count++;  // NOT thread-safe!
    }
}

// ✅ GOOD: Thread-safe singleton
public class CounterService
{
    private int _count = 0;
    
    public void Increment()
    {
        Interlocked.Increment(ref _count);
    }
}

// ✅ BETTER: Use concurrent collections
public class CacheService
{
    private readonly ConcurrentDictionary<string, object> _cache = new();
    
    public void Set(string key, object value) => _cache[key] = value;
}
```

#### Real-World Example

```csharp
// Startup/Program.cs
public void ConfigureServices(IServiceCollection services)
{
    // Configuration - Singleton
    services.AddSingleton<IConfiguration>(Configuration);
    
    // Caching - Singleton (thread-safe)
    services.AddSingleton<IMemoryCache, MemoryCache>();
    services.AddSingleton<ICacheService, CacheService>();
    
    // Database - Scoped (per request)
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(connectionString));
    
    // Repositories - Scoped (use same DbContext in request)
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<IOrderRepository, OrderRepository>();
    services.AddScoped<IUnitOfWork, UnitOfWork>();
    
    // Services - Scoped (coordinate repositories)
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<IOrderService, OrderService>();
    
    // Utilities - Transient (lightweight, stateless)
    services.AddTransient<IEmailService, EmailService>();
    services.AddTransient<ISmsService, SmsService>();
    services.AddTransient<IValidator<User>, UserValidator>();
}
```

**Decision flowchart:**
```
Does service need to be the same instance across entire app?
├─ YES → Singleton
│   └─ Is it thread-safe or stateless?
│       ├─ YES → ✓ Use Singleton
│       └─ NO → ✗ Fix thread safety or use Scoped
│
└─ NO → Does service need to be same instance within a request?
    ├─ YES → Scoped
    │   └─ Does it work with DbContext?
    │       ├─ YES → ✓ Use Scoped
    │       └─ NO → Consider Transient if lightweight
    │
    └─ NO → Transient
        └─ Is it lightweight and stateless?
            ├─ YES → ✓ Use Transient
            └─ NO → Consider Scoped or redesign
```

---

### Q10: What is garbage collection in C#? Explain the generations and when GC.Collect() should be used.

**Answer:**

**Garbage Collection (GC)** is automatic memory management in .NET that reclaims memory occupied by objects no longer in use.

#### How GC Works

**Managed Heap Organization:**
```
┌─────────────────────────────────────┐
│   Generation 2 (Long-lived objects) │  ← Large Object Heap (LOH)
├─────────────────────────────────────┤
│   Generation 1 (Medium-lived)       │
├─────────────────────────────────────┤
│   Generation 0 (Short-lived NEW)    │  ← Most collections happen here
└─────────────────────────────────────┘
```

#### Generations

**Generation 0 (Gen 0):**
- **Contents:** Newly created objects
- **Size:** Small (< 1 MB typically)
- **Collection frequency:** Very frequent
- **Survival:** Most objects die here (ephemeral)

**Generation 1 (Gen 1):**
- **Contents:** Objects that survived Gen 0 collection
- **Purpose:** Buffer between short and long-lived objects
- **Collection frequency:** Less frequent than Gen 0

**Generation 2 (Gen 2):**
- **Contents:** Long-lived objects
- **Collection frequency:** Rare (expensive)
- **Includes:** Large Object Heap (LOH) for objects > 85KB

**Example:**
```csharp
object obj1 = new object();  // Allocated in Gen 0
Console.WriteLine($"Generation: {GC.GetGeneration(obj1)}");  // 0

GC.Collect();  // Force collection
Console.WriteLine($"Generation: {GC.GetGeneration(obj1)}");  // 1 (survived)

GC.Collect();  // Force collection again
Console.WriteLine($"Generation: {GC.GetGeneration(obj1)}");  // 2 (survived again)
```

#### GC Collection Process

**1. Marking Phase:**
```csharp
// GC traces from roots (static fields, locals, CPU registers)
// and marks all reachable objects
```

**2. Compacting Phase:**
```csharp
// Move surviving objects together
// Update references
// Free up contiguous memory
```

**Example of object lifecycle:**
```csharp
public void ProcessOrders()
{
    // tempOrder allocated in Gen 0
    var tempOrder = new Order { Id = 1 };
    
    // Most likely collected after method ends (stays in Gen 0)
}

public class OrderCache
{
    // longLivedCache will move to Gen 2
    private static Dictionary<int, Order> _cache = new();
    
    public void CacheOrder(Order order)
    {
        _cache[order.Id] = order;  // Survives collections, moves to Gen 2
    }
}
```

#### When GC Runs

**Automatic triggers:**
1. Gen 0 is full
2. System memory is low
3. `GC.Collect()` is called

**Collection types:**
```csharp
// Gen 0 collection (fast, frequent)
// Collects only Gen 0

// Gen 1 collection (medium)
// Collects Gen 0 and Gen 1

// Gen 2 collection (slow, rare)
// Full garbage collection (all generations)
```

#### GC.Collect() - When to Use (Rarely!)

**❌ DON'T use GC.Collect() in most cases:**
- GC is highly optimized
- Forcing collection usually hurts performance
- Can promote objects to higher generations prematurely

**✅ DO use GC.Collect() in specific scenarios:**

**1. After large memory operations:**
```csharp
public async Task ProcessLargeDataSet()
{
    // Load and process huge dataset
    var data = await LoadMillionsOfRecords();
    ProcessData(data);
    
    // Clear references
    data = null;
    
    // Explicitly collect to free memory before continuing
    GC.Collect();
    GC.WaitForPendingFinalizers();
    GC.Collect();
    
    // Continue with other work...
}
```

**2. One-time initialization:**
```csharp
public void ApplicationStartup()
{
    // Heavy initialization that creates temporary objects
    LoadConfiguration();
    InitializePlugins();
    WarmUpCaches();
    
    // Clean up initialization garbage
    GC.Collect();
    GC.WaitForPendingFinalizers();
    GC.Collect();
}
```

**3. Memory leak testing:**
```csharp
[Fact]
public void MemoryLeakTest()
{
    WeakReference weakRef = null;
    
    void CreateObject()
    {
        var obj = new MyObject();
        weakRef = new WeakReference(obj);
    }
    
    CreateObject();
    
    GC.Collect();
    GC.WaitForPendingFinalizers();
    GC.Collect();
    
    Assert.False(weakRef.IsAlive);  // Should be collected
}
```

**4. Performance testing:**
```csharp
public void PerformanceBenchmark()
{
    // Clean slate before benchmark
    GC.Collect();
    GC.WaitForPendingFinalizers();
    GC.Collect();
    
    var stopwatch = Stopwatch.StartNew();
    // Run benchmark
    stopwatch.Stop();
}
```

#### Best Practices for Memory Management

**1. Implement IDisposable for unmanaged resources:**
```csharp
public class FileProcessor : IDisposable
{
    private FileStream _fileStream;
    private bool _disposed = false;
    
    public FileProcessor(string path)
    {
        _fileStream = new FileStream(path, FileMode.Open);
    }
    
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    
    protected virtual void Dispose(bool disposing)
    {
        if (_disposed) return;
        
        if (disposing)
        {
            _fileStream?.Dispose();
        }
        
        _disposed = true;
    }
}
```

**2. Use using statements:**
```csharp
// Ensures Dispose is called
using (var processor = new FileProcessor("file.txt"))
{
    processor.Process();
} // Dispose called automatically

// Or with declaration (C# 8+)
using var processor = new FileProcessor("file.txt");
processor.Process();
// Dispose called at end of scope
```

**3. Avoid finalizers unless necessary:**
```csharp
// ❌ AVOID: Finalizers are expensive
public class MyClass
{
    ~MyClass()  // Finalizer
    {
        // Cleanup
    }
}

// ✅ PREFER: IDisposable without finalizer
public class MyClass : IDisposable
{
    public void Dispose()
    {
        // Cleanup
    }
}
```

**4. Use object pooling for frequently allocated objects:**
```csharp
// Use ArrayPool for byte arrays
var pool = ArrayPool<byte>.Shared;
byte[] buffer = pool.Rent(1024);
try
{
    // Use buffer
}
finally
{
    pool.Return(buffer);
}

// Use ObjectPool for custom objects
public class MyObjectPool
{
    private readonly ObjectPool<StringBuilder> _pool =
        new DefaultObjectPool<StringBuilder>(
            new StringBuilderPooledObjectPolicy());
    
    public string ProcessText()
    {
        var sb = _pool.Get();
        try
        {
            sb.Append("Hello ");
            sb.Append("World");
            return sb.ToString();
        }
        finally
        {
            _pool.Return(sb);
        }
    }
}
```

**5. Monitor GC performance:**
```csharp
// Check GC statistics
var gen0 = GC.CollectionCount(0);
var gen1 = GC.CollectionCount(1);
var gen2 = GC.CollectionCount(2);
var totalMemory = GC.GetTotalMemory(false);

Console.WriteLine($"Gen 0: {gen0}, Gen 1: {gen1}, Gen 2: {gen2}");
Console.WriteLine($"Total Memory: {totalMemory / 1024 / 1024} MB");
```

**6. Use Span<T> and Memory<T> for zero-allocation:**
```csharp
public void ProcessData(ReadOnlySpan<byte> data)
{
    // No allocation for slicing
    var header = data.Slice(0, 10);
    var body = data.Slice(10);
    
    // Process without creating new arrays
}
```

#### Summary

- **GC is automatic** - don't interfere unless you have a specific need
- **Generations optimize performance** - most objects die young
- **Avoid GC.Collect()** in production code
- **Implement IDisposable** for unmanaged resources
- **Use 'using' statements** for automatic cleanup
- **Monitor and profile** if you have performance issues
- **Consider modern features** like Span<T>, Memory<T>, and object pooling

---

## .NET and Azure Specific

### Q11: How would you secure sensitive data (connection strings, API keys) in an Azure-deployed ASP.NET Core application?

**Answer:**

Multiple approaches with increasing security levels:

#### 1. Azure Key Vault (Best Practice)

**Setup:**
```csharp
// Program.cs
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

var builder = WebApplication.CreateBuilder(args);

// Add Key Vault
if (!builder.Environment.IsDevelopment())
{
    var keyVaultUrl = new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/");
    
    // Use Managed Identity in Azure
    builder.Configuration.AddAzureKeyVault(
        keyVaultUrl,
        new DefaultAzureCredential());
}

// Access secrets
var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
var apiKey = builder.Configuration["ApiKey"];
```

**Benefits:**
- Secrets never in code or config files
- Centralized secret management
- Access auditing and logging
- Automatic rotation support
- Managed Identity integration (no credentials needed)

**Setting up Managed Identity:**
```bash
# Enable System-Assigned Managed Identity on App Service
az webapp identity assign --name myapp --resource-group mygroup

# Grant access to Key Vault
az keyvault set-policy --name myvault \
  --object-id <managed-identity-object-id> \
  --secret-permissions get list
```

#### 2. User Secrets (Development)

**For local development only:**
```bash
# Initialize user secrets
dotnet user-secrets init

# Add secrets
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;..."
dotnet user-secrets set "ApiKeys:SendGrid" "SG.xxxxxxxxxx"
```

```csharp
// Automatically loaded in Development
// Access like normal configuration
var connectionString = Configuration["ConnectionStrings:DefaultConnection"];
```

**File location:** `%APPDATA%\Microsoft\UserSecrets\<user_secrets_id>\secrets.json`

**Never committed to source control!**

#### 3. Environment Variables

```csharp
// Program.cs - already included by default
builder.Configuration.AddEnvironmentVariables();

// Access
var apiKey = Environment.GetEnvironmentVariable("API_KEY");
var connStr = Configuration["ConnectionStrings__DefaultConnection"];
```

**Azure App Service Configuration:**
```bash
# Set via Azure CLI
az webapp config appsettings set --name myapp \
  --resource-group mygroup \
  --settings API_KEY=secret_value

# Or via Azure Portal: Configuration > Application Settings
```

#### 4. Managed Identity for Azure Resources

**No secrets needed for Azure resources:**

```csharp
// SQL Database with Managed Identity
using Azure.Identity;
using Microsoft.Data.SqlClient;

services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure();
    });
});

// In DbContext or repository
public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            
            optionsBuilder.UseSqlServer(connectionString, options =>
            {
                options.UseAzureADAuthentication();  // Use Managed Identity
            });
        }
    }
}

// Azure Storage with Managed Identity
var blobServiceClient = new BlobServiceClient(
    new Uri("https://mystorageaccount.blob.core.windows.net"),
    new DefaultAzureCredential());  // No connection string needed!

// Azure Service Bus with Managed Identity
var serviceBusClient = new ServiceBusClient(
    "myservicebus.servicebus.windows.net",
    new DefaultAzureCredential());
```

#### 5. Complete Secure Configuration Pattern

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// 1. Base configuration (appsettings.json)
// 2. Environment specific (appsettings.Production.json)
// 3. User Secrets (Development only)
if (builder.Environment.IsDevelopment())
{
    // Already added by default in Development
}

// 4. Environment Variables
builder.Configuration.AddEnvironmentVariables();

// 5. Azure Key Vault (Production)
if (!builder.Environment.IsDevelopment())
{
    var keyVaultName = builder.Configuration["KeyVault:Name"];
    
    if (!string.IsNullOrEmpty(keyVaultName))
    {
        var keyVaultUri = new Uri($"https://{keyVaultName}.vault.azure.net/");
        
        builder.Configuration.AddAzureKeyVault(
            keyVaultUri,
            new DefaultAzureCredential());
    }
}

// Configure services with secrets
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Email service with API key
builder.Services.AddScoped<IEmailService>(provider =>
{
    var apiKey = builder.Configuration["SendGrid:ApiKey"];
    return new EmailService(apiKey);
});

// Azure Storage
builder.Services.AddSingleton(x =>
{
    return new BlobServiceClient(
        new Uri(builder.Configuration["AzureStorage:BlobEndpoint"]),
        new DefaultAzureCredential());
});
```

#### 6. Configuration Hierarchy

```
Priority (highest to lowest):
1. Command-line arguments
2. Environment variables
3. Azure Key Vault
4. User Secrets (Development)
5. appsettings.{Environment}.json
6. appsettings.json
```

#### 7. Options Pattern for Strongly-Typed Configuration

```csharp
// Configuration class
public class SendGridOptions
{
    public string ApiKey { get; set; }
    public string FromEmail { get; set; }
    public string FromName { get; set; }
}

// appsettings.json (no sensitive data)
{
  "SendGrid": {
    "FromEmail": "noreply@example.com",
    "FromName": "My App"
  }
}

// Register
builder.Services.Configure<SendGridOptions>(
    builder.Configuration.GetSection("SendGrid"));

// Inject and use
public class EmailService
{
    private readonly SendGridOptions _options;
    
    public EmailService(IOptions<SendGridOptions> options)
    {
        _options = options.Value;
    }
    
    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var apiKey = _options.ApiKey;  // From Key Vault
        // Send email...
    }
}
```

#### Best Practices Summary

1. **✅ DO:**
   - Use Azure Key Vault for production secrets
   - Use Managed Identity whenever possible
   - Use User Secrets for local development
   - Store sensitive config separately from code
   - Use Options pattern for strongly-typed configuration
   - Implement secret rotation

2. **❌ DON'T:**
   - Commit secrets to source control
   - Hardcode connection strings or API keys
   - Store secrets in appsettings.json
   - Share production secrets across environments
   - Log sensitive data

3. **Security Checklist:**
   - [ ] Secrets in Key Vault
   - [ ] Managed Identity enabled
   - [ ] User Secrets for development
   - [ ] .gitignore includes appsettings.*.json (except templates)
   - [ ] No hardcoded secrets in code
   - [ ] Connection strings use Managed Identity where possible
   - [ ] API keys rotated regularly
   - [ ] Access auditing enabled on Key Vault

#### Example .gitignore

```gitignore
# User secrets
**/appsettings.Development.json
**/appsettings.Local.json

# Environment files
.env
.env.local

# User specific
*.user
*.suo
.vs/
```


---

# Q&A Section

## Fundamentals

### Q1: What is the difference between value types and reference types in C#?

**Answer:**

**Value Types:**
- Store data directly in the variable
- Allocated on the stack (or inline in objects)
- Examples: `int`, `double`, `bool`, `struct`, `enum`
- Assignment creates a copy of the value
- Default value is 0 or equivalent (not null)
- Cannot be null (unless Nullable<T>)

**Reference Types:**
- Store a reference (pointer) to the data location
- Actual data stored on the heap
- Examples: `class`, `interface`, `delegate`, `string`, `array`
- Assignment copies the reference, not the data
- Default value is `null`
- Multiple variables can reference the same object

**Example:**
```csharp
// Value type
int a = 10;
int b = a;     // Copy of value
b = 20;        // a is still 10

// Reference type
var list1 = new List<int> { 1, 2, 3 };
var list2 = list1;  // Copy of reference
list2.Add(4);       // list1 also has 4 now
```

---

### Q2: Explain boxing and unboxing. Why should we avoid them?

**Answer:**

**Boxing** converts a value type to a reference type (object).
**Unboxing** extracts the value type from the boxed object.

```csharp
int value = 123;
object boxed = value;        // Boxing: value copied to heap
int unboxed = (int)boxed;    // Unboxing: value copied back
```

**Why avoid:**
1. Performance overhead - copying and heap allocation
2. Memory pressure - creates objects needing GC
3. Type safety - unboxing requires casting

**Better alternatives:**
```csharp
// Use generics instead of non-generic collections
List<int> typedList = new();  // No boxing
typedList.Add(123);
```

---

### Q3: What are the four pillars of OOP?

**Answer:**

1. **Encapsulation** - Bundling data and methods, hiding internals
2. **Inheritance** - Creating classes based on existing ones
3. **Polymorphism** - Objects taking multiple forms
4. **Abstraction** - Hiding complex implementation details

---

### Q4: Explain the difference between abstract classes and interfaces.

**Answer:**

**Abstract Classes:**
```csharp
public abstract class Animal
{
    protected string Name;  // Can have fields
    
    public Animal(string name)  // Can have constructors
    {
        Name = name;
    }
    
    public abstract void MakeSound();  // Abstract method
    
    public void Sleep()  // Concrete method
    {
        Console.WriteLine($"{Name} is sleeping");
    }
}
```

**Interfaces:**
```csharp
public interface IAnimal
{
    // No fields (only properties)
    string Name { get; set; }
    
    // All members public by default
    void MakeSound();
    
    // Default implementation (C# 8+)
    void Sleep()
    {
        Console.WriteLine("Sleeping...");
    }
}
```

**Key Differences:**

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Multiple inheritance | No | Yes |
| Fields | Yes | No |
| Constructors | Yes | No |
| Access modifiers | Any | Public only |
| Implementation | Can have | Only default (C# 8+) |
| When to use | IS-A relationship | CAN-DO capability |

---

### Q5: What is the difference between IEnumerable and IQueryable?

**Answer:**

**IEnumerable<T>:**
- In-memory collections
- LINQ to Objects
- Query executed in memory

**IQueryable<T>:**
- Remote data sources (databases)
- LINQ to SQL/EF
- Query translated to SQL
- Executed on database server

```csharp
// IEnumerable - ALL data loaded, then filtered
IEnumerable<Product> products = context.Products.ToList();
var filtered = products.Where(p => p.Price > 100);  // In memory

// IQueryable - Filter in SQL
IQueryable<Product> query = context.Products;
var filtered = query.Where(p => p.Price > 100);  // Translated to SQL
```

---

### Q6: Explain async/await. What is the difference from Task.Run?

**Answer:**

**async/await:**
- For I/O-bound operations
- Doesn't create threads
- Releases thread while waiting
- Non-blocking

**Task.Run:**
- For CPU-bound operations
- Uses thread pool thread
- Offloads work to background

```csharp
// async/await - I/O bound
public async Task<string> DownloadAsync(string url)
{
    using var client = new HttpClient();
    return await client.GetStringAsync(url);  // No thread blocking
}

// Task.Run - CPU bound
public async Task<int> CalculateAsync(int n)
{
    return await Task.Run(() => 
    {
        return Enumerable.Range(1, n).Sum();  // On thread pool
    });
}
```

---

### Q7: What are delegates and events? How are they different?

**Answer:**

**Delegates:** Type-safe function pointers

```csharp
public delegate void NotifyDelegate(string message);

NotifyDelegate notify = (msg) => Console.WriteLine(msg);
notify("Hello");
```

**Events:** Encapsulated delegates for publisher-subscriber pattern

```csharp
public class Button
{
    public event EventHandler Clicked;
    
    public void Click()
    {
        Clicked?.Invoke(this, EventArgs.Empty);
    }
}
```

**Differences:**
- Events can only be invoked by owner class
- Events prevent external assignment (only += and -=)
- Events provide better encapsulation

---

### Q8: Explain Dependency Injection service lifetimes.

**Answer:**

**Transient:** New instance every time
```csharp
services.AddTransient<IEmailService, EmailService>();
// Use for: Lightweight, stateless services
```

**Scoped:** One instance per request
```csharp
services.AddScoped<IUserRepository, UserRepository>();
// Use for: DbContext, per-request services
```

**Singleton:** One instance for application lifetime
```csharp
services.AddSingleton<IMemoryCache, MemoryCache>();
// Use for: Caches, configuration, thread-safe services
```

---

### Q9: What is garbage collection? Explain generations.

**Answer:**

**GC** automatically manages memory by reclaiming unused objects.

**Generations:**
- **Gen 0:** New objects (most die here, collected frequently)
- **Gen 1:** Survived Gen 0 (buffer generation)
- **Gen 2:** Long-lived objects (collected rarely)

```csharp
object obj = new object();
Console.WriteLine(GC.GetGeneration(obj));  // 0

GC.Collect();
Console.WriteLine(GC.GetGeneration(obj));  // 1 (survived)
```

**When to use GC.Collect():** Rarely! Only after large operations or in tests.

---

### Q10: How do you secure sensitive data in Azure applications?

**Answer:**

**Best Practice: Azure Key Vault + Managed Identity**

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

if (!builder.Environment.IsDevelopment())
{
    var keyVaultUrl = new Uri($"https://myvault.vault.azure.net/");
    builder.Configuration.AddAzureKeyVault(
        keyVaultUrl,
        new DefaultAzureCredential());
}

// Access secrets
var apiKey = builder.Configuration["ApiKey"];
```

**Security layers:**
1. Azure Key Vault for secrets
2. Managed Identity (no credentials in code)
3. User Secrets for development
4. Environment variables for App Service
5. Never commit secrets to source control

---

## Design Patterns & Best Practices

### Q11: Explain the Repository pattern and why it's useful.

**Answer:**

**Repository Pattern** abstracts data access logic, providing a collection-like interface.

```csharp
// Interface
public interface IRepository<T> where T : class
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
}

// Implementation
public class UserRepository : IRepository<User>
{
    private readonly ApplicationDbContext _context;
    
    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<User> GetByIdAsync(int id)
    {
        return await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);
    }
    
    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<User> AddAsync(User entity)
    {
        _context.Users.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }
    
    public async Task UpdateAsync(User entity)
    {
        _context.Users.Update(entity);
        await _context.SaveChangesAsync();
    }
    
    public async Task DeleteAsync(int id)
    {
        var user = await GetByIdAsync(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}

// Usage in service
public class UserService
{
    private readonly IRepository<User> _repository;
    
    public UserService(IRepository<User> repository)
    {
        _repository = repository;
    }
    
    public async Task<User> GetUserAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }
}
```

**Benefits:**
- Separation of concerns
- Easier testing (mock repository)
- Centralized data access logic
- Can swap data source without changing business logic
- Reduces code duplication

---

### Q12: What is the Unit of Work pattern?

**Answer:**

**Unit of Work** maintains a list of objects affected by a business transaction and coordinates writing changes.

```csharp
public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IOrderRepository Orders { get; }
    IProductRepository Products { get; }
    
    Task<int> SaveChangesAsync();
    Task BeginTransactionAsync();
    Task CommitAsync();
    Task RollbackAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private IDbContextTransaction _transaction;
    
    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
        Users = new UserRepository(_context);
        Orders = new OrderRepository(_context);
        Products = new ProductRepository(_context);
    }
    
    public IUserRepository Users { get; }
    public IOrderRepository Orders { get; }
    public IProductRepository Products { get; }
    
    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
    
    public async Task BeginTransactionAsync()
    {
        _transaction = await _context.Database.BeginTransactionAsync();
    }
    
    public async Task CommitAsync()
    {
        try
        {
            await SaveChangesAsync();
            await _transaction?.CommitAsync();
        }
        catch
        {
            await RollbackAsync();
            throw;
        }
        finally
        {
            _transaction?.Dispose();
        }
    }
    
    public async Task RollbackAsync()
    {
        await _transaction?.RollbackAsync();
        _transaction?.Dispose();
    }
    
    public void Dispose()
    {
        _transaction?.Dispose();
        _context?.Dispose();
    }
}

// Usage
public class OrderService
{
    private readonly IUnitOfWork _unitOfWork;
    
    public OrderService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    
    public async Task<Order> CreateOrderAsync(Order order)
    {
        await _unitOfWork.BeginTransactionAsync();
        
        try
        {
            // Multiple operations in one transaction
            var createdOrder = await _unitOfWork.Orders.AddAsync(order);
            
            foreach (var item in order.Items)
            {
                var product = await _unitOfWork.Products.GetByIdAsync(item.ProductId);
                product.Stock -= item.Quantity;
                await _unitOfWork.Products.UpdateAsync(product);
            }
            
            await _unitOfWork.CommitAsync();
            return createdOrder;
        }
        catch
        {
            await _unitOfWork.RollbackAsync();
            throw;
        }
    }
}
```

**Benefits:**
- Ensures all operations succeed or fail together
- Manages transactions across multiple repositories
- Single save point for all changes
- Reduces database round trips

---

### Q13: Explain the Factory pattern with an example.

**Answer:**

**Factory Pattern** creates objects without exposing creation logic.

```csharp
// Product interface
public interface IPaymentProcessor
{
    Task<PaymentResult> ProcessPayment(decimal amount);
}

// Concrete products
public class CreditCardProcessor : IPaymentProcessor
{
    public async Task<PaymentResult> ProcessPayment(decimal amount)
    {
        Console.WriteLine($"Processing ${amount} via Credit Card");
        await Task.Delay(100);
        return new PaymentResult { Success = true };
    }
}

public class PayPalProcessor : IPaymentProcessor
{
    public async Task<PaymentResult> ProcessPayment(decimal amount)
    {
        Console.WriteLine($"Processing ${amount} via PayPal");
        await Task.Delay(100);
        return new PaymentResult { Success = true };
    }
}

public class CryptoProcessor : IPaymentProcessor
{
    public async Task<PaymentResult> ProcessPayment(decimal amount)
    {
        Console.WriteLine($"Processing ${amount} via Cryptocurrency");
        await Task.Delay(100);
        return new PaymentResult { Success = true };
    }
}

// Factory
public class PaymentProcessorFactory
{
    public IPaymentProcessor CreateProcessor(PaymentMethod method)
    {
        return method switch
        {
            PaymentMethod.CreditCard => new CreditCardProcessor(),
            PaymentMethod.PayPal => new PayPalProcessor(),
            PaymentMethod.Crypto => new CryptoProcessor(),
            _ => throw new ArgumentException("Invalid payment method")
        };
    }
}

// With DI (better approach)
public class PaymentProcessorFactory
{
    private readonly IServiceProvider _serviceProvider;
    
    public PaymentProcessorFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public IPaymentProcessor CreateProcessor(PaymentMethod method)
    {
        return method switch
        {
            PaymentMethod.CreditCard => 
                _serviceProvider.GetRequiredService<CreditCardProcessor>(),
            PaymentMethod.PayPal => 
                _serviceProvider.GetRequiredService<PayPalProcessor>(),
            PaymentMethod.Crypto => 
                _serviceProvider.GetRequiredService<CryptoProcessor>(),
            _ => throw new ArgumentException("Invalid payment method")
        };
    }
}

// Usage
public class OrderService
{
    private readonly PaymentProcessorFactory _factory;
    
    public OrderService(PaymentProcessorFactory factory)
    {
        _factory = factory;
    }
    
    public async Task<bool> ProcessOrderPayment(Order order)
    {
        var processor = _factory.CreateProcessor(order.PaymentMethod);
        var result = await processor.ProcessPayment(order.Total);
        return result.Success;
    }
}
```

---

### Q14: What is the Singleton pattern and when should you use it?

**Answer:**

**Singleton** ensures a class has only one instance with global access.

```csharp
// Thread-safe singleton (lazy initialization)
public sealed class Logger
{
    private static readonly Lazy<Logger> _instance = 
        new Lazy<Logger>(() => new Logger());
    
    private Logger()
    {
        // Private constructor
    }
    
    public static Logger Instance => _instance.Value;
    
    public void Log(string message)
    {
        Console.WriteLine($"[{DateTime.Now}] {message}");
    }
}

// Usage
Logger.Instance.Log("Application started");
```

**In .NET Core DI (preferred):**
```csharp
// Register as singleton
services.AddSingleton<ILogger, Logger>();

// Inject anywhere
public class MyService
{
    private readonly ILogger _logger;
    
    public MyService(ILogger logger)
    {
        _logger = logger;
    }
}
```

**When to use:**
- Configuration management
- Logging
- Caching
- Connection pools
- Thread-safe shared resources

**Caution:**
- Can make testing difficult
- Global state can cause issues
- Must be thread-safe
- Prefer DI container over manual singleton

---


---

# Code Samples

## 1. ASP.NET Core Web API with Azure Integration

### Complete Minimal API Example

```csharp
using Microsoft.EntityFrameworkCore;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

var builder = WebApplication.CreateBuilder(args);

// Add Azure Key Vault
if (!builder.Environment.IsDevelopment())
{
    var keyVaultUrl = new Uri(builder.Configuration["KeyVault:Url"]!);
    builder.Configuration.AddAzureKeyVault(keyVaultUrl, new DefaultAzureCredential());
}

// Configure services
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://myapp.azurewebsites.net")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

// Minimal API endpoints
app.MapGet("/api/users", async (IUserService userService) =>
{
    var users = await userService.GetAllUsersAsync();
    return Results.Ok(users);
})
.WithName("GetUsers")
.WithOpenApi();

app.MapGet("/api/users/{id}", async (int id, IUserService userService) =>
{
    var user = await userService.GetUserByIdAsync(id);
    return user is not null ? Results.Ok(user) : Results.NotFound();
})
.WithName("GetUser")
.WithOpenApi();

app.MapPost("/api/users", async (CreateUserRequest request, IUserService userService) =>
{
    var user = await userService.CreateUserAsync(request);
    return Results.Created($"/api/users/{user.Id}", user);
})
.WithName("CreateUser")
.WithOpenApi();

app.MapPut("/api/users/{id}", async (int id, UpdateUserRequest request, IUserService userService) =>
{
    var updated = await userService.UpdateUserAsync(id, request);
    return updated ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateUser")
.WithOpenApi();

app.MapDelete("/api/users/{id}", async (int id, IUserService userService) =>
{
    var deleted = await userService.DeleteUserAsync(id);
    return deleted ? Results.NoContent() : Results.NotFound();
})
.WithName("DeleteUser")
.WithOpenApi();

app.Run();
```

---

## 2. Azure Function with Dependency Injection

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

// Program.cs - Function App Startup
var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddHttpClient();
    })
    .Build();

host.Run();

// HTTP Triggered Function
public class OrderFunctions
{
    private readonly IOrderService _orderService;
    private readonly ILogger<OrderFunctions> _logger;
    
    public OrderFunctions(
        IOrderService orderService,
        ILogger<OrderFunctions> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }
    
    [Function("CreateOrder")]
    public async Task<HttpResponseData> CreateOrder(
        [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req)
    {
        _logger.LogInformation("Processing order creation request");
        
        try
        {
            var order = await req.ReadFromJsonAsync<Order>();
            
            if (order == null)
            {
                var badRequest = req.CreateResponse(HttpStatusCode.BadRequest);
                await badRequest.WriteStringAsync("Invalid order data");
                return badRequest;
            }
            
            var created = await _orderService.CreateOrderAsync(order);
            
            var response = req.CreateResponse(HttpStatusCode.Created);
            await response.WriteAsJsonAsync(created);
            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating order");
            
            var error = req.CreateResponse(HttpStatusCode.InternalServerError);
            await error.WriteStringAsync("Failed to create order");
            return error;
        }
    }
    
    [Function("GetOrder")]
    public async Task<HttpResponseData> GetOrder(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "orders/{id}")] 
        HttpRequestData req,
        int id)
    {
        _logger.LogInformation("Getting order {OrderId}", id);
        
        var order = await _orderService.GetOrderByIdAsync(id);
        
        if (order == null)
        {
            return req.CreateResponse(HttpStatusCode.NotFound);
        }
        
        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(order);
        return response;
    }
}

// Queue Triggered Function
public class QueueFunctions
{
    private readonly IEmailService _emailService;
    private readonly ILogger<QueueFunctions> _logger;
    
    public QueueFunctions(
        IEmailService emailService,
        ILogger<QueueFunctions> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }
    
    [Function("ProcessOrderQueue")]
    public async Task ProcessOrderQueue(
        [QueueTrigger("orders", Connection = "AzureWebJobsStorage")] 
        Order order)
    {
        _logger.LogInformation("Processing order {OrderId} from queue", order.Id);
        
        try
        {
            await _emailService.SendOrderConfirmationAsync(order);
            _logger.LogInformation("Order confirmation sent for {OrderId}", order.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send confirmation for order {OrderId}", order.Id);
            throw; // Will retry based on queue settings
        }
    }
}

// Timer Triggered Function
public class ScheduledFunctions
{
    private readonly IOrderService _orderService;
    private readonly ILogger<ScheduledFunctions> _logger;
    
    public ScheduledFunctions(
        IOrderService orderService,
        ILogger<ScheduledFunctions> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }
    
    [Function("CleanupExpiredOrders")]
    public async Task CleanupExpiredOrders(
        [TimerTrigger("0 0 2 * * *")] TimerInfo timer)  // 2 AM daily
    {
        _logger.LogInformation("Starting expired orders cleanup");
        
        var deletedCount = await _orderService.DeleteExpiredOrdersAsync();
        
        _logger.LogInformation("Cleanup completed. Deleted {Count} orders", deletedCount);
    }
}
```

---

## 3. Azure Service Bus Integration

```csharp
using Azure.Messaging.ServiceBus;
using Azure.Identity;
using Microsoft.Extensions.Configuration;

// Producer - Publishing Messages
public class OrderEventPublisher : IOrderEventPublisher
{
    private readonly ServiceBusClient _client;
    private readonly ServiceBusSender _sender;
    private readonly ILogger<OrderEventPublisher> _logger;
    
    public OrderEventPublisher(
        IConfiguration configuration,
        ILogger<OrderEventPublisher> logger)
    {
        var serviceBusNamespace = configuration["ServiceBus:Namespace"];
        var queueName = configuration["ServiceBus:QueueName"];
        
        // Use Managed Identity
        _client = new ServiceBusClient(
            $"{serviceBusNamespace}.servicebus.windows.net",
            new DefaultAzureCredential());
        
        _sender = _client.CreateSender(queueName);
        _logger = logger;
    }
    
    public async Task PublishOrderCreatedAsync(Order order)
    {
        try
        {
            var messageBody = JsonSerializer.Serialize(order);
            var message = new ServiceBusMessage(messageBody)
            {
                ContentType = "application/json",
                Subject = "OrderCreated",
                MessageId = Guid.NewGuid().ToString(),
                CorrelationId = order.Id.ToString()
            };
            
            // Add custom properties
            message.ApplicationProperties.Add("OrderId", order.Id);
            message.ApplicationProperties.Add("CustomerId", order.CustomerId);
            message.ApplicationProperties.Add("TotalAmount", order.TotalAmount);
            
            await _sender.SendMessageAsync(message);
            
            _logger.LogInformation(
                "Published OrderCreated event for order {OrderId}",
                order.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to publish order event");
            throw;
        }
    }
    
    public async ValueTask DisposeAsync()
    {
        await _sender.DisposeAsync();
        await _client.DisposeAsync();
    }
}

// Consumer - Processing Messages
public class OrderEventConsumer : BackgroundService
{
    private readonly ServiceBusProcessor _processor;
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<OrderEventConsumer> _logger;
    
    public OrderEventConsumer(
        IConfiguration configuration,
        IServiceProvider serviceProvider,
        ILogger<OrderEventConsumer> logger)
    {
        var serviceBusNamespace = configuration["ServiceBus:Namespace"];
        var queueName = configuration["ServiceBus:QueueName"];
        
        var client = new ServiceBusClient(
            $"{serviceBusNamespace}.servicebus.windows.net",
            new DefaultAzureCredential());
        
        _processor = client.CreateProcessor(queueName, new ServiceBusProcessorOptions
        {
            MaxConcurrentCalls = 2,
            AutoCompleteMessages = false,
            MaxAutoLockRenewalDuration = TimeSpan.FromMinutes(5)
        });
        
        _serviceProvider = serviceProvider;
        _logger = logger;
        
        _processor.ProcessMessageAsync += ProcessMessageAsync;
        _processor.ProcessErrorAsync += ProcessErrorAsync;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await _processor.StartProcessingAsync(stoppingToken);
        
        // Keep running until cancellation
        await Task.Delay(Timeout.Infinite, stoppingToken);
    }
    
    private async Task ProcessMessageAsync(ProcessMessageEventArgs args)
    {
        var messageBody = args.Message.Body.ToString();
        
        _logger.LogInformation(
            "Processing message {MessageId}: {Body}",
            args.Message.MessageId,
            messageBody);
        
        try
        {
            var order = JsonSerializer.Deserialize<Order>(messageBody);
            
            // Create scope for scoped services
            using var scope = _serviceProvider.CreateScope();
            var orderService = scope.ServiceProvider.GetRequiredService<IOrderService>();
            
            await orderService.ProcessOrderAsync(order);
            
            // Complete the message
            await args.CompleteMessageAsync(args.Message);
            
            _logger.LogInformation(
                "Successfully processed message {MessageId}",
                args.Message.MessageId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing message {MessageId}", args.Message.MessageId);
            
            // Abandon message to retry
            await args.AbandonMessageAsync(args.Message);
        }
    }
    
    private Task ProcessErrorAsync(ProcessErrorEventArgs args)
    {
        _logger.LogError(
            args.Exception,
            "Error from Service Bus: {ErrorSource} - {EntityPath}",
            args.ErrorSource,
            args.EntityPath);
        
        return Task.CompletedTask;
    }
    
    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        await _processor.StopProcessingAsync(cancellationToken);
        await _processor.DisposeAsync();
        await base.StopAsync(cancellationToken);
    }
}
```

---

## 4. Entity Framework Core with Best Practices

```csharp
// DbContext
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<User> Users => Set<User>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<Product> Products => Set<Product>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // User configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(256);
            
            entity.HasIndex(e => e.Email)
                .IsUnique();
            
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(100);
            
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(100);
            
            entity.HasMany(e => e.Orders)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        // Order configuration
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.OrderNumber)
                .IsRequired()
                .HasMaxLength(50);
            
            entity.Property(e => e.TotalAmount)
                .HasColumnType("decimal(18,2)");
            
            entity.Property(e => e.Status)
                .HasConversion<string>()
                .HasMaxLength(50);
            
            entity.HasMany(e => e.Items)
                .WithOne(e => e.Order)
                .HasForeignKey(e => e.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        // Product configuration
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(200);
            
            entity.Property(e => e.Price)
                .HasColumnType("decimal(18,2)");
            
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");
        });
        
        // Seed data
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Product 1", Price = 99.99m, Stock = 100 },
            new Product { Id = 2, Name = "Product 2", Price = 149.99m, Stock = 50 }
        );
    }
}

// Repository with best practices
public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<UserRepository> _logger;
    
    public UserRepository(
        ApplicationDbContext context,
        ILogger<UserRepository> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    public async Task<User?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()  // Read-only, better performance
            .Include(u => u.Orders)
                .ThenInclude(o => o.Items)
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
    }
    
    public async Task<IEnumerable<User>> GetAllAsync(
        int pageNumber = 1,
        int pageSize = 10,
        CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()
            .OrderBy(u => u.LastName)
            .ThenBy(u => u.FirstName)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }
    
    public async Task<User?> GetByEmailAsync(
        string email,
        CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(
                u => u.Email == email,
                cancellationToken);
    }
    
    public async Task<User> AddAsync(User user, CancellationToken cancellationToken = default)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);
        
        _logger.LogInformation("Created user {UserId}", user.Id);
        
        return user;
    }
    
    public async Task UpdateAsync(User user, CancellationToken cancellationToken = default)
    {
        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync(cancellationToken);
        
        _logger.LogInformation("Updated user {UserId}", user.Id);
    }
    
    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var user = await _context.Users.FindAsync(new object[] { id }, cancellationToken);
        
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync(cancellationToken);
            
            _logger.LogInformation("Deleted user {UserId}", id);
        }
    }
    
    public async Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AnyAsync(u => u.Id == id, cancellationToken);
    }
    
    public async Task<int> CountAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Users.CountAsync(cancellationToken);
    }
}
```

---

## 5. Global Error Handling Middleware

```csharp
public class GlobalExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;
    
    public GlobalExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<GlobalExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }
    
    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        
        var (statusCode, message) = exception switch
        {
            ValidationException validationEx => (
                StatusCodes.Status400BadRequest,
                validationEx.Message
            ),
            UnauthorizedAccessException => (
                StatusCodes.Status401Unauthorized,
                "Unauthorized access"
            ),
            NotFoundException notFoundEx => (
                StatusCodes.Status404NotFound,
                notFoundEx.Message
            ),
            InvalidOperationException => (
                StatusCodes.Status400BadRequest,
                "Invalid operation"
            ),
            _ => (
                StatusCodes.Status500InternalServerError,
                "An internal server error occurred"
            )
        };
        
        context.Response.StatusCode = statusCode;
        
        var response = new ErrorResponse
        {
            StatusCode = statusCode,
            Message = message,
            TraceId = context.TraceIdentifier,
            Timestamp = DateTime.UtcNow
        };
        
        await context.Response.WriteAsJsonAsync(response);
    }
}

public record ErrorResponse
{
    public int StatusCode { get; init; }
    public string Message { get; init; } = string.Empty;
    public string TraceId { get; init; } = string.Empty;
    public DateTime Timestamp { get; init; }
}

// Custom exceptions
public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
}

public class ValidationException : Exception
{
    public ValidationException(string message) : base(message) { }
}

// Register middleware
var app = builder.Build();
app.UseMiddleware<GlobalExceptionHandlingMiddleware>();
```

---

## 6. LINQ Advanced Examples

```csharp
public class LinqExamples
{
    private readonly List<Product> _products;
    private readonly List<Order> _orders;
    private readonly List<Customer> _customers;
    
    public void ComplexQueryExamples()
    {
        // 1. Group by with aggregate
        var salesByCategory = _products
            .GroupBy(p => p.Category)
            .Select(g => new
            {
                Category = g.Key,
                TotalProducts = g.Count(),
                AveragePrice = g.Average(p => p.Price),
                TotalValue = g.Sum(p => p.Price * p.Stock)
            })
            .OrderByDescending(x => x.TotalValue);
        
        // 2. Join with filtering
        var customerOrders = from c in _customers
                            join o in _orders on c.Id equals o.CustomerId
                            where o.Status == OrderStatus.Completed
                            select new
                            {
                                CustomerName = $"{c.FirstName} {c.LastName}",
                                OrderNumber = o.OrderNumber,
                                Total = o.TotalAmount,
                                OrderDate = o.CreatedAt
                            };
        
        // 3. Left outer join
        var customersWithOrders = from c in _customers
                                 join o in _orders on c.Id equals o.CustomerId into orderGroup
                                 from o in orderGroup.DefaultIfEmpty()
                                 select new
                                 {
                                     Customer = c.Email,
                                     OrderNumber = o?.OrderNumber ?? "No orders",
                                     Total = o?.TotalAmount ?? 0
                                 };
        
        // 4. Complex filtering with multiple conditions
        var filteredProducts = _products
            .Where(p => p.Price > 50 && p.Price < 200)
            .Where(p => p.Stock > 0)
            .Where(p => p.Category == "Electronics" || p.Category == "Computers")
            .OrderBy(p => p.Category)
            .ThenByDescending(p => p.Price);
        
        // 5. Window function equivalent (running total)
        var runningTotal = _orders
            .OrderBy(o => o.CreatedAt)
            .Select((o, index) => new
            {
                Order = o,
                RunningTotal = _orders
                    .OrderBy(x => x.CreatedAt)
                    .Take(index + 1)
                    .Sum(x => x.TotalAmount)
            });
        
        // 6. Pivot-like operation
        var salesPivot = _orders
            .SelectMany(o => o.Items)
            .GroupBy(i => new { i.Product.Category, Month = i.Order.CreatedAt.Month })
            .Select(g => new
            {
                Category = g.Key.Category,
                Month = g.Key.Month,
                TotalSales = g.Sum(i => i.Quantity * i.UnitPrice)
            });
        
        // 7. Top N per group
        var topProductsPerCategory = _products
            .GroupBy(p => p.Category)
            .SelectMany(g => g
                .OrderByDescending(p => p.Price)
                .Take(3)
                .Select(p => new
                {
                    Category = g.Key,
                    Product = p.Name,
                    Price = p.Price
                }));
        
        // 8. Conditional aggregation
        var categoryStats = _products
            .GroupBy(p => p.Category)
            .Select(g => new
            {
                Category = g.Key,
                TotalProducts = g.Count(),
                ExpensiveCount = g.Count(p => p.Price > 100),
                CheapCount = g.Count(p => p.Price <= 100),
                AverageExpensivePrice = g.Where(p => p.Price > 100)
                                         .Select(p => p.Price)
                                         .DefaultIfEmpty(0)
                                         .Average()
            });
        
        // 9. Custom comparer for Distinct
        var uniqueProducts = _products
            .DistinctBy(p => p.Name);  // C# 10+ DistinctBy
        
        // 10. Async LINQ with EF Core
        var recentOrders = await _context.Orders
            .Where(o => o.CreatedAt >= DateTime.UtcNow.AddDays(-30))
            .Include(o => o.Customer)
            .Include(o => o.Items)
                .ThenInclude(i => i.Product)
            .OrderByDescending(o => o.CreatedAt)
            .Take(100)
            .ToListAsync();
    }
    
    // Custom LINQ extension
    public static IEnumerable<T> WhereIf<T>(
        this IEnumerable<T> source,
        bool condition,
        Func<T, bool> predicate)
    {
        return condition ? source.Where(predicate) : source;
    }
    
    // Usage
    public IEnumerable<Product> SearchProducts(
        string? category,
        decimal? minPrice,
        decimal? maxPrice)
    {
        return _products
            .WhereIf(!string.IsNullOrEmpty(category), p => p.Category == category)
            .WhereIf(minPrice.HasValue, p => p.Price >= minPrice)
            .WhereIf(maxPrice.HasValue, p => p.Price <= maxPrice);
    }
}
```

---


---

# TL;DR Summary

## 🎯 Quick Reference

### Must-Know Concepts for Interviews

#### 1. **Language Fundamentals**
- **Value vs Reference Types**: Value types on stack, reference types on heap
- **Boxing/Unboxing**: Avoid - use generics instead
- **Nullable Types**: `int?` for optional values, null-coalescing `??`
- **String Immutability**: Strings are immutable, use `StringBuilder` for concatenation

#### 2. **OOP Principles**
- **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Four Pillars**: Encapsulation, Inheritance, Polymorphism, Abstraction
- **Abstract vs Interface**: Abstract for IS-A, Interface for CAN-DO
- **Sealed Classes**: Prevent inheritance

#### 3. **Collections & Generics**
```csharp
List<T>              // Dynamic array
Dictionary<K,V>      // Key-value pairs
HashSet<T>           // Unique items, O(1) lookup
Queue<T>             // FIFO
Stack<T>             // LIFO
ConcurrentBag<T>     // Thread-safe collection
```

#### 4. **LINQ Essentials**
```csharp
// Method syntax (preferred)
var result = collection
    .Where(x => x.Property > value)
    .OrderBy(x => x.Name)
    .Select(x => new { x.Id, x.Name })
    .ToList();

// Deferred execution - query not run until enumerated
// IEnumerable: in-memory, IQueryable: database
```

#### 5. **Async/Await**
```csharp
// I/O bound - use async/await (no new threads)
public async Task<string> GetDataAsync()
{
    return await httpClient.GetStringAsync(url);
}

// CPU bound - use Task.Run (thread pool)
public async Task<int> CalculateAsync()
{
    return await Task.Run(() => HeavyCalculation());
}

// ConfigureAwait(false) in library code
await SomeMethodAsync().ConfigureAwait(false);
```

#### 6. **Dependency Injection**
```csharp
// Transient: New instance every time
services.AddTransient<IEmailService, EmailService>();

// Scoped: One per request
services.AddScoped<IUserRepository, UserRepository>();

// Singleton: One for app lifetime
services.AddSingleton<IMemoryCache, MemoryCache>();
```

#### 7. **Delegates & Events**
```csharp
// Delegates - function pointers
Action<string> print = msg => Console.WriteLine(msg);
Func<int, int, int> add = (a, b) => a + b;

// Events - publisher/subscriber pattern
public event EventHandler<OrderEventArgs> OrderPlaced;
```

#### 8. **Exception Handling**
```csharp
try
{
    await ProcessAsync();
}
catch (SpecificException ex)
{
    _logger.LogError(ex, "Specific error");
    // Handle specific
}
catch (Exception ex)
{
    _logger.LogError(ex, "General error");
    throw; // Re-throw to preserve stack trace
}
finally
{
    // Cleanup
}
```

#### 9. **Memory Management**
- **GC Generations**: Gen 0 (new), Gen 1 (medium), Gen 2 (long-lived)
- **IDisposable**: Use for unmanaged resources
- **using Statement**: Ensures Dispose is called
- **Avoid GC.Collect()**: Let GC handle it
- **Memory Optimization**: Use `Span<T>`, `Memory<T>`, `ArrayPool<T>`

#### 10. **Modern C# Features (C# 10+)**
```csharp
// Records - immutable data
public record Person(string FirstName, string LastName);

// File-scoped namespaces
namespace MyApp.Services;

// Global usings
global using System;
global using System.Linq;

// Init-only properties
public int Id { get; init; }

// Pattern matching
var result = value switch
{
    > 0 => "Positive",
    < 0 => "Negative",
    _ => "Zero"
};

// Raw string literals
var json = """
    { "name": "John" }
    """;
```

---

## 🔒 Azure Cloud Security

### Key Vault Integration
```csharp
// Use Managed Identity - no credentials needed
var keyVaultUrl = new Uri("https://myvault.vault.azure.net/");
builder.Configuration.AddAzureKeyVault(
    keyVaultUrl,
    new DefaultAzureCredential());
```

### Managed Identity for Azure Resources
```csharp
// No connection strings needed
var blobClient = new BlobServiceClient(
    new Uri("https://mystorage.blob.core.windows.net"),
    new DefaultAzureCredential());
```

---

## 🏗️ Design Patterns

### Repository Pattern
```csharp
public interface IRepository<T> where T : class
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
}
```

### Unit of Work
```csharp
public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IOrderRepository Orders { get; }
    Task<int> SaveChangesAsync();
}
```

### Factory Pattern
```csharp
public interface IPaymentProcessor { }
public class PaymentProcessorFactory
{
    public IPaymentProcessor Create(PaymentMethod method)
    {
        return method switch
        {
            PaymentMethod.CreditCard => new CreditCardProcessor(),
            PaymentMethod.PayPal => new PayPalProcessor(),
            _ => throw new ArgumentException()
        };
    }
}
```

---

## ⚡ Performance Best Practices

### DO's ✅
- Use `async/await` for I/O operations
- Use `AsNoTracking()` for read-only EF queries
- Implement caching for frequently accessed data
- Use `StringBuilder` for string concatenation in loops
- Use `Span<T>` and `Memory<T>` for zero-allocation scenarios
- Implement pagination for large datasets
- Use compiled queries in EF Core for repeated queries
- Use `ValueTask<T>` for hot paths
- Leverage Azure managed services (App Insights, Key Vault)

### DON'Ts ❌
- Don't use `Task.Run` for I/O operations
- Don't call `.Result` or `.Wait()` on tasks (causes deadlocks)
- Don't use `GC.Collect()` in production
- Don't load entire datasets into memory
- Don't use `string` concatenation in loops
- Don't forget to dispose `IDisposable` resources
- Don't ignore cancellation tokens
- Don't use blocking calls in async methods
- Don't commit secrets to source control

---

## 🎓 Interview Preparation Checklist

### Week 1: Fundamentals
- [ ] Master value vs reference types
- [ ] Understand boxing/unboxing
- [ ] Practice OOP principles and SOLID
- [ ] Study collections and their time complexities

### Week 2: Advanced Features
- [ ] Deep dive into LINQ (deferred execution, IEnumerable vs IQueryable)
- [ ] Master async/await patterns
- [ ] Understand delegates, events, and lambda expressions
- [ ] Practice with generics and constraints

### Week 3: Enterprise Patterns
- [ ] Implement Repository and Unit of Work patterns
- [ ] Study common design patterns (Factory, Singleton, Strategy)
- [ ] Understand Dependency Injection thoroughly
- [ ] Practice exception handling strategies

### Week 4: Azure & Cloud
- [ ] Azure Functions development
- [ ] Azure Key Vault and Managed Identity
- [ ] Service Bus messaging patterns
- [ ] Application Insights integration
- [ ] Microservices patterns

### Week 5: Practice
- [ ] Build a complete ASP.NET Core Web API
- [ ] Implement authentication and authorization
- [ ] Write unit and integration tests
- [ ] Deploy to Azure App Service
- [ ] Optimize for performance

---

## �� Common Pitfalls to Avoid

### 1. **Async/Await Mistakes**
```csharp
// ❌ BAD: Blocking async code
var result = SomeAsyncMethod().Result;  // Deadlock risk!

// ✅ GOOD: Await properly
var result = await SomeAsyncMethod();
```

### 2. **Dispose Pattern**
```csharp
// ❌ BAD: Not disposing
var stream = new FileStream("file.txt", FileMode.Open);
// Use stream...
// Never disposed!

// ✅ GOOD: Use using
using var stream = new FileStream("file.txt", FileMode.Open);
// Automatically disposed
```

### 3. **LINQ Execution**
```csharp
// ❌ BAD: Multiple enumeration
var query = dbContext.Users.Where(u => u.Active);
var count = query.Count();   // Query 1
var list = query.ToList();   // Query 2

// ✅ GOOD: Single enumeration
var users = dbContext.Users.Where(u => u.Active).ToList();
var count = users.Count;
```

### 4. **String Concatenation**
```csharp
// ❌ BAD: String concatenation in loop
string result = "";
for (int i = 0; i < 1000; i++)
    result += i.ToString();

// ✅ GOOD: StringBuilder
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
    sb.Append(i);
var result = sb.ToString();
```

### 5. **Captive Dependencies**
```csharp
// ❌ BAD: Singleton holding Scoped service
public class SingletonService
{
    private readonly ScopedService _scoped;  // WRONG!
    public SingletonService(ScopedService scoped) { }
}

// ✅ GOOD: Use IServiceProvider
public class SingletonService
{
    private readonly IServiceProvider _provider;
    public SingletonService(IServiceProvider provider) { }
    
    public void DoWork()
    {
        using var scope = _provider.CreateScope();
        var scoped = scope.ServiceProvider.GetRequiredService<ScopedService>();
    }
}
```

---

## 📊 Time Complexity Reference

| Collection | Add | Remove | Contains | Access by Index |
|------------|-----|--------|----------|-----------------|
| List<T> | O(1) amortized | O(n) | O(n) | O(1) |
| Dictionary<K,V> | O(1) | O(1) | O(1) | N/A |
| HashSet<T> | O(1) | O(1) | O(1) | N/A |
| LinkedList<T> | O(1) | O(1)* | O(n) | O(n) |
| Queue<T> | O(1) | O(1) | O(n) | N/A |
| Stack<T> | O(1) | O(1) | O(n) | N/A |
| SortedSet<T> | O(log n) | O(log n) | O(log n) | N/A |

*If you have reference to the node

---

## 🎯 Key Takeaways

1. **Master the fundamentals**: Value vs reference types, OOP, SOLID principles
2. **Async is not parallel**: async/await is for I/O, not CPU-bound work
3. **LINQ is powerful**: Understand deferred execution and IEnumerable vs IQueryable
4. **DI is essential**: Know service lifetimes and avoid captive dependencies
5. **Security first**: Use Azure Key Vault and Managed Identity
6. **Design patterns matter**: Repository, Unit of Work, Factory are common
7. **Performance counts**: Profile, optimize, use right tools (Span, StringBuilder)
8. **Test your code**: Unit tests, integration tests, and mocking
9. **Follow conventions**: Naming, code organization, error handling
10. **Keep learning**: C# evolves - stay current with new features

---

## 📚 Recommended Resources

### Official Documentation
- [Microsoft C# Documentation](https://docs.microsoft.com/en-us/dotnet/csharp/)
- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [Azure SDK for .NET](https://docs.microsoft.com/en-us/dotnet/azure/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)

### Books
- "C# in Depth" by Jon Skeet
- "Pro C# 10 with .NET 6" by Andrew Troelsen
- "Clean Code" by Robert C. Martin
- "Design Patterns" by Gang of Four

### Practice Platforms
- LeetCode (C# problems)
- HackerRank
- Codewars
- Azure Learning Paths

---

## 🎬 Final Interview Tips

1. **Explain your thinking**: Walk through your thought process
2. **Ask clarifying questions**: Don't make assumptions
3. **Consider edge cases**: Null checks, empty collections, boundaries
4. **Write clean code**: Readable, maintainable, following conventions
5. **Know trade-offs**: Every solution has pros and cons
6. **Be honest**: Say "I don't know" rather than bluff
7. **Show enthusiasm**: Passion for technology matters
8. **Discuss real experience**: Share projects you've worked on
9. **Handle feedback gracefully**: Interviewers may challenge your solution
10. **Practice coding**: Write code daily, not just read about it

---

## 🚀 You're Ready!

This guide covers the essential C# concepts for Azure Cloud FullStack Developer interviews. Remember:

- **Fundamentals are key**: Master the basics before advanced topics
- **Practice regularly**: Coding is a skill that requires practice
- **Build projects**: Apply knowledge to real-world scenarios
- **Stay curious**: Technology evolves, keep learning
- **Be confident**: You've prepared well, trust your knowledge

**Good luck with your interviews!** 🎉

---

**Document Metadata:**
- **Last Updated**: November 19, 2025
- **Version**: 1.0
- **Target**: Azure Cloud FullStack Developer Interviews
- **Total Sections**: 5 (Introduction, Core Concepts, Q&A, Code Samples, TL;DR)
- **Total Questions Covered**: 14+ with detailed answers
- **Code Examples**: 20+ production-ready samples
- **Estimated Reading Time**: 3-4 hours
- **Practice Time Recommended**: 25-35 hours

---

*Happy coding and best wishes for your career! 🎯*

