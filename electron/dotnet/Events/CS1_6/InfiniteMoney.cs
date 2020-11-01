using System;
using System.Threading.Tasks;
using System.Diagnostics;

namespace Listener.Events.CS1_6
{
    public class InfiniteMoney
    {

        static bool activated = false;
        public static void Activate()
        {
            if (activated) return;
            activated = true;
            Console.WriteLine("Infinite Money Activated!");
            Execute();
        }
        public static void Deactivate()
        {
            if (!activated) return;
            activated = false;
            Console.WriteLine("Infinite Money Deactivated!");
        }
        static async void Execute()
        {
            IntPtr baseAddress;
            Process[] processes;
            Process process;
            while (activated)
            {
                processes = Utils.Memory.GetProcesses(Constants.PROCESS_NAME);
                if (processes.Length == 0)
                {
                    Console.WriteLine("No proccesses found");
                    await Task.Delay(1000);
                    continue;
                }
                Console.WriteLine($"Processes count: {processes.Length}");
                process = processes[0];
                foreach (ProcessModule module in process.Modules)
                {
                    Console.WriteLine($"Found module {module.ModuleName}");
                }
                VAMemory memory = new VAMemory(Constants.PROCESS_NAME);
                IntPtr moduleAddress = Utils.Memory.GetModuleAddress(process, Constants.MODULE_NAME);
                int finalAddress = memory.ReadInt32(moduleAddress + 0x0000138C);

                IntPtr moneyPointer = Utils.Memory.GetPointer(memory, finalAddress, Constants.MONEY_OFFSETS);
                int money = memory.ReadInt32(moneyPointer);
                Console.WriteLine($"Current Money: {money}");
                // memory.WriteInt32((IntPtr)money, 16000);
                // int money = memory.ReadInt32((IntPtr)finalAddress + 0x430);
                // money = memory.ReadInt32((IntPtr)money + 0x4b8);
                // money = memory.ReadInt32((IntPtr)money + 0x21c);
                // money = memory.ReadInt32((IntPtr)money + 0x7c);
                // money = memory.ReadInt32((IntPtr)money + 0x4);
                // money = memory.ReadInt32((IntPtr)money + 0x320);
                // money = memory.ReadInt32((IntPtr)money + 0x1cc);

                await Task.Delay(1000);
            }
        }
    }
}
