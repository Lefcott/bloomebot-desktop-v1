using Listener.Utils;

namespace Listener.Events.CS1_6.Subhacks
{
  public class Money
  {
    public static readonly Subhack RealValue = new Subhack("MoneyRealValue")
    {
      processName = "hl",
      moduleName = "hw.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x007BBD9C },
      offsets = new int[] { 0x7c, 0x1cc },
      newValue = 16000
    };
    public static readonly Subhack UIValue = new Subhack("MoneyUIValue")
    {
      processName = "hl",
      moduleName = "client.dll",
      accessType = Subhack.AccessTypes.ADDRESS,
      moduleBaseAddresses = new int[] { 0x1213C4 },
      offsets = new int[] { },
      newValue = 16000
    };
  }
}