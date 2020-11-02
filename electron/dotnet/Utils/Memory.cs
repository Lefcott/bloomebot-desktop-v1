using System;
using System.IO;
using System.Text;
using System.Diagnostics;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace Listener.Utils
{
  public class Memory
  {
    public static void Write(Process process, IntPtr address, byte[] bytes)
    {
      var hProc = OpenProcess(ProcessAccessFlags.All, false, (int)process.Id);

      int wtf = 0;
      WriteProcessMemory(hProc, address, bytes, (UInt32)bytes.LongLength, out wtf);

      CloseHandle(hProc);
    }
    public static Process[] GetProcesses(string name)
    {
      return Process.GetProcessesByName(name);
    }
    public static IntPtr GetModuleAddress(Process process, string moduleName)
    {
      IntPtr moduleAddress = IntPtr.Zero;
      bool found = false;
      var modules = CollectModules(process);
      for (var i = 0; i < modules.Count; i++)
      {
        var module = modules[i];
        if (module.ModuleName == moduleName)
        {
          moduleAddress = module.BaseAddress;
          // Console.WriteLine($"Found module \"{module.ModuleName}\" with address \"{moduleAddress}\"");
          found = true;
          break;
        }
      }
      if (!found) Console.WriteLine($"Address not found for module '{moduleName}' (Process '{process.ProcessName}')");
      return moduleAddress;
    }
    public static IntPtr GetPointer(VAMemory memory, int initialAddress, int[] offsets)
    {
      int currentValue = initialAddress;
      IntPtr currentPointer = (IntPtr)initialAddress;
      for (int i = 0; i < offsets.Length; i += 1)
      {
        int offset = offsets[i];
        currentPointer = (IntPtr)currentValue + offset;
        currentValue = memory.ReadInt32(currentPointer);
      }
      return currentPointer;
    }
    [DllImport("kernel32.dll")]
    static public extern IntPtr OpenProcess(ProcessAccessFlags dwDesiredAccess, [MarshalAs(UnmanagedType.Bool)] bool bInheritHandle, int dwProcessId);
    [DllImport("kernel32.dll")]
    public static extern IntPtr GetModuleHandle(string lpModuleName);

    [DllImport("kernel32.dll", SetLastError = true)]
    static extern bool WriteProcessMemory(IntPtr hProcess, IntPtr lpBaseAddress, byte[] lpBuffer, uint nSize, out int lpNumberOfBytesWritten);

    [DllImport("kernel32.dll")]
    public static extern Int32 CloseHandle(IntPtr hProcess);
    [Flags]
    public enum ProcessAccessFlags : uint
    {
      All = 0x001F0FFF,
      Terminate = 0x00000001,
      CreateThread = 0x00000002,
      VMOperation = 0x00000008,
      VMRead = 0x00000010,
      VMWrite = 0x00000020,
      DupHandle = 0x00000040,
      SetInformation = 0x00000200,
      QueryInformation = 0x00000400,
      Synchronize = 0x00100000
    }
    public static List<Module> CollectModules(Process process)
    {
      List<Module> collectedModules = new List<Module>();

      IntPtr[] modulePointers = new IntPtr[0];
      int bytesNeeded = 0;

      try
      {
        // Determine number of modules
        if (!Native.EnumProcessModulesEx(process.Handle, modulePointers, 0, out bytesNeeded, (uint)Native.ModuleFilter.ListModulesAll))
        {
          return collectedModules;
        }
      }
      catch (System.InvalidOperationException)
      {
        Console.WriteLine($"InvalidOperationException: Game may be closed");
        return collectedModules;
      }

      int totalNumberofModules = bytesNeeded / IntPtr.Size;
      modulePointers = new IntPtr[totalNumberofModules];

      // Collect modules from the process
      if (Native.EnumProcessModulesEx(process.Handle, modulePointers, bytesNeeded, out bytesNeeded, (uint)Native.ModuleFilter.ListModulesAll))
      {
        for (int index = 0; index < totalNumberofModules; index++)
        {
          StringBuilder moduleFilePath = new StringBuilder(1024);
          Native.GetModuleFileNameEx(process.Handle, modulePointers[index], moduleFilePath, (uint)(moduleFilePath.Capacity));

          string moduleName = Path.GetFileName(moduleFilePath.ToString());
          Native.ModuleInformation moduleInformation = new Native.ModuleInformation();
          Native.GetModuleInformation(process.Handle, modulePointers[index], out moduleInformation, (uint)(IntPtr.Size * (modulePointers.Length)));

          // Convert to a normalized module and add it to our list
          Module module = new Module(moduleName, moduleInformation.lpBaseOfDll, moduleInformation.SizeOfImage);
          collectedModules.Add(module);
        }
      }

      return collectedModules;
    }
  }
  public class Native
  {
    [StructLayout(LayoutKind.Sequential)]
    public struct ModuleInformation
    {
      public IntPtr lpBaseOfDll;
      public uint SizeOfImage;
      public IntPtr EntryPoint;
    }

    internal enum ModuleFilter
    {
      ListModulesDefault = 0x0,
      ListModules32Bit = 0x01,
      ListModules64Bit = 0x02,
      ListModulesAll = 0x03,
    }

    [DllImport("psapi.dll")]
    public static extern bool EnumProcessModulesEx(IntPtr hProcess, [MarshalAs(UnmanagedType.LPArray, ArraySubType = UnmanagedType.U4)][In][Out] IntPtr[] lphModule, int cb, [MarshalAs(UnmanagedType.U4)] out int lpcbNeeded, uint dwFilterFlag);

    [DllImport("psapi.dll")]
    public static extern uint GetModuleFileNameEx(IntPtr hProcess, IntPtr hModule, [Out] StringBuilder lpBaseName, [In][MarshalAs(UnmanagedType.U4)] uint nSize);

    [DllImport("psapi.dll", SetLastError = true)]
    public static extern bool GetModuleInformation(IntPtr hProcess, IntPtr hModule, out ModuleInformation lpmodinfo, uint cb);
  }

  public class Module
  {
    public Module(string moduleName, IntPtr baseAddress, uint size)
    {
      this.ModuleName = moduleName;
      this.BaseAddress = baseAddress;
      this.Size = size;
    }

    public string ModuleName { get; set; }
    public IntPtr BaseAddress { get; set; }
    public uint Size { get; set; }
  }
}