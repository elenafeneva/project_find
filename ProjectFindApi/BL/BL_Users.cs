using Newtonsoft.Json;
using ProjectFindApi.HelpModels;
using ProjectFindDatabase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ProjectFindDatabase.Helpers.Enumerations;

namespace ProjectFindApi.BL
{
    public class BL_Users
    {
        public async static Task<Users> GetUser(Users user)
        {
            string sql = $"SELECT * FROM [dbo].[Users] WHERE [Email]='{user.Email}' FOR JSON PATH";
            var resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<Users> usersResp = JsonConvert.DeserializeObject<List<Users>>(resp);
                Users userResp = usersResp.FirstOrDefault();
                return userResp;
            }
            else
            {
                return null;
            }
        }
        public async static Task<bool> SetNewPassword(string email, FindData findData)
        {
            string sql = $"UPDATE [dbo].[Users] SET [Password]='{Cryptography.EncryptData(findData.NewPassword, findData.NewPassword)}' WHERE [Email]='{email}'";
            var resp = await DAL.ExecuteDataReader(sql);
            if (resp != "ERROR")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public async static Task<List<CompanyUsers>> GetCompanyUsers(Users user)
        {
            string sql = $"SELECT U.Id, U.[Role], U.Username,U.[Password],U.Email,U.Active,U.[Image],U.[Company_Id],U.[Gender], U.Student_Id, C.[Name] from [dbo].[Users] AS U INNER JOIN [dbo].[Companies] AS C ON  U.[Company_Id]=C.[Id] WHERE U.[Company_Id]={user.Company_Id} FOR JSON PATH";
            var resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<CompanyUsers> usersResp = JsonConvert.DeserializeObject<List<CompanyUsers>>(resp);
                return usersResp;
            }
            else
            {
                return null;
            }

        }
        public async static Task<bool> DeleteUser(Users user)
        {
            string sql = $"DELETE FROM [dbo].[Users] WHERE [Id]={user.Id}";
            var resp = await DAL.ExecuteDataReader(sql);
            if (resp != "ERROR")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public async static Task<bool> SaveCompanyUser(Users user)
        {
            int gender = 1;
            if (user.Gender == Gender.Male) gender = (int)Gender.Male;
            string sql = $"INSERT INTO [dbo].[Users] ([Role],[Username],[Password],[Email],[Active],[Image],[Company_Id],[Gender],[Student_Id]) VALUES (2,N'{user.Username}',N'{user.Password}',N'{user.Email}',1,'{user.Image}',{user.Company_Id},{gender},null)";
            string resp = await DAL.ExecuteDataReader(sql);
            string sql2 = $"SELECT * FROM [dbo].[Users] WHERE [Email]='{user.Email}' FOR JSON PATH";
            string respUser = await DAL.ExecuteDataReader(sql2);
            if (respUser != "ERROR" && respUser != "")
            {
                List<Users> usersResp = JsonConvert.DeserializeObject<List<Users>>(respUser);
                try {
                    await SendEmail.SendMailAsync(usersResp, true);
                    return true;
                }
                catch(Exception ex)
                {
                    string sql3 = $"DELETE FROM [dbo].[Users] WHERE [Email]='{user.Email}'";
                    string deleteUser = await DAL.ExecuteDataReader(sql3);
                    return false;
                }
            }
            else
            {
                string sql3 = $"DELETE FROM [dbo].[Users] WHERE [Email]='{user.Email}'";
                string deleteUser = await DAL.ExecuteDataReader(sql3);
                return false;
            }
        }
        public async static Task<bool> UpdateUser(Users user)
        {
            int gender = 1;
            if (user.Gender == Gender.Male) gender = (int)Gender.Male;
            string sql = $"UPDATE [dbo].[Users] SET [Email]=N'{user.Email}', [Gender]={gender} where [Id]={user.Id}";
            string resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
