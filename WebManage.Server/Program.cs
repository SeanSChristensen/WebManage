using NAudio.CoreAudioApi;
using System.Diagnostics;
using WebManage.Server.Features;
using System.Threading;

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

//Made with assistance from https://github.com/naudio/NAudio/issues/665
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

app.MapGet("/sounds", () =>
{
    MMDeviceEnumerator MMDE = new MMDeviceEnumerator();
    var a = MMDE.GetDefaultAudioEndpoint(DataFlow.Render, (Role)DeviceState.Active);
    var sessions = a.AudioSessionManager.Sessions;
    Volume[] volumeSessionNames = new Volume[sessions.Count];

    for (int i = 0; i < sessions.Count; i++)
    {
        var process = Process.GetProcessById((int)sessions[i].GetProcessID);
        volumeSessionNames[i] = new Volume(process.Id, process.ProcessName);
    }

    return volumeSessionNames;
});

//Made with help from https://stackoverflow.com/questions/51193103/how-to-get-total-cpu-usage-all-processes-c
app.MapGet("/cpu", async () =>
{
var performance = new PerformanceCounter("Processor", "% Processor Time", "_Total");

    var first = performance.NextValue();

    await System.Threading.Tasks.Task.Delay(1000);

    return performance.NextValue();
});


app.MapFallbackToFile("/index.html");

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
