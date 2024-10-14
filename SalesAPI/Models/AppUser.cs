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
       
        public string? LastName {get;set;}

        [EmailAddress]
        public string? EmailAddress {get;set;}

        public required string UserName { get; set; }

        public required byte[] PasswordHash { get; set; }

        public required byte[] PasswordSalt {get;set;}

        public Department Department {get;set;}

        public UserRoles UserRoles {get;set;}
        
    }
}