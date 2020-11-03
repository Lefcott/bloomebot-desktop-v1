using Listener.Utils;

namespace Listener.Events.CS1_6.Subhacks
{
  public class Life
  {
    public static readonly Subhack RealValue = new Subhack("LifeRealValue")
    {
      processName = "hl",
      moduleName = "hw.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x007BBD9C },
      offsets = new int[] { 0x1E0 },
      newValue = 999F
    };
    public static readonly Subhack UIValue = new Subhack("LifeUIValue")
    {
      processName = "hl",
      moduleName = "client.dll",
      accessType = Subhack.AccessTypes.ADDRESS,
      moduleBaseAddresses = new int[] { /*0xF4B04, */0x11D640 },
      offsets = new int[] { },
      newValue = 999
    };
    public static readonly Subhack ServerRealValue = new Subhack("ServerRealValue")
    {
      processName = "hlds",
      moduleName = "swds.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x00472AA0 },
      offsets = new int[] { 0x504 },
      newValue = 999F
    };
  }
}