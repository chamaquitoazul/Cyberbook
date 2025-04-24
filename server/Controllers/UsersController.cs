using Microsoft.AspNetCore.Mvc;
using server.Dtos;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly ILogger<AuthController> _logger;
        private readonly DbInstance _db;

        public UsersController(ILogger<AuthController> logger, DbInstance db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult> GetUserById(Guid id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return JSend.Error("El usuario no existe");
            user.AvatarImageUrl = Constants.GetServerUrl(HttpContext, user.AvatarImageUrl);
            return JSend.Success(user);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult> UpdateUser(Guid id, [FromForm] UpdateUserDTO dto)
        {
            _logger.LogInformation("Attempting to update user with id {id}", id);
            if (dto.IsEmpty()) return JSend.Error("No hay datos para actualizar");

            var user = await _db.Users.FindAsync(id);
            if (user == null) return JSend.Error("El usuario no existe");

            if (dto.FullName != null) user.FullName = dto.FullName;
            if (dto.Username != null) user.UserName = dto.Username;
            if (dto.AvatarImage != null)
            {
                var url = await ImageUpload.UploadAvatar(user.UserName, dto.AvatarImage);
                if (url == null) return JSend.Error("No se pudo subir la imagen. Inténtalo de nuevo");
                user.AvatarImageUrl = url;
            }
            var result = await _db.SaveChangesAsync();
            // If result is 0 then no changes were saved, but there is no need to send an error
            if (result < 0) return JSend.Error("No ha sido posible salvar los cambios. Inténtelo de nuevo");
            _logger.LogInformation("User updated successfully");
            return JSend.Success(new
            {
                user.IdUser,
                user.FullName,
                user.UserName,
                user.Email,
                user.SignupDate,
                AvatarImageUrl = Constants.GetServerUrl(HttpContext, user.AvatarImageUrl)
            });
        }
    }
}
