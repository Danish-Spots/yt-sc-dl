using Microsoft.AspNetCore.Components.Web;

public class TaggingService : ITaggingService
{
    private IImageService _imageService;
    public TaggingService(IImageService imageService)
    {
        _imageService = imageService;
    }

    public void TagYoutube(YtDownloadRequestDto request, string outputFile) {
        _tagFile(request.Thumbnail, request.Album, request.Title, request.Artist, outputFile);
    }
    
    public void TagSoundcloud(ScDownloadRequestDto request, string outputFile)
    {
        string Image = _imageService.FetchImageAsBase64(request.Thumbnail);
        _tagFile(Image, request.Album, request.Title, request.Artist, outputFile);
    }

    private void _tagFile(string thumbnail, string album, string title, string artist, string outputFile)
    {
        var imageBytes = _imageService.GetImageBytes(thumbnail);

        using (var tagFile = TagLib.File.Create(outputFile))
        {

            tagFile.Tag.Album = album;
            tagFile.Tag.Title = title;
            tagFile.Tag.AlbumArtists = [artist];

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
