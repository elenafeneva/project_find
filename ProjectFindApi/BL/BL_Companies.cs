using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using ProjectFindDatabase.Models;
using ProjectFindApi.HelpModels;

namespace ProjectFindApi.BL
{
    public class BL_Companies
    {
        public async static Task<List<Companies>> GetCompanies()
        {
            string sql = $"SELECT * FROM [dbo].[Companies] FOR JSON PATH";
            string resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<Companies> companies = JsonConvert.DeserializeObject<List<Companies>>(resp);
                return companies;
            }
            else
            {
                return null;
            }
        }
        public async static Task<Companies> GetCompany(Companies company)
        {
            string sql = $"SELECT * FROM [dbo].[Companies] WHERE Id={company.Id} FOR JSON PATH";
            var resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<Companies> companiesResp = JsonConvert.DeserializeObject<List<Companies>>(resp);
                Companies companyResp = companiesResp.FirstOrDefault();
                return companyResp;
            }
            else
            {
                return null;
            }
        }
        public async static Task<Companies> GetCompany(string companyId)
        {
            string sql = $"SELECT * FROM [dbo].[Companies] WHERE Id={companyId} FOR JSON PATH";
            var resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<Companies> companiesResp = JsonConvert.DeserializeObject<List<Companies>>(resp);
                Companies companyResp = companiesResp.FirstOrDefault();
                return companyResp;
            }
            else
            {
                return null;
            }
        }
        public async static Task<bool> SaveCompany(Companies company)
        {
            string sql = $"INSERT INTO [dbo].[Companies] ([Name],[Address],VATNumber,Number,Code) VALUES (N'" + company.Name + "' , N'" + company.Address + "','" + company.VATNumber + "', '" + company.Number + "', '" + company.Code + "' )";
            string resp = await DAL.ExecuteDataReader(sql);
            if (resp != "ERROR")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public async static Task<bool> UpdateCompany(Companies company)
        {
            string sql = $"UPDATE [dbo].[Companies] SET [Name]=N'{company.Name}',[Code]='{company.Code}',[VATNumber]='{company.VATNumber}',[Address]=N'{company.Address}',[Number]={company.Number} WHERE [Id]='{company.Id}'";
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
        public async static Task<bool> DeleteCompany(Companies company)
        {
            string sql = $"DELETE FROM [dbo].[Companies] WHERE [Id]={company.Id}";
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
    }
}
