﻿using JWTAuthenticationWithNetCore.Model;
using System.Threading.Tasks;

namespace JWTAuthenticationWithNetCore.Services
{
    public interface IUserService
    {
        Task<string> RegisterAsync(RegisterModel model);
        Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
        Task<string> AddRoleAsync(AddRoleModel model);
    }
}
