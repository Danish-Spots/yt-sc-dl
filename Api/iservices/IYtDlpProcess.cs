public interface IYtDlpProcess
{
    public string Status();
    public string FetchMetadata(string fetchArgs);

    public string DownloadFile(string url);
}
