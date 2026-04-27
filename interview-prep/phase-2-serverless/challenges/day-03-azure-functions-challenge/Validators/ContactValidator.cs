using FluentValidation;
using ContactFunctions.Models;

namespace ContactFunctions.Validators
{
    public class ContactValidator : AbstractValidator<Contact>
    {
        public ContactValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MinimumLength(2).WithMessage("Name must be at least 2 characters");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email must be valid");

            RuleFor(x => x.Phone)
                .Matches(@"^\+?1?\d{9,15}$").When(x => !string.IsNullOrEmpty(x.Phone))
                .WithMessage("Phone must be a valid format");
        }
    }
}
