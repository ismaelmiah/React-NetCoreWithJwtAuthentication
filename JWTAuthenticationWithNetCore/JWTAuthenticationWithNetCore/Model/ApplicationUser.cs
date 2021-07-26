using Microsoft.AspNetCore.Identity;

namespace JWTAuthenticationWithNetCore.Model
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
