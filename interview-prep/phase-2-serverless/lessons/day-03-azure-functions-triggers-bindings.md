# Day 3 Lesson - Azure Functions: Triggers, Bindings, and Local Development

> Goal: Understand Azure Functions anatomy, master common triggers and bindings, and build production-ready isolated functions with proper dependency injection, error handling, and local development setup.

---

## 1) What Azure Functions Are

Azure Functions is a serverless compute service. You write business logic, Azure handles scaling, infrastructure, and billing.

Key facts:
- You pay per execution and compute time (millisecond granularity).
- Auto-scales: 0 to thousands of instances.
- Triggered by events: HTTP, Timer, Queue, Blob, Service Bus, etc.
- Input/Output bindings declaratively bind data sources.

Senior framing:
**Azure Functions = event-driven code + managed scaling + pay-per-use.**

---

## 2) Function App Anatomy

A Function App is a container for one or more functions. It shares:
- Runtime (Node.js, Python, .NET, Java, etc.)
- Configuration (app settings, connection strings)
- Storage account (for triggers, state, logs)
- Monitoring (Application Insights)

Functions inherit app-level settings. Functions are triggered independently.

### App Settings

Stored in Azure Key Vault (production) or `local.settings.json` (local).

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated",
    "ContactStorageAccount": "DefaultEndpointsProtocol=https;AccountName=...",
    "COSMOSDB_CONNECTION_STRING": "AccountEndpoint=https://..."
  }
}
```

---

## 3) Triggers: Event Sources

A trigger is the **only required binding**. It defines when a function runs.

### Common Triggers

| Trigger | Event | Use Case |
|---------|-------|----------|
| **HTTP** | Incoming HTTP request | REST API, webhooks |
| **Timer** | Schedule (CRON) | Cleanup, batch jobs, reports |
| **Queue** | Message in Queue Storage | Async tasks, fan-out |
| **Blob** | File uploaded/deleted | Process images, logs |
| **Service Bus** | Message in Service Bus | Cross-service events, ordering |
| **Cosmos DB** | Document changed | Sync, projections, notifications |
| **Event Grid** | Azure event (VM created, etc.) | Infrastructure automation |

### HTTP Trigger Example

```csharp
[Function("GetContact")]
public IActionResult GetContact(
    [HttpTrigger(AuthorizationLevel.Function, "get", Route = "contacts/{id}")] 
    HttpRequest req,
    string id,
    ILogger log)
{
    log.LogInformation($"Getting contact: {id}");
    return new OkObjectResult(new { id, name = "John Doe" });
}
```

**Key points:**
- `AuthorizationLevel.Function` requires function key in header/query.
- Route templating: `{id}` binds to function parameter `id`.
- `HttpRequest req` gives access to body, headers, query params.
- Return `IActionResult` for HTTP status codes.

### Timer Trigger Example

```csharp
[Function("CleanupStaleContacts")]
public void CleanupStaleContacts(
    [TimerTrigger("0 0 * * * *")] // Run hourly
    TimerInfo myTimer,
    ILogger log)
{
    log.LogInformation($"Cleanup started at {DateTime.UtcNow}");
    // Delete contacts older than 30 days
    // ...
    log.LogInformation("Cleanup completed");
}
```

**CRON format:** `{second} {minute} {hour} {day} {month} {day-of-week}`
- `0 0 * * * *` = every hour at :00:00
- `0 */5 * * * *` = every 5 minutes
- `0 0 8 * * MON` = 8:00 AM every Monday

### Queue Trigger Example

```csharp
[Function("ProcessContactQueue")]
public async Task ProcessContactQueue(
    [QueueTrigger("contact-queue")] string queueItem,
    ILogger log)
{
    try 
    {
        var contact = JsonSerializer.Deserialize<Contact>(queueItem);
        log.LogInformation($"Processing contact: {contact.Email}");
        // Save to database
        await _repository.SaveAsync(contact);
    }
    catch (Exception ex)
    {
        log.LogError($"Error: {ex.Message}");
        // Poison queue after 5 retries
        throw;
    }
}
```

**Azure behavior:**
- If function throws, Azure retries (exponential backoff).
- After 5 retries, message moves to poison queue.
- Idempotency is critical — handle duplicate processing.

### Blob Trigger Example

```csharp
[Function("ProcessContactFile")]
public void ProcessContactFile(
    [BlobTrigger("contact-uploads/{name}")] 
    Stream blobStream,
    string name,
    ILogger log)
{
    using var reader = new StreamReader(blobStream);
    var content = reader.ReadToEnd();
    log.LogInformation($"Processing blob: {name}, size: {blobStream.Length} bytes");
    
    // Parse CSV/JSON, validate, save to database
    // ...
}
```

**Key points:**
- `{name}` captures the blob filename.
- `Stream` is memory-efficient for large files.
- Triggered on file upload to `contact-uploads/`.

---

## 4) Bindings: Declarative Data Access

Bindings simplify data connectivity. Input bindings fetch data; output bindings push data.

### Common Input Bindings

| Binding | Source | Use |
|---------|--------|-----|
| **Blob** | Blob Storage | Read file |
| **Queue** | Queue Storage | Peek message (not consume) |
| **Cosmos DB** | Cosmos DB | Query documents by ID |
| **Table** | Table Storage | Fetch entity |
| **SQL** | Azure SQL | Query records |

### Common Output Bindings

| Binding | Destination | Use |
|---------|-------------|-----|
| **Blob** | Blob Storage | Write/upload file |
| **Queue** | Queue Storage | Send message |
| **Service Bus** | Service Bus | Publish event |
| **Cosmos DB** | Cosmos DB | Insert/upsert document |
| **Table** | Table Storage | Save entity |

### Blob Input/Output Example

```csharp
[Function("ProcessAndArchive")]
public async Task ProcessAndArchive(
    [BlobTrigger("uploads/{name}")] Stream inputBlob,
    [Blob("processed/{name}", FileAccess.Write)] CloudBlobContainer outputContainer,
    string name,
    ILogger log)
{
    var content = new StreamReader(inputBlob).ReadToEnd();
    var processed = content.ToUpper(); // Business logic
    
    var outputBlob = outputContainer.GetBlockBlobReference(name);
    await outputBlob.UploadTextAsync(processed);
    
    log.LogInformation($"Processed {name}");
}
```

### Cosmos DB Input Binding Example

```csharp
[Function("GetContactDetails")]
public IActionResult GetContactDetails(
    [HttpTrigger(AuthorizationLevel.Function, "get", Route = "contact/{id}")] HttpRequest req,
    [CosmosDB(databaseName: "contacts", collectionName: "items", ConnectionStringSetting = "CosmosDBConnection", Id = "{id}")] 
    Contact contact,
    ILogger log)
{
    if (contact == null)
    {
        return new NotFoundResult();
    }
    return new OkObjectResult(contact);
}
```

**Magic:** The `{id}` from the route is automatically used as the document ID lookup.

---

## 5) Isolated Functions vs. In-Process

| Aspect | In-Process | **Isolated** (Recommended) |
|--------|-----------|--------------------------|
| **Runtime** | Shared with host | Separate .NET process |
| **Dependencies** | Must match host | Independent versions |
| **.NET version** | Locked to host | Choose per function app |
| **Startup time** | Faster | Slightly slower |
| **Isolation** | Low | High |
| **Debugging** | Harder | Easier |

**Interview answer:** Use **Isolated** for new projects. It gives you .NET version flexibility, better debugging, and independence from the host runtime.

---

## 6) Dependency Injection in Isolated Functions

Isolated functions use standard ASP.NET Core DI.

```csharp
// Program.cs
var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        services.AddScoped<IContactRepository, ContactRepository>();
        services.AddScoped<IValidator<Contact>, ContactValidator>();
        services.AddApplicationInsights();
    })
    .Build();

host.Run();
```

```csharp
// Function using DI
[Function("SaveContact")]
public async Task<IActionResult> SaveContact(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = "contacts")] HttpRequest req,
    [Blob("contact-backups/{id}.json", FileAccess.Write)] CloudBlobContainer backupContainer,
    IContactRepository repository,
    IValidator<Contact> validator,
    ILogger log)
{
    var body = await req.Content.ReadAsStringAsync();
    var contact = JsonSerializer.Deserialize<Contact>(body);
    
    var validationResult = validator.Validate(contact);
    if (!validationResult.IsValid)
    {
        return new BadRequestObjectResult(validationResult.Errors);
    }
    
    await repository.SaveAsync(contact);
    log.LogInformation($"Contact saved: {contact.Id}");
    
    return new OkObjectResult(new { id = contact.Id });
}
```

**Benefits:**
- Testability: inject mocks.
- Reusability: shared services across functions.
- Configuration: centralized in `Program.cs`.

---

## 7) Error Handling & Retry Logic

Functions have built-in retry policies. After max retries, messages go to poison queues.

```csharp
[Function("RobustQueueProcessor")]
public async Task RobustQueueProcessor(
    [QueueTrigger("orders")] Order order,
    ILogger log,
    int dequeueCount, // Azure provides this
    FunctionContext context)
{
    try
    {
        // Idempotent operation: safe to retry
        var result = await _paymentService.ProcessAsync(order.PaymentToken);
        
        if (!result.Success)
        {
            // Transient error: Azure will retry
            throw new InvalidOperationException($"Payment failed: {result.Error}");
        }
        
        await _repository.SaveAsync(order);
        log.LogInformation($"Order {order.Id} processed");
    }
    catch (Exception ex) when (dequeueCount < 3)
    {
        log.LogWarning($"Retry {dequeueCount}: {ex.Message}");
        throw; // Azure retries
    }
    catch (Exception ex)
    {
        log.LogError($"Max retries exceeded: {ex.Message}");
        // Message goes to poison queue; don't throw
        await _repository.SaveFailedOrderAsync(order, ex.Message);
    }
}
```

**Pattern:**
1. Try idempotent operation.
2. If transient failure, throw to trigger retry.
3. After max retries, log and handle gracefully (no throw).

---

## 8) Local Development with Azurite

Azurite emulates Azure Storage locally.

### Setup

```bash
npm install -g azurite
azurite --silent --location ./data

# In local.settings.json:
"AzureWebJobsStorage": "UseDevelopmentStorage=true"
```

### local.settings.json

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated",
    "ContactStorageConnection": "DefaultEndpointsProtocol=https;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXstg==;EndpointSuffix=core.windows.net",
    "CosmosDBConnection": "AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTjd3K27OPVjP3=;",
    "APPLICATIONINSIGHTS_CONNECTION_STRING": "InstrumentationKey=12345678-1234-1234-1234-123456789012"
  }
}
```

### Running Locally

```bash
func start

# Output:
# Azure Functions Core Tools
# Function App started. Press CTRL+C to stop.
# 
# Http Functions:
# 
#     SaveContact: http://localhost:7071/api/contacts
#     GetContact: http://localhost:7071/api/contacts/{id}
```

---

## 9) Architectural Patterns

### Pattern 1: Fan-Out with Queues

One event triggers multiple parallel tasks.

```
HTTP POST /orders
  → Save to database
  → Enqueue to payment-queue
  → Enqueue to notification-queue
  → Enqueue to analytics-queue

(3 separate queue triggers process in parallel)
```

Benefits: Decoupling, parallel processing, retry isolation.

### Pattern 2: Fan-In with Durable Functions

Collect results from multiple parallel tasks.

```
Start orchestration
  → Task 1: Process payment
  → Task 2: Reserve inventory
  → Task 3: Validate shipping
  
Wait for all 3 to complete
  → If all succeed: confirm order
  → If any fails: rollback
```

(Covered in Day 4+; use Durable Functions orchestrator)

### Pattern 3: Blob → Queue → Database

Process uploaded files asynchronously.

```
Blob trigger: file uploaded
  → Parse content
  → Enqueue messages for each record
  
Queue trigger:
  → Validate record
  → Save to database
  → Update blob with status
```

---

## 10) Azure Functions Interview Script (60 Seconds)

Azure Functions scale my workloads from zero to thousands automatically. I use HTTP triggers for REST APIs, timer triggers for scheduled tasks, and queue/blob triggers for event-driven processing. I always use isolated functions for .NET 8 independence and dependency injection. For data binding, I leverage Cosmos DB input bindings for ID lookups and blob output bindings for file generation—this keeps my function code clean and testable. Error handling is critical: I make operations idempotent so retries don't break state, and I use poison queues to capture failures for later inspection. Locally, I use Azurite to emulate storage and Core Tools to debug before deploying.

---

## 11) Rapid Revision Checklist

Before interview:
- [ ] Explain why isolated functions over in-process.
- [ ] Name 5 triggers and describe one use case for each.
- [ ] Describe fan-out and why queues enable parallelism.
- [ ] Explain why idempotency matters in queue processing.
- [ ] Describe how input bindings reduce boilerplate.
- [ ] Explain poison queues and retry limits.
- [ ] Describe local.settings.json and Azurite purpose.

---

## 12) Practice Prompts

1. **Scenario:** A webhook fires every 5 minutes with new orders. Design a function app to process them. Include HTTP endpoint, storage, error handling, and local testing strategy.

2. **Scenario:** You need to process 10,000 contact CSV files daily. Design a pipeline: upload blob → trigger → validate → enqueue → separate function processes queue → saves to database. How do you parallelize safely?

3. **Scenario:** Your timer trigger runs every hour and queries a database. It takes 15 seconds some days and 5 minutes on others. How do you ensure it completes before the next scheduled run? What Azure service helps?

4. **Scenario:** A queue-triggered function fails 3 times due to transient network errors, then succeeds on retry 4. How do you differentiate transient from permanent failures? Code example.

---

## Concept Booster: Retry Strategies

**Transient errors** (likely temporary):
- Network timeouts
- Database connection pool exhausted
- HTTP 429 (throttling)
- HTTP 503 (service unavailable)

**Permanent errors** (don't retry):
- HTTP 400 (bad request)
- HTTP 401 (auth failed)
- Deserialization failure
- Constraint violation

**Idempotent operation** (safe to retry):
- You generate the same result if run twice.
- Use unique IDs or upsert rather than insert-only.
- Log the first attempt; subsequent attempts are no-ops.

**Example:**
```csharp
[Function("SaveContactIdempotent")]
public async Task SaveContactIdempotent(
    [QueueTrigger("contacts")] Contact contact,
    [Blob("contact-ledger/{id}.txt", FileAccess.Read)] CloudBlockBlob ledgerBlob,
    ILogger log)
{
    // Check if already processed
    if (await ledgerBlob.ExistsAsync())
    {
        log.LogInformation($"Contact {contact.Id} already saved, skipping");
        return;
    }
    
    // Upsert contact
    await _repository.UpsertAsync(contact);
    
    // Write ledger entry (proof of completion)
    await ledgerBlob.UploadTextAsync($"Processed at {DateTime.UtcNow}");
    
    log.LogInformation($"Contact {contact.Id} saved");
}
```

This is idempotent: rerun it 10 times, same result.

---

## Tomorrow (Day 4 Preview)

**Topic:** Azure Blob Storage, SAS Tokens, and Managed Identity Security  
**Challenge:** Extend today's contact functions to generate SAS tokens for browser-side uploads and implement container-level access control  
**Key Concept:** How do you securely grant temporary access to clients without embedding connection strings?
