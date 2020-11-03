using System;
using System.Threading.Tasks;

namespace Listener.Utils
{
  public class Subhack
  {
    public string name;
    public Subhack(string Name)
    {
      name = Name;
    }
    public string processName { get; set; }
    public string moduleName { get; set; }
    public enum AccessTypes { POINTER, ADDRESS }
    public AccessTypes accessType { get; set; }
    public enum ValueTypes { INT, FLOAT }
    public ValueTypes valueType { get; set; }
    public int[] moduleBaseAddresses { get; set; }
    public int[] offsets { get; set; }
    public Func<dynamic, bool> executeWhen { get; set; }
    public dynamic newValue { get; set; }
    public float? changeMultiplier { get; set; }
    public dynamic lastValue { get; set; }

    private bool WriteValue(VAMemory memory, IntPtr pointer)
    {
      Type type = newValue.GetType();
      if (type.Equals(typeof(int))) return memory.WriteInteger(pointer, newValue);
      if (type.Equals(typeof(float))) return memory.WriteFloat(pointer, newValue);
      return false;
    }
    private dynamic GetValue(VAMemory memory, IntPtr pointer)
    {
      Type type = newValue.GetType();
      if (type.Equals(typeof(int))) return memory.ReadInt32(pointer);
      if (type.Equals(typeof(float))) return memory.ReadFloat(pointer);
      return false;
    }
    private bool HasToExecute(dynamic value)
    {
      if (changeMultiplier != null)
      {
        if (lastValue == null)
        {
          lastValue = value;
          return false;
        }
        newValue = lastValue + (value - lastValue) * changeMultiplier;
        Console.WriteLine($"V: {lastValue}, {value}, {newValue}");
        lastValue = newValue;
      }

      return executeWhen == null || executeWhen(value);
    }
    public void Execute()
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
      if (moduleAddress == IntPtr.Zero) return;

      dynamic currentValue;
      foreach (int moduleBaseAddress in moduleBaseAddresses)
      {
        switch (accessType)
        {
          case AccessTypes.POINTER:
            int baseAddress = memory.ReadInt32(moduleAddress + moduleBaseAddress);
            IntPtr pointer = Utils.Memory.GetPointer(memory, baseAddress, offsets);
            currentValue = GetValue(memory, pointer);
            if (!HasToExecute(currentValue)) return;

            // Console.WriteLine($"Current {name}: {currentValue}, on {moduleName}");
            WriteValue(memory, pointer);
            break;
          case AccessTypes.ADDRESS:
            currentValue = GetValue(memory, moduleAddress + moduleBaseAddress);
            if (!HasToExecute(currentValue)) return;

            // Console.WriteLine($"Current {name}: {currentValue}, on {moduleName}");
            WriteValue(memory, moduleAddress + moduleBaseAddress);
            break;
        }
      }
    }
  }
  public class SubhackExecutor
  {
    public static async Task Execute(Subhack[] subhacks)
    {
      foreach (var subhack in subhacks) subhack.Execute();
      await Task.Delay(20);
    }
  }
}