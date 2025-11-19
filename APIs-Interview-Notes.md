# 🎯 APIs Interview Preparation: Azure Cloud FullStack Developer

**Last Updated:** November 19, 2025  
**Target Role:** Azure Cloud FullStack Developer  
**Difficulty Level:** Beginner to Advanced  
**Estimated Prep Time:** 20-30 hours

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Core Concepts](#core-concepts)
3. [Q&A Section](#qa-section)
4. [Code Samples](#code-samples)
5. [TL;DR Summary](#tldr-summary)

---

# Introduction

## Overview of APIs in Azure Cloud Context

Application Programming Interfaces (APIs) are the backbone of modern cloud applications and microservices architecture on Azure. As an Azure Cloud FullStack Developer, API expertise is crucial for:

- **Service Communication**: Enabling seamless communication between distributed services and applications
- **Data Integration**: Connecting various data sources, third-party services, and Azure services
- **Client-Server Architecture**: Building scalable web applications, mobile apps, and SPAs
- **Microservices**: Designing loosely coupled, independently deployable services
- **Azure Integration**: Leveraging Azure API Management, Application Gateway, and service-to-service communication
- **DevOps & Monitoring**: Implementing API versioning, monitoring, and automated testing strategies

## Key Areas to Focus for Interviews

### 1. **API Fundamentals**

- REST architectural principles and constraints
- HTTP protocol deep dive (methods, status codes, headers)
- API design patterns and best practices
- Resource modeling and URI design
- Content negotiation and media types
- Idempotency and safety concepts

### 2. **Authentication & Authorization**

- JWT (JSON Web Tokens) structure and implementation
- OAuth 2.0 flows and grant types
- OpenID Connect for identity
- API keys and token-based authentication
- Azure Active Directory integration
- Role-based access control (RBAC)

### 3. **API Design & Architecture**

- RESTful API design principles
- GraphQL schema design and resolvers
- gRPC and Protocol Buffers
- API versioning strategies
- HATEOAS (Hypermedia as the Engine of Application State)
- API documentation with OpenAPI/Swagger

### 4. **Security Best Practices**

- Input validation and sanitization
- Rate limiting and throttling
- CORS (Cross-Origin Resource Sharing)
- API security headers and HTTPS
- SQL injection and XSS prevention
- Secure API key management

### 5. **Performance & Scalability**

- Caching strategies (HTTP caching, Redis, CDN)
- Pagination and filtering patterns
- Compression and optimization techniques
- Load balancing and failover
- Circuit breaker pattern
- Async processing and message queues

### 6. **Azure API Management**

- API Gateway patterns and benefits
- Azure API Management features and policies
- API monetization and analytics
- Developer portal and documentation
- API security and transformation policies
- Integration with Azure services

### 7. **Modern API Technologies**

- GraphQL vs REST comparison
- Real-time APIs (WebSockets, Server-Sent Events)
- Webhook implementation patterns
- Event-driven architecture
- API composition and aggregation
- Serverless APIs with Azure Functions

### 8. **Testing & Monitoring**

- Unit testing API endpoints
- Integration testing strategies
- Contract testing with tools like Pact
- API monitoring and observability
- Health checks and status endpoints
- Error handling and logging patterns

### 9. **Development Frameworks**

- ASP.NET Core Web API development
- Minimal APIs in .NET 6+
- Node.js/Express.js API development
- TypeScript for type-safe API development
- Dependency injection in API projects
- Middleware and request pipelines

---

# Core Concepts

## 1. API Fundamentals

### REST Architectural Principles

**REST (Representational State Transfer)** is an architectural style for designing networked applications. It defines six key constraints:

#### **1. Client-Server Architecture**

- Clear separation between client and server responsibilities
- Server manages data storage and business logic
- Client handles user interface and user experience
- Independent evolution of client and server components

#### **2. Stateless**

- Each request contains all information needed to process it
- Server doesn't store client context between requests
- Improves scalability and reliability
- Simplifies server implementation

```csharp
// Stateless API - all info in request
[HttpGet("users/{id}/orders")]
public async Task<IActionResult> GetUserOrders(int id, [FromQuery] OrderFilter filter)
{
    // No server-side session state
    var orders = await _orderService.GetUserOrdersAsync(id, filter);
    return Ok(orders);
}
```

#### **3. Cacheable**

- Responses must be explicitly marked as cacheable or non-cacheable
- Improves performance and scalability
- Reduces server load and network latency

```csharp
[HttpGet("products/{id}")]
[ResponseCache(Duration = 300)] // Cache for 5 minutes
public async Task<IActionResult> GetProduct(int id)
{
    var product = await _productService.GetByIdAsync(id);
    return Ok(product);
}
```

#### **4. Uniform Interface**

- Consistent interface between components
- Resource identification through URIs
- Resource manipulation through representations
- Self-descriptive messages
- HATEOAS (Hypermedia as the Engine of Application State)

#### **5. Layered System**

- Architecture can have multiple layers (gateways, proxies, load balancers)
- Each layer only knows about the immediate layer it communicates with
- Improves system scalability and security

#### **6. Code on Demand (Optional)**

- Server can send executable code to client
- Extends client functionality dynamically
- Rarely used in modern REST APIs

### HTTP Protocol Deep Dive

#### **HTTP Methods and Their Purpose**

```csharp
// GET - Retrieve resource (Safe & Idempotent)
[HttpGet("api/users/{id}")]
public async Task<User> GetUser(int id) { }

// POST - Create new resource (Not Safe, Not Idempotent)
[HttpPost("api/users")]
public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request) { }

// PUT - Update/Replace entire resource (Not Safe, Idempotent)
[HttpPut("api/users/{id}")]
public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserRequest request) { }

// PATCH - Partial update (Not Safe, Not Idempotent)
[HttpPatch("api/users/{id}")]
public async Task<IActionResult> PatchUser(int id, [FromBody] JsonPatchDocument<User> patch) { }

// DELETE - Remove resource (Not Safe, Idempotent)
[HttpDelete("api/users/{id}")]
public async Task<IActionResult> DeleteUser(int id) { }

// HEAD - Get headers without body (Safe & Idempotent)
[HttpHead("api/users/{id}")]
public async Task<IActionResult> CheckUserExists(int id) { }

// OPTIONS - Get allowed methods (Safe & Idempotent)
[HttpOptions("api/users")]
public IActionResult GetUserOptions()
{
    Response.Headers.Add("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    return Ok();
}
```

#### **HTTP Status Codes Categories**

```csharp
public class ApiResponse<T>
{
    public T Data { get; set; }
    public string Message { get; set; }
    public bool Success { get; set; }
    public int StatusCode { get; set; }
}

// 2xx Success
return Ok(data);                    // 200 OK
return Created($"api/users/{id}", user); // 201 Created
return NoContent();                 // 204 No Content

// 3xx Redirection
return RedirectToAction("GetUser", new { id }); // 302 Found
return RedirectToActionPermanent("GetUser", new { id }); // 301 Moved Permanently

// 4xx Client Errors
return BadRequest("Invalid input");    // 400 Bad Request
return Unauthorized();                 // 401 Unauthorized
return Forbid();                      // 403 Forbidden
return NotFound();                    // 404 Not Found
return Conflict("User already exists"); // 409 Conflict
return UnprocessableEntity(errors);    // 422 Unprocessable Entity

// 5xx Server Errors
return StatusCode(500, "Internal server error"); // 500 Internal Server Error
return StatusCode(502, "Bad Gateway");           // 502 Bad Gateway
return StatusCode(503, "Service Unavailable");  // 503 Service Unavailable
```

### Resource Modeling and URI Design

#### **RESTful Resource Design Principles**

```csharp
// Good URI Design Examples
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    // Collection of users
    [HttpGet] // GET /api/users
    public async Task<IActionResult> GetUsers([FromQuery] UserFilter filter) { }

    // Specific user
    [HttpGet("{id}")] // GET /api/users/123
    public async Task<IActionResult> GetUser(int id) { }

    // Nested resource - user's orders
    [HttpGet("{userId}/orders")] // GET /api/users/123/orders
    public async Task<IActionResult> GetUserOrders(int userId) { }

    // Specific nested resource
    [HttpGet("{userId}/orders/{orderId}")] // GET /api/users/123/orders/456
    public async Task<IActionResult> GetUserOrder(int userId, int orderId) { }
}

// Resource Actions (Non-CRUD Operations)
[HttpPost("{id}/activate")] // POST /api/users/123/activate
public async Task<IActionResult> ActivateUser(int id) { }

[HttpPost("{id}/change-password")] // POST /api/users/123/change-password
public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePasswordRequest request) { }
```

#### **URI Design Best Practices**

```csharp
// ✅ Good Examples
"/api/users"                    // Collection
"/api/users/123"               // Specific resource
"/api/users/123/orders"        // Nested collection
"/api/orders?status=pending"   // Filtering
"/api/products?page=2&size=10" // Pagination

// ❌ Bad Examples
"/api/getUsers"                // Verb in URI
"/api/user"                    // Singular for collection
"/api/users/orders/123"        // Skip hierarchy
"/api/users123"                // No separation
"/api/USERS"                   // Uppercase
```

## 2. Authentication & Authorization

### JWT (JSON Web Tokens)

#### **JWT Structure and Implementation**

```csharp
public class JwtService
{
    private readonly IConfiguration _configuration;
    private readonly string _secretKey;

    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
        _secretKey = _configuration["Jwt:SecretKey"];
    }

    public string GenerateToken(User user, IList<string> roles)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("user_id", user.Id.ToString()),
            new Claim("tenant_id", user.TenantId.ToString())
        };

        // Add role claims
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(24),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"]
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public ClaimsPrincipal ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);

        try
        {
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = _configuration["Jwt:Audience"],
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            return principal;
        }
        catch
        {
            return null;
        }
    }
}
```

#### **JWT Middleware Implementation**

```csharp
public class JwtMiddleware
{
    private readonly RequestDelegate _next;
    private readonly JwtService _jwtService;

    public JwtMiddleware(RequestDelegate next, JwtService jwtService)
    {
        _next = next;
        _jwtService = jwtService;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var token = context.Request.Headers["Authorization"]
            .FirstOrDefault()?.Split(" ").Last();

        if (token != null)
        {
            var principal = _jwtService.ValidateToken(token);
            if (principal != null)
            {
                context.User = principal;
            }
        }

        await _next(context);
    }
}

// Startup configuration
public void Configure(IApplicationBuilder app)
{
    app.UseMiddleware<JwtMiddleware>();
    // ... other middleware
}
```

### OAuth 2.0 Implementation

#### **OAuth 2.0 Flows**

```csharp
// Authorization Code Flow (Most Secure)
[HttpGet("authorize")]
public IActionResult Authorize([FromQuery] AuthorizeRequest request)
{
    // Validate client_id, redirect_uri, scope
    if (!_clientService.ValidateClient(request.ClientId, request.RedirectUri))
    {
        return BadRequest("Invalid client");
    }

    // Redirect to login page with state
    var loginUrl = $"/login?state={request.State}&client_id={request.ClientId}";
    return Redirect(loginUrl);
}

[HttpPost("token")]
public async Task<IActionResult> Token([FromForm] TokenRequest request)
{
    switch (request.GrantType)
    {
        case "authorization_code":
            return await HandleAuthorizationCodeGrant(request);
        case "refresh_token":
            return await HandleRefreshTokenGrant(request);
        case "client_credentials":
            return await HandleClientCredentialsGrant(request);
        default:
            return BadRequest("Unsupported grant type");
    }
}

private async Task<IActionResult> HandleAuthorizationCodeGrant(TokenRequest request)
{
    // Validate authorization code
    var authCode = await _authCodeService.ValidateCodeAsync(request.Code);
    if (authCode == null || authCode.IsExpired)
    {
        return BadRequest("Invalid or expired authorization code");
    }

    // Generate tokens
    var user = await _userService.GetByIdAsync(authCode.UserId);
    var accessToken = _jwtService.GenerateAccessToken(user);
    var refreshToken = await _tokenService.GenerateRefreshTokenAsync(user.Id);

    return Ok(new TokenResponse
    {
        AccessToken = accessToken,
        RefreshToken = refreshToken,
        TokenType = "Bearer",
        ExpiresIn = 3600
    });
}
```

### Azure Active Directory Integration

#### **Azure AD Authentication Setup**

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAd"));

    services.AddAuthorization(options =>
    {
        options.AddPolicy("RequireAdminRole", policy =>
            policy.RequireRole("Admin"));

        options.AddPolicy("RequireScope", policy =>
            policy.RequireClaim("scp", "access_as_user"));
    });
}

// Controller with Azure AD protection
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SecureController : ControllerBase
{
    [HttpGet]
    [Authorize(Policy = "RequireScope")]
    public IActionResult GetSecureData()
    {
        var userId = User.FindFirst("oid")?.Value;
        var userEmail = User.FindFirst("preferred_username")?.Value;
        var roles = User.FindAll("roles").Select(c => c.Value);

        return Ok(new { UserId = userId, Email = userEmail, Roles = roles });
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult AdminOnlyAction()
    {
        return Ok("Admin action completed");
    }
}
```

## 3. API Design & Architecture

### GraphQL Schema Design

#### **GraphQL Type Definitions**

```csharp
// GraphQL Types using HotChocolate
public class Query
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<User> GetUsers([Service] ApplicationDbContext context)
        => context.Users;

    public async Task<User> GetUser(int id, [Service] IUserService userService)
        => await userService.GetByIdAsync(id);

    [UseProjection]
    public IQueryable<Order> GetUserOrders(
        int userId,
        [Service] ApplicationDbContext context)
        => context.Orders.Where(o => o.UserId == userId);
}

public class Mutation
{
    public async Task<CreateUserPayload> CreateUser(
        CreateUserInput input,
        [Service] IUserService userService)
    {
        try
        {
            var user = await userService.CreateAsync(input);
            return new CreateUserPayload { User = user };
        }
        catch (Exception ex)
        {
            return new CreateUserPayload
            {
                Errors = new[] { new UserError(ex.Message) }
            };
        }
    }

    public async Task<UpdateUserPayload> UpdateUser(
        UpdateUserInput input,
        [Service] IUserService userService)
    {
        var user = await userService.UpdateAsync(input.Id, input);
        return new UpdateUserPayload { User = user };
    }
}

// GraphQL Types
[GraphQLName("User")]
public class UserType
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    // Resolver for complex field
    public async Task<IEnumerable<Order>> GetOrders(
        [Parent] UserType user,
        [Service] IOrderService orderService)
    {
        return await orderService.GetByUserIdAsync(user.Id);
    }
}

// Input types
public record CreateUserInput(string Name, string Email, string Password);
public record UpdateUserInput(int Id, string Name, string Email);

// Payload types
public class CreateUserPayload
{
    public User? User { get; set; }
    public IReadOnlyList<UserError>? Errors { get; set; }
}
```

#### **GraphQL Configuration**

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddGraphQLServer()
        .AddQueryType<Query>()
        .AddMutationType<Mutation>()
        .AddSubscriptionType<Subscription>()
        .AddProjections()
        .AddFiltering()
        .AddSorting()
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddAuthorization();
}

// Advanced GraphQL with DataLoader
public class UserDataLoader : BatchDataLoader<int, User>
{
    private readonly IUserService _userService;

    public UserDataLoader(IUserService userService, IBatchScheduler batchScheduler)
        : base(batchScheduler)
    {
        _userService = userService;
    }

    protected override async Task<IReadOnlyDictionary<int, User>> LoadBatchAsync(
        IReadOnlyList<int> keys,
        CancellationToken cancellationToken)
    {
        var users = await _userService.GetByIdsAsync(keys);
        return users.ToDictionary(u => u.Id);
    }
}
```

### gRPC Service Implementation

#### **Protocol Buffer Definition**

```protobuf
// user_service.proto
syntax = "proto3";

package user.v1;

import "google/protobuf/timestamp.proto";
import "google/protobuf/empty.proto";

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (ListUsersResponse);
  rpc CreateUser (CreateUserRequest) returns (User);
  rpc UpdateUser (UpdateUserRequest) returns (User);
  rpc DeleteUser (DeleteUserRequest) returns (google.protobuf.Empty);
  rpc StreamUsers (google.protobuf.Empty) returns (stream User);
}

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  google.protobuf.Timestamp created_at = 4;
  repeated string roles = 5;
}

message GetUserRequest {
  int32 id = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
  string filter = 3;
}

message ListUsersResponse {
  repeated User users = 1;
  string next_page_token = 2;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
  string password = 3;
}

message UpdateUserRequest {
  int32 id = 1;
  string name = 2;
  string email = 3;
}

message DeleteUserRequest {
  int32 id = 1;
}
```

#### **gRPC Service Implementation**

```csharp
public class UserGrpcService : UserService.UserServiceBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UserGrpcService> _logger;

    public UserGrpcService(IUserService userService, ILogger<UserGrpcService> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    public override async Task<User> GetUser(GetUserRequest request, ServerCallContext context)
    {
        try
        {
            var user = await _userService.GetByIdAsync(request.Id);
            if (user == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "User not found"));
            }

            return MapToGrpcUser(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user {UserId}", request.Id);
            throw new RpcException(new Status(StatusCode.Internal, "Internal server error"));
        }
    }

    public override async Task<ListUsersResponse> ListUsers(
        ListUsersRequest request,
        ServerCallContext context)
    {
        var (users, nextPageToken) = await _userService.ListAsync(
            request.PageSize,
            request.PageToken,
            request.Filter);

        var response = new ListUsersResponse
        {
            NextPageToken = nextPageToken
        };

        response.Users.AddRange(users.Select(MapToGrpcUser));
        return response;
    }

    public override async Task<User> CreateUser(CreateUserRequest request, ServerCallContext context)
    {
        var createRequest = new CreateUserDto
        {
            Name = request.Name,
            Email = request.Email,
            Password = request.Password
        };

        var user = await _userService.CreateAsync(createRequest);
        return MapToGrpcUser(user);
    }

    public override async Task StreamUsers(
        Empty request,
        IServerStreamWriter<User> responseStream,
        ServerCallContext context)
    {
        await foreach (var user in _userService.StreamUsersAsync(context.CancellationToken))
        {
            await responseStream.WriteAsync(MapToGrpcUser(user));
        }
    }

    private static User MapToGrpcUser(UserEntity user)
    {
        var grpcUser = new User
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            CreatedAt = Timestamp.FromDateTime(user.CreatedAt.ToUniversalTime())
        };

        grpcUser.Roles.AddRange(user.Roles.Select(r => r.Name));
        return grpcUser;
    }
}

// gRPC Client Usage
public class UserGrpcClient
{
    private readonly UserService.UserServiceClient _client;

    public UserGrpcClient(GrpcChannel channel)
    {
        _client = new UserService.UserServiceClient(channel);
    }

    public async Task<User> GetUserAsync(int id)
    {
        var request = new GetUserRequest { Id = id };
        return await _client.GetUserAsync(request);
    }

    public async Task StreamUsersAsync()
    {
        using var call = _client.StreamUsers(new Empty());

        await foreach (var user in call.ResponseStream.ReadAllAsync())
        {
            Console.WriteLine($"Received user: {user.Name}");
        }
    }
}
```

## 4. Security Best Practices

### Input Validation and Sanitization

#### **Data Annotations Validation**

```csharp
public class CreateUserRequest
{
    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters")]
    [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Name can only contain letters and spaces")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    [StringLength(255, ErrorMessage = "Email cannot exceed 255 characters")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]",
        ErrorMessage = "Password must contain uppercase, lowercase, digit, and special character")]
    public string Password { get; set; }

    [Phone(ErrorMessage = "Invalid phone number format")]
    public string? PhoneNumber { get; set; }

    [Range(18, 120, ErrorMessage = "Age must be between 18 and 120")]
    public int Age { get; set; }

    [Url(ErrorMessage = "Invalid URL format")]
    public string? Website { get; set; }
}

// Custom validation attribute
public class NotProfaneAttribute : ValidationAttribute
{
    private readonly string[] _profaneWords = { "badword1", "badword2" }; // Example

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is string stringValue)
        {
            foreach (var word in _profaneWords)
            {
                if (stringValue.Contains(word, StringComparison.OrdinalIgnoreCase))
                {
                    return new ValidationResult("Content contains inappropriate language");
                }
            }
        }

        return ValidationResult.Success;
    }
}
```

#### **Advanced Input Sanitization**

```csharp
public class InputSanitizationService
{
    public string SanitizeHtml(string input)
    {
        if (string.IsNullOrEmpty(input)) return input;

        // Use HtmlSanitizer library
        var sanitizer = new HtmlSanitizer();
        sanitizer.AllowedTags.Clear();
        sanitizer.AllowedTags.Add("p");
        sanitizer.AllowedTags.Add("br");
        sanitizer.AllowedTags.Add("strong");
        sanitizer.AllowedTags.Add("em");

        return sanitizer.Sanitize(input);
    }

    public string SanitizeSql(string input)
    {
        if (string.IsNullOrEmpty(input)) return input;

        // Remove common SQL injection patterns
        var sqlPatterns = new[]
        {
            @"(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b)",
            @"(\b(AND|OR)\b.*(=|>|<|\bLIKE\b).*(\bOR\b|\bAND\b))",
            @"(\b(CHAR|NCHAR|VARCHAR|NVARCHAR)\s*\(\s*\d+\s*\))",
            @"(\b(COUNT|SUM|AVG|MIN|MAX)\s*\(.*\))",
            @"(\/\*[\w\W]*?(?=\*\/)\*\/)",
            @"(\b(sp_executesql|xp_cmdshell|sp_makewebtask)\b)"
        };

        foreach (var pattern in sqlPatterns)
        {
            input = Regex.Replace(input, pattern, "", RegexOptions.IgnoreCase);
        }

        return input.Trim();
    }

    public string SanitizeFileName(string fileName)
    {
        if (string.IsNullOrEmpty(fileName)) return fileName;

        // Remove path characters and dangerous characters
        var invalidChars = Path.GetInvalidFileNameChars()
            .Concat(new[] { '<', '>', ':', '"', '|', '?', '*', '\\', '/' })
            .ToArray();

        foreach (var c in invalidChars)
        {
            fileName = fileName.Replace(c, '_');
        }

        // Prevent directory traversal
        fileName = fileName.Replace("..", "");

        return fileName.Trim();
    }
}
```

### Rate Limiting Implementation

#### **Custom Rate Limiting Middleware**

```csharp
public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IMemoryCache _cache;
    private readonly RateLimitOptions _options;

    public RateLimitingMiddleware(
        RequestDelegate next,
        IMemoryCache cache,
        IOptions<RateLimitOptions> options)
    {
        _next = next;
        _cache = cache;
        _options = options.Value;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var clientId = GetClientIdentifier(context);
        var key = $"rate_limit_{clientId}";

        var requests = _cache.GetOrCreate(key, entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = _options.WindowDuration;
            return new List<DateTime>();
        });

        // Clean old requests
        var windowStart = DateTime.UtcNow.Subtract(_options.WindowDuration);
        requests.RemoveAll(r => r < windowStart);

        if (requests.Count >= _options.MaxRequests)
        {
            context.Response.StatusCode = 429; // Too Many Requests
            await context.Response.WriteAsync("Rate limit exceeded");
            return;
        }

        requests.Add(DateTime.UtcNow);
        _cache.Set(key, requests, _options.WindowDuration);

        await _next(context);
    }

    private string GetClientIdentifier(HttpContext context)
    {
        // Try to get authenticated user ID first
        var userId = context.User?.FindFirst("user_id")?.Value;
        if (!string.IsNullOrEmpty(userId))
            return userId;

        // Fall back to IP address
        return context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    }
}

public class RateLimitOptions
{
    public int MaxRequests { get; set; } = 100;
    public TimeSpan WindowDuration { get; set; } = TimeSpan.FromMinutes(1);
}

// Advanced rate limiting with Redis
public class RedisRateLimitingService
{
    private readonly IDatabase _database;
    private readonly RateLimitOptions _options;

    public RedisRateLimitingService(IConnectionMultiplexer redis, IOptions<RateLimitOptions> options)
    {
        _database = redis.GetDatabase();
        _options = options.Value;
    }

    public async Task<bool> IsAllowedAsync(string clientId)
    {
        var key = $"rate_limit:{clientId}";
        var window = DateTimeOffset.UtcNow.ToUnixTimeSeconds() / (int)_options.WindowDuration.TotalSeconds;
        var windowKey = $"{key}:{window}";

        var current = await _database.StringIncrementAsync(windowKey);

        if (current == 1)
        {
            await _database.KeyExpireAsync(windowKey, _options.WindowDuration);
        }

        return current <= _options.MaxRequests;
    }
}
```

---

# Q&A Section

## 1. API Fundamentals

### Q1: What are the key principles of REST architecture?

**Answer:** REST (Representational State Transfer) follows six architectural constraints:

1. **Client-Server**: Separation of concerns between UI and data storage
2. **Stateless**: Each request contains all information needed to process it
3. **Cacheable**: Responses must be explicitly marked as cacheable or non-cacheable
4. **Uniform Interface**: Consistent interface through resource identification, manipulation through representations, self-descriptive messages, and HATEOAS
5. **Layered System**: Architecture can have multiple layers without client awareness
6. **Code on Demand** (optional): Server can send executable code to client

**Example Implementation:**

```csharp
// Stateless design - all context in request
[HttpGet("api/orders/{id}")]
public async Task<IActionResult> GetOrder(int id, [FromHeader] string authorization)
{
    // Extract user context from token, not server session
    var userId = ExtractUserIdFromToken(authorization);
    var order = await _orderService.GetOrderAsync(id, userId);

    // Include HATEOAS links
    var response = new
    {
        Data = order,
        Links = new
        {
            Self = $"/api/orders/{id}",
            Update = $"/api/orders/{id}",
            Cancel = $"/api/orders/{id}/cancel",
            Items = $"/api/orders/{id}/items"
        }
    };

    return Ok(response);
}
```

### Q2: Explain the difference between PUT and PATCH HTTP methods.

**Answer:**

| Aspect          | PUT                                       | PATCH                          |
| --------------- | ----------------------------------------- | ------------------------------ |
| **Purpose**     | Replace entire resource                   | Partial update                 |
| **Idempotency** | Idempotent                                | Not guaranteed idempotent      |
| **Payload**     | Complete resource representation          | Partial changes only           |
| **Behavior**    | Creates if not exists, replaces if exists | Updates existing resource only |

**Example Implementation:**

```csharp
// PUT - Replace entire resource (idempotent)
[HttpPut("api/users/{id}")]
public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserRequest request)
{
    // Validate complete user object
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    // Replace entire user - all fields must be provided
    var user = await _userService.ReplaceAsync(id, request);
    return user != null ? Ok(user) : NotFound();
}

// PATCH - Partial update (not necessarily idempotent)
[HttpPatch("api/users/{id}")]
public async Task<IActionResult> PatchUser(int id, [FromBody] JsonPatchDocument<User> patchDoc)
{
    var user = await _userService.GetByIdAsync(id);
    if (user == null) return NotFound();

    // Apply partial changes
    patchDoc.ApplyTo(user, ModelState);

    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    await _userService.UpdateAsync(user);
    return Ok(user);
}
```

### Q3: How do you handle API versioning and what are the different strategies?

**Answer:** There are several API versioning strategies:

1. **URL Path Versioning**: `/api/v1/users`, `/api/v2/users`
2. **Query Parameter**: `/api/users?version=2`
3. **Header Versioning**: `Accept: application/vnd.api.v2+json`
4. **Content Negotiation**: `Accept: application/json; version=2`

**Implementation Example:**

```csharp
// URL Path Versioning
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class V1UsersController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        // V1 implementation - returns basic user info
        var users = await _userService.GetUsersV1Async();
        return Ok(users);
    }
}

[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class V2UsersController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        // V2 implementation - returns enhanced user info with roles
        var users = await _userService.GetUsersV2Async();
        return Ok(users);
    }
}

// Startup configuration
services.AddApiVersioning(opt =>
{
    opt.DefaultApiVersion = new ApiVersion(1, 0);
    opt.AssumeDefaultVersionWhenUnspecified = true;
    opt.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader(),
        new QueryStringApiVersionReader("version"),
        new HeaderApiVersionReader("X-Version")
    );
});
```

## 2. Authentication & Authorization

### Q4: Explain JWT tokens and their structure. What are the security considerations?

**Answer:** JWT (JSON Web Token) consists of three parts separated by dots:

1. **Header**: Contains token type and hashing algorithm
2. **Payload**: Contains claims (user data)
3. **Signature**: Verifies token integrity

**Security Considerations:**

- **Never store sensitive data** in payload (it's base64 encoded, not encrypted)
- **Use strong secret keys** for signing
- **Implement token expiration** and refresh mechanisms
- **Validate tokens properly** on each request
- **Use HTTPS** to prevent token interception

**Implementation:**

```csharp
public class JwtSecurityService
{
    private readonly string _secretKey;
    private readonly string _issuer;
    private readonly string _audience;

    public string GenerateToken(User user, TimeSpan? expiry = null)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, user.Role),
            // Custom claims
            new Claim("tenant_id", user.TenantId.ToString())
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.Add(expiry ?? TimeSpan.FromHours(1)),
            Issuer = _issuer,
            Audience = _audience,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public ClaimsPrincipal? ValidateToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = true,
                ValidAudience = _audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero // Eliminate clock skew tolerance
            }, out _);

            return principal;
        }
        catch
        {
            return null;
        }
    }
}
```

### Q5: What is OAuth 2.0 and what are the different grant types?

**Answer:** OAuth 2.0 is an authorization framework that enables third-party applications to access user resources without exposing credentials.

**Grant Types:**

1. **Authorization Code**: Most secure, for web apps with backend
2. **Client Credentials**: For machine-to-machine communication
3. **Resource Owner Password Credentials**: For trusted first-party apps
4. **Refresh Token**: For obtaining new access tokens
5. **Device Code**: For devices without web browsers

**Authorization Code Flow Implementation:**

```csharp
[ApiController]
[Route("oauth")]
public class OAuthController : ControllerBase
{
    private readonly IOAuthService _oauthService;

    // Step 1: Authorization request
    [HttpGet("authorize")]
    public IActionResult Authorize([FromQuery] AuthorizeRequest request)
    {
        // Validate client and redirect URI
        var client = _oauthService.ValidateClient(request.ClientId, request.RedirectUri);
        if (client == null)
            return BadRequest("Invalid client");

        // Generate and store authorization code
        var authCode = _oauthService.GenerateAuthorizationCode(request);

        // Redirect back to client with code
        var redirectUrl = $"{request.RedirectUri}?code={authCode}&state={request.State}";
        return Redirect(redirectUrl);
    }

    // Step 2: Token exchange
    [HttpPost("token")]
    public async Task<IActionResult> Token([FromForm] TokenRequest request)
    {
        return request.GrantType switch
        {
            "authorization_code" => await HandleAuthorizationCode(request),
            "client_credentials" => await HandleClientCredentials(request),
            "refresh_token" => await HandleRefreshToken(request),
            _ => BadRequest("Unsupported grant type")
        };
    }

    private async Task<IActionResult> HandleAuthorizationCode(TokenRequest request)
    {
        // Validate authorization code
        var authCode = await _oauthService.ValidateAuthorizationCodeAsync(request.Code);
        if (authCode == null || authCode.IsExpired)
            return BadRequest("Invalid or expired code");

        // Generate tokens
        var accessToken = _oauthService.GenerateAccessToken(authCode.UserId, authCode.Scopes);
        var refreshToken = await _oauthService.GenerateRefreshTokenAsync(authCode.UserId);

        return Ok(new TokenResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            TokenType = "Bearer",
            ExpiresIn = 3600,
            Scope = string.Join(" ", authCode.Scopes)
        });
    }
}
```

## 3. API Design & Architecture

### Q6: When would you choose GraphQL over REST API?

**Answer:**

**Choose GraphQL when:**

- **Multiple data sources** need to be aggregated
- **Over-fetching/under-fetching** is a problem with REST
- **Frontend teams** need flexibility in data fetching
- **Mobile applications** with bandwidth constraints
- **Rapid prototyping** and changing requirements

**Choose REST when:**

- **Simple CRUD operations** are sufficient
- **HTTP caching** is important
- **File uploads/downloads** are frequent
- **Third-party integrations** expect REST
- **Team expertise** is primarily with REST

**Comparison Implementation:**

```csharp
// REST - Multiple requests needed
// GET /api/users/123
// GET /api/users/123/orders
// GET /api/orders/456/items

// GraphQL - Single request
/*
query {
  user(id: 123) {
    name
    email
    orders {
      id
      date
      total
      items {
        product {
          name
          price
        }
        quantity
      }
    }
  }
}
*/

// GraphQL Resolver
public class Query
{
    [UseProjection]
    [UseFiltering]
    public IQueryable<User> GetUsers([Service] AppDbContext context)
        => context.Users;

    public async Task<User?> GetUser(
        int id,
        [Service] IUserService userService)
        => await userService.GetByIdAsync(id);
}

public class UserType : ObjectType<User>
{
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor.Field(u => u.Orders)
            .ResolveWith<UserResolvers>(r => r.GetOrdersAsync(default!, default!));
    }
}

public class UserResolvers
{
    public async Task<IEnumerable<Order>> GetOrdersAsync(
        [Parent] User user,
        [Service] IOrderService orderService)
    {
        return await orderService.GetByUserIdAsync(user.Id);
    }
}
```

### Q7: Explain the differences between gRPC and REST APIs.

**Answer:**

| Aspect              | gRPC                      | REST                      |
| ------------------- | ------------------------- | ------------------------- |
| **Protocol**        | HTTP/2, Binary            | HTTP/1.1, Text            |
| **Performance**     | Faster, smaller payload   | Slower, larger payload    |
| **Browser Support** | Limited (gRPC-Web needed) | Full support              |
| **Streaming**       | Bidirectional streaming   | Request-response only     |
| **Code Generation** | Automatic from .proto     | Manual or OpenAPI tools   |
| **Caching**         | Limited HTTP caching      | Full HTTP caching support |
| **Debugging**       | Requires special tools    | Standard HTTP tools work  |

**When to use gRPC:**

- **High-performance** microservices communication
- **Real-time** bidirectional streaming
- **Type-safe** service contracts
- **Polyglot** environments with code generation

**Implementation Example:**

```csharp
// gRPC Service Definition
public class OrderGrpcService : OrderService.OrderServiceBase
{
    public override async Task<OrderResponse> GetOrder(
        GetOrderRequest request,
        ServerCallContext context)
    {
        var order = await _orderService.GetByIdAsync(request.Id);
        return MapToGrpcResponse(order);
    }

    // Server-side streaming
    public override async Task GetOrderUpdates(
        OrderUpdatesRequest request,
        IServerStreamWriter<OrderUpdate> responseStream,
        ServerCallContext context)
    {
        await foreach (var update in _orderService.StreamUpdatesAsync(request.OrderId))
        {
            await responseStream.WriteAsync(new OrderUpdate
            {
                OrderId = update.OrderId,
                Status = update.Status,
                Timestamp = Timestamp.FromDateTime(update.UpdatedAt)
            });
        }
    }

    // Client-side streaming
    public override async Task<CreateOrdersResponse> CreateOrders(
        IAsyncStreamReader<CreateOrderRequest> requestStream,
        ServerCallContext context)
    {
        var createdOrders = new List<int>();

        await foreach (var request in requestStream.ReadAllAsync())
        {
            var orderId = await _orderService.CreateAsync(request);
            createdOrders.Add(orderId);
        }

        return new CreateOrdersResponse { OrderIds = { createdOrders } };
    }
}
```

## 4. Security & Performance

### Q8: How do you implement proper CORS (Cross-Origin Resource Sharing)?

**Answer:** CORS allows controlled access to resources from different origins. Proper implementation requires understanding preflight requests and security implications.

```csharp
// Startup.cs - Comprehensive CORS configuration
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        // Development policy - permissive
        options.AddPolicy("Development", builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });

        // Production policy - restrictive
        options.AddPolicy("Production", builder =>
        {
            builder.WithOrigins(
                    "https://app.company.com",
                    "https://admin.company.com")
                   .WithMethods("GET", "POST", "PUT", "DELETE")
                   .WithHeaders(
                    "Content-Type",
                    "Authorization",
                    "X-Requested-With")
                   .AllowCredentials()
                   .SetPreflightMaxAge(TimeSpan.FromMinutes(5));
        });

        // API-specific policy
        options.AddPolicy("ApiClients", builder =>
        {
            builder.WithOrigins("https://partner.external.com")
                   .WithMethods("GET", "POST")
                   .WithHeaders("Authorization", "Content-Type")
                   .WithExposedHeaders("X-Total-Count", "X-Page-Info");
        });
    });
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseCors("Development");
    }
    else
    {
        app.UseCors("Production");
    }

    // Apply specific CORS policy to API routes
    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers()
                .RequireCors("ApiClients"); // Apply to specific endpoints
    });
}

// Controller-level CORS
[EnableCors("ApiClients")]
[ApiController]
[Route("api/[controller]")]
public class PublicApiController : ControllerBase
{
    // Handles preflight requests automatically
    [HttpGet]
    public IActionResult Get() => Ok("Available");

    // Custom CORS for specific action
    [DisableCors]
    [HttpPost("internal")]
    public IActionResult InternalEndpoint() => Ok();
}
```

### Q9: What are the best practices for API error handling and response formats?

**Answer:** Consistent error handling improves API usability and debugging.

**Best Practices:**

- Use standard HTTP status codes correctly
- Provide consistent error response format
- Include error codes for programmatic handling
- Add helpful error messages for debugging
- Log errors with correlation IDs
- Don't expose sensitive information

```csharp
// Standardized error response model
public class ApiErrorResponse
{
    public string Type { get; set; }
    public string Title { get; set; }
    public int Status { get; set; }
    public string Detail { get; set; }
    public string Instance { get; set; }
    public string TraceId { get; set; }
    public Dictionary<string, object> Extensions { get; set; } = new();
}

// Global exception handling middleware
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var traceId = Activity.Current?.Id ?? context.TraceIdentifier;

        var response = exception switch
        {
            ValidationException validationEx => new ApiErrorResponse
            {
                Type = "validation-error",
                Title = "Validation Failed",
                Status = 400,
                Detail = validationEx.Message,
                Instance = context.Request.Path,
                TraceId = traceId,
                Extensions = { ["errors"] = validationEx.Errors }
            },

            NotFoundException notFoundEx => new ApiErrorResponse
            {
                Type = "resource-not-found",
                Title = "Resource Not Found",
                Status = 404,
                Detail = notFoundEx.Message,
                Instance = context.Request.Path,
                TraceId = traceId
            },

            UnauthorizedException => new ApiErrorResponse
            {
                Type = "unauthorized",
                Title = "Authentication Required",
                Status = 401,
                Detail = "Valid authentication credentials are required",
                Instance = context.Request.Path,
                TraceId = traceId
            },

            BusinessLogicException businessEx => new ApiErrorResponse
            {
                Type = "business-rule-violation",
                Title = "Business Rule Violation",
                Status = 422,
                Detail = businessEx.Message,
                Instance = context.Request.Path,
                TraceId = traceId,
                Extensions = { ["errorCode"] = businessEx.ErrorCode }
            },

            _ => new ApiErrorResponse
            {
                Type = "internal-server-error",
                Title = "Internal Server Error",
                Status = 500,
                Detail = "An unexpected error occurred",
                Instance = context.Request.Path,
                TraceId = traceId
            }
        };

        // Log error with context
        _logger.LogError(exception,
            "API Error: {TraceId} - {Path} - {Method}",
            traceId, context.Request.Path, context.Request.Method);

        context.Response.StatusCode = response.Status;
        context.Response.ContentType = "application/json";

        var jsonResponse = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        await context.Response.WriteAsync(jsonResponse);
    }
}

// Validation error handling in controller
[HttpPost]
public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
{
    // Manual validation
    if (await _userService.EmailExistsAsync(request.Email))
    {
        return Conflict(new ApiErrorResponse
        {
            Type = "duplicate-resource",
            Title = "Email Already Exists",
            Status = 409,
            Detail = $"User with email '{request.Email}' already exists",
            Instance = HttpContext.Request.Path,
            TraceId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
        });
    }

    var user = await _userService.CreateAsync(request);
    return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
}
```

## 5. Azure API Management

### Q10: What are the benefits of using Azure API Management and how do you implement it?

**Answer:** Azure API Management provides a complete API lifecycle management solution.

**Key Benefits:**

- **API Gateway**: Single entry point for all APIs
- **Security**: Authentication, authorization, rate limiting
- **Analytics**: Usage metrics, performance monitoring
- **Developer Portal**: Documentation and testing interface
- **Transformation**: Request/response modification
- **Caching**: Improve performance with built-in caching
- **Versioning**: Manage multiple API versions

**Implementation Example:**

```csharp
// API Management Policy Examples

// 1. Rate Limiting Policy
/*
<policies>
    <inbound>
        <rate-limit-by-key calls="100" renewal-period="60"
                          counter-key="@(context.User.Id)" />
        <quota-by-key calls="1000000" renewal-period="2629800"
                     counter-key="@(context.Subscription.Key)" />
    </inbound>
</policies>
*/

// 2. Authentication and Authorization
/*
<policies>
    <inbound>
        <validate-jwt header-name="Authorization" failed-validation-httpcode="401">
            <openid-config url="https://login.microsoftonline.com/{tenant}/.well-known/openid_configuration" />
            <required-claims>
                <claim name="aud" match="all">
                    <value>api://your-api-id</value>
                </claim>
                <claim name="roles" match="any">
                    <value>Admin</value>
                    <value>User</value>
                </claim>
            </required-claims>
        </validate-jwt>
    </inbound>
</policies>
*/

// 3. Response Transformation
/*
<policies>
    <inbound>
        <set-backend-service base-url="https://internal-api.company.com/v2/" />
    </inbound>
    <outbound>
        <json-to-xml apply="always" consider-accept-header="false" />
        <set-header name="X-API-Version" exists-action="override">
            <value>v1.0</value>
        </set-header>
    </outbound>
</policies>
*/

// Backend API with APIM-aware logging
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        // Extract APIM context
        var subscriptionKey = Request.Headers["Ocp-Apim-Subscription-Key"].FirstOrDefault();
        var traceId = Request.Headers["Ocp-Apim-Trace"].FirstOrDefault();

        // Log with APIM context
        _logger.LogInformation("Products requested via APIM - Subscription: {SubscriptionKey}, Trace: {TraceId}",
            subscriptionKey, traceId);

        var products = await _productService.GetAllAsync();

        // Add custom headers for APIM
        Response.Headers.Add("X-Total-Count", products.Count().ToString());
        Response.Headers.Add("X-Cache-Status", "MISS");

        return Ok(products);
    }
}
```

### Q11: How do you implement proper API monitoring and observability?

**Answer:** Comprehensive monitoring includes metrics, logging, tracing, and health checks.

```csharp
// Health Checks Configuration
public void ConfigureServices(IServiceCollection services)
{
    services.AddHealthChecks()
        .AddCheck<DatabaseHealthCheck>("database")
        .AddCheck<RedisHealthCheck>("redis")
        .AddCheck<ExternalApiHealthCheck>("external-api")
        .AddCheck("memory", () =>
        {
            var allocated = GC.GetTotalMemory(forceFullCollection: false);
            return allocated < 1024 * 1024 * 1024 // 1GB
                ? HealthCheckResult.Healthy($"Memory usage: {allocated / 1024 / 1024} MB")
                : HealthCheckResult.Unhealthy($"Memory usage too high: {allocated / 1024 / 1024} MB");
        });

    // Application Insights
    services.AddApplicationInsightsTelemetry(Configuration["ApplicationInsights:ConnectionString"]);

    // Custom metrics
    services.AddSingleton<IMetricsCollector, MetricsCollector>();
}

// Custom Health Check
public class DatabaseHealthCheck : IHealthCheck
{
    private readonly ApplicationDbContext _context;

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            await _context.Database.CanConnectAsync(cancellationToken);
            return HealthCheckResult.Healthy("Database connection is healthy");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Database connection failed", ex);
        }
    }
}

// Monitoring Middleware
public class MonitoringMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IMetricsCollector _metrics;
    private readonly ILogger<MonitoringMiddleware> _logger;

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        var requestId = Guid.NewGuid().ToString();

        // Add correlation ID
        context.Response.Headers.Add("X-Correlation-ID", requestId);

        try
        {
            await _next(context);
        }
        finally
        {
            stopwatch.Stop();

            // Collect metrics
            _metrics.RecordRequestDuration(
                context.Request.Method,
                context.Request.Path,
                context.Response.StatusCode,
                stopwatch.ElapsedMilliseconds);

            // Structured logging
            _logger.LogInformation(
                "Request completed - Method: {Method}, Path: {Path}, StatusCode: {StatusCode}, Duration: {Duration}ms, CorrelationId: {CorrelationId}",
                context.Request.Method,
                context.Request.Path,
                context.Response.StatusCode,
                stopwatch.ElapsedMilliseconds,
                requestId);
        }
    }
}

// Custom Metrics Service
public interface IMetricsCollector
{
    void RecordRequestDuration(string method, string path, int statusCode, long durationMs);
    void IncrementCounter(string name, Dictionary<string, string> tags = null);
}

public class MetricsCollector : IMetricsCollector
{
    private readonly TelemetryClient _telemetryClient;

    public void RecordRequestDuration(string method, string path, int statusCode, long durationMs)
    {
        _telemetryClient.TrackMetric("api.request.duration", durationMs, new Dictionary<string, string>
        {
            ["method"] = method,
            ["path"] = path,
            ["status_code"] = statusCode.ToString()
        });

        _telemetryClient.TrackMetric("api.request.count", 1, new Dictionary<string, string>
        {
            ["method"] = method,
            ["path"] = path,
            ["status_code"] = statusCode.ToString()
        });
    }
}
```

## 6. Modern API Patterns

### Q12: How do you implement real-time APIs using SignalR?

**Answer:** SignalR enables real-time bidirectional communication between server and clients.

```csharp
// SignalR Hub
public class NotificationHub : Hub
{
    private readonly IUserConnectionManager _connectionManager;

    public async Task JoinUserGroup(string userId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"user_{userId}");
        _connectionManager.AddConnection(userId, Context.ConnectionId);
    }

    public async Task JoinOrderGroup(string orderId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"order_{orderId}");
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var userId = Context.User?.FindFirst("user_id")?.Value;
        if (userId != null)
        {
            _connectionManager.RemoveConnection(userId, Context.ConnectionId);
        }

        await base.OnDisconnectedAsync(exception);
    }
}

// Service for sending notifications
public class NotificationService
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public async Task NotifyUserAsync(string userId, string message)
    {
        await _hubContext.Clients.Group($"user_{userId}")
            .SendAsync("ReceiveNotification", new
            {
                Type = "info",
                Message = message,
                Timestamp = DateTime.UtcNow
            });
    }

    public async Task NotifyOrderStatusChange(string orderId, string status)
    {
        await _hubContext.Clients.Group($"order_{orderId}")
            .SendAsync("OrderStatusChanged", new
            {
                OrderId = orderId,
                Status = status,
                UpdatedAt = DateTime.UtcNow
            });
    }

    public async Task BroadcastSystemMessage(string message)
    {
        await _hubContext.Clients.All
            .SendAsync("SystemMessage", message);
    }
}

// Integration with API endpoints
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly INotificationService _notificationService;

    [HttpPost("{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateStatusRequest request)
    {
        await _orderService.UpdateStatusAsync(id, request.Status);

        // Send real-time notification
        await _notificationService.NotifyOrderStatusChange(id.ToString(), request.Status);

        return Ok();
    }
}

// Client-side TypeScript integration
/*
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

class ApiClient {
    private connection: HubConnection;

    async connectToNotifications(accessToken: string): Promise<void> {
        this.connection = new HubConnectionBuilder()
            .withUrl('/api/notifications', {
                accessTokenFactory: () => accessToken
            })
            .build();

        // Set up event handlers
        this.connection.on('ReceiveNotification', (notification) => {
            console.log('Notification received:', notification);
        });

        this.connection.on('OrderStatusChanged', (update) => {
            console.log('Order status changed:', update);
        });

        await this.connection.start();

        // Join user-specific group
        await this.connection.invoke('JoinUserGroup', this.getCurrentUserId());
    }
}
*/
```

### Q13: How do you design APIs for mobile applications considering performance and offline capabilities?

**Answer:** Mobile APIs require special considerations for bandwidth, battery life, and connectivity.

**Key Strategies:**

- Minimize payload size
- Implement efficient caching
- Support offline-first patterns
- Use compression
- Batch operations
- Implement sync mechanisms

```csharp
// Mobile-optimized API design
[ApiController]
[Route("api/mobile/[controller]")]
public class MobileApiController : ControllerBase
{
    // Lightweight endpoint for mobile
    [HttpGet("summary")]
    [ResponseCache(Duration = 300)] // 5-minute cache
    [Compress] // Custom compression attribute
    public async Task<IActionResult> GetUserSummary([FromQuery] string fields = null)
    {
        var fieldList = fields?.Split(',') ?? new[] { "id", "name", "avatar" };
        var summary = await _userService.GetSummaryAsync(fieldList);

        return Ok(new
        {
            data = summary,
            timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
            ttl = 300 // Time to live in seconds
        });
    }

    // Batch operations for efficiency
    [HttpPost("batch")]
    public async Task<IActionResult> BatchOperations([FromBody] BatchRequest request)
    {
        var results = new List<BatchResult>();

        foreach (var operation in request.Operations)
        {
            try
            {
                var result = operation.Type switch
                {
                    "get_user" => await _userService.GetByIdAsync(operation.Id),
                    "get_orders" => await _orderService.GetByUserIdAsync(operation.Id),
                    "update_profile" => await _userService.UpdateAsync(operation.Id, operation.Data),
                    _ => throw new NotSupportedException($"Operation {operation.Type} not supported")
                };

                results.Add(new BatchResult
                {
                    Id = operation.Id,
                    Success = true,
                    Data = result
                });
            }
            catch (Exception ex)
            {
                results.Add(new BatchResult
                {
                    Id = operation.Id,
                    Success = false,
                    Error = ex.Message
                });
            }
        }

        return Ok(new { results });
    }

    // Sync endpoint for offline support
    [HttpPost("sync")]
    public async Task<IActionResult> Sync([FromBody] SyncRequest request)
    {
        var response = new SyncResponse
        {
            ServerTimestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
            ConflictResolutionStrategy = "server-wins"
        };

        // Handle incoming changes from client
        foreach (var change in request.Changes)
        {
            try
            {
                var serverVersion = await _syncService.GetServerVersionAsync(change.EntityType, change.Id);

                if (serverVersion > change.Version)
                {
                    // Conflict detected
                    response.Conflicts.Add(new SyncConflict
                    {
                        EntityType = change.EntityType,
                        Id = change.Id,
                        ClientVersion = change.Version,
                        ServerVersion = serverVersion,
                        ServerData = await _syncService.GetEntityAsync(change.EntityType, change.Id)
                    });
                }
                else
                {
                    // Apply client change
                    await _syncService.ApplyChangeAsync(change);
                    response.AppliedChanges.Add(change.Id);
                }
            }
            catch (Exception ex)
            {
                response.Errors.Add(new SyncError
                {
                    EntityId = change.Id,
                    Message = ex.Message
                });
            }
        }

        // Send server changes to client
        var serverChanges = await _syncService.GetChangesAfterTimestampAsync(request.LastSyncTimestamp);
        response.ServerChanges = serverChanges;

        return Ok(response);
    }
}

// Compression middleware
public class CompressionMiddleware
{
    private readonly RequestDelegate _next;

    public async Task InvokeAsync(HttpContext context)
    {
        var acceptEncoding = context.Request.Headers["Accept-Encoding"].ToString();

        if (acceptEncoding.Contains("gzip"))
        {
            context.Response.Headers.Add("Content-Encoding", "gzip");
            using var gzipStream = new GZipStream(context.Response.Body, CompressionMode.Compress);
            var originalBody = context.Response.Body;
            context.Response.Body = gzipStream;

            await _next(context);

            context.Response.Body = originalBody;
        }
        else
        {
            await _next(context);
        }
    }
}

// Mobile-specific models
public class SyncRequest
{
    public long LastSyncTimestamp { get; set; }
    public List<EntityChange> Changes { get; set; } = new();
}

public class SyncResponse
{
    public long ServerTimestamp { get; set; }
    public string ConflictResolutionStrategy { get; set; }
    public List<string> AppliedChanges { get; set; } = new();
    public List<SyncConflict> Conflicts { get; set; } = new();
    public List<SyncError> Errors { get; set; } = new();
    public List<EntityChange> ServerChanges { get; set; } = new();
}
```

---

# Code Samples

## 1. Complete RESTful API Implementation

### Enterprise-Grade E-commerce API

```csharp
// Startup.cs - Complete API Configuration
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Database configuration
        services.AddDbContext<EcommerceDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

        // API versioning
        services.AddApiVersioning(opt =>
        {
            opt.DefaultApiVersion = new ApiVersion(1, 0);
            opt.AssumeDefaultVersionWhenUnspecified = true;
            opt.ApiVersionReader = ApiVersionReader.Combine(
                new UrlSegmentApiVersionReader(),
                new HeaderApiVersionReader("X-Version"),
                new QueryStringApiVersionReader("version")
            );
        });

        services.AddVersionedApiExplorer(setup =>
        {
            setup.GroupNameFormat = "'v'VVV";
            setup.SubstituteApiVersionInUrl = true;
        });

        // Authentication & Authorization
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"]))
                };
            });

        // Authorization policies
        services.AddAuthorization(options =>
        {
            options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
            options.AddPolicy("UserOrAdmin", policy => policy.RequireRole("User", "Admin"));
            options.AddPolicy("MinimumAge", policy => policy.Requirements.Add(new MinimumAgeRequirement(18)));
        });

        // CORS
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigins", builder =>
            {
                builder.WithOrigins("https://app.ecommerce.com", "https://admin.ecommerce.com")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            });
        });

        // Rate limiting
        services.Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"));
        services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
        services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
        services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
        services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();

        // Caching
        services.AddMemoryCache();
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = Configuration.GetConnectionString("Redis");
        });

        // Health checks
        services.AddHealthChecks()
            .AddSqlServer(Configuration.GetConnectionString("DefaultConnection"))
            .AddRedis(Configuration.GetConnectionString("Redis"))
            .AddCheck<ExternalServiceHealthCheck>("external-api");

        // Swagger documentation
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "E-commerce API",
                Version = "v1",
                Description = "A comprehensive e-commerce API",
                Contact = new OpenApiContact
                {
                    Name = "API Support",
                    Email = "support@ecommerce.com"
                }
            });

            // JWT Authentication
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
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
                    new string[] {}
                }
            });

            // Include XML comments
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);
        });

        // Business services
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ICacheService, RedisCacheService>();
        services.AddScoped<IEmailService, EmailService>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "E-commerce API v1");
                c.RoutePrefix = string.Empty; // Serve Swagger UI at root
            });
        }
        else
        {
            app.UseExceptionHandler("/error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors("AllowSpecificOrigins");

        // Rate limiting
        app.UseIpRateLimiting();

        // Security headers
        app.UseSecurityHeaders();

        app.UseAuthentication();
        app.UseAuthorization();

        // Health checks
        app.UseHealthChecks("/health", new HealthCheckOptions
        {
            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
        });

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}

// Products Controller - Complete CRUD with advanced features
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ICacheService _cacheService;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(
        IProductService productService,
        ICacheService cacheService,
        ILogger<ProductsController> logger)
    {
        _productService = productService;
        _cacheService = cacheService;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves a paginated list of products with filtering and sorting
    /// </summary>
    /// <param name="filter">Product filter parameters</param>
    /// <returns>Paginated product list</returns>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(PagedResult<ProductDto>), 200)]
    [ProducesResponseType(typeof(ApiErrorResponse), 400)]
    public async Task<IActionResult> GetProducts([FromQuery] ProductFilter filter)
    {
        try
        {
            var cacheKey = $"products_{filter.GetHashCode()}";

            var cachedResult = await _cacheService.GetAsync<PagedResult<ProductDto>>(cacheKey);
            if (cachedResult != null)
            {
                Response.Headers.Add("X-Cache", "HIT");
                return Ok(cachedResult);
            }

            var products = await _productService.GetProductsAsync(filter);

            // Cache for 5 minutes
            await _cacheService.SetAsync(cacheKey, products, TimeSpan.FromMinutes(5));
            Response.Headers.Add("X-Cache", "MISS");

            // Add pagination headers
            Response.Headers.Add("X-Total-Count", products.TotalCount.ToString());
            Response.Headers.Add("X-Page-Size", products.PageSize.ToString());
            Response.Headers.Add("X-Current-Page", products.CurrentPage.ToString());

            return Ok(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving products with filter: {@Filter}", filter);
            return StatusCode(500, new ApiErrorResponse
            {
                Message = "An error occurred while retrieving products",
                TraceId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
            });
        }
    }

    /// <summary>
    /// Retrieves a specific product by ID
    /// </summary>
    /// <param name="id">Product identifier</param>
    /// <returns>Product details</returns>
    [HttpGet("{id:int}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ProductDetailDto), 200)]
    [ProducesResponseType(typeof(ApiErrorResponse), 404)]
    public async Task<IActionResult> GetProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);

        if (product == null)
        {
            return NotFound(new ApiErrorResponse
            {
                Message = $"Product with ID {id} not found",
                ErrorCode = "PRODUCT_NOT_FOUND"
            });
        }

        // Add HATEOAS links
        var productWithLinks = new
        {
            Data = product,
            Links = new
            {
                Self = Url.Action(nameof(GetProduct), new { id }),
                Update = Url.Action(nameof(UpdateProduct), new { id }),
                Delete = Url.Action(nameof(DeleteProduct), new { id }),
                Reviews = Url.Action("GetProductReviews", "Reviews", new { productId = id }),
                RelatedProducts = Url.Action(nameof(GetRelatedProducts), new { id })
            }
        };

        return Ok(productWithLinks);
    }

    /// <summary>
    /// Creates a new product
    /// </summary>
    /// <param name="request">Product creation request</param>
    /// <returns>Created product</returns>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ProductDto), 201)]
    [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var product = await _productService.CreateProductAsync(request);

            _logger.LogInformation("Product created successfully: {ProductId} by user {UserId}",
                product.Id, User.FindFirst("user_id")?.Value);

            return CreatedAtAction(
                nameof(GetProduct),
                new { id = product.Id },
                product);
        }
        catch (DuplicateProductException ex)
        {
            return Conflict(new ApiErrorResponse
            {
                Message = ex.Message,
                ErrorCode = "DUPLICATE_PRODUCT_SKU"
            });
        }
        catch (ValidationException ex)
        {
            return BadRequest(new ValidationProblemDetails(ex.Errors));
        }
    }

    /// <summary>
    /// Updates an existing product
    /// </summary>
    /// <param name="id">Product identifier</param>
    /// <param name="request">Product update request</param>
    /// <returns>Updated product</returns>
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ProductDto), 200)]
    [ProducesResponseType(typeof(ApiErrorResponse), 404)]
    [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var product = await _productService.UpdateProductAsync(id, request);

            // Invalidate related cache entries
            await _cacheService.RemoveByPatternAsync("products_*");

            _logger.LogInformation("Product updated successfully: {ProductId} by user {UserId}",
                id, User.FindFirst("user_id")?.Value);

            return Ok(product);
        }
        catch (ProductNotFoundException)
        {
            return NotFound(new ApiErrorResponse
            {
                Message = $"Product with ID {id} not found",
                ErrorCode = "PRODUCT_NOT_FOUND"
            });
        }
    }

    /// <summary>
    /// Deletes a product
    /// </summary>
    /// <param name="id">Product identifier</param>
    /// <returns>No content</returns>
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiErrorResponse), 404)]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
            await _productService.DeleteProductAsync(id);

            // Invalidate cache
            await _cacheService.RemoveByPatternAsync("products_*");

            _logger.LogInformation("Product deleted successfully: {ProductId} by user {UserId}",
                id, User.FindFirst("user_id")?.Value);

            return NoContent();
        }
        catch (ProductNotFoundException)
        {
            return NotFound(new ApiErrorResponse
            {
                Message = $"Product with ID {id} not found",
                ErrorCode = "PRODUCT_NOT_FOUND"
            });
        }
        catch (ProductHasOrdersException ex)
        {
            return BadRequest(new ApiErrorResponse
            {
                Message = ex.Message,
                ErrorCode = "PRODUCT_HAS_ORDERS"
            });
        }
    }

    /// <summary>
    /// Searches products using full-text search
    /// </summary>
    /// <param name="query">Search query</param>
    /// <param name="page">Page number</param>
    /// <param name="pageSize">Page size</param>
    /// <returns>Search results</returns>
    [HttpGet("search")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(PagedResult<ProductSearchResult>), 200)]
    public async Task<IActionResult> SearchProducts(
        [FromQuery] string query,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest("Search query cannot be empty");
        }

        var searchResults = await _productService.SearchProductsAsync(query, page, pageSize);

        return Ok(searchResults);
    }

    /// <summary>
    /// Gets related products for a specific product
    /// </summary>
    /// <param name="id">Product identifier</param>
    /// <param name="count">Number of related products to return</param>
    /// <returns>Related products</returns>
    [HttpGet("{id:int}/related")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<ProductDto>), 200)]
    public async Task<IActionResult> GetRelatedProducts(int id, [FromQuery] int count = 5)
    {
        var relatedProducts = await _productService.GetRelatedProductsAsync(id, count);
        return Ok(relatedProducts);
    }
}

// Product Models and DTOs
public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string SKU { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public string ImageUrl { get; set; }
    public bool IsActive { get; set; }
    public int StockQuantity { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<string> Tags { get; set; } = new();
    public decimal? DiscountPrice { get; set; }
    public int ReviewCount { get; set; }
    public decimal AverageRating { get; set; }
}

public class CreateProductRequest
{
    [Required(ErrorMessage = "Product name is required")]
    [StringLength(200, ErrorMessage = "Product name cannot exceed 200 characters")]
    public string Name { get; set; }

    [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
    public string Description { get; set; }

    [Required(ErrorMessage = "Price is required")]
    [Range(0.01, 999999.99, ErrorMessage = "Price must be between 0.01 and 999999.99")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "SKU is required")]
    [StringLength(50, ErrorMessage = "SKU cannot exceed 50 characters")]
    public string SKU { get; set; }

    [Required(ErrorMessage = "Category ID is required")]
    public int CategoryId { get; set; }

    [Url(ErrorMessage = "Invalid URL format")]
    public string ImageUrl { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Stock quantity cannot be negative")]
    public int StockQuantity { get; set; } = 0;

    public List<string> Tags { get; set; } = new();

    [Range(0.01, 999999.99, ErrorMessage = "Discount price must be between 0.01 and 999999.99")]
    public decimal? DiscountPrice { get; set; }
}

public class UpdateProductRequest : CreateProductRequest
{
    public bool IsActive { get; set; } = true;
}

public class ProductFilter
{
    public string Name { get; set; }
    public int? CategoryId { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public bool? IsActive { get; set; }
    public List<string> Tags { get; set; } = new();
    public string SortBy { get; set; } = "Name";
    public bool SortDescending { get; set; } = false;
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;

    public override int GetHashCode()
    {
        return HashCode.Combine(Name, CategoryId, MinPrice, MaxPrice, IsActive,
            string.Join(",", Tags ?? new List<string>()), SortBy, SortDescending, Page, PageSize);
    }
}

public class PagedResult<T>
{
    public IEnumerable<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasPreviousPage => CurrentPage > 1;
    public bool HasNextPage => CurrentPage < TotalPages;
}
```

## 2. JWT Authentication & Authorization System

### Complete JWT Implementation with Refresh Tokens

```csharp
// JWT Service with Refresh Token Support
public interface IJwtService
{
    Task<AuthResult> GenerateTokensAsync(User user);
    Task<AuthResult> RefreshTokensAsync(string refreshToken);
    Task RevokeTokenAsync(string refreshToken);
    ClaimsPrincipal ValidateToken(string token);
}

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly ILogger<JwtService> _logger;

    private readonly string _secretKey;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly TimeSpan _accessTokenExpiry;
    private readonly TimeSpan _refreshTokenExpiry;

    public JwtService(
        IConfiguration configuration,
        IUserService userService,
        IRefreshTokenRepository refreshTokenRepository,
        ILogger<JwtService> logger)
    {
        _configuration = configuration;
        _userService = userService;
        _refreshTokenRepository = refreshTokenRepository;
        _logger = logger;

        _secretKey = _configuration["Jwt:SecretKey"];
        _issuer = _configuration["Jwt:Issuer"];
        _audience = _configuration["Jwt:Audience"];
        _accessTokenExpiry = TimeSpan.FromMinutes(_configuration.GetValue<int>("Jwt:AccessTokenExpiryMinutes"));
        _refreshTokenExpiry = TimeSpan.FromDays(_configuration.GetValue<int>("Jwt:RefreshTokenExpiryDays"));
    }

    public async Task<AuthResult> GenerateTokensAsync(User user)
    {
        var roles = await _userService.GetUserRolesAsync(user.Id);
        var permissions = await _userService.GetUserPermissionsAsync(user.Id);

        var accessToken = GenerateAccessToken(user, roles, permissions);
        var refreshToken = await GenerateRefreshTokenAsync(user.Id);

        return new AuthResult
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token,
            ExpiresAt = DateTime.UtcNow.Add(_accessTokenExpiry),
            TokenType = "Bearer"
        };
    }

    private string GenerateAccessToken(User user, IList<string> roles, IList<string> permissions)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_secretKey);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Username),
            new(ClaimTypes.Email, user.Email),
            new("user_id", user.Id.ToString()),
            new("tenant_id", user.TenantId.ToString()),
            new("email_verified", user.EmailVerified.ToString())
        };

        // Add role claims
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        // Add permission claims
        foreach (var permission in permissions)
        {
            claims.Add(new Claim("permission", permission));
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.Add(_accessTokenExpiry),
            Issuer = _issuer,
            Audience = _audience,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private async Task<RefreshToken> GenerateRefreshTokenAsync(int userId)
    {
        // Revoke existing refresh tokens for this user
        await _refreshTokenRepository.RevokeUserTokensAsync(userId);

        var refreshToken = new RefreshToken
        {
            Token = GenerateSecureToken(),
            UserId = userId,
            ExpiresAt = DateTime.UtcNow.Add(_refreshTokenExpiry),
            CreatedAt = DateTime.UtcNow,
            CreatedByIp = GetClientIpAddress()
        };

        await _refreshTokenRepository.CreateAsync(refreshToken);
        return refreshToken;
    }

    public async Task<AuthResult> RefreshTokensAsync(string refreshToken)
    {
        var storedToken = await _refreshTokenRepository.GetByTokenAsync(refreshToken);

        if (storedToken == null || !storedToken.IsActive)
        {
            throw new SecurityTokenValidationException("Invalid refresh token");
        }

        var user = await _userService.GetByIdAsync(storedToken.UserId);
        if (user == null || !user.IsActive)
        {
            throw new SecurityTokenValidationException("User not found or inactive");
        }

        // Generate new tokens
        var authResult = await GenerateTokensAsync(user);

        // Revoke old refresh token
        storedToken.RevokedAt = DateTime.UtcNow;
        storedToken.RevokedByIp = GetClientIpAddress();
        await _refreshTokenRepository.UpdateAsync(storedToken);

        _logger.LogInformation("Refresh token used for user {UserId}", user.Id);

        return authResult;
    }

    public async Task RevokeTokenAsync(string refreshToken)
    {
        var storedToken = await _refreshTokenRepository.GetByTokenAsync(refreshToken);

        if (storedToken?.IsActive == true)
        {
            storedToken.RevokedAt = DateTime.UtcNow;
            storedToken.RevokedByIp = GetClientIpAddress();
            await _refreshTokenRepository.UpdateAsync(storedToken);
        }
    }

    public ClaimsPrincipal ValidateToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secretKey);

            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = true,
                ValidAudience = _audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            }, out _);

            return principal;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Token validation failed");
            return null;
        }
    }

    private string GenerateSecureToken()
    {
        using var rng = RandomNumberGenerator.Create();
        var randomBytes = new byte[64];
        rng.GetBytes(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }

    private string GetClientIpAddress()
    {
        // Implementation depends on your HTTP context access setup
        return "127.0.0.1"; // Placeholder
    }
}

// Authentication Controller
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IJwtService _jwtService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        IAuthService authService,
        IJwtService jwtService,
        ILogger<AuthController> logger)
    {
        _authService = authService;
        _jwtService = jwtService;
        _logger = logger;
    }

    /// <summary>
    /// Authenticates user and returns JWT tokens
    /// </summary>
    /// <param name="request">Login credentials</param>
    /// <returns>Authentication result with tokens</returns>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResult), 200)]
    [ProducesResponseType(typeof(ApiErrorResponse), 400)]
    [ProducesResponseType(typeof(ApiErrorResponse), 401)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var user = await _authService.ValidateCredentialsAsync(request.Email, request.Password);

            if (user == null)
            {
                _logger.LogWarning("Failed login attempt for email: {Email} from IP: {IpAddress}",
                    request.Email, HttpContext.Connection.RemoteIpAddress);

                return Unauthorized(new ApiErrorResponse
                {
                    Message = "Invalid email or password",
                    ErrorCode = "INVALID_CREDENTIALS"
                });
            }

            if (!user.IsActive)
            {
                return Unauthorized(new ApiErrorResponse
                {
                    Message = "Account is disabled",
                    ErrorCode = "ACCOUNT_DISABLED"
                });
            }

            if (!user.EmailVerified)
            {
                return Unauthorized(new ApiErrorResponse
                {
                    Message = "Email not verified",
                    ErrorCode = "EMAIL_NOT_VERIFIED"
                });
            }

            var authResult = await _jwtService.GenerateTokensAsync(user);

            // Set refresh token in HTTP-only cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", authResult.RefreshToken, cookieOptions);

            _logger.LogInformation("Successful login for user: {UserId}", user.Id);

            // Don't return refresh token in response body for security
            return Ok(new
            {
                authResult.AccessToken,
                authResult.ExpiresAt,
                authResult.TokenType,
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.FirstName,
                    user.LastName
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login for email: {Email}", request.Email);
            return StatusCode(500, new ApiErrorResponse
            {
                Message = "An error occurred during login",
                TraceId = HttpContext.TraceIdentifier
            });
        }
    }

    /// <summary>
    /// Refreshes access token using refresh token
    /// </summary>
    /// <returns>New authentication result</returns>
    [HttpPost("refresh")]
    [ProducesResponseType(typeof(AuthResult), 200)]
    [ProducesResponseType(typeof(ApiErrorResponse), 401)]
    public async Task<IActionResult> RefreshToken()
    {
        try
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized(new ApiErrorResponse
                {
                    Message = "Refresh token not found",
                    ErrorCode = "REFRESH_TOKEN_NOT_FOUND"
                });
            }

            var authResult = await _jwtService.RefreshTokensAsync(refreshToken);

            // Update refresh token cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", authResult.RefreshToken, cookieOptions);

            return Ok(new
            {
                authResult.AccessToken,
                authResult.ExpiresAt,
                authResult.TokenType
            });
        }
        catch (SecurityTokenValidationException ex)
        {
            _logger.LogWarning(ex, "Invalid refresh token attempt from IP: {IpAddress}",
                HttpContext.Connection.RemoteIpAddress);

            return Unauthorized(new ApiErrorResponse
            {
                Message = "Invalid refresh token",
                ErrorCode = "INVALID_REFRESH_TOKEN"
            });
        }
    }

    /// <summary>
    /// Logs out user and revokes refresh token
    /// </summary>
    /// <returns>Success response</returns>
    [HttpPost("logout")]
    [Authorize]
    [ProducesResponseType(200)]
    public async Task<IActionResult> Logout()
    {
        try
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (!string.IsNullOrEmpty(refreshToken))
            {
                await _jwtService.RevokeTokenAsync(refreshToken);
            }

            // Clear refresh token cookie
            Response.Cookies.Delete("refreshToken");

            var userId = User.FindFirst("user_id")?.Value;
            _logger.LogInformation("User logged out successfully: {UserId}", userId);

            return Ok(new { Message = "Logged out successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during logout");
            return StatusCode(500, new ApiErrorResponse
            {
                Message = "An error occurred during logout",
                TraceId = HttpContext.TraceIdentifier
            });
        }
    }
}

// Models and DTOs
public class LoginRequest
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }

    public bool RememberMe { get; set; }
}

public class AuthResult
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public DateTime ExpiresAt { get; set; }
    public string TokenType { get; set; }
}

public class RefreshToken
{
    public int Id { get; set; }
    public string Token { get; set; }
    public int UserId { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public string CreatedByIp { get; set; }
    public DateTime? RevokedAt { get; set; }
    public string RevokedByIp { get; set; }

    public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
    public bool IsRevoked => RevokedAt != null;
    public bool IsActive => !IsRevoked && !IsExpired;
}
```

## 3. OAuth 2.0 Implementation with Azure AD

### Complete OAuth 2.0 Flow with PKCE

```csharp
// OAuth Configuration
public class OAuthOptions
{
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
    public string Authority { get; set; }
    public string RedirectUri { get; set; }
    public List<string> Scopes { get; set; } = new();
    public bool UsePkce { get; set; } = true;
}

// OAuth Service Implementation
public interface IOAuthService
{
    string GenerateAuthorizationUrl(string state = null, string codeChallenge = null);
    Task<OAuthTokenResponse> ExchangeCodeForTokensAsync(string code, string codeVerifier = null);
    Task<OAuthTokenResponse> RefreshTokenAsync(string refreshToken);
    Task<UserInfo> GetUserInfoAsync(string accessToken);
}

public class AzureAdOAuthService : IOAuthService
{
    private readonly HttpClient _httpClient;
    private readonly OAuthOptions _options;
    private readonly ILogger<AzureAdOAuthService> _logger;

    public AzureAdOAuthService(
        HttpClient httpClient,
        IOptions<OAuthOptions> options,
        ILogger<AzureAdOAuthService> logger)
    {
        _httpClient = httpClient;
        _options = options.Value;
        _logger = logger;
    }

    public string GenerateAuthorizationUrl(string state = null, string codeChallenge = null)
    {
        var parameters = new Dictionary<string, string>
        {
            ["client_id"] = _options.ClientId,
            ["response_type"] = "code",
            ["redirect_uri"] = _options.RedirectUri,
            ["scope"] = string.Join(" ", _options.Scopes),
            ["response_mode"] = "query"
        };

        if (!string.IsNullOrEmpty(state))
        {
            parameters["state"] = state;
        }

        if (_options.UsePkce && !string.IsNullOrEmpty(codeChallenge))
        {
            parameters["code_challenge"] = codeChallenge;
            parameters["code_challenge_method"] = "S256";
        }

        var queryString = string.Join("&",
            parameters.Select(kvp => $"{Uri.EscapeDataString(kvp.Key)}={Uri.EscapeDataString(kvp.Value)}"));

        return $"{_options.Authority}/oauth2/v2.0/authorize?{queryString}";
    }

    public async Task<OAuthTokenResponse> ExchangeCodeForTokensAsync(string code, string codeVerifier = null)
    {
        var parameters = new Dictionary<string, string>
        {
            ["client_id"] = _options.ClientId,
            ["client_secret"] = _options.ClientSecret,
            ["grant_type"] = "authorization_code",
            ["code"] = code,
            ["redirect_uri"] = _options.RedirectUri
        };

        if (_options.UsePkce && !string.IsNullOrEmpty(codeVerifier))
        {
            parameters["code_verifier"] = codeVerifier;
        }

        var content = new FormUrlEncodedContent(parameters);

        try
        {
            var response = await _httpClient.PostAsync($"{_options.Authority}/oauth2/v2.0/token", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Token exchange failed: {StatusCode} - {Content}",
                    response.StatusCode, responseContent);

                var errorResponse = JsonSerializer.Deserialize<OAuthErrorResponse>(responseContent);
                throw new OAuthException($"Token exchange failed: {errorResponse?.Error}", errorResponse);
            }

            var tokenResponse = JsonSerializer.Deserialize<OAuthTokenResponse>(responseContent);
            return tokenResponse;
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP error during token exchange");
            throw new OAuthException("Network error during token exchange", ex);
        }
    }

    public async Task<OAuthTokenResponse> RefreshTokenAsync(string refreshToken)
    {
        var parameters = new Dictionary<string, string>
        {
            ["client_id"] = _options.ClientId,
            ["client_secret"] = _options.ClientSecret,
            ["grant_type"] = "refresh_token",
            ["refresh_token"] = refreshToken
        };

        var content = new FormUrlEncodedContent(parameters);

        try
        {
            var response = await _httpClient.PostAsync($"{_options.Authority}/oauth2/v2.0/token", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                var errorResponse = JsonSerializer.Deserialize<OAuthErrorResponse>(responseContent);
                throw new OAuthException($"Token refresh failed: {errorResponse?.Error}", errorResponse);
            }

            return JsonSerializer.Deserialize<OAuthTokenResponse>(responseContent);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP error during token refresh");
            throw new OAuthException("Network error during token refresh", ex);
        }
    }

    public async Task<UserInfo> GetUserInfoAsync(string accessToken)
    {
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken);

        try
        {
            var response = await _httpClient.GetAsync("https://graph.microsoft.com/v1.0/me");
            var content = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new OAuthException($"Failed to get user info: {response.StatusCode}");
            }

            return JsonSerializer.Deserialize<UserInfo>(content);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP error during user info retrieval");
            throw new OAuthException("Network error during user info retrieval", ex);
        }
    }
}

// OAuth Controller with PKCE Support
[ApiController]
[Route("api/[controller]")]
public class OAuthController : ControllerBase
{
    private readonly IOAuthService _oauthService;
    private readonly IUserService _userService;
    private readonly IJwtService _jwtService;
    private readonly ILogger<OAuthController> _logger;

    public OAuthController(
        IOAuthService oauthService,
        IUserService userService,
        IJwtService jwtService,
        ILogger<OAuthController> logger)
    {
        _oauthService = oauthService;
        _userService = userService;
        _jwtService = jwtService;
        _logger = logger;
    }

    /// <summary>
    /// Initiates OAuth 2.0 authorization flow with PKCE
    /// </summary>
    /// <returns>Authorization URL and PKCE parameters</returns>
    [HttpPost("authorize")]
    [ProducesResponseType(typeof(OAuthAuthorizeResponse), 200)]
    public IActionResult Authorize()
    {
        // Generate PKCE parameters
        var codeVerifier = GenerateCodeVerifier();
        var codeChallenge = GenerateCodeChallenge(codeVerifier);
        var state = Guid.NewGuid().ToString();

        // Store PKCE parameters in session/cache for validation
        HttpContext.Session.SetString("code_verifier", codeVerifier);
        HttpContext.Session.SetString("oauth_state", state);

        var authUrl = _oauthService.GenerateAuthorizationUrl(state, codeChallenge);

        return Ok(new OAuthAuthorizeResponse
        {
            AuthorizationUrl = authUrl,
            State = state,
            CodeChallenge = codeChallenge,
            CodeVerifier = codeVerifier // Don't return this in production
        });
    }

    /// <summary>
    /// Handles OAuth callback and exchanges authorization code for tokens
    /// </summary>
    /// <param name="code">Authorization code</param>
    /// <param name="state">State parameter</param>
    /// <param name="error">Error parameter</param>
    /// <returns>Authentication result</returns>
    [HttpGet("callback")]
    [ProducesResponseType(typeof(AuthResult), 200)]
    [ProducesResponseType(typeof(ApiErrorResponse), 400)]
    public async Task<IActionResult> Callback(
        [FromQuery] string code,
        [FromQuery] string state,
        [FromQuery] string error)
    {
        if (!string.IsNullOrEmpty(error))
        {
            _logger.LogWarning("OAuth error: {Error}", error);
            return BadRequest(new ApiErrorResponse
            {
                Message = $"OAuth authorization failed: {error}",
                ErrorCode = "OAUTH_ERROR"
            });
        }

        if (string.IsNullOrEmpty(code))
        {
            return BadRequest(new ApiErrorResponse
            {
                Message = "Authorization code is required",
                ErrorCode = "MISSING_AUTH_CODE"
            });
        }

        // Validate state parameter
        var storedState = HttpContext.Session.GetString("oauth_state");
        if (string.IsNullOrEmpty(storedState) || storedState != state)
        {
            return BadRequest(new ApiErrorResponse
            {
                Message = "Invalid state parameter",
                ErrorCode = "INVALID_STATE"
            });
        }

        try
        {
            // Get PKCE code verifier
            var codeVerifier = HttpContext.Session.GetString("code_verifier");

            // Exchange authorization code for tokens
            var tokenResponse = await _oauthService.ExchangeCodeForTokensAsync(code, codeVerifier);

            // Get user information
            var userInfo = await _oauthService.GetUserInfoAsync(tokenResponse.AccessToken);

            // Find or create user
            var user = await _userService.FindByEmailAsync(userInfo.Email);
            if (user == null)
            {
                user = await _userService.CreateFromOAuthAsync(userInfo);
                _logger.LogInformation("New user created from OAuth: {Email}", userInfo.Email);
            }
            else
            {
                await _userService.UpdateFromOAuthAsync(user, userInfo);
                _logger.LogInformation("Existing user updated from OAuth: {Email}", userInfo.Email);
            }

            // Generate internal JWT tokens
            var authResult = await _jwtService.GenerateTokensAsync(user);

            // Store OAuth tokens for API calls
            await _userService.StoreOAuthTokensAsync(user.Id, tokenResponse);

            // Clear session data
            HttpContext.Session.Remove("code_verifier");
            HttpContext.Session.Remove("oauth_state");

            return Ok(authResult);
        }
        catch (OAuthException ex)
        {
            _logger.LogError(ex, "OAuth token exchange failed");
            return BadRequest(new ApiErrorResponse
            {
                Message = "Failed to exchange authorization code",
                ErrorCode = "TOKEN_EXCHANGE_FAILED"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error during OAuth callback");
            return StatusCode(500, new ApiErrorResponse
            {
                Message = "An unexpected error occurred",
                TraceId = HttpContext.TraceIdentifier
            });
        }
    }

    /// <summary>
    /// Refreshes OAuth tokens
    /// </summary>
    /// <param name="request">Refresh token request</param>
    /// <returns>New tokens</returns>
    [HttpPost("refresh")]
    [Authorize]
    [ProducesResponseType(typeof(OAuthTokenResponse), 200)]
    public async Task<IActionResult> RefreshOAuthToken([FromBody] RefreshOAuthTokenRequest request)
    {
        try
        {
            var userId = int.Parse(User.FindFirst("user_id")?.Value);
            var storedTokens = await _userService.GetOAuthTokensAsync(userId);

            if (storedTokens?.RefreshToken != request.RefreshToken)
            {
                return BadRequest(new ApiErrorResponse
                {
                    Message = "Invalid refresh token",
                    ErrorCode = "INVALID_REFRESH_TOKEN"
                });
            }

            var newTokens = await _oauthService.RefreshTokenAsync(request.RefreshToken);
            await _userService.StoreOAuthTokensAsync(userId, newTokens);

            return Ok(newTokens);
        }
        catch (OAuthException ex)
        {
            _logger.LogError(ex, "OAuth token refresh failed for user: {UserId}",
                User.FindFirst("user_id")?.Value);

            return BadRequest(new ApiErrorResponse
            {
                Message = "Failed to refresh OAuth token",
                ErrorCode = "TOKEN_REFRESH_FAILED"
            });
        }
    }

    private string GenerateCodeVerifier()
    {
        using var rng = RandomNumberGenerator.Create();
        var bytes = new byte[32];
        rng.GetBytes(bytes);
        return Base64UrlEncoder.Encode(bytes);
    }

    private string GenerateCodeChallenge(string codeVerifier)
    {
        using var sha256 = SHA256.Create();
        var challengeBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(codeVerifier));
        return Base64UrlEncoder.Encode(challengeBytes);
    }
}

// OAuth Models
public class OAuthTokenResponse
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }

    [JsonPropertyName("token_type")]
    public string TokenType { get; set; }

    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }

    [JsonPropertyName("refresh_token")]
    public string RefreshToken { get; set; }

    [JsonPropertyName("scope")]
    public string Scope { get; set; }
}

public class OAuthAuthorizeResponse
{
    public string AuthorizationUrl { get; set; }
    public string State { get; set; }
    public string CodeChallenge { get; set; }
    public string CodeVerifier { get; set; }
}

public class UserInfo
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("displayName")]
    public string DisplayName { get; set; }

    [JsonPropertyName("givenName")]
    public string GivenName { get; set; }

    [JsonPropertyName("surname")]
    public string Surname { get; set; }

    [JsonPropertyName("mail")]
    public string Email { get; set; }

    [JsonPropertyName("userPrincipalName")]
    public string UserPrincipalName { get; set; }
}

public class OAuthErrorResponse
{
    [JsonPropertyName("error")]
    public string Error { get; set; }

    [JsonPropertyName("error_description")]
    public string ErrorDescription { get; set; }
}

public class OAuthException : Exception
{
    public OAuthErrorResponse ErrorResponse { get; }

    public OAuthException(string message, Exception innerException = null)
        : base(message, innerException) { }

    public OAuthException(string message, OAuthErrorResponse errorResponse)
        : base(message)
    {
        ErrorResponse = errorResponse;
    }
}
```

## 4. GraphQL API Implementation

### Complete GraphQL Server with Subscriptions

```csharp
// GraphQL Startup Configuration
public void ConfigureServices(IServiceCollection services)
{
    // Database
    services.AddDbContext<EcommerceDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

    // GraphQL
    services.AddGraphQLServer()
        .AddQueryType<Query>()
        .AddMutationType<Mutation>()
        .AddSubscriptionType<Subscription>()
        .AddType<ProductType>()
        .AddType<UserType>()
        .AddType<OrderType>()
        .AddFiltering()
        .AddSorting()
        .AddProjections()
        .AddInMemorySubscriptions()
        .AddAuthorization()
        .AddInstrumentation(o =>
        {
            o.RenameRootActivity = true;
            o.IncludeDocument = true;
        });

    // DataLoader for N+1 problem solving
    services.AddDataLoader<ProductBatchDataLoader>();
    services.AddDataLoader<UserBatchDataLoader>();
    services.AddDataLoader<CategoryBatchDataLoader>();

    // Business services
    services.AddScoped<IProductService, ProductService>();
    services.AddScoped<IOrderService, OrderService>();
    services.AddScoped<IUserService, UserService>();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();

    app.UseWebSockets();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapGraphQL();

        if (env.IsDevelopment())
        {
            endpoints.MapGraphQLPlayground("/graphql/playground");
        }
    });
}

// Query Root Type
public class Query
{
    /// <summary>
    /// Gets products with filtering, sorting, and pagination
    /// </summary>
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Product> GetProducts([Service] EcommerceDbContext context)
    {
        return context.Products.Where(p => p.IsActive);
    }

    /// <summary>
    /// Gets a specific product by ID
    /// </summary>
    public async Task<Product> GetProductAsync(
        int id,
        ProductBatchDataLoader productLoader)
    {
        return await productLoader.LoadAsync(id);
    }

    /// <summary>
    /// Searches products using full-text search
    /// </summary>
    public async Task<SearchResult<Product>> SearchProductsAsync(
        string query,
        int first = 10,
        string? after = null,
        [Service] IProductService productService)
    {
        return await productService.SearchProductsAsync(query, first, after);
    }

    /// <summary>
    /// Gets user orders (requires authentication)
    /// </summary>
    [Authorize]
    public async Task<IEnumerable<Order>> GetMyOrdersAsync(
        ClaimsPrincipal claimsPrincipal,
        [Service] IOrderService orderService)
    {
        var userId = int.Parse(claimsPrincipal.FindFirst("user_id")?.Value ?? "0");
        return await orderService.GetUserOrdersAsync(userId);
    }

    /// <summary>
    /// Gets order by ID (admin only)
    /// </summary>
    [Authorize(Roles = new[] { "Admin" })]
    public async Task<Order?> GetOrderAsync(
        int orderId,
        [Service] IOrderService orderService)
    {
        return await orderService.GetOrderByIdAsync(orderId);
    }
}

// Mutation Root Type
public class Mutation
{
    /// <summary>
    /// Creates a new product (admin only)
    /// </summary>
    [Authorize(Roles = new[] { "Admin" })]
    public async Task<CreateProductPayload> CreateProductAsync(
        CreateProductInput input,
        [Service] IProductService productService,
        [Service] ITopicEventSender eventSender)
    {
        try
        {
            var product = await productService.CreateProductAsync(new CreateProductRequest
            {
                Name = input.Name,
                Description = input.Description,
                Price = input.Price,
                SKU = input.SKU,
                CategoryId = input.CategoryId,
                ImageUrl = input.ImageUrl,
                StockQuantity = input.StockQuantity
            });

            // Send subscription event
            await eventSender.SendAsync(nameof(Subscription.OnProductCreated), product);

            return new CreateProductPayload(product);
        }
        catch (ValidationException ex)
        {
            return new CreateProductPayload(ex.Errors.Select(e => new UserError(e.ErrorMessage, "VALIDATION_ERROR")));
        }
        catch (Exception ex)
        {
            return new CreateProductPayload(new UserError(ex.Message, "INTERNAL_ERROR"));
        }
    }

    /// <summary>
    /// Updates a product (admin only)
    /// </summary>
    [Authorize(Roles = new[] { "Admin" })]
    public async Task<UpdateProductPayload> UpdateProductAsync(
        UpdateProductInput input,
        [Service] IProductService productService,
        [Service] ITopicEventSender eventSender)
    {
        try
        {
            var product = await productService.UpdateProductAsync(input.Id, new UpdateProductRequest
            {
                Name = input.Name,
                Description = input.Description,
                Price = input.Price,
                SKU = input.SKU,
                CategoryId = input.CategoryId,
                ImageUrl = input.ImageUrl,
                StockQuantity = input.StockQuantity,
                IsActive = input.IsActive
            });

            await eventSender.SendAsync(nameof(Subscription.OnProductUpdated), product);

            return new UpdateProductPayload(product);
        }
        catch (ProductNotFoundException)
        {
            return new UpdateProductPayload(new UserError("Product not found", "PRODUCT_NOT_FOUND"));
        }
        catch (ValidationException ex)
        {
            return new UpdateProductPayload(ex.Errors.Select(e => new UserError(e.ErrorMessage, "VALIDATION_ERROR")));
        }
    }

    /// <summary>
    /// Creates an order (authenticated users)
    /// </summary>
    [Authorize]
    public async Task<CreateOrderPayload> CreateOrderAsync(
        CreateOrderInput input,
        ClaimsPrincipal claimsPrincipal,
        [Service] IOrderService orderService,
        [Service] ITopicEventSender eventSender)
    {
        try
        {
            var userId = int.Parse(claimsPrincipal.FindFirst("user_id")?.Value ?? "0");

            var order = await orderService.CreateOrderAsync(new CreateOrderRequest
            {
                UserId = userId,
                Items = input.Items.Select(i => new OrderItemRequest
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    Price = i.Price
                }).ToList(),
                ShippingAddress = input.ShippingAddress,
                BillingAddress = input.BillingAddress
            });

            await eventSender.SendAsync(nameof(Subscription.OnOrderCreated), order);

            return new CreateOrderPayload(order);
        }
        catch (InsufficientStockException ex)
        {
            return new CreateOrderPayload(new UserError(ex.Message, "INSUFFICIENT_STOCK"));
        }
        catch (ValidationException ex)
        {
            return new CreateOrderPayload(ex.Errors.Select(e => new UserError(e.ErrorMessage, "VALIDATION_ERROR")));
        }
    }
}

// Subscription Root Type
public class Subscription
{
    /// <summary>
    /// Subscribe to product creation events
    /// </summary>
    [Subscribe]
    [Topic]
    public Product OnProductCreated([EventMessage] Product product) => product;

    /// <summary>
    /// Subscribe to product updates
    /// </summary>
    [Subscribe]
    [Topic]
    public Product OnProductUpdated([EventMessage] Product product) => product;

    /// <summary>
    /// Subscribe to order events (admin only)
    /// </summary>
    [Authorize(Roles = new[] { "Admin" })]
    [Subscribe]
    [Topic]
    public Order OnOrderCreated([EventMessage] Order order) => order;

    /// <summary>
    /// Subscribe to user-specific order events
    /// </summary>
    [Authorize]
    [Subscribe]
    [Topic("order_created_{userId}")]
    public Order OnMyOrderCreated(
        [EventMessage] Order order,
        ClaimsPrincipal claimsPrincipal)
    {
        var userId = int.Parse(claimsPrincipal.FindFirst("user_id")?.Value ?? "0");
        return order.UserId == userId ? order : null;
    }
}

// GraphQL Types
public class ProductType : ObjectType<Product>
{
    protected override void Configure(IObjectTypeDescriptor<Product> descriptor)
    {
        descriptor.Field(p => p.Id).Type<NonNullType<IdType>>();
        descriptor.Field(p => p.Name).Type<NonNullType<StringType>>();
        descriptor.Field(p => p.Price).Type<NonNullType<DecimalType>>();

        // Resolve category using DataLoader
        descriptor
            .Field(p => p.Category)
            .ResolveWith<ProductResolvers>(r => r.GetCategoryAsync(default!, default!))
            .UseDbContext<EcommerceDbContext>();

        // Resolve reviews with pagination
        descriptor
            .Field("reviews")
            .Type<NonNullType<ListType<ReviewType>>>()
            .ResolveWith<ProductResolvers>(r => r.GetReviewsAsync(default!, default!, default!))
            .UseDbContext<EcommerceDbContext>();

        // Add computed field
        descriptor
            .Field("averageRating")
            .Type<FloatType>()
            .ResolveWith<ProductResolvers>(r => r.GetAverageRatingAsync(default!, default!));
    }
}

// Product Resolvers
public class ProductResolvers
{
    public async Task<Category> GetCategoryAsync(
        Product product,
        CategoryBatchDataLoader categoryLoader)
    {
        return await categoryLoader.LoadAsync(product.CategoryId);
    }

    public async Task<IEnumerable<Review>> GetReviewsAsync(
        Product product,
        EcommerceDbContext context,
        [Service] IReviewService reviewService)
    {
        return await reviewService.GetProductReviewsAsync(product.Id);
    }

    public async Task<float> GetAverageRatingAsync(
        Product product,
        [Service] IReviewService reviewService)
    {
        return await reviewService.GetAverageRatingAsync(product.Id);
    }
}

// DataLoaders for efficient data fetching
public class ProductBatchDataLoader : BatchDataLoader<int, Product>
{
    private readonly IServiceProvider _serviceProvider;

    public ProductBatchDataLoader(
        IBatchScheduler batchScheduler,
        IServiceProvider serviceProvider,
        DataLoaderOptions? options = null)
        : base(batchScheduler, options)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task<IReadOnlyDictionary<int, Product>> LoadBatchAsync(
        IReadOnlyList<int> keys,
        CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<EcommerceDbContext>();

        var products = await context.Products
            .Where(p => keys.Contains(p.Id))
            .ToListAsync(cancellationToken);

        return products.ToDictionary(p => p.Id);
    }
}

// Input Types
public class CreateProductInput
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string SKU { get; set; }
    public int CategoryId { get; set; }
    public string? ImageUrl { get; set; }
    public int StockQuantity { get; set; }
}

public class UpdateProductInput : CreateProductInput
{
    public int Id { get; set; }
    public bool IsActive { get; set; }
}

public class CreateOrderInput
{
    public List<OrderItemInput> Items { get; set; } = new();
    public AddressInput ShippingAddress { get; set; }
    public AddressInput BillingAddress { get; set; }
}

public class OrderItemInput
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}

// Payload Types with Error Handling
public class CreateProductPayload : Payload
{
    public CreateProductPayload(Product product)
    {
        Product = product;
    }

    public CreateProductPayload(IEnumerable<UserError> errors) : base(errors) { }

    public CreateProductPayload(UserError error) : base(new[] { error }) { }

    public Product? Product { get; }
}

public abstract class Payload
{
    protected Payload() { }

    protected Payload(IEnumerable<UserError> errors)
    {
        Errors = errors.ToList();
    }

    public IReadOnlyList<UserError>? Errors { get; }
}

public class UserError
{
    public UserError(string message, string code)
    {
        Message = message;
        Code = code;
    }

    public string Message { get; }
    public string Code { get; }
}
```

## 5. gRPC Service Implementation

### Complete gRPC Service with Advanced Features

```protobuf
// product_service.proto
syntax = "proto3";

import "google/protobuf/timestamp.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";

package ecommerce.v1;

option csharp_namespace = "ECommerce.Grpc.V1";

// Product Service Definition
service ProductService {
  // Unary RPC - Get single product
  rpc GetProduct(GetProductRequest) returns (Product);

  // Server streaming RPC - List products with pagination
  rpc ListProducts(ListProductsRequest) returns (stream Product);

  // Client streaming RPC - Bulk create products
  rpc BulkCreateProducts(stream CreateProductRequest) returns (BulkCreateProductsResponse);

  // Bidirectional streaming RPC - Real-time product updates
  rpc StreamProductUpdates(stream ProductUpdateRequest) returns (stream ProductUpdateResponse);

  // Standard CRUD operations
  rpc CreateProduct(CreateProductRequest) returns (Product);
  rpc UpdateProduct(UpdateProductRequest) returns (Product);
  rpc DeleteProduct(DeleteProductRequest) returns (google.protobuf.Empty);
  rpc SearchProducts(SearchProductsRequest) returns (SearchProductsResponse);
}

// Messages
message Product {
  int32 id = 1;
  string name = 2;
  string description = 3;
  double price = 4;
  string sku = 5;
  int32 category_id = 6;
  string category_name = 7;
  string image_url = 8;
  bool is_active = 9;
  int32 stock_quantity = 10;
  google.protobuf.Timestamp created_at = 11;
  google.protobuf.Timestamp updated_at = 12;
  repeated string tags = 13;
  google.protobuf.DoubleValue discount_price = 14;
  int32 review_count = 15;
  double average_rating = 16;
}

message GetProductRequest {
  int32 id = 1;
}

message ListProductsRequest {
  int32 page_size = 1;
  string page_token = 2;
  string filter = 3;  // SQL-like filter expression
  string order_by = 4;
}

message CreateProductRequest {
  string name = 1;
  string description = 2;
  double price = 3;
  string sku = 4;
  int32 category_id = 5;
  string image_url = 6;
  int32 stock_quantity = 7;
  repeated string tags = 8;
  google.protobuf.DoubleValue discount_price = 9;
}

message UpdateProductRequest {
  int32 id = 1;
  Product product = 2;
  google.protobuf.FieldMask update_mask = 3;
}

message DeleteProductRequest {
  int32 id = 1;
}

message SearchProductsRequest {
  string query = 1;
  int32 page_size = 2;
  string page_token = 3;
  repeated string categories = 4;
  PriceRange price_range = 5;
}

message SearchProductsResponse {
  repeated Product products = 1;
  string next_page_token = 2;
  int32 total_count = 3;
}

message PriceRange {
  double min_price = 1;
  double max_price = 2;
}

message BulkCreateProductsResponse {
  repeated Product products = 1;
  repeated string errors = 2;
}

message ProductUpdateRequest {
  oneof request_type {
    SubscribeToUpdatesRequest subscribe = 1;
    UpdateProductRequest update = 2;
  }
}

message ProductUpdateResponse {
  oneof response_type {
    Product product_updated = 1;
    Product product_created = 2;
    ProductDeletedResponse product_deleted = 3;
    ErrorResponse error = 4;
  }
}

message SubscribeToUpdatesRequest {
  repeated int32 product_ids = 1;
  repeated int32 category_ids = 2;
}

message ProductDeletedResponse {
  int32 product_id = 1;
  google.protobuf.Timestamp deleted_at = 2;
}

message ErrorResponse {
  string code = 1;
  string message = 2;
  map<string, string> details = 3;
}
```

```csharp
// gRPC Service Implementation
public class ProductGrpcService : ProductService.ProductServiceBase
{
    private readonly IProductService _productService;
    private readonly IMapper _mapper;
    private readonly ILogger<ProductGrpcService> _logger;
    private readonly IHubContext<ProductUpdateHub> _hubContext;

    public ProductGrpcService(
        IProductService productService,
        IMapper mapper,
        ILogger<ProductGrpcService> logger,
        IHubContext<ProductUpdateHub> hubContext)
    {
        _productService = productService;
        _mapper = mapper;
        _logger = logger;
        _hubContext = hubContext;
    }

    // Unary RPC - Get single product
    public override async Task<Product> GetProduct(
        GetProductRequest request,
        ServerCallContext context)
    {
        try
        {
            _logger.LogInformation("Getting product with ID: {ProductId}", request.Id);

            var product = await _productService.GetProductByIdAsync(request.Id);

            if (product == null)
            {
                throw new RpcException(new Status(
                    StatusCode.NotFound,
                    $"Product with ID {request.Id} not found"));
            }

            return _mapper.Map<Product>(product);
        }
        catch (Exception ex) when (!(ex is RpcException))
        {
            _logger.LogError(ex, "Error getting product {ProductId}", request.Id);
            throw new RpcException(new Status(StatusCode.Internal, "Internal server error"));
        }
    }

    // Server streaming RPC - List products with pagination
    public override async Task ListProducts(
        ListProductsRequest request,
        IServerStreamWriter<Product> responseStream,
        ServerCallContext context)
    {
        try
        {
            var filter = new ProductFilter
            {
                PageSize = Math.Min(request.PageSize, 100), // Max 100 items per stream
                SortBy = request.OrderBy ?? "Name"
            };

            // Parse filter expression if provided
            if (!string.IsNullOrEmpty(request.Filter))
            {
                filter = ParseFilterExpression(request.Filter, filter);
            }

            var pageToken = request.PageToken;

            do
            {
                if (!string.IsNullOrEmpty(pageToken))
                {
                    filter.Page = int.Parse(DecodePageToken(pageToken));
                }

                var products = await _productService.GetProductsAsync(filter);

                foreach (var product in products.Items)
                {
                    if (context.CancellationToken.IsCancellationRequested)
                        return;

                    var grpcProduct = _mapper.Map<Product>(product);
                    await responseStream.WriteAsync(grpcProduct);

                    // Add delay to demonstrate streaming (remove in production)
                    await Task.Delay(100, context.CancellationToken);
                }

                pageToken = products.HasNextPage
                    ? EncodePageToken(products.CurrentPage + 1)
                    : null;

            } while (!string.IsNullOrEmpty(pageToken) && !context.CancellationToken.IsCancellationRequested);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error streaming products");
            throw new RpcException(new Status(StatusCode.Internal, "Error streaming products"));
        }
    }

    // Client streaming RPC - Bulk create products
    public override async Task<BulkCreateProductsResponse> BulkCreateProducts(
        IAsyncStreamReader<CreateProductRequest> requestStream,
        ServerCallContext context)
    {
        var response = new BulkCreateProductsResponse();
        var createdProducts = new List<Product>();
        var errors = new List<string>();

        try
        {
            await foreach (var request in requestStream.ReadAllAsync())
            {
                try
                {
                    var createRequest = _mapper.Map<CreateProductRequest>(request);
                    var product = await _productService.CreateProductAsync(createRequest);
                    createdProducts.Add(_mapper.Map<Product>(product));
                }
                catch (Exception ex)
                {
                    errors.Add($"Failed to create product '{request.Name}': {ex.Message}");
                    _logger.LogWarning(ex, "Failed to create product {ProductName}", request.Name);
                }
            }

            response.Products.AddRange(createdProducts);
            response.Errors.AddRange(errors);

            _logger.LogInformation("Bulk created {Count} products with {ErrorCount} errors",
                createdProducts.Count, errors.Count);

            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in bulk create products");
            throw new RpcException(new Status(StatusCode.Internal, "Error processing bulk create"));
        }
    }

    // Bidirectional streaming RPC - Real-time product updates
    public override async Task StreamProductUpdates(
        IAsyncStreamReader<ProductUpdateRequest> requestStream,
        IServerStreamWriter<ProductUpdateResponse> responseStream,
        ServerCallContext context)
    {
        var subscriptions = new HashSet<int>();
        var categorySubscriptions = new HashSet<int>();

        // Task to handle incoming subscription requests
        var subscriptionTask = Task.Run(async () =>
        {
            try
            {
                await foreach (var request in requestStream.ReadAllAsync())
                {
                    switch (request.RequestTypeCase)
                    {
                        case ProductUpdateRequest.RequestTypeOneofCase.Subscribe:
                            subscriptions.UnionWith(request.Subscribe.ProductIds);
                            categorySubscriptions.UnionWith(request.Subscribe.CategoryIds);

                            await responseStream.WriteAsync(new ProductUpdateResponse
                            {
                                Error = new ErrorResponse
                                {
                                    Code = "SUBSCRIPTION_CONFIRMED",
                                    Message = $"Subscribed to {request.Subscribe.ProductIds.Count} products and {request.Subscribe.CategoryIds.Count} categories"
                                }
                            });
                            break;

                        case ProductUpdateRequest.RequestTypeOneofCase.Update:
                            try
                            {
                                var updateRequest = _mapper.Map<UpdateProductRequest>(request.Update);
                                var updatedProduct = await _productService.UpdateProductAsync(request.Update.Id, updateRequest);

                                // Broadcast update to SignalR clients
                                await _hubContext.Clients.All.SendAsync("ProductUpdated", updatedProduct);

                                await responseStream.WriteAsync(new ProductUpdateResponse
                                {
                                    ProductUpdated = _mapper.Map<Product>(updatedProduct)
                                });
                            }
                            catch (Exception ex)
                            {
                                await responseStream.WriteAsync(new ProductUpdateResponse
                                {
                                    Error = new ErrorResponse
                                    {
                                        Code = "UPDATE_FAILED",
                                        Message = ex.Message
                                    }
                                });
                            }
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing subscription requests");
            }
        });

        // Task to send periodic updates for subscribed products
        var updateTask = Task.Run(async () =>
        {
            while (!context.CancellationToken.IsCancellationRequested)
            {
                try
                {
                    // Get updates for subscribed products
                    if (subscriptions.Any())
                    {
                        var recentUpdates = await _productService.GetRecentUpdatesAsync(
                            subscriptions.ToList(), DateTime.UtcNow.AddMinutes(-1));

                        foreach (var product in recentUpdates)
                        {
                            await responseStream.WriteAsync(new ProductUpdateResponse
                            {
                                ProductUpdated = _mapper.Map<Product>(product)
                            });
                        }
                    }

                    await Task.Delay(30000, context.CancellationToken); // Check every 30 seconds
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error sending periodic updates");
                }
            }
        });

        await Task.WhenAny(subscriptionTask, updateTask);
    }

    // Standard CRUD operations
    public override async Task<Product> CreateProduct(
        CreateProductRequest request,
        ServerCallContext context)
    {
        try
        {
            // Get user info from metadata
            var userId = GetUserIdFromContext(context);

            var createRequest = _mapper.Map<CreateProductRequest>(request);
            var product = await _productService.CreateProductAsync(createRequest);

            _logger.LogInformation("Product created via gRPC: {ProductId} by user {UserId}",
                product.Id, userId);

            return _mapper.Map<Product>(product);
        }
        catch (ValidationException ex)
        {
            var status = new Status(StatusCode.InvalidArgument, "Validation failed");
            var metadata = new Metadata();

            foreach (var error in ex.Errors)
            {
                metadata.Add("validation-error", error.ErrorMessage);
            }

            throw new RpcException(status, metadata);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating product via gRPC");
            throw new RpcException(new Status(StatusCode.Internal, "Internal server error"));
        }
    }

    public override async Task<SearchProductsResponse> SearchProducts(
        SearchProductsRequest request,
        ServerCallContext context)
    {
        try
        {
            var searchResults = await _productService.SearchProductsAsync(
                request.Query,
                1,
                request.PageSize);

            var response = new SearchProductsResponse
            {
                TotalCount = searchResults.TotalCount,
                NextPageToken = searchResults.HasNextPage
                    ? EncodePageToken(searchResults.CurrentPage + 1)
                    : ""
            };

            response.Products.AddRange(
                searchResults.Items.Select(p => _mapper.Map<Product>(p)));

            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching products via gRPC");
            throw new RpcException(new Status(StatusCode.Internal, "Search failed"));
        }
    }

    // Helper methods
    private string GetUserIdFromContext(ServerCallContext context)
    {
        var authHeader = context.RequestHeaders.FirstOrDefault(h => h.Key == "authorization");
        if (authHeader != null && authHeader.Value.StartsWith("Bearer "))
        {
            var token = authHeader.Value.Substring("Bearer ".Length);
            // Validate JWT and extract user ID
            // Implementation depends on your JWT validation logic
            return "1"; // Placeholder
        }

        throw new RpcException(new Status(StatusCode.Unauthenticated, "Authentication required"));
    }

    private ProductFilter ParseFilterExpression(string filter, ProductFilter baseFilter)
    {
        // Simple filter parsing - in production, use a proper expression parser
        if (filter.Contains("category_id="))
        {
            var categoryId = int.Parse(filter.Split("category_id=")[1].Split(' ')[0]);
            baseFilter.CategoryId = categoryId;
        }

        return baseFilter;
    }

    private string EncodePageToken(int page)
    {
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(page.ToString()));
    }

    private string DecodePageToken(string token)
    {
        return Encoding.UTF8.GetString(Convert.FromBase64String(token));
    }
}

// gRPC Client Example
public class ProductGrpcClient
{
    private readonly ProductService.ProductServiceClient _client;
    private readonly ILogger<ProductGrpcClient> _logger;

    public ProductGrpcClient(ProductService.ProductServiceClient client, ILogger<ProductGrpcClient> logger)
    {
        _client = client;
        _logger = logger;
    }

    public async Task<Product> GetProductAsync(int id, string? authToken = null)
    {
        var headers = new Metadata();
        if (!string.IsNullOrEmpty(authToken))
        {
            headers.Add("Authorization", $"Bearer {authToken}");
        }

        var request = new GetProductRequest { Id = id };

        try
        {
            return await _client.GetProductAsync(request, headers);
        }
        catch (RpcException ex) when (ex.StatusCode == StatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<List<Product>> ListAllProductsAsync()
    {
        var products = new List<Product>();
        var request = new ListProductsRequest { PageSize = 50 };

        using var call = _client.ListProducts(request);

        await foreach (var product in call.ResponseStream.ReadAllAsync())
        {
            products.Add(product);
        }

        return products;
    }

    public async Task<BulkCreateProductsResponse> BulkCreateProductsAsync(
        IEnumerable<CreateProductRequest> requests)
    {
        using var call = _client.BulkCreateProducts();

        foreach (var request in requests)
        {
            await call.RequestStream.WriteAsync(request);
        }

        await call.RequestStream.CompleteAsync();

        return await call.ResponseAsync;
    }

    public async Task StreamProductUpdatesAsync(
        IEnumerable<int> productIds,
        Action<ProductUpdateResponse> onUpdate,
        CancellationToken cancellationToken = default)
    {
        using var call = _client.StreamProductUpdates(cancellationToken: cancellationToken);

        // Send subscription request
        await call.RequestStream.WriteAsync(new ProductUpdateRequest
        {
            Subscribe = new SubscribeToUpdatesRequest
            {
                ProductIds = { productIds }
            }
        });

        // Listen for updates
        await foreach (var response in call.ResponseStream.ReadAllAsync(cancellationToken))
        {
            onUpdate(response);
        }
    }
}

// gRPC Interceptors
public class AuthenticationInterceptor : Interceptor
{
    private readonly IJwtService _jwtService;

    public AuthenticationInterceptor(IJwtService jwtService)
    {
        _jwtService = jwtService;
    }

    public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(
        TRequest request,
        ServerCallContext context,
        UnaryServerMethod<TRequest, TResponse> continuation)
    {
        try
        {
            var authHeader = context.RequestHeaders.FirstOrDefault(h => h.Key == "authorization");

            if (authHeader != null && authHeader.Value.StartsWith("Bearer "))
            {
                var token = authHeader.Value.Substring("Bearer ".Length);
                var principal = _jwtService.ValidateToken(token);

                if (principal != null)
                {
                    // Add user context
                    context.UserState["User"] = principal;
                }
            }

            return await continuation(request, context);
        }
        catch (SecurityTokenException)
        {
            throw new RpcException(new Status(StatusCode.Unauthenticated, "Invalid token"));
        }
    }
}

public class LoggingInterceptor : Interceptor
{
    private readonly ILogger<LoggingInterceptor> _logger;

    public LoggingInterceptor(ILogger<LoggingInterceptor> logger)
    {
        _logger = logger;
    }

    public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(
        TRequest request,
        ServerCallContext context,
        UnaryServerMethod<TRequest, TResponse> continuation)
    {
        var stopwatch = Stopwatch.StartNew();

        _logger.LogInformation("gRPC call started: {Method}", context.Method);

        try
        {
            var response = await continuation(request, context);

            _logger.LogInformation("gRPC call completed: {Method} in {ElapsedMs}ms",
                context.Method, stopwatch.ElapsedMilliseconds);

            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "gRPC call failed: {Method} in {ElapsedMs}ms",
                context.Method, stopwatch.ElapsedMilliseconds);
            throw;
        }
    }
}
```

## 6. Advanced Rate Limiting Implementation

### Distributed Rate Limiting with Redis

```csharp
// Rate Limiting Configuration
public class RateLimitOptions
{
    public List<RateLimitRule> Rules { get; set; } = new();
    public string ConnectionString { get; set; }
    public bool EnableIpWhitelist { get; set; }
    public List<string> IpWhitelist { get; set; } = new();
}

public class RateLimitRule
{
    public string Endpoint { get; set; }
    public string HttpMethods { get; set; } = "*";
    public List<RateLimit> Limits { get; set; } = new();
}

public class RateLimit
{
    public string Period { get; set; } // "1m", "1h", "1d"
    public int Limit { get; set; }
    public string QuotaExceededMessage { get; set; }
}

// Distributed Rate Limiter Service
public interface IRateLimiterService
{
    Task<RateLimitResult> CheckRateLimitAsync(string key, RateLimit limit);
    Task<RateLimitResult> CheckRateLimitAsync(string clientId, string endpoint, string method);
    Task ResetRateLimitAsync(string key);
    Task<RateLimitStatus> GetRateLimitStatusAsync(string key, RateLimit limit);
}

public class RedisRateLimiterService : IRateLimiterService
{
    private readonly IDatabase _database;
    private readonly ILogger<RedisRateLimiterService> _logger;
    private readonly RateLimitOptions _options;

    // Lua script for atomic rate limit check and increment
    private const string LuaScript = @"
        local key = KEYS[1]
        local window = tonumber(ARGV[1])
        local limit = tonumber(ARGV[2])
        local current_time = tonumber(ARGV[3])

        local window_start = current_time - window

        -- Remove expired entries
        redis.call('ZREMRANGEBYSCORE', key, 0, window_start)

        -- Count current requests in window
        local current_requests = redis.call('ZCARD', key)

        if current_requests < limit then
            -- Add current request
            redis.call('ZADD', key, current_time, current_time)
            redis.call('EXPIRE', key, window)
            return {current_requests + 1, limit, window}
        else
            return {current_requests, limit, window}
        end
    ";

    public RedisRateLimiterService(
        IConnectionMultiplexer redis,
        IOptions<RateLimitOptions> options,
        ILogger<RedisRateLimiterService> logger)
    {
        _database = redis.GetDatabase();
        _options = options.Value;
        _logger = logger;
    }

    public async Task<RateLimitResult> CheckRateLimitAsync(string key, RateLimit limit)
    {
        try
        {
            var window = ParsePeriodToSeconds(limit.Period);
            var currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

            var result = await _database.ScriptEvaluateAsync(
                LuaScript,
                new RedisKey[] { key },
                new RedisValue[] { window, limit.Limit, currentTime });

            var values = (RedisValue[])result;
            var currentRequests = (int)values[0];
            var maxRequests = (int)values[1];
            var windowSeconds = (int)values[2];

            var isAllowed = currentRequests <= maxRequests;

            if (!isAllowed)
            {
                _logger.LogWarning("Rate limit exceeded for key: {Key}, Current: {Current}, Limit: {Limit}",
                    key, currentRequests, maxRequests);
            }

            return new RateLimitResult
            {
                IsAllowed = isAllowed,
                RequestCount = currentRequests,
                RequestLimit = maxRequests,
                RetryAfter = isAllowed ? TimeSpan.Zero : TimeSpan.FromSeconds(windowSeconds),
                ResetTime = DateTime.UtcNow.AddSeconds(windowSeconds)
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking rate limit for key: {Key}", key);

            // Fail open - allow request if rate limiting fails
            return new RateLimitResult
            {
                IsAllowed = true,
                RequestCount = 0,
                RequestLimit = limit.Limit
            };
        }
    }

    public async Task<RateLimitResult> CheckRateLimitAsync(string clientId, string endpoint, string method)
    {
        var rule = FindMatchingRule(endpoint, method);

        if (rule?.Limits == null || !rule.Limits.Any())
        {
            return new RateLimitResult { IsAllowed = true };
        }

        // Check all limits for the rule
        foreach (var limit in rule.Limits)
        {
            var key = $"rate_limit:{clientId}:{endpoint}:{method}:{limit.Period}";
            var result = await CheckRateLimitAsync(key, limit);

            if (!result.IsAllowed)
            {
                result.QuotaExceededMessage = limit.QuotaExceededMessage
                    ?? $"Rate limit exceeded. Try again after {result.RetryAfter.TotalSeconds} seconds.";
                return result;
            }
        }

        return new RateLimitResult { IsAllowed = true };
    }

    public async Task ResetRateLimitAsync(string key)
    {
        await _database.KeyDeleteAsync(key);
        _logger.LogInformation("Rate limit reset for key: {Key}", key);
    }

    public async Task<RateLimitStatus> GetRateLimitStatusAsync(string key, RateLimit limit)
    {
        var window = ParsePeriodToSeconds(limit.Period);
        var currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        var windowStart = currentTime - window;

        // Remove expired entries and count current requests
        await _database.SortedSetRemoveRangeByScoreAsync(key, 0, windowStart);
        var currentRequests = await _database.SortedSetLengthAsync(key);

        return new RateLimitStatus
        {
            RequestCount = (int)currentRequests,
            RequestLimit = limit.Limit,
            ResetTime = DateTime.UtcNow.AddSeconds(window),
            RemainingRequests = Math.Max(0, limit.Limit - (int)currentRequests)
        };
    }

    private RateLimitRule FindMatchingRule(string endpoint, string method)
    {
        return _options.Rules.FirstOrDefault(rule =>
            (rule.Endpoint == "*" || endpoint.StartsWith(rule.Endpoint, StringComparison.OrdinalIgnoreCase)) &&
            (rule.HttpMethods == "*" || rule.HttpMethods.Contains(method, StringComparison.OrdinalIgnoreCase)));
    }

    private int ParsePeriodToSeconds(string period)
    {
        if (string.IsNullOrEmpty(period))
            return 3600; // Default to 1 hour

        var unit = period.Last();
        var value = int.Parse(period.Substring(0, period.Length - 1));

        return unit switch
        {
            's' => value,
            'm' => value * 60,
            'h' => value * 3600,
            'd' => value * 86400,
            _ => 3600
        };
    }
}

// Rate Limiting Middleware
public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IRateLimiterService _rateLimiter;
    private readonly RateLimitOptions _options;
    private readonly ILogger<RateLimitingMiddleware> _logger;

    public RateLimitingMiddleware(
        RequestDelegate next,
        IRateLimiterService rateLimiter,
        IOptions<RateLimitOptions> options,
        ILogger<RateLimitingMiddleware> logger)
    {
        _next = next;
        _rateLimiter = rateLimiter;
        _options = options.Value;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var clientId = GetClientId(context);
        var endpoint = context.Request.Path.Value;
        var method = context.Request.Method;

        // Check IP whitelist
        if (_options.EnableIpWhitelist && IsWhitelisted(context))
        {
            await _next(context);
            return;
        }

        var result = await _rateLimiter.CheckRateLimitAsync(clientId, endpoint, method);

        // Add rate limit headers
        context.Response.Headers.Add("X-RateLimit-Limit", result.RequestLimit.ToString());
        context.Response.Headers.Add("X-RateLimit-Remaining",
            Math.Max(0, result.RequestLimit - result.RequestCount).ToString());

        if (result.ResetTime.HasValue)
        {
            context.Response.Headers.Add("X-RateLimit-Reset",
                ((DateTimeOffset)result.ResetTime.Value).ToUnixTimeSeconds().ToString());
        }

        if (!result.IsAllowed)
        {
            context.Response.StatusCode = 429; // Too Many Requests
            context.Response.Headers.Add("Retry-After", ((int)result.RetryAfter.TotalSeconds).ToString());

            var errorResponse = new
            {
                error = "rate_limit_exceeded",
                message = result.QuotaExceededMessage ?? "Rate limit exceeded",
                retry_after = (int)result.RetryAfter.TotalSeconds
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
            return;
        }

        await _next(context);
    }

    private string GetClientId(HttpContext context)
    {
        // Try to get user ID from JWT
        var userId = context.User?.FindFirst("user_id")?.Value;
        if (!string.IsNullOrEmpty(userId))
        {
            return $"user:{userId}";
        }

        // Try to get API key
        var apiKey = context.Request.Headers["X-API-Key"].FirstOrDefault();
        if (!string.IsNullOrEmpty(apiKey))
        {
            return $"apikey:{apiKey}";
        }

        // Fall back to IP address
        var ipAddress = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return $"ip:{ipAddress}";
    }

    private bool IsWhitelisted(HttpContext context)
    {
        var ipAddress = context.Connection.RemoteIpAddress?.ToString();
        return !string.IsNullOrEmpty(ipAddress) && _options.IpWhitelist.Contains(ipAddress);
    }
}

// Rate Limit Models
public class RateLimitResult
{
    public bool IsAllowed { get; set; }
    public int RequestCount { get; set; }
    public int RequestLimit { get; set; }
    public TimeSpan RetryAfter { get; set; }
    public DateTime? ResetTime { get; set; }
    public string QuotaExceededMessage { get; set; }
}

public class RateLimitStatus
{
    public int RequestCount { get; set; }
    public int RequestLimit { get; set; }
    public DateTime ResetTime { get; set; }
    public int RemainingRequests { get; set; }
}

// Configuration Extension
public static class RateLimitingExtensions
{
    public static IServiceCollection AddRateLimiting(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<RateLimitOptions>(configuration.GetSection("RateLimiting"));
        services.AddSingleton<IRateLimiterService, RedisRateLimiterService>();

        return services;
    }

    public static IApplicationBuilder UseRateLimiting(this IApplicationBuilder app)
    {
        return app.UseMiddleware<RateLimitingMiddleware>();
    }
}
```

## 7. Azure API Management Policies

### Complete APIM Policy Examples

```xml
<!-- Comprehensive APIM Policy Configuration -->

<!-- Global/Product Level Policy -->
<policies>
    <inbound>
        <!-- CORS Policy -->
        <cors allow-credentials="true">
            <allowed-origins>
                <origin>https://app.ecommerce.com</origin>
                <origin>https://admin.ecommerce.com</origin>
            </allowed-origins>
            <allowed-methods preflight-result-max-age="300">
                <method>GET</method>
                <method>POST</method>
                <method>PUT</method>
                <method>DELETE</method>
                <method>PATCH</method>
            </allowed-methods>
            <allowed-headers>
                <header>Content-Type</header>
                <header>Authorization</header>
                <header>X-API-Key</header>
                <header>X-Requested-With</header>
            </allowed-headers>
        </cors>

        <!-- Rate Limiting by Subscription -->
        <rate-limit calls="1000" renewal-period="3600" />

        <!-- Quota by Subscription -->
        <quota calls="50000" renewal-period="2592000" />

        <!-- IP Filtering -->
        <ip-filter action="allow">
            <address-range from="203.0.113.0" to="203.0.113.255" />
            <address>198.51.100.1</address>
        </ip-filter>

        <!-- Request Size Limit -->
        <set-variable name="maxRequestSize" value="1048576" />
        <choose>
            <when condition="@(context.Request.Headers.GetValueOrDefault("Content-Length","0").AsInteger(0) > context.Variables.GetValueOrDefault<int>("maxRequestSize"))">
                <return-response>
                    <set-status code="413" reason="Request Entity Too Large" />
                    <set-header name="Content-Type" exists-action="override">
                        <value>application/json</value>
                    </set-header>
                    <set-body>@{
                        return JsonConvert.SerializeObject(new {
                            error = "request_too_large",
                            message = "Request size exceeds 1MB limit",
                            max_size = context.Variables.GetValueOrDefault<int>("maxRequestSize")
                        });
                    }</set-body>
                </return-response>
            </when>
        </choose>

        <!-- JWT Validation -->
        <validate-jwt header-name="Authorization" failed-validation-httpcode="401" failed-validation-error-message="Unauthorized. Access token is missing or invalid.">
            <openid-config url="https://login.microsoftonline.com/{tenant-id}/v2.0/.well-known/openid_configuration" />
            <required-claims>
                <claim name="aud" match="all">
                    <value>{audience}</value>
                </claim>
                <claim name="roles" match="any">
                    <value>user</value>
                    <value>admin</value>
                </claim>
            </required-claims>
        </validate-jwt>

        <!-- API Key Authentication (Alternative) -->
        <check-header name="X-API-Key" failed-check-httpcode="401" failed-check-error-message="API key is required" ignore-case="false" />

        <!-- Request Transformation -->
        <set-header name="X-Forwarded-For" exists-action="override">
            <value>@(context.Request.IpAddress)</value>
        </set-header>

        <set-header name="X-Request-Id" exists-action="override">
            <value>@(Guid.NewGuid().ToString())</value>
        </set-header>

        <!-- Log Request -->
        <log-to-eventhub logger-id="request-logger">
            @{
                return JsonConvert.SerializeObject(new {
                    timestamp = DateTime.UtcNow,
                    request_id = context.RequestId,
                    method = context.Request.Method,
                    url = context.Request.Url.ToString(),
                    ip_address = context.Request.IpAddress,
                    user_agent = context.Request.Headers.GetValueOrDefault("User-Agent", ""),
                    subscription_id = context.Subscription?.Id,
                    user_id = context.User?.Id
                });
            }
        </log-to-eventhub>
    </inbound>

    <backend>
        <!-- Load Balancing -->
        <choose>
            <when condition="@(context.Request.Headers.GetValueOrDefault("X-Load-Balance", "") == "primary")">
                <set-backend-service base-url="https://primary-api.ecommerce.com" />
            </when>
            <when condition="@(new Random().Next(1, 101) <= 10)">
                <!-- 10% traffic to canary -->
                <set-backend-service base-url="https://canary-api.ecommerce.com" />
            </when>
            <otherwise>
                <set-backend-service base-url="https://api.ecommerce.com" />
            </otherwise>
        </choose>

        <!-- Circuit Breaker Pattern -->
        <retry condition="@(context.Response.StatusCode >= 500 || context.Response.StatusCode == 429)" count="3" interval="1" max-interval="10" delta="1" first-fast-retry="true">
            <forward-request timeout="30" />
        </retry>
    </backend>

    <outbound>
        <!-- Response Caching -->
        <cache-store duration="3600" vary-by-developer="false" vary-by-developer-groups="false" caching-type="internal">
            <vary-by-header>Accept</vary-by-header>
            <vary-by-header>Accept-Language</vary-by-header>
            <vary-by-query-parameter>page</vary-by-query-parameter>
            <vary-by-query-parameter>pageSize</vary-by-query-parameter>
        </cache-store>

        <!-- Response Transformation -->
        <set-header name="X-Powered-By" exists-action="delete" />
        <set-header name="Server" exists-action="delete" />

        <set-header name="X-Response-Time" exists-action="override">
            <value>@(DateTime.UtcNow.Subtract(context.Timestamp).TotalMilliseconds.ToString())</value>
        </set-header>

        <!-- HSTS Header -->
        <set-header name="Strict-Transport-Security" exists-action="override">
            <value>max-age=31536000; includeSubDomains</value>
        </set-header>

        <!-- Content Security Policy -->
        <set-header name="Content-Security-Policy" exists-action="override">
            <value>default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'</value>
        </set-header>

        <!-- Response Filtering -->
        <choose>
            <when condition="@(context.User.Groups.Select(g => g.Name).Contains("admin"))">
                <!-- Admins get full response -->
            </when>
            <otherwise>
                <!-- Filter sensitive data for regular users -->
                <set-body>@{
                    var response = context.Response.Body.As<JObject>();
                    if (response["internalData"] != null)
                    {
                        response.Remove("internalData");
                    }
                    return response.ToString();
                }</set-body>
            </otherwise>
        </choose>

        <!-- Log Response -->
        <log-to-eventhub logger-id="response-logger">
            @{
                return JsonConvert.SerializeObject(new {
                    timestamp = DateTime.UtcNow,
                    request_id = context.RequestId,
                    status_code = context.Response.StatusCode,
                    response_time = DateTime.UtcNow.Subtract(context.Timestamp).TotalMilliseconds,
                    content_length = context.Response.Headers.GetValueOrDefault("Content-Length", "0"),
                    cache_status = context.Response.Headers.GetValueOrDefault("X-Cache", "MISS")
                });
            }
        </log-to-eventhub>
    </outbound>

    <on-error>
        <!-- Error Handling -->
        <set-variable name="errorDetails" value="@{
            return new {
                timestamp = DateTime.UtcNow,
                request_id = context.RequestId,
                error_message = context.LastError?.Message,
                error_source = context.LastError?.Source,
                status_code = context.Response?.StatusCode
            };
        }" />

        <!-- Log Error -->
        <log-to-eventhub logger-id="error-logger">
            @(JsonConvert.SerializeObject(context.Variables["errorDetails"]))
        </log-to-eventhub>

        <!-- Custom Error Response -->
        <return-response>
            <set-status code="500" reason="Internal Server Error" />
            <set-header name="Content-Type" exists-action="override">
                <value>application/json</value>
            </set-header>
            <set-body>@{
                return JsonConvert.SerializeObject(new {
                    error = "internal_server_error",
                    message = "An unexpected error occurred. Please try again later.",
                    request_id = context.RequestId,
                    timestamp = DateTime.UtcNow
                });
            }</set-body>
        </return-response>
    </on-error>
</policies>
```

## 8. SignalR Real-time API Implementation

### Complete SignalR Hub with Advanced Features

```csharp
// SignalR Hub Implementation
[Authorize]
public class NotificationHub : Hub
{
    private readonly IUserService _userService;
    private readonly INotificationService _notificationService;
    private readonly ILogger<NotificationHub> _logger;
    private readonly IMemoryCache _cache;

    public NotificationHub(
        IUserService userService,
        INotificationService notificationService,
        ILogger<NotificationHub> logger,
        IMemoryCache cache)
    {
        _userService = userService;
        _notificationService = notificationService;
        _logger = logger;
        _cache = cache;
    }

    public override async Task OnConnectedAsync()
    {
        var userId = GetUserId();
        var connectionId = Context.ConnectionId;

        _logger.LogInformation("User {UserId} connected with connection {ConnectionId}", userId, connectionId);

        // Add user to their personal group
        await Groups.AddToGroupAsync(connectionId, $"user_{userId}");

        // Add user to role-based groups
        var user = await _userService.GetByIdAsync(userId);
        var roles = await _userService.GetUserRolesAsync(userId);

        foreach (var role in roles)
        {
            await Groups.AddToGroupAsync(connectionId, $"role_{role}");
        }

        // Add to tenant group if applicable
        if (user.TenantId.HasValue)
        {
            await Groups.AddToGroupAsync(connectionId, $"tenant_{user.TenantId}");
        }

        // Store connection info in cache
        _cache.Set($"connection_{connectionId}", new ConnectionInfo
        {
            UserId = userId,
            ConnectedAt = DateTime.UtcNow,
            UserAgent = Context.GetHttpContext()?.Request.Headers["User-Agent"].ToString(),
            IpAddress = Context.GetHttpContext()?.Connection.RemoteIpAddress?.ToString()
        }, TimeSpan.FromHours(24));

        // Send pending notifications
        await SendPendingNotifications(userId);

        // Notify others about user coming online
        await Clients.Group($"tenant_{user.TenantId}").SendAsync("UserOnline", new
        {
            UserId = userId,
            Username = user.Username,
            ConnectedAt = DateTime.UtcNow
        });

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var userId = GetUserId();
        var connectionId = Context.ConnectionId;

        _logger.LogInformation("User {UserId} disconnected from connection {ConnectionId}", userId, connectionId);

        // Remove from cache
        _cache.Remove($"connection_{connectionId}");

        // Notify others about user going offline
        var user = await _userService.GetByIdAsync(userId);
        if (user?.TenantId != null)
        {
            await Clients.Group($"tenant_{user.TenantId}").SendAsync("UserOffline", new
            {
                UserId = userId,
                Username = user.Username,
                DisconnectedAt = DateTime.UtcNow
            });
        }

        await base.OnDisconnectedAsync(exception);
    }

    // Hub Methods

    /// <summary>
    /// Sends a direct message to a specific user
    /// </summary>
    public async Task SendMessageToUser(int recipientUserId, string message)
    {
        var senderId = GetUserId();

        try
        {
            // Validate permissions
            if (!await CanSendMessageToUser(senderId, recipientUserId))
            {
                await Clients.Caller.SendAsync("Error", new
                {
                    Code = "PERMISSION_DENIED",
                    Message = "You don't have permission to send messages to this user"
                });
                return;
            }

            var messageData = new
            {
                Id = Guid.NewGuid().ToString(),
                SenderId = senderId,
                RecipientId = recipientUserId,
                Message = message,
                Timestamp = DateTime.UtcNow,
                Type = "DirectMessage"
            };

            // Save message to database
            await _notificationService.SaveDirectMessageAsync(messageData);

            // Send to recipient
            await Clients.Group($"user_{recipientUserId}").SendAsync("ReceiveMessage", messageData);

            // Confirm to sender
            await Clients.Caller.SendAsync("MessageSent", messageData);

            _logger.LogInformation("Direct message sent from user {SenderId} to user {RecipientId}",
                senderId, recipientUserId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending message from user {SenderId} to user {RecipientId}",
                senderId, recipientUserId);

            await Clients.Caller.SendAsync("Error", new
            {
                Code = "MESSAGE_FAILED",
                Message = "Failed to send message"
            });
        }
    }

    /// <summary>
    /// Joins a chat room
    /// </summary>
    public async Task JoinRoom(string roomId)
    {
        var userId = GetUserId();

        try
        {
            // Validate room access
            if (!await CanAccessRoom(userId, roomId))
            {
                await Clients.Caller.SendAsync("Error", new
                {
                    Code = "ROOM_ACCESS_DENIED",
                    Message = "You don't have access to this room"
                });
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            // Notify room members
            await Clients.Group(roomId).SendAsync("UserJoinedRoom", new
            {
                UserId = userId,
                RoomId = roomId,
                JoinedAt = DateTime.UtcNow
            });

            // Send room history to user
            var roomHistory = await _notificationService.GetRoomHistoryAsync(roomId, 50);
            await Clients.Caller.SendAsync("RoomHistory", roomHistory);

            _logger.LogInformation("User {UserId} joined room {RoomId}", userId, roomId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error joining room {RoomId} for user {UserId}", roomId, userId);
        }
    }

    /// <summary>
    /// Leaves a chat room
    /// </summary>
    public async Task LeaveRoom(string roomId)
    {
        var userId = GetUserId();

        await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);

        // Notify room members
        await Clients.Group(roomId).SendAsync("UserLeftRoom", new
        {
            UserId = userId,
            RoomId = roomId,
            LeftAt = DateTime.UtcNow
        });

        _logger.LogInformation("User {UserId} left room {RoomId}", userId, roomId);
    }

    /// <summary>
    /// Sends a message to a room
    /// </summary>
    public async Task SendMessageToRoom(string roomId, string message)
    {
        var userId = GetUserId();

        try
        {
            if (!await CanAccessRoom(userId, roomId))
            {
                await Clients.Caller.SendAsync("Error", new
                {
                    Code = "ROOM_ACCESS_DENIED",
                    Message = "You don't have access to this room"
                });
                return;
            }

            var messageData = new
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                RoomId = roomId,
                Message = message,
                Timestamp = DateTime.UtcNow,
                Type = "RoomMessage"
            };

            // Save message
            await _notificationService.SaveRoomMessageAsync(messageData);

            // Broadcast to room
            await Clients.Group(roomId).SendAsync("ReceiveRoomMessage", messageData);

            _logger.LogInformation("Room message sent by user {UserId} to room {RoomId}", userId, roomId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending room message by user {UserId} to room {RoomId}",
                userId, roomId);
        }
    }

    /// <summary>
    /// Updates user's typing status in a room
    /// </summary>
    public async Task UpdateTypingStatus(string roomId, bool isTyping)
    {
        var userId = GetUserId();

        await Clients.OthersInGroup(roomId).SendAsync("UserTyping", new
        {
            UserId = userId,
            RoomId = roomId,
            IsTyping = isTyping,
            Timestamp = DateTime.UtcNow
        });
    }

    /// <summary>
    /// Subscribes to real-time order updates
    /// </summary>
    [Authorize(Roles = "Admin")]
    public async Task SubscribeToOrderUpdates()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "order_updates");

        _logger.LogInformation("User {UserId} subscribed to order updates", GetUserId());
    }

    /// <summary>
    /// Subscribes to product inventory updates
    /// </summary>
    public async Task SubscribeToInventoryUpdates(List<int> productIds)
    {
        var userId = GetUserId();

        foreach (var productId in productIds.Take(100)) // Limit to 100 products
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"inventory_{productId}");
        }

        _logger.LogInformation("User {UserId} subscribed to inventory updates for {Count} products",
            userId, productIds.Count);
    }

    // Helper Methods

    private int GetUserId()
    {
        var userIdClaim = Context.User?.FindFirst("user_id")?.Value;
        return int.Parse(userIdClaim ?? "0");
    }

    private async Task<bool> CanSendMessageToUser(int senderId, int recipientId)
    {
        // Implement business logic for message permissions
        return await _userService.CanUserSendMessageToAsync(senderId, recipientId);
    }

    private async Task<bool> CanAccessRoom(int userId, string roomId)
    {
        // Implement room access validation
        return await _notificationService.CanUserAccessRoomAsync(userId, roomId);
    }

    private async Task SendPendingNotifications(int userId)
    {
        var pendingNotifications = await _notificationService.GetPendingNotificationsAsync(userId);

        foreach (var notification in pendingNotifications)
        {
            await Clients.Caller.SendAsync("ReceiveNotification", notification);
        }

        // Mark notifications as delivered
        await _notificationService.MarkNotificationsAsDeliveredAsync(
            pendingNotifications.Select(n => n.Id).ToList());
    }
}

// SignalR Service for sending notifications from other parts of the application
public interface ISignalRNotificationService
{
    Task SendNotificationToUserAsync(int userId, object notification);
    Task SendNotificationToRoleAsync(string role, object notification);
    Task SendOrderUpdateAsync(object orderUpdate);
    Task SendInventoryUpdateAsync(int productId, object inventoryUpdate);
    Task SendBroadcastMessageAsync(object message);
}

public class SignalRNotificationService : ISignalRNotificationService
{
    private readonly IHubContext<NotificationHub> _hubContext;
    private readonly ILogger<SignalRNotificationService> _logger;

    public SignalRNotificationService(
        IHubContext<NotificationHub> hubContext,
        ILogger<SignalRNotificationService> logger)
    {
        _hubContext = hubContext;
        _logger = logger;
    }

    public async Task SendNotificationToUserAsync(int userId, object notification)
    {
        try
        {
            await _hubContext.Clients.Group($"user_{userId}")
                .SendAsync("ReceiveNotification", notification);

            _logger.LogInformation("Notification sent to user {UserId}", userId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send notification to user {UserId}", userId);
        }
    }

    public async Task SendNotificationToRoleAsync(string role, object notification)
    {
        try
        {
            await _hubContext.Clients.Group($"role_{role}")
                .SendAsync("ReceiveNotification", notification);

            _logger.LogInformation("Notification sent to role {Role}", role);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send notification to role {Role}", role);
        }
    }

    public async Task SendOrderUpdateAsync(object orderUpdate)
    {
        try
        {
            await _hubContext.Clients.Group("order_updates")
                .SendAsync("OrderUpdated", orderUpdate);

            _logger.LogInformation("Order update broadcasted");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send order update");
        }
    }

    public async Task SendInventoryUpdateAsync(int productId, object inventoryUpdate)
    {
        try
        {
            await _hubContext.Clients.Group($"inventory_{productId}")
                .SendAsync("InventoryUpdated", inventoryUpdate);

            _logger.LogInformation("Inventory update sent for product {ProductId}", productId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send inventory update for product {ProductId}", productId);
        }
    }

    public async Task SendBroadcastMessageAsync(object message)
    {
        try
        {
            await _hubContext.Clients.All.SendAsync("BroadcastMessage", message);

            _logger.LogInformation("Broadcast message sent to all clients");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send broadcast message");
        }
    }
}

// SignalR Configuration
public static class SignalRExtensions
{
    public static IServiceCollection AddSignalRServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddSignalR(options =>
        {
            options.EnableDetailedErrors = true;
            options.KeepAliveInterval = TimeSpan.FromSeconds(15);
            options.ClientTimeoutInterval = TimeSpan.FromSeconds(30);
            options.HandshakeTimeout = TimeSpan.FromSeconds(15);
            options.MaximumReceiveMessageSize = 32 * 1024; // 32KB
        })
        .AddAzureSignalR(configuration.GetConnectionString("AzureSignalR"));

        services.AddSingleton<ISignalRNotificationService, SignalRNotificationService>();

        return services;
    }
}

// Connection Info Model
public class ConnectionInfo
{
    public int UserId { get; set; }
    public DateTime ConnectedAt { get; set; }
    public string UserAgent { get; set; }
    public string IpAddress { get; set; }
}
```

## 9. API Monitoring and Health Checks

### Comprehensive Health Check Implementation

```csharp
// Custom Health Checks
public class DatabaseHealthCheck : IHealthCheck
{
    private readonly string _connectionString;

    public DatabaseHealthCheck(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync(cancellationToken);

            using var command = connection.CreateCommand();
            command.CommandText = "SELECT 1";
            command.CommandTimeout = 5;

            var result = await command.ExecuteScalarAsync(cancellationToken);

            return result?.ToString() == "1"
                ? HealthCheckResult.Healthy("Database is responding")
                : HealthCheckResult.Unhealthy("Database query returned unexpected result");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Database connection failed", ex);
        }
    }
}

public class ExternalApiHealthCheck : IHealthCheck
{
    private readonly HttpClient _httpClient;
    private readonly string _endpoint;

    public ExternalApiHealthCheck(HttpClient httpClient, string endpoint)
    {
        _httpClient = httpClient;
        _endpoint = endpoint;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            using var cts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
            cts.CancelAfter(TimeSpan.FromSeconds(10));

            var response = await _httpClient.GetAsync($"{_endpoint}/health", cts.Token);

            return response.IsSuccessStatusCode
                ? HealthCheckResult.Healthy($"External API {_endpoint} is responding")
                : HealthCheckResult.Degraded($"External API {_endpoint} returned {response.StatusCode}");
        }
        catch (TaskCanceledException)
        {
            return HealthCheckResult.Degraded($"External API {_endpoint} timeout");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy($"External API {_endpoint} failed", ex);
        }
    }
}

public class RedisHealthCheck : IHealthCheck
{
    private readonly IConnectionMultiplexer _redis;

    public RedisHealthCheck(IConnectionMultiplexer redis)
    {
        _redis = redis;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var database = _redis.GetDatabase();
            var key = "health_check_" + Guid.NewGuid().ToString();

            await database.StringSetAsync(key, "test", TimeSpan.FromSeconds(10));
            var value = await database.StringGetAsync(key);
            await database.KeyDeleteAsync(key);

            return value == "test"
                ? HealthCheckResult.Healthy("Redis is responding")
                : HealthCheckResult.Unhealthy("Redis test failed");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Redis connection failed", ex);
        }
    }
}

public class DiskSpaceHealthCheck : IHealthCheck
{
    private readonly long _minimumFreeBytesThreshold;

    public DiskSpaceHealthCheck(long minimumFreeBytesThreshold = 1_000_000_000) // 1GB default
    {
        _minimumFreeBytesThreshold = minimumFreeBytesThreshold;
    }

    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var drives = DriveInfo.GetDrives();
            var systemDrive = drives.FirstOrDefault(d => d.Name == Path.GetPathRoot(Environment.SystemDirectory));

            if (systemDrive == null)
            {
                return Task.FromResult(HealthCheckResult.Degraded("Could not determine system drive"));
            }

            var freeBytes = systemDrive.AvailableFreeSpace;
            var totalBytes = systemDrive.TotalSize;
            var usedPercentage = (double)(totalBytes - freeBytes) / totalBytes * 100;

            var data = new Dictionary<string, object>
            {
                ["Drive"] = systemDrive.Name,
                ["FreeBytes"] = freeBytes,
                ["TotalBytes"] = totalBytes,
                ["UsedPercentage"] = Math.Round(usedPercentage, 2)
            };

            if (freeBytes < _minimumFreeBytesThreshold)
            {
                return Task.FromResult(HealthCheckResult.Unhealthy(
                    $"Insufficient disk space. Only {freeBytes / (1024 * 1024 * 1024):F1} GB available",
                    data: data));
            }

            return Task.FromResult(HealthCheckResult.Healthy(
                $"Sufficient disk space available. {freeBytes / (1024 * 1024 * 1024):F1} GB free",
                data: data));
        }
        catch (Exception ex)
        {
            return Task.FromResult(HealthCheckResult.Unhealthy("Disk space check failed", ex));
        }
    }
}

// Health Check Configuration
public static class HealthCheckExtensions
{
    public static IServiceCollection AddCustomHealthChecks(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddHealthChecks()
            // Database health check
            .AddCheck<DatabaseHealthCheck>(
                "database",
                HealthStatus.Unhealthy,
                tags: new[] { "ready", "database" })

            // Redis health check
            .AddCheck<RedisHealthCheck>(
                "redis",
                HealthStatus.Degraded,
                tags: new[] { "ready", "cache" })

            // External API health checks
            .AddTypeActivatedCheck<ExternalApiHealthCheck>(
                "payment-api",
                HealthStatus.Degraded,
                tags: new[] { "external", "payment" },
                args: new object[] { configuration["ExternalApis:PaymentService"] })

            .AddTypeActivatedCheck<ExternalApiHealthCheck>(
                "notification-api",
                HealthStatus.Degraded,
                tags: new[] { "external", "notification" },
                args: new object[] { configuration["ExternalApis:NotificationService"] })

            // System health checks
            .AddCheck<DiskSpaceHealthCheck>(
                "disk-space",
                HealthStatus.Degraded,
                tags: new[] { "system" })

            // Memory usage check
            .AddCheck("memory", () =>
            {
                var allocated = GC.GetTotalMemory(false);
                var data = new Dictionary<string, object>
                {
                    ["AllocatedBytes"] = allocated,
                    ["AllocatedMB"] = allocated / (1024 * 1024)
                };

                // Warning if over 500MB, unhealthy if over 1GB
                if (allocated > 1_000_000_000)
                {
                    return HealthCheckResult.Unhealthy("High memory usage", data: data);
                }

                if (allocated > 500_000_000)
                {
                    return HealthCheckResult.Degraded("Moderate memory usage", data: data);
                }

                return HealthCheckResult.Healthy("Normal memory usage", data: data);
            }, tags: new[] { "system" });

        return services;
    }
}

// Custom Health Check Response Writer
public static class HealthCheckResponseWriter
{
    public static Task WriteDetailedResponse(HttpContext context, HealthReport healthReport)
    {
        context.Response.ContentType = "application/json; charset=utf-8";

        var options = new JsonWriterOptions { Indented = true };
        using var memoryStream = new MemoryStream();
        using (var jsonWriter = new Utf8JsonWriter(memoryStream, options))
        {
            jsonWriter.WriteStartObject();
            jsonWriter.WriteString("status", healthReport.Status.ToString());
            jsonWriter.WriteNumber("totalDurationMs", healthReport.TotalDuration.TotalMilliseconds);
            jsonWriter.WriteString("timestamp", DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"));

            jsonWriter.WriteStartObject("checks");

            foreach (var (key, value) in healthReport.Entries)
            {
                jsonWriter.WriteStartObject(key);
                jsonWriter.WriteString("status", value.Status.ToString());
                jsonWriter.WriteString("description", value.Description);
                jsonWriter.WriteNumber("durationMs", value.Duration.TotalMilliseconds);

                if (value.Exception != null)
                {
                    jsonWriter.WriteString("exception", value.Exception.Message);
                }

                if (value.Data != null && value.Data.Count > 0)
                {
                    jsonWriter.WriteStartObject("data");
                    foreach (var (dataKey, dataValue) in value.Data)
                    {
                        jsonWriter.WritePropertyName(dataKey);
                        JsonSerializer.Serialize(jsonWriter, dataValue, dataValue?.GetType() ?? typeof(object));
                    }
                    jsonWriter.WriteEndObject();
                }

                jsonWriter.WriteEndObject();
            }

            jsonWriter.WriteEndObject();
            jsonWriter.WriteEndObject();
        }

        return context.Response.WriteAsync(Encoding.UTF8.GetString(memoryStream.ToArray()));
    }
}

// Health Check Middleware Configuration
public static class HealthCheckMiddlewareExtensions
{
    public static IApplicationBuilder UseCustomHealthChecks(this IApplicationBuilder app)
    {
        // Detailed health check endpoint for internal monitoring
        app.UseHealthChecks("/health/detailed", new HealthCheckOptions
        {
            ResponseWriter = HealthCheckResponseWriter.WriteDetailedResponse,
            AllowCachingResponses = false
        });

        // Ready check - only essential services
        app.UseHealthChecks("/health/ready", new HealthCheckOptions
        {
            Predicate = check => check.Tags.Contains("ready"),
            ResponseWriter = HealthCheckResponseWriter.WriteDetailedResponse
        });

        // Live check - basic application liveness
        app.UseHealthChecks("/health/live", new HealthCheckOptions
        {
            Predicate = _ => false, // No checks, just returns if app is running
            ResponseWriter = (context, _) =>
            {
                context.Response.ContentType = "application/json";
                return context.Response.WriteAsync(JsonSerializer.Serialize(new
                {
                    status = "Healthy",
                    timestamp = DateTime.UtcNow,
                    uptime = Environment.TickCount64 / 1000.0 // seconds
                }));
            }
        });

        // Simple health check for load balancers
        app.UseHealthChecks("/health", new HealthCheckOptions
        {
            ResponseWriter = (context, healthReport) =>
            {
                context.Response.ContentType = "application/json";
                var response = new
                {
                    status = healthReport.Status.ToString(),
                    timestamp = DateTime.UtcNow
                };
                return context.Response.WriteAsync(JsonSerializer.Serialize(response));
            }
        });

        return app;
    }
}
```

## 10. API Versioning Implementation

### Complete API Versioning Strategy

```csharp
// API Version Configuration
public static class ApiVersioningExtensions
{
    public static IServiceCollection AddApiVersioningConfiguration(this IServiceCollection services)
    {
        services.AddApiVersioning(opt =>
        {
            opt.DefaultApiVersion = new ApiVersion(1, 0);
            opt.AssumeDefaultVersionWhenUnspecified = true;

            // Multiple versioning strategies
            opt.ApiVersionReader = ApiVersionReader.Combine(
                new UrlSegmentApiVersionReader(),           // /api/v1/products
                new HeaderApiVersionReader("X-Version"),     // X-Version: 1.0
                new HeaderApiVersionReader("Accept-Version"), // Accept-Version: 1.0
                new QueryStringApiVersionReader("version"),   // ?version=1.0
                new MediaTypeApiVersionReader("ver")         // Accept: application/json;ver=1.0
            );

            opt.ApiVersionSelector = new CurrentImplementationApiVersionSelector(opt);
        });

        services.AddVersionedApiExplorer(setup =>
        {
            setup.GroupNameFormat = "'v'VVV";
            setup.SubstituteApiVersionInUrl = true;
            setup.AssumeDefaultVersionWhenUnspecified = true;
        });

        return services;
    }

    public static IServiceCollection AddSwaggerVersioning(this IServiceCollection services)
    {
        services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
        services.AddSwaggerGen(options =>
        {
            options.OperationFilter<SwaggerDefaultValues>();
            options.IncludeXmlComments(GetXmlCommentsPath());
        });

        return services;
    }

    private static string GetXmlCommentsPath()
    {
        var basePath = PlatformServices.Default.Application.ApplicationBasePath;
        var fileName = typeof(Startup).GetTypeInfo().Assembly.GetName().Name + ".xml";
        return Path.Combine(basePath, fileName);
    }
}

// Swagger Configuration for Multiple Versions
public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
{
    private readonly IApiVersionDescriptionProvider _provider;

    public ConfigureSwaggerOptions(IApiVersionDescriptionProvider provider)
    {
        _provider = provider;
    }

    public void Configure(SwaggerGenOptions options)
    {
        foreach (var description in _provider.ApiVersionDescriptions)
        {
            options.SwaggerDoc(description.GroupName, CreateVersionInfo(description));
        }
    }

    private OpenApiInfo CreateVersionInfo(ApiVersionDescription desc)
    {
        var info = new OpenApiInfo()
        {
            Title = "E-commerce API",
            Version = desc.ApiVersion.ToString()
        };

        if (desc.IsDeprecated)
        {
            info.Description += " This API version has been deprecated. Please use a newer version.";
        }

        return info;
    }
}

// Version-specific Controllers
[ApiController]
[ApiVersion("1.0")]
[ApiVersion("1.1")]
[Route("api/v{version:apiVersion}/[controller]")]
public class ProductsV1Controller : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IMapper _mapper;

    public ProductsV1Controller(IProductService productService, IMapper mapper)
    {
        _productService = productService;
        _mapper = mapper;
    }

    /// <summary>
    /// Gets products (v1.0)
    /// </summary>
    [HttpGet]
    [MapToApiVersion("1.0")]
    [ProducesResponseType(typeof(IEnumerable<ProductV1Dto>), 200)]
    public async Task<IActionResult> GetProductsV1_0()
    {
        var products = await _productService.GetProductsAsync(new ProductFilter());
        var productDtos = _mapper.Map<IEnumerable<ProductV1Dto>>(products.Items);

        return Ok(productDtos);
    }

    /// <summary>
    /// Gets products with enhanced filtering (v1.1)
    /// </summary>
    [HttpGet]
    [MapToApiVersion("1.1")]
    [ProducesResponseType(typeof(PagedResult<ProductV1_1Dto>), 200)]
    public async Task<IActionResult> GetProductsV1_1([FromQuery] ProductFilterV1_1 filter)
    {
        var products = await _productService.GetProductsAsync(_mapper.Map<ProductFilter>(filter));
        var result = new PagedResult<ProductV1_1Dto>
        {
            Items = _mapper.Map<IEnumerable<ProductV1_1Dto>>(products.Items),
            TotalCount = products.TotalCount,
            CurrentPage = products.CurrentPage,
            PageSize = products.PageSize
        };

        return Ok(result);
    }

    /// <summary>
    /// Creates a product (all v1.x versions)
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ProductV1Dto), 201)]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductV1Request request)
    {
        var createRequest = _mapper.Map<CreateProductRequest>(request);
        var product = await _productService.CreateProductAsync(createRequest);
        var productDto = _mapper.Map<ProductV1Dto>(product);

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, productDto);
    }
}

[ApiController]
[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class ProductsV2Controller : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IMapper _mapper;

    public ProductsV2Controller(IProductService productService, IMapper mapper)
    {
        _productService = productService;
        _mapper = mapper;
    }

    /// <summary>
    /// Gets products with advanced features (v2.0)
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(ProductCollectionV2), 200)]
    public async Task<IActionResult> GetProducts([FromQuery] ProductQueryV2 query)
    {
        var filter = _mapper.Map<ProductFilter>(query);
        var products = await _productService.GetProductsAsync(filter);

        var result = new ProductCollectionV2
        {
            Data = _mapper.Map<IEnumerable<ProductV2Dto>>(products.Items),
            Meta = new CollectionMetadata
            {
                TotalCount = products.TotalCount,
                Page = products.CurrentPage,
                PageSize = products.PageSize,
                TotalPages = products.TotalPages
            },
            Links = new CollectionLinks
            {
                Self = Url.Action(nameof(GetProducts), new { query }),
                First = products.CurrentPage > 1 ? Url.Action(nameof(GetProducts), new { query, page = 1 }) : null,
                Previous = products.HasPreviousPage ? Url.Action(nameof(GetProducts), new { query, page = products.CurrentPage - 1 }) : null,
                Next = products.HasNextPage ? Url.Action(nameof(GetProducts), new { query, page = products.CurrentPage + 1 }) : null,
                Last = products.TotalPages > products.CurrentPage ? Url.Action(nameof(GetProducts), new { query, page = products.TotalPages }) : null
            }
        };

        return Ok(result);
    }

    /// <summary>
    /// Creates a product with advanced validation (v2.0)
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ProductV2Response), 201)]
    [ProducesResponseType(typeof(ValidationErrorResponse), 400)]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductV2Request request)
    {
        try
        {
            var createRequest = _mapper.Map<CreateProductRequest>(request);
            var product = await _productService.CreateProductAsync(createRequest);

            var response = new ProductV2Response
            {
                Data = _mapper.Map<ProductV2Dto>(product),
                Meta = new ResponseMetadata
                {
                    RequestId = HttpContext.TraceIdentifier,
                    Timestamp = DateTime.UtcNow,
                    Version = "2.0"
                }
            };

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, response);
        }
        catch (ValidationException ex)
        {
            var errorResponse = new ValidationErrorResponse
            {
                Errors = ex.Errors.Select(e => new ValidationError
                {
                    Field = e.PropertyName,
                    Message = e.ErrorMessage,
                    Code = e.ErrorCode
                }).ToList(),
                Meta = new ResponseMetadata
                {
                    RequestId = HttpContext.TraceIdentifier,
                    Timestamp = DateTime.UtcNow,
                    Version = "2.0"
                }
            };

            return BadRequest(errorResponse);
        }
    }
}

// Version-specific DTOs
public class ProductV1Dto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public bool IsActive { get; set; }
}

public class ProductV1_1Dto : ProductV1Dto
{
    public string CategoryName { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<string> Tags { get; set; }
}

public class ProductV2Dto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public PriceInfo Price { get; set; }
    public string Description { get; set; }
    public CategoryInfo Category { get; set; }
    public List<ImageInfo> Images { get; set; }
    public InventoryInfo Inventory { get; set; }
    public ProductStatus Status { get; set; }
    public AuditInfo Audit { get; set; }
    public SeoInfo Seo { get; set; }
}

public class PriceInfo
{
    public decimal Amount { get; set; }
    public string Currency { get; set; }
    public decimal? DiscountAmount { get; set; }
    public decimal? DiscountPercentage { get; set; }
}

// Version Migration Middleware
public class ApiVersionMigrationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ApiVersionMigrationMiddleware> _logger;

    public ApiVersionMigrationMiddleware(RequestDelegate next, ILogger<ApiVersionMigrationMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Check for deprecated API versions
        var apiVersion = context.GetRequestedApiVersion();

        if (apiVersion != null && IsDeprecatedVersion(apiVersion))
        {
            // Add deprecation headers
            context.Response.Headers.Add("X-API-Deprecated", "true");
            context.Response.Headers.Add("X-API-Sunset-Date", GetSunsetDate(apiVersion));
            context.Response.Headers.Add("X-API-Migration-Guide", GetMigrationGuideUrl(apiVersion));

            // Log deprecated API usage
            _logger.LogWarning("Deprecated API version {Version} used by {UserAgent} from {IpAddress}",
                apiVersion.ToString(),
                context.Request.Headers["User-Agent"].ToString(),
                context.Connection.RemoteIpAddress?.ToString());
        }

        await _next(context);
    }

    private bool IsDeprecatedVersion(ApiVersion version)
    {
        // Mark versions older than 6 months as deprecated
        var deprecationMap = new Dictionary<string, DateTime>
        {
            ["1.0"] = DateTime.UtcNow.AddMonths(-6),
            ["1.1"] = DateTime.UtcNow.AddMonths(-3)
        };

        return deprecationMap.ContainsKey(version.ToString()) &&
               DateTime.UtcNow > deprecationMap[version.ToString()];
    }

    private string GetSunsetDate(ApiVersion version)
    {
        var sunsetDates = new Dictionary<string, DateTime>
        {
            ["1.0"] = DateTime.UtcNow.AddMonths(3),
            ["1.1"] = DateTime.UtcNow.AddMonths(6)
        };

        return sunsetDates.TryGetValue(version.ToString(), out var date)
            ? date.ToString("yyyy-MM-dd")
            : DateTime.UtcNow.AddYears(1).ToString("yyyy-MM-dd");
    }

    private string GetMigrationGuideUrl(ApiVersion version)
    {
        return $"https://docs.ecommerce.com/migration/v{version}-to-v2";
    }
}
```

## 11. File Upload and Download APIs

### Secure File Handling Implementation

```csharp
// File Upload Configuration
public class FileUploadOptions
{
    public long MaxFileSize { get; set; } = 10 * 1024 * 1024; // 10MB
    public List<string> AllowedExtensions { get; set; } = new() { ".jpg", ".jpeg", ".png", ".pdf", ".docx" };
    public List<string> AllowedMimeTypes { get; set; } = new() { "image/jpeg", "image/png", "application/pdf" };
    public string UploadPath { get; set; } = "uploads";
    public bool ScanForVirus { get; set; } = true;
    public bool GenerateThumbnails { get; set; } = true;
}

// File Upload Controller
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FilesController : ControllerBase
{
    private readonly IFileService _fileService;
    private readonly IVirusScanService _virusScanService;
    private readonly IImageProcessingService _imageService;
    private readonly FileUploadOptions _options;
    private readonly ILogger<FilesController> _logger;

    public FilesController(
        IFileService fileService,
        IVirusScanService virusScanService,
        IImageProcessingService imageService,
        IOptions<FileUploadOptions> options,
        ILogger<FilesController> logger)
    {
        _fileService = fileService;
        _virusScanService = virusScanService;
        _imageService = imageService;
        _options = options.Value;
        _logger = logger;
    }

    /// <summary>
    /// Uploads a single file with validation and processing
    /// </summary>
    [HttpPost("upload")]
    [DisableRequestSizeLimit]
    [ProducesResponseType(typeof(FileUploadResponse), 200)]
    [ProducesResponseType(typeof(ApiErrorResponse), 400)]
    public async Task<IActionResult> UploadFile(IFormFile file, [FromForm] FileUploadRequest request)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new ApiErrorResponse
            {
                Message = "No file provided",
                ErrorCode = "NO_FILE"
            });
        }

        try
        {
            // Validate file
            var validationResult = await ValidateFileAsync(file);
            if (!validationResult.IsValid)
            {
                return BadRequest(new ApiErrorResponse
                {
                    Message = validationResult.ErrorMessage,
                    ErrorCode = "FILE_VALIDATION_FAILED"
                });
            }

            var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");
            var uploadId = Guid.NewGuid().ToString();

            // Create file metadata
            var fileMetadata = new FileMetadata
            {
                Id = uploadId,
                OriginalFileName = file.FileName,
                ContentType = file.ContentType,
                Size = file.Length,
                UploadedBy = userId,
                UploadedAt = DateTime.UtcNow,
                Category = request.Category ?? "general",
                Description = request.Description,
                Tags = request.Tags ?? new List<string>()
            };

            // Save file to storage
            var filePath = await _fileService.SaveFileAsync(file, uploadId);
            fileMetadata.FilePath = filePath;

            // Virus scan
            if (_options.ScanForVirus)
            {
                var scanResult = await _virusScanService.ScanFileAsync(filePath);
                if (!scanResult.IsClean)
                {
                    await _fileService.DeleteFileAsync(filePath);

                    _logger.LogWarning("Virus detected in uploaded file: {FileName} by user {UserId}",
                        file.FileName, userId);

                    return BadRequest(new ApiErrorResponse
                    {
                        Message = "File contains malicious content",
                        ErrorCode = "VIRUS_DETECTED"
                    });
                }
            }

            // Generate thumbnails for images
            if (_options.GenerateThumbnails && IsImageFile(file.ContentType))
            {
                var thumbnails = await _imageService.GenerateThumbnailsAsync(filePath, new[]
                {
                    new ThumbnailSize { Width = 150, Height = 150, Name = "thumbnail" },
                    new ThumbnailSize { Width = 300, Height = 300, Name = "medium" },
                    new ThumbnailSize { Width = 800, Height = 600, Name = "large" }
                });

                fileMetadata.Thumbnails = thumbnails.ToDictionary(t => t.Name, t => t.Path);
            }

            // Save metadata to database
            await _fileService.SaveFileMetadataAsync(fileMetadata);

            _logger.LogInformation("File uploaded successfully: {FileId} by user {UserId}",
                uploadId, userId);

            var response = new FileUploadResponse
            {
                FileId = uploadId,
                FileName = file.FileName,
                Size = file.Length,
                ContentType = file.ContentType,
                DownloadUrl = Url.Action(nameof(Download), new { id = uploadId }),
                ThumbnailUrls = fileMetadata.Thumbnails?.ToDictionary(
                    kvp => kvp.Key,
                    kvp => Url.Action(nameof(GetThumbnail), new { id = uploadId, size = kvp.Key }))
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file: {FileName} by user {UserId}",
                file.FileName, User.FindFirst("user_id")?.Value);

            return StatusCode(500, new ApiErrorResponse
            {
                Message = "File upload failed",
                ErrorCode = "UPLOAD_ERROR",
                TraceId = HttpContext.TraceIdentifier
            });
        }
    }

    /// <summary>
    /// Uploads multiple files with batch processing
    /// </summary>
    [HttpPost("upload/batch")]
    [DisableRequestSizeLimit]
    [ProducesResponseType(typeof(BatchUploadResponse), 200)]
    public async Task<IActionResult> UploadFiles(List<IFormFile> files, [FromForm] FileUploadRequest request)
    {
        if (files == null || !files.Any())
        {
            return BadRequest(new ApiErrorResponse
            {
                Message = "No files provided",
                ErrorCode = "NO_FILES"
            });
        }

        var results = new List<FileUploadResult>();
        var successCount = 0;

        foreach (var file in files.Take(10)) // Limit to 10 files
        {
            try
            {
                var uploadResult = await UploadSingleFileAsync(file, request);
                results.Add(uploadResult);

                if (uploadResult.Success)
                {
                    successCount++;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading file in batch: {FileName}", file.FileName);

                results.Add(new FileUploadResult
                {
                    FileName = file.FileName,
                    Success = false,
                    Error = "Upload failed"
                });
            }
        }

        return Ok(new BatchUploadResponse
        {
            TotalFiles = files.Count,
            SuccessfulUploads = successCount,
            FailedUploads = files.Count - successCount,
            Results = results
        });
    }

    /// <summary>
    /// Downloads a file with access control
    /// </summary>
    [HttpGet("{id}/download")]
    [ProducesResponseType(typeof(FileResult), 200)]
    [ProducesResponseType(typeof(ApiErrorResponse), 404)]
    public async Task<IActionResult> Download(string id, [FromQuery] bool inline = false)
    {
        try
        {
            var fileMetadata = await _fileService.GetFileMetadataAsync(id);

            if (fileMetadata == null)
            {
                return NotFound(new ApiErrorResponse
                {
                    Message = "File not found",
                    ErrorCode = "FILE_NOT_FOUND"
                });
            }

            var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");

            // Check access permissions
            if (!await CanAccessFile(userId, fileMetadata))
            {
                return Forbid();
            }

            var fileStream = await _fileService.GetFileStreamAsync(fileMetadata.FilePath);

            if (fileStream == null)
            {
                return NotFound(new ApiErrorResponse
                {
                    Message = "File content not found",
                    ErrorCode = "FILE_CONTENT_NOT_FOUND"
                });
            }

            // Log download
            await _fileService.LogFileAccessAsync(id, userId, "download");

            var contentDisposition = inline ? "inline" : "attachment";

            return File(fileStream, fileMetadata.ContentType, fileMetadata.OriginalFileName)
            {
                FileDownloadName = fileMetadata.OriginalFileName
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error downloading file: {FileId} by user {UserId}",
                id, User.FindFirst("user_id")?.Value);

            return StatusCode(500, new ApiErrorResponse
            {
                Message = "Download failed",
                ErrorCode = "DOWNLOAD_ERROR"
            });
        }
    }

    /// <summary>
    /// Gets file thumbnail
    /// </summary>
    [HttpGet("{id}/thumbnail/{size}")]
    [ProducesResponseType(typeof(FileResult), 200)]
    public async Task<IActionResult> GetThumbnail(string id, string size)
    {
        try
        {
            var fileMetadata = await _fileService.GetFileMetadataAsync(id);

            if (fileMetadata?.Thumbnails == null || !fileMetadata.Thumbnails.ContainsKey(size))
            {
                return NotFound();
            }

            var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");

            if (!await CanAccessFile(userId, fileMetadata))
            {
                return Forbid();
            }

            var thumbnailPath = fileMetadata.Thumbnails[size];
            var thumbnailStream = await _fileService.GetFileStreamAsync(thumbnailPath);

            return File(thumbnailStream, "image/jpeg");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting thumbnail: {FileId}/{Size}", id, size);
            return StatusCode(500);
        }
    }

    /// <summary>
    /// Deletes a file
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiErrorResponse), 404)]
    public async Task<IActionResult> DeleteFile(string id)
    {
        try
        {
            var fileMetadata = await _fileService.GetFileMetadataAsync(id);

            if (fileMetadata == null)
            {
                return NotFound();
            }

            var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");

            // Only owner or admin can delete
            if (fileMetadata.UploadedBy != userId && !User.IsInRole("Admin"))
            {
                return Forbid();
            }

            await _fileService.DeleteFileAsync(fileMetadata.FilePath);

            // Delete thumbnails
            if (fileMetadata.Thumbnails != null)
            {
                foreach (var thumbnail in fileMetadata.Thumbnails.Values)
                {
                    await _fileService.DeleteFileAsync(thumbnail);
                }
            }

            await _fileService.DeleteFileMetadataAsync(id);

            _logger.LogInformation("File deleted: {FileId} by user {UserId}", id, userId);

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file: {FileId}", id);
            return StatusCode(500);
        }
    }

    // Helper Methods

    private async Task<FileValidationResult> ValidateFileAsync(IFormFile file)
    {
        // Size validation
        if (file.Length > _options.MaxFileSize)
        {
            return new FileValidationResult
            {
                IsValid = false,
                ErrorMessage = $"File size exceeds maximum allowed size of {_options.MaxFileSize / (1024 * 1024)} MB"
            };
        }

        // Extension validation
        var extension = Path.GetExtension(file.FileName)?.ToLowerInvariant();
        if (string.IsNullOrEmpty(extension) || !_options.AllowedExtensions.Contains(extension))
        {
            return new FileValidationResult
            {
                IsValid = false,
                ErrorMessage = $"File type not allowed. Allowed types: {string.Join(", ", _options.AllowedExtensions)}"
            };
        }

        // MIME type validation
        if (!_options.AllowedMimeTypes.Contains(file.ContentType))
        {
            return new FileValidationResult
            {
                IsValid = false,
                ErrorMessage = "Invalid file content type"
            };
        }

        // Content validation (check file signature)
        var isValidContent = await ValidateFileContentAsync(file);
        if (!isValidContent)
        {
            return new FileValidationResult
            {
                IsValid = false,
                ErrorMessage = "File content does not match file extension"
            };
        }

        return new FileValidationResult { IsValid = true };
    }

    private async Task<bool> ValidateFileContentAsync(IFormFile file)
    {
        // Read file signature (magic numbers)
        using var stream = file.OpenReadStream();
        var buffer = new byte[512];
        await stream.ReadAsync(buffer, 0, buffer.Length);

        var fileSignature = BitConverter.ToString(buffer.Take(8).ToArray()).Replace("-", "");

        // Define file signatures
        var signatures = new Dictionary<string, List<string>>
        {
            [".jpg"] = new() { "FFD8FFE0", "FFD8FFE1", "FFD8FFDB" },
            [".jpeg"] = new() { "FFD8FFE0", "FFD8FFE1", "FFD8FFDB" },
            [".png"] = new() { "89504E47" },
            [".pdf"] = new() { "25504446" },
            [".docx"] = new() { "504B0304" } // ZIP-based formats
        };

        var extension = Path.GetExtension(file.FileName)?.ToLowerInvariant();

        if (signatures.ContainsKey(extension))
        {
            return signatures[extension].Any(sig => fileSignature.StartsWith(sig));
        }

        return true; // Allow if no signature check defined
    }

    private bool IsImageFile(string contentType)
    {
        return contentType.StartsWith("image/");
    }

    private async Task<bool> CanAccessFile(int userId, FileMetadata fileMetadata)
    {
        // Owner can always access
        if (fileMetadata.UploadedBy == userId)
            return true;

        // Admin can access all files
        if (User.IsInRole("Admin"))
            return true;

        // Check if file is shared or public
        return await _fileService.IsFileAccessibleToUserAsync(fileMetadata.Id, userId);
    }

    private async Task<FileUploadResult> UploadSingleFileAsync(IFormFile file, FileUploadRequest request)
    {
        // Implementation similar to UploadFile but returns FileUploadResult
        // This is a simplified version for the batch upload

        var validationResult = await ValidateFileAsync(file);
        if (!validationResult.IsValid)
        {
            return new FileUploadResult
            {
                FileName = file.FileName,
                Success = false,
                Error = validationResult.ErrorMessage
            };
        }

        var uploadId = Guid.NewGuid().ToString();
        var filePath = await _fileService.SaveFileAsync(file, uploadId);

        var fileMetadata = new FileMetadata
        {
            Id = uploadId,
            OriginalFileName = file.FileName,
            ContentType = file.ContentType,
            Size = file.Length,
            UploadedBy = int.Parse(User.FindFirst("user_id")?.Value ?? "0"),
            UploadedAt = DateTime.UtcNow,
            FilePath = filePath
        };

        await _fileService.SaveFileMetadataAsync(fileMetadata);

        return new FileUploadResult
        {
            FileId = uploadId,
            FileName = file.FileName,
            Size = file.Length,
            Success = true,
            DownloadUrl = Url.Action(nameof(Download), new { id = uploadId })
        };
    }
}

// File Service Models
public class FileMetadata
{
    public string Id { get; set; }
    public string OriginalFileName { get; set; }
    public string ContentType { get; set; }
    public long Size { get; set; }
    public string FilePath { get; set; }
    public int UploadedBy { get; set; }
    public DateTime UploadedAt { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public List<string> Tags { get; set; }
    public Dictionary<string, string> Thumbnails { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}

public class FileUploadRequest
{
    public string Category { get; set; }
    public string Description { get; set; }
    public List<string> Tags { get; set; }
}

public class FileUploadResponse
{
    public string FileId { get; set; }
    public string FileName { get; set; }
    public long Size { get; set; }
    public string ContentType { get; set; }
    public string DownloadUrl { get; set; }
    public Dictionary<string, string> ThumbnailUrls { get; set; }
}

public class FileValidationResult
{
    public bool IsValid { get; set; }
    public string ErrorMessage { get; set; }
}
```

## 12. Webhook Implementation

### Complete Webhook System with Retry Logic

```csharp
// Webhook Configuration
public class WebhookOptions
{
    public int MaxRetryAttempts { get; set; } = 3;
    public TimeSpan InitialRetryDelay { get; set; } = TimeSpan.FromSeconds(5);
    public TimeSpan MaxRetryDelay { get; set; } = TimeSpan.FromMinutes(5);
    public TimeSpan WebhookTimeout { get; set; } = TimeSpan.FromSeconds(30);
    public List<int> RetryableStatusCodes { get; set; } = new() { 408, 429, 500, 502, 503, 504 };
}

// Webhook Service Interface
public interface IWebhookService
{
    Task<bool> SendWebhookAsync(string url, object payload, string eventType, Dictionary<string, string> headers = null);
    Task<WebhookDelivery> SendWebhookWithTrackingAsync(WebhookSubscription subscription, object payload, string eventType);
    Task RetryFailedWebhooksAsync();
    Task<List<WebhookDelivery>> GetWebhookDeliveriesAsync(string subscriptionId, int page = 1, int pageSize = 50);
}

// Webhook Service Implementation
public class WebhookService : IWebhookService
{
    private readonly HttpClient _httpClient;
    private readonly IWebhookRepository _webhookRepository;
    private readonly ILogger<WebhookService> _logger;
    private readonly WebhookOptions _options;
    private readonly IBackgroundTaskQueue _taskQueue;

    public WebhookService(
        HttpClient httpClient,
        IWebhookRepository webhookRepository,
        ILogger<WebhookService> logger,
        IOptions<WebhookOptions> options,
        IBackgroundTaskQueue taskQueue)
    {
        _httpClient = httpClient;
        _webhookRepository = webhookRepository;
        _logger = logger;
        _options = options.Value;
        _taskQueue = taskQueue;
    }

    public async Task<bool> SendWebhookAsync(
        string url,
        object payload,
        string eventType,
        Dictionary<string, string> headers = null)
    {
        try
        {
            var json = JsonSerializer.Serialize(payload, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            using var request = new HttpRequestMessage(HttpMethod.Post, url);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");

            // Add standard headers
            request.Headers.Add("X-Webhook-Event", eventType);
            request.Headers.Add("X-Webhook-Delivery", Guid.NewGuid().ToString());
            request.Headers.Add("X-Webhook-Timestamp", DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString());
            request.Headers.Add("User-Agent", "Ecommerce-Webhooks/1.0");

            // Add custom headers
            if (headers != null)
            {
                foreach (var (key, value) in headers)
                {
                    request.Headers.TryAddWithoutValidation(key, value);
                }
            }

            using var cts = new CancellationTokenSource(_options.WebhookTimeout);
            using var response = await _httpClient.SendAsync(request, cts.Token);

            var success = response.IsSuccessStatusCode;

            _logger.LogInformation("Webhook sent to {Url} for event {EventType}: {StatusCode}",
                url, eventType, response.StatusCode);

            return success;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send webhook to {Url} for event {EventType}", url, eventType);
            return false;
        }
    }

    public async Task<WebhookDelivery> SendWebhookWithTrackingAsync(
        WebhookSubscription subscription,
        object payload,
        string eventType)
    {
        var delivery = new WebhookDelivery
        {
            Id = Guid.NewGuid().ToString(),
            SubscriptionId = subscription.Id,
            EventType = eventType,
            Payload = JsonSerializer.Serialize(payload),
            AttemptCount = 0,
            Status = WebhookDeliveryStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        await _webhookRepository.SaveDeliveryAsync(delivery);

        // Queue webhook for immediate delivery
        _taskQueue.QueueBackgroundWorkItem(async token =>
        {
            await ProcessWebhookDeliveryAsync(delivery.Id);
        });

        return delivery;
    }

    public async Task ProcessWebhookDeliveryAsync(string deliveryId)
    {
        var delivery = await _webhookRepository.GetDeliveryAsync(deliveryId);
        if (delivery == null || delivery.Status == WebhookDeliveryStatus.Delivered)
        {
            return;
        }

        var subscription = await _webhookRepository.GetSubscriptionAsync(delivery.SubscriptionId);
        if (subscription == null || !subscription.IsActive)
        {
            delivery.Status = WebhookDeliveryStatus.Failed;
            delivery.FailureReason = "Subscription not found or inactive";
            await _webhookRepository.UpdateDeliveryAsync(delivery);
            return;
        }

        delivery.AttemptCount++;
        delivery.LastAttemptAt = DateTime.UtcNow;

        try
        {
            var payload = JsonSerializer.Deserialize<object>(delivery.Payload);

            // Generate signature for security
            var signature = GenerateSignature(delivery.Payload, subscription.Secret);
            var headers = new Dictionary<string, string>
            {
                ["X-Webhook-Signature"] = signature
            };

            var success = await SendWebhookAsync(subscription.Url, payload, delivery.EventType, headers);

            if (success)
            {
                delivery.Status = WebhookDeliveryStatus.Delivered;
                delivery.DeliveredAt = DateTime.UtcNow;

                _logger.LogInformation("Webhook delivered successfully: {DeliveryId} to {Url}",
                    deliveryId, subscription.Url);
            }
            else
            {
                await HandleWebhookFailure(delivery, subscription);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing webhook delivery: {DeliveryId}", deliveryId);

            delivery.FailureReason = ex.Message;
            await HandleWebhookFailure(delivery, subscription);
        }

        await _webhookRepository.UpdateDeliveryAsync(delivery);
    }

    private async Task HandleWebhookFailure(WebhookDelivery delivery, WebhookSubscription subscription)
    {
        if (delivery.AttemptCount >= _options.MaxRetryAttempts)
        {
            delivery.Status = WebhookDeliveryStatus.Failed;

            // Disable subscription after multiple failures
            subscription.FailureCount++;
            if (subscription.FailureCount >= 10)
            {
                subscription.IsActive = false;
                subscription.DisabledReason = "Too many webhook failures";
                await _webhookRepository.UpdateSubscriptionAsync(subscription);

                _logger.LogWarning("Webhook subscription disabled due to failures: {SubscriptionId}",
                    subscription.Id);
            }
        }
        else
        {
            // Schedule retry with exponential backoff
            var delay = CalculateRetryDelay(delivery.AttemptCount);
            delivery.NextRetryAt = DateTime.UtcNow.Add(delay);

            _logger.LogInformation("Scheduling webhook retry {Attempt}/{MaxAttempts} for delivery {DeliveryId} in {Delay}",
                delivery.AttemptCount, _options.MaxRetryAttempts, delivery.Id, delay);
        }
    }

    public async Task RetryFailedWebhooksAsync()
    {
        var failedDeliveries = await _webhookRepository.GetPendingRetriesAsync();

        foreach (var delivery in failedDeliveries)
        {
            _taskQueue.QueueBackgroundWorkItem(async token =>
            {
                await ProcessWebhookDeliveryAsync(delivery.Id);
            });
        }

        _logger.LogInformation("Queued {Count} webhook deliveries for retry", failedDeliveries.Count);
    }

    public async Task<List<WebhookDelivery>> GetWebhookDeliveriesAsync(string subscriptionId, int page = 1, int pageSize = 50)
    {
        return await _webhookRepository.GetDeliveriesAsync(subscriptionId, page, pageSize);
    }

    private string GenerateSignature(string payload, string secret)
    {
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
        return "sha256=" + Convert.ToHexString(hash).ToLowerInvariant();
    }

    private TimeSpan CalculateRetryDelay(int attemptNumber)
    {
        // Exponential backoff: 5s, 25s, 125s (capped at max)
        var delay = TimeSpan.FromMilliseconds(_options.InitialRetryDelay.TotalMilliseconds * Math.Pow(5, attemptNumber - 1));
        return delay > _options.MaxRetryDelay ? _options.MaxRetryDelay : delay;
    }
}

// Webhook Management Controller
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WebhooksController : ControllerBase
{
    private readonly IWebhookRepository _webhookRepository;
    private readonly IWebhookService _webhookService;
    private readonly ILogger<WebhooksController> _logger;

    public WebhooksController(
        IWebhookRepository webhookRepository,
        IWebhookService webhookService,
        ILogger<WebhooksController> logger)
    {
        _webhookRepository = webhookRepository;
        _webhookService = webhookService;
        _logger = logger;
    }

    /// <summary>
    /// Creates a new webhook subscription
    /// </summary>
    [HttpPost("subscriptions")]
    [ProducesResponseType(typeof(WebhookSubscription), 201)]
    public async Task<IActionResult> CreateSubscription([FromBody] CreateWebhookSubscriptionRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Validate webhook URL by sending a test request
        var testResult = await ValidateWebhookUrl(request.Url);
        if (!testResult.IsValid)
        {
            return BadRequest(new ApiErrorResponse
            {
                Message = testResult.ErrorMessage,
                ErrorCode = "WEBHOOK_VALIDATION_FAILED"
            });
        }

        var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");

        var subscription = new WebhookSubscription
        {
            Id = Guid.NewGuid().ToString(),
            UserId = userId,
            Url = request.Url,
            Events = request.Events,
            Secret = GenerateWebhookSecret(),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        await _webhookRepository.SaveSubscriptionAsync(subscription);

        _logger.LogInformation("Webhook subscription created: {SubscriptionId} by user {UserId}",
            subscription.Id, userId);

        return CreatedAtAction(nameof(GetSubscription), new { id = subscription.Id }, subscription);
    }

    /// <summary>
    /// Gets webhook subscription details
    /// </summary>
    [HttpGet("subscriptions/{id}")]
    [ProducesResponseType(typeof(WebhookSubscription), 200)]
    public async Task<IActionResult> GetSubscription(string id)
    {
        var subscription = await _webhookRepository.GetSubscriptionAsync(id);

        if (subscription == null)
        {
            return NotFound();
        }

        var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");

        // Users can only see their own subscriptions (unless admin)
        if (subscription.UserId != userId && !User.IsInRole("Admin"))
        {
            return Forbid();
        }

        return Ok(subscription);
    }

    /// <summary>
    /// Lists user's webhook subscriptions
    /// </summary>
    [HttpGet("subscriptions")]
    [ProducesResponseType(typeof(List<WebhookSubscription>), 200)]
    public async Task<IActionResult> GetSubscriptions()
    {
        var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");
        var subscriptions = await _webhookRepository.GetUserSubscriptionsAsync(userId);

        return Ok(subscriptions);
    }

    /// <summary>
    /// Updates webhook subscription
    /// </summary>
    [HttpPut("subscriptions/{id}")]
    [ProducesResponseType(typeof(WebhookSubscription), 200)]
    public async Task<IActionResult> UpdateSubscription(string id, [FromBody] UpdateWebhookSubscriptionRequest request)
    {
        var subscription = await _webhookRepository.GetSubscriptionAsync(id);

        if (subscription == null)
        {
            return NotFound();
        }

        var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");

        if (subscription.UserId != userId && !User.IsInRole("Admin"))
        {
            return Forbid();
        }

        // Validate new URL if changed
        if (request.Url != subscription.Url)
        {
            var testResult = await ValidateWebhookUrl(request.Url);
            if (!testResult.IsValid)
            {
                return BadRequest(new ApiErrorResponse
                {
                    Message = testResult.ErrorMessage,
                    ErrorCode = "WEBHOOK_VALIDATION_FAILED"
                });
            }
        }

        subscription.Url = request.Url;
        subscription.Events = request.Events;
        subscription.IsActive = request.IsActive;
        subscription.UpdatedAt = DateTime.UtcNow;

        await _webhookRepository.UpdateSubscriptionAsync(subscription);

        return Ok(subscription);
    }

    /// <summary>
    /// Deletes webhook subscription
    /// </summary>
    [HttpDelete("subscriptions/{id}")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> DeleteSubscription(string id)
    {
        var subscription = await _webhookRepository.GetSubscriptionAsync(id);

        if (subscription == null)
        {
            return NotFound();
        }

        var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");

        if (subscription.UserId != userId && !User.IsInRole("Admin"))
        {
            return Forbid();
        }

        await _webhookRepository.DeleteSubscriptionAsync(id);

        _logger.LogInformation("Webhook subscription deleted: {SubscriptionId} by user {UserId}", id, userId);

        return NoContent();
    }

    /// <summary>
    /// Gets webhook delivery history
    /// </summary>
    [HttpGet("subscriptions/{id}/deliveries")]
    [ProducesResponseType(typeof(List<WebhookDelivery>), 200)]
    public async Task<IActionResult> GetDeliveries(string id, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        var subscription = await _webhookRepository.GetSubscriptionAsync(id);

        if (subscription == null)
        {
            return NotFound();
        }

        var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");

        if (subscription.UserId != userId && !User.IsInRole("Admin"))
        {
            return Forbid();
        }

        var deliveries = await _webhookService.GetWebhookDeliveriesAsync(id, page, pageSize);

        return Ok(deliveries);
    }

    /// <summary>
    /// Tests webhook endpoint
    /// </summary>
    [HttpPost("subscriptions/{id}/test")]
    [ProducesResponseType(typeof(WebhookTestResult), 200)]
    public async Task<IActionResult> TestWebhook(string id)
    {
        var subscription = await _webhookRepository.GetSubscriptionAsync(id);

        if (subscription == null)
        {
            return NotFound();
        }

        var userId = int.Parse(User.FindFirst("user_id")?.Value ?? "0");

        if (subscription.UserId != userId && !User.IsInRole("Admin"))
        {
            return Forbid();
        }

        var testPayload = new
        {
            EventType = "webhook.test",
            Timestamp = DateTime.UtcNow,
            Data = new { Message = "This is a test webhook delivery" }
        };

        var delivery = await _webhookService.SendWebhookWithTrackingAsync(subscription, testPayload, "webhook.test");

        // Wait a moment for delivery to complete
        await Task.Delay(2000);

        var updatedDelivery = await _webhookRepository.GetDeliveryAsync(delivery.Id);

        return Ok(new WebhookTestResult
        {
            Success = updatedDelivery.Status == WebhookDeliveryStatus.Delivered,
            DeliveryId = delivery.Id,
            Status = updatedDelivery.Status.ToString(),
            Message = updatedDelivery.FailureReason
        });
    }

    // Helper Methods

    private async Task<WebhookValidationResult> ValidateWebhookUrl(string url)
    {
        try
        {
            if (!Uri.TryCreate(url, UriKind.Absolute, out var uri) ||
                (uri.Scheme != "https" && uri.Scheme != "http"))
            {
                return new WebhookValidationResult
                {
                    IsValid = false,
                    ErrorMessage = "Invalid URL format. Must be HTTP or HTTPS."
                };
            }

            // Prevent localhost URLs in production
            if (uri.Host == "localhost" || uri.Host == "127.0.0.1")
            {
                return new WebhookValidationResult
                {
                    IsValid = false,
                    ErrorMessage = "Localhost URLs are not allowed."
                };
            }

            // Send test request
            var testPayload = new { test = true };
            var success = await _webhookService.SendWebhookAsync(url, testPayload, "webhook.validation");

            return new WebhookValidationResult
            {
                IsValid = success,
                ErrorMessage = success ? null : "Webhook endpoint did not respond successfully to test request."
            };
        }
        catch (Exception ex)
        {
            return new WebhookValidationResult
            {
                IsValid = false,
                ErrorMessage = $"Error validating webhook URL: {ex.Message}"
            };
        }
    }

    private string GenerateWebhookSecret()
    {
        using var rng = RandomNumberGenerator.Create();
        var bytes = new byte[32];
        rng.GetBytes(bytes);
        return Convert.ToBase64String(bytes);
    }
}

// Webhook Models
public class WebhookSubscription
{
    public string Id { get; set; }
    public int UserId { get; set; }
    public string Url { get; set; }
    public List<string> Events { get; set; }
    public string Secret { get; set; }
    public bool IsActive { get; set; }
    public int FailureCount { get; set; }
    public string DisabledReason { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class WebhookDelivery
{
    public string Id { get; set; }
    public string SubscriptionId { get; set; }
    public string EventType { get; set; }
    public string Payload { get; set; }
    public WebhookDeliveryStatus Status { get; set; }
    public int AttemptCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastAttemptAt { get; set; }
    public DateTime? NextRetryAt { get; set; }
    public DateTime? DeliveredAt { get; set; }
    public string FailureReason { get; set; }
}

public enum WebhookDeliveryStatus
{
    Pending,
    Delivered,
    Failed
}

// Event Publisher Service
public interface IEventPublisher
{
    Task PublishAsync<T>(string eventType, T eventData);
}

public class WebhookEventPublisher : IEventPublisher
{
    private readonly IWebhookRepository _webhookRepository;
    private readonly IWebhookService _webhookService;
    private readonly ILogger<WebhookEventPublisher> _logger;

    public WebhookEventPublisher(
        IWebhookRepository webhookRepository,
        IWebhookService webhookService,
        ILogger<WebhookEventPublisher> logger)
    {
        _webhookRepository = webhookRepository;
        _webhookService = webhookService;
        _logger = logger;
    }

    public async Task PublishAsync<T>(string eventType, T eventData)
    {
        try
        {
            // Get all active subscriptions for this event type
            var subscriptions = await _webhookRepository.GetActiveSubscriptionsForEventAsync(eventType);

            if (!subscriptions.Any())
            {
                _logger.LogDebug("No webhook subscriptions found for event type: {EventType}", eventType);
                return;
            }

            var eventPayload = new
            {
                EventType = eventType,
                Timestamp = DateTime.UtcNow,
                Data = eventData
            };

            // Send webhooks to all subscribers
            var tasks = subscriptions.Select(subscription =>
                _webhookService.SendWebhookWithTrackingAsync(subscription, eventPayload, eventType));

            await Task.WhenAll(tasks);

            _logger.LogInformation("Published event {EventType} to {Count} webhook subscribers",
                eventType, subscriptions.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error publishing event {EventType} to webhooks", eventType);
        }
    }
}
```

---

# TL;DR Summary

## API Interview Quick Reference

### Core Concepts Overview

| **Concept**        | **Key Points**                                                                                                                           | **Best Practices**                                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **REST API**       | • Stateless architecture<br>• Resource-based URLs<br>• HTTP methods (GET, POST, PUT, DELETE)<br>• Status codes (200, 201, 400, 404, 500) | • Use nouns in URLs<br>• Implement proper HTTP methods<br>• Return appropriate status codes<br>• Include pagination for collections              |
| **Authentication** | • JWT (JSON Web Tokens)<br>• OAuth 2.0 / OpenID Connect<br>• API Keys<br>• Bearer tokens                                                 | • Use HTTPS only<br>• Implement token expiration<br>• Store refresh tokens securely<br>• Validate tokens on every request                        |
| **Rate Limiting**  | • Sliding window algorithms<br>• Token bucket<br>• Redis for distributed systems<br>• HTTP headers (X-RateLimit-\*)                      | • Use multiple rate limit tiers<br>• Implement exponential backoff<br>• Provide clear error messages<br>• Allow whitelisting for trusted clients |
| **API Versioning** | • URL versioning (/v1/)<br>• Header versioning<br>• Content negotiation<br>• Deprecation strategy                                        | • Use semantic versioning<br>• Maintain backward compatibility<br>• Deprecate gracefully with timelines<br>• Document breaking changes           |

### HTTP Status Codes Reference

| **Code** | **Meaning**           | **When to Use**                                     |
| -------- | --------------------- | --------------------------------------------------- |
| **200**  | OK                    | Successful GET, PUT, PATCH                          |
| **201**  | Created               | Successful POST (resource created)                  |
| **204**  | No Content            | Successful DELETE, PUT (no response body)           |
| **400**  | Bad Request           | Invalid request data/parameters                     |
| **401**  | Unauthorized          | Missing or invalid authentication                   |
| **403**  | Forbidden             | Valid auth but insufficient permissions             |
| **404**  | Not Found             | Resource doesn't exist                              |
| **409**  | Conflict              | Resource conflict (duplicate, constraint violation) |
| **429**  | Too Many Requests     | Rate limit exceeded                                 |
| **500**  | Internal Server Error | Unexpected server error                             |

### GraphQL vs REST vs gRPC Comparison

| **Feature**        | **REST**                 | **GraphQL**                       | **gRPC**                            |
| ------------------ | ------------------------ | --------------------------------- | ----------------------------------- |
| **Protocol**       | HTTP/1.1, HTTP/2         | HTTP/1.1, HTTP/2                  | HTTP/2                              |
| **Data Format**    | JSON, XML                | JSON                              | Protocol Buffers                    |
| **Schema**         | No built-in schema       | Strong typed schema               | Protocol definition                 |
| **Queries**        | Multiple endpoints       | Single endpoint, flexible queries | Strongly typed methods              |
| **Real-time**      | WebSockets, SSE          | Subscriptions                     | Streaming RPCs                      |
| **Caching**        | HTTP caching             | Query-level caching               | Not built-in                        |
| **Learning Curve** | Easy                     | Moderate                          | Steep                               |
| **Best For**       | Simple CRUD, public APIs | Complex data requirements, mobile | Microservices, performance-critical |

### Security Best Practices Checklist

- ✅ **HTTPS Everywhere** - Encrypt all API communications
- ✅ **Input Validation** - Validate and sanitize all input data
- ✅ **Authentication** - Implement proper user authentication
- ✅ **Authorization** - Check permissions for every endpoint
- ✅ **Rate Limiting** - Prevent abuse and DoS attacks
- ✅ **CORS Configuration** - Configure Cross-Origin Resource Sharing properly
- ✅ **Security Headers** - Add HSTS, CSP, X-Frame-Options headers
- ✅ **SQL Injection Prevention** - Use parameterized queries
- ✅ **Secret Management** - Store secrets securely (Azure Key Vault)
- ✅ **Logging & Monitoring** - Log security events and monitor for threats

### Azure API Management Features

| **Feature**          | **Description**                     | **Use Case**                                    |
| -------------------- | ----------------------------------- | ----------------------------------------------- |
| **Policies**         | XML-based transformation rules      | Authentication, rate limiting, caching          |
| **API Gateway**      | Centralized entry point             | Route requests, load balancing                  |
| **Developer Portal** | Self-service documentation          | API discovery, testing, subscription management |
| **Analytics**        | Usage metrics and monitoring        | Performance tracking, business insights         |
| **Security**         | OAuth, JWT validation, IP filtering | Protect APIs, control access                    |
| **Transformation**   | Request/response modification       | Legacy system integration                       |
| **Caching**          | Response caching strategies         | Performance optimization                        |
| **Load Balancing**   | Traffic distribution                | High availability, canary deployments           |

### Performance Optimization Strategies

1. **Caching**

   - Response caching (Redis, in-memory)
   - CDN for static content
   - Database query caching
   - ETags for conditional requests

2. **Database Optimization**

   - Connection pooling
   - Query optimization
   - Indexing strategies
   - Read replicas

3. **Compression**

   - Gzip/Brotli compression
   - Response payload optimization
   - Image compression and resizing

4. **Pagination**

   - Limit result sets
   - Cursor-based pagination
   - Total count optimization

5. **Async Operations**
   - Background job processing
   - Webhook notifications
   - Event-driven architecture

### Common Interview Questions & Key Answers

**Q: How do you handle API versioning?**
A: Multiple strategies - URL versioning (/v1/), header versioning, content negotiation. Implement deprecation timeline, maintain backward compatibility, use semantic versioning.

**Q: Explain rate limiting implementation.**
A: Use sliding window or token bucket algorithms. Implement with Redis for distributed systems. Return rate limit headers. Provide exponential backoff for retry logic.

**Q: How do you secure REST APIs?**
A: HTTPS, JWT/OAuth authentication, input validation, CORS, rate limiting, security headers, SQL injection prevention, secret management.

**Q: REST vs GraphQL - when to use which?**
A: REST for simple CRUD, public APIs, caching needs. GraphQL for complex data requirements, mobile apps, reducing over-fetching. gRPC for microservices and performance-critical applications.

**Q: How do you handle file uploads securely?**
A: File type validation, size limits, virus scanning, secure storage, thumbnail generation, access control, content-type verification.

**Q: Explain webhook implementation.**
A: Retry logic with exponential backoff, signature validation (HMAC), delivery tracking, subscription management, event-driven architecture.

This comprehensive Q&A section covers the most important API interview topics with production-ready examples that demonstrate deep understanding of API development in Azure cloud environments.
