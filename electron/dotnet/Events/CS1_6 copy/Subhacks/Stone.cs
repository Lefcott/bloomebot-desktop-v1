using Listener.Utils;

namespace Listener.Events.AOE2.Subhacks
{
  public class Stone
  {
    public static readonly Subhack Value = new Subhack("StoneValue")
    {
      processName = "age2_x1",
      moduleName = "age2_x1.Exe",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x00387964 },
      offsets = new int[] { 0x18C, 0x678, 0x0, 0x48, 0xC, 0xA8, 0x8 },
      newValue = 50000F
    };
  }
}