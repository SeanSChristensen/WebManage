using System.Diagnostics;
using System.Security.Principal;

namespace WebManage.Server.Features
{
    public class Task
    {
        public static ComputerProcess[] GetRunningProcesses()
        {
            Process[] processes = Process.GetProcesses();
            ComputerProcess[] computerProcesses = new ComputerProcess[processes.Length];
            for(int i = 0; i < processes.Length; i++)
            {
                bool isWindowed = processes[i].MainWindowHandle != 0;
                computerProcesses[i] = new ComputerProcess
                {
                    Name = processes[i].ProcessName,
                    Id = processes[i].Id.ToString(),
                    IsWindowed = isWindowed
                };
            }
            return computerProcesses;
        }

        public static ComputerProcess[] getWindowedProcesses() {
            var allProcesses = Task.GetRunningProcesses();
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
    }
    public class ComputerProcess
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public bool IsWindowed { get; set; }
    }
}
