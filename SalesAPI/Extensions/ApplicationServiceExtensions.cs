using Microsoft.EntityFrameworkCore;
using SalesAPI.Data;
using SalesAPI.Interfaces;
using SalesAPI.Services;

namespace SalesAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration config)
        {
            services.AddControllers();
            services.AddDbContext<DataContext>(options=>{
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors();
            services.AddScoped<ITokenRepository,TokenService>();

            return services;
        }
    }
}