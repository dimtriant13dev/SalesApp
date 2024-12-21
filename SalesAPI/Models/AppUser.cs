using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalesAPI.Models
{
    public class AppUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string? FirstName {get;set;}
       
        public DateOnly DateOfBirth {get;set;}
        public string? LastName {get;set;}

        [EmailAddress]
        public string? EmailAddress {get;set;}

        public DateTime Created {get;set;}=DateTime.UtcNow;

        public required string UserName { get; set; }

        public  byte[]? PasswordHash { get; set; }

        public  byte[]? PasswordSalt {get;set;}

        public Department Department {get;set;}

        public UserRoles UserRoles {get;set;}
        
    }
}