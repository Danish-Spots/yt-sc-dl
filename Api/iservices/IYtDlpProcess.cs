public interface IYtDlpProcess
{
    public string Status();
    public string FetchMetadata(string fetchArgs);

    public string DownloadSoundcloud(string url);
    public (string outputFilePath, string mimeType) DownloadYoutube(string url,  string fileExtension);
}
