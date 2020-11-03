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
    public static readonly Subhack ServerValue = new Subhack("FlashbangServerCount")
    {
      processName = "hlds",
      moduleName = "hlds.exe",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x000239F8 },
      offsets = new int[] { 0xB4, 0x8, 0x98, 0x288, 0x7C, 0x60C },
      executeWhen = value => value != 0,
      newValue = 128
    };
  }
}