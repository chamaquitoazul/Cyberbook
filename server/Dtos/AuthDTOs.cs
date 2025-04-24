using System.ComponentModel.DataAnnotations;

namespace server.Dtos
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "El correo electrónico o nombre de usuario es requerido")]
        public string EmailOrUsername { get; set; }

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string Password { get; set; }
    }

    public class SignUpDTO
    {
        [Required(ErrorMessage = "El nombre completo es requerido")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "El nombre de usuario es requerido")]
        public string Username { get; set; }
        [Required(ErrorMessage = "El correo electrónico es requerido")]
        [EmailAddress(ErrorMessage = "El correo electrónico no es válido")]
        public string Email { get; set; }
        [Required(ErrorMessage = "La contraseña es requerida")]
        [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
        public string Password { get; set; }
        [Required(ErrorMessage = "La confirmación de la contraseña es requerida")]
        [Compare(nameof(Password), ErrorMessage = "Las contraseñas no coinciden")]
        public string ConfirmPassword { get; set; }
        public IFormFile? AvatarImage { get; set; }
    }
}
