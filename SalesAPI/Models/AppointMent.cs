namespace SalesAPI.Models
{
    public class AppointMent
    {
        public Guid Id {get;set;}
        public string? Title {get;set;}
        public DateTime Date { get; set; }
        public string? Comments { get; set; }
        public virtual Customer? Customer {get;set;}
        public virtual AppUser? AppUser {get;set;}
    }
}