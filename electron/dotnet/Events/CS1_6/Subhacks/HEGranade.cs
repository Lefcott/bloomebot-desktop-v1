using Listener.Utils;

namespace Listener.Events.CS1_6.Subhacks
{
  public class HEGranade
  {
    public static readonly Subhack Value = new Subhack("HEGranadeCount")
    {
      processName = "hl",
      moduleName = "hw.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x007BBD9C },
      offsets = new int[] { 0xC, 0x4, 0x0, 0x0, 0x74, 0x610 },
      executeWhen = value => value != 0,
      newValue = 128
    };
    public static readonly Subhack ServerValue = new Subhack("HEGranadeServerCount")
    {
      processName = "hlds",
      moduleName = "swds.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x0042501C },
      offsets = new int[] { 0x8, 0x4, 0x280, 0x7C, 0x5D8, 0xA4, 0x610 },
      executeWhen = value => value != 0,
      newValue = 128
    };
  }
}