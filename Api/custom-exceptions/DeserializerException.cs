public class DeserializerException : Exception
{
    public string DataString { get; }
    public object ModelProperties { get; }

    public DeserializerException(string message, string dataString, object modelProperties)
        : base(message)
    {
        DataString = dataString;
        ModelProperties = modelProperties;
    }
}
