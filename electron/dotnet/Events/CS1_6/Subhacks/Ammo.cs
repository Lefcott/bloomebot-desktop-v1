using Listener.Utils;

namespace Listener.Events.CS1_6.Subhacks
{
  public class Ammo
  {
    public static readonly Subhack AmmoValue = new Subhack("AmmoValue")
    {
      processName = "hl",
      moduleName = "hw.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x007BBD9C },
      offsets = new int[] { 0x8, 0x0, 0x4, 0x4, 0x74, 0x5D8, 0xCC },
      newValue = 128
    };
  }
}