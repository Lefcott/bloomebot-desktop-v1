using System;

namespace Listener.Events.AOE2
{
  public class InfiniteResources
  {
    static bool activated = false;
    public static void Activate()
    {
      if (activated) return;
      activated = true;
      Console.WriteLine("Infinite Resources Activated!");
      Execute();
    }
    public static void Deactivate()
    {
      if (!activated) return;
      activated = false;
      Console.WriteLine("Infinite Resources Deactivated!");
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
