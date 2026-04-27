using System;
using System.Text.Json;
using System.Threading.Tasks;
using Azure;
using Azure.Storage.Blobs;
using ContactFunctions.Data;
using ContactFunctions.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace ContactFunctions.Functions
{
    public class ProcessContactQueueTrigger
    {
        private readonly IContactRepository _repository;
        private readonly ILogger<ProcessContactQueueTrigger> _logger;

        public ProcessContactQueueTrigger(
            IContactRepository repository,
            ILogger<ProcessContactQueueTrigger> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [Function("ProcessContact")]
        public async Task ProcessContact(
            [QueueTrigger("contact-processing")] Contact contact,
            FunctionContext context)
        {
            var retryCount = context.RetryContext?.RetryCount ?? 0;

            try
            {
                _logger.LogInformation("Processing contact {ContactId} ({Email})", contact.Id, contact.Email);

                var storageConnection = Environment.GetEnvironmentVariable("AzureWebJobsStorage")
                    ?? "UseDevelopmentStorage=true";
                var containerClient = new BlobContainerClient(storageConnection, "contact-backups");
                await containerClient.CreateIfNotExistsAsync();

                var backupBlob = containerClient.GetBlobClient($"{contact.Id}.json");
                var json = JsonSerializer.Serialize(contact);
                await backupBlob.UploadAsync(BinaryData.FromString(json), overwrite: true);

                _logger.LogInformation("Backup created for contact {ContactId}", contact.Id);
                await _repository.SaveAsync(contact);
            }
            catch (RequestFailedException ex) when (retryCount < 3)
            {
                _logger.LogWarning(ex, "Transient storage error on retry {RetryCount}", retryCount);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing contact {ContactId}", contact.Id);
                throw;
            }
        }
    }
}
