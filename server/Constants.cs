namespace server
{
    public class Constants
    {
        public static readonly string ImagesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
        public static readonly string DefaultAvatarPath = "images/defaultAvatar.jpg";

        public static string GetServerUrl(HttpContext context, string resource)
        {
            var port = context.Request.Host.Port ?? 5000;
            var localhost = $"http://localhost:{port}";
            return $"{localhost}/{resource}";
        }
    }
}