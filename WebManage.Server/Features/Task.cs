using System.Diagnostics;
using System.Security.Principal;

namespace WebManage.Server.Features
{
    public class Task
    {
        public async static Task<ComputerProcess[]> GetRunningProcesses()
        {
            Process[] processes = Process.GetProcesses();
            ComputerProcess[] computerProcesses = new ComputerProcess[processes.Length];
            Dictionary<int, double> cpuUsage = cpuUsage = await getCpuUsageForProcessesAsync();
            Dictionary<int, double> ramUsage = getProcessesRamUsage();
            for (int i = 0; i < processes.Length; i++)
            {
                bool isWindowed = processes[i].MainWindowHandle != 0;
                computerProcesses[i] = new ComputerProcess
                {
                    Name = processes[i].ProcessName,
                    Id = processes[i].Id.ToString(),
                    IsWindowed = isWindowed,
                    CpuUsage = cpuUsage.ContainsKey(processes[i].Id) ? cpuUsage[processes[i].Id] : 0.0,
                    RamUsage = ramUsage.ContainsKey(processes[i].Id) ? ramUsage[processes[i].Id] : 0.0
                };
            }
            return computerProcesses;
        }

        public static async Task<ComputerProcess[]> getWindowedProcesses()
        {
            var allProcesses = await Task.GetRunningProcesses();
            return allProcesses.Where(p => p.IsWindowed).ToArray();
        }

        public static bool endTaskById(int id)
        {
            try
            {
                Process process = Process.GetProcessById(id);
                process.Kill();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error ending process with ID {id}: {ex.Message}");
                return false;
            }
        }

        //code to get CPU usage for a specific process by its ID from https://www.vbforums.com/showthread.php?891264-RESOLVED-Get-CPU-usage-of-specific-process
        public static async Task<Dictionary<int, double>> getCpuUsageForProcessesAsync()
        {
            Dictionary<int, TimeSpan> startCPU = new Dictionary<int, TimeSpan>();
            Dictionary<int, TimeSpan> endCPU = new Dictionary<int, TimeSpan>();
            Dictionary<int, double> cpuUsage = new Dictionary<int, double>();

            var startTime = DateTime.UtcNow;
            foreach (var process in Process.GetProcesses())
            {
                try { startCPU[process.Id] = process.TotalProcessorTime; } catch (Exception ex) {  }

            }

            await System.Threading.Tasks.Task.Delay(1000);

            var endTime = DateTime.UtcNow;
            foreach (var process in Process.GetProcesses())
            {
                try { endCPU[process.Id] = process.TotalProcessorTime; } catch (Exception ex) { }
            }

            foreach (var process in Process.GetProcesses())
            {
                try
                {
                    var cpuUsedMs = (endCPU[process.Id] - startCPU[process.Id]).TotalMilliseconds;
                    var totalMsPassed = (endTime - startTime).TotalMilliseconds;

                    double cpuUsageTotal = (cpuUsedMs / (totalMsPassed * Environment.ProcessorCount)) * 100;

                    cpuUsage[process.Id] = cpuUsageTotal;
                }
                catch (Exception ex)
                {
                }
            }
            return cpuUsage;
        }

        public static Dictionary<int, double> getProcessesRamUsage()
        {
            Dictionary<int, double> RamUsage = new Dictionary<int, double>();

            foreach (var process in Process.GetProcesses())
            {
                try
                {
                    process.Refresh();
                    long memorySize = process.WorkingSet64;
                    double memorySizeInMB = memorySize / (1024.0 * 1024.0);
                    RamUsage[process.Id] = memorySizeInMB;
                }
                catch (Exception ex) { Console.WriteLine($"Error accessing process with ID {process.Id}: {ex.Message}"); }
            }
            return RamUsage;
        }

    }
    public class ComputerProcess
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public bool IsWindowed { get; set; }
        public double CpuUsage { get; set; }
        public double RamUsage { get; set; }

    }
}
