# 🎯 ASP.NET Core Web API Interview Preparation: Azure Cloud FullStack Developer

**Last Updated:** November 19, 2025  
**Target Role:** Azure Cloud FullStack Developer  
**Difficulty Level:** Beginner to Advanced  
**Estimated Prep Time:** 30-40 hours

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Core Concepts](#core-concepts)
3. [Q&A Section](#qa-section)
4. [Code Samples](#code-samples)
5. [TL;DR Summary](#tldr-summary)

---

# Introduction

## Overview of ASP.NET Core Web API

ASP.NET Core Web API is a framework for building HTTP-based services (RESTful APIs) that can be consumed by a variety of clients including browsers, mobile devices, and IoT applications. As an Azure Cloud FullStack Developer, mastering Web API development is critical for:

- **Backend Services**: Building scalable RESTful APIs for modern applications
- **Microservices Architecture**: Creating independently deployable services
- **Cloud-Native Applications**: Designing APIs optimized for Azure platform
- **Mobile Backend**: Providing data and services to mobile applications
- **Integration Layer**: Enabling system-to-system communication
- **Azure Services Integration**: Leveraging Azure App Service, API Management, Functions

### Why ASP.NET Core Web API?

- **Cross-Platform**: Runs on Windows, Linux, and macOS
- **High Performance**: One of the fastest web frameworks
- **Built-in Dependency Injection**: Native IoC container
- **Middleware Pipeline**: Flexible request processing
- **Modern C# Features**: Leverages latest language features
- **Cloud-Ready**: Optimized for containerization and cloud deployment
- **Rich Ecosystem**: Extensive NuGet package ecosystem

## Importance in Azure Cloud FullStack Development

ASP.NET Core Web API serves as the backbone of Azure cloud applications:

1. **Azure App Service**: Primary hosting platform for Web APIs
2. **Azure API Management**: Gateway for API publishing and management
3. **Azure Functions**: HTTP-triggered serverless APIs
4. **Azure Container Apps**: Containerized API hosting
5. **Azure Service Bus**: Asynchronous API patterns
6. **Azure Application Insights**: API monitoring and diagnostics
7. **Azure AD B2C**: API authentication and authorization
8. **Azure Key Vault**: Secure configuration management

## Key Areas to Focus for Interviews

### 1. **RESTful API Principles**
- REST architectural constraints
- Resource-based design
- HTTP methods semantics
- Idempotency and safe methods
- HATEOAS
- Richardson Maturity Model

### 2. **HTTP Protocol Fundamentals**
- HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Status codes (2xx, 3xx, 4xx, 5xx)
- Headers (Content-Type, Accept, Authorization)
- Request/Response structure
- Content negotiation
- HTTP/2 and HTTP/3 features

### 3. **ASP.NET Core Web API Architecture**
- Controller-based vs Minimal APIs
- Routing mechanisms
- Model binding and validation
- Action results and formatters
- Middleware pipeline
- Filters and attributes

### 4. **Authentication and Authorization**
- JWT (JSON Web Tokens)
- OAuth 2.0 and OpenID Connect
- Azure AD integration
- Bearer token authentication
- Claims-based authorization
- API keys and basic authentication

### 5. **Security Best Practices**
- HTTPS enforcement
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection
- Rate limiting and throttling
- API key management

### 6. **Performance Optimization**
- Response caching
- Output caching
- Async/await patterns
- Response compression
- Connection pooling
- Database query optimization

### 7. **API Versioning**
- URL versioning
- Header versioning
- Query string versioning
- Media type versioning
- Version deprecation strategies

### 8. **Testing Strategies**
- Unit testing controllers
- Integration testing with TestServer
- Mocking dependencies
- Testing middleware
- API contract testing

### 9. **Azure Deployment**
- Azure App Service deployment
- Container deployment (Docker)
- CI/CD pipelines
- Application Insights integration
- Azure API Management
- Scaling strategies

---

# Core Concepts

## 1. RESTful API Principles

### REST Architectural Constraints

**REST (Representational State Transfer)** is an architectural style with six constraints:

1. **Client-Server**: Separation of concerns between UI and data storage
2. **Stateless**: Each request contains all information needed
3. **Cacheable**: Responses must define themselves as cacheable or not
4. **Uniform Interface**: Standardized way to communicate
5. **Layered System**: Client doesn't know if connected to end server
6. **Code on Demand** (optional): Server can extend client functionality

### Resource-Based Design

Resources are the key abstraction in REST:

```
✅ Good: /api/customers/123
❌ Bad: /api/getCustomer?id=123

✅ Good: /api/orders/456/items
❌ Bad: /api/getOrderItems?orderId=456
```

**Resource URI Conventions:**
- Use nouns, not verbs
- Use plural names for collections
- Use hierarchical structure for relationships
- Use hyphens for readability in URIs
- Avoid file extensions

### HTTP Methods Semantics

| Method | Idempotent | Safe | Purpose | Example |
|--------|-----------|------|---------|---------|
| GET | Yes | Yes | Retrieve resource(s) | GET /api/products |
| POST | No | No | Create new resource | POST /api/products |
| PUT | Yes | No | Replace entire resource | PUT /api/products/123 |
| PATCH | No | No | Partial update | PATCH /api/products/123 |
| DELETE | Yes | No | Remove resource | DELETE /api/products/123 |
| HEAD | Yes | Yes | Get headers only | HEAD /api/products |
| OPTIONS | Yes | Yes | Get allowed methods | OPTIONS /api/products |

**Idempotency**: Multiple identical requests have same effect as single request  
**Safe**: Method doesn't modify resources

### Richardson Maturity Model

**Level 0**: Single URI, single HTTP method (RPC style)  
**Level 1**: Multiple URIs, single HTTP method  
**Level 2**: Multiple URIs, HTTP verbs, proper status codes  
**Level 3**: Hypermedia controls (HATEOAS)

## 2. HTTP Status Codes

### Success Codes (2xx)

- **200 OK**: Request succeeded (GET, PUT, PATCH)
- **201 Created**: Resource created (POST)
- **202 Accepted**: Request accepted for async processing
- **204 No Content**: Success with no response body (DELETE)

### Redirection Codes (3xx)

- **301 Moved Permanently**: Resource permanently moved
- **302 Found**: Temporary redirect
- **304 Not Modified**: Cached version is current

### Client Error Codes (4xx)

- **400 Bad Request**: Invalid request syntax/validation
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource doesn't exist
- **405 Method Not Allowed**: HTTP method not supported
- **409 Conflict**: Request conflicts with current state
- **422 Unprocessable Entity**: Semantic validation failed
- **429 Too Many Requests**: Rate limit exceeded

### Server Error Codes (5xx)

- **500 Internal Server Error**: Unexpected server error
- **502 Bad Gateway**: Invalid upstream response
- **503 Service Unavailable**: Server temporarily unavailable
- **504 Gateway Timeout**: Upstream timeout


## 3. ASP.NET Core Web API Architecture

### Controller-Based APIs

Traditional approach using controllers that inherit from `ControllerBase`:

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    
    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        var products = await _productService.GetAllAsync();
        return Ok(products);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        if (product == null)
            return NotFound();
        
        return Ok(product);
    }
    
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(ProductDto dto)
    {
        var product = await _productService.CreateAsync(dto);
        return CreatedAtAction(
            nameof(GetProduct), 
            new { id = product.Id }, 
            product
        );
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, ProductDto dto)
    {
        if (id != dto.Id)
            return BadRequest();
        
        await _productService.UpdateAsync(dto);
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        await _productService.DeleteAsync(id);
        return NoContent();
    }
}
```

### Minimal APIs (.NET 6+)

Lightweight approach for simple scenarios:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapGet("/api/products", async (IProductService service) =>
{
    var products = await service.GetAllAsync();
    return Results.Ok(products);
});

app.MapGet("/api/products/{id}", async (int id, IProductService service) =>
{
    var product = await service.GetByIdAsync(id);
    return product is not null ? Results.Ok(product) : Results.NotFound();
});

app.MapPost("/api/products", async (ProductDto dto, IProductService service) =>
{
    var product = await service.CreateAsync(dto);
    return Results.Created($"/api/products/{product.Id}", product);
});

app.Run();
```

## 4. Routing

### Attribute Routing

Preferred approach in modern ASP.NET Core:

```csharp
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
public class OrdersController : ControllerBase
{
    // GET: api/v1/orders
    [HttpGet]
    public IActionResult GetAll() { }
    
    // GET: api/v1/orders/123
    [HttpGet("{id:int}")]
    public IActionResult GetById(int id) { }
    
    // GET: api/v1/orders/active
    [HttpGet("active")]
    public IActionResult GetActive() { }
    
    // GET: api/v1/orders/customer/456
    [HttpGet("customer/{customerId:int}")]
    public IActionResult GetByCustomer(int customerId) { }
    
    // POST: api/v1/orders
    [HttpPost]
    public IActionResult Create([FromBody] OrderDto dto) { }
}
```

### Route Constraints

```csharp
[HttpGet("{id:int}")]          // Must be integer
[HttpGet("{id:int:min(1)}")]   // Integer >= 1
[HttpGet("{name:alpha}")]      // Alphabetic only
[HttpGet("{code:regex(^[A-Z]{{3}}$)}")]  // Custom regex
[HttpGet("{date:datetime}")]   // DateTime format
[HttpGet("{guid:guid}")]       // GUID format
```

### Route Parameters

```csharp
// Required parameter
[HttpGet("{id}")]
public IActionResult Get(int id) { }

// Optional parameter
[HttpGet("{id?}")]
public IActionResult Get(int? id) { }

// Multiple parameters
[HttpGet("{category}/{id}")]
public IActionResult Get(string category, int id) { }

// Catch-all parameter
[HttpGet("{*path}")]
public IActionResult Get(string path) { }
```

## 5. Model Binding and Validation

### Binding Sources

```csharp
public class OrderController : ControllerBase
{
    // From route: /api/orders/123
    [HttpGet("{id}")]
    public IActionResult Get([FromRoute] int id) { }
    
    // From query string: /api/orders?status=pending
    [HttpGet]
    public IActionResult GetByStatus([FromQuery] string status) { }
    
    // From request body (JSON)
    [HttpPost]
    public IActionResult Create([FromBody] OrderDto dto) { }
    
    // From form data
    [HttpPost("upload")]
    public IActionResult Upload([FromForm] IFormFile file) { }
    
    // From header
    [HttpGet]
    public IActionResult Get([FromHeader(Name = "X-Tenant-Id")] string tenantId) { }
    
    // From DI container
    [HttpGet]
    public IActionResult Get([FromServices] IOrderService service) { }
}
```

### Data Annotations Validation

```csharp
public class ProductDto
{
    [Required(ErrorMessage = "Product name is required")]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; }
    
    [Required]
    [Range(0.01, 10000.00)]
    public decimal Price { get; set; }
    
    [MaxLength(500)]
    public string Description { get; set; }
    
    [EmailAddress]
    public string ContactEmail { get; set; }
    
    [Url]
    public string WebsiteUrl { get; set; }
    
    [RegularExpression(@"^[A-Z]{3}-\d{4}$", 
        ErrorMessage = "SKU must be in format ABC-1234")]
    public string Sku { get; set; }
    
    [Compare(nameof(Price), 
        ErrorMessage = "Discounted price cannot exceed original price")]
    public decimal? DiscountedPrice { get; set; }
}
```

### Custom Validation Attributes

```csharp
public class FutureDateAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(
        object value, 
        ValidationContext validationContext)
    {
        if (value is DateTime date)
        {
            if (date > DateTime.UtcNow)
                return ValidationResult.Success;
            
            return new ValidationResult("Date must be in the future");
        }
        
        return new ValidationResult("Invalid date format");
    }
}

// Usage
public class EventDto
{
    [FutureDate]
    public DateTime EventDate { get; set; }
}
```

### FluentValidation

More powerful validation library:

```csharp
public class ProductDtoValidator : AbstractValidator<ProductDto>
{
    public ProductDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .Length(3, 100)
            .WithMessage("Product name must be 3-100 characters");
        
        RuleFor(x => x.Price)
            .GreaterThan(0)
            .LessThanOrEqualTo(10000);
        
        RuleFor(x => x.Sku)
            .Matches(@"^[A-Z]{3}-\d{4}$")
            .When(x => !string.IsNullOrEmpty(x.Sku));
        
        RuleFor(x => x.DiscountedPrice)
            .LessThanOrEqualTo(x => x.Price)
            .When(x => x.DiscountedPrice.HasValue);
    }
}

// Register in Program.cs
builder.Services.AddValidatorsFromAssemblyContaining<ProductDtoValidator>();
builder.Services.AddFluentValidationAutoValidation();
```

## 6. Middleware Pipeline

### Understanding Middleware

Middleware components form a pipeline that handles requests and responses:

```
Request → Middleware 1 → Middleware 2 → Middleware 3 → Endpoint
         ↓            ↓            ↓
Response ← Middleware 1 ← Middleware 2 ← Middleware 3 ←
```

### Built-in Middleware Order

```csharp
var app = builder.Build();

// Exception handling (first)
app.UseExceptionHandler("/error");
app.UseHsts();

// HTTPS redirection
app.UseHttpsRedirection();

// Static files
app.UseStaticFiles();

// Routing
app.UseRouting();

// CORS
app.UseCors();

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Rate limiting (.NET 7+)
app.UseRateLimiter();

// Response caching
app.UseResponseCaching();

// Endpoints (last)
app.MapControllers();
```

### Custom Middleware

**Inline middleware:**

```csharp
app.Use(async (context, next) =>
{
    // Before next middleware
    Console.WriteLine($"Request: {context.Request.Path}");
    
    await next(context);
    
    // After next middleware
    Console.WriteLine($"Response: {context.Response.StatusCode}");
});
```

**Class-based middleware:**

```csharp
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;
    
    public RequestLoggingMiddleware(
        RequestDelegate next,
        ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        var startTime = DateTime.UtcNow;
        
        // Log request
        _logger.LogInformation(
            "Request: {Method} {Path} at {Time}",
            context.Request.Method,
            context.Request.Path,
            startTime
        );
        
        try
        {
            await _next(context);
        }
        finally
        {
            var duration = DateTime.UtcNow - startTime;
            _logger.LogInformation(
                "Response: {StatusCode} in {Duration}ms",
                context.Response.StatusCode,
                duration.TotalMilliseconds
            );
        }
    }
}

// Extension method
public static class RequestLoggingMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestLogging(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RequestLoggingMiddleware>();
    }
}

// Usage in Program.cs
app.UseRequestLogging();
```


## 7. Dependency Injection

### Service Lifetimes

```csharp
// Transient: Created each time requested
builder.Services.AddTransient<IEmailService, EmailService>();

// Scoped: Created once per request
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<DbContext, AppDbContext>();

// Singleton: Created once for application lifetime
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddSingleton<ICacheService, MemoryCacheService>();
```

### Service Registration Patterns

```csharp
// Interface to implementation
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Generic registration
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// Factory pattern
builder.Services.AddScoped<INotificationService>(provider =>
{
    var config = provider.GetRequiredService<IConfiguration>();
    var notificationType = config["NotificationType"];
    
    return notificationType switch
    {
        "Email" => new EmailNotificationService(),
        "SMS" => new SmsNotificationService(),
        _ => throw new InvalidOperationException()
    };
});

// Named options
builder.Services.Configure<SmtpSettings>(
    builder.Configuration.GetSection("SmtpSettings"));

builder.Services.Configure<AzureSettings>(
    builder.Configuration.GetSection("Azure"));
```

### Constructor Injection

```csharp
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly ILogger<OrdersController> _logger;
    private readonly IMapper _mapper;
    
    public OrdersController(
        IOrderService orderService,
        ILogger<OrdersController> logger,
        IMapper mapper)
    {
        _orderService = orderService;
        _logger = logger;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        _logger.LogInformation("Fetching all orders");
        var orders = await _orderService.GetAllAsync();
        return Ok(orders);
    }
}
```

## 8. Action Filters

### Built-in Filter Types

1. **Authorization Filters** - Execute first
2. **Resource Filters** - Run after authorization
3. **Action Filters** - Before and after action execution
4. **Exception Filters** - Handle exceptions
5. **Result Filters** - Before and after result execution

### Custom Action Filter

```csharp
public class ValidateModelStateAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errors = context.ModelState
                .Where(x => x.Value.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                );
            
            context.Result = new BadRequestObjectResult(new
            {
                Message = "Validation failed",
                Errors = errors
            });
        }
    }
}

// Usage
[HttpPost]
[ValidateModelState]
public async Task<IActionResult> Create(ProductDto dto)
{
    // ModelState is guaranteed to be valid here
    var product = await _productService.CreateAsync(dto);
    return Ok(product);
}
```

### Async Action Filter

```csharp
public class PerformanceLoggingFilter : IAsyncActionFilter
{
    private readonly ILogger<PerformanceLoggingFilter> _logger;
    
    public PerformanceLoggingFilter(ILogger<PerformanceLoggingFilter> logger)
    {
        _logger = logger;
    }
    
    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        var stopwatch = Stopwatch.StartNew();
        
        // Before action execution
        _logger.LogInformation(
            "Starting execution of {Controller}.{Action}",
            context.Controller.GetType().Name,
            context.ActionDescriptor.DisplayName
        );
        
        var resultContext = await next(); // Execute action
        
        // After action execution
        stopwatch.Stop();
        _logger.LogInformation(
            "Completed {Controller}.{Action} in {Duration}ms",
            context.Controller.GetType().Name,
            context.ActionDescriptor.DisplayName,
            stopwatch.ElapsedMilliseconds
        );
    }
}

// Register globally
builder.Services.AddControllers(options =>
{
    options.Filters.Add<PerformanceLoggingFilter>();
});
```

## 9. Error Handling

### Global Exception Handler Middleware

```csharp
public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;
    
    public GlobalExceptionHandlerMiddleware(
        RequestDelegate next,
        ILogger<GlobalExceptionHandlerMiddleware> logger)
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
        var response = exception switch
        {
            NotFoundException => new ErrorResponse
            {
                StatusCode = StatusCodes.Status404NotFound,
                Message = exception.Message
            },
            ValidationException => new ErrorResponse
            {
                StatusCode = StatusCodes.Status400BadRequest,
                Message = exception.Message
            },
            UnauthorizedAccessException => new ErrorResponse
            {
                StatusCode = StatusCodes.Status401Unauthorized,
                Message = "Unauthorized access"
            },
            _ => new ErrorResponse
            {
                StatusCode = StatusCodes.Status500InternalServerError,
                Message = "An internal server error occurred"
            }
        };
        
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = response.StatusCode;
        
        return context.Response.WriteAsJsonAsync(response);
    }
}

public class ErrorResponse
{
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
```

### Problem Details (RFC 7807)

```csharp
builder.Services.AddProblemDetails();

app.UseExceptionHandler(exceptionHandlerApp =>
{
    exceptionHandlerApp.Run(async context =>
    {
        var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
        
        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "An error occurred",
            Detail = exception?.Message,
            Instance = context.Request.Path
        };
        
        await context.Response.WriteAsJsonAsync(problemDetails);
    });
});
```

## 10. Authentication and Authorization

### JWT Bearer Authentication

```csharp
// appsettings.json
{
  "JwtSettings": {
    "SecretKey": "YourSecretKeyHere123456789",
    "Issuer": "YourApp",
    "Audience": "YourAppUsers",
    "ExpiryMinutes": 60
  }
}

// Configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration.GetSection("JwtSettings");
        
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings["SecretKey"])
            ),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();
```

### Token Generation

```csharp
public class AuthService : IAuthService
{
    private readonly IConfiguration _configuration;
    
    public string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
        var credentials = new SigningCredentials(
            securityKey, 
            SecurityAlgorithms.HmacSha256);
        
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };
        
        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                int.Parse(jwtSettings["ExpiryMinutes"])),
            signingCredentials: credentials
        );
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

### Authorization Policies

```csharp
builder.Services.AddAuthorization(options =>
{
    // Simple role-based policy
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Admin"));
    
    // Claims-based policy
    options.AddPolicy("RequireEmail", policy =>
        policy.RequireClaim(ClaimTypes.Email));
    
    // Custom requirement
    options.AddPolicy("MinimumAge", policy =>
        policy.Requirements.Add(new MinimumAgeRequirement(18)));
    
    // Multiple requirements
    options.AddPolicy("SeniorAdmin", policy =>
    {
        policy.RequireRole("Admin");
        policy.RequireClaim("Department", "IT");
        policy.Requirements.Add(new MinimumAgeRequirement(25));
    });
});

// Custom requirement
public class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int MinimumAge { get; }
    
    public MinimumAgeRequirement(int minimumAge)
    {
        MinimumAge = minimumAge;
    }
}

// Custom handler
public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        var dateOfBirthClaim = context.User.FindFirst(
            c => c.Type == "DateOfBirth");
        
        if (dateOfBirthClaim == null)
            return Task.CompletedTask;
        
        var dateOfBirth = DateTime.Parse(dateOfBirthClaim.Value);
        var age = DateTime.Today.Year - dateOfBirth.Year;
        
        if (age >= requirement.MinimumAge)
            context.Succeed(requirement);
        
        return Task.CompletedTask;
    }
}
```

### Using Authorization

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    // Requires authentication
    [Authorize]
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Ok(new { UserId = userId });
    }
    
    // Requires specific role
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        // Only admins can delete users
        return NoContent();
    }
    
    // Requires policy
    [Authorize(Policy = "MinimumAge")]
    [HttpPost("restricted-action")]
    public IActionResult RestrictedAction()
    {
        return Ok();
    }
    
    // Allow anonymous (override class-level [Authorize])
    [AllowAnonymous]
    [HttpGet("public")]
    public IActionResult PublicEndpoint()
    {
        return Ok("This is public");
    }
}
```


## 11. CORS (Cross-Origin Resource Sharing)

### CORS Configuration

```csharp
// Named policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(
                "https://example.com",
                "https://www.example.com"
            )
            .WithMethods("GET", "POST", "PUT", "DELETE")
            .WithHeaders("Content-Type", "Authorization")
            .AllowCredentials();
    });
    
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
    
    options.AddPolicy("DevelopmentPolicy", policy =>
    {
        policy.SetIsOriginAllowed(origin => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Apply middleware
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors("DevelopmentPolicy");
}
else
{
    app.UseCors("AllowSpecificOrigins");
}
```

### Controller-Level CORS

```csharp
[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowSpecificOrigins")]
public class ProductsController : ControllerBase
{
    // All actions use the policy
    
    [HttpGet]
    [DisableCors]  // Override for specific action
    public IActionResult GetAll() { }
}
```

## 12. API Versioning

### URL Versioning

```csharp
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
});

builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});

// Controllers
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
public class ProductsV1Controller : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok("Version 1.0");
}

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("2.0")]
public class ProductsV2Controller : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok("Version 2.0");
}
```

### Header Versioning

```csharp
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new HeaderApiVersionReader("X-API-Version");
});

// Usage: X-API-Version: 2.0
```

### Query String Versioning

```csharp
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new QueryStringApiVersionReader("api-version");
});

// Usage: /api/products?api-version=2.0
```

### Media Type Versioning

```csharp
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new MediaTypeApiVersionReader();
});

// Usage: Accept: application/json;v=2.0
```

## 13. Response Caching

### Response Cache Attribute

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    // Cache for 60 seconds
    [HttpGet]
    [ResponseCache(Duration = 60)]
    public IActionResult GetAll()
    {
        var products = _productService.GetAll();
        return Ok(products);
    }
    
    // No caching
    [HttpGet("{id}")]
    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
    public IActionResult GetById(int id)
    {
        var product = _productService.GetById(id);
        return Ok(product);
    }
    
    // Named cache profile
    [HttpGet("featured")]
    [ResponseCache(CacheProfileName = "Default30")]
    public IActionResult GetFeatured()
    {
        return Ok(_productService.GetFeatured());
    }
}

// Configure cache profiles
builder.Services.AddControllers(options =>
{
    options.CacheProfiles.Add("Default30", new CacheProfile
    {
        Duration = 30
    });
    
    options.CacheProfiles.Add("Never", new CacheProfile
    {
        Location = ResponseCacheLocation.None,
        NoStore = true
    });
});
```

### Output Caching (.NET 7+)

```csharp
builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(builder => builder.Cache());
    
    options.AddPolicy("Expire20", builder =>
        builder.Expire(TimeSpan.FromSeconds(20)));
    
    options.AddPolicy("NoCache", builder =>
        builder.NoCache());
});

var app = builder.Build();
app.UseOutputCache();

// Usage
[OutputCache(PolicyName = "Expire20")]
[HttpGet]
public IActionResult GetAll() { }
```

### Distributed Caching

```csharp
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration["Redis:Connection"];
    options.InstanceName = "WebAPI_";
});

public class ProductService
{
    private readonly IDistributedCache _cache;
    
    public async Task<Product> GetByIdAsync(int id)
    {
        var cacheKey = $"product_{id}";
        var cachedProduct = await _cache.GetStringAsync(cacheKey);
        
        if (cachedProduct != null)
        {
            return JsonSerializer.Deserialize<Product>(cachedProduct);
        }
        
        var product = await _repository.GetByIdAsync(id);
        
        var cacheOptions = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
        };
        
        await _cache.SetStringAsync(
            cacheKey,
            JsonSerializer.Serialize(product),
            cacheOptions
        );
        
        return product;
    }
}
```

## 14. Rate Limiting (.NET 7+)

```csharp
builder.Services.AddRateLimiter(options =>
{
    // Fixed window: 100 requests per minute
    options.AddFixedWindowLimiter("fixed", options =>
    {
        options.PermitLimit = 100;
        options.Window = TimeSpan.FromMinutes(1);
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 5;
    });
    
    // Sliding window: smoother rate limiting
    options.AddSlidingWindowLimiter("sliding", options =>
    {
        options.PermitLimit = 100;
        options.Window = TimeSpan.FromMinutes(1);
        options.SegmentsPerWindow = 6;
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 5;
    });
    
    // Token bucket: burst support
    options.AddTokenBucketLimiter("token", options =>
    {
        options.TokenLimit = 100;
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 5;
        options.ReplenishmentPeriod = TimeSpan.FromSeconds(10);
        options.TokensPerPeriod = 20;
        options.AutoReplenishment = true;
    });
    
    // Concurrency: limit concurrent requests
    options.AddConcurrencyLimiter("concurrency", options =>
    {
        options.PermitLimit = 10;
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 5;
    });
});

var app = builder.Build();
app.UseRateLimiter();

// Usage
[EnableRateLimiting("fixed")]
[HttpGet]
public IActionResult GetAll() { }

[DisableRateLimiting]
[HttpGet("health")]
public IActionResult HealthCheck() => Ok();
```

## 15. Swagger/OpenAPI Documentation

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "An ASP.NET Core Web API for managing products",
        Contact = new OpenApiContact
        {
            Name = "Support Team",
            Email = "support@example.com",
            Url = new Uri("https://example.com/support")
        },
        License = new OpenApiLicense
        {
            Name = "MIT",
            Url = new Uri("https://opensource.org/licenses/MIT")
        }
    });
    
    // JWT authentication
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
    
    // XML comments
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        options.RoutePrefix = string.Empty; // Serve at root
    });
}
```

### XML Documentation Comments

```csharp
/// <summary>
/// Gets all products
/// </summary>
/// <returns>A list of products</returns>
/// <response code="200">Returns the list of products</response>
[HttpGet]
[ProducesResponseType(typeof(IEnumerable<Product>), StatusCodes.Status200OK)]
public async Task<IActionResult> GetAll()
{
    var products = await _productService.GetAllAsync();
    return Ok(products);
}

/// <summary>
/// Gets a specific product by ID
/// </summary>
/// <param name="id">The product ID</param>
/// <returns>The requested product</returns>
/// <response code="200">Returns the product</response>
/// <response code="404">If the product is not found</response>
[HttpGet("{id}")]
[ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
public async Task<IActionResult> GetById(int id)
{
    var product = await _productService.GetByIdAsync(id);
    if (product == null)
        return NotFound();
    
    return Ok(product);
}
```

---


## 11. CORS (Cross-Origin Resource Sharing)

### CORS Configuration

```csharp
// Named policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(
                "https://example.com",
                "https://www.example.com"
            )
            .WithMethods("GET", "POST", "PUT", "DELETE")
            .WithHeaders("Content-Type", "Authorization")
            .AllowCredentials();
    });
    
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
    
    options.AddPolicy("DevelopmentPolicy", policy =>
    {
        policy.SetIsOriginAllowed(origin => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Apply middleware
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors("DevelopmentPolicy");
}
else
{
    app.UseCors("AllowSpecificOrigins");
}
```

### Controller-Level CORS

```csharp
[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowSpecificOrigins")]
public class ProductsController : ControllerBase
{
    // All actions use the policy
    
    [HttpGet]
    [DisableCors]  // Override for specific action
    public IActionResult GetAll() { }
}
```

## 12. API Versioning

### URL Versioning

```csharp
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
});

builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});

// Controllers
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
public class ProductsV1Controller : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok("Version 1.0");
}

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("2.0")]
public class ProductsV2Controller : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok("Version 2.0");
}
```

### Header Versioning

```csharp
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new HeaderApiVersionReader("X-API-Version");
});

// Usage: X-API-Version: 2.0
```

### Query String Versioning

```csharp
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new QueryStringApiVersionReader("api-version");
});

// Usage: /api/products?api-version=2.0
```

### Media Type Versioning

```csharp
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new MediaTypeApiVersionReader();
});

// Usage: Accept: application/json;v=2.0
```

## 13. Response Caching

### Response Cache Attribute

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    // Cache for 60 seconds
    [HttpGet]
    [ResponseCache(Duration = 60)]
    public IActionResult GetAll()
    {
        var products = _productService.GetAll();
        return Ok(products);
    }
    
    // No caching
    [HttpGet("{id}")]
    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
    public IActionResult GetById(int id)
    {
        var product = _productService.GetById(id);
        return Ok(product);
    }
    
    // Named cache profile
    [HttpGet("featured")]
    [ResponseCache(CacheProfileName = "Default30")]
    public IActionResult GetFeatured()
    {
        return Ok(_productService.GetFeatured());
    }
}

// Configure cache profiles
builder.Services.AddControllers(options =>
{
    options.CacheProfiles.Add("Default30", new CacheProfile
    {
        Duration = 30
    });
    
    options.CacheProfiles.Add("Never", new CacheProfile
    {
        Location = ResponseCacheLocation.None,
        NoStore = true
    });
});
```

### Output Caching (.NET 7+)

```csharp
builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(builder => builder.Cache());
    
    options.AddPolicy("Expire20", builder =>
        builder.Expire(TimeSpan.FromSeconds(20)));
    
    options.AddPolicy("NoCache", builder =>
        builder.NoCache());
});

var app = builder.Build();
app.UseOutputCache();

// Usage
[OutputCache(PolicyName = "Expire20")]
[HttpGet]
public IActionResult GetAll() { }
```

### Distributed Caching

```csharp
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration["Redis:Connection"];
    options.InstanceName = "WebAPI_";
});

public class ProductService
{
    private readonly IDistributedCache _cache;
    
    public async Task<Product> GetByIdAsync(int id)
    {
        var cacheKey = $"product_{id}";
        var cachedProduct = await _cache.GetStringAsync(cacheKey);
        
        if (cachedProduct != null)
        {
            return JsonSerializer.Deserialize<Product>(cachedProduct);
        }
        
        var product = await _repository.GetByIdAsync(id);
        
        var cacheOptions = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
        };
        
        await _cache.SetStringAsync(
            cacheKey,
            JsonSerializer.Serialize(product),
            cacheOptions
        );
        
        return product;
    }
}
```

## 14. Rate Limiting (.NET 7+)

```csharp
builder.Services.AddRateLimiter(options =>
{
    // Fixed window: 100 requests per minute
    options.AddFixedWindowLimiter("fixed", options =>
    {
        options.PermitLimit = 100;
        options.Window = TimeSpan.FromMinutes(1);
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 5;
    });
    
    // Sliding window: smoother rate limiting
    options.AddSlidingWindowLimiter("sliding", options =>
    {
        options.PermitLimit = 100;
        options.Window = TimeSpan.FromMinutes(1);
        options.SegmentsPerWindow = 6;
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 5;
    });
    
    // Token bucket: burst support
    options.AddTokenBucketLimiter("token", options =>
    {
        options.TokenLimit = 100;
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 5;
        options.ReplenishmentPeriod = TimeSpan.FromSeconds(10);
        options.TokensPerPeriod = 20;
        options.AutoReplenishment = true;
    });
    
    // Concurrency: limit concurrent requests
    options.AddConcurrencyLimiter("concurrency", options =>
    {
        options.PermitLimit = 10;
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 5;
    });
});

var app = builder.Build();
app.UseRateLimiter();

// Usage
[EnableRateLimiting("fixed")]
[HttpGet]
public IActionResult GetAll() { }

[DisableRateLimiting]
[HttpGet("health")]
public IActionResult HealthCheck() => Ok();
```

## 15. Swagger/OpenAPI Documentation

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "An ASP.NET Core Web API for managing products",
        Contact = new OpenApiContact
        {
            Name = "Support Team",
            Email = "support@example.com",
            Url = new Uri("https://example.com/support")
        },
        License = new OpenApiLicense
        {
            Name = "MIT",
            Url = new Uri("https://opensource.org/licenses/MIT")
        }
    });
    
    // JWT authentication
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
    
    // XML comments
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        options.RoutePrefix = string.Empty; // Serve at root
    });
}
```

### XML Documentation Comments

```csharp
/// <summary>
/// Gets all products
/// </summary>
/// <returns>A list of products</returns>
/// <response code="200">Returns the list of products</response>
[HttpGet]
[ProducesResponseType(typeof(IEnumerable<Product>), StatusCodes.Status200OK)]
public async Task<IActionResult> GetAll()
{
    var products = await _productService.GetAllAsync();
    return Ok(products);
}

/// <summary>
/// Gets a specific product by ID
/// </summary>
/// <param name="id">The product ID</param>
/// <returns>The requested product</returns>
/// <response code="200">Returns the product</response>
/// <response code="404">If the product is not found</response>
[HttpGet("{id}")]
[ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
public async Task<IActionResult> GetById(int id)
{
    var product = await _productService.GetByIdAsync(id);
    if (product == null)
        return NotFound();
    
    return Ok(product);
}
```

---

# Q&A Section

## Fundamentals

### Q1: What is REST and what are its key principles?

**Answer:**

REST (Representational State Transfer) is an architectural style for designing networked applications. It was defined by Roy Fielding in his 2000 doctoral dissertation.

**Key Principles:**

1. **Client-Server Architecture**: Separation of concerns - client handles UI, server handles data storage
2. **Stateless**: Each request contains all necessary information; server doesn't store client context
3. **Cacheable**: Responses must explicitly state if they can be cached
4. **Uniform Interface**: Standardized way to communicate (HTTP methods, URIs, representations)
5. **Layered System**: Client cannot tell if connected directly to end server
6. **Code on Demand (optional)**: Server can send executable code to client

**Benefits:**
- Scalability through statelessness
- Visibility of interactions
- Portability and reliability
- Easy to understand and implement
- Technology independent

---

### Q2: Explain the difference between PUT and PATCH methods.

**Answer:**

**PUT:**
- Replaces the entire resource
- Idempotent (multiple identical requests have same effect)
- Sends complete resource representation
- If resource doesn't exist, may create it

```csharp
[HttpPut("{id}")]
public async Task<IActionResult> UpdateProduct(int id, ProductDto dto)
{
    // Replace entire product
    var product = new Product
    {
        Id = id,
        Name = dto.Name,
        Price = dto.Price,
        Description = dto.Description,
        Category = dto.Category
        // All fields must be provided
    };
    
    await _productService.UpdateAsync(product);
    return NoContent();
}
```

**PATCH:**
- Partial update of resource
- Only modified fields sent
- More efficient for large resources
- Not strictly idempotent

```csharp
[HttpPatch("{id}")]
public async Task<IActionResult> PatchProduct(int id, JsonPatchDocument<Product> patchDoc)
{
    var product = await _productService.GetByIdAsync(id);
    if (product == null)
        return NotFound();
    
    // Apply only specified changes
    patchDoc.ApplyTo(product);
    
    await _productService.UpdateAsync(product);
    return NoContent();
}
```

---

### Q3: What HTTP status codes should be returned for different scenarios?

**Answer:**

| Scenario | Status Code | Description |
|----------|-------------|-------------|
| Resource retrieved successfully | 200 OK | GET succeeded |
| Resource created | 201 Created | POST succeeded, include Location header |
| Action succeeded, no content | 204 No Content | DELETE or PUT succeeded |
| Async operation accepted | 202 Accepted | Long-running operation queued |
| Validation failed | 400 Bad Request | Invalid input data |
| Not authenticated | 401 Unauthorized | Missing/invalid credentials |
| Authenticated but not authorized | 403 Forbidden | Insufficient permissions |
| Resource not found | 404 Not Found | Resource doesn't exist |
| Method not allowed | 405 Method Not Allowed | HTTP method not supported |
| Conflict | 409 Conflict | Resource state conflict |
| Precondition failed | 412 Precondition Failed | If-Match header mismatch |
| Validation error | 422 Unprocessable Entity | Semantic validation failed |
| Rate limit exceeded | 429 Too Many Requests | Client exceeded rate limit |
| Server error | 500 Internal Server Error | Unexpected error |
| Service unavailable | 503 Service Unavailable | Server down/maintenance |

---

### Q4: What is idempotency and why is it important in REST APIs?

**Answer:**

**Idempotency** means that making the same request multiple times has the same effect as making it once.

**Idempotent Methods:**
- GET: Reading doesn't change state
- PUT: Replacing resource with same data gives same result
- DELETE: Deleting already-deleted resource is fine
- HEAD, OPTIONS: Read-only operations

**Non-Idempotent:**
- POST: Creating multiple times creates multiple resources
- PATCH: Depends on implementation

**Why Important:**
1. **Network Reliability**: Safe to retry failed requests
2. **Distributed Systems**: Handle duplicate requests gracefully
3. **Client Simplicity**: Clients can retry without side effects
4. **Predictability**: Same input always produces same output

**Implementation Example:**

```csharp
[HttpPut("{id}")]
public async Task<IActionResult> UpdateProduct(int id, ProductDto dto)
{
    // Idempotent: Same request multiple times has same effect
    var product = await _productService.GetByIdAsync(id);
    
    product.Name = dto.Name;
    product.Price = dto.Price;
    
    await _productService.UpdateAsync(product);
    return NoContent();
}

[HttpPost("orders/{orderId}/cancel")]
public async Task<IActionResult> CancelOrder(int orderId)
{
    // Make POST idempotent by checking current state
    var order = await _orderService.GetByIdAsync(orderId);
    
    if (order.Status == OrderStatus.Cancelled)
        return Ok(new { Message = "Order already cancelled" });
    
    await _orderService.CancelAsync(orderId);
    return Ok(new { Message = "Order cancelled successfully" });
}
```

---

## ASP.NET Core Web API Specifics

### Q5: What is the difference between [ApiController] and ControllerBase?

**Answer:**

**ControllerBase:**
- Base class for MVC controllers without view support
- Provides action result helper methods (Ok, NotFound, BadRequest, etc.)
- Access to HttpContext, User, ModelState
- Manual handling of model validation

**[ApiController] Attribute:**
Added in ASP.NET Core 2.1, provides automatic behaviors:

1. **Automatic Model Validation**
```csharp
// Without [ApiController]
[HttpPost]
public IActionResult Create(ProductDto dto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);  // Manual check required
    
    // Process...
}

// With [ApiController]
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpPost]
    public IActionResult Create(ProductDto dto)
    {
        // ModelState automatically validated
        // 400 returned if invalid
        // No manual check needed
    }
}
```

2. **Binding Source Parameter Inference**
```csharp
// [ApiController] infers binding sources:
[HttpPost]
public IActionResult Create(
    ProductDto dto)  // [FromBody] inferred for complex types
{ }

[HttpGet("{id}")]
public IActionResult Get(
    int id)  // [FromRoute] inferred
{ }

[HttpGet]
public IActionResult Search(
    string query)  // [FromQuery] inferred
{ }
```

3. **Problem Details for Error Responses**
Returns RFC 7807 compliant error responses

4. **Multipart/form-data Request Inference**
Automatically binds IFormFile and IFormFileCollection

---

### Q6: Explain attribute routing vs conventional routing.

**Answer:**

**Conventional Routing:**
Defined globally in Program.cs:

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

**Attribute Routing:**
Defined on controllers and actions:

```csharp
[ApiController]
[Route("api/[controller]")]  // Template-based
public class ProductsController : ControllerBase
{
    // GET: api/products
    [HttpGet]
    public IActionResult GetAll() { }
    
    // GET: api/products/123
    [HttpGet("{id:int}")]
    public IActionResult GetById(int id) { }
    
    // GET: api/products/search?name=laptop
    [HttpGet("search")]
    public IActionResult Search([FromQuery] string name) { }
    
    // POST: api/products
    [HttpPost]
    public IActionResult Create([FromBody] ProductDto dto) { }
}
```

**Best Practices:**
- Use attribute routing for APIs (more explicit)
- Use conventional routing for MVC apps with views
- Don't mix both (choose one approach)
- Use route constraints for type safety
- Use hierarchical routes for relationships

```csharp
[Route("api/orders/{orderId}/items")]
public class OrderItemsController : ControllerBase
{
    // GET: api/orders/123/items
    [HttpGet]
    public IActionResult GetOrderItems(int orderId) { }
    
    // POST: api/orders/123/items
    [HttpPost]
    public IActionResult AddItem(int orderId, [FromBody] OrderItemDto dto) { }
}
```

---

### Q7: How does model binding work in ASP.NET Core Web API?

**Answer:**

Model binding automatically maps HTTP request data to action parameters.

**Binding Sources:**

1. **[FromRoute]** - From URL path:
```csharp
[HttpGet("{id}")]
public IActionResult Get([FromRoute] int id) { }
// /api/products/123 → id = 123
```

2. **[FromQuery]** - From query string:
```csharp
[HttpGet]
public IActionResult Search(
    [FromQuery] string keyword,
    [FromQuery] int page = 1)
{ }
// /api/products?keyword=laptop&page=2
```

3. **[FromBody]** - From request body:
```csharp
[HttpPost]
public IActionResult Create([FromBody] ProductDto dto) { }
// Content-Type: application/json
// Body: {"name":"Laptop","price":999}
```

4. **[FromHeader]** - From HTTP headers:
```csharp
[HttpGet]
public IActionResult Get(
    [FromHeader(Name = "X-Tenant-Id")] string tenantId)
{ }
```

5. **[FromForm]** - From form data:
```csharp
[HttpPost("upload")]
public IActionResult Upload(
    [FromForm] IFormFile file,
    [FromForm] string description)
{ }
```

6. **[FromServices]** - From DI container:
```csharp
[HttpGet]
public IActionResult Get([FromServices] IProductService service)
{
    var products = service.GetAll();
    return Ok(products);
}
```

**Complex Model Binding:**

```csharp
public class SearchRequest
{
    [FromQuery(Name = "q")]
    public string Query { get; set; }
    
    [FromQuery]
    public int Page { get; set; } = 1;
    
    [FromQuery]
    public int PageSize { get; set; } = 10;
    
    [FromHeader(Name = "X-Sort-Order")]
    public string SortOrder { get; set; }
}

[HttpGet("search")]
public IActionResult Search([FromQuery] SearchRequest request)
{
    // Automatically binds from multiple sources
}
```

---

### Q8: What is content negotiation and how is it implemented?

**Answer:**

Content negotiation allows the server to serve different representations of a resource based on client preferences.

**How It Works:**

Client specifies preferred format via `Accept` header:
- `Accept: application/json` → JSON response
- `Accept: application/xml` → XML response
- `Accept: text/plain` → Plain text response

**Default Configuration:**

```csharp
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.WriteIndented = true;
    });
```

**Adding XML Support:**

```csharp
builder.Services.AddControllers()
    .AddXmlSerializerFormatters()  // Enable XML
    .AddXmlDataContractSerializerFormatters();
```

**Custom Formatter:**

```csharp
public class CsvOutputFormatter : TextOutputFormatter
{
    public CsvOutputFormatter()
    {
        SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/csv"));
        SupportedEncodings.Add(Encoding.UTF8);
    }
    
    public override async Task WriteResponseBodyAsync(
        OutputFormatterWriteContext context,
        Encoding selectedEncoding)
    {
        var response = context.HttpContext.Response;
        var buffer = new StringBuilder();
        
        if (context.Object is IEnumerable<Product> products)
        {
            buffer.AppendLine("Id,Name,Price");
            foreach (var product in products)
            {
                buffer.AppendLine($"{product.Id},{product.Name},{product.Price}");
            }
        }
        
        await response.WriteAsync(buffer.ToString(), selectedEncoding);
    }
}

// Register custom formatter
builder.Services.AddControllers(options =>
{
    options.OutputFormatters.Add(new CsvOutputFormatter());
});
```

**Usage:**

```csharp
[HttpGet]
[Produces("application/json", "application/xml", "text/csv")]
public IActionResult GetProducts()
{
    var products = _productService.GetAll();
    return Ok(products);
}
```

---

## Middleware and Request Processing

### Q9: Explain the middleware pipeline in ASP.NET Core.

**Answer:**

Middleware components are assembled into a pipeline that handles HTTP requests and responses. Each component:
- Can perform operations before calling the next component
- Can perform operations after the next component returns
- Can short-circuit the pipeline (not call next)

**Pipeline Flow:**

```
Request →  MW1  →  MW2  →  MW3  → Endpoint
          ↓        ↓        ↓
Response ← MW1  ← MW2  ← MW3  ←
```

**Middleware Order Matters:**

```csharp
var app = builder.Build();

// 1. Exception handling (must be first)
app.UseExceptionHandler("/error");

// 2. HTTPS redirection
app.UseHttpsRedirection();

// 3. Static files (short-circuit if file found)
app.UseStaticFiles();

// 4. Routing (matches endpoint)
app.UseRouting();

// 5. CORS (after routing, before auth)
app.UseCors();

// 6. Authentication (identify user)
app.UseAuthentication();

// 7. Authorization (check permissions)
app.UseAuthorization();

// 8. Custom middleware
app.UseMiddleware<RequestLoggingMiddleware>();

// 9. Endpoints (final destination)
app.MapControllers();

app.Run();
```

**Custom Middleware Example:**

```csharp
public class RequestTimingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestTimingMiddleware> _logger;
    
    public RequestTimingMiddleware(
        RequestDelegate next,
        ILogger<RequestTimingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        
        // Before next middleware
        _logger.LogInformation("Request started: {Path}", context.Request.Path);
        
        try
        {
            await _next(context);  // Call next middleware
        }
        finally
        {
            // After next middleware (always executes)
            stopwatch.Stop();
            _logger.LogInformation(
                "Request completed: {Path} in {Duration}ms",
                context.Request.Path,
                stopwatch.ElapsedMilliseconds
            );
        }
    }
}
```

---

### Q10: How do you implement JWT authentication in ASP.NET Core Web API?

**Answer:**

**Step 1: Install Package**
```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

**Step 2: Configuration (appsettings.json)**
```json
{
  "JwtSettings": {
    "SecretKey": "YourVeryLongSecretKeyHere_AtLeast32Characters!",
    "Issuer": "YourApp",
    "Audience": "YourAppUsers",
    "ExpiryMinutes": 60
  }
}
```

**Step 3: Configure Services (Program.cs)**
```csharp
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(secretKey),
        ClockSkew = TimeSpan.Zero // Remove default 5 min tolerance
    };
});

builder.Services.AddAuthorization();

// ... configure other services

var app = builder.Build();

// Must be in correct order
app.UseAuthentication();  // First
app.UseAuthorization();   // Second

app.MapControllers();
app.Run();
```

**Step 4: Token Generation Service**
```csharp
public interface IAuthService
{
    string GenerateToken(User user);
    ClaimsPrincipal ValidateToken(string token);
}

public class AuthService : IAuthService
{
    private readonly IConfiguration _configuration;
    
    public AuthService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public string GenerateToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var secretKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
        var credentials = new SigningCredentials(
            secretKey, 
            SecurityAlgorithms.HmacSha256);
        
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };
        
        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                int.Parse(jwtSettings["ExpiryMinutes"])),
            signingCredentials: credentials
        );
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

**Step 5: Login Endpoint**
```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUserService _userService;
    
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userService.ValidateCredentialsAsync(
            request.Username, 
            request.Password);
        
        if (user == null)
            return Unauthorized(new { Message = "Invalid credentials" });
        
        var token = _authService.GenerateToken(user);
        
        return Ok(new
        {
            Token = token,
            ExpiresIn = 3600,
            User = new
            {
                user.Id,
                user.Username,
                user.Email,
                user.Role
            }
        });
    }
}
```

**Step 6: Protect Endpoints**
```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]  // Require authentication for all actions
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        // User is authenticated
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var username = User.Identity.Name;
        
        return Ok(products);
    }
    
    [Authorize(Roles = "Admin")]  // Requires specific role
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        // Only admins can access
        return NoContent();
    }
    
    [AllowAnonymous]  // Override controller-level [Authorize]
    [HttpGet("public")]
    public IActionResult GetPublic()
    {
        return Ok("Public data");
    }
}
```

**Client Usage:**
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 3600
}

Subsequent requests:
GET /api/products
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

### Q11: What are the best practices for API versioning?

**Answer:**

**Why Version APIs?**
- Maintain backward compatibility
- Allow gradual migration
- Support multiple client versions
- Evolve API independently

**Versioning Strategies:**

**1. URL Versioning (Most Common)**
```csharp
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
public class ProductsV1Controller : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok("Version 1.0");
}

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("2.0")]
public class ProductsV2Controller : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok("Version 2.0");
}

// Usage: GET /api/v1/products or GET /api/v2/products
```

**2. Query String Versioning**
```csharp
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new QueryStringApiVersionReader("api-version");
});

// Usage: GET /api/products?api-version=2.0
```

**3. Header Versioning**
```csharp
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new HeaderApiVersionReader("X-API-Version");
});

// Usage: 
// GET /api/products
// X-API-Version: 2.0
```

**4. Media Type Versioning**
```csharp
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new MediaTypeApiVersionReader();
});

// Usage:
// GET /api/products
// Accept: application/json;v=2.0
```

**Configuration:**
```csharp
builder.Services.AddApiVersioning(options =>
{
    // Default version when not specified
    options.DefaultApiVersion = new ApiVersion(1, 0);
    
    // Use default version when client doesn't specify
    options.AssumeDefaultVersionWhenUnspecified = true;
    
    // Report available versions in response headers
    options.ReportApiVersions = true;
    
    // Choose versioning strategy
    options.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader(),
        new HeaderApiVersionReader("X-API-Version"),
        new QueryStringApiVersionReader("api-version")
    );
});

builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});
```

**Best Practices:**
1. **Choose one strategy** and stick with it (URL versioning is most visible)
2. **Version from the start** - easier than retrofitting
3. **Deprecate gracefully** - give clients time to migrate
4. **Document changes** clearly
5. **Support at least 2 versions** simultaneously
6. **Major versions only** - avoid v1.2.3, use v1, v2, v3
7. **Consistent breaking change policy**

---

## Security Best Practices

### Q12: How do you implement CORS in ASP.NET Core Web API?

**Answer:**

CORS (Cross-Origin Resource Sharing) allows browsers to make requests to a different domain than the one serving the page.

**Why Needed?**
Browsers enforce Same-Origin Policy. CORS explicitly allows cross-origin requests.

**Configuration:**

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    // Production: Specific origins
    options.AddPolicy("ProductionPolicy", policy =>
    {
        policy.WithOrigins(
                "https://example.com",
                "https://app.example.com"
            )
            .WithMethods("GET", "POST", "PUT", "DELETE")
            .WithHeaders("Content-Type", "Authorization")
            .AllowCredentials()  // Allow cookies
            .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
    });
    
    // Development: Allow all
    options.AddPolicy("DevelopmentPolicy", policy =>
    {
        policy.SetIsOriginAllowed(origin => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
    
    // Default policy
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Apply CORS middleware (before UseAuthorization)
if (app.Environment.IsDevelopment())
{
    app.UseCors("DevelopmentPolicy");
}
else
{
    app.UseCors("ProductionPolicy");
}

app.UseAuthorization();
app.MapControllers();
```

**Controller-Level CORS:**
```csharp
[ApiController]
[Route("api/[controller]")]
[EnableCors("ProductionPolicy")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() { }
    
    [HttpGet("{id}")]
    [DisableCors]  // Override for specific action
    public IActionResult GetById(int id) { }
}
```

**Important:**
- CORS is a browser security feature, not API security
- Still validate and authenticate requests
- Don't use AllowAnyOrigin in production
- Be specific about allowed origins, methods, headers

---

### Q13: What security best practices should be followed for Web APIs?

**Answer:**

**1. Use HTTPS Always**
```csharp
builder.Services.AddHttpsRedirection(options =>
{
    options.RedirectStatusCode = StatusCodes.Status308PermanentRedirect;
    options.HttpsPort = 443;
});

app.UseHttpsRedirection();

// Force HTTPS
builder.Services.AddHsts(options =>
{
    options.MaxAge = TimeSpan.FromDays(365);
    options.IncludeSubDomains = true;
    options.Preload = true;
});
```

**2. Validate All Input**
```csharp
public class ProductDto
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    [RegularExpression(@"^[a-zA-Z0-9\s-]+$")]
    public string Name { get; set; }
    
    [Required]
    [Range(0.01, 100000)]
    public decimal Price { get; set; }
}

[HttpPost]
public async Task<IActionResult> Create([FromBody] ProductDto dto)
{
    // ModelState automatically validated with [ApiController]
    var product = await _productService.CreateAsync(dto);
    return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
}
```

**3. Prevent SQL Injection**
```csharp
// ✅ GOOD: Parameterized queries
public async Task<Product> GetByIdAsync(int id)
{
    return await _context.Products
        .FirstOrDefaultAsync(p => p.Id == id);
}

// ✅ GOOD: Parameterized raw SQL
var products = await _context.Products
    .FromSqlRaw("SELECT * FROM Products WHERE CategoryId = {0}", categoryId)
    .ToListAsync();

// ❌ BAD: String concatenation
var products = await _context.Products
    .FromSqlRaw($"SELECT * FROM Products WHERE Category = '{category}'")
    .ToListAsync();
```

**4. Implement Rate Limiting**
```csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("api", options =>
    {
        options.PermitLimit = 100;
        options.Window = TimeSpan.FromMinutes(1);
    });
});

app.UseRateLimiter();

[EnableRateLimiting("api")]
[HttpGet]
public IActionResult GetAll() { }
```

**5. Use API Keys for Service-to-Service**
```csharp
public class ApiKeyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;
    
    public async Task InvokeAsync(HttpContext context)
    {
        if (!context.Request.Headers.TryGetValue("X-API-Key", out var apiKey))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("API Key missing");
            return;
        }
        
        var validKey = _configuration["ApiKey"];
        if (apiKey != validKey)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Invalid API Key");
            return;
        }
        
        await _next(context);
    }
}
```

**6. Implement Proper Error Handling**
```csharp
// Don't expose stack traces in production
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        
        var errorFeature = context.Features.Get<IExceptionHandlerFeature>();
        if (errorFeature != null)
        {
            var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
            logger.LogError(errorFeature.Error, "Unhandled exception");
            
            await context.Response.WriteAsJsonAsync(new
            {
                Error = "An error occurred",
                // Don't include errorFeature.Error.Message in production
            });
        }
    });
});
```

**7. Use Secure Configuration**
```csharp
// Use Azure Key Vault or User Secrets
builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{keyVaultName}.vault.azure.net/"),
    new DefaultAzureCredential());

// Never hardcode secrets
// ❌ BAD
var connectionString = "Server=...;Password=MyPassword123;";

// ✅ GOOD
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
```

**8. Implement Content Security Policy**
```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Add("X-Frame-Options", "DENY");
    context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Add(
        "Content-Security-Policy",
        "default-src 'self'");
    
    await next();
});
```

**9. Validate Authorization**
```csharp
[Authorize]
[HttpPut("{id}")]
public async Task<IActionResult> UpdateProduct(int id, ProductDto dto)
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var product = await _productService.GetByIdAsync(id);
    
    // Verify user owns the resource
    if (product.OwnerId.ToString() != userId)
        return Forbid();
    
    await _productService.UpdateAsync(dto);
    return NoContent();
}
```

**10. Keep Dependencies Updated**
```bash
# Regularly check for security updates
dotnet list package --vulnerable
dotnet list package --outdated
```

---

## Performance Optimization

### Q14: How do you implement caching in ASP.NET Core Web API?

**Answer:**

**1. Response Caching (HTTP Caching)**
```csharp
// Configure services
builder.Services.AddResponseCaching();

// Configure middleware
var app = builder.Build();
app.UseResponseCaching();

// Use in controllers
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    // Cache on client and server for 60 seconds
    [HttpGet]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
    public IActionResult GetAll()
    {
        var products = _productService.GetAll();
        return Ok(products);
    }
    
    // Don't cache
    [HttpGet("{id}")]
    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
    public IActionResult GetById(int id)
    {
        var product = _productService.GetById(id);
        return Ok(product);
    }
    
    // Use cache profile
    [HttpGet("featured")]
    [ResponseCache(CacheProfileName = "Default30")]
    public IActionResult GetFeatured()
    {
        return Ok(_productService.GetFeatured());
    }
}

// Configure cache profiles
builder.Services.AddControllers(options =>
{
    options.CacheProfiles.Add("Default30", new CacheProfile
    {
        Duration = 30,
        Location = ResponseCacheLocation.Any
    });
});
```

**2. Output Caching (.NET 7+) - Server-Side**
```csharp
builder.Services.AddOutputCache(options =>
{
    // Default policy
    options.AddBasePolicy(builder => builder.Cache());
    
    // Named policies
    options.AddPolicy("Expire20", builder =>
        builder.Expire(TimeSpan.FromSeconds(20)));
    
    options.AddPolicy("VaryByQuery", builder =>
        builder
            .Expire(TimeSpan.FromMinutes(5))
            .SetVaryByQuery("category", "page"));
    
    options.AddPolicy("VaryByUser", builder =>
        builder
            .Expire(TimeSpan.FromMinutes(10))
            .SetVaryByHeader("Authorization"));
});

var app = builder.Build();
app.UseOutputCache();

// Usage
[OutputCache(PolicyName = "Expire20")]
[HttpGet]
public IActionResult GetAll() { }

[OutputCache(PolicyName = "VaryByQuery")]
[HttpGet("search")]
public IActionResult Search(string category, int page) { }
```

**3. In-Memory Caching**
```csharp
builder.Services.AddMemoryCache();

public class ProductService
{
    private readonly IMemoryCache _cache;
    private readonly IProductRepository _repository;
    
    public async Task<Product> GetByIdAsync(int id)
    {
        var cacheKey = $"product_{id}";
        
        if (_cache.TryGetValue(cacheKey, out Product product))
            return product;
        
        product = await _repository.GetByIdAsync(id);
        
        var cacheOptions = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5),
            SlidingExpiration = TimeSpan.FromMinutes(2),
            Priority = CacheItemPriority.Normal
        };
        
        _cache.Set(cacheKey, product, cacheOptions);
        
        return product;
    }
    
    public void InvalidateCache(int id)
    {
        _cache.Remove($"product_{id}");
    }
}
```

**4. Distributed Caching (Redis)**
```csharp
// Install: Microsoft.Extensions.Caching.StackExchangeRedis
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration["Redis:Connection"];
    options.InstanceName = "WebAPI_";
});

public class ProductService
{
    private readonly IDistributedCache _cache;
    
    public async Task<Product> GetByIdAsync(int id)
    {
        var cacheKey = $"product_{id}";
        var cachedData = await _cache.GetStringAsync(cacheKey);
        
        if (cachedData != null)
        {
            return JsonSerializer.Deserialize<Product>(cachedData);
        }
        
        var product = await _repository.GetByIdAsync(id);
        
        var options = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10),
            SlidingExpiration = TimeSpan.FromMinutes(3)
        };
        
        await _cache.SetStringAsync(
            cacheKey,
            JsonSerializer.Serialize(product),
            options
        );
        
        return product;
    }
}
```

**Cache Invalidation Strategies:**
```csharp
[HttpPost]
public async Task<IActionResult> Create(ProductDto dto)
{
    var product = await _productService.CreateAsync(dto);
    
    // Invalidate list cache
    _cache.Remove("products_all");
    
    return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
}

[HttpPut("{id}")]
public async Task<IActionResult> Update(int id, ProductDto dto)
{
    await _productService.UpdateAsync(id, dto);
    
    // Invalidate specific product cache
    _cache.Remove($"product_{id}");
    _cache.Remove("products_all");
    
    return NoContent();
}
```

---

### Q15: How do you implement async/await properly in Web APIs?

**Answer:**

**Why Async/Await?**
- Frees up threads during I/O operations
- Improves scalability
- Better resource utilization
- Non-blocking execution

**Best Practices:**

**1. Use Async All the Way**
```csharp
// ✅ GOOD: Async all the way
[HttpGet]
public async Task<IActionResult> GetProducts()
{
    var products = await _repository.GetAllAsync();
    return Ok(products);
}

// ❌ BAD: Mixing sync and async
[HttpGet]
public IActionResult GetProducts()
{
    var products = _repository.GetAllAsync().Result;  // Blocks thread!
    return Ok(products);
}
```

**2. ConfigureAwait in Libraries**
```csharp
// In application code (controllers), no need for ConfigureAwait
public async Task<Product> GetProductAsync(int id)
{
    return await _repository.GetByIdAsync(id);
}

// In library code, use ConfigureAwait(false)
public async Task<Product> GetByIdAsync(int id)
{
    var product = await _context.Products
        .FirstOrDefaultAsync(p => p.Id == id)
        .ConfigureAwait(false);  // Don't capture context
    
    return product;
}
```

**3. Avoid Async Void**
```csharp
// ✅ GOOD: Return Task
private async Task LogAsync(string message)
{
    await _logger.WriteAsync(message);
}

// ❌ BAD: Async void (except event handlers)
private async void LogAsync(string message)  // Can't be awaited, swallows exceptions
{
    await _logger.WriteAsync(message);
}
```

**4. Use ValueTask for Hot Paths**
```csharp
public class CachedRepository
{
    private readonly Dictionary<int, Product> _cache = new();
    
    // ValueTask avoids allocation if cached
    public ValueTask<Product> GetByIdAsync(int id)
    {
        if (_cache.TryGetValue(id, out var product))
            return new ValueTask<Product>(product);  // Synchronous path
        
        return new ValueTask<Product>(LoadFromDatabaseAsync(id));  // Async path
    }
    
    private async Task<Product> LoadFromDatabaseAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        _cache[id] = product;
        return product;
    }
}
```

**5. Parallel Async Operations**
```csharp
[HttpGet("{id}/details")]
public async Task<IActionResult> GetProductDetails(int id)
{
    // Execute multiple async operations in parallel
    var productTask = _productService.GetByIdAsync(id);
    var reviewsTask = _reviewService.GetByProductIdAsync(id);
    var relatedTask = _productService.GetRelatedAsync(id);
    
    // Wait for all to complete
    await Task.WhenAll(productTask, reviewsTask, relatedTask);
    
    return Ok(new
    {
        Product = productTask.Result,
        Reviews = reviewsTask.Result,
        Related = relatedTask.Result
    });
}
```

**6. CancellationToken Support**
```csharp
[HttpGet]
public async Task<IActionResult> GetProducts(CancellationToken cancellationToken)
{
    // Cancellation propagates through entire chain
    var products = await _repository.GetAllAsync(cancellationToken);
    return Ok(products);
}

public async Task<List<Product>> GetAllAsync(CancellationToken cancellationToken)
{
    return await _context.Products
        .ToListAsync(cancellationToken);  // Respects cancellation
}
```

**7. Handle Exceptions Properly**
```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetProduct(int id)
{
    try
    {
        var product = await _productService.GetByIdAsync(id);
        if (product == null)
            return NotFound();
        
        return Ok(product);
    }
    catch (DbException ex)
    {
        _logger.LogError(ex, "Database error while fetching product {Id}", id);
        return StatusCode(500, "Database error occurred");
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Unexpected error while fetching product {Id}", id);
        return StatusCode(500, "An error occurred");
    }
}
```

---

## Testing

### Q16: How do you unit test Web API controllers?

**Answer:**

**Test Setup:**
```csharp
// Install packages:
// - xUnit
// - Moq
// - Microsoft.AspNetCore.Mvc.Testing

public class ProductsControllerTests
{
    private readonly Mock<IProductService> _mockService;
    private readonly ProductsController _controller;
    
    public ProductsControllerTests()
    {
        _mockService = new Mock<IProductService>();
        _controller = new ProductsController(_mockService.Object);
    }
    
    [Fact]
    public async Task GetAll_ReturnsOkResult_WithListOfProducts()
    {
        // Arrange
        var products = new List<Product>
        {
            new Product { Id = 1, Name = "Product 1", Price = 10.99m },
            new Product { Id = 2, Name = "Product 2", Price = 20.99m }
        };
        
        _mockService
            .Setup(s => s.GetAllAsync())
            .ReturnsAsync(products);
        
        // Act
        var result = await _controller.GetAll();
        
        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedProducts = Assert.IsAssignableFrom<IEnumerable<Product>>(okResult.Value);
        Assert.Equal(2, returnedProducts.Count());
    }
    
    [Fact]
    public async Task GetById_ReturnsNotFound_WhenProductDoesNotExist()
    {
        // Arrange
        _mockService
            .Setup(s => s.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync((Product)null);
        
        // Act
        var result = await _controller.GetById(999);
        
        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }
    
    [Fact]
    public async Task Create_ReturnsCreatedAtAction_WithCreatedProduct()
    {
        // Arrange
        var dto = new ProductDto { Name = "New Product", Price = 15.99m };
        var createdProduct = new Product { Id = 1, Name = dto.Name, Price = dto.Price };
        
        _mockService
            .Setup(s => s.CreateAsync(It.IsAny<ProductDto>()))
            .ReturnsAsync(createdProduct);
        
        // Act
        var result = await _controller.Create(dto);
        
        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        Assert.Equal(nameof(_controller.GetById), createdResult.ActionName);
        Assert.Equal(createdProduct.Id, ((Product)createdResult.Value).Id);
    }
    
    [Fact]
    public async Task Update_ReturnsBadRequest_WhenIdMismatch()
    {
        // Arrange
        var dto = new ProductDto { Id = 1, Name = "Updated", Price = 25.99m };
        
        // Act
        var result = await _controller.Update(999, dto);
        
        // Assert
        Assert.IsType<BadRequestResult>(result);
        _mockService.Verify(s => s.UpdateAsync(It.IsAny<ProductDto>()), Times.Never);
    }
}
```

**Testing with ModelState Validation:**
```csharp
[Fact]
public async Task Create_ReturnsBadRequest_WhenModelStateInvalid()
{
    // Arrange
    var dto = new ProductDto { Name = "", Price = -10 };  // Invalid
    _controller.ModelState.AddModelError("Name", "Name is required");
    _controller.ModelState.AddModelError("Price", "Price must be positive");
    
    // Act
    var result = await _controller.Create(dto);
    
    // Assert
    Assert.IsType<BadRequestObjectResult>(result.Result);
}
```

**Integration Testing:**
```csharp
public class ProductsIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;
    
    public ProductsIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }
    
    [Fact]
    public async Task GetAll_ReturnsSuccessStatusCode()
    {
        // Act
        var response = await _client.GetAsync("/api/products");
        
        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal("application/json; charset=utf-8", 
            response.Content.Headers.ContentType.ToString());
    }
    
    [Fact]
    public async Task Create_ReturnsCreatedProduct()
    {
        // Arrange
        var product = new { Name = "Test Product", Price = 29.99 };
        var content = new StringContent(
            JsonSerializer.Serialize(product),
            Encoding.UTF8,
            "application/json");
        
        // Act
        var response = await _client.PostAsync("/api/products", content);
        
        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.NotNull(response.Headers.Location);
    }
}
```

---

## Azure Deployment

### Q17: How do you deploy ASP.NET Core Web API to Azure App Service?

**Answer:**

**1. Prepare Application**
```bash
# Ensure production-ready
dotnet build --configuration Release
dotnet publish --configuration Release --output ./publish
```

**2. Configure for Azure (Program.cs)**
```csharp
var builder = WebApplication.CreateBuilder(args);

// Add Application Insights
builder.Services.AddApplicationInsightsTelemetry(
    builder.Configuration["ApplicationInsights:ConnectionString"]);

// Configure logging
builder.Logging.AddAzureWebAppDiagnostics();

// Health checks
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>();

var app = builder.Build();

// Use Azure-friendly error handling
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

app.MapHealthChecks("/health");
```

**3. Configuration (appsettings.json)**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=...;"
  },
  "ApplicationInsights": {
    "ConnectionString": ""
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    },
    "ApplicationInsights": {
      "LogLevel": {
        "Default": "Information"
      }
    }
  }
}
```

**4. Deploy via Azure CLI**
```bash
# Login to Azure
az login

# Create resource group
az group create --name myResourceGroup --location eastus

# Create App Service plan
az appservice plan create \
    --name myAppServicePlan \
    --resource-group myResourceGroup \
    --sku B1 \
    --is-linux

# Create Web App
az webapp create \
    --name myWebAPI \
    --resource-group myResourceGroup \
    --plan myAppServicePlan \
    --runtime "DOTNET|7.0"

# Deploy
az webapp deployment source config-zip \
    --resource-group myResourceGroup \
    --name myWebAPI \
    --src ./publish.zip
```

**5. Configure Application Settings**
```bash
# Set connection string
az webapp config connection-string set \
    --name myWebAPI \
    --resource-group myResourceGroup \
    --connection-string-type SQLAzure \
    --settings DefaultConnection="Server=...;Database=...;"

# Set app settings
az webapp config appsettings set \
    --name myWebAPI \
    --resource-group myResourceGroup \
    --settings \
        ApplicationInsights__ConnectionString="..." \
        ASPNETCORE_ENVIRONMENT="Production"
```

**6. CI/CD with GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Azure

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: '7.0.x'
    
    - name: Build
      run: dotnet build --configuration Release
    
    - name: Test
      run: dotnet test --no-build --configuration Release
    
    - name: Publish
      run: dotnet publish --configuration Release --output ./publish
    
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'myWebAPI'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ./publish
```

**7. Enable Managed Identity**
```csharp
// Access Azure resources without credentials
builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{keyVaultName}.vault.azure.net/"),
    new DefaultAzureCredential());

// Use Managed Identity for SQL
builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connectionString, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure();
    });
});
```

**8. Configure Scaling**
```bash
# Auto-scale based on metrics
az monitor autoscale create \
    --resource-group myResourceGroup \
    --resource myWebAPI \
    --resource-type Microsoft.Web/serverFarms \
    --name autoscale \
    --min-count 1 \
    --max-count 5 \
    --count 1

az monitor autoscale rule create \
    --resource-group myResourceGroup \
    --autoscale-name autoscale \
    --condition "CpuPercentage > 70 avg 5m" \
    --scale out 1
```

---

# Code Samples

## 1. Complete Web API with CRUD Operations

### Domain Models

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class ProductDto
{
    [Required(ErrorMessage = "Product name is required")]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; }
    
    [MaxLength(500)]
    public string Description { get; set; }
    
    [Required]
    [Range(0.01, 100000.00)]
    public decimal Price { get; set; }
    
    [Required]
    [StringLength(50)]
    public string Category { get; set; }
    
    [Range(0, int.MaxValue)]
    public int Stock { get; set; }
}
```

### Repository Pattern

```csharp
public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product> GetByIdAsync(int id);
    Task<Product> CreateAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;
    
    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _context.Products
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }
    
    public async Task<Product> GetByIdAsync(int id)
    {
        return await _context.Products.FindAsync(id);
    }
    
    public async Task<Product> CreateAsync(Product product)
    {
        product.CreatedAt = DateTime.UtcNow;
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }
    
    public async Task UpdateAsync(Product product)
    {
        product.UpdatedAt = DateTime.UtcNow;
        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
    
    public async Task DeleteAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product != null)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
    
    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Products.AnyAsync(p => p.Id == id);
    }
}
```

### Service Layer

```csharp
public interface IProductService
{
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product> GetByIdAsync(int id);
    Task<Product> CreateAsync(ProductDto dto);
    Task UpdateAsync(int id, ProductDto dto);
    Task DeleteAsync(int id);
}

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly ILogger<ProductService> _logger;
    private readonly IMapper _mapper;
    
    public ProductService(
        IProductRepository repository,
        ILogger<ProductService> logger,
        IMapper mapper)
    {
        _repository = repository;
        _logger = logger;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        _logger.LogInformation("Fetching all products");
        return await _repository.GetAllAsync();
    }
    
    public async Task<Product> GetByIdAsync(int id)
    {
        _logger.LogInformation("Fetching product with ID: {ProductId}", id);
        var product = await _repository.GetByIdAsync(id);
        
        if (product == null)
        {
            _logger.LogWarning("Product with ID {ProductId} not found", id);
            throw new NotFoundException($"Product with ID {id} not found");
        }
        
        return product;
    }
    
    public async Task<Product> CreateAsync(ProductDto dto)
    {
        _logger.LogInformation("Creating new product: {ProductName}", dto.Name);
        var product = _mapper.Map<Product>(dto);
        var created = await _repository.CreateAsync(product);
        _logger.LogInformation("Product created with ID: {ProductId}", created.Id);
        return created;
    }
    
    public async Task UpdateAsync(int id, ProductDto dto)
    {
        _logger.LogInformation("Updating product with ID: {ProductId}", id);
        
        if (!await _repository.ExistsAsync(id))
        {
            throw new NotFoundException($"Product with ID {id} not found");
        }
        
        var product = _mapper.Map<Product>(dto);
        product.Id = id;
        await _repository.UpdateAsync(product);
        
        _logger.LogInformation("Product with ID {ProductId} updated", id);
    }
    
    public async Task DeleteAsync(int id)
    {
        _logger.LogInformation("Deleting product with ID: {ProductId}", id);
        
        if (!await _repository.ExistsAsync(id))
        {
            throw new NotFoundException($"Product with ID {id} not found");
        }
        
        await _repository.DeleteAsync(id);
        _logger.LogInformation("Product with ID {ProductId} deleted", id);
    }
}
```

### Controller

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductsController> _logger;
    
    public ProductsController(
        IProductService productService,
        ILogger<ProductsController> logger)
    {
        _productService = productService;
        _logger = logger;
    }
    
    /// <summary>
    /// Gets all products
    /// </summary>
    /// <returns>List of products</returns>
    [HttpGet]
    [AllowAnonymous]
    [ResponseCache(Duration = 60)]
    [ProducesResponseType(typeof(IEnumerable<Product>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        var products = await _productService.GetAllAsync();
        return Ok(products);
    }
    
    /// <summary>
    /// Gets a specific product by ID
    /// </summary>
    /// <param name="id">Product ID</param>
    /// <returns>Product details</returns>
    [HttpGet("{id}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        try
        {
            var product = await _productService.GetByIdAsync(id);
            return Ok(product);
        }
        catch (NotFoundException ex)
        {
            return NotFound(new { Message = ex.Message });
        }
    }
    
    /// <summary>
    /// Creates a new product
    /// </summary>
    /// <param name="dto">Product data</param>
    /// <returns>Created product</returns>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Product>> Create([FromBody] ProductDto dto)
    {
        var product = await _productService.CreateAsync(dto);
        return CreatedAtAction(
            nameof(GetById),
            new { id = product.Id },
            product
        );
    }
    
    /// <summary>
    /// Updates an existing product
    /// </summary>
    /// <param name="id">Product ID</param>
    /// <param name="dto">Updated product data</param>
    /// <returns>No content</returns>
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] ProductDto dto)
    {
        try
        {
            await _productService.UpdateAsync(id, dto);
            return NoContent();
        }
        catch (NotFoundException ex)
        {
            return NotFound(new { Message = ex.Message });
        }
    }
    
    /// <summary>
    /// Deletes a product
    /// </summary>
    /// <param name="id">Product ID</param>
    /// <returns>No content</returns>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _productService.DeleteAsync(id);
            return NoContent();
        }
        catch (NotFoundException ex)
        {
            return NotFound(new { Message = ex.Message });
        }
    }
}
```

## 2. Custom Middleware Example

```csharp
// Request/Response logging middleware
public class RequestResponseLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestResponseLoggingMiddleware> _logger;
    
    public RequestResponseLoggingMiddleware(
        RequestDelegate next,
        ILogger<RequestResponseLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        // Log request
        await LogRequest(context);
        
        // Copy original response stream
        var originalBodyStream = context.Response.Body;
        
        using var responseBody = new MemoryStream();
        context.Response.Body = responseBody;
        
        try
        {
            await _next(context);
            
            // Log response
            await LogResponse(context);
        }
        finally
        {
            // Copy response back to original stream
            await responseBody.CopyToAsync(originalBodyStream);
        }
    }
    
    private async Task LogRequest(HttpContext context)
    {
        context.Request.EnableBuffering();
        
        var requestBody = await new StreamReader(context.Request.Body)
            .ReadToEndAsync();
        context.Request.Body.Position = 0;
        
        _logger.LogInformation(
            "HTTP Request: {Method} {Path} {QueryString} | Body: {Body}",
            context.Request.Method,
            context.Request.Path,
            context.Request.QueryString,
            requestBody
        );
    }
    
    private async Task LogResponse(HttpContext context)
    {
        context.Response.Body.Seek(0, SeekOrigin.Begin);
        var responseBody = await new StreamReader(context.Response.Body)
            .ReadToEndAsync();
        context.Response.Body.Seek(0, SeekOrigin.Begin);
        
        _logger.LogInformation(
            "HTTP Response: {StatusCode} | Body: {Body}",
            context.Response.StatusCode,
            responseBody
        );
    }
}

// Extension method
public static class RequestResponseLoggingMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestResponseLogging(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RequestResponseLoggingMiddleware>();
    }
}
```

## 3. Global Exception Handler

```csharp
public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;
    private readonly IHostEnvironment _env;
    
    public GlobalExceptionHandlerMiddleware(
        RequestDelegate next,
        ILogger<GlobalExceptionHandlerMiddleware> logger,
        IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
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
    
    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var (statusCode, message) = exception switch
        {
            NotFoundException => (StatusCodes.Status404NotFound, exception.Message),
            ValidationException => (StatusCodes.Status400BadRequest, exception.Message),
            UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, "Unauthorized"),
            ForbiddenException => (StatusCodes.Status403Forbidden, "Forbidden"),
            _ => (StatusCodes.Status500InternalServerError, "An internal server error occurred")
        };
        
        var response = new ErrorResponse
        {
            StatusCode = statusCode,
            Message = message,
            Timestamp = DateTime.UtcNow
        };
        
        // Include stack trace in development
        if (_env.IsDevelopment())
        {
            response.Detail = exception.ToString();
        }
        
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;
        
        return context.Response.WriteAsJsonAsync(response);
    }
}

public class ErrorResponse
{
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public DateTime Timestamp { get; set; }
    public string Detail { get; set; }
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

public class ForbiddenException : Exception
{
    public ForbiddenException(string message) : base(message) { }
}
```

## 4. JWT Authentication Complete Setup

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Configure JWT
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.Configure<JwtSettings>(jwtSettings);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var secretKey = Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]);
        
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(secretKey),
            ClockSkew = TimeSpan.Zero
        };
        
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                {
                    context.Response.Headers.Add("Token-Expired", "true");
                }
                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                context.HandleResponse();
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                return context.Response.WriteAsync(JsonSerializer.Serialize(new
                {
                    error = "Unauthorized",
                    message = "You are not authorized to access this resource"
                }));
            }
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("UserOnly", policy => policy.RequireRole("User", "Admin"));
});

// Auth Service
public interface IAuthService
{
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task<AuthResponse> RefreshTokenAsync(string refreshToken);
}

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthService> _logger;
    
    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByUsernameAsync(request.Username);
        
        if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
        {
            _logger.LogWarning("Failed login attempt for user: {Username}", request.Username);
            throw new UnauthorizedAccessException("Invalid credentials");
        }
        
        var token = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken();
        
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await _userRepository.UpdateAsync(user);
        
        return new AuthResponse
        {
            Token = token,
            RefreshToken = refreshToken,
            ExpiresIn = 3600
        };
    }
    
    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var secretKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
        
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };
        
        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(60),
            signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256)
        );
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    private string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
    
    private bool VerifyPassword(string password, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }
}

// Auth Controller
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
    {
        try
        {
            var response = await _authService.LoginAsync(request);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
    
    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<ActionResult<AuthResponse>> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var response = await _authService.RefreshTokenAsync(request.RefreshToken);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
    
    [HttpPost("logout")]
    [Authorize]
    public IActionResult Logout()
    {
        // Implement token blacklisting if needed
        return Ok(new { message = "Logged out successfully" });
    }
}
```

## 5. API Versioning Implementation

```csharp
// Program.cs
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    options.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader(),
        new HeaderApiVersionReader("X-API-Version")
    );
});

builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});

// Version 1.0 Controller
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
public class ProductsV1Controller : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(new { version = "1.0", products = new[] { "Product1", "Product2" } });
    }
}

// Version 2.0 Controller with new features
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("2.0")]
public class ProductsV2Controller : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        // Version 2.0 adds pagination
        return Ok(new
        {
            version = "2.0",
            page,
            pageSize,
            products = new[] { "Product1", "Product2", "Product3" }
        });
    }
    
    [HttpGet("featured")]
    public IActionResult GetFeatured()
    {
        // New endpoint in v2.0
        return Ok(new { featured = true });
    }
}

// Support multiple versions in same controller
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
[ApiVersion("2.0")]
public class CategoriesController : ControllerBase
{
    [HttpGet]
    [MapToApiVersion("1.0")]
    public IActionResult GetAllV1()
    {
        return Ok("Categories V1");
    }
    
    [HttpGet]
    [MapToApiVersion("2.0")]
    public IActionResult GetAllV2()
    {
        return Ok("Categories V2 with enhanced data");
    }
}
```

## 6. Swagger Configuration with Versioning

```csharp
// Program.cs
builder.Services.AddSwaggerGen(options =>
{
    var provider = builder.Services.BuildServiceProvider()
        .GetRequiredService<IApiVersionDescriptionProvider>();
    
    foreach (var description in provider.ApiVersionDescriptions)
    {
        options.SwaggerDoc(
            description.GroupName,
            new OpenApiInfo
            {
                Title = $"My API {description.ApiVersion}",
                Version = description.ApiVersion.ToString(),
                Description = "ASP.NET Core Web API with versioning"
            });
    }
    
    // JWT Authentication
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
    
    // XML comments
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        var provider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();
        
        foreach (var description in provider.ApiVersionDescriptions)
        {
            options.SwaggerEndpoint(
                $"/swagger/{description.GroupName}/swagger.json",
                description.GroupName.ToUpperInvariant());
        }
    });
}
```

## 7. Integration Testing Example

```csharp
public class ProductsIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;
    
    public ProductsIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Remove real database
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
                if (descriptor != null)
                    services.Remove(descriptor);
                
                // Add in-memory database
                services.AddDbContext<AppDbContext>(options =>
                {
                    options.UseInMemoryDatabase("TestDb");
                });
                
                // Seed test data
                var sp = services.BuildServiceProvider();
                using var scope = sp.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.EnsureCreated();
                SeedTestData(db);
            });
        });
        
        _client = _factory.CreateClient();
    }
    
    private void SeedTestData(AppDbContext context)
    {
        context.Products.AddRange(
            new Product { Id = 1, Name = "Test Product 1", Price = 10.99m },
            new Product { Id = 2, Name = "Test Product 2", Price = 20.99m }
        );
        context.SaveChanges();
    }
    
    [Fact]
    public async Task GetAll_ReturnsOkWithProducts()
    {
        // Act
        var response = await _client.GetAsync("/api/products");
        
        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var products = JsonSerializer.Deserialize<List<Product>>(content);
        Assert.Equal(2, products.Count);
    }
    
    [Fact]
    public async Task Create_WithValidData_ReturnsCreated()
    {
        // Arrange
        var newProduct = new { Name = "New Product", Price = 29.99, Category = "Test", Stock = 10 };
        var content = new StringContent(
            JsonSerializer.Serialize(newProduct),
            Encoding.UTF8,
            "application/json");
        
        // Act
        var response = await _client.PostAsync("/api/products", content);
        
        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.NotNull(response.Headers.Location);
    }
    
    [Fact]
    public async Task GetById_WithInvalidId_ReturnsNotFound()
    {
        // Act
        var response = await _client.GetAsync("/api/products/999");
        
        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
```

---

# TL;DR Summary

## 🎯 Quick Reference

### HTTP Methods

| Method | Purpose | Idempotent | Safe | Request Body | Response Body |
|--------|---------|------------|------|--------------|---------------|
| GET | Retrieve resource(s) | Yes | Yes | No | Yes |
| POST | Create new resource | No | No | Yes | Yes |
| PUT | Replace entire resource | Yes | No | Yes | Optional |
| PATCH | Partial update | No | No | Yes | Optional |
| DELETE | Remove resource | Yes | No | No | Optional |

### Common HTTP Status Codes

**Success (2xx)**
- `200 OK` - Request succeeded
- `201 Created` - Resource created (POST)
- `202 Accepted` - Async request accepted
- `204 No Content` - Success with no body (DELETE, PUT)

**Client Errors (4xx)**
- `400 Bad Request` - Invalid input/validation failed
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource doesn't exist
- `409 Conflict` - Resource state conflict
- `422 Unprocessable Entity` - Semantic validation failed
- `429 Too Many Requests` - Rate limit exceeded

**Server Errors (5xx)**
- `500 Internal Server Error` - Unexpected error
- `502 Bad Gateway` - Invalid upstream response
- `503 Service Unavailable` - Server down
- `504 Gateway Timeout` - Upstream timeout

## 🔑 Key Takeaways

### 1. RESTful API Design
- Use nouns for resources, not verbs (`/products`, not `/getProducts`)
- Use HTTP methods correctly (GET for read, POST for create, etc.)
- Use proper status codes
- Design for statelessness
- Version your APIs from the start

### 2. ASP.NET Core Web API Essentials
- Use `[ApiController]` attribute for automatic model validation
- Prefer attribute routing over conventional routing
- Use async/await for all I/O operations
- Implement proper exception handling
- Use dependency injection for all services

### 3. Security First
- Always use HTTPS in production
- Implement JWT authentication for stateless auth
- Configure CORS properly (never AllowAnyOrigin in production)
- Validate all input with data annotations or FluentValidation
- Use parameterized queries to prevent SQL injection
- Implement rate limiting to prevent abuse
- Store secrets in Azure Key Vault, not appsettings.json

### 4. Performance Optimization
- Use response caching for read-heavy endpoints
- Implement distributed caching (Redis) for scalability
- Use async/await properly (don't block with .Result or .Wait())
- Enable response compression
- Use pagination for large datasets
- Optimize database queries (avoid N+1 problems)

### 5. Middleware Pipeline Order
```
1. Exception Handler (UseExceptionHandler)
2. HTTPS Redirection (UseHttpsRedirection)
3. Static Files (UseStaticFiles)
4. Routing (UseRouting)
5. CORS (UseCors)
6. Authentication (UseAuthentication)
7. Authorization (UseAuthorization)
8. Custom Middleware
9. Endpoints (MapControllers)
```

### 6. Dependency Injection Lifetimes
- **Transient**: New instance every time (stateless services)
- **Scoped**: One instance per request (DbContext, repositories)
- **Singleton**: One instance for application lifetime (caches, configuration)

**Golden Rule**: Never inject scoped/transient services into singletons

### 7. Authentication vs Authorization
- **Authentication**: Who are you? (Identity)
- **Authorization**: What can you do? (Permissions)
- Order: Authentication → Authorization
- Use JWT for API authentication
- Use policies for complex authorization logic

### 8. API Versioning Strategies
- **URL Versioning**: `/api/v1/products` (Most visible, recommended)
- **Header Versioning**: `X-API-Version: 2.0` (Clean URLs)
- **Query String**: `/api/products?api-version=2.0` (Easy to test)
- **Media Type**: `Accept: application/json;v=2.0` (True REST)

Choose one and stick with it!

### 9. Testing Pyramid
- **Unit Tests**: Fast, test business logic in isolation
- **Integration Tests**: Test HTTP endpoints with TestServer
- **End-to-End Tests**: Test full system with real dependencies

Focus on high coverage of unit and integration tests.

### 10. Azure Deployment Essentials
- Use Azure App Service for managed hosting
- Enable Application Insights for monitoring
- Use Azure Key Vault for secrets
- Configure auto-scaling based on metrics
- Set up CI/CD with GitHub Actions or Azure DevOps
- Use Managed Identity to access Azure resources

## ✅ Best Practices Checklist

### API Design
- [ ] Use RESTful principles
- [ ] Version APIs from the start
- [ ] Use proper HTTP methods and status codes
- [ ] Design for statelessness
- [ ] Implement HATEOAS for Level 3 REST maturity
- [ ] Document APIs with Swagger/OpenAPI
- [ ] Use consistent naming conventions
- [ ] Implement pagination for collections
- [ ] Support filtering, sorting, and searching

### Security
- [ ] Enforce HTTPS everywhere
- [ ] Implement authentication (JWT/OAuth)
- [ ] Use authorization policies
- [ ] Configure CORS properly
- [ ] Validate all input
- [ ] Prevent SQL injection (use parameterized queries)
- [ ] Implement rate limiting
- [ ] Use Azure Key Vault for secrets
- [ ] Enable Managed Identity
- [ ] Add security headers (X-Content-Type-Options, X-Frame-Options, etc.)

### Performance
- [ ] Use async/await for I/O operations
- [ ] Implement response caching
- [ ] Use distributed caching (Redis)
- [ ] Enable response compression
- [ ] Optimize database queries
- [ ] Use pagination
- [ ] Implement connection pooling
- [ ] Profile and monitor performance
- [ ] Use CDN for static content

### Error Handling
- [ ] Implement global exception handler
- [ ] Use Problem Details (RFC 7807)
- [ ] Log all errors with context
- [ ] Don't expose stack traces in production
- [ ] Return appropriate status codes
- [ ] Provide meaningful error messages
- [ ] Implement circuit breakers for external dependencies

### Code Quality
- [ ] Follow SOLID principles
- [ ] Use dependency injection
- [ ] Implement repository pattern
- [ ] Separate DTOs from domain models
- [ ] Use AutoMapper for object mapping
- [ ] Write unit tests (> 80% coverage)
- [ ] Write integration tests
- [ ] Use code analyzers and linters
- [ ] Follow coding conventions

### Monitoring & Logging
- [ ] Integrate Application Insights
- [ ] Log important events (not everything)
- [ ] Use structured logging
- [ ] Implement health checks
- [ ] Monitor API performance
- [ ] Set up alerts for errors
- [ ] Track business metrics

### Deployment
- [ ] Use CI/CD pipelines
- [ ] Implement blue-green or canary deployments
- [ ] Configure auto-scaling
- [ ] Use staging environments
- [ ] Implement feature flags
- [ ] Maintain deployment documentation

## ❌ Common Pitfalls to Avoid

### 1. Blocking Async Code
```csharp
// ❌ BAD: Deadlock risk
var result = SomeAsyncMethod().Result;
var result = SomeAsyncMethod().GetAwaiter().GetResult();

// ✅ GOOD: Await properly
var result = await SomeAsyncMethod();
```

### 2. Not Disposing Resources
```csharp
// ❌ BAD: Resource leak
var stream = new FileStream("file.txt", FileMode.Open);
// Use stream...

// ✅ GOOD: Auto-dispose
using var stream = new FileStream("file.txt", FileMode.Open);
// Automatically disposed
```

### 3. Mixing Sync and Async
```csharp
// ❌ BAD: Sync wrapper around async
public Product GetProduct(int id)
{
    return _repository.GetByIdAsync(id).Result;
}

// ✅ GOOD: Async all the way
public async Task<Product> GetProductAsync(int id)
{
    return await _repository.GetByIdAsync(id);
}
```

### 4. Not Validating Input
```csharp
// ❌ BAD: No validation
[HttpPost]
public IActionResult Create(ProductDto dto)
{
    var product = _service.Create(dto);  // What if dto is invalid?
    return Ok(product);
}

// ✅ GOOD: Validation with data annotations + [ApiController]
public class ProductDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; }
    
    [Range(0.01, 10000)]
    public decimal Price { get; set; }
}
```

### 5. Exposing Internal Errors
```csharp
// ❌ BAD: Exposes implementation details
catch (Exception ex)
{
    return StatusCode(500, ex.ToString());  // Stack trace exposed!
}

// ✅ GOOD: Generic error message
catch (Exception ex)
{
    _logger.LogError(ex, "Error processing request");
    return StatusCode(500, "An error occurred");
}
```

### 6. Not Using Pagination
```csharp
// ❌ BAD: Returns all records
[HttpGet]
public async Task<IActionResult> GetAll()
{
    var products = await _context.Products.ToListAsync();  // Could be millions!
    return Ok(products);
}

// ✅ GOOD: Paginated results
[HttpGet]
public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
{
    var products = await _context.Products
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    return Ok(products);
}
```

### 7. Captive Dependencies
```csharp
// ❌ BAD: Singleton holding scoped service
public class SingletonService
{
    private readonly ScopedService _scoped;  // WRONG! Lives too long
}

// ✅ GOOD: Use IServiceProvider
public class SingletonService
{
    private readonly IServiceProvider _provider;
    
    public void DoWork()
    {
        using var scope = _provider.CreateScope();
        var scoped = scope.ServiceProvider.GetRequiredService<ScopedService>();
        // Use scoped service
    }
}
```

### 8. Not Handling Cancellation
```csharp
// ❌ BAD: Ignores cancellation
[HttpGet]
public async Task<IActionResult> GetProducts()
{
    var products = await _repository.GetAllAsync();
    return Ok(products);
}

// ✅ GOOD: Respects cancellation
[HttpGet]
public async Task<IActionResult> GetProducts(CancellationToken cancellationToken)
{
    var products = await _repository.GetAllAsync(cancellationToken);
    return Ok(products);
}
```

### 9. Hardcoding Configuration
```csharp
// ❌ BAD: Hardcoded secrets
var connectionString = "Server=...;Password=MyPassword123;";

// ✅ GOOD: Configuration from appsettings/Key Vault
var connectionString = _configuration.GetConnectionString("DefaultConnection");
```

### 10. Not Implementing Retry Logic
```csharp
// ❌ BAD: No retry for transient failures
var response = await _httpClient.GetAsync(url);

// ✅ GOOD: Use Polly for retry policy
var retryPolicy = Policy
    .Handle<HttpRequestException>()
    .WaitAndRetryAsync(3, retryAttempt => 
        TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

var response = await retryPolicy.ExecuteAsync(
    () => _httpClient.GetAsync(url));
```

## 🚀 Must-Know Concepts for Interviews

1. **REST Principles**: Stateless, cacheable, uniform interface
2. **HTTP Methods**: GET, POST, PUT, PATCH, DELETE semantics
3. **Status Codes**: 200, 201, 204, 400, 401, 403, 404, 500
4. **Middleware Pipeline**: Order matters (Exception → HTTPS → Routing → CORS → Auth)
5. **Dependency Injection**: Transient vs Scoped vs Singleton
6. **Authentication**: JWT, OAuth 2.0, Azure AD
7. **Authorization**: Role-based, claims-based, policy-based
8. **CORS**: Why it exists, how to configure
9. **Versioning**: URL, header, query string strategies
10. **Caching**: Response caching, output caching, distributed caching
11. **Rate Limiting**: Fixed window, sliding window, token bucket
12. **Error Handling**: Global exception handler, Problem Details
13. **Async/Await**: When to use, common pitfalls
14. **Testing**: Unit tests with Moq, integration tests with TestServer
15. **Azure Deployment**: App Service, API Management, Application Insights

## 📚 Recommended Resources

### Official Documentation
- [ASP.NET Core Web API Documentation](https://docs.microsoft.com/en-us/aspnet/core/web-api/)
- [REST API Guidelines](https://github.com/microsoft/api-guidelines)
- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)

### Books
- "RESTful Web APIs" by Leonard Richardson
- "Web API Design: The Missing Link" by Brian Mulloy
- "Building Microservices" by Sam Newman
- "Clean Architecture" by Robert C. Martin

### Online Resources
- [REST API Tutorial](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [JWT.io](https://jwt.io/)
- [Swagger/OpenAPI](https://swagger.io/)

## 🎯 Final Interview Tips

1. **Explain Your Thinking**: Walk through your design decisions
2. **Consider Trade-offs**: Every choice has pros and cons
3. **Think About Scale**: How does your solution handle 1M users?
4. **Security First**: Always consider security implications
5. **Ask Questions**: Clarify requirements before coding
6. **Handle Edge Cases**: Null checks, empty collections, invalid input
7. **Be Honest**: Say "I don't know" rather than guess
8. **Show Real Experience**: Discuss projects you've worked on
9. **Know Your Tools**: Understand the frameworks you use
10. **Stay Current**: Be aware of latest .NET features

## 🏆 You're Ready!

This comprehensive guide covers everything you need to know about ASP.NET Core Web API for Azure Cloud FullStack Developer interviews. Remember:

- **Master the fundamentals**: REST, HTTP, status codes
- **Understand ASP.NET Core**: Middleware, DI, filters, routing
- **Security is critical**: HTTPS, JWT, CORS, validation
- **Performance matters**: Async, caching, optimization
- **Test your code**: Unit tests and integration tests
- **Deploy to Azure**: App Service, API Management, Application Insights
- **Keep learning**: Technology evolves constantly

**Good luck with your interviews!** 🎉

---

**Document Metadata:**
- **Last Updated**: November 19, 2025
- **Version**: 1.0
- **Target**: Azure Cloud FullStack Developer Interviews
- **Total Sections**: 5 (Introduction, Core Concepts, Q&A, Code Samples, TL;DR)
- **Total Questions Covered**: 17+ with detailed answers
- **Code Examples**: 30+ production-ready samples
- **Estimated Reading Time**: 4-5 hours
- **Practice Time Recommended**: 30-40 hours

---

*Happy coding and best wishes for your career! 🎯*
