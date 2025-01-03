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
        public string? Comments {get;set;}
        public DateTime CreatedAt {get;set;}
        public DateTime UpdatedAt {get;set;}
        public virtual AppUser? AppUser {get;set;}
        public virtual ICollection<AppointMent>? AppointMents { get; set; }
    }
}