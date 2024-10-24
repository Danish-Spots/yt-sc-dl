public interface IImageService
{
    public string FetchImageAsBase64(string url);

    public byte[] GetImageBytes(string base64Image);
}
