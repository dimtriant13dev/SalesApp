using System.ComponentModel.DataAnnotations;

namespace SalesAPI.DTOs
{
    public class RegisterDto
    {
        [Required]
        public required string UserName {get;set;}

        [Required]
        public required string Password {get;set;}

        public string? FirstName {get;set;}
       
        public DateOnly DateOfBirth {get;set;}
        public string? LastName {get;set;}

        [EmailAddress]
        public string? EmailAddress {get;set;}

        public DateTime Created {get;set;}=DateTime.UtcNow;

        public Department Department {get;set;}

        public UserRoles UserRoles {get;set;}

    }
}