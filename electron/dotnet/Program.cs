using System;

namespace dotnet
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Write Name:");
            var name = Console.ReadLine();
            Console.Write($"Hello {name}!");
        }
    }
}
