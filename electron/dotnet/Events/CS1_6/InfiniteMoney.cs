using System;
using System.Threading.Tasks;

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
            while (activated)
            {
                Utils.Memory.Write("hl", Constants.MONEY_ADDRESS, new byte[2] { 18, 60 });
                await Task.Delay(1000);
            }
        }
    }
}
