using System;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace Listener.Utils
{
    public class Memory
    {
        public static void Write(string processName, int address, byte[] bytes)
        {
            var processes = Process.GetProcessesByName(processName);
            if (processes.Length == 0) return;
            var process = processes[0];
            var hProc = OpenProcess(ProcessAccessFlags.All, false, (int)process.Id);

            int wtf = 0;
            WriteProcessMemory(hProc, new IntPtr(address), bytes, (UInt32)bytes.LongLength, out wtf);

            CloseHandle(hProc);
        }
        [DllImport("kernel32.dll")]
        static extern IntPtr OpenProcess(ProcessAccessFlags dwDesiredAccess, [MarshalAs(UnmanagedType.Bool)] bool bInheritHandle, int dwProcessId);

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