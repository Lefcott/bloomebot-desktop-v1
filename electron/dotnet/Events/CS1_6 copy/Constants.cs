using Listener.Utils;
namespace Listener.Events.AOE2
{
  public class Constants
  {
    public const string HACK_NAME = "AOE2_InfiniteResources";
    public static Subhack[] subhacks = new Subhack[]
    {
      Subhacks.Food.Value,
      Subhacks.Gold.Value,
      Subhacks.Madera.Value,
      Subhacks.Stone.Value
    };
  }
}
