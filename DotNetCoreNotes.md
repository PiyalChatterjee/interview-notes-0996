# 🔷 .NET Core Interview Preparation: Complete Cheat Sheet

**Last Updated:** November 19, 2025  
**Difficulty Level:** Beginner to Advanced  
**Estimated Prep Time:** 25-30 hours  
**Target Position:** Application Developer - Azure Cloud FullStack

---

## 📋 Table of Contents

1. [Part 1: .NET Core Fundamentals](#part-1-net-core-fundamentals)
2. [Part 2: Dependency Injection & Services](#part-2-dependency-injection--services)
3. [Part 3: Configuration & Environment](#part-3-configuration--environment)
4. [Part 4: Middleware & Request Pipeline](#part-4-middleware--request-pipeline)
5. [Part 5: Entity Framework Core](#part-5-entity-framework-core)
6. [Part 6: Performance & Optimization](#part-6-performance--optimization)
7. [Part 7: 30+ MCQs](#part-7-30-mcqs)
8. [Part 8: 10+ Subjective Q&A](#part-8-10-subjective-qa)
9. [Real-Life Scenario-Based Questions](#-real-life-scenario-based-questions)
10. [TLDR Summary](#tldr-summary)

---

# Part 1: .NET Core Fundamentals

## 1. .NET Core Architecture & Runtime

### Explanation:

.NET Core is a cross-platform, open-source framework that provides a unified development platform for building various types of applications. Understanding its architecture is crucial for full-stack development roles.

### Core Components Deep Dive:

**.NET Core Runtime Components:**

```csharp
// Program.cs - Entry Point in .NET 6+
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

**Key Architecture Concepts:**

- **CoreCLR**: Cross-platform runtime that manages memory, garbage collection, and JIT compilation
- **Base Class Libraries (BCL)**: Fundamental classes like collections, I/O, threading
- **Framework Libraries**: Higher-level APIs like ASP.NET Core, Entity Framework Core
- **Application Model**: How applications are structured and executed

### Cross-Platform Capabilities:

```csharp
// Platform-specific code handling
using System.Runtime.InteropServices;

public class PlatformService
{
    public string GetPlatformInfo()
    {
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            return "Running on Windows";
        }
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
        {
            return "Running on Linux";
        }
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
        {
            return "Running on macOS";
        }

        return "Unknown platform";
    }

    public string GetRuntimeInfo()
    {
        return $"Framework: {RuntimeInformation.FrameworkDescription}, " +
               $"OS: {RuntimeInformation.OSDescription}, " +
               $"Architecture: {RuntimeInformation.OSArchitecture}";
    }
}
```

## 2. Project Structure & SDK

### Explanation:

.NET Core projects use a simplified project file format (.csproj) and follow specific conventions for organizing code, resources, and dependencies.

### Modern Project Structure:

```xml
<!-- .csproj file structure -->
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <UserSecretsId>aspnet-MyApp-12345</UserSecretsId>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
    <PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="12.0.1" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\MyApp.Core\MyApp.Core.csproj" />
    <ProjectReference Include="..\MyApp.Infrastructure\MyApp.Infrastructure.csproj" />
  </ItemGroup>

</Project>
```

**Folder Structure Best Practices:**

```
MyApp/
├── src/
│   ├── MyApp.API/                 # Web API project
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Program.cs
│   │   └── appsettings.json
│   ├── MyApp.Core/                # Business logic
│   │   ├── Entities/
│   │   ├── Interfaces/
│   │   └── Services/
│   └── MyApp.Infrastructure/      # Data access
│       ├── Data/
│       ├── Repositories/
│       └── Migrations/
├── tests/
│   ├── MyApp.UnitTests/
│   └── MyApp.IntegrationTests/
└── docs/
```

## 3. Hosting & Application Lifecycle

### Explanation:

Understanding how .NET Core applications start, run, and shut down is essential for building robust applications, especially in cloud environments.

### Host Builder Configuration:

```csharp
// Program.cs with detailed configuration
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Configure services
builder.Services.AddControllers(options =>
{
    options.Filters.Add<GlobalExceptionFilter>();
});

builder.Services.AddHealthChecks()
    .AddSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));

// Add custom services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<IMemoryCache, MemoryCache>();

var app = builder.Build();

// Application lifecycle events
app.Lifetime.ApplicationStarted.Register(() =>
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogInformation("Application started successfully");
});

app.Lifetime.ApplicationStopping.Register(() =>
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogInformation("Application is stopping");
});

app.Run();
```

### Background Services:

```csharp
// Background service implementation
public class EmailBackgroundService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<EmailBackgroundService> _logger;

    public EmailBackgroundService(
        IServiceProvider serviceProvider,
        ILogger<EmailBackgroundService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();

                await emailService.ProcessPendingEmailsAsync(stoppingToken);

                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in email background service");
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}

// Register background service
builder.Services.AddHostedService<EmailBackgroundService>();
```

---

# Part 2: Dependency Injection & Services

## 1. Built-in DI Container

### Explanation:

.NET Core includes a built-in dependency injection container that supports constructor injection, service lifetimes, and complex object graphs. Understanding DI is crucial for building testable and maintainable applications.

### Service Lifetimes:

```csharp
// Service registration with different lifetimes
public void ConfigureServices(IServiceCollection services)
{
    // Singleton - Created once and reused throughout application lifetime
    services.AddSingleton<IConfiguration, Configuration>();
    services.AddSingleton<ICacheService, RedisCacheService>();

    // Scoped - Created once per request/scope
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<IUnitOfWork, UnitOfWork>();

    // Transient - Created every time it's requested
    services.AddTransient<IEmailService, EmailService>();
    services.AddTransient<IValidator<User>, UserValidator>();

    // Factory pattern for complex scenarios
    services.AddTransient<Func<string, INotificationService>>(serviceProvider => key =>
    {
        return key switch
        {
            "email" => serviceProvider.GetService<IEmailNotificationService>(),
            "sms" => serviceProvider.GetService<ISmsNotificationService>(),
            _ => throw new KeyNotFoundException($"Service {key} not found")
        };
    });
}
```

### Advanced DI Patterns:

```csharp
// Service with multiple implementations
public interface IPaymentProcessor
{
    Task<PaymentResult> ProcessAsync(PaymentRequest request);
    bool CanProcess(PaymentMethod method);
}

public class CreditCardProcessor : IPaymentProcessor
{
    public async Task<PaymentResult> ProcessAsync(PaymentRequest request)
    {
        // Credit card processing logic
        await Task.Delay(1000); // Simulate API call
        return new PaymentResult { Success = true, TransactionId = Guid.NewGuid().ToString() };
    }

    public bool CanProcess(PaymentMethod method) => method == PaymentMethod.CreditCard;
}

public class PayPalProcessor : IPaymentProcessor
{
    public async Task<PaymentResult> ProcessAsync(PaymentRequest request)
    {
        // PayPal processing logic
        await Task.Delay(800);
        return new PaymentResult { Success = true, TransactionId = Guid.NewGuid().ToString() };
    }

    public bool CanProcess(PaymentMethod method) => method == PaymentMethod.PayPal;
}

// Strategy pattern with DI
public class PaymentService
{
    private readonly IEnumerable<IPaymentProcessor> _processors;

    public PaymentService(IEnumerable<IPaymentProcessor> processors)
    {
        _processors = processors;
    }

    public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
    {
        var processor = _processors.FirstOrDefault(p => p.CanProcess(request.Method));
        if (processor == null)
        {
            throw new NotSupportedException($"Payment method {request.Method} not supported");
        }

        return await processor.ProcessAsync(request);
    }
}

// Registration
services.AddTransient<IPaymentProcessor, CreditCardProcessor>();
services.AddTransient<IPaymentProcessor, PayPalProcessor>();
services.AddTransient<PaymentService>();
```

## 2. Service Registration Patterns

### Explanation:

Different patterns for registering services help organize and manage complex applications with multiple implementations and conditional registrations.

### Conditional Registration:

```csharp
// Environment-based registration
public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    var environment = configuration["Environment"];

    if (environment == "Development")
    {
        services.AddTransient<IEmailService, FakeEmailService>();
        services.AddTransient<IPaymentService, MockPaymentService>();
    }
    else
    {
        services.AddTransient<IEmailService, SendGridEmailService>();
        services.AddTransient<IPaymentService, StripePaymentService>();
    }

    // Feature flag based registration
    var useRedisCache = configuration.GetValue<bool>("Features:UseRedisCache");
    if (useRedisCache)
    {
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = configuration.GetConnectionString("Redis");
        });
        services.AddTransient<ICacheService, RedisCacheService>();
    }
    else
    {
        services.AddMemoryCache();
        services.AddTransient<ICacheService, MemoryCacheService>();
    }
}
```

### Extension Methods for Clean Registration:

```csharp
// ServiceCollectionExtensions.cs
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Core services
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IOrderService, OrderService>();

        return services;
    }

    public static IServiceCollection AddRepositories(
        this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }

    public static IServiceCollection AddExternalServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // HTTP clients
        services.AddHttpClient<IWeatherService, WeatherService>(client =>
        {
            client.BaseAddress = new Uri(configuration["ExternalApis:WeatherApi:BaseUrl"]);
            client.DefaultRequestHeaders.Add("ApiKey", configuration["ExternalApis:WeatherApi:Key"]);
        });

        return services;
    }
}

// Usage in Program.cs
builder.Services
    .AddApplicationServices(builder.Configuration)
    .AddRepositories()
    .AddExternalServices(builder.Configuration);
```

---

# Part 3: Configuration & Environment

## 1. Configuration System

### Explanation:

.NET Core's configuration system is hierarchical and supports multiple sources like JSON files, environment variables, command line arguments, and cloud-based configuration services.

### Configuration Sources & Hierarchy:

```csharp
// Program.cs - Configuration setup
var builder = WebApplication.CreateBuilder(args);

// Add configuration sources in order of priority (last wins)
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables(prefix: "MYAPP_")
    .AddCommandLine(args)
    .AddUserSecrets<Program>() // Only in development
    .AddAzureKeyVault(builder.Configuration["KeyVaultUrl"]); // Production secrets

var app = builder.Build();
```

### Configuration Models & Options Pattern:

```csharp
// Configuration models
public class DatabaseOptions
{
    public const string SectionName = "Database";

    public string ConnectionString { get; set; } = string.Empty;
    public int CommandTimeout { get; set; } = 30;
    public bool EnableSensitiveDataLogging { get; set; } = false;
    public RetryOptions Retry { get; set; } = new();
}

public class RetryOptions
{
    public int MaxRetries { get; set; } = 3;
    public TimeSpan Delay { get; set; } = TimeSpan.FromSeconds(1);
}

public class EmailOptions
{
    public const string SectionName = "Email";

    public string SmtpServer { get; set; } = string.Empty;
    public int Port { get; set; } = 587;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public bool EnableSsl { get; set; } = true;
    public string FromAddress { get; set; } = string.Empty;
    public string FromName { get; set; } = string.Empty;
}

// appsettings.json
{
  "Database": {
    "ConnectionString": "Server=localhost;Database=MyApp;Trusted_Connection=true;",
    "CommandTimeout": 60,
    "EnableSensitiveDataLogging": false,
    "Retry": {
      "MaxRetries": 5,
      "Delay": "00:00:02"
    }
  },
  "Email": {
    "SmtpServer": "smtp.gmail.com",
    "Port": 587,
    "Username": "your-email@gmail.com",
    "Password": "", // Use user secrets or env variables
    "EnableSsl": true,
    "FromAddress": "noreply@myapp.com",
    "FromName": "MyApp Notifications"
  }
}

// Service registration with validation
builder.Services
    .Configure<DatabaseOptions>(builder.Configuration.GetSection(DatabaseOptions.SectionName))
    .Configure<EmailOptions>(builder.Configuration.GetSection(EmailOptions.SectionName));

// Add validation
builder.Services.PostConfigure<DatabaseOptions>(options =>
{
    if (string.IsNullOrEmpty(options.ConnectionString))
    {
        throw new InvalidOperationException("Database connection string is required");
    }
});
```

### Using Configuration in Services:

```csharp
// Service consuming configuration
public class EmailService : IEmailService
{
    private readonly EmailOptions _emailOptions;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<EmailOptions> emailOptions, ILogger<EmailService> logger)
    {
        _emailOptions = emailOptions.Value;
        _logger = logger;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        try
        {
            using var client = new SmtpClient(_emailOptions.SmtpServer, _emailOptions.Port);
            client.EnableSsl = _emailOptions.EnableSsl;
            client.Credentials = new NetworkCredential(_emailOptions.Username, _emailOptions.Password);

            var message = new MailMessage(_emailOptions.FromAddress, to, subject, body)
            {
                IsBodyHtml = true
            };

            await client.SendMailAsync(message);
            _logger.LogInformation("Email sent successfully to {To}", to);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {To}", to);
            throw;
        }
    }
}

// Alternative: IOptionsMonitor for runtime changes
public class ConfigurableService
{
    private readonly IOptionsMonitor<DatabaseOptions> _databaseOptions;
    private readonly IDisposable _optionsChangeListener;

    public ConfigurableService(IOptionsMonitor<DatabaseOptions> databaseOptions)
    {
        _databaseOptions = databaseOptions;

        // Listen for configuration changes
        _optionsChangeListener = _databaseOptions.OnChange((options, name) =>
        {
            // Handle configuration change
            UpdateConnectionString(options.ConnectionString);
        });
    }

    private void UpdateConnectionString(string newConnectionString)
    {
        // Update internal state based on new configuration
    }

    public void Dispose()
    {
        _optionsChangeListener?.Dispose();
    }
}
```

## 2. Environment Management

### Explanation:

Managing different environments (Development, Staging, Production) with appropriate configurations, logging levels, and feature flags.

### Environment-Specific Configuration:

```csharp
// Startup configuration based on environment
public class Startup
{
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _environment;

    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        _configuration = configuration;
        _environment = environment;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // Development-specific services
        if (_environment.IsDevelopment())
        {
            services.AddDatabaseDeveloperPageExceptionFilter();
            services.AddTransient<IEmailService, FakeEmailService>();
        }

        // Production-specific services
        if (_environment.IsProduction())
        {
            services.AddApplicationInsightsTelemetry();
            services.AddTransient<IEmailService, SendGridEmailService>();
        }

        // Staging-specific services
        if (_environment.IsStaging())
        {
            services.AddTransient<IEmailService, TestEmailService>();
        }
    }

    public void Configure(IApplicationBuilder app)
    {
        if (_environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }
    }
}
```

---

# Part 7: 30+ MCQs

## Multiple Choice Questions with Detailed Explanations

### 1. **What is the primary difference between .NET Framework and .NET Core?**

A) .NET Core only supports C#  
B) .NET Framework is cross-platform  
**C) .NET Core is cross-platform and open-source** ✅  
D) There is no significant difference

**Explanation:** .NET Core was designed to be cross-platform (Windows, Linux, macOS), open-source, and modular, while .NET Framework is Windows-only and closed-source.

---

### 2. **Which service lifetime creates a new instance every time it's requested?**

A) Singleton  
B) Scoped  
**C) Transient** ✅  
D) Instance

**Explanation:** Transient services are created each time they are requested. Singleton creates one instance for the application lifetime, and Scoped creates one instance per request/scope.

---

### 3. **What is the correct way to register a service with dependency injection in .NET Core?**

A) `services.Register<IUserService, UserService>()`  
**B) `services.AddScoped<IUserService, UserService>()`** ✅  
C) `services.Inject<IUserService, UserService>()`  
D) `services.Create<IUserService, UserService>()`

**Explanation:** The correct method is `AddScoped<TInterface, TImplementation>()`. Other options include `AddTransient` and `AddSingleton`.

---

### 4. **Which configuration source has the highest priority by default in .NET Core?**

A) appsettings.json  
B) Environment variables  
**C) Command line arguments** ✅  
D) User secrets

**Explanation:** Command line arguments have the highest priority in the default configuration hierarchy, followed by environment variables, then JSON files.

---

### 5. **What does the `[ApiController]` attribute provide?**

**A) Automatic model validation and better error responses** ✅  
B) Only routing capabilities  
C) Only JSON serialization  
D) Database connection management

**Explanation:** The `[ApiController]` attribute enables automatic model validation, inference of binding sources, and standardized error responses for Web API controllers.

---

### 6. **In Entity Framework Core, what is the purpose of DbContext?**

A) Only database connection management  
**B) Represents a session with the database and provides DbSet properties** ✅  
C) Only query execution  
D) Only migration management

**Explanation:** DbContext represents a session with the database, provides DbSet properties for entities, handles change tracking, and manages database operations.

---

### 7. **What is middleware in ASP.NET Core?**

**A) Components that form the request processing pipeline** ✅  
B) Only authentication components  
C) Database access layer  
D) Client-side JavaScript

**Explanation:** Middleware components form the request processing pipeline, where each component can process HTTP requests and responses and pass control to the next component.

---

### 8. **Which pattern is commonly used for data access in .NET Core applications?**

A) Active Record  
**B) Repository Pattern** ✅  
C) Singleton Pattern  
D) Factory Pattern

**Explanation:** The Repository pattern is commonly used to encapsulate data access logic and provide a more object-oriented view of the persistence layer.

---

### 9. **What is the purpose of IHostedService?**

A) Only web hosting  
**B) Running background tasks in hosted applications** ✅  
C) Only dependency injection  
D) Only configuration management

**Explanation:** IHostedService allows you to run background tasks in hosted applications, such as processing queues, scheduled tasks, or continuous services.

---

### 10. **In .NET Core, what does "Kestrel" refer to?**

A) A database provider  
**B) A cross-platform web server** ✅  
C) A logging framework  
D) A testing framework

**Explanation:** Kestrel is the default, cross-platform HTTP server implementation for ASP.NET Core applications.

---

# Part 8: 10+ Subjective Q&A

## Comprehensive Q&A with Detailed Answers

### **Q1: Explain the dependency injection container in .NET Core and describe the three service lifetimes with real-world examples.**

**Answer:**

The .NET Core DI container is a built-in inversion of control (IoC) container that manages object creation and lifetime. It supports constructor injection, property injection (limited), and method injection.

**Three Service Lifetimes:**

1. **Singleton Lifetime:**
   - Creates one instance for the entire application lifetime
   - Shared across all requests and users
   - **Real-world example:** Configuration settings, logging services, caching services

```csharp
// Registration
services.AddSingleton<IConfiguration, Configuration>();
services.AddSingleton<IMemoryCache, MemoryCache>();

// Usage scenario: Application-wide cache
public class ProductCacheService
{
    private readonly IMemoryCache _cache;

    public ProductCacheService(IMemoryCache cache) => _cache = cache;

    public async Task<Product> GetProductAsync(int id)
    {
        return await _cache.GetOrCreateAsync($"product-{id}", async factory =>
        {
            factory.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);
            return await _productRepository.GetByIdAsync(id);
        });
    }
}
```

2. **Scoped Lifetime:**
   - Creates one instance per request/scope
   - Same instance within a single request
   - **Real-world example:** Database contexts, repositories, business services

```csharp
// Registration
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<IUserService, UserService>();

// Usage scenario: Request-scoped transaction
public class OrderService
{
    private readonly IUnitOfWork _unitOfWork;

    public async Task<Order> CreateOrderAsync(CreateOrderRequest request)
    {
        // All repositories in this request share the same DB context
        using var transaction = await _unitOfWork.BeginTransactionAsync();
        try
        {
            var order = await _orderRepository.CreateAsync(request.Order);
            await _inventoryRepository.UpdateStockAsync(request.Items);
            await _unitOfWork.CommitAsync();
            return order;
        }
        catch
        {
            await _unitOfWork.RollbackAsync();
            throw;
        }
    }
}
```

3. **Transient Lifetime:**
   - Creates new instance every time requested
   - No sharing between consumers
   - **Real-world example:** Lightweight services, stateless operations, validators

```csharp
// Registration
services.AddTransient<IEmailService, EmailService>();
services.AddTransient<IValidator<User>, UserValidator>();

// Usage scenario: Stateless email service
public class EmailService : IEmailService
{
    public async Task SendWelcomeEmailAsync(User user)
    {
        // New instance each time, no shared state
        var emailContent = GenerateWelcomeEmail(user);
        await SendEmailAsync(user.Email, emailContent);
    }
}
```

---

### **Q2: How does the configuration system work in .NET Core? Explain the hierarchy and provide examples of different configuration sources.**

**Answer:**

The .NET Core configuration system uses a hierarchical approach where later sources override earlier ones. The system builds a unified configuration from multiple sources.

**Configuration Hierarchy (last wins):**

```csharp
var builder = WebApplication.CreateBuilder(args);

// Configuration sources in order of priority
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)           // 1. Base settings
    .AddJsonFile($"appsettings.{env}.json", optional: true, reloadOnChange: true)    // 2. Environment-specific
    .AddEnvironmentVariables(prefix: "MYAPP_")                                        // 3. Environment variables
    .AddCommandLine(args)                                                             // 4. Command line (highest priority)
    .AddUserSecrets<Program>()                                                        // Development only
    .AddAzureKeyVault(keyVaultUrl);                                                   // Production secrets
```

**Configuration Sources Examples:**

1. **JSON Files:**

```json
// appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyApp;Integrated Security=true;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "Email": {
    "SmtpServer": "smtp.gmail.com",
    "Port": 587
  }
}

// appsettings.Production.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=prod-server;Database=MyApp;User Id=sa;Password=***;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  }
}
```

2. **Environment Variables:**

```bash
# Override JSON settings
MYAPP_ConnectionStrings__DefaultConnection="Server=prod;Database=MyApp;..."
MYAPP_Email__SmtpServer="smtp.sendgrid.net"
MYAPP_Email__Port="587"
```

3. **Command Line Arguments:**

```bash
dotnet run --ConnectionStrings:DefaultConnection="Server=local;Database=Test;"
```

**Options Pattern Implementation:**

```csharp
// Configuration model
public class EmailConfiguration
{
    public const string SectionName = "Email";

    [Required]
    public string SmtpServer { get; set; }

    [Range(1, 65535)]
    public int Port { get; set; } = 587;

    public string Username { get; set; }
    public string Password { get; set; }
    public bool EnableSsl { get; set; } = true;
}

// Service registration with validation
services.Configure<EmailConfiguration>(
    configuration.GetSection(EmailConfiguration.SectionName));

services.PostConfigure<EmailConfiguration>(options =>
{
    if (string.IsNullOrEmpty(options.SmtpServer))
        throw new InvalidOperationException("SMTP server is required");
});

// Service usage
public class EmailService
{
    private readonly EmailConfiguration _config;

    public EmailService(IOptions<EmailConfiguration> config)
    {
        _config = config.Value;
    }

    public async Task SendAsync(string to, string subject, string body)
    {
        using var client = new SmtpClient(_config.SmtpServer, _config.Port);
        // Use configuration...
    }
}
```

---

### **Q3: Describe the middleware pipeline in ASP.NET Core. How does request processing work, and how do you create custom middleware?**

**Answer:**

The middleware pipeline in ASP.NET Core processes HTTP requests through a series of components in a specific order. Each middleware can handle the request, modify it, pass it to the next middleware, or short-circuit the pipeline.

**Pipeline Flow:**

```
Request → Middleware1 → Middleware2 → Middleware3 → Response
   ↑                                                     ↓
   └─────────── Response flows back ←───────────────────┘
```

**Built-in Middleware Order:**

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // 1. Exception handling (should be first)
    if (env.IsDevelopment())
        app.UseDeveloperExceptionPage();
    else
        app.UseExceptionHandler("/Error");

    // 2. HTTPS redirection
    app.UseHttpsRedirection();

    // 3. Static files
    app.UseStaticFiles();

    // 4. Routing
    app.UseRouting();

    // 5. Authentication
    app.UseAuthentication();

    // 6. Authorization
    app.UseAuthorization();

    // 7. Custom middleware
    app.UseMiddleware<RequestLoggingMiddleware>();

    // 8. Endpoints (should be last)
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

**Custom Middleware Implementation:**

```csharp
// Method 1: Middleware class
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        var request = context.Request;

        _logger.LogInformation("Request started: {Method} {Path} from {RemoteIp}",
            request.Method, request.Path, context.Connection.RemoteIpAddress);

        try
        {
            // Call next middleware
            await _next(context);
        }
        finally
        {
            stopwatch.Stop();
            _logger.LogInformation("Request completed: {Method} {Path} - {StatusCode} in {ElapsedMs}ms",
                request.Method, request.Path, context.Response.StatusCode, stopwatch.ElapsedMilliseconds);
        }
    }
}

// Method 2: Inline middleware
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Custom-Header", "MyApp");
    await next();
});

// Method 3: Conditional middleware
app.UseWhen(context => context.Request.Path.StartsWithSegments("/api"),
    appBuilder => appBuilder.UseMiddleware<ApiKeyMiddleware>());
```

**Advanced Middleware Example:**

```csharp
public class ApiKeyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;

    public ApiKeyMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Skip authentication for certain paths
        if (context.Request.Path.StartsWithSegments("/health") ||
            context.Request.Path.StartsWithSegments("/swagger"))
        {
            await _next(context);
            return;
        }

        if (!context.Request.Headers.TryGetValue("X-API-Key", out var apiKey))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("API Key is missing");
            return;
        }

        var validApiKey = _configuration["ApiKey"];
        if (apiKey != validApiKey)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Invalid API Key");
            return;
        }

        await _next(context);
    }
}
```

---

# 🎯 Real-Life Scenario-Based Questions

## Scenario 1: **High-Traffic E-commerce Application**

**Situation:** You're building an e-commerce platform expecting 10,000+ concurrent users. The application needs to handle product catalog, user authentication, shopping cart, and order processing.

**Q: How would you architect the .NET Core application for performance and scalability?**

**Answer:**

```csharp
// 1. Microservices Architecture with API Gateway
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Distributed caching for session/cart data
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = Configuration.GetConnectionString("Redis");
            options.InstanceName = "EcommerceApp";
        });

        // Database connection with connection pooling
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(connectionString, sqlOptions =>
            {
                sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 3,
                    maxRetryDelay: TimeSpan.FromSeconds(5),
                    errorNumbersToAdd: null);
            });
        }, ServiceLifetime.Scoped);

        // HTTP clients for external services
        services.AddHttpClient<IPaymentService, PaymentService>()
            .AddPolicyHandler(GetRetryPolicy())
            .AddPolicyHandler(GetCircuitBreakerPolicy());

        // Background services for async processing
        services.AddHostedService<OrderProcessingService>();
        services.AddHostedService<EmailNotificationService>();

        // Memory cache for frequently accessed data
        services.AddMemoryCache();
        services.AddSingleton<IProductCacheService, ProductCacheService>();
    }
}

// 2. Optimized Product Service with Caching
public class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly IMemoryCache _memoryCache;
    private readonly IDistributedCache _distributedCache;

    public async Task<Product> GetProductAsync(int id)
    {
        // L1 Cache: Memory Cache (fastest)
        var cacheKey = $"product-{id}";
        if (_memoryCache.TryGetValue(cacheKey, out Product cachedProduct))
            return cachedProduct;

        // L2 Cache: Distributed Cache
        var productJson = await _distributedCache.GetStringAsync(cacheKey);
        if (!string.IsNullOrEmpty(productJson))
        {
            var product = JsonSerializer.Deserialize<Product>(productJson);
            _memoryCache.Set(cacheKey, product, TimeSpan.FromMinutes(5));
            return product;
        }

        // L3: Database
        var dbProduct = await _repository.GetByIdAsync(id);
        if (dbProduct != null)
        {
            var serializedProduct = JsonSerializer.Serialize(dbProduct);
            await _distributedCache.SetStringAsync(cacheKey, serializedProduct,
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
                });
            _memoryCache.Set(cacheKey, dbProduct, TimeSpan.FromMinutes(5));
        }

        return dbProduct;
    }
}

// 3. Async Order Processing
public class OrderProcessingService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<OrderProcessingService> _logger;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var orderQueue = scope.ServiceProvider.GetRequiredService<IOrderQueue>();

                var pendingOrders = await orderQueue.DequeueBatchAsync(10);
                var tasks = pendingOrders.Select(ProcessOrderAsync);
                await Task.WhenAll(tasks);

                await Task.Delay(1000, stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing orders");
                await Task.Delay(5000, stoppingToken);
            }
        }
    }
}
```

## Scenario 2: **Microservices Communication**

**Situation:** You have multiple .NET Core microservices that need to communicate reliably, handle failures gracefully, and maintain data consistency.

**Q: How would you implement inter-service communication with resilience patterns?**

**Answer:**

```csharp
// 1. HTTP Client with Polly for Resilience
public class UserService
{
    private readonly HttpClient _httpClient;
    private readonly IAsyncPolicy<HttpResponseMessage> _retryPolicy;

    public UserService(HttpClient httpClient)
    {
        _httpClient = httpClient;

        _retryPolicy = Policy
            .HandleResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode)
            .Or<HttpRequestException>()
            .WaitAndRetryAsync(
                retryCount: 3,
                sleepDurationProvider: retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                onRetry: (outcome, timespan, retryCount, context) =>
                {
                    _logger.LogWarning("Retry {RetryCount} for {Service} after {Delay}ms",
                        retryCount, context.OperationKey, timespan.TotalMilliseconds);
                });
    }

    public async Task<UserProfile> GetUserProfileAsync(int userId)
    {
        var response = await _retryPolicy.ExecuteAsync(async () =>
        {
            return await _httpClient.GetAsync($"/api/users/{userId}");
        });

        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<UserProfile>(content);
        }

        throw new ServiceUnavailableException($"User service returned {response.StatusCode}");
    }
}

// 2. Message-Based Communication with RabbitMQ
public class OrderCreatedHandler : INotificationHandler<OrderCreatedEvent>
{
    private readonly IMessageBus _messageBus;
    private readonly ILogger<OrderCreatedHandler> _logger;

    public async Task Handle(OrderCreatedEvent notification, CancellationToken cancellationToken)
    {
        try
        {
            // Publish events to multiple services
            await Task.WhenAll(
                _messageBus.PublishAsync(new InventoryUpdateEvent
                {
                    OrderId = notification.OrderId,
                    Items = notification.Items
                }),
                _messageBus.PublishAsync(new PaymentProcessingEvent
                {
                    OrderId = notification.OrderId,
                    Amount = notification.TotalAmount,
                    CustomerId = notification.CustomerId
                }),
                _messageBus.PublishAsync(new EmailNotificationEvent
                {
                    Type = "OrderConfirmation",
                    RecipientId = notification.CustomerId,
                    Data = new { OrderId = notification.OrderId }
                })
            );

            _logger.LogInformation("Order {OrderId} events published successfully", notification.OrderId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to publish events for order {OrderId}", notification.OrderId);
            throw;
        }
    }
}

// 3. Saga Pattern for Distributed Transactions
public class OrderSagaOrchestrator
{
    private readonly IMessageBus _messageBus;
    private readonly ISagaRepository _sagaRepository;

    public async Task HandleAsync(CreateOrderCommand command)
    {
        var saga = new OrderSaga
        {
            Id = Guid.NewGuid(),
            OrderId = command.OrderId,
            CustomerId = command.CustomerId,
            State = SagaState.Started
        };

        try
        {
            // Step 1: Reserve inventory
            await _messageBus.PublishAsync(new ReserveInventoryCommand
            {
                OrderId = command.OrderId,
                Items = command.Items,
                SagaId = saga.Id
            });

            saga.State = SagaState.InventoryReservationRequested;
            await _sagaRepository.SaveAsync(saga);
        }
        catch (Exception ex)
        {
            saga.State = SagaState.Failed;
            saga.FailureReason = ex.Message;
            await _sagaRepository.SaveAsync(saga);

            // Compensate any completed steps
            await CompensateAsync(saga);
            throw;
        }
    }

    private async Task CompensateAsync(OrderSaga saga)
    {
        // Implement compensation logic for each completed step
        if (saga.InventoryReserved)
        {
            await _messageBus.PublishAsync(new CancelInventoryReservationCommand
            {
                OrderId = saga.OrderId,
                SagaId = saga.Id
            });
        }

        if (saga.PaymentProcessed)
        {
            await _messageBus.PublishAsync(new RefundPaymentCommand
            {
                OrderId = saga.OrderId,
                SagaId = saga.Id
            });
        }
    }
}
```

---

# 📚 TLDR Summary

## 🎯 **Key Concepts for Azure Cloud FullStack Developer**

### **1. .NET Core Fundamentals**

- **Cross-platform runtime** with CoreCLR, BCL, and framework libraries
- **Modern project structure** with SDK-style .csproj files
- **Host builder pattern** for application configuration and lifecycle management
- **Background services** for long-running tasks

### **2. Dependency Injection Mastery**

- **Three lifetimes**: Singleton (app-wide), Scoped (per request), Transient (per instance)
- **Service registration patterns** with extension methods for clean organization
- **Advanced patterns**: Factory, Strategy, and Decorator patterns with DI
- **Configuration validation** with Options pattern

### **3. Configuration System**

- **Hierarchical sources**: JSON → Environment → Command Line (highest priority)
- **Options pattern** for strongly-typed configuration
- **Environment-specific** configuration management
- **Runtime configuration changes** with IOptionsMonitor

### **4. Middleware Pipeline**

- **Request processing flow** through ordered middleware components
- **Custom middleware** for cross-cutting concerns (logging, authentication, validation)
- **Conditional middleware** for specific request paths
- **Proper ordering** for security and performance

### **5. Performance & Scalability**

- **Multi-level caching**: Memory → Distributed → Database
- **Async/await patterns** for I/O bound operations
- **Background processing** for long-running tasks
- **Connection pooling** and retry policies

### **6. Cloud-Ready Patterns**

- **Health checks** for monitoring and load balancing
- **Resilience patterns** with Polly (retry, circuit breaker, timeout)
- **Distributed tracing** with Application Insights
- **Configuration externalization** for different environments

### **7. Best Practices**

- ✅ Use **async/await** for I/O operations
- ✅ Implement **proper logging** with structured data
- ✅ Follow **SOLID principles** in service design
- ✅ Use **repository pattern** for data access abstraction
- ✅ Implement **proper error handling** with global exception filters
- ✅ Design for **testability** with dependency injection

### **8. Common Interview Topics**

- **Service lifetimes** and when to use each
- **Configuration hierarchy** and overriding values
- **Middleware execution order** and custom implementations
- **Entity Framework** patterns and performance optimization
- **API versioning** and backward compatibility
- **Security** implementation (authentication, authorization, CORS)

### **9. Performance Optimization**

- **Caching strategies** for different data types
- **Database optimization** with proper indexing and queries
- **Memory management** and avoiding memory leaks
- **Response compression** and content optimization
- **Connection pooling** configuration

### **10. Deployment & DevOps**

- **Containerization** with Docker
- **Azure deployment** strategies (App Service, AKS, Functions)
- **CI/CD pipelines** with GitHub Actions or Azure DevOps
- **Environment configuration** management
- **Monitoring and observability** setup

---

**🎓 Estimated Study Time:** 25-30 hours  
**💼 Job Readiness:** Complete coverage of .NET Core concepts for Azure Cloud FullStack developer roles  
**🚀 Next Steps:** Practice building microservices, implementing CI/CD, and deploying to Azure
