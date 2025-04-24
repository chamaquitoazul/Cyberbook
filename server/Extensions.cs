using server.Models;

namespace server
{
    public static class Extensions
    {
        public static void CreateDefaultUserIfNotExists(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            var dbContext = services.GetRequiredService<DbInstance>();

            // Verifica si el usuario ya existe
            var testUser = dbContext.Users.FirstOrDefault(u => u.UserName == "usuario_demo");
            if (testUser == null)
            {
                // Crear usuario de prueba
                Console.WriteLine("Creando usuario demo...");
                var passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword("contraseña123", BCrypt.Net.HashType.SHA512, 12);
                var user = new UserModel
                {
                    IdUser = Guid.NewGuid(),
                    FullName = "Usuario Demo",
                    UserName = "manuel",
                    Email = "demo@cyberbook.com",
                    Password = passwordHash,
                    AvatarImageUrl = Constants.DefaultAvatarPath,
                    SignupDate = DateTime.Now
                };

                dbContext.Users.Add(user);
                dbContext.SaveChanges();
                Console.WriteLine("Usuario demo creado correctamente.");
            }
            else
            {
                Console.WriteLine("El usuario demo ya existe.");
            }
        }
    }
}