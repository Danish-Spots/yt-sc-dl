public class TaggingService : ITaggingService
{
    private IImageService _imageService;
    public TaggingService(IImageService imageService)
    {
        _imageService = imageService;
    }

    public void TagYoutube() { }
    public void TagSoundcloud(ScDownloadRequestDto request, string outputFile)
    {
        string Image = _imageService.FetchImageAsBase64(request.Thumbnail);
        var imageBytes = _imageService.GetImageBytes(Image);

        using (var tagFile = TagLib.File.Create(outputFile))
        {

            tagFile.Tag.Album = request.Album;
            tagFile.Tag.Title = request.Title;
            tagFile.Tag.AlbumArtists = [request.Artist];

            TagLib.Picture picture = new TagLib.Picture
            {
                Type = TagLib.PictureType.FrontCover,
                Description = "Cover Art",
                MimeType = System.Net.Mime.MediaTypeNames.Image.Png,
                Data = new TagLib.ByteVector(imageBytes)
            };
            tagFile.Tag.Pictures = new TagLib.IPicture[] { picture };

            tagFile.Save();
        }
    }
}
