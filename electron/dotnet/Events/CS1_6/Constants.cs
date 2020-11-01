using Listener.Utils;

namespace Listener.Events.CS1_6
{
    public class Constants
    {
        public const string HACK_NAME = "CS1_6_InfiniteMoney";
        public static Subhack[] subhacks = new Subhack[]
        {
            new Subhack("MoneyValue") {
                processName = "hl",
                moduleName = "hw.dll",
                type = Subhack.Types.POINTER,
                moduleBaseAddress = 0x007BBD9C,
                offsets = new int[] { 0x7c, 0x1cc },
                newValue = 16000
            },
            new Subhack("MoneyUI") {
                processName = "hl",
                moduleName = "client.dll",
                type = Subhack.Types.ADDRESS,
                moduleBaseAddress = 0x1213C4,
                offsets = new int[] { },
                newValue = 16000
            }
        };
    }
}
