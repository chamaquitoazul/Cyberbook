
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using server.Models;

namespace server
{
    public class JwtData
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public Guid Id { get; set; }
    }

    public class JwtHelper
    {
        public static void MakeCookie(HttpContext ctx, string secret, int minutesAlive, UserModel user)
        {

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var handler = new JwtSecurityTokenHandler();
            var date = DateTime.UtcNow.AddMinutes(minutesAlive);


            var token = handler.CreateToken(new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.FullName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.IdUser.ToString())
                }),
                Expires = date,
                SigningCredentials = creds,
                NotBefore = DateTime.UtcNow,
            });

            ctx.Response.Cookies.Append("authToken", handler.WriteToken(token), new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = date
            });
        }
        public static JwtData? VerifyCookie(HttpContext ctx, string secret)
        {
            var token = ctx.Request.Cookies["authToken"];
            if (token == null)
            {
                Console.WriteLine("[Debug]: No authToken found");
                return null;
            }
            var handler = new JwtSecurityTokenHandler();
            var validationParameters = GetValidationParameters(secret);
            try
            {
                var principal = handler.ValidateToken(token, validationParameters, out var validatedToken);
                return new JwtData
                {
                    Name = principal.FindFirst(ClaimTypes.Name)?.Value,
                    Email = principal.FindFirst(ClaimTypes.Email)?.Value,
                    Id = Guid.Parse(principal.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "")
                };
            }
            catch (Exception)
            {
                Console.WriteLine("[Debug]: Token payload is invalid");
                return null;
            }
        }

        public static TokenValidationParameters GetValidationParameters(string secret)
        {
            return new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
            };
        }
    }
}