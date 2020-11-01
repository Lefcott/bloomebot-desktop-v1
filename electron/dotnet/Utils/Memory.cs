using System;
using System.Text;
using System.IO;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Collections.Generic;

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
            IntPtr moduleAddress = new IntPtr();
            bool found = false;
            var modules = process.Modules;
            foreach (ProcessModule module in modules)
            {

                if (module.ModuleName == moduleName)
                {
                    moduleAddress = module.BaseAddress;
                    Console.WriteLine($"Found Module: {module.ModuleName} with address {moduleAddress}");
                    found = true;
                    break;
                }
            }
            if (!found) Console.WriteLine($"Address not found for module '{moduleName}' (Process '{process.ProcessName}' has {process.Modules.Count})");
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
        static extern IntPtr OpenProcess(ProcessAccessFlags dwDesiredAccess, [MarshalAs(UnmanagedType.Bool)] bool bInheritHandle, int dwProcessId);
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
    }
}