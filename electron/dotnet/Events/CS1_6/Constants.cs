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
      Subhacks.Money.ServerRealValue,
      Subhacks.Life.RealValue,
      Subhacks.Life.UIValue,
      Subhacks.Life.ServerRealValue,
      Subhacks.HEGranade.Value,
      Subhacks.HEGranade.ServerValue,
      Subhacks.Ammo.Value,
      Subhacks.Ammo.ServerValue,
      Subhacks.Flashbang.Value,
      Subhacks.Flashbang.ServerValue,
      Subhacks.SmokeGranade.Value,
      Subhacks.SmokeGranade.ServerValue,
      Subhacks.Coordinates.XServerRealValue,
      Subhacks.Coordinates.YServerRealValue,
      Subhacks.Coordinates.ZServerRealValue
    };
  }
}
