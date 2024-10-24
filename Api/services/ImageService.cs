public class ImageService : IImageService
{
    public string FetchImageAsBase64(string url)
    {
        using (var httpClient = new HttpClient())
        {
            // Fetch the image data from the URL
            var imageBytes = httpClient.GetByteArrayAsync(url).Result;

            // Convert the image to a base64-encoded string
            string base64Image = Convert.ToBase64String(imageBytes);

            // Return the base64 string with the appropriate data URL prefix
            return $"data:image/png;base64,{base64Image}";
        }
    }

    public byte[] GetImageBytes(string base64Image)
    {
        if (base64Image.Contains("base64,"))
        {
            base64Image = base64Image.Substring(base64Image.IndexOf("base64,") + 7); // Strip the prefix
        }

        return Convert.FromBase64String(base64Image);
    }
}
