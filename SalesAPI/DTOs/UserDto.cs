namespace SalesAPI;

public class UserDto
{
    public Guid Id { get; set; }
    
    public required string  UserName { get; set; }

    public required string Token {get;set;}
}