using Listener.Utils;

namespace Listener.Events.CS1_6.Subhacks
{
  public class Flashbang
  {
    public static readonly Subhack Value = new Subhack("FlashbangCount")
    {
      processName = "hl",
      moduleName = "hw.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x007BBD9C },
      offsets = new int[] { 0x7C, 0x60C },
      executeWhen = value => value != 0,
      newValue = 128
    };
  }
}