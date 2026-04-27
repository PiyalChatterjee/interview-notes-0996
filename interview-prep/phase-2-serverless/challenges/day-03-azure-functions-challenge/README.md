# Day 3 Challenge - Azure Functions with Triggers and Bindings

## Overview

Build a contact management system using Azure Functions with three triggers:

1. **HTTP Trigger** - POST `/api/contacts` to save a contact
2. **Queue Trigger** - Process contacts asynchronously from queue
3. **Timer Trigger** - Cleanup stale contacts every hour (hourly)

## Architecture

```
Client
  ↓
HTTP Trigger (SaveContact)
  ├─ Validate contact
  ├─ Save to in-memory repository
  ├─ Enqueue to contact-processing queue
  └─ Return 201 Created

Queue Trigger (ProcessContact)
  ├─ Deserialize contact from queue message
  ├─ Create backup blob
  └─ Log success

Timer Trigger (CleanupStaleContacts)
  ├─ Acquire blob lease (lock)
  ├─ Get contacts older than 30 days
  ├─ Delete them
  └─ Release lease
```

## Prerequisites

- .NET 8 SDK
- Azure Functions Core Tools v4
- Azurite (Azure Storage Emulator)
- VS Code with Azure Functions extension (optional)

## Local Setup

### 1. Install Azure Functions Core Tools

```bash
# On Windows (using chocolatey)
choco install azure-functions-core-tools-4

# Or from GitHub releases: https://github.com/Azure/azure-functions-core-tools/releases
```

### 2. Start Azurite (Azure Storage Emulator)

```bash
npm install -g azurite
azurite --silent --location ./data
```

This emulates Blob Storage and Queue Storage locally on:
- Blob: `http://127.0.0.1:10000`
- Queue: `http://127.0.0.1:10001`
- Table: `http://127.0.0.1:10002`

### 3. Build and Run

```bash
cd day-03-azure-functions-challenge

# Restore NuGet packages
dotnet restore

# Build
dotnet build

# Run locally
func start
```

**Expected output:**
```
Azure Functions Core Tools
Function App started. Press CTRL+C to stop.

Http Functions:

    SaveContact: [POST] http://localhost:7071/api/contacts

Timer Functions:

    CleanupStaleContacts: TimerTrigger - Cron: 0 0 * * * *

Queue Functions:

    ProcessContact: queueTrigger - contact-processing
```

## Testing

### Test 1: Create a Contact (HTTP Trigger)

**Valid request:**
```bash
curl -X POST http://localhost:7071/api/contacts \
  -H "Content-Type: application/json" \
  -H "x-functions-key: <function-key>" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }'
```

**Expected response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-04-27T14:30:00Z"
}
```

**Invalid request (bad email):**
```bash
curl -X POST http://localhost:7071/api/contacts \
  -H "Content-Type: application/json" \
  -H "x-functions-key: <function-key>" \
  -d '{
    "name": "Jane",
    "email": "invalid-email"
  }'
```

**Expected response (400 Bad Request):**
```json
{
  "errors": [
    {
      "field": "Email",
      "message": "Email must be valid"
    }
  ]
}
```

### Test 2: Verify Queue Processing

When you create a contact via HTTP, it's enqueued to `contact-processing` queue. The Queue Trigger automatically picks it up and creates a backup blob.

Check the Azure Storage Emulator:

```bash
# View queue messages
curl http://localhost:10001/contact-processing?comp=messages

# View blobs in contact-backups container
curl http://localhost:10000/contact-backups
```

### Test 3: Verify Timer Trigger

The timer runs every hour (CRON: `0 0 * * * *`). To test immediately, modify the CRON expression in `CleanupStaleContactsTimerTrigger.cs`:

```csharp
[TimerTrigger("*/30 * * * * *")] // Run every 30 seconds for testing
```

Then rebuild and watch the logs:

```
Cleanup timer triggered at 2026-04-27T14:30:00Z
Lock acquired, starting cleanup...
Cleanup completed in 0.05 seconds. Deleted 0 contacts
Lock released
```

## Project Structure

```
day-03-azure-functions-challenge/
├── Functions/
│   ├── SaveContactHttpTrigger.cs       # HTTP POST /api/contacts
│   ├── ProcessContactQueueTrigger.cs   # Queue trigger for async processing
│   └── CleanupStaleContactsTimerTrigger.cs # Timer trigger for cleanup
├── Models/
│   └── Contact.cs                      # Contact entity
├── Data/
│   └── IContactRepository.cs           # Repository interface + in-memory impl
├── Validators/
│   └── ContactValidator.cs             # FluentValidation rules
├── Program.cs                          # DI setup + host configuration
├── host.json                           # Function App configuration
├── local.settings.json                 # Local dev settings (Azurite connection)
├── ContactFunctions.csproj             # Project file
└── README.md                           # This file
```

## Key Concepts Demonstrated

### 1. **HTTP Trigger with Request/Response**
- Parse JSON body
- Return different status codes (201, 400, 500)
- Access route parameters

### 2. **Dependency Injection**
- Inject `IContactRepository`, `IValidator<Contact>`, `ILogger`
- Scoped lifetime for repositories
- Testability

### 3. **Queue Binding**
- Output binding to enqueue messages
- Queue trigger to process asynchronously
- Retry and poison queue behavior

### 4. **Blob Binding**
- Output binding to write backup files
- File path templating with `{Id}`

### 5. **Timer Trigger**
- CRON scheduling
- Time zone handling
- Preventing overlapping executions with blob lease

### 6. **Error Handling**
- Validation errors (400)
- Transient errors (retry)
- Permanent errors (poison queue)
- Lease conflicts (409)

### 7. **Logging**
- Structured logging with `ILogger`
- Log levels: Info, Warning, Error
- Context: operation ID, contact ID, duration

## Troubleshooting

### "Port 7071 is already in use"
```bash
# Kill existing func.exe process
taskkill /F /IM func.exe
```

### "Storage account connection failed"
- Ensure Azurite is running: `azurite --silent --location ./data`
- Check `AzureWebJobsStorage` in `local.settings.json`

### "Function key not recognized"
- Local dev: Use `AuthorizationLevel.Anonymous` in host.json during testing
- Production: Use `AuthorizationLevel.Function` and pass key in header

### Rebuild after code changes
```bash
dotnet build
# Then restart: func start
```

## Interview Talking Points

1. **Why isolated functions?**
   - Independent .NET version
   - Better debugging
   - Dependency injection is standard
   - Recommended for new projects

2. **Error handling strategy:**
   - Transient errors (network): throw to retry
   - Permanent errors (validation): don't throw, save state
   - Poison queue: ops team inspects after max retries

3. **Idempotency:**
   - Queue processing must be safe to retry
   - Use blob lease to prevent concurrent cleanup
   - Log completion to track attempts

4. **Performance:**
   - Async/await throughout
   - Parallel queue processing: one instance per message
   - Timer doesn't block other functions

5. **Observability:**
   - Structured logging
   - Application Insights integration
   - Correlation IDs for tracing
   - Error context (contact ID, attempt count)

## Next Steps (Day 4)

- Add SAS token generation for browser-side blob uploads
- Implement Managed Identity access (no connection strings in code)
- Add container-level access control
- Secure secrets with Azure Key Vault
