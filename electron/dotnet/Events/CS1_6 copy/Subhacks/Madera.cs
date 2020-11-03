using Listener.Utils;

namespace Listener.Events.AOE2.Subhacks
{
  public class Madera
  {
    public static readonly Subhack Value = new Subhack("MaderaValue")
    {
      processName = "age2_x1",
      moduleName = "age2_x1.Exe",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x00387964 },
      offsets = new int[] { 0x18C, 0x4F8, 0xC, 0x88, 0xC, 0xA8, 0x4 },
      newValue = 50000F
    };
  }
}