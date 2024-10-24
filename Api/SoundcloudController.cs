using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;
using TagLib;
using System.Reflection;

/// <summary>
/// Api endpoint to get version of yt-dlp installed
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class SoundcloudController : BaseController
{
    private readonly IYtDlpProcess _ytDlpProcess;
    private readonly ITaggingService _taggingService;

    public SoundcloudController(IYtDlpProcess ytDlpProcess, ITaggingService taggingService)
    {
        _ytDlpProcess = ytDlpProcess;
        _taggingService = taggingService;
    }

    [HttpGet("status")]
    public IActionResult StatusCheck()
    {
        try
        {
            string result = _ytDlpProcess.Status();
            return Ok(new { CommandVersion = result });
        }
        catch (Exception e)
        {
            return StatusCode(500, new { Message = "Server error", Error = e.Message });
        }
    }

    [HttpPost("soundcloud-data")]
    public IActionResult GetVideoData([FromBody] MetadataRequestDto request)
    {
        return Execute(request.Url, () =>
        {
            string arguments = $"-j {request.Url}";
            string processResult = _ytDlpProcess.FetchMetadata(arguments);

            var resultObj = JsonDeserializer.Deserialize<YtDlpMetadata>(processResult);
            var thumbnails = resultObj.thumbnails.Select(t => t.url).ToList();
            ScMetadataDto result = new ScMetadataDto
            {
                uploader = resultObj.uploader,
                thumbnail = resultObj.thumbnail,
                title = resultObj.title,
                thumbnails = thumbnails
            };
            return Ok(result);
        });
    }

    [HttpPost("download-audio")]
    public IActionResult DownloadAudio([FromBody] ScDownloadRequestDto request)
    {

        return Execute(request.Url, () =>
        {
            string outputFilePath = _ytDlpProcess.DownloadFile(request.Url);
            try
            {
                _taggingService.TagSoundcloud(request, outputFilePath);

                // Return the downloaded file as a response
                var fileBytes = System.IO.File.ReadAllBytes(outputFilePath);
                var fileName = Path.GetFileName(outputFilePath);

                return File(fileBytes, "audio/mpeg", fileName);
            }
            finally
            {
                // Ensure the file is deleted after processing
                if (System.IO.File.Exists(outputFilePath))
                {
                    System.IO.File.Delete(outputFilePath);
                }
            }
        }
        );
    }
}
