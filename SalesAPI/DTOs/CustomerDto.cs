using SalesAPI.Models;

namespace SalesAPI.DTOs
{
    public class CustomerDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Title { get; set; }
        public string? VatNumber { get; set; }
        public string? PhoneNumber {get;set;}
        public string? Comments {get;set;}
        public DateTime CreatedAt {get;set;}
        public DateTime UpdatedAt {get;set;}
        public AppUser? AppUser {get;set;}
    }
}