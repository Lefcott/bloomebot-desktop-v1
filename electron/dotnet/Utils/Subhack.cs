using System;
using System.Threading.Tasks;

namespace Listener.Utils
{
  public class Subhack
  {
    public string name;
    public Subhack (string Name) {
      name = Name;
    }
    public string processName { get; set; }
    public string moduleName { get; set; }
    public enum Types { POINTER, ADDRESS }
    public Types type { get; set; }
    public int moduleBaseAddress { get; set; }
    public int[] offsets { get; set; }
    public int newValue { get; set; }

    public void Execute ()
        {
            var processes = Utils.Memory.GetProcesses(processName);
            if (processes.Length == 0)
            {
                Console.WriteLine($"Processes with name {processName} not found");
                return;
            }
            var process = processes[0];
            Utils.Memory.OpenProcess(Utils.Memory.ProcessAccessFlags.All, false, (int)process.Id);
            VAMemory memory = new VAMemory(processName);
            IntPtr moduleAddress = Utils.Memory.GetModuleAddress(process, moduleName);

            int currentValue;
            switch (type) {
              case Types.POINTER:
                int baseAddress = memory.ReadInt32(moduleAddress + moduleBaseAddress);
                IntPtr pointer = Utils.Memory.GetPointer(memory, baseAddress, offsets);
                currentValue = memory.ReadInt32(pointer);

                Console.WriteLine($"Current {name}: {currentValue}, on {moduleName}");
                memory.WriteInteger(pointer, newValue);
                break;
              case Types.ADDRESS:
                currentValue = memory.ReadInt32(moduleAddress + moduleBaseAddress);

                Console.WriteLine($"Current {name}: {currentValue}, on {moduleName}");
                memory.WriteInteger(moduleAddress + moduleBaseAddress, newValue);
                break;
            }
        }
  }
  public class SubhackExecutor {
    public static async Task Execute (Subhack[] subhacks)
    {
      foreach (var subhack in subhacks)
      {
        subhack.Execute();
      }
      await Task.Delay(50);
    }
  }
}