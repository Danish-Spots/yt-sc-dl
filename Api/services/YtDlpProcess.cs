using System.Diagnostics;

public class YtDlpProcess : IYtDlpProcess
{
    private string baseCommand = "/opt/venv/bin/yt-dlp";

    public string Status()
    {
        try
        {
            return RunProcess("--version");
        }
        catch
        {
            throw;
        }
    }

    public string FetchMetadata(string fetchArgs)
    {
        return RunProcess(fetchArgs);
    }

    public string DownloadFile(string url)
    {
        string baseFileName = Path.GetFileNameWithoutExtension(url);

        // Specify the output path for the downloaded audio file
        string outputDirectory = Path.Combine(Directory.GetCurrentDirectory(), "downloads");
        string outputFilePath = Path.Combine(outputDirectory, $"{baseFileName}"); // Use %(ext)s placeholder
        string arguments = $"--embed-metadata --add-metadata --extractor-args \"soundcloud:formats=*_mp3\" -o \"{outputFilePath}.%(ext)s\" {url}";
        string outputFilePathWithExtension = $"{outputFilePath}.mp3";

        RunProcess(arguments);

        if (!System.IO.File.Exists(outputFilePathWithExtension))
        {
            throw new FileNotFoundException(message: "Download failed: file not found", fileName: outputFilePathWithExtension);
        }

        return outputFilePathWithExtension;
    }


    private string RunProcess(string processArgs)
    {
        using (Process p = new Process())
        {
            p.StartInfo.UseShellExecute = false;
            p.StartInfo.CreateNoWindow = true;
            p.StartInfo.RedirectStandardError = true;
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.FileName = baseCommand;
            p.StartInfo.Arguments = processArgs;

            p.Start();
            string result = p.StandardOutput.ReadToEnd();
            string error = p.StandardError.ReadToEnd();
            p.WaitForExit();
            if (p.ExitCode != 0)
            {
                throw new YtDlpException(error, p.ExitCode);
            }
            if (String.IsNullOrWhiteSpace(result))
            {
                throw new ProcessReturnedEmptyException("process returned empty string");
            }
            return result;
        }
    }
}
