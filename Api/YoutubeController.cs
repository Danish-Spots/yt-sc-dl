using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class YoutubeController : BaseController 
{
    private readonly IYtDlpProcess _ytDlpProcess;
    private readonly ITaggingService _taggingService;
    private readonly IImageService _imageService;

    public YoutubeController(IYtDlpProcess ytDlpProcess, ITaggingService taggingService, IImageService imageService)
    {
        _ytDlpProcess = ytDlpProcess;
        _taggingService = taggingService;
        _imageService = imageService;
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

    [HttpPost("youtube-data")]
    public IActionResult GetVideoData([FromBody] MetadataRequestDto request)
    {

        return Execute(request.Url, () => {
            string arguments = $"-j {request.Url}";
            string processResult = _ytDlpProcess.FetchMetadata(arguments);
            var resultObj = JsonDeserializer.Deserialize<YtDlpMetadataYt>(processResult);
            string thumbnailBase64 = _imageService.FetchImageAsBase64(resultObj.thumbnail);
            YtMetadataDto result = new YtMetadataDto 
            {
                channel = resultObj.channel,
                title = resultObj.title,
                thumbnail = thumbnailBase64
            };
            return Ok(result);
        });
    }


    [HttpPost("download-audio")]
    public IActionResult DownloadAudio([FromBody] YtDownloadRequestDto request)
    {

        return Execute(request.Url, () => {
            var processResult = _ytDlpProcess.DownloadYoutube(request.Url, request.FileExtension);
            try
            {
                _taggingService.TagYoutube(request, processResult.outputFilePath);
                var fileBytes = System.IO.File.ReadAllBytes(processResult.outputFilePath);
                var fileName = Path.GetFileName(processResult.outputFilePath);

                return File(fileBytes, processResult.mimeType, fileName);
            }
            finally
            {
                if (System.IO.File.Exists(processResult.outputFilePath))
                {
                    System.IO.File.Delete(processResult.outputFilePath);
                }
            }
        });
    }
}
