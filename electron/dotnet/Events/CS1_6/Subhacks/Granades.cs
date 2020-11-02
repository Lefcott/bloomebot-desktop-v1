using Listener.Utils;

namespace Listener.Events.CS1_6.Subhacks
{
  public class Granades
  {
    public static readonly Subhack Value = new Subhack("GranadesValue")
    {
      processName = "hl",
      moduleName = "hw.dll",
      accessType = Subhack.AccessTypes.POINTER,
      moduleBaseAddresses = new int[] { 0x007BBD9C },
      offsets = new int[] { 0xC, 0x4, 0x0, 0x0, 0x74, 0x610 },
      executeWhen = value => value != 0,
      newValue = 50
    };
  }
}