namespace server
{
    public class ImageUpload
    {
        public static async Task<string> UploadAvatar(string username, IFormFile avatar)
        {
            // create a folder for this user with the name of this user if it doesn't exist
            var folder = Path.Combine(Constants.ImagesDirectory, username);
            if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);
            var fileName = "avatar" + Path.GetExtension(avatar.FileName);
            var filePath = Path.Combine(folder, fileName);
            using var stream = new FileStream(filePath, FileMode.Create);
            await avatar.CopyToAsync(stream);
            return $"images/{username}/{fileName}";
        }
    }
}