public class InvalidFormatException : Exception 
{
    public string ChosenFormmat { get; }
    public InvalidFormatException(string chosenFormat, string message) : base(message)
    {
        ChosenFormmat = chosenFormat;
    }
}
