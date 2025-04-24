namespace server.Dtos
{
    public class UpdateUserDTO
    {
        public string? FullName { get; set; }
        public string? Username { get; set; }
        public IFormFile? AvatarImage { get; set; }

        public bool IsEmpty()
        {
            return FullName == null && Username == null && AvatarImage == null;
        }
    }
}