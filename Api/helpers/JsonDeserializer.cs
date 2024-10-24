using System.Reflection;
using System.Text.Json;

public class JsonDeserializer
{
    public static T Deserialize<T>(string objectString)
    {
        var resultObj = JsonSerializer.Deserialize<T>(objectString);
        if (resultObj == null)
        {// Get the properties of the T class
            var modelProperties = typeof(T)
                .GetProperties(BindingFlags.Public | BindingFlags.Instance)
                .Select(p => new { p.Name, Type = p.PropertyType.Name })
                .ToList();

            throw new DeserializerException(
                "unable to deserialize the result from yt-dlp to provided model",
                objectString,
                modelProperties
            );
        }
        return resultObj;
    }
}
