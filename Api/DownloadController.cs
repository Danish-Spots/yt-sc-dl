using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;

/// <summary>
/// Api endpoint to get version of yt-dlp installed
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class DownloadController : ControllerBase
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

    [HttpPost("video-data")]
    public IActionResult GetVideoData([FromBody] DownloadRequest request)
    {
        string arguments = $"-j {request.VideoUrl}'";

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


                VideoDataJson resultObj = JsonSerializer.Deserialize<VideoDataJson>(resultString);
                string thumbnailUrl = resultObj.thumbnail;
                string base64Thumbnail = FetchImageAsBase64(thumbnailUrl);

                return Ok(new { thumbnailUrl = base64Thumbnail, resultObj.channel, resultObj.title });
            }
        }
        catch (Exception e)
        {
            return StatusCode(500, new { Message = "Server error", Error = e.Message });
        }
    }

    [HttpPost("download-audio")]
    public IActionResult DownloadAudio([FromBody] DownloadRequest request)
    {
        string videoUrl = request.VideoUrl;

        // Specify the output path for the downloaded audio file
        string outputDirectory = Path.Combine(Directory.GetCurrentDirectory(), "downloads");
        string outputFilePath = Path.Combine(outputDirectory, $"{Path.GetFileNameWithoutExtension(videoUrl)}.flac");

        // yt-dlp command and arguments
        string arguments = $"-x --embed-metadata --embed-thumbnail --audio-format flac --audio-quality 0 -o \"{outputFilePath}\" {videoUrl}";

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
                if (process.ExitCode == 0 && System.IO.File.Exists(outputFilePath))
                {
                    // Return the downloaded file as a response
                    var fileBytes = System.IO.File.ReadAllBytes(outputFilePath);
                    var fileName = Path.GetFileName(outputFilePath);
                    return File(fileBytes, "audio/mpeg", fileName);
                }
                else
                {
                    // Handle errors and return appropriate response
                    string error = process.StandardOutput.ReadToEnd();
                    return BadRequest(new { Message = "Download failed", Error = error });
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Server error", Error = ex.Message });
        }
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
                return $"data:image/jpeg;base64,{base64Image}";
            }
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to fetch or convert image from {imageUrl}: {e.Message}");
        }
    }
}

public class DownloadRequest
{
    public string VideoUrl { get; set; }
}

public class ImageDto(string _ID, string _Width, string _Height, string _Url)
{
    // ID Width   Height  URL
    public string ID { get; } = _ID;
    public string Width { get; } = _Width;
    public string Height { get; } = _Height;
    public string Url { get; } = _Url;
}


public class VideoDataResult
{
    public string title { get; set; }
    public List<ImageDto> images { get; set; }
    public string id { get; set; }
}

public class VideoDataJson
{
    public string title { get; set; }
    public string thumbnail { get; set; }
    public string channel { get; set; }
}
