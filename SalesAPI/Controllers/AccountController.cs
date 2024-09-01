using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesAPI.Data;
using SalesAPI.DTOs;
using SalesAPI.Interfaces;
using SalesAPI.Models;
namespace SalesAPI.Controllers
{
    public class AccountController(DataContext context,ITokenRepository tokenRepository) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExist(registerDto.UserName)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var id = context.Users.Max(x=>x.Id) + 1;
            var user = new AppUser
            {
                Id = id,
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            context.Users.Add(user);

            await context.SaveChangesAsync();

            return new UserDto
            {
                UserName = user.UserName,
                Token =  tokenRepository.CreateToken(user)
            };
        }

        public async Task<bool> UserExist(string username)
        {
            return await context.Users.AnyAsync(x=>x.UserName.ToLower()== username.ToLower());
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(x=>x.UserName==loginDto.UserName.ToLower());

            if(user == null) return Unauthorized("Invalid UserName or Password");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password"); 
            }

           return new UserDto
            {
                UserName = user.UserName,
                Token =  tokenRepository.CreateToken(user)
            };
        }
    }
}