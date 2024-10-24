var builder = WebApplication.CreateBuilder(args);
var CorsPolicy = "_ApiCorsPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsPolicy,
    policy =>
    {
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add dependencies 
builder.Services.AddScoped<IYtDlpProcess, YtDlpProcess>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<ITaggingService, TaggingService>();


var app = builder.Build();

app.UseSwagger(c =>
{
    // Configure Swagger to output YAML instead of JSON
    c.SerializeAsV2 = false; // Optional, if you want OpenAPI v2 spec in YAML
    c.RouteTemplate = "swagger/{documentName}/swagger.yaml"; // Serve YAML file at this route
});

app.UseSwaggerUI(c =>
{
    // Point to the YAML Swagger spec
    c.SwaggerEndpoint("/swagger/v1/swagger.yaml", "Your API V1 Docs (YAML)");
    c.RoutePrefix = "swagger";  // This is optional; it sets the URL path for Swagger UI
});

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();
app.UseRouting();

app.UseCors(CorsPolicy);

app.MapControllers();

app.Run();
