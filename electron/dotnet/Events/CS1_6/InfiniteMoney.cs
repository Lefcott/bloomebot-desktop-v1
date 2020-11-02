using System;

namespace Listener.Events.CS1_6
{
  public class InfiniteMoney
  {
    static bool activated = false;
    public static void Activate()
    {
      if (activated) return;
      activated = true;
      Console.WriteLine("Infinite Money Activated!");
      Execute();
    }
    public static void Deactivate()
    {
      if (!activated) return;
      activated = false;
      Console.WriteLine("Infinite Money Deactivated!");
    }
    static async void Execute()
    {
      while (activated)
      {
        await Utils.SubhackExecutor.Execute(Constants.subhacks);
      }
    }
  }
}
