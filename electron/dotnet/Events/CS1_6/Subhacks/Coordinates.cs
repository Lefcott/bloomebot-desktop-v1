using Listener.Utils;

namespace Listener.Events.CS1_6.Subhacks
{
  public class Coordinates
  {
    public static readonly Subhack XServerRealValue = new Subhack("XServerRealValue")
    {
      processName = "hlds",
      moduleName = "hlds.exe",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x00004850 },
      offsets = new int[] { 0x770, 0x724, 0x254, 0xFB4, 0xF88, 0xC, 0x8 },
      newValue = 200F
    };
    public static readonly Subhack YServerRealValue = new Subhack("YServerRealValue")
    {
      processName = "hlds",
      moduleName = "hlds.exe",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x00004850 },
      offsets = new int[] { 0x770, 0x724, 0x254, 0xFB4, 0xF88, 0xC, 0xC },
      newValue = 200F
    };
    public static readonly Subhack ZServerRealValue = new Subhack("ZServerRealValue")
    {
      processName = "hlds",
      moduleName = "hlds.exe",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x000239F8 },
      offsets = new int[] { 0xB0, 0xA4, 0x90 },
      newValue = 200F
    };
  }
}