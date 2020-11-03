namespace Listener.Events
{
    public class Switcher
    {
        public static void SwitchEvent(Event _event)
        {
            switch (_event.name)
            {
                case CS1_6.Constants.HACK_NAME:
                    if (_event.activate) CS1_6.InfiniteMoney.Activate();
                    else CS1_6.InfiniteMoney.Deactivate();
                    break;
                // case AOE2.Constants.HACK_NAME:
                //     if (_event.activate) AOE2.InfiniteResources.Activate();
                //     else AOE2.InfiniteResources.Deactivate();
                //     break;
            }
        }
    }
}
