using Microsoft.AspNetCore.Mvc;

public class BaseController : ControllerBase
{
    protected IActionResult Execute(string url, Func<IActionResult> action)
    {
        if (!Uri.IsWellFormedUriString(url, UriKind.Absolute))
        {
            return BadRequest("Format is not a well formed URI");
        }
        try
        {
            return action();
        }
        catch (InvalidFormatException ex)
        {
            return StatusCode(400, new { ex.Message, ex.ChosenFormmat});
        }
        catch (FileNotFoundException ex)
        {
            return StatusCode(500, new { ex.Message, ex.FileName });
        }
        catch (ProcessReturnedEmptyException ex)
        {
            return StatusCode(500, new { ex.Message });
        }
        catch (DeserializerException ex)
        {
            return StatusCode(422, new { ex.Message, ex.Data, ex.ModelProperties });
        }
        catch (YtDlpException e)
        {
            return StatusCode(500, new { Message = "Process error", Error = e.Message, ExitCode = e.ProcessExitCode });
        }
        catch (Exception e)
        {
            return StatusCode(500, new { Message = "Server error", Error = e.Message });
        }
    }
}
