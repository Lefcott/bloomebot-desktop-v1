using System;

namespace Listener
{
    public class HelloWorldEvent
    {
        public bool active = false;
        public void Activate()
        {
            active = true;
            Console.WriteLine("Hello World Activated");
        }
        public void Deactivate()
        {
            Console.WriteLine("Hello World Deactivated");
        }
    }
}