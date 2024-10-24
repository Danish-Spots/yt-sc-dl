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

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
app.UseSwagger();
app.UseSwaggerUI();

// app.UseHttpsRedirection();
app.UseRouting();

app.UseCors(CorsPolicy);

app.MapControllers();

app.Run();
