using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;
using TagLib;

/// <summary>
/// Api endpoint to get version of yt-dlp installed
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class SoundcloudController : ControllerBase
{
    private string command = "/opt/venv/bin/yt-dlp";

    [HttpGet("status")]
    public IActionResult StatusCheck()
    {
        string arguments = "--version";

        ProcessStartInfo psi = new ProcessStartInfo
        {
            FileName = command,
            Arguments = arguments,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true

        };

        try
        {
            using (Process process = Process.Start(psi))
            {
                string result = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
                return Ok(new { CommandVersion = result });
            }
        }
        catch (Exception e)
        {
            return StatusCode(500, new { Message = "Server error", Error = e.Message });
        }
    }

    [HttpPost("soundcloud-data")]
    public IActionResult GetVideoData([FromBody] MetadataRequestDto request)
    {
        if (!Uri.IsWellFormedUriString(request.Url, UriKind.Absolute))
        {
            return BadRequest("Format is not a well formed URI");
        }

        string arguments = $"-j {request.Url}";

        ProcessStartInfo psi = new ProcessStartInfo
        {
            FileName = command,
            Arguments = arguments,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true

        };

        try
        {
            using (Process process = Process.Start(psi))
            {
                string resultString = process.StandardOutput.ReadToEnd();
                process.WaitForExit();

                ScMetadataDto resultObj = JsonSerializer.Deserialize<ScMetadataDto>(resultString);
                string thumbnailUrl = resultObj.thumbnail;
                resultObj.thumbnail = FetchImageAsBase64(thumbnailUrl);

                return Ok(resultObj);
            }
        }
        catch (Exception e)
        {
            return StatusCode(500, new { Message = "Server error", Error = e.Message });
        }
    }

    [HttpPost("download-audio")]
    public IActionResult DownloadAudio([FromBody] ScDownloadRequestDto request)
    {
        string baseFileName = Path.GetFileNameWithoutExtension(request.Url);

        // Specify the output path for the downloaded audio file
        string outputDirectory = Path.Combine(Directory.GetCurrentDirectory(), "downloads");
        string outputFilePath = Path.Combine(outputDirectory, $"{baseFileName}"); // Use %(ext)s placeholder
        string arguments = $"--embed-metadata --add-metadata --extractor-args \"soundcloud:formats=*_mp3\" -o \"{outputFilePath}.%(ext)s\" {request.Url}";
        string outputFilePathWithExtension = $"{outputFilePath}.mp3";
        // Start the process
        ProcessStartInfo psi = new ProcessStartInfo
        {
            FileName = command,
            Arguments = arguments,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        try
        {
            using (Process process = Process.Start(psi))
            {
                process.WaitForExit();
                if (process.ExitCode == 0 && System.IO.File.Exists(outputFilePathWithExtension))
                {

                    var base64Data = request.Thumbnail;
                    if (base64Data.Contains("base64,"))
                    {
                        base64Data = base64Data.Substring(base64Data.IndexOf("base64,") + 7); // Strip the prefix
                    }

                    var imageBytes = Convert.FromBase64String(base64Data);
                    var artworkPath = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid()}.png");
                    System.IO.File.WriteAllBytes(artworkPath, imageBytes);

                    using (var tagFile = TagLib.File.Create(outputFilePathWithExtension))
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

                    if (System.IO.File.Exists(artworkPath))
                    {
                        System.IO.File.Delete(artworkPath);
                    }

                    // Return the downloaded file as a response
                    var fileBytes = System.IO.File.ReadAllBytes(outputFilePathWithExtension);
                    var fileName = Path.GetFileName(outputFilePathWithExtension);

                    return File(fileBytes, "audio/mpeg", fileName);
                }
                else
                {
                    // Handle errors and return appropriate response
                    string error = process.StandardError.ReadToEnd();
                    return BadRequest(new { Message = "Download failed", Error = error });
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Server error", Error = ex.Message });
        }

    }

    [HttpPost("convert-image")]
    public IActionResult ConvertImage([FromBody] ImageConversionRequestDto request)
    {
        if (!Uri.IsWellFormedUriString(request.thumbnailUrl, UriKind.Absolute))
        {
            return BadRequest("Format is not a well formed URI");
        }

        ImageDto Image = new ImageDto { Image = FetchImageAsBase64(request.thumbnailUrl) };

        return Ok(Image);
    }

    private string FetchImageAsBase64(string imageUrl)
    {
        try
        {
            using (var httpClient = new HttpClient())
            {
                // Fetch the image data from the URL
                var imageBytes = httpClient.GetByteArrayAsync(imageUrl).Result;

                // Convert the image to a base64-encoded string
                string base64Image = Convert.ToBase64String(imageBytes);

                // Return the base64 string with the appropriate data URL prefix
                return $"data:image/png;base64,{base64Image}";
            }
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to fetch or convert image from {imageUrl}: {e.Message}");
        }
    }
}

public class ScDataRequest
{
    public string ScUrl { get; set; }
}

public class ScDownloadRequest
{
    public string VideoUrl { get; set; }
    public string title { get; set; }
    public string album { get; set; }
    public string channel { get; set; }
    public string image { get; set; }
    public string fileExtension { get; set; }
}

public class ScImageDto(string _ID, string _Width, string _Height, string _Url)
{
    // ID Width   Height  URL
    public string ID { get; } = _ID;
    public string Width { get; } = _Width;
    public string Height { get; } = _Height;
    public string Url { get; } = _Url;
}


public class ScDataResult
{
    public string title { get; set; }
    public List<ImageDto> images { get; set; }
    public string id { get; set; }
}

public class ScDataJson
{
    public string title { get; set; }
    public string thumbnail { get; set; }
    public string channel { get; set; }
}

public static class ScFormat
{
    public static Dictionary<string, (string extension, string mimeType)> formatMapping = new Dictionary<string, (string extension, string mimeType)>
    {
        { "best", (".opus", "audio/opus") },
        { "flac", (".flac", "audio/flac") },
        { "m4a", (".m4a", "audio/m4a") },
        { "mp3", (".mp3", "audio/mpeg") },
        { "opus", (".opus", "audio/opus") },
        { "vorbis", (".ogg", "audio/ogg") },
        { "wav", (".wav", "audio/wav") },
    };

}
