using Listener.Utils;

namespace Listener.Events.CS1_6.Subhacks
{
  public class SmokeGranade
  {
    public static readonly Subhack Value = new Subhack("SmokeGranadeCount")
    {
      processName = "hl",
      moduleName = "hw.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x006E92AC },
      offsets = new int[] { 0x21C, 0x7C, 0x4, 0x320, 0x5C8, 0xA4, 0x614 },
      executeWhen = value => value != 0,
      newValue = 128
    };
    public static readonly Subhack ServerValue = new Subhack("SmokeGranadeServerCount")
    {
      processName = "hlds",
      moduleName = "swds.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x0087F18C },
      offsets = new int[] { 0x80, 0x530, 0x61C },
      executeWhen = value => value != 0,
      newValue = 128
    };
  }
}