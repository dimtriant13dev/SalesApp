using SalesAPI.Models;

namespace SalesAPI.Interfaces
{
    public interface ITokenRepository
    {
        string CreateToken(AppUser user);
    }
}