using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FluentValidation;
using ContactFunctions.Data;
using ContactFunctions.Models;
using ContactFunctions.Validators;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        services.AddLogging();
        services.AddScoped<IValidator<Contact>, ContactValidator>();
        services.AddScoped<IContactRepository, ContactRepository>();
    })
    .Build();

host.Run();
