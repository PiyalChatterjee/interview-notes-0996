using System;
using System.Threading.Tasks;
using Azure;
using Azure.Storage.Blobs;
using ContactFunctions.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace ContactFunctions.Functions
{
    public class CleanupStaleContactsTimerTrigger
    {
        private readonly IContactRepository _repository;
        private readonly ILogger<CleanupStaleContactsTimerTrigger> _logger;

        public CleanupStaleContactsTimerTrigger(
            IContactRepository repository,
            ILogger<CleanupStaleContactsTimerTrigger> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [Function("CleanupStaleContacts")]
        public async Task CleanupStaleContacts([TimerTrigger("0 0 * * * *")] TimerInfo myTimer)
        {
            BlobClient? lockBlob = null;

            try
            {
                _logger.LogInformation("Cleanup timer triggered at {NowUtc}", DateTime.UtcNow);

                var storageConnection = Environment.GetEnvironmentVariable("AzureWebJobsStorage")
                    ?? "UseDevelopmentStorage=true";
                var containerClient = new BlobContainerClient(storageConnection, "function-locks");
                await containerClient.CreateIfNotExistsAsync();

                lockBlob = containerClient.GetBlobClient("cleanup-lock");

                // Simple distributed lock: create lock blob only if it does not exist.
                try
                {
                    await lockBlob.UploadAsync(BinaryData.FromString(DateTime.UtcNow.ToString("O")), overwrite: false);
                    _logger.LogInformation("Lock acquired, starting cleanup");
                }
                catch (RequestFailedException ex) when (ex.Status == 409)
                {
                    _logger.LogInformation("Cleanup already in progress, skipping this run");
                    return;
                }

                var startTime = DateTime.UtcNow;
                var staleContacts = await _repository.GetStaleContactsAsync(daysOld: 30);

                var deletedCount = 0;
                foreach (var contact in staleContacts)
                {
                    await _repository.DeleteAsync(contact.Id);
                    deletedCount++;
                }

                var duration = DateTime.UtcNow - startTime;
                _logger.LogInformation(
                    "Cleanup completed in {DurationSeconds:F2}s. Deleted {DeletedCount} contacts",
                    duration.TotalSeconds,
                    deletedCount);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during cleanup");
            }
            finally
            {
                if (lockBlob != null)
                {
                    try
                    {
                        await lockBlob.DeleteIfExistsAsync();
                        _logger.LogInformation("Lock released");
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Failed to release lock");
                    }
                }
            }
        }
    }
}
