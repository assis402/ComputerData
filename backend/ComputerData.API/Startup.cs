using ComputerData.Application.Data;
using ComputerData.Application.Data.Repositories;
using ComputerData.Application.Data.Repositories.Interfaces;
using ComputerData.Application.Services;
using ComputerData.Application.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Serialization;

namespace ComputerData.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IComputerRepository, ComputerRepository>();
            services.AddScoped<IComputerService, ComputerService>();

            var connection = Configuration.GetConnectionString("ComputerData");

            services.AddEntityFrameworkNpgsql()
                .AddDbContext<ComputerDataContext>(
                    options => options.UseNpgsql(connection));

            services.AddMemoryCache();

            services.AddControllers().AddNewtonsoftJson(opt =>
                opt.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddCors();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(option => option.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}