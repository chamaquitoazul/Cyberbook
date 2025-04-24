using Microsoft.AspNetCore.Mvc;

namespace server
{
    /// <summary>
    ///  JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted.
    ///  Refer to: https://github.com/omniti-labs/jsend
    /// </summary>
    public class JSend
    {
        /// <summary>
        /// Success response
        /// </summary>
        public static JsonResult Success<T>(T data)
        {
            return new JsonResult(new
            {
                status = "success",
                data
            });
        }

        /// <summary>
        /// Error response
        /// </summary>
        public static ActionResult Error(string message)
        {
            return new BadRequestObjectResult(new
            {
                status = "error",
                message
            });
        }
    }
}