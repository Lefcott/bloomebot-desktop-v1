using Listener.Utils;

namespace Listener.Events.AOE2.Subhacks
{
  public class Food
  {
    public static readonly Subhack Value = new Subhack("FoodValue")
    {
      processName = "age2_x1",
      moduleName = "age2_x1.Exe",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x002B45AC },
      offsets = new int[] { 0xB8, 0xC, 0x84, 0x1B0, 0xC, 0xA8, 0x0 },
      newValue = 50000F
    };
  }
}