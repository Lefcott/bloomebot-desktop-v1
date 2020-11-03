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
    public static readonly Subhack ServerRealValue = new Subhack("MoneyServerRealValue")
    {
      processName = "hlds",
      moduleName = "swds.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x0086DC54 },
      offsets = new int[] { 0x130, 0x6B4, 0x2B4, 0x20C, 0x20C, 0x7C, 0x1CC },
      newValue = 16000
    };

  }
}