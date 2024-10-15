using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.IO;

    [ApiController]
    [Route("api/[controller]")]
    public class DownloadController : ControllerBase
    {
        [HttpGet("status")]
        public IActionResult StatusCheck()
        {
            return Ok(new {Message = "Api works"});
        }

        [HttpPost("download-audio")]
        public IActionResult DownloadAudio([FromBody] DownloadRequest request)
        {
            string videoUrl = request.VideoUrl;

            // Specify the output path for the downloaded audio file
            string outputDirectory = Path.Combine(Directory.GetCurrentDirectory(), "downloads");
            string outputFilePath = Path.Combine(outputDirectory, $"{Path.GetFileNameWithoutExtension(videoUrl)}.mp3");

            // yt-dlp command and arguments
            string command = "/opt/venv/bin/yt-dlp"; // Path to yt-dlp in the virtual environment
            string arguments = $"-x --audio-format mp3 -o \"{outputFilePath}\" {videoUrl}";

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
    }

    public class DownloadRequest
    {
        public string VideoUrl { get; set; }
    }
