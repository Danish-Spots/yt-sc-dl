using System.Diagnostics;

public class YtDlpProcess
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


    private string RunProcess(string processArgs)
    {
        try
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
                    throw new Exception(error);
                }
                return result;
            }
        }
        catch
        {
            throw;
        }
    }
}
