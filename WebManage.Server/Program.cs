using NAudio;
using NAudio.CoreAudioApi;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using WebManage.Server.Features;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add services to the container.

var app = builder.Build();

app.UseCors("AllowAll");
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
});

app.MapGet("/getprocesses", () =>
{
 return WebManage.Server.Features.Task.GetRunningProcesses();
});

app.MapGet("/getwindowedprocesses", () =>
{
    return WebManage.Server.Features.Task.getWindowedProcesses();
});

app.MapGet("/end/{id}", (int id) =>
{
    Process processes = Process.GetProcessById(id);
    processes.Kill();
    return "done";
});

app.MapGet("/sounds/{programID}/{volume}", (int programID, int volume) =>
{
    MMDeviceEnumerator MMDE = new MMDeviceEnumerator();
    var a = MMDE.GetDefaultAudioEndpoint(DataFlow.Render, (Role)DeviceState.Active);
    var sessions = a.AudioSessionManager.Sessions;

    for (int i = 0; i < sessions.Count; i++)
    {
        if (sessions[i].GetProcessID == programID)
        {
            Single value = (float)(volume * 0.01);
            sessions[i].SimpleAudioVolume.Volume = value;
        }
    }
});


app.MapFallbackToFile("/index.html");

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
