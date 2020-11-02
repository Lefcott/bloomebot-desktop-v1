using Listener.Utils;
namespace Listener.Events.CS1_6
{
  public class Constants
  {
    public const string HACK_NAME = "CS1_6_InfiniteMoney";
    public static Subhack[] subhacks = new Subhack[]
    {
      Subhacks.Money.RealValue,
      Subhacks.Money.UIValue,
      Subhacks.Life.RealValue,
      Subhacks.Life.UIValue,
      Subhacks.HEGranade.Value,
      Subhacks.Ammo.Value,
      Subhacks.Flashbang.Value,
      Subhacks.SmokeGranade.Value
    };
  }
}
