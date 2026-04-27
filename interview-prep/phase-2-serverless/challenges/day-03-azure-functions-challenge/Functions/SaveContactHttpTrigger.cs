using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Azure.Storage.Queues;
using ContactFunctions.Data;
using ContactFunctions.Models;
using FluentValidation;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace ContactFunctions.Functions
{
    public class SaveContactHttpTrigger
    {
        private readonly IContactRepository _repository;
        private readonly IValidator<Contact> _validator;
        private readonly ILogger<SaveContactHttpTrigger> _logger;

        public SaveContactHttpTrigger(
            IContactRepository repository,
            IValidator<Contact> validator,
            ILogger<SaveContactHttpTrigger> logger)
        {
            _repository = repository;
            _validator = validator;
            _logger = logger;
        }

        [Function("SaveContact")]
        public async Task<HttpResponseData> SaveContact(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "contacts")]
            HttpRequestData req)
        {
            try
            {
                _logger.LogInformation("SaveContact HTTP trigger invoked");

                var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var contact = JsonSerializer.Deserialize<Contact>(requestBody);

                if (contact == null)
                {
                    var badResponse = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                    await badResponse.WriteAsJsonAsync(new { error = "Request body must be valid JSON" });
                    return badResponse;
                }

                var validationResult = _validator.Validate(contact);
                if (!validationResult.IsValid)
                {
                    var badResponse = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                    await badResponse.WriteAsJsonAsync(
                        new
                        {
                            errors = validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage })
                        });
                    return badResponse;
                }

                await _repository.SaveAsync(contact);

                // In isolated worker, send queue message via SDK client.
                var storageConnection = Environment.GetEnvironmentVariable("AzureWebJobsStorage")
                    ?? "UseDevelopmentStorage=true";
                var queueClient = new QueueClient(storageConnection, "contact-processing");
                await queueClient.CreateIfNotExistsAsync();
                await queueClient.SendMessageAsync(JsonSerializer.Serialize(contact));

                var response = req.CreateResponse(System.Net.HttpStatusCode.Created);
                await response.WriteAsJsonAsync(new
                {
                    id = contact.Id,
                    name = contact.Name,
                    email = contact.Email,
                    createdAt = contact.CreatedAt,
                });
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in SaveContact");
                var errorResponse = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError);
                await errorResponse.WriteAsJsonAsync(new { error = "An error occurred processing your request" });
                return errorResponse;
            }
        }
    }
}
