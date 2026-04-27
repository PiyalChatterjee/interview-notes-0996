# Day 3 Mock Interview - Azure Functions

> Live Q&A log. Three questions on triggers, bindings, error handling, and architectural patterns.

---

## Question 1

> "Design an Azure Functions solution for a contact management system. You receive contact data via HTTP, need to validate it, back it up to blob storage, and then process it asynchronously. What triggers and bindings do you use? Why?"

**Your Answer:**

_(Write here after reading the lesson)_

---

**Mentor-Calibrated Answer (Senior-Level):**

I would use three functions:

1. **HTTP Trigger (SaveContact):**
   - Receives `POST /api/contacts` with contact JSON.
   - Validates using injected `IValidator<Contact>`.
   - If valid, saves to Cosmos DB and enqueues message to `contact-queue`.
   - Returns 201 with contact ID immediately (fire-and-forget).
   - If invalid, returns 400 with validation errors.

2. **Queue Trigger (ProcessContact):**
   - Triggered by message in `contact-queue`.
   - Deserializes contact from queue message.
   - Makes backup call to output binding for blob storage (blob output binding writes to `contact-backups/{id}.json`).
   - If fails (transient), Azure retries up to 5 times (exponential backoff).
   - If fails permanently (e.g., network timeout after 5 retries), message moves to poison queue `contact-queue-poison` for manual inspection.

3. **Blob Input Binding (GetContactBackup):**
   - Optional: HTTP trigger `GET /api/contact-backup/{id}`.
   - Uses blob input binding to fetch `contact-backups/{id}.json` directly from storage.
   - Returns blob content or 404 if not found.

Why this architecture:
- **HTTP trigger:** Stateless REST API, fast response to client.
- **Queue trigger:** Async processing decouples validation from backup (client doesn't wait).
- **Blob input binding:** Reduces code—no manual Storage SDK calls.
- **Parallel scaling:** If 1000 requests come in, HTTP function scales to handle them. Queued items process in parallel with separate queue trigger instances.
- **Error isolation:** Queue failure (transient) doesn't break the HTTP response to the client.

Dependency injection for `IValidator`, `IRepository`, logging, and telemetry ensures testability and reusability.

---

**Self-Evaluation:**

_(After your answer, we'll score it)_

---

**Concepts To Reinforce:**

1. Triggers define when functions run; bindings are declarative data access.
2. HTTP trigger for synchronous, Queue trigger for async.
3. Output bindings reduce boilerplate (no Storage SDK in function code).
4. Idempotency in queue handlers: safe to retry multiple times.
5. Poison queues capture failed messages after max retries.

---

## Question 2

> "Your queue-triggered function fails intermittently when calling an external payment API. Sometimes it's a network timeout (should retry), sometimes it's 'invalid credit card' (should not retry). How do you differentiate and handle each case? Code example."

**Your Answer:**

_(Write here after reading the lesson)_

---

**Mentor-Calibrated Answer (Senior-Level):**

I differentiate transient (retry-worthy) from permanent errors using exception types and HTTP status codes.

```csharp
[Function("ProcessPayment")]
public async Task ProcessPayment(
    [QueueTrigger("payments")] PaymentRequest request,
    ILogger log,
    int dequeueCount)
{
    try
    {
        var result = await _paymentService.ChargeAsync(
            cardToken: request.CardToken,
            amount: request.Amount,
            timeout: TimeSpan.FromSeconds(10)
        );
        
        if (result.Success)
        {
            await _repository.SavePaymentAsync(request.Id, "completed");
            log.LogInformation($"Payment {request.Id} processed");
        }
        else
        {
            // Permanent error: invalid card, expired, insufficient funds
            HandlePermanentPaymentFailure(request, result.Error, log);
        }
    }
    catch (HttpRequestException ex) when (dequeueCount < 3)
    {
        // Transient: network timeout, server error
        log.LogWarning($"Transient error (attempt {dequeueCount}): {ex.Message}");
        throw; // Azure retries
    }
    catch (ArgumentException ex)
    {
        // Permanent: validation error (malformed token, etc.)
        log.LogError($"Permanent error: {ex.Message}");
        await _repository.SavePaymentAsync(request.Id, "validation_failed", ex.Message);
        // Don't throw; prevent infinite retries
    }
    catch (Exception ex)
    {
        // Unknown error: log and fail to poison queue
        log.LogError($"Unexpected error: {ex}");
        await _repository.SavePaymentAsync(request.Id, "error", ex.Message);
        throw; // Goes to poison queue after max retries
    }
}

private void HandlePermanentPaymentFailure(
    PaymentRequest request, 
    string paymentError, 
    ILogger log)
{
    // Permanent: don't retry
    log.LogError($"Payment {request.Id} declined: {paymentError}");
    await _repository.SavePaymentAsync(request.Id, "declined", paymentError);
    
    // Notify user via queue (separate function)
    await _notificationQueue.SendMessageAsync(
        JsonSerializer.Serialize(new { requestId = request.Id, status = "declined" })
    );
}
```

Key decisions:
- **HttpRequestException** (network/timeout): Throw to retry.
- **Invalid token / declined card** (from API response): Don't throw; save state and notify user.
- **ArgumentException** (bad input): Don't throw; log and save.
- **Unknown exception**: Throw to poison queue for ops inspection.

**Idempotency:** If the function retries, `SavePaymentAsync` is idempotent—calling it twice with the same ID has the same effect as once (upsert, not insert).

---

**Self-Evaluation:**

_(After your answer, we'll score it)_

---

**Concepts To Reinforce:**

1. Differentiate transient (network) from permanent (validation) errors.
2. Throw only for transient errors; let Azure retry.
3. For permanent errors, save state and notify downstream (don't throw).
4. Idempotent operations: safe to retry without side effects.
5. Poison queues: ops team inspects after max retries.

---

## Question 3

> "You have a Timer trigger that runs every hour to clean up stale contacts. It can take 30 minutes to complete during high-load periods. How do you prevent the next scheduled execution from starting while the previous one is still running? What Azure service helps?"

**Your Answer:**

_(Write here after reading the lesson)_

---

**Mentor-Calibrated Answer (Senior-Level):**

Azure Functions don't natively prevent overlapping executions for Timer triggers. I use one of two approaches:

**Approach 1: Blob Lease (Cheap, Simple)**

```csharp
[Function("CleanupStaleContacts")]
public async Task CleanupStaleContacts(
    [TimerTrigger("0 0 * * * *")] TimerInfo myTimer, // Hourly
    [Blob("cleanup-lock")] CloudBlockBlob lockBlob, // Leasing blob
    ILogger log)
{
    const string leaseId = "cleanup-execution-lock";
    
    try
    {
        // Attempt to acquire lease (5 minutes)
        var acquiredLeaseId = await lockBlob.AcquireLeaseAsync(TimeSpan.FromMinutes(5));
        
        log.LogInformation("Lock acquired, starting cleanup...");
        
        var startTime = DateTime.UtcNow;
        
        // Run cleanup
        var staleContacts = await _repository.GetStaleContactsAsync(daysOld: 30);
        foreach (var contact in staleContacts)
        {
            await _repository.DeleteAsync(contact.Id);
            log.LogInformation($"Deleted contact {contact.Id}");
        }
        
        var duration = DateTime.UtcNow - startTime;
        log.LogInformation($"Cleanup completed in {duration.TotalSeconds} seconds");
        
        // Release lease
        await lockBlob.ReleaseLeaseAsync(acquiredLeaseId);
    }
    catch (StorageException ex) when (ex.RequestInformation.HttpStatusCode == 409)
    {
        // Lease conflict: another execution holds the lock
        log.LogInformation("Cleanup already in progress, skipping this run");
    }
}
```

**Why this works:**
- Blob lease is atomic and distributed.
- If an instance crashes, lease expires after 5 minutes and another instance can acquire it.
- Simple and requires only Blob Storage.

**Approach 2: Durable Functions Orchestrator (Better for Complex Workflows)**

```csharp
[Function("CleanupOrchestrator")]
public static async Task CleanupOrchestrator(
    [OrchestrationTrigger] TaskOrchestrationContext context,
    ILogger log)
{
    // Check if cleanup is already running
    var status = await context.GetInstanceStatusAsync();
    
    if (status.RuntimeStatus == OrchestrationRuntimeStatus.Pending || 
        status.RuntimeStatus == OrchestrationRuntimeStatus.Running)
    {
        context.SetCustomStatus("Cleanup still running, skipping");
        return;
    }
    
    // Call activity function
    await context.CallActivityAsync("PerformCleanup");
}

[Function("PerformCleanup")]
public static async Task PerformCleanup(
    IContactRepository repository,
    ILogger log)
{
    var staleContacts = await repository.GetStaleContactsAsync(30);
    foreach (var contact in staleContacts)
    {
        await repository.DeleteAsync(contact.Id);
    }
    log.LogInformation("Cleanup completed");
}
```

**Why Durable Functions:**
- Built-in orchestration state: prevents overlapping executions natively.
- Can retry activity functions, fan-out to parallel cleanup tasks, etc.
- Better for complex workflows.
- Slightly more overhead.

**Interview answer:** I use Blob Lease for simple single-operation cleanup. If the job is complex (multiple sub-steps, retry logic, fanning out to parallel workers), I use Durable Functions Orchestrator because it's built for that.

---

**Self-Evaluation:**

_(After your answer, we'll score it)_

---

**Concepts To Reinforce:**

1. Timer triggers can overlap if execution takes longer than interval.
2. Blob Lease is a cheap, distributed lock mechanism.
3. Durable Functions orchestrate complex workflows with built-in execution state.
4. Always handle lease conflict (HTTP 409) gracefully.
5. Set reasonable lease duration (5-10 minutes) to handle crashes.

---

## Overall Day 3 Reflection

- What clicked today?
- What needs more reinforcement?
- One thing to revisit before Day 4:
