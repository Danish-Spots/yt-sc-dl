public class YtDlpException : Exception
{
    public int ProcessExitCode { get; }
    public YtDlpException(string message, int processExitCode) : base(message)
    {
        ProcessExitCode = processExitCode;
    }
}
