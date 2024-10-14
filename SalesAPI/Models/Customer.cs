using System.ComponentModel.DataAnnotations;

namespace SalesAPI.Models
{
    public class Customer
    {
        [Key]
        public Guid Id {get;set;}
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Title { get; set; }
        public string? VatNumber { get; set; }
        public string? PhoneNumber {get;set;}
    }
}