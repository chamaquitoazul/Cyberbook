
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("user")]
    public class UserModel
    {
        [Key]
        public Guid IdUser { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime SignupDate { get; set; }

        public string AvatarImageUrl { get; set; }
    }
}