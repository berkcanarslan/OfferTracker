// Program.cs in the API layer

using System.Net;
using Microsoft.EntityFrameworkCore;
using OfferTracker.Business.Services;
using OfferTracker.Data.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        builder => builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IOfferTrackerService, OfferTrackerService>();
builder.Services.AddScoped<IOfferTrackerRepository, OfferTrackerRepository>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 23))); // Adjust the version based on your MySQL server version
});

// Other services and configurations...

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowOrigin");  // Enable CORS
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();