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

    /// <summary>
    /// Checks status of yt-dlp
    /// </summary>
    /// <returns>Version of yt-dlp installed</returns>
    [HttpGet("status")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(StatusCheckDto))]
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

    /// <summary>
    /// Fetch metadata for a soundcloud track
    /// </summary>
    /// <param name="request">object containing request url</param>
    /// <returns></returns>
    [HttpPost("soundcloud-data")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ScMetadataDto))]
    public IActionResult GetVideoData([FromBody] MetadataRequestDto request)
    {
        return Execute(request.Url, () =>
        {
            string arguments = $"-j {request.Url}";
            string processResult = _ytDlpProcess.FetchMetadata(arguments);

            var resultObj = JsonDeserializer.Deserialize<YtDlpMetadataSc>(processResult);
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

    /// <summary>
    /// Download soundcloud audio
    /// </summary>
    /// <param name="request">object containing various properties which setup metadata of the downloaded file and url</param>
    /// <returns>Blob file</returns>
    [HttpPost("download-audio")]
    [Produces("audio/opus","audio/flac","audio/m4a","audio/mpeg","audio/opus","audio/ogg","audio/wav")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FileResult))]
    public IActionResult DownloadAudio([FromBody] ScDownloadRequestDto request)
    {

        return Execute(request.Url, () =>
        {
            string outputFilePath = _ytDlpProcess.DownloadSoundcloud(request.Url);
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
