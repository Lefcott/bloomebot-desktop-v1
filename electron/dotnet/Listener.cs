using System;
using System.Text;
using System.Text.Json;
using System.IO;
using System.IO.Pipes;

namespace Listener
{
    class Program
    {
        static NamedPipeServerStream server;
        static void Main(string[] args)
        {
            using (server = new NamedPipeServerStream("BloomebotHacksPipe", PipeDirection.InOut, -1, PipeTransmissionMode.Message))
            {
                Console.WriteLine("Waiting for Connection");
                server.WaitForConnection();
                Console.WriteLine("Connection Established");

                EmitEvent("Hello From Dotnet 1");

                var events = new Events();
                while (server.CanRead)
                {
                    var eventData = ReceiveEvent();
                    if (eventData.empty) continue;

                    switch (eventData.name)
                    {
                        case "HelloWorld":
                            if (eventData.activate) events.helloWorld.Activate();
                            else events.helloWorld.Deactivate();
                            Console.WriteLine("Got HelloWoooorld!!!");
                            break;
                    }
                }
            }
        }
        public static void EmitEvent(string message)
        {
            server.Write(Encoding.UTF8.GetBytes(message));
        }
        static Event ReceiveEvent()
        {
            byte[] PipeDataBuffer = new byte[100];
            MemoryStream MessageStream = new MemoryStream();
            int TotalBytesRead = 0;

            do
            {
                int BytesRead = server.Read(PipeDataBuffer, 0, PipeDataBuffer.Length);
                MessageStream.Write(PipeDataBuffer, 0, BytesRead);
                TotalBytesRead += BytesRead;
            } while (!server.IsMessageComplete);

            byte[] Message = MessageStream.ToArray();

            if (Message.Length == 0) return new Event() { empty = true };

            return JsonSerializer.Deserialize<Event>(new ASCIIEncoding().GetString(Message));
        }
    }
    public class Events
    {
        public HelloWorldEvent helloWorld = new HelloWorldEvent();
    }
    public class Event
    {
        public bool empty { get; set; }
        public string name { get; set; }
        public bool activate { get; set; }
        public object data { get; set; }
    }
}