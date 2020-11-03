using Listener.Utils;

namespace Listener.Events.AOE2.Subhacks
{
  public class Gold
  {
    public static readonly Subhack Value = new Subhack("GoldValue")
    {
      processName = "age2_x1",
      moduleName = "age2_x1.Exe",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x00295794 },
      offsets = new int[] { 0x54, 0x8, 0x0, 0x850, 0xA8, 0xC },
      newValue = 50000F
    };
  }
}