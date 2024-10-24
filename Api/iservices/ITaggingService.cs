public interface ITaggingService
{
    public void TagYoutube(YtDownloadRequestDto request, string outputFile);
    public void TagSoundcloud(ScDownloadRequestDto request, string outputFile);
}
