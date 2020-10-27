namespace Listener.Events
{
    public class Switcher
    {
        public static void SwitchEvent(Event _event)
        {
            switch (_event.name)
            {
                case CS1_6.Constants.INFINITE_MONEY:
                    if (_event.activate) CS1_6.InfiniteMoney.Activate();
                    else CS1_6.InfiniteMoney.Deactivate();
                    break;
            }
        }
    }
}
