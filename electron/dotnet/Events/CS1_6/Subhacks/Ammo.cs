using Listener.Utils;

namespace Listener.Events.CS1_6.Subhacks
{
  public class Ammo
  {
    public static readonly Subhack Value = new Subhack("AmmoValue")
    {
      processName = "hl",
      moduleName = "hw.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x007BBD9C },
      offsets = new int[] { 0x8, 0x0, 0x4, 0x4, 0x74, 0x5D8, 0xCC },
      newValue = 128
    };
    public static readonly Subhack ServerValue = new Subhack("AmmoServerValue")
    {
      processName = "hlds",
      moduleName = "hlds.exe",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x000239F8 },
      offsets = new int[] { 0x1D4, 0x24, 0x7C, 0x5C4, 0xA4, 0x5D4, 0xCC },
      newValue = 128
    };
  }
}